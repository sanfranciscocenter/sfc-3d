// Catálogo da marca Marcobin para o configurador (mesmo formato de kf/catalogo.js).
// Tecidos: texto da opção de "Escolha o tecido (MAR):" (ex.: Sarja 592); arquivo mcb/tecidos/<número>.jpg.
// Linhas de preço do site (derivação 208): Essencial e Premium.
const lista = (s) => s.split('|');
export const MCB = {
  pasta: 'mcb',
  selTecido: 'Escolha o tecido (MAR):',
  cod: v => (/(\d{3,4})\s*$/.exec(v) || [])[1],
  tile: 0.07, tileCouro: 0.07, telaTile: 0.054,   // lado real da textura, em metros (estimado)
  linhas: [
    ['Essencial', lista('Sarja 592|Sarja 591|Sarja 589|Sarja 590|Linho 568|Linho 561|Linho 586|Linho 583|Linho 546|Linho 596|Linho 585|Linho 582|Linho 565|Linho 545|Linho 581|Linho 587|Linho 584|Linho 597|Linho 594|Linho 595|Linho 588|Couro Sintético 578|Couro Sintético 577|Couro Sintético 580|Couro Sintético 593|Couro Sintético 558|Sintético 574|Sintético 552|Sintético 554')],
    ['Premium', lista('Bouclé 1004|Bouclé 1003|Cesare 1001|Cesare 1002|Linho 1006|Linho 1007|Bouclé 1008|Tweed 1009|Tweed 1010|Malha 1005')]
  ],
  mini: { arquivo: 'mcb/tecidos-mini.jpg', colunas: 10, linhas: 4, ordem: '592,591,589,590,568,561,586,583,546,596,585,582,565,545,581,587,584,597,594,595,588,578,577,580,593,558,574,552,554,1004,1003,1001,1002,1006,1007,1008,1009,1010,1005'.split(',') },
  // madeira: [nome igual à opção de "Escolha a madeira (MAR):", cor, textura em mcb/madeiras]
  madeiras: [['Cinamomo', '#B07844', 'cinamomo.jpg'], ['Castanho', '#6C4124', 'castanho.jpg'], ['Preto', '#222121', 'preto.jpg']],
  // palha natural indiana (vazada) do encosto das Natura: arquivo .png = textura com transparência de pivot/palhas-v2 (a mesma da Alma)
  telas: [['Palha natural', 'pn01-natural.png']],
  tituloTela: 'Tela ', artigoTela: 'a tela',
  // metal do encosto das Natura: [nome igual à opção do site, cor]
  metais: [['Champanhe', '#B9A68C'], ['Dourado', '#C9A45A'], ['Preto', '#1C1C1C']]
};
