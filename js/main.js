// ============================================
// VERIZON CLONE - MAIN JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroSlider();
  initScrollEffects();
  initAOS();
  initPlanToggle();
  initFilterButtons();
  initContactForm();
  initActiveNav();
  initScrollTop();
});

// Mobile Navbar
function initNavbar() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navbar = document.getElementById('mainNav');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    document.querySelectorAll('#navLinks a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    }
  });
}

// Hero Slider
function initHeroSlider() {
  const wrapper = document.getElementById('slidesWrapper');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  const dotsContainer = document.getElementById('sliderDots');

  if (!wrapper || !slides.length || !dotsContainer) return;

  let currentSlide = 0;
  let autoPlay;

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  function updateSlider() {
    wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
    restartAutoPlay();
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
  }

  function startAutoPlay() {
    autoPlay = setInterval(nextSlide, 4500);
  }

  function restartAutoPlay() {
    clearInterval(autoPlay);
    startAutoPlay();
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); restartAutoPlay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); restartAutoPlay(); });

  // Swipe support
  let startX = 0;
  let endX = 0;
  wrapper.addEventListener('touchstart', (e) => startX = e.changedTouches[0].clientX);
  wrapper.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) { nextSlide(); restartAutoPlay(); }
    if (endX - startX > 50) { prevSlide(); restartAutoPlay(); }
  });

  startAutoPlay();
}

// Scroll effects
function initScrollEffects() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// Simple AOS Animation
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.aosDelay || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, delay);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
}

// Plans toggle
function initPlanToggle() {
  const buttons = document.querySelectorAll('.toggle-btn');
  const planCards = document.querySelectorAll('.plan-card');

  if (!buttons.length || !planCards.length) return;

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const type = button.dataset.type;
      planCards.forEach(card => {
        if (type === 'all' || card.dataset.type === type) {
          card.style.display = 'block';
          setTimeout(() => card.style.opacity = '1', 30);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 200);
        }
      });
    });
  });
}

// Device filters
function initFilterButtons() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.device-card');

  if (!buttons.length || !cards.length) return;

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category.includes(filter)) {
          card.style.display = 'block';
          setTimeout(() => card.style.opacity = '1', 20);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 200);
        }
      });
    });
  });
}

// Contact form
function initContactForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  if (!form || !success) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    success.classList.add('show');
    form.reset();
    setTimeout(() => success.classList.remove('show'), 5000);
  });
}

// Scroll top button
function initScrollTop() {
  const btn = document.createElement('button');
  btn.className = 'scroll-top';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Active nav link
function initActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
}
