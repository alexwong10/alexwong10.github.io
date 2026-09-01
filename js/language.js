// Global language toggle functionality
(function () {
  const STORAGE_KEY = 'site-language';
  const DEFAULT_LANGUAGE = 'zh';
  const LANGUAGE_LABELS = {
    zh: {
      switchTo: '切换到英文',
      navigation: '主导航',
      openPersonalPanel: '打开个人侧记',
      closePersonalPanel: '关闭个人侧记'
    },
    en: {
      switchTo: 'Switch to Chinese',
      navigation: 'Primary navigation',
      openPersonalPanel: 'Open personal notes',
      closePersonalPanel: 'Close personal notes'
    }
  };
  const PAGE_TITLES = {
    '/articles.html': {
      zh: '全部文章',
      en: 'All articles'
    },
    '/tags': {
      zh: '文章标签',
      en: 'Article tags'
    }
  };
  const paginationStates = [];
  const mottoStates = [];
  let paginationResizeTimer = null;

  // Initialize language on page load
  window.addEventListener('DOMContentLoaded', function () {
    initializePagination();
    initializeTagFilter();
    initializeLanguageControls();
    initializePersonalPanel();
    initializeTopicIndexToggles();
    initializeMottoRotator();
    initializePostToc();
    applyLanguage(getStoredLanguage());
  });

  // Toggle language function
  window.toggleSiteLanguage = function () {
    const currentLang = getStoredLanguage();
    const newLang = currentLang === 'zh' ? 'en' : 'zh';
    storeLanguage(newLang);
    applyLanguage(newLang);
  };

  function getStoredLanguage() {
    try {
      return window.localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : DEFAULT_LANGUAGE;
    } catch (error) {
      return DEFAULT_LANGUAGE;
    }
  }

  function storeLanguage(lang) {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (error) {
      // The page still works when storage is unavailable or blocked.
    }
  }

  function normalizeLanguage(lang) {
    return lang === 'en' ? 'en' : DEFAULT_LANGUAGE;
  }

  // Apply language to all content divs
  function applyLanguage(lang) {
    const currentLang = normalizeLanguage(lang);

    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.hidden = el.dataset.lang !== currentLang;
    });

    // Keep browser text shaping and assistive technology in sync after a toggle.
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
    updateMetaDescription(currentLang);
    updateDocumentTitle(currentLang);
    updateToggleButtonText(currentLang);
    updatePrimaryNavLabel(currentLang);
    updatePostNavigationLabel(currentLang);
    updatePostTocLabel(currentLang);
    updatePersonalPanelLabels(currentLang);
    updateMottoRotators(currentLang);

    paginationStates.forEach(function (state) {
      if (state.autoPageSize && state.lang === currentLang) {
        state.pageSize = resolvePageSize(state);
        renderPagination(state);
      }
    });
  }

  function initializePagination() {
    document.querySelectorAll('[data-pagination-list]').forEach(function (list) {
      const nav = document.querySelector('[data-pagination-for="' + list.id + '"]');
      const pageSizeValue = (list.dataset.pageSize || '').toLowerCase();
      const autoPageSize = pageSizeValue === 'auto';
      const parsedPageSize = Number.parseInt(pageSizeValue, 10);
      const parsedFallbackPageSize = Number.parseInt(list.dataset.pageSizeFallback, 10);
      const fallbackPageSize = autoPageSize
        ? (Number.isFinite(parsedFallbackPageSize) && parsedFallbackPageSize > 0 ? parsedFallbackPageSize : 4)
        : (Number.isFinite(parsedPageSize) && parsedPageSize > 0 ? parsedPageSize : 3);
      const items = Array.from(list.children).filter(function (child) {
        return child.tagName === 'LI';
      });

      const state = {
        list: list,
        nav: nav,
        items: items,
        pageSize: fallbackPageSize,
        fallbackPageSize: fallbackPageSize,
        autoPageSize: autoPageSize,
        lang: list.closest('[data-lang]')?.dataset.lang || 'zh'
      };

      paginationStates.push(state);
      if (state.autoPageSize && isWideArchiveLayout()) {
        state.pageSize = resolvePageSize(state);
      }
      renderPagination(state);
    });
  }

  function isWideArchiveLayout() {
    return !window.matchMedia || window.matchMedia('(min-width: 801px)').matches;
  }

  function resolvePageSize(state) {
    if (!state.autoPageSize || !state.items.length || !isWideArchiveLayout()) {
      return state.fallbackPageSize;
    }

    const content = state.list.closest('.academic-content');
    if (!content || state.list.getClientRects().length === 0) {
      return state.fallbackPageSize;
    }

    const contentRect = content.getBoundingClientRect();
    const listRect = state.list.getBoundingClientRect();
    const availableHeight = contentRect.bottom - listRect.top;
    const itemHeights = state.items.map(function (item) {
      const wasHidden = item.hidden;
      item.hidden = false;
      const height = item.getBoundingClientRect().height;
      item.hidden = wasHidden;
      return height;
    });
    const itemsWithoutPagination = fitItemCount(itemHeights, availableHeight);

    if (itemsWithoutPagination >= itemHeights.length) {
      return itemHeights.length;
    }

    const paginationReserve = getPaginationReserve(state.nav);
    return Math.max(1, fitItemCount(itemHeights, availableHeight - paginationReserve));
  }

  function fitItemCount(itemHeights, availableHeight) {
    let usedHeight = 0;
    let itemCount = 0;

    itemHeights.some(function (itemHeight) {
      if (itemCount > 0 && usedHeight + itemHeight > availableHeight) {
        return true;
      }

      usedHeight += itemHeight;
      itemCount += 1;
      return false;
    });

    return itemCount;
  }

  function getPaginationReserve(nav) {
    if (!nav) {
      return 0;
    }

    if (!nav.hidden && nav.getClientRects().length > 0) {
      const style = window.getComputedStyle(nav);
      const marginTop = Number.parseFloat(style.marginTop) || 0;
      return nav.getBoundingClientRect().height + marginTop;
    }

    const rootFontSize = Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;
    return rootFontSize * 4;
  }

  function refreshAutoPagination() {
    paginationStates.forEach(function (state) {
      if (!state.autoPageSize || state.list.getClientRects().length === 0) {
        return;
      }

      const nextPageSize = resolvePageSize(state);
      if (nextPageSize !== state.pageSize) {
        state.pageSize = nextPageSize;
        renderPagination(state);
      }
    });
  }

  window.addEventListener('resize', function () {
    window.clearTimeout(paginationResizeTimer);
    paginationResizeTimer = window.setTimeout(refreshAutoPagination, 120);
  });

  function initializeTagFilter() {
    const groups = Array.from(document.querySelectorAll('[data-tag-group]'));
    const requestedTag = new URLSearchParams(window.location.search).get('tag');

    if (!groups.length || !requestedTag) {
      return;
    }

    let matched = false;
    groups.forEach(function (group) {
      const isMatch = group.dataset.tagGroup === requestedTag;
      group.hidden = !isMatch;
      matched = matched || isMatch;
    });

    const emptyState = document.querySelector('[data-tag-empty]');
    if (emptyState) {
      emptyState.hidden = matched;
    }
  }

  function renderPagination(state) {
    const totalPages = Math.max(1, Math.ceil(state.items.length / state.pageSize));
    const requestedPage = getRequestedPage();
    const currentPage = Math.min(requestedPage, totalPages);
    const start = (currentPage - 1) * state.pageSize;
    const end = start + state.pageSize;

    state.items.forEach(function (item, index) {
      item.hidden = index < start || index >= end;
    });

    if (!state.nav) {
      return;
    }

    const summary = state.nav.querySelector('[data-pagination-summary]');
    const controls = state.nav.querySelector('[data-pagination-controls]');
    state.nav.hidden = totalPages <= 1;

    if (summary) {
      summary.textContent = state.lang === 'zh'
        ? '第 ' + currentPage + ' / ' + totalPages + ' 页'
        : 'Page ' + currentPage + ' of ' + totalPages;
    }

    if (!controls) {
      return;
    }

    controls.replaceChildren();
    if (totalPages <= 1) {
      return;
    }

    appendPaginationControl(
      controls,
      currentPage > 1 ? currentPage - 1 : null,
      state.lang === 'zh' ? '上一页' : 'Previous',
      'pagination-previous'
    );

    for (let page = 1; page <= totalPages; page += 1) {
      appendPaginationControl(
        controls,
        page,
        String(page),
        'pagination-page',
        page === currentPage
      );
    }

    appendPaginationControl(
      controls,
      currentPage < totalPages ? currentPage + 1 : null,
      state.lang === 'zh' ? '下一页' : 'Next',
      'pagination-next'
    );
  }

  function appendPaginationControl(container, page, label, className, isCurrent) {
    const control = document.createElement(page && !isCurrent ? 'a' : 'span');
    control.className = 'pagination-control ' + className;
    control.textContent = label;

    if (isCurrent) {
      control.classList.add('is-current');
      control.setAttribute('aria-current', 'page');
    } else if (page) {
      control.href = paginationHref(page);
    } else {
      control.classList.add('is-disabled');
      control.setAttribute('aria-disabled', 'true');
    }

    container.appendChild(control);
  }

  function getRequestedPage() {
    const requestedPage = Number.parseInt(new URLSearchParams(window.location.search).get('page'), 10);
    return Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  }

  function paginationHref(page) {
    const url = new URL(window.location.href);
    if (page === 1) {
      url.searchParams.delete('page');
    } else {
      url.searchParams.set('page', String(page));
    }
    url.hash = '';
    return url.pathname + url.search;
  }

  // Keep language controls and navigation labels in the active language.
  function updateToggleButtonText(lang) {
    const labels = LANGUAGE_LABELS[lang];
    const buttonText = lang === 'zh' ? 'EN' : '中';

    document.querySelectorAll('.lang-toggle-icon').forEach(function (button) {
      button.textContent = buttonText;
      button.setAttribute('aria-label', labels.switchTo);
      button.setAttribute('title', labels.switchTo);
    });
  }

  function updatePrimaryNavLabel(lang) {
    document.querySelectorAll('.site-header nav').forEach(function (nav) {
      nav.setAttribute('aria-label', LANGUAGE_LABELS[lang].navigation);
    });
  }

  function updatePostNavigationLabel(lang) {
    document.querySelectorAll('.post-nav').forEach(function (nav) {
      nav.setAttribute('aria-label', lang === 'zh' ? '文章导航' : 'Article navigation');
    });
  }

  function updatePostTocLabel(lang) {
    document.querySelectorAll('.post-toc').forEach(function (toc) {
      toc.setAttribute('aria-label', lang === 'zh' ? '目录' : 'Table of contents');
    });
  }

  function updateDocumentTitle(lang) {
    const path = window.location.pathname.replace(/\/+$/, '') || '/';
    const pageTitle = PAGE_TITLES[path] && PAGE_TITLES[path][lang];

    if (pageTitle) {
      document.title = pageTitle + ' - Alex Wong';
    }
  }

  function updateMetaDescription(lang) {
    const description = document.querySelector('#page-description');

    if (!description) {
      return;
    }

    const content = lang === 'en'
      ? description.dataset.descriptionEn
      : description.dataset.descriptionZh;

    if (content) {
      description.setAttribute('content', content);
    }
  }

  function updatePersonalPanelLabels(lang, isOpen) {
    const labels = LANGUAGE_LABELS[lang];
    const panel = document.getElementById('personal-panel');
    const panelIsOpen = typeof isOpen === 'boolean'
      ? isOpen
      : Boolean(panel && !panel.hidden);
    const label = panelIsOpen ? labels.closePersonalPanel : labels.openPersonalPanel;

    document.querySelectorAll('.personal-panel-toggle').forEach(function (button) {
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
    });

    const closeButton = document.querySelector('.personal-panel-close');
    if (closeButton) {
      closeButton.setAttribute('aria-label', labels.closePersonalPanel);
      closeButton.setAttribute('title', labels.closePersonalPanel);
    }
  }

  function initializeLanguageControls() {
    document.querySelectorAll('.lang-toggle-icon').forEach(function (button) {
      button.addEventListener('click', function () {
        window.toggleSiteLanguage();
      });

      button.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          window.toggleSiteLanguage();
        }
      });
    });
  }

  let personalPanelTrigger = null;

  function setPersonalPanelState(isOpen, returnFocus) {
    const panel = document.getElementById('personal-panel');
    const toggles = Array.from(document.querySelectorAll('.personal-panel-toggle'));

    if (!panel || !toggles.length) {
      return;
    }

    if (isOpen) {
      panel.hidden = false;
      panel.classList.add('is-open');
      toggles.forEach(function (button) {
        button.setAttribute('aria-expanded', 'true');
      });
      updatePersonalPanelLabels(getStoredLanguage(), true);

      const closeButton = panel.querySelector('.personal-panel-close');
      if (closeButton) {
        closeButton.focus();
      }
      return;
    }

    panel.classList.remove('is-open');
    panel.hidden = true;
    toggles.forEach(function (button) {
      button.setAttribute('aria-expanded', 'false');
    });
    updatePersonalPanelLabels(getStoredLanguage(), false);

    if (returnFocus) {
      returnFocus.focus();
    }
  }

  function closePersonalPanel(returnFocus) {
    if (returnFocus && personalPanelTrigger) {
      setPersonalPanelState(false, personalPanelTrigger);
    } else {
      setPersonalPanelState(false, null);
    }
    personalPanelTrigger = null;
  }

  function initializePersonalPanel() {
    const panel = document.getElementById('personal-panel');
    const toggles = Array.from(document.querySelectorAll('.personal-panel-toggle'));

    if (!panel || !toggles.length) {
      return;
    }

    toggles.forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        const isOpen = panel.classList.contains('is-open') && !panel.hidden;

        if (isOpen) {
          closePersonalPanel(true);
          return;
        }

        personalPanelTrigger = toggle;
        setPersonalPanelState(true, null);
      });
    });

    const closeButton = panel.querySelector('.personal-panel-close');
    if (closeButton) {
      closeButton.addEventListener('click', function () {
        closePersonalPanel(true);
      });
    }

    document.addEventListener('click', function (event) {
      const isOpen = panel.classList.contains('is-open') && !panel.hidden;

      if (!isOpen || panel.contains(event.target) || toggles.some(function (toggle) {
        return toggle.contains(event.target);
      })) {
        return;
      }

      closePersonalPanel(false);
    });

    document.addEventListener('keydown', function (event) {
      const isOpen = panel.classList.contains('is-open') && !panel.hidden;

      if (event.key === 'Escape' && isOpen) {
        event.preventDefault();
        closePersonalPanel(true);
      }
    });
  }

  function initializeTopicIndexToggles() {
    document.querySelectorAll('[data-topic-index]').forEach(function (index) {
      const items = Array.from(index.children).filter(function (child) {
        return child.tagName === 'LI';
      });
      const toggle = index.parentElement
        ? index.parentElement.querySelector('[data-topic-index-toggle]')
        : null;

      if (!items.length) {
        if (toggle) {
          toggle.hidden = true;
        }
        return;
      }

      items.sort(function (first, second) {
        const firstCount = Number.parseInt(first.dataset.tagCount, 10) || 0;
        const secondCount = Number.parseInt(second.dataset.tagCount, 10) || 0;
        const countDifference = secondCount - firstCount;

        if (countDifference !== 0) {
          return countDifference;
        }

        return first.textContent.trim().localeCompare(second.textContent.trim(), undefined, {
          numeric: true,
          sensitivity: 'base'
        });
      });

      items.forEach(function (item, itemIndex) {
        index.appendChild(item);
        item.classList.toggle('is-priority', itemIndex < 5);
      });

      function renderTopicIndex(isExpanded) {
        items.forEach(function (item, itemIndex) {
          item.hidden = !isExpanded && itemIndex >= 10;
          item.classList.remove('is-last-visible');
        });

        const visibleItems = items.filter(function (item) {
          return !item.hidden;
        });

        if (visibleItems.length) {
          visibleItems[visibleItems.length - 1].classList.add('is-last-visible');
        }

        if (toggle) {
          toggle.setAttribute('aria-expanded', String(isExpanded));
          updateTopicIndexToggleLabel(toggle, isExpanded);
        }
      }

      if (!toggle || items.length <= 10) {
        if (toggle) {
          toggle.hidden = true;
        }
        renderTopicIndex(true);
        return;
      }

      toggle.hidden = false;
      toggle.addEventListener('click', function () {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        renderTopicIndex(!isExpanded);
      });
      renderTopicIndex(false);
    });
  }

  function updateTopicIndexToggleLabel(toggle, isExpanded) {
    const activeState = isExpanded ? 'expanded' : 'collapsed';

    toggle.querySelectorAll('[data-topic-index-state]').forEach(function (label) {
      label.hidden = label.dataset.topicIndexState !== activeState;
    });
  }

  function initializePostToc() {
    document.querySelectorAll('[data-post-toc]').forEach(function (toc) {
      const page = toc.closest('.post-page');
      const article = page && page.querySelector('.post-shell');
      const content = article && article.querySelector('.post-content');
      const list = toc.querySelector('.post-toc-list');

      if (!content || !list) {
        return;
      }

      const headings = Array.from(content.querySelectorAll('h2, h3'));

      if (!headings.length) {
        return;
      }

      const usedIds = new Set();

      headings.forEach(function (heading, headingIndex) {
        const baseId = heading.id || createHeadingId(heading.textContent, headingIndex);
        let headingId = baseId;
        let suffix = 2;

        while (
          usedIds.has(headingId) ||
          (document.getElementById(headingId) && document.getElementById(headingId) !== heading)
        ) {
          headingId = baseId + '-' + suffix;
          suffix += 1;
        }

        heading.id = headingId;
        usedIds.add(headingId);

        const item = document.createElement('li');
        item.className = 'post-toc-item post-toc-item-' + heading.tagName.toLowerCase();

        const link = document.createElement('a');
        link.href = '#' + headingId;
        link.textContent = heading.textContent.trim();

        item.appendChild(link);
        list.appendChild(item);
      });

      const links = Array.from(list.querySelectorAll('a'));
      const setActiveHeading = function (headingId) {
        links.forEach(function (link) {
          const isActive = link.getAttribute('href') === '#' + headingId;
          link.classList.toggle('is-active', isActive);

          if (isActive) {
            link.setAttribute('aria-current', 'location');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      };

      setActiveHeading(headings[0].id);

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
          const visibleHeadings = entries
            .filter(function (entry) {
              return entry.isIntersecting;
            })
            .sort(function (first, second) {
              return first.boundingClientRect.top - second.boundingClientRect.top;
            });

          if (visibleHeadings.length) {
            setActiveHeading(visibleHeadings[0].target.id);
          }
        }, {
          rootMargin: '-12% 0px -70% 0px',
          threshold: [0, 1]
        });

        headings.forEach(function (heading) {
          observer.observe(heading);
        });
      }

      toc.hidden = false;
    });
  }

  function createHeadingId(text, index) {
    const normalized = (text || '')
      .toLowerCase()
      .trim()
      .replace(/[^\w\s\u00a0-\uffff-]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 80);

    return normalized || 'section-' + (index + 1);
  }

  function initializeMottoRotator() {
    const rotators = Array.from(document.querySelectorAll('.profile-motto-rotator'));
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    rotators.forEach(function (rotator) {
      const text = rotator.querySelector('.profile-motto-text');

      if (!text) {
        return;
      }

      mottoStates.push({
        rotator: rotator,
        text: text,
        reduceMotion: reduceMotion,
        phrases: [],
        phraseIndex: 0,
        characterIndex: 0,
        deleting: false,
        timer: null
      });
    });
  }

  function updateMottoRotators(lang) {
    mottoStates.forEach(function (state) {
      if (state.timer) {
        window.clearTimeout(state.timer);
      }

      const phraseDataKey = lang === 'en' ? 'phrasesEn' : 'phrasesZh';
      const phraseData = state.rotator.dataset[phraseDataKey] || state.rotator.dataset.phrases || '';
      const phrases = phraseData.split('|').filter(Boolean);

      if (!phrases.length) {
        state.text.textContent = '';
        state.phrases = [];
        return;
      }

      state.phrases = phrases;
      state.phraseIndex = 0;
      state.characterIndex = 0;
      state.deleting = false;

      if (state.reduceMotion) {
        state.text.textContent = phrases[0];
        return;
      }

      typeNextMottoCharacter(state);
    });
  }

  function typeNextMottoCharacter(state) {
    const phrase = state.phrases[state.phraseIndex];

    if (!state.deleting) {
      state.characterIndex += 1;
      state.text.textContent = phrase.slice(0, state.characterIndex);

      if (state.characterIndex === phrase.length) {
        state.deleting = true;
        state.timer = window.setTimeout(function () {
          typeNextMottoCharacter(state);
        }, 1800);
        return;
      }

      state.timer = window.setTimeout(function () {
        typeNextMottoCharacter(state);
      }, 105);
      return;
    }

    state.characterIndex -= 1;
    state.text.textContent = phrase.slice(0, state.characterIndex);

    if (state.characterIndex === 0) {
      state.deleting = false;
      state.phraseIndex = (state.phraseIndex + 1) % state.phrases.length;
      state.timer = window.setTimeout(function () {
        typeNextMottoCharacter(state);
      }, 380);
      return;
    }

    state.timer = window.setTimeout(function () {
      typeNextMottoCharacter(state);
    }, 65);
  }

  // Get current language
  window.getCurrentLanguage = function () {
    return getStoredLanguage();
  };

})();
