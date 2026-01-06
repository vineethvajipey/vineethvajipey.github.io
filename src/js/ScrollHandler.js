/**
 * ScrollHandler - Manages scroll-based navigation and hero transformations
 */
export class ScrollHandler {
  constructor() {
    this.currentSection = 0;
    this.isAnimating = false;
    this.setupSectionObserver();
    this.setupHeroTransformation();
  }

  smoothScrollTo(targetY, duration) {
    const startY = window.pageYOffset;
    const difference = targetY - startY;
    const startTime = performance.now();

    function easeInOutSine(t) {
      return -(Math.cos(Math.PI * t) - 1) / 2;
    }

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutSine(progress);

      const newY = startY + difference * easedProgress;
      window.scrollTo(0, newY);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  spinAndScroll() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const sections = document.querySelectorAll(".bg-section");
    this.currentSection = (this.currentSection + 1) % sections.length;

    // Trigger dharma wheel spin
    if (window.triggerDharmaWheelSpin) {
      window.triggerDharmaWheelSpin();
    }

    // Trigger orbit wheel spin
    if (window.orbit1) {
      window.orbit1.triggerSpin(800);
    }

    const targetY = sections[this.currentSection].offsetTop;
    this.smoothScrollTo(targetY, 800);

    setTimeout(() => {
      this.isAnimating = false;
    }, 850);
  }

  setupSectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const sections = document.querySelectorAll(".bg-section");
            this.currentSection = Array.from(sections).indexOf(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    document
      .querySelectorAll(".bg-section")
      .forEach((section) => observer.observe(section));
  }

  setupHeroTransformation() {
    const heroInner = document.getElementById("heroInner");
    if (!heroInner) return;

    const MIN_SCALE = 0.2;
    const FINAL_TOP_PERCENT = 8;
    const TRANSITION_DISTANCE = window.innerHeight * 0.85;

    let ticking = false;

    function updateOnScroll() {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      const progress = Math.min(scrollY / TRANSITION_DISTANCE, 1);

      const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
      const easedProgress = easeOutExpo(progress);

      const scale = 1 - easedProgress * (1 - MIN_SCALE);

      const startPercent = 50;
      const currentPercent =
        startPercent - (startPercent - FINAL_TOP_PERCENT) * easedProgress;
      const translateY =
        ((currentPercent - startPercent) * viewportHeight) / 100;

      heroInner.style.transform = `translateY(${translateY}px) scale(${scale})`;

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateOnScroll);

    updateOnScroll();
  }
}