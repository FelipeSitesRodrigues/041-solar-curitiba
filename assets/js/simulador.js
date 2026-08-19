/* ==========================================================================
   Simulador de dimensionamento solar
   Roda inteiro no navegador. Não envia nem guarda dado nenhum.

   consumo (kWh/mês)  = valor da conta / tarifa
   excedente          = consumo - taxa mínima da ligação
   kWp necessário     = (excedente / 30) / (HSP x performance)
   nº de painéis      = arredonda pra cima (kWp x 1000 / potência do painel)
   economia/mês       = excedente x tarifa
   área no telhado    = nº painéis x área do painel x folga
   ========================================================================== */
(function () {
  'use strict';

  const form = document.getElementById('sim-form');
  if (!form) return;

  const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const el = {
    cidade: document.getElementById('cidade'),
    conta: document.getElementById('conta'),
    faixaValor: document.getElementById('faixa-valor'),
    passos: document.querySelectorAll('#passos .passo'),
    btnResultado: document.getElementById('btn-resultado'),
    btnZap: document.getElementById('btn-zap-simulador'),
    resultado: document.getElementById('sim-resultado'),
    paineis: document.getElementById('r-paineis'),
    potenciaPainel: document.getElementById('r-potencia-painel'),
    kwp: document.getElementById('r-kwp'),
    area: document.getElementById('r-area'),
    economia: document.getElementById('r-economia'),
    contaAtual: document.getElementById('r-conta-atual'),
    contaNova: document.getElementById('r-conta-nova')
  };

  const reais = (v) => 'R$ ' + Math.round(v).toLocaleString('pt-BR');
  const umaCasa = (v) => v.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  /* ---------------------------------------------------------- monta a lista */
  CIDADES.forEach(function (c) {
    const op = document.createElement('option');
    op.value = c.nome;
    op.textContent = c.nome;
    el.cidade.appendChild(op);
  });
  el.potenciaPainel.textContent = PARAMS.potenciaPainel;

  /* ------------------------------------------------------------- a conta */
  function calcular() {
    const conta = Number(el.conta.value);
    const tipo = form.querySelector('input[name="tipo"]:checked').value;
    const ligacao = form.querySelector('input[name="ligacao"]:checked').value;
    const cidadeNome = el.cidade.value;
    const cidade = CIDADES.find(function (c) { return c.nome === cidadeNome; });
    const hsp = cidade ? cidade.hsp : CIDADES[0].hsp;

    const consumo = conta / PARAMS.tarifa;
    const taxaMinima = PARAMS.taxaMinima[ligacao];
    const excedente = Math.max(0, consumo - taxaMinima);

    const kwpNecessario = (excedente / 30) / (hsp * PARAMS.performance);
    const paineis = Math.max(2, Math.ceil((kwpNecessario * 1000) / PARAMS.potenciaPainel));
    const kwpReal = (paineis * PARAMS.potenciaPainel) / 1000;

    const geracaoMes = kwpReal * hsp * 30 * PARAMS.performance;
    const economiaMes = excedente * PARAMS.tarifa;
    const contaNova = Math.max(0, conta - economiaMes);
    const area = paineis * PARAMS.areaPainel * PARAMS.folgaArea;

    return {
      conta: conta, tipo: tipo, ligacao: ligacao,
      cidade: cidadeNome || '', hsp: hsp,
      paineis: paineis, kwpReal: kwpReal, geracaoMes: geracaoMes,
      economiaMes: economiaMes, economiaAno: economiaMes * 12,
      contaNova: contaNova, area: area
    };
  }

  /* ---------------------------------------------- anima o número da economia */
  let economiaAtual = 0;
  function pintarEconomia(valor) {
    if (semMovimento) { el.economia.textContent = reais(valor); economiaAtual = valor; return; }
    const de = economiaAtual, ate = valor, inicio = performance.now(), dur = 420;
    el.economia.classList.remove('pulsando');
    void el.economia.offsetWidth;
    el.economia.classList.add('pulsando');
    function passo(agora) {
      const t = Math.min(1, (agora - inicio) / dur);
      const suave = 1 - Math.pow(1 - t, 3);
      el.economia.textContent = reais(de + (ate - de) * suave);
      if (t < 1) requestAnimationFrame(passo);
      else economiaAtual = ate;
    }
    requestAnimationFrame(passo);
  }

  /* --------------------------------------------------------- pinta na tela */
  function atualizar(animarValor) {
    const r = calcular();

    el.paineis.textContent = r.paineis;
    el.kwp.textContent = umaCasa(r.kwpReal);
    el.area.textContent = Math.round(r.area);
    el.contaAtual.textContent = reais(r.conta);
    el.contaNova.textContent = reais(r.contaNova);

    if (animarValor) pintarEconomia(r.economiaMes);
    else { el.economia.textContent = reais(r.economiaMes); economiaAtual = r.economiaMes; }

    el.btnZap.setAttribute('href', linkWhatsapp(r));
    posicionarPino();
  }

  function linkWhatsapp(r) {
    const ligacoes = { mono: 'monofásica', bi: 'bifásica', tri: 'trifásica' };
    const onde = r.cidade ? r.cidade : 'Curitiba e região';
    const texto =
      'Olá! Fiz a simulação no site.\n' +
      'Imóvel: ' + r.tipo + ' em ' + onde + '\n' +
      'Ligação: ' + ligacoes[r.ligacao] + '\n' +
      'Conta de luz: ' + reais(r.conta) + ' por mês\n' +
      'Resultado: ' + r.paineis + ' painéis de ' + PARAMS.potenciaPainel + 'W, ' +
      umaCasa(r.kwpReal) + ' kWp, economia de ' + reais(r.economiaMes) + ' por mês.\n' +
      'Quero um orçamento.';
    return 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(texto);
  }

  /* ------------------------------------------------- pino do slider e trilho */
  function posicionarPino() {
    const min = Number(el.conta.min), max = Number(el.conta.max);
    const proporcao = (Number(el.conta.value) - min) / (max - min);
    el.conta.style.setProperty('--preenchido', (proporcao * 100).toFixed(2) + '%');
    el.faixaValor.textContent = reais(Number(el.conta.value));

    const trilho = el.conta.getBoundingClientRect();
    const caixa = el.faixaValor.offsetParent
      ? el.faixaValor.offsetParent.getBoundingClientRect()
      : trilho;
    const polegar = 19;
    const x = (trilho.left - caixa.left) + polegar / 2 + proporcao * (trilho.width - polegar);
    el.faixaValor.style.left = x + 'px';
  }

  /* ----------------------------------------------------- indicador de passos */
  let passoMax = 1;
  function acenderPassos(ate) {
    passoMax = Math.max(passoMax, ate);
    el.passos.forEach(function (p, i) {
      p.classList.toggle('passo--ativo', i < passoMax);
    });
  }

  /* ------------------------------------------------------------- eventos */
  form.querySelectorAll('input[name="tipo"]').forEach(function (i) {
    i.addEventListener('change', function () { acenderPassos(1); atualizar(true); });
  });
  el.cidade.addEventListener('change', function () { acenderPassos(2); atualizar(true); });
  form.querySelectorAll('input[name="ligacao"]').forEach(function (i) {
    i.addEventListener('change', function () { acenderPassos(3); atualizar(true); });
  });
  el.conta.addEventListener('input', function () { acenderPassos(4); atualizar(false); });
  el.conta.addEventListener('change', function () { atualizar(true); });

  el.btnResultado.addEventListener('click', function () {
    if (!el.cidade.value) {
      el.cidade.focus();
      if (!semMovimento) {
        el.cidade.animate(
          [{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' },
           { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }],
          { duration: 320, easing: 'ease-out' }
        );
      }
      return;
    }
    acenderPassos(4);
    atualizar(true);
    if (window.matchMedia('(max-width: 900px)').matches) {
      el.resultado.scrollIntoView({ behavior: semMovimento ? 'auto' : 'smooth', block: 'start' });
    }
  });

  window.addEventListener('resize', posicionarPino);
  window.addEventListener('load', posicionarPino);

  atualizar(false);
})();
