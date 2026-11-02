document.documentElement.classList.add('js');

// Mobile menu: the toggle shows the page links, a tap on a link or Escape closes it
const nav = document.querySelector('.nav');
const navToggle = nav && nav.querySelector('.nav__toggle');
if (navToggle) {
  const setOpen = (open) => {
    nav.classList.toggle('nav--open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  };
  navToggle.addEventListener('click', () => setOpen(!nav.classList.contains('nav--open')));
  nav.querySelectorAll('.nav__links a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
}

// Surfaces materialise as they scroll into view; charts grow, chat messages arrive one by one
const targets = document.querySelectorAll('.reveal, .grow, [data-chat]');
document.querySelectorAll('[data-chat]').forEach((chat) => {
  chat.querySelectorAll('.chat > li').forEach((el, i) => { el.style.transitionDelay = `${i * 160}ms`; });
});

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  targets.forEach((el) => io.observe(el));
} else {
  targets.forEach((el) => el.classList.add('is-in'));
}

document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
