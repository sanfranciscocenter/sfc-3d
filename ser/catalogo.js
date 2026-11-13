// Catálogo da linha Serra (marca Share) para o configurador. Mesmo formato do catálogo da KF (kf/catalogo.js).
// Tecidos: o valor é o texto exato da opção em "Escolha o tecido (SER):" ("<Cor> - <código>"); o código dá o arquivo
// ser/tecidos/<código>.jpg. O grupo vem no fim do código: C = Essencial, B = Standard, A = Premium.
// Fotos: recorte de cada amostra do mostruário de tecidos em alta (PDF na pasta do fornecedor), tratado sem emenda.
const lista = (s) => s.split(';').map(x => x.trim());

export const SER = {
  pasta: 'ser',
  selTecido: 'Escolha o tecido (SER):',
  selMadeira: 'Escolha a madeira (SER):',
  cod: v => (/(\d{3}[ABC])\s*$/.exec(v) || [])[1],
  tipo: k => /Boucl/.test(k) ? 'boucle' : /^Courvin/.test(k) ? 'couroFosco' : /^Suede/.test(k) ? 'camurca' : 'linhoKF',
  // lado real que a textura cobre, em metros (estimado: o recorte usa ~83% da largura da amostra do mostruário)
  tile: 0.16,
  tileCouro: 0.16,
  linhas: [
    ['Essencial', lista('Suede Areia - 301C;Cru Pontilhado - 302C;Cinza Tela - 303C;Branco Gelo - 304C;Branco - 305C;Bouclê Areia - 306C;Cru Suave - 307C;Cinza Névoa - 308C')],
    ['Standard', lista('Cinza Trama - 202B;Verde Oliva - 203B;Grafite - 204B;Cinza Claro - 206B;Cru Tela - 207B;Cru Rústico - 208B;Branco Linho - 209B;Cinza Pérola - 210B;Taupe - 211B;Verde Musgo - 212B;Areia - 213B;Cinza Gelo - 214B;Taupe Chenille - 215B;Linho Cru - 216B;Bege Escuro - 218B;Manteiga - 219B;Espinha Cru - 220B;Espinha Oliva - 221B;Listrado Cru - 222B;Cru Texturizado - 223B;Bouclê Taupe - 224B;Bouclê Branco - 225B;Cru Liso - 226B;Cinza Xadrez - 227B;Linho Natural - 228B;Linho Bege - 229B;Cru Textura - 230B;Bouclê Musgo - 231B;Cru Claro - 234B;Courvin Oliva - 235B;Courvin Caramelo - 236B;Courvin Fendi - 237B;Courvin Grafite - 238B;Courvin Terracota - 239B;Courvin Off White - 240B;Courvin Preto - 241B;Courvin Branco - 242B;Courvin Laranja - 243B')],
    ['Premium', lista('Cru - 101A;Verde Profundo - 102A;Vermelho Rústico - 103A;Off White - 104A;Areia Mesclado - 105A;Caramelo Claro - 106A;Bege Trama - 107A;Cru Canelado - 108A;Palha - 109A;Cru Bouclê - 110A;Branco Bouclê - 111A;Marfim Bouclê - 112A')]
  ],
  // folha única de miniaturas (ser/tecidos-mini.jpg): grade de 10 colunas, na ordem abaixo
  mini: { arquivo: 'ser/tecidos-mini.jpg', colunas: 10, linhas: 6, ordem: '301C,302C,303C,304C,305C,306C,307C,308C,202B,203B,204B,206B,207B,208B,209B,210B,211B,212B,213B,214B,215B,216B,218B,219B,220B,221B,222B,223B,224B,225B,226B,227B,228B,229B,230B,231B,234B,235B,236B,237B,238B,239B,240B,241B,242B,243B,101A,102A,103A,104A,105A,106A,107A,108A,109A,110A,111A,112A'.split(',') },
  // madeira: [nome (igual à opção do site), cor da bolinha, textura]. Cor tirada da amostra em esfera de cada opção
  // do site; o veio é o de madeira real, pintado nesse tom.
  madeiras: [['Castanho', '#C79A95', 'castanho.jpg'], ['Cinamomo', '#A87759', 'cinamomo.jpg'], ['Jequitibá', '#8F6046', 'jequitiba.jpg'], ['Mel', '#D5986E', 'mel.jpg'], ['Ebanizado', '#292421', 'ebanizado.jpg'], ['Nogueira', '#684539', 'nogueira.jpg']],
  metais: []
};
