/* ==========================================================================
   Comportamento geral do site
   ========================================================================== */
(function () {
  'use strict';

  const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const zap = (msg) => 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(msg);
  const estrela = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1Z"/></svg>';

  /* ------------------------------------------------------ links de WhatsApp */
  document.querySelectorAll('[data-whatsapp]').forEach(function (a) {
    a.setAttribute('href', zap(a.dataset.whatsapp));
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener');
  });

  const flutuante = document.getElementById('zap-flutuante');
  flutuante.setAttribute('href', zap('Olá! Vim pelo site e quero falar sobre energia solar.'));
  flutuante.setAttribute('target', '_blank');
  flutuante.setAttribute('rel', 'noopener');

  const btnSim = document.getElementById('btn-zap-simulador');
  if (btnSim) { btnSim.setAttribute('target', '_blank'); btnSim.setAttribute('rel', 'noopener'); }

  /* --------------------------------------------------------------- obras */
  const listaObras = document.getElementById('obras-lista');
  listaObras.innerHTML = OBRAS.map(function (o) {
    return '<article class="obra revelar">' +
      '<div class="obra__foto">' +
        '<img src="' + o.img + '" alt="' + o.alt + '" loading="lazy" width="760" height="570">' +
        '<span class="obra__badge">' + o.badge + '</span>' +
      '</div>' +
      '<div class="obra__corpo">' +
        '<h3 class="obra__bairro">' + o.bairro + '</h3>' +
        '<p class="obra__cidade">' + o.cidade + '</p>' +
        '<p class="obra__ficha">' + o.ficha.join('<br>') + '</p>' +
      '</div>' +
    '</article>';
  }).join('');

  /* ---------------------------------------------------------- depoimentos */
  document.getElementById('nota-valor').textContent = AVALIACAO.nota;
  document.getElementById('nota-texto').textContent = AVALIACAO.total;
  document.getElementById('nota-estrelas').innerHTML = estrela.repeat(5);

  document.getElementById('depo-lista').innerHTML = DEPOIMENTOS.map(function (d) {
    return '<article class="depoimento revelar">' +
      '<div class="depoimento__estrelas">' + estrela.repeat(5) + '</div>' +
      '<p class="depoimento__texto">"' + d.texto + '"</p>' +
      '<p class="depoimento__nome">' + d.nome + '</p>' +
      '<p class="depoimento__bairro">' + d.bairro + '</p>' +
    '</article>';
  }).join('');

  /* ------------------------------------------------------- contato e redes */
  const icones = {
    zap: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Z"/><path d="M8.6 8.5c0-.3.2-.5.4-.5h.6l.9 2-.5.7c.5 1 1.4 1.9 2.4 2.4l.7-.6 2 .9v.6c0 .3-.3.5-.6.5-3.3 0-5.9-2.6-5.9-6Z"/></svg>',
    fone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8.1 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z"/></svg>',
    email: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
    local: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    relogio: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    insta: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.6"/><path d="M17.5 6.5v.01"/></svg>',
    face: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8Z"/></svg>',
    tube: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3Z"/></svg>'
  };

  document.getElementById('rodape-contato').insertAdjacentHTML('beforeend',
    '<ul>' +
      '<li>' + icones.zap + '<a href="' + zap('Olá! Vim pelo site e quero falar sobre energia solar.') +
        '" target="_blank" rel="noopener">' + CONFIG.whatsappVisivel + '<br><small>WhatsApp</small></a></li>' +
      '<li>' + icones.fone + '<a href="tel:+' + CONFIG.whatsapp + '">' + CONFIG.whatsappVisivel + '<br><small>Ligar agora</small></a></li>' +
      '<li>' + icones.email + '<a href="mailto:' + CONFIG.email + '">' + CONFIG.email + '</a></li>' +
      '<li>' + icones.local + '<span>' + CONFIG.endereco + '</span></li>' +
      '<li>' + icones.relogio + '<span>' + CONFIG.horario + '</span></li>' +
    '</ul>'
  );

  document.getElementById('rodape-sociais').innerHTML =
    '<a href="' + CONFIG.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' + icones.insta + '</a>' +
    '<a href="' + CONFIG.facebook + '" target="_blank" rel="noopener" aria-label="Facebook">' + icones.face + '</a>' +
    '<a href="' + CONFIG.youtube + '" target="_blank" rel="noopener" aria-label="YouTube">' + icones.tube + '</a>' +
    '<a href="' + zap('Olá! Vim pelo site.') + '" target="_blank" rel="noopener" aria-label="WhatsApp">' + icones.zap + '</a>';

  document.getElementById('ano').textContent = new Date().getFullYear();

  /* ---------------------------------------------------------- menu mobile */
  const botaoMenu = document.getElementById('hamburguer');
  const menu = document.getElementById('menu');

  botaoMenu.addEventListener('click', function () {
    const aberto = menu.classList.toggle('aberto');
    botaoMenu.setAttribute('aria-expanded', String(aberto));
    botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('aberto');
      botaoMenu.setAttribute('aria-expanded', 'false');
    });
  });

  /* ------------------------------------------- cabeçalho e botão flutuante */
  const cabecalho = document.getElementById('cabecalho');
  function aoRolar() {
    const y = window.scrollY;
    cabecalho.classList.toggle('cabecalho--preso', y > 40);
    flutuante.classList.toggle('aparece', y > 600);
  }
  window.addEventListener('scroll', aoRolar, { passive: true });
  aoRolar();

  /* -------------------------------------------------- revelação ao rolar */
  const alvos = document.querySelectorAll('.revelar');
  if (semMovimento || !('IntersectionObserver' in window)) {
    alvos.forEach(function (a) { a.classList.add('visivel'); });
  } else {
    const observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        const irmaos = Array.prototype.slice.call(e.target.parentElement.children);
        const posicao = irmaos.indexOf(e.target);
        e.target.style.transitionDelay = Math.min(posicao, 6) * 70 + 'ms';
        e.target.classList.add('visivel');
        observador.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    alvos.forEach(function (a) { observador.observe(a); });
  }

  /* ------------------------------------------------ link ativo do menu */
  const secoes = ['inicio', 'simulador', 'servicos', 'obras', 'sobre', 'contato']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    const vigia = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        menu.querySelectorAll('a').forEach(function (a) {
          a.classList.toggle('ativo', a.getAttribute('href') === '#' + e.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secoes.forEach(function (s) { vigia.observe(s); });
  }
})();
