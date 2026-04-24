/**
 * PORTFOLIO DAVID GILMOUR — MAIN.JS (OTIMIZADO)
 * Mudanças principais:
 * - projectsData definido UMA vez, fora das funções
 * - Modal reutiliza DOM em vez de recriar
 * - DOMContentLoaded único
 * - Spotlight com RAF correto
 * - Typewriter integrado no fluxo principal
 * - Observer de scroll unificado
 */

// ============================================
// 1. IMPORTS
// ============================================
const projectImages = import.meta.glob('../assets/img-projetos/*.webp', {
  eager: true,
  import: 'default'
});

const imagePaths = Object.fromEntries(
  Object.entries(projectImages).map(([path, mod]) => [path.split('/').pop(), mod])
);

function getImage(filename) {
  return imagePaths[filename] ?? '../assets/img-projetos/placeholder.webp';
}

import '../css/tailwind.css';

// ============================================
// 2. DADOS — definidos UMA vez, usados em todo lugar
// ============================================
const PROJECTS = [
  {
    title: 'Dashboard Operacional',
    category: 'Data & BI',
    shortDesc: 'KPIs em tempo real.',
    fullDesc: 'Ecossistema de dashboards Power BI conectados ao SQL. Automação de relatórios manuais, economizando 15h/semana da equipe. Melhorando as tomadas de decisões e controle de fluxo operacional.',
    metrics: [
      { label: 'Redução de Tempo', value: '70%', icon: 'fa-clock' },
      { label: 'Economia', value: '15h', icon: 'fa-coins' },
    ],
    imageFile: 'dashboard-inteligente.webp',
    tags: ['Power BI', 'SQL', 'ETL'],
    link: '#contato',
  },
  {
    title: 'ERPs AppSheet',
    category: 'Low-Code',
    shortDesc: 'Sistemas Mobile Otimizados e Integrados.',
    fullDesc: 'App mobile low-code para equipes de campo e controle logistico. Sincronização offline/online com Google Sheets. Gerando agilidade nas tarefas diárias e controle preciso de informações.',
    metrics: [
      { label: 'Usuários', value: '85+', icon: 'fa-users' },
      { label: 'Uptime', value: '99%', icon: 'fa-server' },
    ],
    imageFile: 'appsheet-gestao.webp',
    tags: ['AppSheet', 'Mobile'],
    link: '#contato',
  },
  {
    title: 'Otimização Logística',
    category: 'Processos Ágeis',
    shortDesc: 'Lean & Dados.',
    fullDesc: 'Análise de gargalos logísticos via Lean Six Sigma. Otimização de rotas e carga. Redução no custos com compra e uso de material.',
    metrics: [
      { label: 'Eficiência', value: '+40%', icon: 'fa-cart-flatbed' },
      { label: 'Entregas', value: '500+', icon: 'fa-truck-fast' },
    ],
    imageFile: 'otimizacao-logistica.webp',
    tags: ['Lean', 'Logística'],
    link: '#contato',
  },
  {
    title: 'Cultura Data-Driven',
    category: 'Data-Driven',
    shortDesc: 'Decisões Estratégicas.',
    fullDesc: 'Tomada de decisão com embasamento de dados concretos e análises estruturadas a partir de informações coletadas e válidadas.',
    metrics: [
      { label: 'Dados', value: '100%', icon: 'fa-chart-pie' },
      { label: 'Lucro', value: '30+', icon: 'fa-chart-line' },
    ],
    imageFile: 'governanca-dados.webp',
    tags: ['Acertividade', 'Redução de Custos'],
    link: '#contato',
  },
  {
    title: 'Monitoramento Sistemas',
    category: 'Sistemas',
    shortDesc: 'Custos & Performance.',
    fullDesc: 'Painel de monitoramento proativo de hardware e serviços, Análise de Sistemas para identificação de erros e correções em D -1.',
    metrics: [
      { label: 'Monitoramento', value: '-80%', icon: 'fa-chart-simple' },
      { label: 'Sistemas', value: '99.9%', icon: 'fa-windows' },
    ],
    imageFile: 'monitoramento-operacional.webp',
    tags: ['Infra', 'Monitoramento'],
    link: '#contato',
  },
];

