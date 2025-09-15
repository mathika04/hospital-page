// Sidebar toggle
function showSidebar() {
  document.getElementById('sidebar').style.display = 'flex';
}

function hideSidebar() {
  document.getElementById('sidebar').style.display = 'none';
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    hideSidebar(); // auto-close sidebar after clicking
  });
});

// Active navigation highlighting
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('nav a[href^="#"]');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${current}`) {
      item.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
