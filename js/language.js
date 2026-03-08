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

  // Update toggle button text
  function updateToggleButtonText(lang) {
    const btn = document.getElementById('lang-toggle-btn');
    if (btn) {
      btn.textContent = lang === 'zh' ? 'English' : '中文';
    }
  }

  // Get current language
  window.getCurrentLanguage = function () {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE;
  };
})();
