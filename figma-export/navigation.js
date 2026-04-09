// Navigation mapping and utilities
const navigationMap = {
  // Main navigation links
  'feed': 'logged-in-feed-page.html',
  'events': 'logged-in-events.html',
  'teams': 'teams-clubs-search-page.html',
  'search': 'search-page.html',
  'players': 'searching-for-user-1.html',
  
  // Authentication flows
  'login': 'login-screen.html',
  'signup': 'account-creation-page.html',
  'forgot-password': 'forgot-password-username.html',
  'password-reset': 'password-reset-verification.html',
  'account-verification': 'account-verification-page.html',
  'username-confirmation': 'username-confirmation.html',
  
  // Event pages
  'browse-events': 'browse-events.html',
  'event-creation': 'event-creation-page.html',
  'active-event': 'active-event-page.html',
  'view-event': 'searching-for-event-6.html',
  
  // User flows
  'welcome': 'welcome-page.html',
  'welcome-back': 'welcome-back-page.html',
  'homepage': 'homepage-landing-page.html',
  
  // Messaging
  'messages': 'message-inbox-page.html',
  'create-message': 'create-new-message-page.html',
  
  // Other pages
  'create-post': 'create-a-post.html',
  'faq': 'faq-support.html'
};

// Navigate to a page by key or direct filename
function navigateTo(destination) {
  const fileName = navigationMap[destination] || destination;
  window.location.href = fileName;
}

// Handle anchor-based navigation
function handleNavClick(element, destination) {
  element.addEventListener('click', function(e) {
    e.preventDefault();
    navigateTo(destination);
  });
}

// Get current page name
function getCurrentPage() {
  return window.location.pathname.split('/').pop() || 'index.html';
}

// Highlight active nav item
function highlightActiveNav() {
  const currentPage = getCurrentPage();
  const navItems = document.querySelectorAll('[data-nav-item]');
  
  navItems.forEach(item => {
    const target = item.getAttribute('data-nav-item');
    const targetFile = navigationMap[target] || target;
    
    if (currentPage.includes(targetFile.split('.')[0])) {
      item.classList.add('active');
    }
  });
}

// Make elements clickable by adding event listeners
function makeClickable(selector, destination) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
    element.style.cursor = 'pointer';
    element.addEventListener('click', function(e) {
      e.preventDefault();
      navigateTo(destination);
    });
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  highlightActiveNav();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { navigateTo, navigationMap, makeClickable, highlightActiveNav };
}