const CATEGORY_ICONS = {
  'Data & BI': 'fa-chart-line',
  'Low-Code': 'fa-code',
  'Processos Ágeis': 'fa-rocket',
  'Automação': 'fa-robot',
  'Sistemas': 'fa-server',
};

// ============================================
// 3. UTILITÁRIOS
// ============================================
const PASSIVE = { passive: true };

function throttle(fn, ms) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= ms) { last = now; fn(...args); }
  };
}

// ============================================
// 4. SPOTLIGHT — RAF correto, sem closure leak
// ============================================
function initSpotlight() {
  const el = document.getElementById('spotlight');
  if (!el || window.matchMedia('(max-width: 768px)').matches) return;

  let pending = false;
  document.addEventListener('mousemove', (e) => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      pending = false;
    });
  }, PASSIVE);
}

// ============================================
// 5. SCROLL PROGRESS
// ============================================
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  const update = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    bar.style.width = `${(scrollTop / (scrollHeight - clientHeight)) * 100}%`;
  };

  window.addEventListener('scroll', update, PASSIVE);
}

// ============================================
// 6. SCROLL ANIMATIONS — observer único
// ============================================
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.05, rootMargin: '0px 0px -10px 0px' } // trigger mais cedo
  );

  document.querySelectorAll('.fade-in-section').forEach((el, i) => {
    el.style.transitionDelay = `${i * 40}ms`; // delay menor entre elementos
    observer.observe(el);
  });
}

// ============================================
// 7. NAVBAR — scroll + hide/show
// ============================================
function initNavbarScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  let last = 0;
  const handle = throttle(() => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 50);
    // Esconde ao rolar para baixo, mostra ao rolar para cima
    nav.style.transform = (y > last && y > 400) ? 'translateY(-100%)' : 'translateY(0)';
    last = y;
  }, 80);

  window.addEventListener('scroll', handle, PASSIVE);
}

// ============================================
// 8. ACTIVE NAV LINKS — observer unificado
// ============================================
function initActiveNavigation() {
  const links = document.querySelectorAll('.nav-link');
  const map = new Map([...links].map(l => [l.getAttribute('href')?.slice(1), l]));

  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.intersectionRatio > 0.4) {
        links.forEach(l => l.classList.remove('active', 'text-white'));
        const active = map.get(e.target.id);
        if (active) active.classList.add('active', 'text-white');
      }
    }),
    { threshold: [0.4], rootMargin: '-15% 0px -55% 0px' }
  );

  document.querySelectorAll('section[id]').forEach(s => observer.observe(s));
}

// ============================================
// 9. SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
  const navH = document.querySelector('nav')?.offsetHeight ?? 0;

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - navH - 16,
        behavior: 'smooth',
      });
      closeMobileMenu();
    });
  });
}

// ============================================
// 10. MOBILE MENU
// ============================================
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const close = document.getElementById('mobile-menu-close');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', openMobileMenu);
  close?.addEventListener('click', closeMobileMenu);
  document.querySelectorAll('.mobile-nav-link').forEach(l =>
    l.addEventListener('click', closeMobileMenu)
  );
}

function openMobileMenu() {
  document.getElementById('mobile-menu')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  document.getElementById('mobile-menu')?.classList.remove('open');
  document.body.style.overflow = '';
}

