/* ==========================================================================
   Curitiba Energia Solar - dados editáveis do site
   Tudo que muda com o tempo fica neste arquivo. Não precisa mexer no HTML.
   ========================================================================== */

/* --------------------------------------------------------------------------
   CONTATO
   PENDENTE: confirmar telefone fixo, e-mail e endereço com o cliente.
   Os marcados abaixo vieram do mockup e são provisórios.
   -------------------------------------------------------------------------- */
const CONFIG = {
  whatsapp: '5541999763827',
  whatsappVisivel: '(41) 99976-3827',
  email: 'claudinei@acdsolaretech.com.br',
  endereco: 'Curitiba e região metropolitana - PR', // PENDENTE endereço exato
  horario: 'Seg a Sex: 8h30 às 18h · Sáb: 8h30 às 13h', // PENDENTE confirmar
  instagram: 'https://instagram.com/curitibasolar_',
  facebook: '#',   // PENDENTE
  youtube: '#'     // PENDENTE
};

/* --------------------------------------------------------------------------
   PARÂMETROS DO SIMULADOR
   Calibrados contra os projetos que a empresa publica: 10 painéis de 640W
   (6,4 kWp) em Santa Felicidade deram R$ 533/mês no post e R$ 534 nesta conta.
   Se a concessionária reajustar, muda só a tarifa aqui embaixo.
   -------------------------------------------------------------------------- */
const PARAMS = {
  tarifa: 0.89,          // R$/kWh, tarifa residencial B1 com impostos
  performance: 0.78,     // perdas de inversor, cabo, temperatura e sujeira
  potenciaPainel: 620,   // watts por painel
  areaPainel: 2.58,      // m² por painel (2,28 x 1,13)
  folgaArea: 1.15,       // espaçamento entre fileiras
  reajusteAnual: 0.08,   // usado só na projeção de 25 anos
  taxaMinima: { mono: 30, bi: 50, tri: 100 } // kWh de custo de disponibilidade
};

/* --------------------------------------------------------------------------
   CIDADES ATENDIDAS E IRRADIAÇÃO (HSP, kWh/m²/dia)
   Fonte: médias anuais do Atlas Solarimétrico para a região.
   -------------------------------------------------------------------------- */
const CIDADES = [
  { nome: 'Curitiba', hsp: 4.10 },
  { nome: 'Almirante Tamandaré', hsp: 4.10 },
  { nome: 'Araucária', hsp: 4.12 },
  { nome: 'Balsa Nova', hsp: 4.16 },
  { nome: 'Bocaiúva do Sul', hsp: 4.08 },
  { nome: 'Campina Grande do Sul', hsp: 4.08 },
  { nome: 'Campo Largo', hsp: 4.15 },
  { nome: 'Campo Magro', hsp: 4.12 },
  { nome: 'Colombo', hsp: 4.10 },
  { nome: 'Contenda', hsp: 4.15 },
  { nome: 'Fazenda Rio Grande', hsp: 4.12 },
  { nome: 'Itaperuçu', hsp: 4.12 },
  { nome: 'Lapa', hsp: 4.20 },
  { nome: 'Mandirituba', hsp: 4.14 },
  { nome: 'Piraquara', hsp: 4.06 },
  { nome: 'Pinhais', hsp: 4.09 },
  { nome: 'Quatro Barras', hsp: 4.07 },
  { nome: 'Quitandinha', hsp: 4.12 },
  { nome: 'Rio Branco do Sul', hsp: 4.12 },
  { nome: 'São José dos Pinhais', hsp: 4.08 },
  { nome: 'Tijucas do Sul', hsp: 4.10 },
  { nome: 'Ponta Grossa', hsp: 4.35 },
  { nome: 'Paranaguá', hsp: 4.00 },
  { nome: 'Outra cidade do Paraná', hsp: 4.15 }
];

/* --------------------------------------------------------------------------
   OBRAS ENTREGUES
   As duas primeiras têm foto e ficha conferidas nos posts do cliente.
   As três últimas usam fotos reais dele, mas a ficha ainda não foi confirmada.
   PENDENTE: pedir foto + bairro + ficha de cada obra e completar aqui.
   -------------------------------------------------------------------------- */
const OBRAS = [
  {
    img: 'assets/img/obra-guabirotuba.webp',
    bairro: 'Guabirotuba',
    cidade: 'Curitiba - PR',
    badge: '9,76 kWp',
    ficha: ['16 módulos de 610W', '9,76 kWp de potência', 'economia R$ 784,32/mês'],
    alt: 'Vista aérea do telhado com 16 módulos solares instalados no Guabirotuba, Curitiba'
  },
  {
    img: 'assets/img/obra-piraquara.webp',
    bairro: 'Piraquara',
    cidade: 'Região metropolitana - PR',
    badge: '5,00 kWp',
    ficha: ['10 módulos instalados', '5,00 kWp de potência', 'inversor instalado e homologado'],
    alt: 'Vista aérea do telhado com 10 módulos solares instalados em Piraquara'
  },
  {
    img: 'assets/img/obra-telhado.webp',
    bairro: 'Telhado metálico',
    cidade: 'Curitiba - PR',
    badge: 'Em obra',
    ficha: ['fixação em telha metálica', 'módulos alinhados na mesma inclinação', 'ficha completa a confirmar'],
    alt: 'Instalador fixando módulos solares em telhado metálico'
  },
  {
    img: 'assets/img/obra-residencia.webp',
    bairro: 'Residência',
    cidade: 'Curitiba - PR',
    badge: 'Residencial',
    ficha: ['projeto residencial', 'módulos içados para o telhado', 'ficha completa a confirmar'],
    alt: 'Residência de dois pavimentos recebendo instalação de energia solar'
  },
  {
    img: 'assets/img/obra-modulos.webp',
    bairro: 'Módulos LONGi',
    cidade: 'Curitiba - PR',
    badge: '610W',
    ficha: ['módulos de 610W', 'chegada de material na obra', 'ficha completa a confirmar'],
    alt: 'Módulos solares LONGi de 610W entregues no local da obra'
  }
];

/* --------------------------------------------------------------------------
   DEPOIMENTOS
   PENDENTE: TODOS os depoimentos abaixo são exemplos de layout.
   Trocar por avaliações reais do Google antes de publicar o site.
   O mesmo vale para a nota 4,9 e o número de avaliações.
   -------------------------------------------------------------------------- */
const AVALIACAO = { nota: '4,9', total: 'avaliações no Google' };

const DEPOIMENTOS = [
  { texto: 'Excelente atendimento do pré-venda ao pós-venda. Projeto bem explicado e economia real já na primeira conta.', nome: 'Rodrigo M.', bairro: 'Santa Felicidade' },
  { texto: 'Instalação rápida e profissional. Acompanhei tudo pelo app, muito prático e confiável.', nome: 'Juliana R.', bairro: 'Água Verde' },
  { texto: 'Empresa séria, ficha técnica completa e suporte sempre que preciso. Recomendo demais.', nome: 'Carlos A.', bairro: 'Boqueirão' }
];
