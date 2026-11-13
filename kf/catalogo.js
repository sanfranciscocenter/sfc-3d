// Catálogo da KF Mobiliário para o configurador (lido do anúncio /sofa-portos em 12/11/2026).
// Tecidos: o valor é o texto exato da opção em "Escolha o tecido (KF):"; o código (número no fim) dá o arquivo
// kf/tecidos/<código>.jpg (textura) e kf/tecidos-mini/<código>.jpg (miniatura). Fonte das fotos: mostruário T-091.
const lista = (s) => s.split(',').map(x => x.trim()
  .replace(/^CS /, 'Couro Sintético ').replace(/^B /, 'Bouclé ').replace(/^L /, 'Linho ').replace(/^V /, 'Veludo ').replace(/^S /, 'Suéde ').replace(/^N /, 'Nobuck '));

export const KF = {
  selTecido: 'Escolha o tecido (KF):',
  selMetal: 'Escolha o metal (KF)',
  // lado real que a textura cobre, em metros (estimado; a foto do mostruário não tem escala)
  tile: 0.10,         // tecido: pela conta seriam ~0,065 (foto de ~10 cm, uso de 72% do centro), mas Matheus achou a trama pequena demais: aumentado em 13/11/2026
  tileCouro: 0.0145,  // couro: pela conta ~0,0165; Matheus pediu a textura um pouquinho menor (13/11/2026)
  linhas: [
    ['Essencial', lista('V 3323,S 3322,V 3321,V 3320,V 3319,L 3318,V 3317,V 3316,V 3315,V 3314,B 3313,B 3312,B 3311,S 3310,V 3309,V 3308,V 3307,L 3306,S 3305,L 3304,B 3303,B 3302,B 3301,L 3299,V 3283,L 3174,L 2045,L 2044,L 2043,L 2042,L 2041,L 2040,L 217,L 216,L 214')],
    ['Standard', lista('B 6363,B 6362,B 6361,L 6360,L 6359,L 6355,L 6354,L 6346,L 6345,L 6344,B 6342,L 6341,L 6332,L 6331,L 6330,L 6327,S 6323,S 5357,S 5356,L 5354,L 5351,L 5350,S 5348,S 5347,S 5346,L 5344,L 5343,L 5333,L 5332,L 5329,L 5327,L 5278,L 5277,B 4402,L 4401,L 4400,B 4399,L 4398,B 4397,B 4396,L 4395,L 4394,L 4393,N 4391,N 4390,N 4389,N 4388,L 4387,L 4386,L 4385,CS 4384,CS 4383,CS 4382,CS 4381,S 4366,B 4364,L 4362,L 4357,L 4356,L 4355,S 4354,S 4353,S 4352,S 4351,L 4341,L 4319')],
    ['Premium', lista('B 8014,B 8013,B 8012,L 8011,L 8010,V 8009,L 8008,L 8007,L 7235,L 7234,L 7233,B 7232,L 7231,B 7228,B 7219,L 7217,L 7209,L 7208,L 7167,L 7166,L 7162')],
    // Linha C da tabela KF (a que está no site). Nomes criados por nós a partir da cor da amostra + o código da KF;
    // AGUARDAM aprovação de Matheus e a troca no site (hoje as opções lá se chamam "Couro legítimo Safari <cor>").
    // A linha A (A30–A34, mais cara) fica para depois.
    ['Couro legítimo', ['Couro legítimo Nero C30', 'Couro legítimo Musgo C31', 'Couro legítimo Fumê C32', 'Couro legítimo Bordô C33', 'Couro legítimo Café C34', 'Couro legítimo Grafite C35', 'Couro legítimo Castanho C37', 'Couro legítimo Chocolate C38', 'Couro legítimo Caramelo C39', 'Couro legítimo Taupe C40', 'Couro legítimo Cinza C41', 'Couro legítimo Gelo C42', 'Couro legítimo Marfim C44']]
  ],
  // folha única de miniaturas (kf/tecidos-mini.jpg): grade de 15 colunas, na ordem abaixo
  mini: { arquivo: 'kf/tecidos-mini.jpg', colunas: 15, linhas: 9, ordem: '2040,2041,2042,2043,2044,2045,214,216,217,3174,3283,3299,3301,3302,3303,3304,3305,3306,3307,3308,3309,3310,3311,3312,3313,3314,3315,3316,3317,3318,3319,3320,3321,3322,3323,4319,4341,4351,4352,4353,4354,4355,4356,4357,4362,4364,4366,4381,4382,4383,4384,4385,4386,4387,4388,4389,4390,4391,4393,4394,4395,4396,4397,4398,4399,4400,4401,4402,5277,5278,5327,5329,5332,5333,5343,5344,5346,5347,5348,5350,5351,5354,5356,5357,6323,6327,6330,6331,6332,6341,6342,6344,6345,6346,6354,6355,6359,6360,6361,6362,6363,7162,7166,7167,7208,7209,7217,7219,7228,7231,7232,7233,7234,7235,8007,8008,8009,8010,8011,8012,8013,8014,C30,C31,C32,C33,C34,C35,C37,C38,C39,C40,C41,C42,C44'.split(',') },
  // pintura dos pés (cores aproximadas das amostras do site)
  metais: [['Preto', '#1C1C1D'], ['Grafite', '#4B4C4F'], ['Champanhe', '#B8A888'], ['Fendi', '#A39584'], ['Off White', '#E4E0D6']]
};
