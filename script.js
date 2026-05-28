// script.js
const container = document.querySelector('.grid-bg');
if (container) {
  const cols = Math.ceil(window.innerWidth / 40) + 1;
  const rows = Math.ceil(window.innerHeight / 40) + 1;
  for (let i = 0; i < rows * cols; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    container.appendChild(dot);
  }
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
});

// Nav active state
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 80) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});
