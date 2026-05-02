/**
 * ProjectGrid - Manages project positions and hover labels
 */
export class ProjectGrid {
  constructor() {
    this.projectLabel = document.getElementById("projectLabel");

    // Define custom positions for each project (x, y offsets in pixels from default grid position)
    // Positive x = right, negative x = left
    // Positive y = down, negative y = up
    this.projectPositions = {
      Fireflower: { x: -15, y: 26 },
      Looper: { x: -20, y: 97 },
      Quarto: { x: -12, y: 25 },
      CharactAR: { x: -15, y: 0 },
      Brozas: { x: 65, y: -7 },
      Skele: { x: -15, y: -5 },
    };

    this.applyPositions();
    this.setupHoverInteraction();
  }

  applyPositions() {
    const projectCells = document.querySelectorAll(".project-cell");

    projectCells.forEach((cell) => {
      const projectName = cell.getAttribute("data-project");
      const position = this.projectPositions[projectName];

      if (position && (position.x !== 0 || position.y !== 0)) {
        const icon = cell.querySelector(".project-icon");
        if (icon) {
          icon.style.transform = `translate(${position.x}px, ${position.y}px)`;
        }
      }
    });
  }

  setupHoverInteraction() {
    const projectCells = document.querySelectorAll(".project-cell");

    projectCells.forEach((cell) => {
      const projectName = cell.getAttribute("data-project");
      const position = this.projectPositions[projectName] || { x: 0, y: 0 };

      cell.addEventListener("mouseenter", () => {
        if (this.projectLabel && projectName) {
          const isComingSoon = cell.getAttribute("data-coming-soon") === "true";
          if (isComingSoon) {
            this.projectLabel.innerHTML = `${projectName} <span style="color: #ef4444;">(coming soon)</span>`;
          } else {
            this.projectLabel.textContent = projectName;
          }
          this.projectLabel.style.opacity = "1";
        }
        // Maintain position + add invert on hover
        const icon = cell.querySelector(".project-icon");
        if (icon) {
          icon.style.transform = `translate(${position.x}px, ${position.y}px)`;
          icon.style.filter = "invert(1)";
        }
      });

      cell.addEventListener("mouseleave", () => {
        if (this.projectLabel) {
          this.projectLabel.style.opacity = "0";
        }
        // Reset to just position, remove invert
        const icon = cell.querySelector(".project-icon");
        if (icon) {
          icon.style.transform = `translate(${position.x}px, ${position.y}px)`;
          icon.style.filter = "none";
        }
      });
    });
  }
}
