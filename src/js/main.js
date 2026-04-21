/**
============================================
PORTFOLIO DAVID GILMOUR - MAIN.JS (OTIMIZADO)
============================================
Versão: 2.0 - Performance & UX Refinada
*/

// ============================================
// 1. IMPORTS & CONFIGURAÇÕES GLOBAIS
// ============================================
import '../css/tailwind.css';

const CONFIG = {
  scrollThrottle: 100,
  animationThreshold: 0.1,
  navbarOffset: 50,
  mobileMenuBreakpoint: 768
};

const PASSIVE_OPTIONS = { passive: true };

// ============================================
// 2. UTILITÁRIOS DE PERFORMANCE
// ============================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ============================================
// 3. EFEITOS VISUAIS E ANIMAÇÕES
// ============================================
function initSpotlight() {
  const spotlight = document.getElementById('spotlight');
  if (!spotlight) return;

  let rafId = null;
  document.addEventListener('mousemove', (e) => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      spotlight.style.left = `${e.clientX}px`;
      spotlight.style.top = `${e.clientY}px`;
      rafId = null;
    });
  }, PASSIVE_OPTIONS);
}

function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = `${scrolled}%`;
  }, PASSIVE_OPTIONS);
}

function initTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Rotação suave reduzida para não exagerar
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

function initMagneticButtons() {
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: CONFIG.animationThreshold,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll('.fade-in-section');
  fadeElements.forEach((el, index) => {
    el.style.setProperty('--delay', `${index * 100}ms`);
    observer.observe(el);
  });
}

// ============================================
// 4. NAVEGAÇÃO E MENU
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        const nav = document.querySelector('nav');
        const navHeight = nav ? nav.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        closeMobileMenu();
      }
    });
  });
}

function initMobileMenu() {
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileCloseBtn = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (!mobileBtn || !mobileMenu) return;

  mobileBtn.addEventListener('click', openMobileMenu);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileMenu);
  mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
}

function openMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function initActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    threshold: [0, 0.25, 0.5, 0.75, 1],
    rootMargin: '-20% 0px -60% 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0.5) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const isActive = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('active', isActive);
          link.classList.toggle('text-white', isActive);
          link.classList.toggle('text-text-muted', !isActive);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;
  const handleScroll = throttle(() => {
    const currentScroll = window.pageYOffset;
    requestAnimationFrame(() => {
      if (currentScroll > CONFIG.navbarOffset) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
    });
    lastScroll = currentScroll;
  }, CONFIG.scrollThrottle);

  window.addEventListener('scroll', handleScroll, PASSIVE_OPTIONS);
}

// ============================================
// 5. FILTROS E INTERATIVIDADE
// ============================================
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      updateFilterButtons(btn);
      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filterValue === 'all') {
          showCard(card);
        } else {
          const categories = card.getAttribute('data-category');
          if (categories && categories.includes(filterValue)) {
            showCard(card);
          } else {
            hideCard(card);
          }
        }
      });
    });
  });
}

function updateFilterButtons(activeBtn) {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(b => {
    b.classList.remove('active', 'bg-accent', 'text-white', 'shadow-lg');
    b.classList.add('bg-white/5', 'border', 'border-white/10', 'text-text-muted');
  });
  activeBtn.classList.remove('bg-white/5', 'border', 'border-white/10', 'text-text-muted');
  activeBtn.classList.add('active', 'bg-accent', 'text-white', 'shadow-lg');
}

function showCard(card) {
  card.classList.remove('hidden');
  requestAnimationFrame(() => {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  });
}

function hideCard(card) {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  setTimeout(() => {
    card.classList.add('hidden');
  }, 300);
}

