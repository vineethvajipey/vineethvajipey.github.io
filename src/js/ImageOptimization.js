/**
 * ImageOptimization - Handles lazy loading and image optimization
 */
export class ImageOptimization {
  constructor() {
    this.setupLazyLoading();
    this.preloadCriticalImages();
  }

  setupLazyLoading() {
    // Create intersection observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  preloadCriticalImages() {
    const criticalImages = [
      'images/skele-bod.gif',
      'images/vineeth-name.png',
      'images/skele-head.gif',
      'images/backgrounds/hill.jpg'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  // Convert background images to use lazy loading
  setupBackgroundLazyLoading() {
    const bgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const bgImage = element.dataset.bgSrc;
          if (bgImage) {
            element.style.backgroundImage = `url('${bgImage}')`;
            element.removeAttribute('data-bg-src');
            observer.unobserve(element);
          }
        }
      });
    });

    document.querySelectorAll('[data-bg-src]').forEach(el => {
      bgObserver.observe(el);
    });
  }
}