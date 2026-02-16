const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;

const applyTheme = (theme) => {
  root.dataset.theme = theme;

  if (!themeToggle) return;

  const isLight = theme === 'light';
  themeToggle.setAttribute('aria-pressed', String(isLight));
  themeToggle.textContent = isLight ? 'Mørk modus' : 'Lys modus';
};

const storedTheme = localStorage.getItem('raw-theme');
if (storedTheme === 'light' || storedTheme === 'dark') {
  applyTheme(storedTheme);
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
    localStorage.setItem('raw-theme', nextTheme);
  });
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
