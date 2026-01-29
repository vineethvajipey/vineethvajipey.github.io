/**
 * ProjectGrid - Manages draggable project icons with interact.js
 */
export class ProjectGrid {
  constructor() {
    this.setupDragInteraction();
  }

  setupDragInteraction() {
    if (typeof interact === 'undefined') {
      setTimeout(() => this.setupDragInteraction(), 100);
      return;
    }

    interact('.project-icon')
      .draggable({
        inertia: {
          resistance: 12,
          minSpeed: 200,
          endSpeed: 20
        },
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: '#projectsGrid',
            endOnly: false
          })
        ],
        listeners: {
          start: (event) => {
            const target = event.target;
            target.style.zIndex = '100';
            target.style.transition = 'none';
          },
          move: (event) => {
            const target = event.target;
            const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            target.style.transform = `translate(${x}px, ${y}px) scale(1.15)`;
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
          },
          end: (event) => {
            const target = event.target;
            target.style.zIndex = '';
            target.style.transition = 'all 0.3s ease-out';
          }
        }
      })
      .on('tap', (event) => {
        const projectCell = event.target.closest('.project-cell');
        if (projectCell) {
          const projectId = projectCell.getAttribute('data-project');
          console.log(`Project ${projectId} clicked`);
          // Future: open project modal or navigate to project page
        }
      });
  }
}
