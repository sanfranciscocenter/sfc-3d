// Configuração de cada produto do configurador genérico (produto.html?p=<chave>).
// partes: papel de cada peça do GLB. Chave = nome do material no GLB, ou "#n" para a malha de índice n (tem prioridade).
// Papéis: madeira | tecido | palha | metal | preto | original | oculto
export const PRODUTOS = {
  'mestre-cadeira': { nome: 'Cadeira Mestre', sobre: 'Alma Mobília', glb: 'alma/modelos/mestre-cadeira.glb',
    // #0 a #3 pernas, #5 #6 travessas do assento, #7 régua de madeira sob o encosto; #4 assento e #8 faixa do encosto/braços (tecido)
    partes: { '4ba03d1a7754a6e93869e27b148a06ad1': 'madeira', '*28': 'tecido' } },
  'ivo-cadeira': { nome: 'Cadeira Ivo', sobre: 'Alma Mobília', glb: 'alma/modelos/ivo-cadeira.glb',
    // sem anúncio no site em 12/11/2026. #2 estrutura; #1 assento e #3 encosto (tecido); #0 filete de metal no encosto; #4 plano solto no chão (escondido)
    partes: { '*': 'madeira', '[Suede Green]': 'tecido', '[Steel Brushed Stainless]': 'metal', 'mat0': 'oculto' } },
  'ivo-banqueta': { nome: 'Banqueta Ivo', sobre: 'Alma Mobília', glb: 'alma/modelos/ivo-banqueta.glb',
    // sem anúncio no site em 12/11/2026
    partes: { '*': 'madeira', '[Suede Green]': 'tecido', '[Steel Brushed Stainless]': 'metal', 'mat0': 'metal' } },
  'maracaja-cadeira': { nome: 'Cadeira Maracajá Assento Estofado', sobre: 'Alma Mobília', glb: 'alma/modelos/maracaja-cadeira.glb',
    // #0 estrutura; #1 assento estofado; #3 e #4 as duas faces do encosto em palha; #2 sapatas
    partes: { 'Material #79': 'madeira', 'Material #77': 'tecido', 'Material #78': 'palha', 'Material #80': 'oculto', 'Material #81': 'preto' } },
  'maracaja-banqueta': { nome: 'Banqueta Maracajá', sobre: 'Alma Mobília', glb: 'alma/modelos/maracaja-banqueta.glb',
    // sem anúncio no site em 12/11/2026
    partes: { 'Material #79': 'madeira', 'Material #77': 'tecido', 'Material #78': 'palha', 'Material #80': 'oculto', 'Material #81': 'preto' } },
  'dragao-banqueta': { nome: 'Banqueta Dragão do Mar', sobre: 'Alma Mobília', glb: 'alma/modelos/dragao-banqueta.glb',
    // sem anúncio no site em 12/11/2026 (só existe o da cadeira). #1 é a rede de corda do encosto
    partes: { 'Material #89': 'madeira', 'Material #87': 'tecido', 'Material #88': 'vivo' } },
  'ollie-cadeira': { nome: 'Cadeira Ollie', sobre: 'Alma Mobília', glb: 'alma/modelos/ollie-cadeira.glb',
    // sem anúncio no site em 12/11/2026
    partes: { 'PRETO': 'madeira', 'Fabric_Velvet_Nuts': 'tecido' } },
  'origami-cadeira': { nome: 'Cadeira Origami', sobre: 'Alma Mobília', glb: 'alma/modelos/origami-cadeira.glb',
    // #0 assento e encosto (tecido); #1 a #4 travessas e #5 pernas (madeira)
    partes: { '*1': 'tecido', '*3': 'madeira', '*': 'madeira' } },
  'origami-cadeira-palha': { nome: 'Cadeira Origami Assento em Palha', sobre: 'Alma Mobília', glb: 'alma/modelos/origami-cadeira-palha.glb',
    // #0 a #4 estrutura e quadro do assento (madeira); #5 encosto estofado; #6 tela de palha do assento
    partes: { '*': 'madeira', '*2': 'tecido', '*1': 'palha' } },
  'origami-banqueta': { nome: 'Banqueta Origami', sobre: 'Alma Mobília', glb: 'alma/modelos/origami-banqueta.glb',
    // O bloco da fábrica é o da versão em palha. No anúncio a banqueta é toda estofada:
    // #4 (quadro do assento) e #5 (tela) viram a almofada do assento; #6 encosto estofado; o resto é madeira
    partes: { '*': 'madeira', '*3': 'tecido', '*2': 'tecido', '*1': 'tecido' } },
  'cassa-cadeira': {
    nome: 'Cadeira Cassa', sobre: 'Alma Mobília', glb: 'alma/modelos/cassa-cadeira.glb',
    escala: 0.1,   // o bloco veio 10× maior (5,4 m de largura)
    corMetal: '#C8A35A',   // botões de latão atrás do encosto (foto de detalhe do anúncio)
    // #0 quadro do assento, #3 pernas (madeira); #1 assento e encosto (tecido); #2 dois botões atrás do encosto (metal)
    partes: { '*3': 'madeira', '*1': 'tecido', '*4': 'metal' }
  },
  'cassa-banqueta': {
    nome: 'Banqueta Cassa', sobre: 'Alma Mobília', glb: 'alma/modelos/cassa-banqueta.glb',
    corMetal: '#C8A35A',
    // #0 pernas, #1 quadro e travessas (madeira); #2 assento e encosto (tecido); #3 dois botões atrás do encosto (metal)
    partes: { '*': 'madeira', '*1': 'tecido', '*2': 'metal' }
  },
  'cartier-cadeira': {
    nome: 'Cadeira Cartier', sobre: 'Alma Mobília',
    glb: 'alma/modelos/cartier-cadeira.glb',
    // trama da palha: a mesma da Pivot (padrão 0,054). Matheus confirmou em 12/11/2026; não usar palhaTile aqui.
    // #2 é o aro em volta da palha do assento (o vivo); #3 palha do assento; #4 palha do encosto
    partes: { '*1': 'madeira', '#2': 'vivo', '*': 'palha', '*2': 'palha' },
    forro: ['#3'],   // na foto real o assento não é vazado: fundo liso atrás da palha
    vivoMinY: 0.475, // abaixo disso a palha entra atrás do assento
    corteY: { '#4': 0.415 },   // sobras da palha do encosto que apareciam ao lado do assento
    vivo: ['#4'],  // cordão de acabamento em volta da palha do encosto (não existe no bloco)
    // Correção do bloco: o encosto veio em arco; na peça real é um retângulo de cantos arredondados, um pouco mais largo em cima
    encostoReto: { pecas: ['#0', '#4'], yBase: 0.45, y0: 0.66, topo: 0.785, a: 0.203, n: 4.5, abre: 0.05 }
  }
};
