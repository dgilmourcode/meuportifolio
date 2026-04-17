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