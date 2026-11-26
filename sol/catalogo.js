// Catálogo da marca Solenne (área externa) para o configurador — mesmo formato de kf/catalogo.js e lit/catalogo.js.
// Os anúncios Solenne não têm linhas de preço por tecido (derivação "Único"): um grupo só de tecidos.
// Tecidos: texto da opção de "Escolha o tecido (SOL):" (ex.: "SL-1 Creme"); arquivo sol/tecidos/<código em minúsculas>.jpg.
// Corda náutica: opções de "Escolha a cor da corda (SOL):"; entra no papel de tela (PALHA) do modelo, com textura em sol/telas/.
// Alumínio: opções de "Escolha a cor do alumínio (SOL):"; cor tirada da amostra do mostruário (pintura fosca).
const lista = (s) => s.split('|');
export const SOL = {
  pasta: 'sol',
  selTecido: 'Escolha o tecido (SOL):',
  cod: v => ((/^([A-Z]{2}-\d+)/.exec(v) || [])[1] || '').toLowerCase(),
  tile: 0.09, tileCouro: 0.09, telaTile: 0.04,   // lado real da textura, em metros (estimado pela amostra)
  linhas: [
    ['Tecidos', lista('SL-1 Creme|SL-2 Caqui|SL-3 Azul Marinho|SL-4 Preto|SL-15 Caqui Escuro Liso|SL-25 Preto Mesclado|SL-27 Bege Mesclado|SL-31 Azul|SL-32 Verde|SL-34 Cinza|TF-01 Mesclado Off White|TF-02 Mesclado Terra|TF-03 Grafite|TF-04 Boucle Branco|TF-05 Boucle Bege Claro|TF-07 Boucle Ocre|TQ-01 Taupe|TQ-02 Cinza Claro|TF-06 Boucle Bege Escuro')]
  ],
  tipo: k => /Boucle/.test(k) ? 'boucle' : 'linhoKF',
  mini: { arquivo: 'sol/tecidos-mini.jpg', colunas: 10, linhas: 2, ordem: 'sl-1,sl-2,sl-3,sl-4,sl-15,sl-25,sl-27,sl-31,sl-32,sl-34,tf-01,tf-02,tf-03,tf-04,tf-05,tf-07,tq-01,tq-02,tf-06'.split(',') },
  madeiras: [['—', '#777777']],   // a marca não tem escolha de madeira; o configurador exige ao menos uma entrada (grupo fica oculto)
  // corda náutica: [nome igual à opção do site, arquivo em sol/telas]
  telas: [['CD-5 Preto', 'cd-5.jpg'], ['CD-6 Preto Mesclado', 'cd-6.jpg'], ['CD-7 Verde', 'cd-7.jpg'], ['CD-8 Marrom Mesclado', 'cd-8.jpg'], ['CD-1 Rami', 'cd-1.jpg'], ['CD-2 Cinza', 'cd-2.jpg'], ['CD-3 Azul Marinho', 'cd-3.jpg'], ['CD-4 Azul Mesclado', 'cd-4.jpg'],
    ['CD-9 Bege Mesclado', 'cd-9.jpg'], ['CD-10 Cinza Mesclado', 'cd-10.jpg'], ['CD-11 Marsala', 'cd-11.jpg'], ['CD-12 Marrom', 'cd-12.jpg'], ['CD-13 Areia', 'cd-13.jpg'], ['CD-14 Prata', 'cd-14.jpg'], ['CD-15 Ocre', 'cd-15.jpg'], ['CD-16 Verde Claro', 'cd-16.jpg']],
  tituloTela: 'Corda náutica ', artigoTela: 'a corda',
  // alumínio: [nome igual à opção do site, cor]
  metais: [['AL-27 Azul Marinho', '#1C2738'], ['AL-28 Ocre', '#7A3414'], ['AL-29 Verde Claro', '#6E765C'], ['AL-25 Verde', '#465038'], ['AL-21 Fendi', '#85745F'], ['AL-9 Branco', '#E4DED4'], ['AL-10 Marrom', '#432C27'], ['AL-17 Vermelho', '#701018'],
    ['AL-22 Cinza', '#B9B7AE'], ['AL-23 Areia', '#D6C8AD'], ['AL-24 Azul', '#3A4D5E'], ['AL-19 Grafite', '#464646'], ['AL-20 Preto', '#0E0E0E'], ['AL-26 Marsala', '#632229'], ['AL-12 Azul', '#06296A']]
};
