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
    if (!cfg.derivacao || document.querySelector('.sfc-sc-oculto, .sfc-sc-box')) return out;
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
  const estadoDaPagina = () => ({
    sfc3d: 'estado', precos: precosPorLinha(),
    madeira: sel(cfg.sel.madeira)?.value || '', tela: (cfg.sel.tela && sel(cfg.sel.tela)?.value) || '', acabamento: (cfg.sel.acabamento && sel(cfg.sel.acabamento)?.value) || ''
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
    const okLinha = await trocaLinha(d.linha);
    // só as personalizações que este anúncio tem (o estofado não tem tela)
    const pares = ['acabamento', 'tela', 'madeira'].filter(k => cfg.sel[k]).map(k => [cfg.sel[k], d[k]]);
    let ok = 0;
    for (let tentativa = 0; tentativa < 3 && ok < pares.length; tentativa++) {
      ok = pares.filter(([n, v]) => grava(n, v)).length;
      if (ok < pares.length) await zz(600);
    }
    await zz(700);   // confere de novo: o tema refaz o bloco depois de trocar a linha
    const firmes = pares.filter(([n, v]) => sel(n)?.value === v || grava(n, v)).length;
    const tudo = okLinha && firmes === pares.length;
    const resumo = [d.madeira, cfg.sel.tela ? 'palha ' + d.tela : '', d.acabamento].filter(Boolean).join(', ');
    avisa(tudo ? 'Configuração aplicada: ' + resumo : 'Não consegui marcar todas as opções. Confira a seleção abaixo.');
    const alvo = document.querySelector('.sfc-linhas') || sel(cfg.sel.acabamento || cfg.sel.madeira);
    if (alvo && alvo.scrollIntoView) alvo.scrollIntoView({ behavior: 'smooth', block: 'center' });
    evento('sfc3d_usar', { produto: location.pathname, madeira: d.madeira, tela: d.tela, acabamento: d.acabamento, linha: d.linha, aplicado: tudo });
  }
})();
