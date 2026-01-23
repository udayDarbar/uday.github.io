// ===== PORTFOLIO MAIN SCRIPT =====

// Auto-update year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// ===== SCROLL REVEAL ANIMATIONS =====
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => {
    el.classList.add('reveal');
    io.observe(el);
  });
})();

// ===== ACTIVE NAV HIGHLIGHTING =====
(function () {
  const links = Array.from(document.querySelectorAll('header nav a[href^="#"]'));
  const map = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
  const sections = Array.from(document.querySelectorAll('main section[id]'));

  const io = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;

    const id = visible.target.id;
    links.forEach(a => a.classList.toggle('active', map.get(id) === a));
  }, { rootMargin: '-35% 0px -55% 0px', threshold: [0.1, 0.2, 0.3] });

  sections.forEach(s => io.observe(s));
})();

// ===== OPTIONAL: DARK THEME TOGGLE =====
// Uncomment this section if you want manual dark theme toggle button

(function() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('theme') || 'light';
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleBtn.textContent = '☀️';
  }

  toggleBtn.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  });
})();

