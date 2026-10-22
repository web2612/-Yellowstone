/**
 * Greater Yellowstone Conservation Platform
 * Interactive UI/UX Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.innerHTML = isOpen ? '✕' : '☰';
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.innerHTML = '☰';
      }
    });
  }

  // 2. Sticky Header Elevation
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  // 3. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close other items
        faqItems.forEach((other) => {
          if (other !== item) other.classList.remove('active');
        });

        // Toggle clicked item
        item.classList.toggle('active', !isActive);
      });
    }
  });

  // 4. Newsletter Form Handling with Toast
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      if (input && input.value.trim() !== '') {
        const email = input.value.trim();
        showToast(`Thank you! ${email} has been subscribed to wildlife alerts.`);
        input.value = '';
      }
    });
  });

  // 5. Toast Notification Helper
  function showToast(message) {
    const existing = document.querySelector('.eco-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'eco-toast';
    toast.innerText = message;
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      backgroundColor: '#153724',
      color: '#ffffff',
      padding: '14px 24px',
      borderRadius: '8px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
      zIndex: '9999',
      fontSize: '0.95rem',
      fontWeight: '600',
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      opacity: '0',
      transform: 'translateY(15px)',
      borderLeft: '4px solid #d97706'
    });

    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    }, 50);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      setTimeout(() => toast.remove(), 350);
    }, 4000);
  }
});
