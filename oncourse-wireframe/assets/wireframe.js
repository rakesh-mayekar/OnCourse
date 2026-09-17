/**
 * OnCourse Global — UX Wireframe Interactive Controller
 * Vanilla JS behaviors for Sticky CTA, Segment-aware Form, Contextual Popups,
 * FAQ Accordion, and Carousel Sliders.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initStickyCTA();
  initSegmentPopup();
  initLeadFormSwitcher();
  initFAQAccordion();
  initCarouselSlider();
});

// 1. Mobile Menu Toggle
function initMobileMenu() {
  const toggleButtons = [
    document.getElementById('mobile-menu-toggle'),
    document.getElementById('mobile-menu-toggle-sm'),
    document.getElementById('mobile-menu-toggle-lg')
  ].filter(Boolean);

  const mobileNav = document.getElementById('mobile-nav-drawer');
  if (!mobileNav) return;

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !isExpanded);
      mobileNav.classList.toggle('hidden');
    });
  });

  // Close drawer if clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileNav.classList.contains('hidden') && !mobileNav.contains(e.target) && !toggleButtons.some(b => b.contains(e.target))) {
      mobileNav.classList.add('hidden');
      toggleButtons.forEach(b => b.setAttribute('aria-expanded', 'false'));
    }
  });
}

// 2. Sticky CTA
function initStickyCTA() {
  const stickyBar = document.getElementById('sticky-cta-bar');
  const dismissBtn = document.getElementById('sticky-cta-dismiss');
  if (!stickyBar) return;

  // Check if dismissed in this session
  if (sessionStorage.getItem('oncourse_sticky_dismissed') === 'true') {
    stickyBar.classList.add('hidden');
    return;
  }

  window.addEventListener('scroll', () => {
    if (sessionStorage.getItem('oncourse_sticky_dismissed') === 'true') return;

    if (window.scrollY > 280) {
      stickyBar.classList.remove('translate-y-full', 'opacity-0', 'pointer-events-none');
      stickyBar.classList.add('translate-y-0', 'opacity-100');
    } else {
      stickyBar.classList.add('translate-y-full', 'opacity-0', 'pointer-events-none');
      stickyBar.classList.remove('translate-y-0', 'opacity-100');
    }
  }, { passive: true });

  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      stickyBar.classList.add('translate-y-full', 'opacity-0', 'pointer-events-none');
      sessionStorage.setItem('oncourse_sticky_dismissed', 'true');
    });
  }
}

// 3. Segment Contextual Pop-up
function initSegmentPopup() {
  const popup = document.getElementById('segment-popup');
  if (!popup) return;

  const pageSegment = popup.getAttribute('data-segment') || 'undergraduate';
  const dismissKey = `oncourse_popup_dismissed_${pageSegment}`;

  // Toggle active variant content
  const ugContent = popup.querySelector('.popup-content-ug');
  const mbaContent = popup.querySelector('.popup-content-mba');
  const genContent = popup.querySelector('.popup-content-gen');
  const ugBadge = popup.querySelector('.popup-badge-ug');
  const mbaBadge = popup.querySelector('.popup-badge-mba');
  const genBadge = popup.querySelector('.popup-badge-gen');

  if (pageSegment === 'mba' || pageSegment === 'masters') {
    if (ugContent) ugContent.classList.add('hidden');
    if (mbaContent) mbaContent.classList.remove('hidden');
    if (genContent) genContent.classList.add('hidden');
    if (ugBadge) ugBadge.classList.add('hidden');
    if (mbaBadge) mbaBadge.classList.remove('hidden');
    if (genBadge) genBadge.classList.add('hidden');
  } else if (pageSegment === 'undergraduate') {
    if (ugContent) ugContent.classList.remove('hidden');
    if (mbaContent) mbaContent.classList.add('hidden');
    if (genContent) genContent.classList.add('hidden');
    if (ugBadge) ugBadge.classList.remove('hidden');
    if (mbaBadge) mbaBadge.classList.add('hidden');
    if (genBadge) genBadge.classList.add('hidden');
  } else {
    if (ugContent) ugContent.classList.add('hidden');
    if (mbaContent) mbaContent.classList.add('hidden');
    if (genContent) genContent.classList.remove('hidden');
    if (ugBadge) ugBadge.classList.add('hidden');
    if (mbaBadge) mbaBadge.classList.add('hidden');
    if (genBadge) genBadge.classList.remove('hidden');
  }

  if (sessionStorage.getItem(dismissKey) === 'true') {
    return;
  }

  const closeBtn = document.getElementById('segment-popup-close');
  let triggered = false;

  const showPopup = () => {
    if (triggered || sessionStorage.getItem(dismissKey) === 'true') return;
    triggered = true;
    popup.classList.remove('translate-y-12', 'opacity-0', 'pointer-events-none');
    popup.classList.add('translate-y-0', 'opacity-100');
  };

  // Trigger on scroll depth > 35% or fallback timer (4.5s)
  window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercent > 35) {
      showPopup();
    }
  }, { passive: true });

  setTimeout(showPopup, 4500);

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      popup.classList.add('translate-y-12', 'opacity-0', 'pointer-events-none');
      popup.classList.remove('translate-y-0', 'opacity-100');
      sessionStorage.setItem(dismissKey, 'true');
    });
  }
}

// 4. Lead Form Segment Field Switcher
function initLeadFormSwitcher() {
  const segmentSelect = document.getElementById('form-segment-selector');
  const ugFields = document.getElementById('segment-fields-undergraduate');
  const pgFields = document.getElementById('segment-fields-pg-mba');
  const testPrepFields = document.getElementById('segment-fields-testprep');
  const formElement = document.getElementById('oncourse-lead-form');
  const successMessage = document.getElementById('form-success-message');

  const updateFields = (val) => {
    if (ugFields) ugFields.classList.toggle('hidden', val !== 'undergraduate');
    if (pgFields) pgFields.classList.toggle('hidden', val !== 'mba' && val !== 'masters');
    if (testPrepFields) testPrepFields.classList.toggle('hidden', val !== 'test-prep');
  };

  if (segmentSelect) {
    segmentSelect.addEventListener('change', (e) => {
      updateFields(e.target.value);
    });
    // Set initial
    updateFields(segmentSelect.value);
  }

  if (formElement) {
    formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      if (successMessage) {
        formElement.classList.add('hidden');
        successMessage.classList.remove('hidden');
      }
    });
  }
}

// 5. FAQ Accordion Toggle
function initFAQAccordion() {
  const accordionButtons = document.querySelectorAll('.faq-accordion-btn');
  accordionButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const panel = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      btn.setAttribute('aria-expanded', !isExpanded);
      if (panel) {
        panel.classList.toggle('hidden');
      }
      if (icon) {
        icon.classList.toggle('rotate-180');
      }
    });
  });
}

// 6. Success Stories Carousel
function initCarouselSlider() {
  const slider = document.getElementById('success-stories-slider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.carousel-slide');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dots = document.querySelectorAll('.carousel-dot');
  let currentIndex = 0;

  const updateSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('hidden', i !== index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('bg-blue-600', i === index);
      dot.classList.toggle('bg-gray-300', i !== index);
    });
    currentIndex = index;
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const newIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlide(newIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const newIndex = (currentIndex + 1) % slides.length;
      updateSlide(newIndex);
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => updateSlide(i));
  });

  updateSlide(0);
}
