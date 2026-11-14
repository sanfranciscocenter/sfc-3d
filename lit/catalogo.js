// Catálogo da linha Litoral para o configurador (mesmo formato de kf/catalogo.js e mcb/catalogo.js).
// Tecidos: texto da opção de "Escolha o tecido (LG):" (ex.: Linho 2030 Trad); arquivo lit/tecidos/<número>.jpg.
// Linhas de preço do site (derivação 208): Essencial = Trad · Standard = Prime + Eleg · Premium = Excl.
const lista = (s) => s.split('|');
export const LIT = {
  pasta: 'lit',
  selTecido: 'Escolha o tecido (LG):',
  cod: v => (/(\d{4})/.exec(v) || [])[1],
  tile: 0.08, tileCouro: 0.08, telaTile: 0.06,   // lado real da textura, em metros (estimado)
  linhas: [
    ['Essencial', lista('Lona 2014 Trad|Lona 2015 Trad|Linho 2030 Trad|Linho 2031 Trad|Linho 2034 Trad|Linho 2035 Trad|Linho Rústico 2040 Trad|Linho Rústico 2041 Trad|Linho 2042 Trad|Linho 2043 Trad|Linho 2044 Trad')],
    ['Standard', lista('Linho 4033 Prime|Linho 4038 Prime|Couríssimo 4047 Prime|Couríssimo 4051 Prime|Linho Aveludado 4058 Prime|Linho Aveludado 4059 Prime|Linho Aveludado 4066 Prime|Couríssimo PF 4072 Prime|Couríssimo PF 4073 Prime|Bouclê 4074 Prime|Bouclê 4075 Prime|Bouclê 4076 Prime|Linho 4077 Prime|Linho 4078 Prime|Linho 4079 Prime|Couríssimo 4080 Prime|Couríssimo 4081 Prime|Bouclê 6000 Eleg|Bouclê 6001 Eleg|Couríssimo 6010 Eleg|Couríssimo 6011 Eleg|Couríssimo 6012 Eleg|Linho 6019 Eleg|Linho 6020 Eleg|Linho 6021 Eleg|Linho 6026 Eleg|Linho 6027 Eleg|Linho 6029 Eleg|Linho 6030 Eleg|Linho 6031 Eleg|Linho 6032 Eleg|Linho 6033 Eleg|Linho 6034 Eleg|Linho c/ Proteção 6035 Eleg|Linho c/ Proteção 6036 Eleg|Linho c/ Proteção 6037 Eleg')],
    ['Premium', lista('Bouclê 8000 Excl|Linho 8001 Excl|Linho 8002 Excl|Linho 8003 Excl|Linho 8004 Excl|Linho 8005 Excl|Linho 8006 Excl|Linho 8007 Excl|Linho 8008 Excl|Linho 8009 Excl')]
  ],
  tipo: k => /^Boucl/.test(k) ? 'boucle' : /^Cour/.test(k) ? 'couroFosco' : /Aveludado/.test(k) ? 'camurca' : 'linhoKF',
  mini: { arquivo: 'lit/tecidos-mini.jpg', colunas: 10, linhas: 6, ordem: '2014,2015,2030,2031,2034,2035,2040,2041,2042,2043,2044,4033,4038,4047,4051,4058,4059,4066,4072,4073,4074,4075,4076,4077,4078,4079,4080,4081,6000,6001,6010,6011,6012,6019,6020,6021,6026,6027,6029,6030,6031,6032,6033,6034,6035,6036,6037,8000,8001,8002,8003,8004,8005,8006,8007,8008,8009'.split(',') },
  // madeira: [nome igual à opção de "Escolha a madeira (LG):", cor, textura em lit/madeiras]
  madeiras: [['Naturalíssimo', '#C4905A', 'naturalissimo.jpg'], ['Amêndoa', '#9C663A', 'amendoa.jpg'], ['Capuccino', '#5E3A22', 'capuccino.jpg'], ['Ebanizado', '#1E1A18', 'ebanizado.jpg']],
  // tela de ratan: [nome igual à opção de "Escolha a tela de ratan (LG):", arquivo em lit/telas]; .png = trama vazada (furos transparentes)
  telas: [['Ratan Naturalíssimo Aberto', 'naturalissimo-aberto.png'], ['Ratan Natural Aberto', 'natural-aberto.png'], ['Ratan Amêndoa Aberto', 'amendoa-aberto.png'], ['Ratan Capuccino Aberto', 'capuccino-aberto.png'], ['Ratan Preto Aberto', 'preto-aberto.png'], ['Ratan Sintético Aberto', 'sintetico-aberto.jpg'], ['Ratan Sintético Mesclado', 'sintetico-mesclado.jpg'], ['Ratan Tribal Aberto', 'tribal-aberto.jpg']],
  tituloTela: 'Tela de ratan ', artigoTela: 'a tela',
  metais: []
};