function updateFooterYear() {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

// ============================================
// 7. INICIALIZAÇÃO PRINCIPAL
// ============================================
document.addEventListener('DOMContentLoaded', function () {
  initSpotlight();
  initScrollProgress();
  initSmoothScroll();
  initMobileMenu();
  initActiveNavigation();
  initNavbarScroll();
  initScrollAnimations();
  initTiltCards();
  initMagneticButtons();
  initProjectFilter();
  updateFooterYear();

  // Inicializa o carrossel otimizado
  initCompactProjects();

  console.log('✅ Portfolio initialized successfully');
});

// ============================================
// CARROSSEL DE PROJETOS OTIMIZADO (APPLE STYLE)
// ============================================
function initCompactProjects() {
  const sectionContainer = document.getElementById('projects-section-container');
  const carouselContainer = document.getElementById('projects-carousel');
  const dotsContainer = document.getElementById('carousel-dots');

  if (!carouselContainer || !dotsContainer || !sectionContainer) return;

  // Limpa conteúdos anteriores
  carouselContainer.innerHTML = '';
  dotsContainer.innerHTML = '';

  // Dados dos Projetos
  const projectsData = [
    {
      title: "Dashboard Operacional",
      category: "Data & BI",
      shortDesc: "KPIs em tempo real.",
      fullDesc: "Ecossistema de dashboards Power BI conectados ao SQL. Automação de relatórios manuais, economizando 15h/semana da equipe.",
      metrics: [{ label: "Redução Tempo", value: "70%", icon: "fa-clock" }, { label: "Economia", value: "15h", icon: "fa-coins" }],
      image: "assets/img-projetos/dashboard-inteligente.webp",
      tags: ["Power BI", "SQL", "ETL"],
      link: "#contato"
    },
    {
      title: "AppSheet Processos Ágeis",
      category: "Low-Code",
      shortDesc: "Sistemas Mobile Otimizados.",
      fullDesc: "App mobile low-code para equipes de campo. Sincronização offline/online com Google Sheets, garantindo dados precisos em tempo real.",
      metrics: [{ label: "Usuários", value: "85+", icon: "fa-users" }, { label: "Uptime", value: "99%", icon: "fa-server" }],
      image: "assets/img-projetos/appsheet-gestao.webp",
      tags: ["AppSheet", "Mobile"],
      link: "https://wa.me/5586994936797"
    },
    {
      title: "Otimização Logística",
      category: "Processos",
      shortDesc: "Lean & Dados.",
      fullDesc: "Análise de gargalos logísticos via Lean Six Sigma. Otimização de rotas e carga, aumentando eficiência em 40%.",
      metrics: [{ label: "Eficiência", value: "+40%", icon: "fa-chart-line" }, { label: "Entregas", value: "500+", icon: "fa-truck-fast" }],
      image: "assets/img-projetos/otimizacao-logistica.webp",
      tags: ["Lean", "Logística"],
      link: "#contato"
    },
    {
      title: "Governança de Dados",
      category: "Automação",
      shortDesc: "Python & Pandas.",
      fullDesc: "Scripts Python para validação e limpeza automática de grandes volumes de dados. Relatórios de integridade diários por e-mail.",
      metrics: [{ label: "Auto", value: "100%", icon: "fa-robot" }, { label: "Emails", value: "30+", icon: "fa-envelope" }],
      image: "assets/img-projetos/governanca-dados.webp",
      tags: ["Python", "Pandas"],
      link: "#contato"
    },
    {
      title: "Monitoramento Sistemas",
      category: "Sistemas",
      shortDesc: "Custos & Performance.",
      fullDesc: "Painel de monitoramento proativo de hardware e serviços. Redução de 80% nos custos de manutenção corretiva.",
      metrics: [{ label: "Custos", value: "-80%", icon: "fa-money-bill-wave" }, { label: "Uptime", value: "99.9%", icon: "fa-heart-pulse" }],
      image: "assets/img-projetos/monitoramento-operacional.webp",
      tags: ["Infra", "Monitoramento"],
      link: "#contato"
    }
  ];

  // 1. RENDERIZA FILTROS
  const categories = ["Todos", ...new Set(projectsData.map(p => p.category))];
  const filterContainer = document.createElement('div');

  // Padding lateral ajustado para alinhar com o carrossel
  filterContainer.className = "flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide w-full";
  filterContainer.style.scrollbarWidth = 'none';
  filterContainer.style.msOverflowStyle = 'none';

  filterContainer.innerHTML = categories.map(cat => `
        <button class="filter-btn whitespace-nowrap px-4 py-2 rounded-full text-xs md:text-sm font-medium border transition-all duration-300 shrink-0 ${cat === 'Todos' ? 'bg-accent text-white border-accent shadow-lg shadow-accent/20' : 'bg-white/5 text-gray-400 border-white/10 hover:border-accent/50 hover:text-white'}" data-category="${cat}">
            ${cat}
        </button>
    `).join('');

  sectionContainer.insertBefore(filterContainer, carouselContainer);

  // Lógica de Filtro
  const filterBtns = filterContainer.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-accent', 'text-white', 'border-accent', 'shadow-lg', 'shadow-accent/20');
        b.classList.add('bg-white/5', 'text-gray-400', 'border-white/10');
      });
      btn.classList.remove('bg-white/5', 'text-gray-400', 'border-white/10');
      btn.classList.add('bg-accent', 'text-white', 'border-accent', 'shadow-lg', 'shadow-accent/20');

      const selectedCat = btn.dataset.category;
      const cards = carouselContainer.querySelectorAll('.project-card-item');

      cards.forEach(card => {
        if (selectedCat === 'Todos' || card.dataset.category === selectedCat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
      updateDots();
    });
  });

  // 2. RENDERIZA BOLINHAS (DOTS)
  dotsContainer.className = "flex justify-center gap-2 mt-6 w-full";
  dotsContainer.innerHTML = projectsData.map((_, index) => `
        <button class="w-2 h-2 rounded-full bg-white/20 transition-all duration-300 hover:bg-accent" data-index="${index}"></button>
    `).join('');
  const dots = dotsContainer.querySelectorAll('button');

  function updateDots() {
    const scrollLeft = carouselContainer.scrollLeft;
    // Largura do card (260px) + Gap (12px) = 272px
    const cardWidth = 272;
    // Adiciona metade da largura da viewport para centralizar o cálculo
    const centerOffset = (carouselContainer.clientWidth / 2) - (260 / 2);

    // Calcula o índice baseado no scroll + offset de centralização
    const activeIndex = Math.round((scrollLeft + centerOffset) / cardWidth);

    dots.forEach((dot, index) => {
      const correspondingCard = carouselContainer.children[index];
      // Verifica se o card existe e não está oculto pelo filtro
      const isVisible = correspondingCard && correspondingCard.style.display !== 'none' && !correspondingCard.classList.contains('spacer-element');

      if (index === activeIndex && isVisible) {
        dot.classList.remove('bg-white/20', 'w-2', 'h-2');
        dot.classList.add('bg-accent', 'w-6', 'h-2', 'rounded-full');
      } else {
        dot.classList.add('bg-white/20', 'w-2', 'h-2', 'rounded-full');
        dot.classList.remove('bg-accent', 'w-6', 'h-2');
      }
    });
  }

  // 3. RENDERIZA CARDS COM OTIMIZAÇÃO DE IMAGEM
  // CORREÇÃO DO BUG DE CORTE:
  // px-6 md:px-12 dá espaço nas laterais.
  // O "spacer-element" no final garante que o último card consiga ir para o meio da tela.
  carouselContainer.className = "flex overflow-x-auto snap-x snap-mandatory gap-3 pb-8 scrollbar-hide w-full items-start";

  let cardsHTML = projectsData.map((proj, index) => `
        <div class="project-card-item snap-center shrink-0 w-[260px] flex flex-col group cursor-pointer bg-slate-800/40 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden hover:border-accent/40 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/40" 
            data-category="${proj.category}"
            onclick="openCompactModal(${index})">
            
            <!-- IMAGEM OTIMIZADA -->
            <div class="relative w-full h-48 overflow-hidden bg-slate-900">
                <img src="${proj.image}" alt="${proj.title}" 
                    loading="lazy" 
                    decoding="async"
                    class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    onerror="this.style.opacity='0'">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                
                <span class="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/10 shadow-lg">
                    ${proj.category}
                </span>
            </div>

            <!-- CONTEÚDO -->
            <div class="p-4 flex flex-col flex-1">
                <h3 class="text-lg font-bold text-white mb-1 leading-tight group-hover:text-accent transition-colors">${proj.title}</h3>
                <p class="text-gray-400 text-xs mb-4 line-clamp-2 leading-relaxed">${proj.shortDesc}</p>
                
                <!-- Métricas -->
                <div class="grid grid-cols-2 gap-2 mb-4">
                    ${proj.metrics.map(m => `
                        <div class="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                            <i class="fa-solid ${m.icon} text-accent text-xs"></i>
                            <div>
                                <div class="text-sm font-bold text-white leading-none">${m.value}</div>
                                <div class="text-[9px] text-gray-400 uppercase tracking-wide">${m.label.split(' ')[0]}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mt-auto">
                    ${proj.tags.map(tag => `
                        <span class="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-medium text-gray-300 transition-all duration-200 hover:border-accent hover:text-white hover:bg-accent/20">
                            ${tag}
                        </span>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');

  // ADICIONA O ESPAÇADOR FINAL INVISÍVEL PARA CORRIGIR O CORTE
  // Isso permite que o último card role até o centro sem ficar preso na borda direita
  cardsHTML += `<div class="snap-center shrink-0 w-[1px] spacer-element"></div>`;

  carouselContainer.innerHTML = cardsHTML;

  // Event Listeners
  carouselContainer.addEventListener('scroll', updateDots);

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      const cardWidth = 272; // 260 + 12 gap
      // Centraliza o card clicado
      const scrollPos = (index * cardWidth) - (carouselContainer.clientWidth / 2) + (260 / 2);

      carouselContainer.scrollTo({
        left: Math.max(0, scrollPos),
        behavior: 'smooth'
      });
    });
  });

  // Inicializa
  updateDots();
}

// ============================================
// MODAL COMPACTO ESTILO NOTION
// ============================================
window.openCompactModal = function (index) {
  const projectsData = [
    {
      title: "Dashboard Operacional",
      category: "Data & BI",
      fullDesc: "Ecossistema de dashboards Power BI conectados ao SQL. Automação de relatórios manuais, economizando 15h/semana da equipe. Implementação de KPIs de eficiência operacional em tempo real.",
      metrics: [{ label: "Redução Tempo", value: "70%" }, { label: "Economia", value: "15h" }],
      image: "assets/img-projetos/dashboard-inteligente.webp",
      tags: ["Power BI", "SQL", "ETL"],
      link: "#contato"
    },
    {
      title: "AppSheet Gestão",
      category: "Low-Code",
      fullDesc: "App mobile low-code para equipes de campo. Sincronização offline/online com Google Sheets, garantindo dados precisos em tempo real. Redução de erros de digitação em 90%.",
      metrics: [{ label: "Usuários", value: "85+" }, { label: "Uptime", value: "99%" }],
      image: "assets/img-projetos/appsheet-gestao.webp",
      tags: ["AppSheet", "Mobile"],
      link: "https://wa.me/5586994936797"
    },
    {
      title: "Otimização Logística",
      category: "Processos",
      fullDesc: "Análise de gargalos logísticos via Lean Six Sigma. Otimização de rotas e carga, aumentando eficiência em 40%. Integração com sistemas de rastreamento.",
      metrics: [{ label: "Eficiência", value: "+40%" }, { label: "Entregas", value: "500+" }],
      image: "assets/img-projetos/otimizacao-logistica.webp",
      tags: ["Lean", "Logística"],
      link: "#contato"
    },
    {
      title: "Governança de Dados",
      category: "Automação",
      fullDesc: "Scripts Python para validação e limpeza automática de grandes volumes de dados. Relatórios de integridade diários por e-mail. Padronização de nomenclatura e formatos.",
      metrics: [{ label: "Auto", value: "100%" }, { label: "Emails", value: "30+" }],
      image: "assets/img-projetos/governanca-dados.webp",
      tags: ["Python", "Pandas"],
      link: "#contato"
    },
    {
      title: "Monitoramento Sistemas",
      category: "Sistemas",
      fullDesc: "Painel de monitoramento proativo de hardware e serviços. Redução de 80% nos custos de manutenção corretiva. Alertas automáticos via Slack/E-mail.",
      metrics: [{ label: "Custos", value: "-80%" }, { label: "Uptime", value: "99.9%" }],
      image: "assets/img-projetos/monitoramento-operacional.webp",
      tags: ["Infra", "Monitoramento"],
      link: "#contato"
    }
  ];

  const proj = projectsData[index];

  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 opacity-0 transition-opacity duration-300';

  modal.innerHTML = `
        <div class="relative w-full max-w-md bg-slate-900 rounded-3xl overflow-hidden shadow-2xl transform scale-95 transition-transform duration-300 border border-white/10 flex flex-col max-h-[90vh]" id="modal-content">
            
            <button onclick="closeCompactModal()" class="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors backdrop-blur-md border border-white/10">
                <i class="fa-solid fa-xmark text-sm"></i>
            </button>

            <div class="h-56 w-full bg-slate-800 relative shrink-0">
                 <img src="${proj.image}" class="w-full h-full object-cover" loading="lazy">
                 <div class="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
            </div>
           
            <div class="p-6 overflow-y-auto custom-scrollbar flex-1">
                <span class="text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">${proj.category}</span>
                <h2 class="text-2xl font-bold text-white mb-4 leading-tight">${proj.title}</h2>
               
                <p class="text-gray-300 text-sm leading-relaxed mb-6">
                   ${proj.fullDesc}
                </p>
               
                <div class="grid grid-cols-2 gap-3 mb-6">
                   ${proj.metrics.map(m => `
                        <div class="p-3 rounded-xl bg-white/5 border border-white/5">
                            <div class="text-lg font-bold text-accent">${m.value}</div>
                            <div class="text-[10px] text-gray-400 uppercase">${m.label}</div>
                        </div>
                   `).join('')}
                </div>

                <div class="flex flex-wrap gap-2 mb-6">
                   ${proj.tags.map(tag => `
                        <span class="px-2 py-1 rounded-md bg-white/10 border border-white/10 text-[10px] font-medium text-gray-200">
                           ${tag}
                        </span>
                   `).join('')}
                </div>

                <a href="${proj.link}" onclick="closeCompactModal()" class="block w-full py-3 bg-accent text-white rounded-xl font-bold text-sm text-center hover:bg-accent-light transition-colors shadow-lg shadow-accent/20">
                   Discutir Projeto <i class="fa-solid fa-arrow-right ml-1"></i>
                </a>
            </div>
        </div>
    `;

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  requestAnimationFrame(() => {
    modal.style.opacity = '1';
    const content = document.getElementById('modal-content');
    if (content) {
      content.classList.remove('scale-95');
      content.classList.add('scale-100');
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeCompactModal();
  });

  const handleEsc = (event) => {
    if (event.key === 'Escape') {
      closeCompactModal();
      document.removeEventListener('keydown', handleEsc);
    }
  };
  document.addEventListener('keydown', handleEsc);
};

window.closeCompactModal = function () {
  const modal = document.querySelector('.fixed.inset-0.z-\\[100\\]');
  if (modal) {
    modal.style.opacity = '0';
    const content = document.getElementById('modal-content');
    if (content) {
      content.classList.remove('scale-100');
      content.classList.add('scale-95');
    }
    setTimeout(() => {
      modal.remove();
      document.body.style.overflow = '';
    }, 300);
  }
};

// ============================================
// TYPEWRITER EFFECT
// ============================================
function initTypewriter() {
  const textElement = document.getElementById('typewriter-text');
  if (!textElement) return;

  const textToType = "Desenvolvedor Web & Analista de Dados";
  let index = 0;
  const typingSpeed = 100;

  function type() {
    if (index < textToType.length) {
      textElement.textContent += textToType.charAt(index);
      index++;
      setTimeout(type, typingSpeed);
    }
  }
  setTimeout(type, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
});

export {
  debounce,
  throttle,
  initSpotlight,
  initScrollProgress,
  initTiltCards,
  initMagneticButtons,
  initScrollAnimations,
  initSmoothScroll,
  initMobileMenu,
  initActiveNavigation,
  initNavbarScroll,
  initProjectFilter,
  updateFooterYear
};