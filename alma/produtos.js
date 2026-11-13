// Configuração de cada produto do configurador genérico (produto.html?p=<chave>).
// partes: papel de cada peça do GLB. Chave = nome do material no GLB, ou "#n" para a malha de índice n (tem prioridade).
// Papéis: madeira | tecido | palha | metal | preto | original | oculto
export const PRODUTOS = {
  // KF Mobiliário (T-118): catálogo próprio em kf/catalogo.js. Piloto: Sofá Portos.
  // O bloco "KF - Sofá Alva" da Warehouse NÃO é o do anúncio (Matheus, 12/11/2026) — não usar.
  'kf-flow-poltrona': { nome: 'Poltrona Flow', sobre: 'KF Mobiliário', marca: 'kf', glb: 'kf/modelos/flow-poltrona.glb',
    // 120 × 82 × 81 cm; confere com as fotos do anúncio. TEC = almofadas e base estofada, MAD = 4 pés
    partes: { 'POLTRONA FLOW_TEC': 'tecido', 'POLTRONA FLOW_MAD': 'madeira' } },
  'kf-base-poltrona': { nome: 'Poltrona Base', sobre: 'KF Mobiliário', marca: 'kf', glb: 'kf/modelos/base-poltrona.glb',
    // SEM anúncio no site em 13/11/2026. O bloco divide as faces de cada peça em duas malhas (parecem duplicadas, mas
    // são metades complementares): usar todas. #2 a #5 = pés; o resto é estofado
    partes: { 'default_face_material': 'tecido', '#2': 'madeira', '#3': 'madeira', '#4': 'madeira', '#5': 'madeira' } },
  'kf-moss-chaise': { nome: 'Sofá Moss com Chaise Curva', sobre: 'KF Mobiliário', marca: 'kf', glb: 'kf/modelos/moss-chaise.glb',
    // Bloco "KF - Sofá MOSS" (77fb8bbd…): sofá + mesinha lateral + chaise redonda, 426 cm no bloco. Confere com as fotos.
    // O anúncio vende 340 e 380 cm: encolhe só a parte reta (entre o braço e a mesinha); a chaise não muda.
    // #1 mesinha (laca escura), #6 pés (pintura do metal), #2 #7 #4 almofadas do encosto, #0 almofada solta
    partes: { 'SOFÁ MOSS_TECIDO': 'tecido', '#1': 'preto', '#6': 'metal' },
    tamanhos: [340, 380], tamanhoBloco: 380,
    estica: { base: 4.26, zona: [-1.89, 0.03], rigido: 0.7 },
    ocultaEm: { 340: ['#7'] }   // no 340 cabem duas almofadas de encosto
  },
  'kf-base-sofa': { nome: 'Sofá Base', sobre: 'KF Mobiliário', marca: 'kf', glb: 'kf/modelos/base-sofa.glb',
    // Bloco "KF - Sofá Base" (a7c6c665…): sofá curvo, 248 cm no bloco; confere com as fotos. Faces em fragmentos soltos
    // (metades complementares, como na Poltrona Base): usar todas as malhas. #21 a #24 = pés ovais laminados
    // (da frente até atrás); #8 a #15 = as 4 almofadas soltas; #4 a #7 = acabamento da frente dos braços (tecido)
    partes: { 'default_face_material': 'tecido', '#21': 'madeira', '#22': 'madeira', '#23': 'madeira', '#24': 'madeira' },
    tamanhos: [200, 220, 240, 260], tamanhoBloco: 240,
    estica: { base: 2.48, braco: 0.30, rigido: 0.6, porMalha: true }
  },
  'kf-base-a-sofa': { nome: 'Sofá Base A', sobre: 'KF Mobiliário', marca: 'kf', glb: 'kf/modelos/base-sofa.glb',
    // Mesmo corpo do Sofá Base. Diferenças (fotos do anúncio): 4 pés de madeira em esfera no lugar dos pés ovais
    // e 5 almofadas (3 grandes de encosto + 2 menores viradas para dentro, junto aos braços). Pés e almofadas do
    // bloco ficam ocultos e os novos são gerados na página (extras).
    partes: { 'default_face_material': 'tecido', '#8': 'oculto', '#9': 'oculto', '#10': 'oculto', '#11': 'oculto', '#12': 'oculto', '#13': 'oculto', '#14': 'oculto', '#15': 'oculto', '#16': 'oculto',
      '#21': 'oculto', '#22': 'oculto', '#23': 'oculto', '#24': 'oculto' },
    tamanhos: [200, 220, 240, 260], tamanhoBloco: 240,
    estica: { base: 2.48, braco: 0.30, rigido: 0.6, porMalha: true },
    extras: [
      { tipo: 'esfera', papel: 'madeira', r: [0.04, 0.052, 0.04], pos: [-0.86, 0.05, 0.13] },
      { tipo: 'esfera', papel: 'madeira', r: [0.04, 0.052, 0.04], pos: [0.86, 0.05, 0.13] },
      { tipo: 'esfera', papel: 'madeira', r: [0.04, 0.052, 0.04], pos: [-0.86, 0.05, -0.42] },
      { tipo: 'esfera', papel: 'madeira', r: [0.04, 0.052, 0.04], pos: [0.86, 0.05, -0.42] },
      { tipo: 'almofada', papel: 'tecido', encolhe: true, tam: [0.58, 0.50, 0.17], rot: [-0.30, 0.10, 0], pos: [-0.60, 0.70, -0.33] },
      { tipo: 'almofada', papel: 'tecido', encolhe: true, tam: [0.58, 0.50, 0.17], rot: [-0.30, 0, 0], pos: [0, 0.70, -0.36] },
      { tipo: 'almofada', papel: 'tecido', encolhe: true, tam: [0.58, 0.50, 0.17], rot: [-0.30, -0.10, 0], pos: [0.60, 0.70, -0.33] },
      { tipo: 'almofada', papel: 'tecido', tam: [0.45, 0.45, 0.15], rot: [-0.28, 0.75, 0.10], pos: [-0.90, 0.67, -0.16] },
      { tipo: 'almofada', papel: 'tecido', tam: [0.45, 0.45, 0.15], rot: [-0.28, -0.75, -0.10], pos: [0.90, 0.67, -0.16] }
    ]
  },
  'kf-jades-sofa': { nome: 'Sofá Jades', sobre: 'KF Mobiliário', marca: 'kf', glb: 'kf/modelos/jades-sofa.glb',
    // Bloco "KF - Sofá Jades" (b487174c…): traz um módulo com braço + um módulo chaise. O anúncio é o sofá reto de
    // 2 módulos com braço: fica só o módulo com braço (x < 0,30 m), repetido espelhado do outro lado (Matheus, 13/11/2026).
    partes: { 'SOFA DE CANTO PAGGINI_TECIDO_SOFA': 'tecido', '#8': 'metal', '#9': 'metal' },   // #8 #9 = base e pés de metal do módulo com braço
    espelha: { corte: 0.30, zMax: 0.06 },
    tamanhos: [220, 260, 300, 380, 420], tamanhoBloco: 260,
    estica: { base: 2.68, braco: 0.12, rigido: 0.45, porMalha: true } },
  'kf-aura-sofa': { nome: 'Sofá Retrátil Aura', sobre: 'KF Mobiliário', marca: 'kf', glb: ['kf/modelos/aura-sofa-1.glb', 'kf/modelos/aura-sofa-2.glb'],   // bloco de 15 MB regravado sem texturas e dividido em dois
    // Bloco "KF - AURA" (27e73a58…): 3 módulos, um assento aberto, 322 cm de braço a braço; confere com a foto.
    // #0 = rodapé (escuro); #10 = as duas almofadas soltas sobre os braços. O anúncio só tem tecido e tamanho.
    partes: { '*': 'tecido', '#0': 'preto' },
    tamanhos: [270, 300, 330, 360, 390], tamanhoBloco: 330,
    estica: { base: 3.22, braco: 0.17, rigido: 0.6 } },
  'kf-vitta-sofa': { nome: 'Sofá Retrátil Vitta', sobre: 'KF Mobiliário', marca: 'kf', glb: 'kf/modelos/vitta-sofa.glb',
    // Bloco "KF - VITTA" (89de285d…): 2 módulos, assentos abertos, 250 cm; confere com a foto. O bloco traz 6 almofadas
    // soltas e a foto do anúncio mostra 2 (uma junto de cada braço): as 4 do meio ficam ocultas. #30 a #33 = pés.
    partes: { '*': 'tecido', '#0': 'oculto', '#1': 'oculto', '#2': 'oculto', '#3': 'oculto', '#18': 'oculto', '#19': 'oculto', '#28': 'oculto', '#29': 'oculto',
      '#30': 'metal', '#31': 'metal', '#32': 'metal', '#33': 'metal' },
    tamanhos: [210, 230, 250, 270, 290], tamanhoBloco: 250,
    estica: { base: 2.50, braco: 0.25, rigido: 0.6, porMalha: true } },
  'kf-verona-sofa': { nome: 'Sofá Verona', sobre: 'KF Mobiliário', marca: 'kf', glb: 'kf/modelos/verona-sofa.glb',
    // Bloco "KF - Sofa ALVA com Mesa 2" (81772623…; nome errado na Warehouse, é o Verona — Matheus, 13/11/2026), 276 cm.
    // Vem com o braço e a mesa em lados trocados em relação à foto do anúncio: invertido aqui. Só a parte estofada
    // estica; a mesa (59 cm) e o braço mantêm a medida. O bloco traz um assento inteiro; a foto mostra dois.
    partes: { '*': 'tecido', '[0135_DarkGray]': 'metal', 'madeira': 'madeira' },
    inverteX: true,
    tamanhos: [257, 277, 297], tamanhoBloco: 277,
    estica: { base: 2.76, zona: [-1.21, 0.79], rigido: 0.6, porMalha: true } },
  'kf-flow-sofa': { nome: 'Sofá Flow', sobre: 'KF Mobiliário', marca: 'kf', glb: 'kf/modelos/flow-poltrona.glb',
    // Não há bloco do sofá: montado a partir da Poltrona Flow (Matheus, 13/11/2026). A base estica, os braços e os pés
    // vão para as pontas, e a almofada do assento (#5) e a do encosto (#0) viram duas, como na foto do anúncio.
    partes: { 'POLTRONA FLOW_TEC': 'tecido', 'POLTRONA FLOW_MAD': 'madeira' },
    tamanhos: [185, 205, 225, 245, 265, 285], tamanhoBloco: 225,
    estica: { base: 1.20, braco: 0.30, rigido: 0.35, porMalha: true },
    duplica: { vao: 0.60, pecas: { '#5': 1.2, '#0': 1.02 } } },
  'kf-portos-sofa': {
    nome: 'Sofá Portos', sobre: 'KF Mobiliário', marca: 'kf', glb: 'kf/modelos/portos-sofa.glb',
    // bloco de 210 cm (um dos tamanhos do anúncio); Material.001 = estofado, Material.002 = pés
    partes: { 'SOFÁ MENDONZA_Material.001': 'tecido', 'SOFÁ MENDONZA_Material.002': 'metal' },
    tamanhos: [190, 210, 230, 250, 270], tamanhoBloco: 210,
    estica: { base: 2.10, braco: 0.25 }
  },
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
