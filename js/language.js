// Global language toggle functionality
(function () {
  const STORAGE_KEY = 'site-language';
  const DEFAULT_LANGUAGE = 'zh';

  // Initialize language on page load
  window.addEventListener('DOMContentLoaded', function () {
    const savedLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE;
    applyLanguage(savedLang);
    updateToggleButtonText(savedLang);
  });

  // Toggle language function
  window.toggleSiteLanguage = function () {
    const currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE;
    const newLang = currentLang === 'zh' ? 'en' : 'zh';
    localStorage.setItem(STORAGE_KEY, newLang);
    applyLanguage(newLang);
    updateToggleButtonText(newLang);
  };

  // Apply language to all content divs
  function applyLanguage(lang) {
    const zhElements = document.querySelectorAll('[data-lang="zh"]');
    const enElements = document.querySelectorAll('[data-lang="en"]');

    if (lang === 'zh') {
      zhElements.forEach(el => el.style.display = 'block');
      enElements.forEach(el => el.style.display = 'none');
    } else {
      zhElements.forEach(el => el.style.display = 'none');
      enElements.forEach(el => el.style.display = 'block');
    }
  }

  // Update toggle button text (not needed for icon buttons)
  function updateToggleButtonText(lang) {
    // Both desktop and mobile use icon buttons now
    // No text update needed
  }

  // Get current language
  window.getCurrentLanguage = function () {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE;
  };

  // Toggle mobile menu
  window.toggleMobileMenu = function () {
    const navWrapper = document.getElementById('nav-wrapper');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (navWrapper && menuToggle) {
      navWrapper.classList.toggle('active');
      menuToggle.classList.toggle('active');
    }
  };

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    const navWrapper = document.getElementById('nav-wrapper');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.site-header nav');
    
    if (navWrapper && menuToggle && nav) {
      if (!nav.contains(event.target) && navWrapper.classList.contains('active')) {
        navWrapper.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    }
  });

  // Close mobile menu when clicking on a link
  document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.site-nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        const navWrapper = document.getElementById('nav-wrapper');
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        
        if (navWrapper && menuToggle && window.innerWidth <= 768) {
          navWrapper.classList.remove('active');
          menuToggle.classList.remove('active');
        }
      });
    });
  });
})();
