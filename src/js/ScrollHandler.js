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
    const pageIndicatorDot = document.getElementById("pageIndicatorDot");
    const pageIndicator = document.getElementById("pageIndicator");

    // Calculate dot positions dynamically from the actual DOM elements
    const dotElements = document.querySelectorAll('#pageIndicator [data-section]');
    const dotPositions = Array.from(dotElements).map(el => el.offsetTop);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const sections = document.querySelectorAll(".bg-section");
            this.currentSection = Array.from(sections).indexOf(entry.target);

            // Update indicator dot position (vertical)
            if (pageIndicatorDot && dotPositions[this.currentSection] !== undefined) {
              pageIndicatorDot.style.top = `${dotPositions[this.currentSection]}px`;
            }
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
    const heroRight = document.getElementById("heroRight");
    const heroContent = document.getElementById("heroContent");
    const socialLinksContainer = heroRight?.querySelector('.pointer-events-auto');
    if (!heroInner || !heroRight) return;

    const MIN_SCALE = 0.2;
    const FINAL_TOP_PERCENT = 12;
    const viewportHeight = window.innerHeight;

    // Two-stage animation distances (with overlap for smooth transition)
    const STAGE1_DISTANCE = viewportHeight * 0.25;  // First 25vh: shift title/links down + fade links
    const STAGE2_START = viewportHeight * 0.15;     // Stage 2 starts at 15vh (more overlap)
    const STAGE2_DISTANCE = viewportHeight * 0.7;   // 70vh for shrink and move up

    // Stage 1 settings
    const SHIFT_DOWN_AMOUNT = 80; // pixels to shift title/links down in stage 1

    // Opacity settings - reduce opacity when hero overlaps with content sections
    const MIN_OPACITY = 0.35;  // Don't fade below this

    let ticking = false;

    function updateOnScroll() {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Stage 1: Shift title/links down and fade links (0 to STAGE1_DISTANCE)
      const stage1Progress = Math.min(scrollY / STAGE1_DISTANCE, 1);

      // Stage 2: Shrink and move up entire hero (starts early for smooth transition)
      const stage2Scroll = Math.max(0, scrollY - STAGE2_START);
      const stage2Progress = Math.min(stage2Scroll / STAGE2_DISTANCE, 1);

      // Use smoother easing
      const easeOutQuad = (t) => 1 - (1 - t) * (1 - t);
      const easedStage1 = easeOutQuad(stage1Progress);
      const easedStage2 = easeOutQuad(stage2Progress);

      // Stage 1: Shift only the title and links down
      const shiftDown = SHIFT_DOWN_AMOUNT * easedStage1;
      heroRight.style.transform = `translateY(${shiftDown}px)`;

      // Fade out social links during stage 1
      if (socialLinksContainer) {
        socialLinksContainer.style.opacity = 1 - easedStage1;
      }

      // Stage 2: Scale and move up the entire hero
      const scale = 1 - easedStage2 * (1 - MIN_SCALE);
      const startPercent = 50;
      const moveUpAmount = ((startPercent - FINAL_TOP_PERCENT) * viewportHeight) / 100;
      const moveUp = moveUpAmount * easedStage2;

      heroInner.style.transform = `translateY(${-moveUp}px) scale(${scale})`;

      // Reduce hero opacity when overlapping with content elements
      if (heroContent) {
        const heroRect = heroInner.getBoundingClientRect();

        // Check if we're past the bio section (projects and beyond) - fade out
        const projectsSection = document.getElementById('projectsSection');
        let pastBioSection = false;
        if (projectsSection) {
          const projectsRect = projectsSection.getBoundingClientRect();
          pastBioSection = projectsRect.top < viewportHeight * 0.5;
        }

        // Check if we're on the last section (sisters) - fade back in
        const sistersSection = document.getElementById('sistersSection');
        let onLastSection = false;
        if (sistersSection) {
          const sistersRect = sistersSection.getBoundingClientRect();
          onLastSection = sistersRect.top < viewportHeight * 0.5 && sistersRect.bottom > 0;
        }

        // Check for overlap with bio content
        const bioContent = document.querySelector('#bioSection .max-w-3xl');
        let isOverlappingBio = false;
        if (bioContent) {
          const bioRect = bioContent.getBoundingClientRect();
          if (heroRect.right > bioRect.left &&
              heroRect.left < bioRect.right &&
              heroRect.bottom > bioRect.top &&
              heroRect.top < bioRect.bottom) {
            isOverlappingBio = true;
          }
        }

        // Determine target opacity
        let targetOpacity = 1;
        if (onLastSection) {
          targetOpacity = 1; // Fade back in on last section
        } else if (pastBioSection) {
          targetOpacity = 0; // Stay faded from projects until sisters
        } else if (isOverlappingBio) {
          targetOpacity = MIN_OPACITY;
        }

        // Smoothly transition opacity
        const currentOpacity = parseFloat(heroContent.style.opacity) || 1;
        const newOpacity = currentOpacity + (targetOpacity - currentOpacity) * 0.15;
        heroContent.style.opacity = newOpacity;
      }

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
