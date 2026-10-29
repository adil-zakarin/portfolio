document.documentElement.classList.add('js');

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
