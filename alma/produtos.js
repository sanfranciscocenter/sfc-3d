// Configuração de cada produto do configurador genérico (produto.html?p=<chave>).
// partes: papel de cada peça do GLB. Chave = nome do material no GLB, ou "#n" para a malha de índice n (tem prioridade).
// Papéis: madeira | tecido | palha | metal | preto | original | oculto
export const PRODUTOS = {
  'cartier-cadeira': {
    nome: 'Cadeira Cartier', sobre: 'Alma Mobília',
    glb: 'alma/modelos/cartier-cadeira.glb',
    palhaTile: 0.036,   // trama mais fina, como na foto do anúncio
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
