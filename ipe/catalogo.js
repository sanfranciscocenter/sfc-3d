// Catálogo da marca Ateliê Ipê para o configurador (mesmo formato de kf/catalogo.js).
// Tecidos: texto exato das opções de "Escolha o tecido (IPE):"; o código (237, P25, 255…) dá o arquivo ipe/tecidos/<código>.jpg.
// Linhas: Essencial = códigos numéricos, Premium = códigos P, Couro legítimo = opções "Couro …".
// Fotos: amostras do mostruário da fábrica já recortadas sem a faixa do logo (600 px), tratadas sem emenda.
const lista = (s) => s.split('|');
export const IPE = {
  pasta: 'ipe',
  selTecido: 'Escolha o tecido (IPE):',
  selMadeira: 'Escolha a cor da madeira (IPE):',
  cod: v => ((/P?\d+/.exec(v) || [])[0] || '').toLowerCase(),
  tipo: k => /Boucl/.test(k) ? 'boucle' : /^Couro/.test(k) ? 'couroFosco' : 'linhoKF',
  escala: k => /^Couro/.test(k) ? 0.10 / 0.07 : 1,
  tile: 0.10, tileCouro: 0.07,   // lado real da textura, em metros (estimado; a amostra não tem escala)
  linhas: [
    ['Essencial', lista('237 Baco|253 Conhaque|261 Bouclé Tinto|263 Piemonte|294 Castanho|295 Cúrcuma|296 Amêndoa|298 Domo')],
    ['Premium', lista('P1 Tunes Cinza|P2 Marfim|P3 Tunes Cru|P10 Umber|P13 Império|P14 Onix|P17 Nuvem|P18 Aveia|P23 Flora|P24 Magenta|P25 Santoro|P26 Paolo|P27 Murano|P28 Matizes|P29 Andirá|P30 Bento|P31 Trancoso')],
    ['Couro legítimo', lista('Couro 255 Camel|Couro 256 Marrom|Couro 257 Preto|Couro 291 Musgo|Couro 292 Off White')]
  ],
  mini: { arquivo: 'ipe/tecidos-mini.jpg', colunas: 10, linhas: 3, ordem: '237,253,261,263,294,295,296,298,p1,p2,p3,p10,p13,p14,p17,p18,p23,p24,p25,p26,p27,p28,p29,p30,p31,255,256,257,291,292'.split(',') },
  // madeira: [nome igual à opção do site, cor da bolinha, textura]. Cor tirada da amostra em esfera de cada opção do site.
  madeiras: [['Black Wood', '#272627', 'black-wood.jpg'], ['Nogueira', '#3D2D28', 'nogueira.jpg'], ['Mel', '#975435', 'mel.jpg'], ['Noce', '#956039', 'noce.jpg'], ['Champagne', '#BA8450', 'champagne.jpg'], ['Ébano', '#29282A', 'ebano.jpg']],
  metais: []
};