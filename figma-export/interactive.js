// Interactive navigation handler for all pages
(function() {
  'use strict';

  // Navigation mapping for all pages
  const pageMap = {
    'welcome-page': 'logged-in-feed-page',
    'welcome-back-page': 'logged-in-feed-page',
    'homepage-landing-page': 'browse-events',
    'login-screen': 'logged-in-feed-page',
    'account-creation-page': 'account-verification-page',
    'browse-events': 'active-event-page',
    'logged-in-feed-page': 'logged-in-events',
    'logged-in-events': 'browse-events',
    'teams-clubs-search-page': 'view-specific-team',
    'search-page': 'searching-for-user-1',
    'create-a-post': 'logged-in-feed-page',
    'message-inbox-page': 'create-new-message-page',
    'forgot-password-username': 'password-reset-verification',
    'event-creation-page': 'active-event-page'
  };

  // Mapping for specific link text to pages
  const linkTextMap = {
    'to visit your Feed': 'logged-in-feed-page.html',
    'to look at Events': 'logged-in-events.html',
    'to look at potential Teams': 'teams-clubs-search-page.html',
    'to return to the page': 'browse-events.html',
    'Click here': 'forgot-password-username.html',
    'Click Here to Resend': 'account-verification-page.html',
    'click to register': 'active-event-page.html',
    'Browse Events': 'browse-events.html',
    'ENTER': 'logged-in-feed-page.html',
    'Click Here': function() {
      return getContextualNavigation();
    }
  };

  // Get contextual navigation based on page content
  function getContextualNavigation() {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('welcome')) return 'logged-in-feed-page.html';
    if (currentPage.includes('login')) return 'account-creation-page.html';
    if (currentPage.includes('forgot')) return 'password-reset-verification.html';
    if (currentPage.includes('account-creation')) return 'account-verification-page.html';
    
    return 'browse-events.html';
  }

  // Navigate to a page
  function navigateTo(page) {
    if (!page) return;
    
    const fileName = page.endsWith('.html') ? page : page + '.html';
    window.location.href = fileName;
  }

  // Convert text spans to clickable links
  function makeTextClickable() {
    const allSpans = document.querySelectorAll('span, p, div');
    
    allSpans.forEach(element => {
      const text = element.innerText || element.textContent;
      
      if (!text) return;
      
      // Check for "Click Here" patterns
      if (text.includes('Click Here') || text.includes('Click here')) {
        const parent = element.closest('p') || element.parentElement;
        
        if (parent && !parent.classList.contains('clickable-link')) {
          parent.classList.add('clickable-link');
          parent.style.cursor = 'pointer';
          parent.style.textDecoration = 'underline';
          
          parent.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Determine navigation based on parent text
            const parentText = parent.textContent;
            
            if (parentText.includes('Feed')) {
              navigateTo('logged-in-feed-page');
            } else if (parentText.includes('Events')) {
              navigateTo('logged-in-events');
            } else if (parentText.includes('Teams')) {
              navigateTo('teams-clubs-search-page');
            } else if (parentText.includes('Search')) {
              navigateTo('search-page');
            } else if (parentText.includes('Players')) {
              navigateTo('searching-for-user-1');
            } else if (parentText.includes('return')) {
              navigateTo('browse-events');
            } else if (parentText.includes('Resend')) {
              navigateTo('account-verification-page');
            } else if (parentText.includes('register')) {
              navigateTo('searching-for-event-6');
            } else {
              navigateTo('logged-in-feed-page');
            }
          });
        }
      }
    });
  }

  // Make buttons clickable
  function makeButtonsClickable() {
    // Register buttons / Submit buttons
    const buttons = document.querySelectorAll('[class*="register-button"], [class*="button"]');
    
    buttons.forEach(button => {
      const buttonText = (button.innerText || button.textContent || '').trim().toUpperCase();
      
      if (buttonText === 'ENTER' || buttonText === 'LOGIN' || buttonText === 'SUBMIT' || buttonText === 'CONTINUE') {
        button.style.cursor = 'pointer';
        button.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          navigateTo('logged-in-feed-page');
        });
      } else if (buttonText === 'REGISTER' || buttonText === 'SIGN UP') {
        button.style.cursor = 'pointer';
        button.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          navigateTo('account-verification-page');
        });
      } else if (buttonText.includes('CANCEL')) {
        button.style.cursor = 'pointer';
        button.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          navigateTo('browse-events');
        });
      }
    });
  }

  // Make navigation text clickable
  function makeNavClickable() {
    const feedTexts = document.querySelectorAll('p');
    
    feedTexts.forEach(p => {
      const text = p.textContent;
      
      if (text === 'Feed') {
        p.style.cursor = 'pointer';
        p.addEventListener('click', () => navigateTo('logged-in-feed-page'));
      } else if (text === 'Events') {
        p.style.cursor = 'pointer';
        p.addEventListener('click', () => navigateTo('logged-in-events'));
      } else if (text === 'Teams & Clubs') {
        p.style.cursor = 'pointer';
        p.addEventListener('click', () => navigateTo('teams-clubs-search-page'));
      } else if (text === 'Search') {
        p.style.cursor = 'pointer';
        p.addEventListener('click', () => navigateTo('search-page'));
      } else if (text === 'Players') {
        p.style.cursor = 'pointer';
        p.addEventListener('click', () => navigateTo('searching-for-user-1'));
      }
    });
  }

  // Initialize on page load
  function init() {
    makeTextClickable();
    makeButtonsClickable();
    makeNavClickable();
    
    // Add visual feedback for clickable elements
    addClickableStyles();
  }

  // Add styles for clickable elements
  function addClickableStyles() {
    if (!document.getElementById('interactive-styles')) {
      const style = document.createElement('style');
      style.id = 'interactive-styles';
      style.textContent = `
        .clickable-link {
          cursor: pointer !important;
          transition: color 0.2s ease;
        }
        
        .clickable-link:hover {
          opacity: 0.7;
          text-decoration: underline !important;
        }
        
        [class*="register-button"] {
          cursor: pointer !important;
          transition: opacity 0.2s ease;
        }
        
        [class*="register-button"]:hover {
          opacity: 0.8;
        }
        
        p {
          transition: color 0.2s ease;
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
