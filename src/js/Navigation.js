/**
 * Navigation - Unified navigation component system
 */
export class Navigation {
  constructor() {
    this.createNavigationHTML();
    this.setupEventListeners();
  }

  createNavigationHTML() {
    const navigationData = {
      home: { href: '../index.html', text: 'Home' },
      research: { href: 'https://scholar.google.com/citations?user=xiKrcQgAAAAJ&hl=en&oi=ao', text: 'Research' },
      projects: { href: 'https://devpost.com/VineethVajipey', text: 'Projects' },
      github: { href: 'https://github.com/vineethvajipey', text: 'Github' },
      linkedin: { href: 'https://www.linkedin.com/in/vineeth-vajipey/', text: 'Linkedin' }
    };

    const menuElement = document.getElementById('menu');
    if (!menuElement) return;

    // Clear existing content
    menuElement.innerHTML = '';

    // Add navigation links with Tailwind classes
    Object.entries(navigationData).forEach(([key, { href, text }]) => {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = text;
      link.className = 'text-center block p-2.5 mb-1 bg-gray-50 no-underline border border-dashed border-black text-sm box-border';
      
      if (href.startsWith('http')) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }

      const paragraph = document.createElement('p');
      paragraph.appendChild(link);
      menuElement.appendChild(paragraph);
    });
  }

  setupEventListeners() {
    // Add smooth scroll behavior for internal links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && link.href.includes('#')) {
        e.preventDefault();
        const targetId = link.href.split('#')[1];
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  }
}