/**
 * ============================================
 * PORTFOLIO DAVID GILMOUR - MAIN.JS
 * ============================================
 * Arquivo principal de interatividade e animações
 * Organizado por módulos funcionais para melhor manutenção
 */

// ============================================
// 1. IMPORTS & CONFIGURAÇÕES GLOBAIS
// ============================================

// Importa o CSS principal (Tailwind + estilos customizados)
import '../css/tailwind.css';

// Configurações globais
const CONFIG = {
  scrollThrottle: 100,        // ms entre execuções de scroll
  animationThreshold: 0.1,    // threshold para Intersection Observer
  navbarOffset: 50,           // px para ativar efeitos da navbar
  mobileMenuBreakpoint: 768   // px para switch desktop/mobile
};

// Opções para event listeners passivos (melhor performance em touch devices)
const PASSIVE_OPTIONS = { passive: true };

// ============================================
// 2. UTILITÁRIOS DE PERFORMANCE
// ============================================

/**
 * Debounce: Limita a frequência de execução de uma função
 * Útil para eventos que disparam muitas vezes (resize, input, etc.)
 * @param {Function} func - Função a ser executada
 * @param {number} wait - Tempo de espera em ms
 */
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

/**
 * Throttle: Executa uma função no máximo uma vez por intervalo
 * Ideal para scroll events e animações
 * @param {Function} func - Função a ser executada
 * @param {number} limit - Intervalo mínimo em ms
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
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

/**
 * Spotlight Effect: Gradiente que segue o cursor do mouse
 * Cria um efeito de luz suave no background
 */
function initSpotlight() {
  const spotlight = document.getElementById('spotlight');
  if (!spotlight) return;

  // Usa requestAnimationFrame para suavidade
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

/**
 * Scroll Progress Bar: Barra de progresso no topo da página
 * Mostra visualmente quanto o usuário já rolou
 */
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

/**
 * 3D Tilt Effect: Efeito de inclinação 3D em cards ao passar o mouse
 * Adiciona profundidade e interatividade aos elementos
 */
function initTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calcula rotação baseada na posição do mouse
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    
    // Reseta a transformação quando o mouse sai
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

/**
 * Magnetic Buttons: Botões que "seguem" levemente o cursor
 * Cria uma sensação tátil e interativa
 */
function initMagneticButtons() {
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Movimento suave (30% da distância do mouse)
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    // Reseta posição quando o mouse sai
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

/**
 * Scroll Reveal Animations: Anima elementos quando entram na viewport
 * Usa Intersection Observer para performance otimizada
 */
function initScrollAnimations() {
  const observerOptions = {
    threshold: CONFIG.animationThreshold,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Para de observar após animar (performance)
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

/**
 * Smooth Scroll: Rolagem suave para âncoras internas
 * Considera a altura da navbar fixa para posicionamento correto
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
        
        // Fecha menu mobile se estiver aberto
        closeMobileMenu();
      }
    });
  });
}

/**
 * Mobile Menu: Controle do menu responsivo em dispositivos móveis
 */
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileCloseBtn = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  if (!mobileBtn || !mobileMenu) return;

  // Abre o menu
  mobileBtn.addEventListener('click', openMobileMenu);
  
  // Fecha o menu
  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMobileMenu);
  }
  
  // Fecha ao clicar em um link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

function openMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden'; // Previne scroll do body
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = ''; // Restaura scroll
  }
}

/**
 * Active Navigation: Destaca o link ativo baseado na seção visível
 * Usa Intersection Observer para detectar qual seção está na tela
 */
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

