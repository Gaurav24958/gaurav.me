function initHamburger() {
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('nav-mobile-menu');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close menu when a link is clicked
  const links = mobileMenu.querySelectorAll('a');
  links.forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

function initCurtain() {
  const curtain = document.querySelector('.curtain');
  const toggleBtns = document.querySelectorAll('.toggle-btn');

  toggleBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const isActive = btn.classList.contains('active');
      if (isActive) return; // Do nothing if clicking active button

      const targetUrl = btn.dataset.target;
      
      // Slide down the curtain
      curtain.classList.add('slide-down');
      
      // Navigate after 1000ms (matching the smooth animation)
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 1000);
    });
  });
}

function initTabs() {
  // Tab functionality no longer needed — using folder-based navigation
}

function initChapter() {
  const htmlElement = document.documentElement;
  const chapter = htmlElement.getAttribute('data-chapter');
  const indiaBtn = document.getElementById('btn-india');
  const irelandBtn = document.getElementById('btn-ireland');

  if (chapter === 'india' && indiaBtn) {
    indiaBtn.classList.add('active');
  } else if (chapter === 'ireland' && irelandBtn) {
    irelandBtn.classList.add('active');
  }
}

function initDarkMode() {
  const htmlElement = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');

  // Read theme from localStorage on load
  const savedTheme = localStorage.getItem('theme') || 'light';
  htmlElement.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initHamburger();
  initCurtain();
  initTabs();
  initChapter();
  initDarkMode();
});