// ============================================
// 11. TILT CARDS — somente desktop
// ============================================
function initTiltCards() {
  if (window.matchMedia('(max-width: 768px)').matches) return;

  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const rx = ((e.clientY - top) / height - 0.5) * 6;
      const ry = ((e.clientX - left) / width - 0.5) * 6;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ============================================
// 12. MAGNETIC BUTTONS — somente desktop
// ============================================
function initMagneticButtons() {
  if (window.matchMedia('(max-width: 768px)').matches) return;

  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = btn.getBoundingClientRect();
      btn.style.transform = `translate(${(e.clientX - left - width / 2) * 0.18}px, ${(e.clientY - top - height / 2) * 0.18}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

// ============================================
// 13. FOOTER YEAR
// ============================================
function updateFooterYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

// ============================================
// 14. TYPEWRITER
// ============================================
function initTypewriter() {
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  const text = 'Desenvolvedor Web & Analista de Sistemas';
  let i = 0;

  // usa requestAnimationFrame + timestamp para não bloquear a thread
  const CHAR_MS = 95;
  let lastTime = 0;

  function tick(ts) {
    if (ts - lastTime >= CHAR_MS) {
      el.textContent += text[i++];
      lastTime = ts;
    }
    if (i < text.length) requestAnimationFrame(tick);
  }

  // começa após 900ms para não competir com animações de entrada
  setTimeout(() => requestAnimationFrame(tick), 900);
}

// ============================================
// 15. CARROSSEL DE PROJETOS
// ============================================
function initCompactProjects() {
  const container = document.getElementById('projects-section-container');
  const carousel = document.getElementById('projects-carousel');
  const dotsWrap = document.getElementById('carousel-dots');
  if (!carousel || !dotsWrap || !container) return;

  // --- Filtros ---
  const categories = ['Todos', ...new Set(PROJECTS.map(p => p.category))];
  const filterBar = document.createElement('div');
  // Container externo: permite scroll
  filterBar.className = 'overflow-x-auto pb-4 mb-6 scrollbar-hide w-full -mx-4 px-4 md:mx-0 md:px-0';
  filterBar.style.scrollbarWidth = 'none';
  filterBar.style.msOverflowStyle = 'none';

  // Container interno: centraliza quando cabe, permite scroll quando não cabe
  const innerContainer = document.createElement('div');
  innerContainer.className = 'flex gap-2 w-max mx-auto md:justify-center px-4';

  innerContainer.innerHTML = categories.map(cat => `
  <button
    class="filter-btn whitespace-nowrap px-4 py-2 rounded-full text-xs md:text-sm font-medium border transition-all duration-300 shrink-0
           ${cat === 'Todos'
      ? 'bg-accent text-white border-accent shadow-lg shadow-accent/20'
      : 'bg-white/5 text-gray-400 border-white/10 hover:border-accent/50 hover:text-white'}"
    data-category="${cat}">${cat}
  </button>`).join('');

  filterBar.appendChild(innerContainer);
  container.insertBefore(filterBar, carousel);

  // --- Cards ---
  carousel.className = 'flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 scrollbar-hide w-full items-start';

  carousel.innerHTML = PROJECTS.map((p, i) => `
    <div class="project-card-item snap-center shrink-0 w-[280px] flex flex-col group cursor-pointer
                bg-slate-800/40 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden
                hover:border-accent/40 transition-all duration-400 ease-out hover:-translate-y-2
                hover:shadow-2xl hover:shadow-black/40"
         data-category="${p.category}"
         data-index="${i}">

      <div class="relative p-5 pb-3">
        <div class="absolute top-4 right-4 flex gap-2 opacity-30 group-hover:opacity-100 transition-opacity duration-300">
          <i class="fa-solid ${CATEGORY_ICONS[p.category] ?? 'fa-folder'} text-indigo-400 text-sm"></i>
          <i class="fa-solid fa-arrow-up-right-from-square text-gray-400 text-xs group-hover:text-white transition-colors"></i>
        </div>
        <div class="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-accent/30 group-hover:border-accent transition-colors duration-300 shadow-lg">
          <img src="${getImage(p.imageFile)}" alt="${p.title}" loading="lazy" decoding="async"
               class="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
               onerror="this.style.opacity='0'">
        </div>
        <div class="mt-3">
          <span class="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">${p.category}</span>
          <h3 class="text-lg font-bold text-white mt-1 leading-tight group-hover:text-accent transition-colors">${p.title}</h3>
        </div>
      </div>

      <div class="px-5 pb-5 flex flex-col flex-1">
        <p class="text-gray-400 text-xs mb-4 line-clamp-2 leading-relaxed">${p.shortDesc}</p>
        <div class="grid grid-cols-2 gap-2 mb-4">
          ${p.metrics.map(m => `
            <div class="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
              <i class="fa-solid ${m.icon} text-accent text-xs"></i>
              <div>
                <div class="text-sm font-bold text-white leading-none">${m.value}</div>
                <div class="text-[8px] text-gray-400 uppercase tracking-wide">${m.label.split(' ')[0]}</div>
              </div>
            </div>`).join('')}
        </div>
        <div class="flex flex-wrap gap-2 mt-auto">
          ${p.tags.map(t => `
            <span class="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[9px] font-medium text-gray-300
                         hover:border-accent hover:text-white hover:bg-accent/20 transition-all duration-200">${t}</span>`).join('')}
        </div>
      </div>
    </div>`).join('') + '<div class="snap-center shrink-0 w-px"></div>';

  // --- Dots ---
  dotsWrap.className = 'flex justify-center gap-2 mt-6 w-full';
  dotsWrap.innerHTML = PROJECTS.map((_, i) =>
    `<button class="w-1 h-1 rounded-full bg-white/20 transition-all duration-300" data-index="${i}"></button>`
  ).join('');

  const dots = [...dotsWrap.querySelectorAll('button')];

  function updateDots() {
    const idx = Math.round(carousel.scrollLeft / 288);
    dots.forEach((d, i) => {
      d.className = i === idx
        ? 'h-2 rounded-full bg-accent transition-all duration-300 w-6'
        : 'w-2 h-2 rounded-full bg-white/20 transition-all duration-300';
    });
  }

  carousel.addEventListener('scroll', throttle(updateDots, 60), PASSIVE);
  updateDots();

  // Clique nos dots
  dotsWrap.addEventListener('click', (e) => {
    const i = e.target.dataset.index;
    if (i !== undefined) carousel.scrollTo({ left: +i * 288, behavior: 'smooth' });
  });

  // Filtro
  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    filterBar.querySelectorAll('.filter-btn').forEach(b => {
      b.className = b.className
        .replace('bg-accent text-white border-accent shadow-lg shadow-accent/20', '')
        .replace('bg-white/5 text-gray-400 border-white/10', '') + ' bg-white/5 text-gray-400 border-white/10';
    });
    btn.className = btn.className
      .replace('bg-white/5 text-gray-400 border-white/10', '') + ' bg-accent text-white border-accent shadow-lg shadow-accent/20';

    const cat = btn.dataset.category;
    carousel.querySelectorAll('.project-card-item').forEach(card => {
      card.style.display = (cat === 'Todos' || card.dataset.category === cat) ? 'flex' : 'none';
    });
    updateDots();
  });

  // Clique no card → abre modal
  carousel.addEventListener('click', (e) => {
    const card = e.target.closest('.project-card-item');
    if (card) openModal(+card.dataset.index);
  });
}

// ============================================
// 16. MODAL — DOM criado uma vez, reutilizado
// ============================================
let modalEl = null;

function buildModal() {
  const div = document.createElement('div');
  div.id = 'project-modal';
  div.className = 'fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 opacity-0 pointer-events-none transition-opacity duration-300';
  div.innerHTML = `
    <div id="modal-box"
         class="relative w-full max-w-md bg-slate-900 rounded-3xl overflow-hidden shadow-2xl
                border border-white/10 flex flex-col max-h-[90vh] transform scale-95 transition-transform duration-300">
      <button id="modal-close"
              class="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 text-white
                     flex items-center justify-center hover:bg-white hover:text-black transition-colors
                     backdrop-blur-md border border-white/10">
        <i class="fa-solid fa-xmark text-sm"></i>
      </button>
      <div id="modal-img-wrap" class="h-56 w-full bg-slate-800 relative shrink-0">
        <img id="modal-img" class="w-full h-full object-cover" loading="lazy" alt="">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
      </div>
      <div class="p-6 overflow-y-auto flex-1">
        <span id="modal-cat"  class="text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-2 block"></span>
        <h2  id="modal-title" class="text-2xl font-bold text-white mb-4 leading-tight"></h2>
        <p   id="modal-desc"  class="text-gray-300 text-sm leading-relaxed mb-6"></p>
        <div id="modal-metrics" class="grid grid-cols-2 gap-3 mb-6"></div>
        <div id="modal-tags"    class="flex flex-wrap gap-2 mb-6"></div>
        <a   id="modal-cta"
             class="block w-full py-3 bg-accent text-white rounded-xl font-bold text-sm text-center
                    hover:bg-accent-light transition-colors shadow-lg shadow-accent/20">
          Discutir Projeto <i class="fa-solid fa-arrow-right ml-1"></i>
        </a>
      </div>
    </div>`;

  document.body.appendChild(div);

  div.addEventListener('click', (e) => { if (e.target === div) closeModal(); });
  div.querySelector('#modal-close').addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  return div;
}

function openModal(index) {
  if (!modalEl) modalEl = buildModal();

  const p = PROJECTS[index];
  modalEl.querySelector('#modal-img').src = getImage(p.imageFile);
  modalEl.querySelector('#modal-img').alt = p.title;
  modalEl.querySelector('#modal-cat').textContent = p.category;
  modalEl.querySelector('#modal-title').textContent = p.title;
  modalEl.querySelector('#modal-desc').textContent = p.fullDesc;

  modalEl.querySelector('#modal-metrics').innerHTML = p.metrics.map(m => `
    <div class="p-3 rounded-xl bg-white/5 border border-white/5">
      <div class="text-lg font-bold text-accent">${m.value}</div>
      <div class="text-[10px] text-gray-400 uppercase">${m.label}</div>
    </div>`).join('');

  modalEl.querySelector('#modal-tags').innerHTML = p.tags.map(t =>
    `<span class="px-2 py-1 rounded-md bg-white/10 border border-white/10 text-[10px] font-medium text-gray-200">${t}</span>`
  ).join('');

  const cta = modalEl.querySelector('#modal-cta');
  cta.href = p.link;
  cta.onclick = closeModal;

  document.body.style.overflow = 'hidden';

  requestAnimationFrame(() => {
    modalEl.classList.remove('pointer-events-none');
    modalEl.style.opacity = '1';
    modalEl.querySelector('#modal-box').classList.replace('scale-95', 'scale-100');
  });
}

function closeModal() {
  if (!modalEl) return;
  modalEl.style.opacity = '0';
  modalEl.querySelector('#modal-box').classList.replace('scale-100', 'scale-95');
  modalEl.classList.add('pointer-events-none');
  document.body.style.overflow = '';
}

// Expõe para compatibilidade com onclick inline legado (pode remover se não usar)
window.openCompactModal = openModal;
window.closeCompactModal = closeModal;

// ============================================
// 17. INICIALIZAÇÃO — DOMContentLoaded ÚNICO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initSpotlight();
  initScrollProgress();
  initScrollAnimations();
  initNavbarScroll();
  initActiveNavigation();
  initSmoothScroll();
  initMobileMenu();
  initTiltCards();
  initMagneticButtons();
  updateFooterYear();
  initTypewriter();
  initCompactProjects();

  console.log('✅ Portfolio ready');
});

// ============================================
// 18. EXPORTS (tree-shaking pelo Vite)
// ============================================
export {
  throttle,
  initSpotlight,
  initScrollProgress,
  initScrollAnimations,
  initNavbarScroll,
  initActiveNavigation,
  initSmoothScroll,
  initMobileMenu,
  initTiltCards,
  initMagneticButtons,
  updateFooterYear,
};