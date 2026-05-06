/* =========================================
   RAMAG — main.js
========================================= */

const WA_NUMBER = '523312245803';

/* ── Mobile Menu ── */
const menuBtn  = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = menuBtn ? menuBtn.querySelector('i') : null;

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    if (menuIcon) {
      menuIcon.className = open ? 'fas fa-times' : 'fas fa-bars';
    }
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      if (menuIcon) menuIcon.className = 'fas fa-bars';
    });
  });
}

/* ── Active Nav Link ── */
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link, #mobile-menu a').forEach(link => {
  const href = (link.getAttribute('href') || '').split('/').pop();
  if (href === page || (page === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* ── Navbar Scroll Effect ── */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

/* ── Build data-wa links ── */
document.querySelectorAll('a[data-wa]').forEach(a => {
  const msg = encodeURIComponent(a.dataset.wa);
  a.href = `https://wa.me/${WA_NUMBER}?text=${msg}`;
  a.target = '_blank';
  a.rel = 'noopener';
});

/* ── Contact Form → WhatsApp ── */
const form = document.getElementById('cotiza-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const nombre   = (form.nombre?.value   || '').trim();
    const empresa  = (form.empresa?.value  || '').trim();
    const servicio = (form.servicio?.value || '').trim();
    const detalle  = (form.detalle?.value  || '').trim();

    let msg = `Hola RAMAG, les contacto desde su sitio web.\n\n`;
    msg += `*Nombre:* ${nombre}\n`;
    if (empresa)  msg += `*Empresa:* ${empresa}\n`;
    if (servicio) msg += `*Servicio de interés:* ${servicio}\n`;
    if (detalle)  msg += `\n*Detalle / Consulta:*\n${detalle}`;

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  });
}

/* ── Stats Count-Up ── */
function countUp(el, target, duration = 1600) {
  let start = 0;
  const isDecimal = String(target).includes('.');
  const step = target / (duration / 16);
  const tick = () => {
    start += step;
    if (start >= target) {
      el.textContent = el.dataset.suffix
        ? target + el.dataset.suffix
        : (isDecimal ? target.toFixed(1) : target);
      return;
    }
    el.textContent = (isDecimal ? start.toFixed(1) : Math.floor(start)) +
                     (el.dataset.suffix || '');
    requestAnimationFrame(tick);
  };
  tick();
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.target);
    if (!isNaN(target)) countUp(el, target);
    statsObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => {
  statsObserver.observe(el);
});

/* ── Scroll To Top ── */
const scrollTopBtn = document.getElementById('scroll-top');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── Intersection Observer for Animations ── */
const animObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.animate-up, .animate-left, .animate-right').forEach(el => {
  animObserver.observe(el);
});
