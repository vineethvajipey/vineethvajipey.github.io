/**
 * DharmaWheel - Manages dharma wheel rotation and interaction
 */
export class DharmaWheel {
  constructor() {
    this.totalRotation = 0;
    this.lastScrollY = window.scrollY;
    this.spinVelocity = 0;
    this.ticking = false;
    
    this.setupScrollRotation();
    this.setupDragInteraction();
  }

  updateWheelRotation() {
    const dharmaWheel = document.getElementById("dharmaWheel");
    if (!dharmaWheel) return;

    const scrollY = window.scrollY;
    const scrollDelta = scrollY - this.lastScrollY;
    this.lastScrollY = scrollY;

    // Add rotation based on scroll
    this.totalRotation += scrollDelta * 0.33;

    // Also spin the orbit wheel
    if (window.orbit1) {
      window.orbit1.addScrollRotation(scrollDelta);
    }

    // Add spin velocity from click
    if (this.spinVelocity > 0) {
      this.totalRotation += this.spinVelocity;
      this.spinVelocity *= 0.92;
      if (this.spinVelocity < 0.5) this.spinVelocity = 0;
    }

    dharmaWheel.style.transform = `rotate(${this.totalRotation}deg)`;

    // Keep animating if there's spin velocity
    if (this.spinVelocity > 0) {
      requestAnimationFrame(() => this.updateWheelRotation());
    }

    this.ticking = false;
  }

  triggerSpin() {
    this.spinVelocity = 25;
    if (!this.ticking) {
      requestAnimationFrame(() => this.updateWheelRotation());
      this.ticking = true;
    }
  }

  setupScrollRotation() {
    window.addEventListener(
      "scroll",
      () => {
        if (!this.ticking) {
          requestAnimationFrame(() => this.updateWheelRotation());
          this.ticking = true;
        }
      },
      { passive: true }
    );

    // Expose global function for backwards compatibility
    window.triggerDharmaWheelSpin = () => this.triggerSpin();
  }

  setupDragInteraction() {
    // Wait for Interact.js to be available, then set up the interaction
    if (typeof interact === 'undefined') {
      setTimeout(() => this.setupDragInteraction(), 100);
      return;
    }

    let hasDragged = false;

    interact("#dharmaWheelContainer")
      .draggable({
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: "body",
            endOnly: true,
          }),
        ],
        listeners: {
          start() {
            hasDragged = false;
          },
          move(event) {
            const target = event.target;
            const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
            const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

            if (Math.abs(event.dx) > 2 || Math.abs(event.dy) > 2)
              hasDragged = true;

            target.style.transform = `translate(${x}px, ${y}px)`;
            target.setAttribute("data-x", x);
            target.setAttribute("data-y", y);
          },
        },
      })
      .on("tap", () => {
        if (!hasDragged && window.scrollHandler) {
          window.scrollHandler.spinAndScroll();
        }
        hasDragged = false;
      });
  }
}