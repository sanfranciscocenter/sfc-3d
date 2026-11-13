/* San Francisco Center · Configurador 3D
   Carregador que roda na página do produto: põe o botão "Personalize em 3D" sobre a foto,
   abre o pop-up e, ao confirmar, marca na página a madeira, a palha, o tecido e a linha escolhidos.
   Só age nos produtos listados em PRODUTOS. O 3D só é baixado quando o cliente clica. */
(() => {
  if (window.__sfc3d) return; window.__sfc3d = true;

  const BASE = 'https://sanfranciscocenter.github.io/sfc-3d/';
  const ORIGEM = 'https://sanfranciscocenter.github.io';
  // caminho da página do produto -> página do configurador e nome exato de cada personalização
  const PRODUTOS = {
    '/cadeira-pivot': {
      pagina: 'pivot.html', params: 'enc=palha', derivacao: 208,
      sel: { madeira: 'Escolha a madeira (AL):', tela: 'Escolha a tela (AL):', acabamento: 'Escolha o acabamento (CRN):' }
    },
    // mesmo modelo, anúncio separado: só encosto estofado (não tem a personalização de tela)
    '/cadeira-pivot-encosto-estofado': {
      pagina: 'pivot.html', params: 'enc=estofado', derivacao: 208,
      sel: { madeira: 'Escolha a madeira (AL):', acabamento: 'Escolha o acabamento (CRN):' }
    },
    // configurador genérico (produto.html?p=<chave>); sem derivacao = produto sem linhas de tecido
    '/cadeira-cassa': {
      pagina: 'produto.html', params: 'p=cassa-cadeira', derivacao: 208,
      sel: { madeira: 'Escolha a madeira (AL):', acabamento: 'Escolha o acabamento (CRN):' }
    },
    '/banqueta-cassa': {
      pagina: 'produto.html', params: 'p=cassa-banqueta', derivacao: 208,
      sel: { madeira: 'Escolha a madeira (AL):', acabamento: 'Escolha o acabamento (CRN):' }
    },
    '/cadeira-origami': {
      pagina: 'produto.html', params: 'p=origami-cadeira', derivacao: 208,
      sel: { madeira: 'Escolha a madeira (AL):', acabamento: 'Escolha o acabamento (CRN):' }
    },
    '/cadeira-origami-assento-em-palha': {
      pagina: 'produto.html', params: 'p=origami-cadeira-palha', derivacao: 208,
      sel: { madeira: 'Escolha a madeira (AL):', tela: 'Escolha a tela (AL):', acabamento: 'Escolha o acabamento (CRN):' }
    },
    '/banqueta-origami': {
      pagina: 'produto.html', params: 'p=origami-banqueta', derivacao: 208,
      sel: { madeira: 'Escolha a madeira (AL):', acabamento: 'Escolha o acabamento (CRN):' }
    },
    '/cadeira-mestre': {
      pagina: 'produto.html', params: 'p=mestre-cadeira', derivacao: 208,
      sel: { madeira: 'Escolha a madeira (AL):', acabamento: 'Escolha o acabamento (CRN):' }
    },
    '/cadeira-maracaja': {
      pagina: 'produto.html', params: 'p=maracaja-cadeira', derivacao: 208,
      sel: { madeira: 'Escolha a madeira (AL):', tela: 'Escolha a tela (AL):', acabamento: 'Escolha o acabamento (CRN):' }
    },
    // KF Mobiliário: tecido + metal (ou madeira) + tamanho (derivação 181, cartões .sfc-tamc)
    '/sofa-portos': {
      pagina: 'produto.html', params: 'p=kf-portos-sofa', derivacao: 208, tamanho: 181,
      sel: { acabamento: 'Escolha o tecido (KF):', metal: 'Escolha o metal (KF)' }
    },
    '/poltrona-flow-kf-polflow': {
      pagina: 'produto.html', params: 'p=kf-flow-poltrona', derivacao: 208,
      sel: { acabamento: 'Escolha o tecido (KF):', madeira: 'Escolha a madeira (KF):' }
    },
    // KF: sofás com tamanho (derivação 181) — ligados em 13/11/2026 a pedido de Matheus
    '/sofa-moss-com-chaise-curva': { pagina: 'produto.html', params: 'p=kf-moss-chaise', derivacao: 208, tamanho: 181, sel: { acabamento: 'Escolha o tecido (KF):', metal: 'Escolha o metal (KF)' } },
    '/sofa-base-kf-base2026': { pagina: 'produto.html', params: 'p=kf-base-sofa', derivacao: 208, tamanho: 181, sel: { acabamento: 'Escolha o tecido (KF):', madeira: 'Escolha a madeira (KF):' } },
    '/sofa-base-a': { pagina: 'produto.html', params: 'p=kf-base-a-sofa', derivacao: 208, tamanho: 181, sel: { acabamento: 'Escolha o tecido (KF):' } },   // pés de madeira; o anúncio não tem escolha de madeira
    '/sofa-jades-kf-jades': { pagina: 'produto.html', params: 'p=kf-jades-sofa', derivacao: 208, tamanho: 181, sel: { acabamento: 'Escolha o tecido (KF):', metal: 'Escolha o metal (KF)' } },
    '/sofa-retratil-aura': { pagina: 'produto.html', params: 'p=kf-aura-sofa', derivacao: 208, tamanho: 181, sel: { acabamento: 'Escolha o tecido (KF):' } },
    '/sofa-retratil-vitta': { pagina: 'produto.html', params: 'p=kf-vitta-sofa', derivacao: 208, tamanho: 181, sel: { acabamento: 'Escolha o tecido (KF):', metal: 'Escolha o metal (KF)' } },
    '/sofa-verona': { pagina: 'produto.html', params: 'p=kf-verona-sofa', derivacao: 208, tamanho: 181, sel: { acabamento: 'Escolha o tecido (KF):', metal: 'Escolha o metal (KF)' } },
    '/sofa-flow-kf-flow': { pagina: 'produto.html', params: 'p=kf-flow-sofa', derivacao: 208, tamanho: 181, sel: { acabamento: 'Escolha o tecido (KF):', madeira: 'Escolha a madeira (KF):' } },
    // Buriti: poltronas, pufes e chaise — só tecido/couro (uma personalização), linhas de preço na derivação 208
    ...Object.fromEntries([['poltrona-giratoria-omen', 'poltrona-olden'], ['poltrona-amora', 'poltrona-aurora'], ['poltrona-lauren', 'poltrona-lauren'], ['poltrona-vicenzo', 'poltrona-vicenzo'], ['poltrona-zoe', 'poltrona-zoe'], ['chaise-luna', 'chaise-luna'], ['pufe-luna-chaise', 'pufe-luna-chaise'], ['poltrona-melissa', 'poltrona-melissa'], ['poltrona-lucy', 'poltrona-lucy'], ['pufe-olden', 'pufe-olden'], ['poltrona-luna-antigo', 'poltrona-luna'], ['poltrona-donatella', 'poltrona-donatella'], ['poltrona-costela', 'poltrona-costela'], ['pufe-costela', 'pufe-costela'], ['poltrona-mirela', 'poltrona-mirela'], ['poltrona-bela', 'poltrona-bela'], ['pufe-zoe', 'pufe-zoe'], ['pufe-albany', 'pufe-albany'], ['pufe-target', 'pufe-target'], ['recamier-target', 'recamier-target'], ['pufe-paleta', 'pufe-paleta']]
      .map(([url, chave]) => ['/' + url, { pagina: 'produto.html', params: 'p=bur-' + chave, derivacao: 208, sel: { acabamento: 'Escolha o tecido: (BUR)' } }])),
    // Buriti, sofás: tecido/couro + tamanho (derivação 186 "Tamanhos Buriti"); o Madri de Canto não tem tamanho
    ...Object.fromEntries(['sofa-sonata', 'sofa-solace-2-modulos', 'sofa-sevilha', 'sofa-sevilha-com-chaise', 'sofa-pluma-linhas', 'sofa-naturale-linhas', 'sofa-hype-2-modulos', 'sofa-milano-2-modulos', 'sofa-antares-super-modulo', 'sofa-austin-2-modulos', 'sofa-valentina-2-modulos', 'sofa-duomo-3-modulos', 'sofa-cartago-3-modulos', 'sofa-madri-3-modulos', 'sofa-retratil-empireo-linhas', 'sofa-new-audax-com-summie', 'sofa-freedom-3-modulos-com-chaise', 'sofa-reboot-3-modulos', 'sofa-hush-3-modulos', 'sofa-vigore-3-modulos', 'sofa-vicenzo', 'sofa-finale-3-modulos-com-consoles', 'sofa-lumier-2-modulos-com-puf',
      // montados por recomposição de módulos (o bloco da fábrica traz outra configuração)
      'sofa-madri-2-modulos', 'sofa-madri-com-chaise', 'sofa-madri-com-chaise-4-modulos', 'sofa-duomo-2-modulos', 'sofa-milano-3-modulos', 'sofa-antares-com-chaise', 'sofa-empireo-2-modulos', 'sofa-new-audax-2-modulos', 'sofa-freedom-2-modulos', 'sofa-freedom-2-modulos-com-chaise', 'sofa-pluma-bipartido']
      .map(u => ['/' + u, { pagina: 'produto.html', params: 'p=bur-' + u, derivacao: 208, tamanho: 186, sel: { acabamento: 'Escolha o tecido: (BUR)' } }])),
    '/sofa-madri-de-canto': { pagina: 'produto.html', params: 'p=bur-sofa-madri-de-canto', derivacao: 208, sel: { acabamento: 'Escolha o tecido: (BUR)' } },
    // Ateliê Ipê: tecido + cor da madeira, linhas de preço na derivação 208
    ...Object.fromEntries(['cadeira-calice', 'cadeira-folhagem', 'poltrona-bruma', 'poltrona-talhe']
      .map(u => ['/' + u, { pagina: 'produto.html', params: 'p=ipe-' + u, derivacao: 208, sel: { acabamento: 'Escolha o tecido (IPE):', madeira: 'Escolha a cor da madeira (IPE):' } }])),
    // Vindima: tecido e couro em personalizações separadas (a linha de preço diz qual vale), telas, madeira e,
    // nas camas, tamanho em cartões com nome (Solteiro, Casal, Queen, King); "cartoes" = outras escolhas em cartão
    ...Object.fromEntries((() => {
      const T = 'Escolha o tecido (VND):', C = 'Escolha o couro (VND):', TL = 'Escolha a tela (VND):', J = 'Escolha o acabamento do jequitibá (VND):', M = 'Escolha o acabamento da madeira (VND):';
      return [
        ['cama-pinotage', { derivacao: 208, cartoes: true, sel: { acabamento: T, couro: C, madeira: J } }],
        ['cadeira-gamay', { derivacao: 208, sel: { acabamento: T, couro: C, madeira: M } }],
        ['recamier-friulano', { derivacao: 208, sel: { acabamento: T, couro: C, madeira: M } }],
        ['cama-riesling', { derivacao: 208, cartoes: true, sel: { acabamento: TL, madeira: J } }],
        ['cama-tannat', { derivacao: 208, cartoes: true, sel: { acabamento: T, couro: C, telaLinha: TL, madeira: M } }],
        ['cadeira-moscato', { derivacao: 208, cartoes: true, sel: { acabamento: T, couro: C, tela: TL, madeira: M } }],
        ['cama-viognier', { cartoes: true, sel: { madeira: J } }],
        ['cama-verdicchio', { cartoes: true, sel: { madeira: J } }],
        ['poltrona-trebbiano', { sel: { acabamento: 'Escolha o couro da poltrona (VND):', madeira: J } }],
        ['cadeira-trebbiano', { derivacao: 208, cartoes: true, sel: { acabamento: T, couro: C, tela: TL, madeira: J } }],
        ['cama-teroldego', { cartoes: true, sel: { madeira: J } }]
      ].map(([u, c]) => ['/' + u, { pagina: 'produto.html', params: 'p=vnd-' + u, ...c }]);
    })()),
    // Vindima, fase 2 (mesas, aparadores, cômodas, luminárias…): L = móvel em lâmina (a madeira é um cartão e cada madeira tem
    // a sua personalização de cor; o 3D manda o nome da personalização), J/M = madeira maciça, X = metal, TL = tela
    ...Object.fromEntries((() => {
      const J = 'Escolha o acabamento do jequitibá (VND):', M = 'Escolha o acabamento da madeira (VND):', X = 'Escolha a cor do metal (VND):', TL = 'Escolha a tela (VND):', L = 'Escolha a cor da lâmina de cinamomo (VND):';
      const lam = 'mesa-auxiliar-glera aparador-sagrantino mesa-auxiliar-fiano aparador-pecorino mesa-de-centro-zinfandel mesa-de-centro-tempranillo mesa-auxiliar-tempranillo mesa-de-cabeceira-alvarinho mesa-auxiliar-semillon mesa-auxiliar-lambrusco mesa-de-centro-pinot-com-tampo-de-espelho mesa-auxiliar-pinot mesa-de-cabeceira-marselan comoda-marselan'.split(' ').map(u => [u, { cartoes: true, sel: { madeira: L, metal: X } }]);
      const lamSemMetal = 'mesa-de-jantar-gamay-com-tampo-macico mesa-de-jantar-gamay-com-tampo-laminado mesa-de-centro-sangiovese mesa-de-jantar-moscato espelho-greco comoda-tannat'.split(' ').map(u => [u, { cartoes: true, sel: { madeira: L } }]);
      const jeq = 'escrivaninha-albarino mesa-de-cabeceira-saperavi comoda-saperavi cristaleira-kerner mesa-de-cabeceira-viognier mesa-de-cabeceira-verdicchio comoda-verdicchio mesa-de-cabeceira-mencia'.split(' ').map(u => [u, { sel: { madeira: J } }]);
      const mad = 'estante-chardonnay cabideiro-ciliegiolo cabideiro-monastrell'.split(' ').map(u => [u, { sel: { madeira: M } }]);
      return [...lam, ...lamSemMetal, ...jeq, ...mad,
        ['mesa-de-centro-corvina', { sel: { madeira: M } }],
        ['mesa-de-centro-negroamaro', { sel: { madeira: J, metal: X } }],
        ['buffet-bual', { sel: { madeira: J, metal: X } }],
        ['aparador-parellada', { sel: { madeira: M, metal: X } }],
        ['aparador-sercial', { sel: { madeira: M, metal: X } }],
        ['mesa-de-jogos-nerello', { sel: { madeira: J, acabamento: 'Escolha a cor do feltro (VND):' } }],
        ['estante-freisa', { cartoes: true, sel: { madeira: J } }],
        // com tela: a linha de preço (derivação 208) é o tipo de tela
        ['mesa-de-cabeceira-riesling', { derivacao: 208, cartoes: true, sel: { tela: TL, madeira: J } }],
        ['luminaria-de-chao-zweigelt', { derivacao: 208, cartoes: true, sel: { tela: TL, madeira: M } }],
        ['luminaria-de-chao-furmint', { derivacao: 208, cartoes: true, sel: { tela: TL, madeira: M } }],
        ['mesa-de-centro-chenin', { derivacao: 208, cartoes: true, sel: { tela: TL, madeira: J } }],
        ['mesa-auxiliar-carmenere', { derivacao: 208, cartoes: true, sel: { tela: TL, madeira: J } }],
        ['buffet-moscato', { derivacao: 208, cartoes: true, sel: { tela: TL, madeira: L } }]
      ].map(([u, c]) => ['/' + u, { pagina: 'produto.html', params: 'p=vnd-' + u, ...c }]);
    })()),
    // Combinare: tecido (linhas na derivação 208), madeira, pintura epóxi (metal) e recouro; sofás e alguns pufes com tamanho (derivação 2)
    ...Object.fromEntries((() => {
      const T = 'Escolha o tecido (SUP):', M = 'Escolha a madeira (SUP):', E = 'Escolha a pintura epóxi (SUP):', R = 'Escolha o recouro (SUP):';
      const base = { acabamento: T, madeira: M, metal: E };
      return [
        ...'poltrona-avana poltrona-bethara poltrona-cloara poltrona-flexara poltrona-florena poltrona-gavena poltrona-jasvara poltrona-kairona-com-mesa-lateral poltrona-lorana poltrona-lucara poltrona-maisara poltrona-manira poltrona-marvella poltrona-melora poltrona-oxfel poltrona-perlina poltrona-unora poltrona-windara pufe-florena pufe-parina pufe-belara sofa-mondara-reto-1-50-m'.split(' ').map(u => [u, { sel: base }]),
        ...'poltrona-galena poltrona-lizara poltrona-parina pufe-framera'.split(' ').map(u => [u, { sel: { ...base, tela: R } }]),
        ...'pufe-clubia-055cm pufe-hapera-048cm sofa-avana-reto-1-50-m sofa-mattea-reto-1-50-m sofa-mezzara-reto-1-50-m sofa-olvera-reto-1-50-m sofa-tamara-reto-1-50-m'.split(' ').map(u => [u, { tamanho: 2, sel: base }])
      ].map(([u, c]) => ['/' + u + '-essencial', { pagina: 'produto.html', params: 'p=cmb-' + u, derivacao: 208, ...c }]);
    })()),
    // Marcobin: tecido (linhas Essencial/Premium na derivação 208), madeira e, nas Natura, metal do encosto.
    // "Tecido das costas", altura do assento e cor do vidro continuam só na página (o 3D não mexe neles).
    ...Object.fromEntries((() => {
      const T = 'Escolha o tecido (MAR):', M = 'Escolha a madeira (MAR):', ME = 'Escolha o acabamento do metal (MAR):';
      const est = { derivacao: 208, sel: { acabamento: T, madeira: M } };
      return [
        ...'banqueta-bosque poltrona-galho poltrona-oasis'.split(' ').map(u => [u, u, est]),
        ...'cadeira-bosque banqueta-moara-encosto-estofado cadeira-moara-encosto-estofado banqueta-nubia-giratoria banqueta-prince-giratoria banqueta-sara-fixa banqueta-tria cadeira-tria cadeira-tria-com-braco cadeira-agata-encosto-estofado cadeira-aida-giratoria cadeira-anne-fixa cadeira-anne-giratoria cadeira-atenas-com-braco cadeira-laura-encosto-estofado cadeira-laura-com-braco-encosto-estofado cadeira-quaddra cadeira-quaddra-com-braco cadeira-sofia-giratoria poltrona-oca puff-oasis'.split(' ').map(u => [u + '-marcobin', u, est]),
        ...'banqueta-natura-estofada cadeira-natura-estofada banqueta-natura-palha cadeira-natura-palha'.split(' ').map(u => [u, u, { derivacao: 208, sel: { acabamento: T, madeira: M, metal: ME } }]),
        ['mesa-de-centro-jaspe', 'mesa-de-centro-jaspe', { sel: { madeira: M } }],
        ...'bistro-doha-tampo-em-lamina-de-madeira bistro-doha-tampo-em-vidro'.split(' ').map(u => [u + '-marcobin', u, { sel: { madeira: M } }])
      ].map(([url, u, c]) => ['/' + url, { pagina: 'produto.html', params: 'p=mcb-' + u, ...c }]);
    })()),
    // Share: tecido + madeira, três linhas de preço (derivação 208), sem tamanhos
    '/cadeira-tainhas': { pagina: 'produto.html', params: 'p=ser-cadeira-tainhas', derivacao: 208, sel: { acabamento: 'Escolha o tecido (SER):', madeira: 'Escolha a madeira (SER):' } },
    '/cadeira-bento': { pagina: 'produto.html', params: 'p=ser-cadeira-bento', derivacao: 208, sel: { acabamento: 'Escolha o tecido (SER):', madeira: 'Escolha a madeira (SER):' } },
    '/poltrona-canela': { pagina: 'produto.html', params: 'p=ser-poltrona-canela', derivacao: 208, sel: { acabamento: 'Escolha o tecido (SER):', madeira: 'Escolha a madeira (SER):' } },
    '/poltrona-gramado': { pagina: 'produto.html', params: 'p=ser-poltrona-gramado', derivacao: 208, sel: { acabamento: 'Escolha o tecido (SER):', madeira: 'Escolha a madeira (SER):' } },
    '/puff-gramado': { pagina: 'produto.html', params: 'p=ser-puff-gramado', derivacao: 208, sel: { acabamento: 'Escolha o tecido (SER):', madeira: 'Escolha a madeira (SER):' } },
    '/cadeira-malacara': { pagina: 'produto.html', params: 'p=ser-cadeira-malacara', derivacao: 208, sel: { acabamento: 'Escolha o tecido (SER):', madeira: 'Escolha a madeira (SER):' } },
    '/cadeira-ivoti': { pagina: 'produto.html', params: 'p=ser-cadeira-ivoti', derivacao: 208, sel: { acabamento: 'Escolha o tecido (SER):', madeira: 'Escolha a madeira (SER):' } },
    '/cadeira-encantado': { pagina: 'produto.html', params: 'p=ser-cadeira-encantado', derivacao: 208, sel: { acabamento: 'Escolha o tecido (SER):', madeira: 'Escolha a madeira (SER):' } },
    '/cadeira-guapore': { pagina: 'produto.html', params: 'p=ser-cadeira-guapore', derivacao: 208, sel: { acabamento: 'Escolha o tecido (SER):', madeira: 'Escolha a madeira (SER):' } },
    '/cadeira-caracol': { pagina: 'produto.html', params: 'p=ser-cadeira-caracol', derivacao: 208, sel: { acabamento: 'Escolha o tecido (SER):', madeira: 'Escolha a madeira (SER):' } },
    '/cadeira-serafina': { pagina: 'produto.html', params: 'p=ser-cadeira-serafina', derivacao: 208, sel: { acabamento: 'Escolha o tecido (SER):', madeira: 'Escolha a madeira (SER):' } },
    '/cadeira-piratini': { pagina: 'produto.html', params: 'p=ser-cadeira-piratini', derivacao: 208, sel: { acabamento: 'Escolha o tecido (SER):', madeira: 'Escolha a madeira (SER):' } },
    '/poltrona-ronda': { pagina: 'produto.html', params: 'p=ser-poltrona-ronda', derivacao: 208, sel: { acabamento: 'Escolha o tecido (SER):', madeira: 'Escolha a madeira (SER):' } },
    '/cadeira-itaimbe': { pagina: 'produto.html', params: 'p=ser-cadeira-itaimbe', derivacao: 208, sel: { acabamento: 'Escolha o tecido (SER):', madeira: 'Escolha a madeira (SER):' } },
    '/cadeira-joaneta': { pagina: 'produto.html', params: 'p=ser-cadeira-joaneta', derivacao: 208, sel: { acabamento: 'Escolha o tecido (SER):', madeira: 'Escolha a madeira (SER):' } },
    '/cadeira-canela': { pagina: 'produto.html', params: 'p=ser-cadeira-canela', derivacao: 208, sel: { acabamento: 'Escolha o tecido (SER):', madeira: 'Escolha a madeira (SER):' } },
    '/banqueta-joaneta': { pagina: 'produto.html', params: 'p=ser-banqueta-joaneta', derivacao: 208, sel: { acabamento: 'Escolha o tecido (SER):', madeira: 'Escolha a madeira (SER):' } },
    '/cadeira-ferradura': { pagina: 'produto.html', params: 'p=ser-cadeira-ferradura', derivacao: 208, sel: { acabamento: 'Escolha o tecido (SER):', madeira: 'Escolha a madeira (SER):' } },
    '/cadeira-monte-belo': { pagina: 'produto.html', params: 'p=ser-cadeira-monte-belo', derivacao: 208, sel: { acabamento: 'Escolha o tecido (SER):', madeira: 'Escolha a madeira (SER):' } },
    '/cadeira-ametista': { pagina: 'produto.html', params: 'p=ser-cadeira-ametista', derivacao: 208, sel: { acabamento: 'Escolha o tecido (SER):', madeira: 'Escolha a madeira (SER):' } },
    '/cadeira-barao': { pagina: 'produto.html', params: 'p=ser-cadeira-barao', derivacao: 208, sel: { acabamento: 'Escolha o tecido (SER):', madeira: 'Escolha a madeira (SER):' } },
    '/cadeira-cambara': { pagina: 'produto.html', params: 'p=ser-cadeira-cambara', derivacao: 208, sel: { acabamento: 'Escolha o tecido (SER):', madeira: 'Escolha a madeira (SER):' } },
    '/banqueta-guapore': { pagina: 'produto.html', params: 'p=ser-banqueta-guapore', derivacao: 208, sel: { acabamento: 'Escolha o tecido (SER):', madeira: 'Escolha a madeira (SER):' } },
    '/cadeira-taquara': { pagina: 'produto.html', params: 'p=ser-cadeira-taquara', derivacao: 208, sel: { acabamento: 'Escolha o tecido (SER):', madeira: 'Escolha a madeira (SER):' } },
    '/cadeira-cartier': {
      pagina: 'produto.html', params: 'p=cartier-cadeira',
      sel: { madeira: 'Escolha a madeira (AL):', tela: 'Escolha a tela (AL):' }
    }
  };
  const cfg = PRODUTOS[location.pathname.replace(/\/+$/, '')];
  if (!cfg) return;

  const zz = ms => new Promise(r => setTimeout(r, ms));
  const sel = nome => document.querySelector('select.select-personaliza[name="' + nome.replace(/"/g, '\\"') + '"]');
  const evento = (nome, dados) => { try { (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: nome }, dados || {})); if (typeof window.gtag === 'function') window.gtag('event', nome, dados || {}); } catch (e) {} };

  /* ---------- estilo ---------- */
  const css = document.createElement('style');
  css.textContent = `
    #sfc3d-btn{position:absolute;top:12px;right:12px;z-index:6;display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(59,71,48,.18);border-radius:999px;background:rgba(255,255,255,.94);color:#1B1F17;padding:9px 14px 9px 11px;font:500 13px/1 Roboto,system-ui,sans-serif;cursor:pointer;box-shadow:0 2px 10px rgba(27,31,23,.10);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
    #sfc3d-btn:hover{background:#3B4730;color:#fff;border-color:#3B4730}
    #sfc3d-btn:focus-visible{outline:2px solid #3B4730;outline-offset:3px}
    #sfc3d-btn svg{width:18px;height:18px;flex:none}
    #sfc3d-modal{position:fixed;inset:0;z-index:2147483000;background:rgba(27,31,23,.62);display:flex;align-items:center;justify-content:center}
    #sfc3d-caixa{position:relative;display:flex;flex-direction:column;width:100%;height:100%;background:#fff;overflow:hidden}
    #sfc3d-topo{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 12px 10px 18px;border-bottom:1px solid rgba(59,71,48,.14);font:700 11px/1 Roboto,system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#3B4730;flex:none}
    #sfc3d-fechar{border:0;background:#F6F6F5;color:#1B1F17;border-radius:999px;width:36px;height:36px;font-size:20px;line-height:1;cursor:pointer}
    #sfc3d-fechar:hover{background:#D8DBD6}
    #sfc3d-fechar:focus-visible{outline:2px solid #3B4730;outline-offset:2px}
    #sfc3d-modal iframe{flex:1;width:100%;border:0;display:block;background:#fff}
    #sfc3d-aviso{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:2147483001;background:#1B1F17;color:#fff;border-radius:999px;padding:11px 18px;font:500 14px/1.2 Roboto,system-ui,sans-serif;box-shadow:0 6px 24px rgba(0,0,0,.2);max-width:calc(100vw - 32px);text-align:center}
    @media (min-width:900px){#sfc3d-caixa{width:min(1280px,94vw);height:min(860px,92vh);border-radius:28px;box-shadow:0 30px 80px rgba(0,0,0,.35)}}
  `;
  document.head.appendChild(css);

  /* ---------- botão sobre a foto ---------- */
  function poeBotao() {
    if (document.getElementById('sfc3d-btn')) return;
    const galeria = document.querySelector('#container-swiper') || document.querySelector('.gallery-container') || document.querySelector('#block-imagem');
    if (!galeria) return;
    if (getComputedStyle(galeria).position === 'static') galeria.style.position = 'relative';
    const b = document.createElement('button');
    b.id = 'sfc3d-btn'; b.type = 'button';
    b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.8 20 7v10l-8 4.2L4 17V7l8-4.2Z"/><path d="M4 7l8 4.2L20 7M12 11.2v10"/></svg><span>Personalize em 3D</span>';
    b.addEventListener('click', abre);
    galeria.appendChild(b);
  }
  poeBotao();
  setInterval(poeBotao, 1000);   // o tema refaz a galeria às vezes; o botão volta sozinho

  /* ---------- leitura da página ---------- */
  function precosPorLinha() {
    const out = {};
    // produto com "Preço sob consulta": o pop-up não mostra preço nenhum
    // com tamanho o preço depende de duas escolhas (linha × tamanho): o pop-up não mostra preço para não errar
    if (!cfg.derivacao || cfg.tamanho || cfg.cartoes || document.querySelector('.sfc-sc-oculto, .sfc-sc-box')) return out;
    try {
      const txt = [...document.scripts].map(s => s.textContent).find(t => t.includes('derivacoes_produto') && t.includes('"deri_id":' + cfg.derivacao)) || '';
      // [^{}] mantém a leitura dentro do mesmo item (sem isso pega o preço de um produto sugerido)
      const re = new RegExp('"valor":"(\\d+(?:\\.\\d+)?)","valor_de"[^{}]{0,400}?"derivacoes_produto":\\[\\{[^{}]{0,300}?"deri_id":' + cfg.derivacao + '[^{}]{0,200}?"derivacao":"([^"]+)"', 'g');
      let m; while ((m = re.exec(txt))) {
        const nome = JSON.parse('"' + m[2] + '"');
        out[nome] = Number(m[1]).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      }
    } catch (e) {}
    return out;
  }
  // tamanho escolhido na página (cartão marcado), em cm de largura
  const tamanhoAtual = () => { const c = document.querySelector('.sfc-tamc.is-on'); return c ? parseInt(c.dataset.tam, 10) || '' : ''; };
  async function trocaTamanho(cm) {
    if (!cfg.tamanho || !cm) return true; if (tamanhoAtual() === +cm) return true;
    const c = [...document.querySelectorAll('.sfc-tamc')].find(b => parseInt(b.dataset.tam, 10) === +cm); if (!c) return false;
    c.click(); for (let i = 0; i < 25; i++) { await zz(200); if (tamanhoAtual() === +cm) { await zz(500); return true; } }
    return false;
  }
  // cartões com nome (tamanho de cama, tipo de encosto): os marcados na página e a troca por nome
  const nomeCartao = c => c.dataset.tam || c.dataset.linha, todosCartoes = () => [...document.querySelectorAll('.sfc-linha, .sfc-tamc')];   // linha antes: trocá-la desmarca o tamanho
  const cartoesAtuais = () => todosCartoes().filter(c => c.classList.contains('is-on')).map(nomeCartao);
  async function trocaCartoes(nomes) {
    if (!cfg.cartoes || !nomes || !nomes.length) return true; let ok = true;
    for (const nome of nomes) {
      const c = todosCartoes().find(b => nomeCartao(b) === nome); if (!c) { ok = false; continue; }
      if (c.classList.contains('is-on')) continue;
      c.click(); let feito = false;
      for (let i = 0; i < 25 && !feito; i++) { await zz(200); feito = cartoesAtuais().includes(nome); }
      if (feito) await zz(500); else ok = false;
    }
    return ok;
  }
  // a personalização que guarda o acabamento depende da linha: couro e tela têm lista própria em alguns anúncios
  const selAcab = linha => linha === 'Couro legítimo' && cfg.sel.couro ? cfg.sel.couro : /^Tela/.test(linha || '') && cfg.sel.telaLinha ? cfg.sel.telaLinha : cfg.sel.acabamento;
  const estadoDaPagina = () => ({
    sfc3d: 'estado', precos: precosPorLinha(), cartoes: cfg.cartoes ? cartoesAtuais() : [], todos: Object.fromEntries([...document.querySelectorAll('select.select-personaliza')].map(s => [s.name, s.value])),
    madeira: (cfg.sel.madeira && sel(cfg.sel.madeira)?.value) || '', tela: (cfg.sel.tela && sel(cfg.sel.tela)?.value) || '', acabamento: (cfg.sel.acabamento && sel(selAcab(linhaAtual()))?.value) || '',
    metal: (cfg.sel.metal && sel(cfg.sel.metal)?.value) || '', tamanho: tamanhoAtual()
  });

  /* ---------- pop-up ---------- */
  let modal = null, antesOverflow = '', focoAntes = null;
  function fecha() {
    if (!modal) return;
    modal.remove(); modal = null;
    document.documentElement.style.overflow = antesOverflow;
    document.removeEventListener('keydown', tecla);
    if (focoAntes && focoAntes.focus) focoAntes.focus();
  }
  const tecla = e => { if (e.key === 'Escape') fecha(); };
  function abre() {
    if (modal) return;
    focoAntes = document.activeElement;
    modal = document.createElement('div'); modal.id = 'sfc3d-modal'; modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true'); modal.setAttribute('aria-label', 'Personalize em 3D');
    modal.innerHTML = '<div id="sfc3d-caixa"><div id="sfc3d-topo"><span>Personalize em 3D</span><button id="sfc3d-fechar" type="button" aria-label="Fechar">×</button></div>' +
      '<iframe title="Configurador 3D" allow="xr-spatial-tracking; fullscreen; accelerometer; gyroscope; magnetometer; camera; clipboard-write; web-share" src="' + BASE + cfg.pagina + '?embed=1&' + cfg.params + '"></iframe></div>';
    modal.addEventListener('click', e => { if (e.target === modal) fecha(); });
    modal.querySelector('#sfc3d-fechar').addEventListener('click', fecha);
    antesOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.addEventListener('keydown', tecla);
    document.body.appendChild(modal);
    modal.querySelector('#sfc3d-fechar').focus();
    evento('sfc3d_abrir', { produto: location.pathname });
  }

  window.addEventListener('message', ev => {
    if (ev.origin !== ORIGEM || !ev.data || !modal) return;
    const frame = modal.querySelector('iframe');
    if (ev.source !== frame.contentWindow) return;
    if (ev.data.sfc3d === 'pronto') frame.contentWindow.postMessage(estadoDaPagina(), ORIGEM);
    if (ev.data.sfc3d === 'usar') { const d = ev.data; fecha(); aplica(d); }
  });

  /* ---------- grava a escolha na página ---------- */
  function avisa(texto) {
    document.getElementById('sfc3d-aviso')?.remove();
    const a = document.createElement('div'); a.id = 'sfc3d-aviso'; a.setAttribute('role', 'status'); a.textContent = texto;
    document.body.appendChild(a); setTimeout(() => a.remove(), 4000);
  }
  // mesmo caminho que o widget de personalização usa: grava no <select> e marca a amostra
  function grava(nome, valor) {
    const s = sel(nome); if (!s || ![...s.options].some(o => o.value === valor)) return false;
    s.value = valor;
    s.dispatchEvent(new Event('input', { bubbles: true })); s.dispatchEvent(new Event('change', { bubbles: true }));
    const ap = [...document.querySelectorAll('.content-personaliza button')].find(b => /aplicar/i.test(b.textContent)); if (ap) ap.click();
    const g = [...document.querySelectorAll('.sfc-group')].find(x => x.dataset.name === nome);
    if (g) { g.querySelectorAll('.sfc-sw').forEach(x => x.classList.toggle('is-on', x.dataset.valor === valor)); const lb = g.querySelector('.sfc-group-label b'); if (lb) lb.textContent = valor; }
    return sel(nome)?.value === valor;
  }
  const linhaAtual = () => document.querySelector('.sfc-linha.is-on')?.dataset.linha || document.querySelector('[class*="variacao-area-id-' + cfg.derivacao + '"] button')?.innerText.trim() || '';
  async function trocaLinha(linha) {
    if (!linha || linhaAtual() === linha) return true;
    const cartao = [...document.querySelectorAll('.sfc-linha')].find(b => b.dataset.linha === linha);
    if (cartao) cartao.click();
    else {   // sem o widget: usa a lista padrão do tema
      const bt = document.querySelector('[class*="variacao-area-id-' + cfg.derivacao + '"] button'); if (!bt) return false;
      bt.click(); await zz(250);
      const op = [...document.querySelectorAll('[role="option"]')].find(o => o.innerText.trim() === linha); if (!op) return false; op.click();
    }
    for (let i = 0; i < 25; i++) { await zz(200); if (linhaAtual() === linha) { await zz(500); return true; } }
    return false;
  }
  async function aplica(d) {
    // trocar a linha desmarca o tamanho (visto nas camas Vindima e nos sofás Buriti): primeiro a linha, depois tamanho
    // e cartões; confere e repete uma vez
    const tamAntes = [...document.querySelectorAll('.sfc-tamc.is-on')].map(nomeCartao);   // escolhas em cartão que o 3D não muda (tamanho, vidro…)
    let okLinha = false, okTam = false;
    for (let volta = 0; volta < 2; volta++) {
      okLinha = await trocaLinha(d.linha);
      okTam = (await trocaTamanho(d.tamanho)) && (await trocaCartoes(d.cartoes));
      if (okLinha && okTam && (!d.linha || linhaAtual() === d.linha)) break;
    }
    // a troca de linha desmarcou algum cartão que o cliente já tinha escolhido? marca de novo (se o grupo dele ficou sem nenhum)
    for (const nome of tamAntes) { const c = [...document.querySelectorAll('.sfc-tamc')].find(x => nomeCartao(x) === nome); if (c && !c.classList.contains('is-on') && !c.parentElement.querySelector('.sfc-tamc.is-on')) await trocaCartoes([nome]); }
    // só as personalizações que este anúncio tem (o estofado não tem tela)
    const pares = ['acabamento', 'tela', 'madeira', 'metal'].filter(k => cfg.sel[k] && d[k]).map(k => [k === 'acabamento' ? selAcab(d.linha) : k === 'madeira' && d.selMadeira ? d.selMadeira : cfg.sel[k], d[k]]);
    let ok = 0;
    for (let tentativa = 0; tentativa < 3 && ok < pares.length; tentativa++) {
      ok = pares.filter(([n, v]) => grava(n, v)).length;
      if (ok < pares.length) await zz(600);
    }
    await zz(700);   // confere de novo: o tema refaz o bloco depois de trocar a linha
    const firmes = pares.filter(([n, v]) => sel(n)?.value === v || grava(n, v)).length;
    const tudo = okTam && okLinha && firmes === pares.length;
    const resumo = [cfg.tamanho && d.tamanho ? d.tamanho + ' cm' : '', cfg.cartoes && d.cartoes ? d.cartoes.join(', ') : '', cfg.sel.madeira ? d.madeira : '', cfg.sel.tela && d.tela ? (/VND/.test(cfg.sel.tela) ? 'tela ' : /SUP/.test(cfg.sel.tela) ? 'recouro ' : 'palha ') + d.tela : '', d.acabamento, cfg.sel.metal && d.metal ? 'metal ' + d.metal : ''].filter(Boolean).join(', ');
    avisa(tudo ? 'Configuração aplicada: ' + resumo : 'Não consegui marcar todas as opções. Confira a seleção abaixo.');
    const alvo = document.querySelector('.sfc-linhas') || sel(cfg.sel.acabamento || cfg.sel.madeira);
    if (alvo && alvo.scrollIntoView) alvo.scrollIntoView({ behavior: 'smooth', block: 'center' });
    evento('sfc3d_usar', { produto: location.pathname, madeira: d.madeira, tela: d.tela, acabamento: d.acabamento, linha: d.linha, aplicado: tudo });
  }
})();
