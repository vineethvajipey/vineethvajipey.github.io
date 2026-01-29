/**
 * Main application entry point
 */
import { OrbitWheel } from './OrbitWheel.js';
import { ScrollHandler } from './ScrollHandler.js';
import { DharmaWheel } from './DharmaWheel.js';
import { ImageOptimization } from './ImageOptimization.js';
import { ProjectGrid } from './ProjectGrid.js';

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize orbit wheels
  const orbit1Element = document.getElementById("orbit1");
  const orbit2Element = document.getElementById("orbit2");
  
  if (orbit1Element) {
    const orbit1 = new OrbitWheel(orbit1Element, {
      startAngle: 0,
    });
    // Make globally accessible for dharma wheel interaction
    window.orbit1 = orbit1;
  }
  
  if (orbit2Element) {
    const orbit2 = new OrbitWheel(orbit2Element, {
      startAngle: Math.PI / 8,
    });
  }

  // Initialize scroll handler
  const scrollHandler = new ScrollHandler();
  window.scrollHandler = scrollHandler;

  // Initialize dharma wheel
  const dharmaWheel = new DharmaWheel();

  // Initialize image optimization
  const imageOptimization = new ImageOptimization();

  // Initialize project grid
  const projectGrid = new ProjectGrid();
});