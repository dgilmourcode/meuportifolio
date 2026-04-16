// ============================================
// PERFORMANCE UTILITIES
// ============================================

// Debounce for scroll events
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

// Throttle for animations
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

// Passive event listeners
const passiveOptions = { passive: true };

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  initScrollAnimations();
  initSmoothScroll();
  initProjectFilter();
  initMobileMenu();
  initActiveNavigation();
  initNavbarScroll();
  initScrollProgress();
  initSpotlight();
  initMagneticButtons();
  initTiltCards();
  updateFooterYear();
});

// ============================================
// SCROLL PROGRESS BAR
// ============================================

function initScrollProgress() {
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }
  }, passiveOptions);
}

// ============================================
// SPOTLIGHT EFFECT
// ============================================

function initSpotlight() {
  const spotlight = document.getElementById('spotlight');
  if (!spotlight) return;

  document.addEventListener('mousemove', (e) => {
    spotlight.style.left = e.clientX + 'px';
    spotlight.style.top = e.clientY + 'px';
  }, passiveOptions);
}

// ============================================
// 3D TILT EFFECT ON CARDS
// ============================================

function initTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

// ============================================
// MAGNETIC BUTTONS
// ============================================

function initMagneticButtons() {
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
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
// SMOOTH SCROLL
// ============================================

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
        
        // Close mobile menu
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  });
}

// ============================================
// PROJECT FILTER
// ============================================

function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-accent', 'text-white');
        b.classList.add('bg-transparent', 'text-text-muted');
      });
      
      btn.classList.remove('bg-transparent', 'text-text-muted');
      btn.classList.add('active', 'bg-accent', 'text-white');
      
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

// ============================================
// MOBILE MENU
// ============================================

function initMobileMenu() {
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      
      const icon = mobileBtn.querySelector('i');
      if (icon) {
        if (mobileMenu.classList.contains('hidden')) {
          icon.setAttribute('data-lucide', 'menu');
        } else {
          icon.setAttribute('data-lucide', 'x');
        }
      }
    });
  }
}

// ============================================
// ACTIVE NAVIGATION
// ============================================

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

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  
  let lastScroll = 0;
  
  const handleScroll = throttle(() => {
    const currentScroll = window.pageYOffset;
    
    requestAnimationFrame(() => {
      if (currentScroll > 50) {
        navbar.classList.add('shadow-lg');
      } else {
        navbar.classList.remove('shadow-lg');
      }
      
      if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
    });
    
    lastScroll = currentScroll;
  }, 100);
  
  window.addEventListener('scroll', handleScroll, passiveOptions);
}

// ============================================
// UPDATE FOOTER YEAR
// ============================================

function updateFooterYear() {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}