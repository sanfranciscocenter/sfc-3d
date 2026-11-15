// Catálogo da Ancezki para o configurador (mesmo formato de kf/catalogo.js e lit/catalogo.js).
// Tecidos: o valor é o texto exato da opção de "Escolha o tecido (ANC):" (ex.: AL-01); arquivo anc/tecidos/<código>.jpg.
// Linhas de preço do site (derivação 208), conforme o widget 19: Essencial = AL + CR · Standard = CM · Premium = PL · Couro legítimo = CO.
// Fonte das fotos: amostras do próprio site (widget 19), lidas em 15/11/2026.
const faixa = (p, s) => s.split(',').map(n => p + '-' + n);
export const ANC = {
  pasta: 'anc',
  selTecido: 'Escolha o tecido (ANC):',
  cod: v => v,
  tile: 0.10, tileCouro: 0.10,   // lado real da textura, em metros (estimado; a amostra não tem escala)
  linhas: [
    ['Essencial', [...faixa('AL', '01,02,03,04,05,06,07,08,09,10,13,14,15,16,17,19,20,21'), ...faixa('CR', '83,85,121,123,124,144,145,146,147,148,149,150,151,153,154,155,156,157,158,159,160,161,162,164,165,166,167,168,169,170,171,172,173')]],
    ['Standard', faixa('CM', '18,138,167,168,169,173,174,177,178,179,194,195,196,197,198,199,200,201,202,203,204,205,206,212,213')],
    ['Premium', faixa('PL', '149,150,151')],
    ['Couro legítimo', faixa('CO', '01,02,03,04,05,06,07,08,09')]
  ],
  tipo: k => /^CO-/.test(k) ? 'couroFosco' : /^AL-/.test(k) ? 'boucle' : 'linhoKF',
  mini: { arquivo: 'anc/tecidos-mini.jpg', colunas: 10, linhas: 9, ordem: [...faixa('AL', '01,02,03,04,05,06,07,08,09,10,13,14,15,16,17,19,20,21'), ...faixa('CR', '83,85,121,123,124,144,145,146,147,148,149,150,151,153,154,155,156,157,158,159,160,161,162,164,165,166,167,168,169,170,171,172,173'), ...faixa('CM', '18,138,167,168,169,173,174,177,178,179,194,195,196,197,198,199,200,201,202,203,204,205,206,212,213'), ...faixa('PL', '149,150,151'), ...faixa('CO', '01,02,03,04,05,06,07,08,09')] },
  // madeira: [nome igual à opção do site, cor da bolinha, textura em anc/madeiras, null, grupo]
  // grupo 'mad' = "Escolha a madeira (ANC):" (maciça; as amostras do site são esferas, então o veio vem da lâmina, no tom da esfera)
  // grupo 'lam' = "Escolha a lâmina (ANC):" (foto real da amostra). O produto diz qual grupo usa em grupoMad.
  madeiras: [
    ['Castanho', '#825E4A', 'mad-castanho.jpg', null, 'mad'], ['Nogueira', '#6E5F58', 'mad-nogueira.jpg', null, 'mad'], ['Preto Ébano', '#2E3134', 'mad-preto-ebano.jpg', null, 'mad'],
    ['Nogueira', '#886854', 'lam-nogueira.jpg', null, 'lam'], ['Freijó', '#C5935C', 'lam-freijo.jpg', null, 'lam'], ['Quartier', '#56483F', 'lam-quartier.jpg', null, 'lam'], ['Preto Ébano', '#2E3134', 'lam-preto-ebano.jpg', null, 'lam']
  ],
  // metal: nome igual à opção de "Escolha a cor do metal (ANC):"; cor aproximada da esfera de amostra do site
  // laca ou pintura: nome igual à opção de "Escolha a laca ou pintura (ANC):"; cor aproximada da amostra do site
  lacas: [['Preto', '#1E1E1E'], ['Fendi', '#B3A38D'], ['Tabaco', '#6B4B36']],
  metais: [['Preto', '#1E1E1E'], ['Champagne', '#CFC9B4'], ['Dourado', '#C9B26A'], ['Bronze', '#8B8472'], ['Grafite', '#5F6767'], ['Moka', '#7A6359'], ['Marino', '#3A566E'], ['Cinza', '#8A9395'], ['Coral', '#E0A06C']]
};