/**
 * Navbar Scroll Effect: Efeitos visuais na navbar ao rolar a página
 * - Adiciona sombra após certo scroll
 * - Esconde/mostra baseado na direção do scroll
 * - Reduz padding para versão compacta
 */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  
  let lastScroll = 0;
  
  const handleScroll = throttle(() => {
    const currentScroll = window.pageYOffset;
    
    requestAnimationFrame(() => {
      // Adiciona/remove classe scrolled para efeitos visuais
      if (currentScroll > CONFIG.navbarOffset) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      // Esconde navbar ao rolar para baixo, mostra ao rolar para cima
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

/**
 * Project Filter: Filtra projetos por categoria
 * Mostra/esconde cards com animação suave
 */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Atualiza estado visual dos botões
      updateFilterButtons(btn);
      
      const filterValue = btn.getAttribute('data-filter');
      
      // Filtra os cards
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

/**
 * Atualiza classes visuais dos botões de filtro
 */
function updateFilterButtons(activeBtn) {
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  filterBtns.forEach(b => {
    b.classList.remove('active', 'bg-accent', 'text-white', 'shadow-lg');
    b.classList.add('bg-white/5', 'border', 'border-white/10', 'text-text-muted');
  });
  
  activeBtn.classList.remove('bg-white/5', 'border', 'border-white/10', 'text-text-muted');
  activeBtn.classList.add('active', 'bg-accent', 'text-white', 'shadow-lg');
}

/**
 * Mostra um card com animação
 */
function showCard(card) {
  card.classList.remove('hidden');
  requestAnimationFrame(() => {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  });
}

/**
 * Esconde um card com animação
 */
function hideCard(card) {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  setTimeout(() => {
    card.classList.add('hidden');
  }, 300); // Espera a transição CSS terminar
}

// ============================================
// 6. UTILITÁRIOS DIVERSOS
// ============================================

/**
 * Update Footer Year: Atualiza automaticamente o ano no footer
 * Evita ter que mudar manualmente todo ano
 */
function updateFooterYear() {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

// ============================================
// 7. INICIALIZAÇÃO PRINCIPAL
// ============================================

/**
 * Inicializa todas as funcionalidades quando o DOM estiver pronto
 * Ordem de execução otimizada para performance
 */
document.addEventListener('DOMContentLoaded', function() {
  // Prioridade 1: Efeitos visuais imediatos
  initSpotlight();
  initScrollProgress();
  
  // Prioridade 2: Navegação e menu
  initSmoothScroll();
  initMobileMenu();
  initActiveNavigation();
  initNavbarScroll();
  
  // Prioridade 3: Animações e interatividade
  initScrollAnimations();
  initTiltCards();
  initMagneticButtons();
  initProjectFilter();
  
  // Prioridade 4: Utilitários
  updateFooterYear();
  
  // Log de inicialização (remover em produção)
  console.log('✅ Portfolio initialized successfully');
});



// ============================================
// CARROSSEL DE PROJETOS ESTILO APPLE/NETFLIX (AJUSTADO)
// ============================================

function initCompactProjects() {
    const sectionContainer = document.getElementById('projects-section-container'); // Wrapper geral
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
            image: "public/assets/img-projetos/dashboard-inteligente.jpg", 
            tags: ["Power BI", "SQL", "ETL"],
            link: "#contato"
        },
        {
            title: "AppSheet Processos Ágeis",
            category: "Low-Code",
            shortDesc: "Sistemas Mobile Otimizados.",
            fullDesc: "App mobile low-code para equipes de campo. Sincronização offline/online com Google Sheets, garantindo dados precisos em tempo real.",
            metrics: [{ label: "Usuários", value: "85+", icon: "fa-users" }, { label: "Uptime", value: "99%", icon: "fa-server" }],
            image: "public/assets/img-projetos/appsheet-gestao.jpg",
            tags: ["AppSheet", "Mobile"],
            link: "https://wa.me/5586994936797"
        },
        {
            title: "Otimização Logística",
            category: "Processos",
            shortDesc: "Lean & Dados.",
            fullDesc: "Análise de gargalos logísticos via Lean Six Sigma. Otimização de rotas e carga, aumentando eficiência em 40%.",
            metrics: [{ label: "Eficiência", value: "+40%", icon: "fa-chart-line" }, { label: "Entregas", value: "500+", icon: "fa-truck-fast" }],
            image: "public/assets/img-projetos/otimizacao-logistica.jpg",
            tags: ["Lean", "Logística"],
            link: "#contato"
        },
        {
            title: "Governança de Dados",
            category: "Automação",
            shortDesc: "Python & Pandas.",
            fullDesc: "Scripts Python para validação e limpeza automática de grandes volumes de dados. Relatórios de integridade diários por e-mail.",
            metrics: [{ label: "Auto", value: "100%", icon: "fa-robot" }, { label: "Emails", value: "30+", icon: "fa-envelope" }],
            image: "public/assets/img-projetos/governanca-dados.jpg",
            tags: ["Python", "Pandas"],
            link: "#contato"
        },
        {
            title: "Monitoramento Sistemas",
            category: "Sistemas",
            shortDesc: "Custos & Performance.",
            fullDesc: "Painel de monitoramento proativo de hardware e serviços. Redução de 80% nos custos de manutenção corretiva.",
            metrics: [{ label: "Custos", value: "-80%", icon: "fa-money-bill-wave" }, { label: "Uptime", value: "99.9%", icon: "fa-heart-pulse" }],
            image: "public/assets/img-projetos/monitoramento-operacional.jpg",
            tags: ["Infra", "Monitoramento"],
            link: "#contato"
        }
    ];

        // 1. RENDERIZA FILTROS PEQUENOS E RESPONSIVOS NO TOPO
    const categories = ["Todos", ...new Set(projectsData.map(p => p.category))];
    const filterContainer = document.createElement('div');
    
    // Classes ajustadas para mobile: overflow-x-auto permite rolar, whitespace-nowrap impede quebra de linha
    filterContainer.className = "flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide w-full px-1";
    filterContainer.style.scrollbarWidth = 'none'; // Firefox
    filterContainer.style.msOverflowStyle = 'none'; // IE/Edge

    filterContainer.innerHTML = categories.map(cat => `
        <button class="filter-btn whitespace-nowrap px-3 py-1.5 rounded-full text-[10px] md:text-xs font-medium border transition-all duration-300 shrink-0 ${cat === 'Todos' ? 'bg-accent text-white border-accent shadow-lg shadow-accent/20' : 'bg-white/5 text-gray-400 border-white/10 hover:border-accent/50 hover:text-white'}" data-category="${cat}">
            ${cat}
        </button>
    `).join('');
    
    // Insere antes do carrossel
    sectionContainer.insertBefore(filterContainer, carouselContainer); 

    // Lógica de Filtro (Mantida igual)
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

    // 2. RENDERIZA BOLINHAS MINÚSCULAS
    dotsContainer.className = "flex justify-center gap-1.5 mt-4 w-full";
    dotsContainer.innerHTML = projectsData.map((_, index) => `
        <button class="w-1 h-1 rounded-full bg-white/20 transition-all duration-300 hover:bg-accent" data-index="${index}"></button>
    `).join('');
    const dots = dotsContainer.querySelectorAll('button');

    function updateDots() {
        // Calcula qual card está mais visível no centro
        const scrollLeft = carouselContainer.scrollLeft;
        const cardWidth = 260 + 12; // Largura do card (w-[260px]) + gap-3 (12px)
        const activeIndex = Math.round(scrollLeft / cardWidth);

        dots.forEach((dot, index) => {
            // Verifica se o card correspondente está visível (não oculto pelo filtro)
            const correspondingCard = carouselContainer.children[index];
            const isVisible = correspondingCard && correspondingCard.style.display !== 'none';

            if (index === activeIndex && isVisible) {
                dot.classList.remove('bg-white/20', 'w-1', 'h-1');
                dot.classList.add('bg-accent', 'w-3', 'h-1'); // Estica levemente a ativa
            } else {
                dot.classList.add('bg-white/20', 'w-1', 'h-1', 'rounded-full');
                dot.classList.remove('bg-accent', 'w-3', 'h-1');
            }
        });
    }

    // 3. RENDERIZA CARDS VERTICAIS ESTREITOS (Estilo Instagram/Story)
    carouselContainer.className = "flex overflow-x-auto snap-x snap-mandatory gap-3 pb-4 scrollbar-hide w-full px-1";
    
    carouselContainer.innerHTML = projectsData.map((proj, index) => `
        <div class="project-card-item snap-center shrink-0 w-[260px] flex flex-col group cursor-pointer bg-slate-800/40 border border-white/5 rounded-2xl overflow-hidden hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20" 
             data-category="${proj.category}"
             onclick="openCompactModal(${index})">
            
            <!-- IMAGEM TOPO (Estilo Capa Vertical) -->
            <div class="relative w-full h-48 overflow-hidden bg-slate-900">
                <img src="${proj.image}" alt="${proj.title}" 
                     class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                     onerror="this.style.opacity='0'">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-800 via-transparent to-transparent opacity-80"></div>
                
                <!-- Categoria Minimalista -->
                <span class="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/50 backdrop-blur-md text-white text-[8px] font-bold uppercase tracking-wider border border-white/10">
                    ${proj.category}
                </span>
            </div>

            <!-- CONTEÚDO COMPACTO -->
            <div class="p-3 flex flex-col flex-1">
                <h3 class="text-base font-bold text-white mb-1 leading-tight group-hover:text-accent transition-colors">${proj.title}</h3>
                <p class="text-gray-400 text-[10px] mb-3 line-clamp-2 leading-relaxed">${proj.shortDesc}</p>
                
                <!-- Métricas Mini -->
                <div class="grid grid-cols-2 gap-2 mb-3">
                    ${proj.metrics.map(m => `
                        <div class="flex items-center gap-1.5 p-1.5 rounded bg-white/5 border border-white/5">
                            <i class="fa-solid ${m.icon} text-accent text-[10px]"></i>
                            <div>
                                <div class="text-xs font-bold text-white leading-none">${m.value}</div>
                                <div class="text-[8px] text-gray-300 mt-1 uppercase">${m.label.split(' ')[0]}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Tags Suaves (Hover Rápido) -->
                <div class="flex flex-wrap gap-2">
                    ${proj.tags.map(tag => `
                        <span class="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-medium text-gray-300 transition-all duration-200 hover:border-accent hover:text-white hover:bg-accent">
                            ${tag}
                        </span>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');

    // Event Listeners
    carouselContainer.addEventListener('scroll', updateDots);
    
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            const cardWidth = 260 + 12;
            carouselContainer.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
        });
    });

    // Inicializa
    updateDots();
}

// ============================================
// MODAL COMPACTO ESTILO NOTION (JANELA FLUTUANTE)
// ============================================
window.openCompactModal = function(index) {
    const projectsData = [
        {
            title: "Dashboard Operacional",
            category: "Data & BI",
            fullDesc: "Ecossistema de dashboards Power BI conectados ao SQL. Automação de relatórios manuais, economizando 15h/semana da equipe. Implementação de KPIs de eficiência operacional em tempo real.",
            metrics: [{ label: "Redução Tempo", value: "70%" }, { label: "Economia", value: "15h" }],
            image: "public/assets/img-projetos/dashboard-inteligente.jpg", 
            tags: ["Power BI", "SQL", "ETL"],
            link: "#contato"
        },
        {
            title: "AppSheet Gestão",
            category: "Low-Code",
            fullDesc: "App mobile low-code para equipes de campo. Sincronização offline/online com Google Sheets, garantindo dados precisos em tempo real. Redução de erros de digitação em 90%.",
            metrics: [{ label: "Usuários", value: "85+" }, { label: "Uptime", value: "99%" }],
            image: "public/assets/img-projetos/appsheet-gestao.jpg",
            tags: ["AppSheet", "Mobile"],
            link: "https://wa.me/5586994936797"
        },
        {
            title: "Otimização Logística",
            category: "Processos",
            fullDesc: "Análise de gargalos logísticos via Lean Six Sigma. Otimização de rotas e carga, aumentando eficiência em 40%. Integração com sistemas de rastreamento.",
            metrics: [{ label: "Eficiência", value: "+40%" }, { label: "Entregas", value: "500+" }],
            image: "public/assets/img-projetos/otimizacao-logistica.jpg",
            tags: ["Lean", "Logística"],
            link: "#contato"
        },
        {
            title: "Governança de Dados",
            category: "Automação",
            fullDesc: "Scripts Python para validação e limpeza automática de grandes volumes de dados. Relatórios de integridade diários por e-mail. Padronização de nomenclatura e formatos.",
            metrics: [{ label: "Auto", value: "100%" }, { label: "Emails", value: "30+" }],
            image: "public/assets/img-projetos/governanca-dados.jpg",
            tags: ["Python", "Pandas"],
            link: "#contato"
        },
        {
            title: "Monitoramento Sistemas",
            category: "Sistemas",
            fullDesc: "Painel de monitoramento proativo de hardware e serviços. Redução de 80% nos custos de manutenção corretiva. Alertas automáticos via Slack/E-mail.",
            metrics: [{ label: "Custos", value: "-80%" }, { label: "Uptime", value: "99.9%" }],
            image: "public/assets/img-projetos/monitoramento-operacional.jpg",
            tags: ["Infra", "Monitoramento"],
            link: "#contato"
        }
    ];

    const proj = projectsData[index];
    
    const modal = document.createElement('div');
    // Fundo escuro com blur
    modal.className = 'fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 opacity-0 transition-opacity duration-300';
    
    // Modal Compacto: max-w-md (aprox 450px) ou max-w-lg (500px). Estreito e alto.
    modal.innerHTML = `
        <div class="relative w-full max-w-md bg-slate-900 rounded-3xl overflow-hidden shadow-2xl transform scale-95 transition-transform duration-300 border border-white/10 flex flex-col max-h-[90vh]" id="modal-content">
            
            <!-- Botão Fechar -->
            <button onclick="closeCompactModal()" class="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors backdrop-blur-md">
                <i class="fa-solid fa-xmark text-sm"></i>
            </button>

            <!-- Imagem Topo (Menor altura) -->
            <div class="h-48 w-full bg-slate-800 relative shrink-0">
                 <img src="${proj.image}" class="w-full h-full object-cover">
                 <div class="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
            </div>
            
            <!-- Conteúdo Scrollável -->
            <div class="p-6 overflow-y-auto custom-scrollbar flex-1">
                <span class="text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">${proj.category}</span>
                <h2 class="text-2xl font-bold text-white mb-4 leading-tight">${proj.title}</h2>
                
                <p class="text-gray-300 text-sm leading-relaxed mb-6">
                    ${proj.fullDesc}
                </p>
                
                <!-- Métricas Compactas -->
                <div class="grid grid-cols-2 gap-3 mb-6">
                    ${proj.metrics.map(m => `
                        <div class="p-3 rounded-xl bg-white/5 border border-white/5">
                            <div class="text-lg font-bold text-accent">${m.value}</div>
                            <div class="text-[10px] text-gray-400 uppercase">${m.label}</div>
                        </div>
                    `).join('')}
                </div>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mb-6">
                    ${proj.tags.map(tag => `
                        <span class="px-2 py-1 rounded-md bg-white/10 border border-white/10 text-[10px] font-medium text-gray-200">
                            ${tag}
                        </span>
                    `).join('')}
                </div>

                <!-- Botão Ação -->
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
        document.getElementById('modal-content').classList.remove('scale-95');
        document.getElementById('modal-content').classList.add('scale-100');
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

window.closeCompactModal = function() {
    const modal = document.querySelector('.fixed.inset-0.z-\\[100\\]');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
};

document.addEventListener('DOMContentLoaded', initCompactProjects);



// ============================================
// ANIMAÇÃO TYPEWRITER (ESTILO VITURE)
// ============================================
function initTypewriter() {
    const textElement = document.getElementById('typewriter-text');
    if (!textElement) return;

    // O texto que será digitado
    const textToType = "Desenvolvedor Web & Analista de Dados";
    let index = 0;
    const typingSpeed = 100; // Velocidade em ms (quanto menor, mais rápido)

    function type() {
        if (index < textToType.length) {
            textElement.textContent += textToType.charAt(index);
            index++;
            setTimeout(type, typingSpeed);
        } else {
            // Opcional: Remover o cursor piscante após terminar
            // textElement.classList.remove('border-r-2', 'border-accent');
        }
    }

    // Inicia a animação após um pequeno delay para sincronizar com a entrada da página
    setTimeout(type, 1000);
}

// Adicione isso dentro do seu DOMContentLoaded existente
document.addEventListener('DOMContentLoaded', () => {
    // ... suas outras funções ...
    initTypewriter();
});


// ============================================
// 8. EXPORTS (opcional, para testes ou modularização futura)
// ============================================


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