(function() {
  const banner = document.getElementById('cookie-banner');
  const modal = document.getElementById('cookie-modal');
  const acceptBtn = document.getElementById('cookie-accept');
  const rejectBtn = document.getElementById('cookie-reject');
  const customizeBtn = document.getElementById('cookie-customize');
  const saveBtn = document.getElementById('cookie-save');
  const settingsLink = document.getElementById('cookie-settings-link');

  const analyticsCheck = document.getElementById('consent-analytics');
  const marketingCheck = document.getElementById('consent-marketing');

  const storageKey = 'cookie-consent';

  function applyConsent(consent) {
    if (window.gtag) {
      gtag('consent', 'update', {
        ad_storage: consent.marketing ? 'granted' : 'denied',
        analytics_storage: consent.analytics ? 'granted' : 'denied',
        ad_user_data: consent.marketing ? 'granted' : 'denied',
        ad_personalization: consent.marketing ? 'granted' : 'denied'
      });
    }
  }

  function saveConsent(consent) {
    localStorage.setItem(storageKey, JSON.stringify(consent));
    applyConsent(consent);
  }

  function loadConsent() {
    const stored = localStorage.getItem(storageKey);
    if (stored) return JSON.parse(stored);
    return null;
  }

  function showBanner() { banner.classList.remove('d-none'); }
  function hideBanner() { banner.classList.add('d-none'); }
  function showModal() { modal.classList.remove('d-none'); }
  function hideModal() { modal.classList.add('d-none'); }

  acceptBtn.addEventListener('click', function() {
    const consent = {analytics: true, marketing: true};
    saveConsent(consent);
    hideBanner();
  });

  rejectBtn.addEventListener('click', function() {
    const consent = {analytics: false, marketing: false};
    saveConsent(consent);
    hideBanner();
  });

  customizeBtn.addEventListener('click', function() {
    hideBanner();
    showModal();
  });

  saveBtn.addEventListener('click', function() {
    const consent = {
      analytics: analyticsCheck.checked,
      marketing: marketingCheck.checked
    };
    saveConsent(consent);
    hideModal();
  });

  settingsLink.addEventListener('click', function(e) {
    e.preventDefault();
    const consent = loadConsent();
    analyticsCheck.checked = consent ? consent.analytics : false;
    marketingCheck.checked = consent ? consent.marketing : false;
    showModal();
  });

  document.addEventListener('DOMContentLoaded', function() {
    const consent = loadConsent();
    if (consent) {
      applyConsent(consent);
    } else {
      showBanner();
      if (window.gtag) {
        gtag('consent', 'default', {
          ad_storage: 'denied',
          analytics_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied'
        });
      }
    }
  });
})();
