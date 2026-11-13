// Catálogo da marca Vindima para o configurador (mesmo formato de kf/catalogo.js).
// Tecidos: texto exato das opções de "Escolha o tecido (VND):" (nome + grupo de preço). Linhas do site:
// Essencial = G10 e G20, Standard = G30, Premium = G40; Couro legítimo usa outra personalização ("Escolha o couro (VND):").
// Arquivo de cada um: vnd/tecidos/<nome sem acento>.jpg (couros com prefixo "couro-", couro soleta com "soleta-").
const lista = (s) => s.split('|');
const sem = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s*\(g\d+\)\s*$/, '').trim().replace(/[^a-z0-9]+/g, '-');
const SOLETA = ['Caramelo', 'Café', 'Preto'];
const ehCouro = k => SOLETA.includes(k) || /^(La Paz|Dollaro)/.test(k), ehTela = k => /^(Sintética|Natural) /.test(k);
export const VND = {
  pasta: 'vnd', sem,
  selTecido: 'Escolha o tecido (VND):', selCouro: 'Escolha o couro (VND):',
  cod: v => SOLETA.includes(v) ? 'soleta-' + sem(v) : ehCouro(v) ? 'couro-' + sem(v) : ehTela(v) ? 'tela-' + sem(v) : sem(v),
  tipo: k => ehCouro(k) ? 'couroFosco' : ehTela(k) ? 'medio' : /^(Luna|Liz|Mavie)/.test(k) ? 'boucle' : 'linhoKF',
  escala: k => ehCouro(k) ? 0.10 / 0.07 : ehTela(k) ? 0.10 / 0.06 : 1,
  tile: 0.10, tileCouro: 0.07,   // lado real da textura, em metros (estimado; a amostra não tem escala)
  telaTile: 0.06,
  linhas: [
    ['Essencial', lista('Rita (G10)|Cibele (G10)|Jade (G10)|Karina (G10)|Anita (G20)|Paula (G20)|Angélica (G20)|Aurora (G20)|Sophia (G20)|Charlotte (G20)|Maressa (G20)|Ketlen (G20)|Liete (G20)|Lidy (G20)|Martina (G20)')],
    ['Standard', lista('Luna (G30)|Liz (G30)|Mavie (G30)|Elisa (G30)|Tassia (G30)|Zoe (G30)|Cloe (G30)|Alice (G30)|Angela (G30)|Yara (G30)|Zaira (G30)')],
    ['Premium', lista('Soraya (G40)|Valdete (G40)|Duquesa (G40)|Yasmin (G40)|Cora (G40)|Luana (G40)')],
    ['Couro legítimo', lista('La Paz Mel|La Paz Camel|La Paz Pinhão|La Paz Café|La Paz Esmeralda|Dollaro Off-white|Dollaro Kastanhe|Dollaro Preto')]
  ],
  // camas com cabeceira em tela: as telas entram na lista de tecidos, nas linhas do anúncio (texturas em vnd/tecidos/tela-*.jpg)
  linhasTela: [['Tela sintética', lista('Sintética sextavada creme|Sintética quadriculada creme')], ['Tela natural', lista('Natural Vanilla|Natural Cappuccino')]],
  mini: { arquivo: 'vnd/tecidos-mini.jpg', colunas: 11, linhas: 5, ordem: 'rita,cibele,jade,karina,anita,paula,angelica,aurora,sophia,charlotte,maressa,ketlen,liete,lidy,martina,luna,liz,mavie,elisa,tassia,zoe,cloe,alice,angela,yara,zaira,soraya,valdete,duquesa,yasmin,cora,luana,couro-la-paz-mel,couro-la-paz-camel,couro-la-paz-pinhao,couro-la-paz-cafe,couro-la-paz-esmeralda,couro-dollaro-off-white,couro-dollaro-kastanhe,couro-dollaro-preto,soleta-caramelo,soleta-cafe,soleta-preto,tela-sintetica-sextavada-creme,tela-sintetica-quadriculada-creme,tela-natural-vanilla,tela-natural-cappuccino,feltro-verde,feltro-azul,feltro-preto,feltro-vermelho'.split(',') },
  // madeira: [nome igual à opção do site, cor da bolinha, textura]. Cada produto lista as suas em "madeiras"
  // (jequitibá: In natura, Nogueira, Castanho, Envelhecido, Ebanizado; madeira: Natural, Nogueira, Castanho, Ebanizado).
  madeiras: [['Natural', '#AE7C42', 'natural.jpg'], ['In natura', '#A98070', 'in-natura.jpg'], ['Nogueira', '#B07845', 'nogueira.jpg'], ['Castanho', '#805D4A', 'castanho.jpg'], ['Envelhecido', '#6B3F22', 'envelhecido.jpg'], ['Ebanizado', '#252329', 'ebanizado.jpg'],
    // móveis em lâmina: madeira + cor (4º item: de qual madeira é e o valor da opção no site). Produto escolhe as madeiras em "laminas"
    ...[['In natura', '#A98070', 'in-natura'], ['Nogueira', '#B07845', 'nogueira'], ['Castanho', '#805D4A', 'castanho'], ['Envelhecido', '#6B3F22', 'envelhecido'], ['Ebanizado', '#252329', 'ebanizado']].map(([v, c, a]) => ['Jequitibá ' + v, c, a + '.jpg', { esp: 'jequitiba', valor: v }]),
    ...['cinamomo', 'carvalho'].flatMap(e => [['Natural', '#AC7A3F', 'natural'], ['Nogueira', '#AF7643', 'nogueira'], ['Castanho', '#7F5C48', 'castanho'], ['Envelhecido', '#6A3E21', 'envelhecido'], ['Ebanizado', '#252328', 'ebanizado']].map(([v, c, a]) => [(e === 'cinamomo' ? 'Cinamomo ' : 'Carvalho ') + v, c, e + '-' + a + '.jpg', { esp: e, valor: v }])),
    ...[['Branca', '#F4F3F0', 'branca'], ['Off-white', '#E5E2DB', 'off-white'], ['Fendi', '#C0B4A4', 'fendi'], ['Preta', '#272725', 'preta'], ['Cinza', '#BFBEBC', 'cinza'], ['Bege', '#D8CCBE', 'bege']].map(([v, c, a]) => ['Laca ' + v, c, 'laca-' + a + '.jpg', { esp: 'laca', valor: v }])],
  // cartão (linha) e personalização de cada madeira no site
  especies: {
    jequitiba: { linha: 'Lâmina de jequitibá', sel: 'Escolha a cor da lâmina de jequitibá (VND):' },
    cinamomo: { linha: 'Lâmina de cinamomo', sel: 'Escolha a cor da lâmina de cinamomo (VND):' },
    carvalho: { linha: 'Lâmina de carvalho', sel: 'Escolha a cor da lâmina de carvalho (VND):' },
    laca: { linha: 'Laca', sel: 'Escolha a laca (VND):' }
  },
  // tela: [nome igual à opção do site, textura]
  telas: [['Sintética sextavada creme', 'sintetica-sextavada-creme.png'], ['Sintética quadriculada creme', 'sintetica-quadriculada-creme.png'], ['Natural Vanilla', 'natural-vanilla.png'], ['Natural Cappuccino', 'natural-cappuccino.png']],
  // metal: [nome igual à opção de "Escolha a cor do metal (VND):", cor]
  metais: [['Preto', '#232323'], ['Dourado', '#B08D4C'], ['Champagne', '#C7B08A'], ['Pérola', '#D9D3C6']]
};
