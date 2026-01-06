# Vineeth Vajipey - Personal Website

A modern, performance-optimized personal portfolio website featuring interactive animations, scroll-based transitions, and a unique orbital navigation system.

## ✨ Features

- **Interactive Animations**: Custom-built orbital wheels and dharma chakra rotation
- **Scroll-Based Navigation**: Smooth transitions between background sections
- **Performance Optimized**: GPU-accelerated animations, lazy loading, and minimal dependencies
- **Responsive Design**: Mobile-first approach with touch interactions
- **Accessibility**: Screen reader support, reduced motion preferences, high contrast mode
- **Modern Architecture**: Modular JavaScript/CSS, ES6 modules, Vite build system

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment
```bash
# Deploy to GitHub Pages
npm run deploy
```

## 📁 Project Structure

```
├── src/
│   ├── css/                    # Modular stylesheets
│   │   ├── main.css           # Main CSS entry point
│   │   ├── reset.css          # CSS reset and base styles
│   │   ├── cursors.css        # Custom cursor styles
│   │   ├── layout.css         # Layout components
│   │   ├── dharma-wheel.css   # Dharma wheel component
│   │   ├── orbit-animations.css # Orbital animation styles
│   │   ├── hero-section.css   # Hero section styles
│   │   ├── social-links.css   # Social media links
│   │   ├── blog.css           # Blog page styles
│   │   ├── responsive.css     # Mobile-first responsive design
│   │   └── performance.css    # Performance optimizations
│   │
│   └── js/                    # JavaScript modules
│       ├── main.js           # Application entry point
│       ├── OrbitWheel.js     # Orbital animation system
│       ├── ScrollHandler.js   # Scroll-based interactions
│       ├── DharmaWheel.js    # Dharma wheel component
│       ├── Navigation.js     # Unified navigation system
│       └── ImageOptimization.js # Lazy loading & optimization
│
├── images/                    # Static assets
│   ├── backgrounds/          # Background images
│   ├── cursor-*.png          # Custom cursors
│   ├── dharma-chakra.png     # Dharma chakra icon
│   ├── skele-*.gif          # Skeleton animations
│   └── vineeth-name.png      # Name logo
│
├── pages/                     # Additional pages
│   ├── blog.html             # Blog index
│   └── blog/                 # Blog posts
│
├── data/                      # Documents and PDFs
├── music/                     # Audio files
├── vite.config.js            # Vite configuration
├── package.json              # Project dependencies
└── index.html                # Main entry point
```

## 🎯 Performance Features

### Animation Optimizations
- GPU-accelerated transforms using `transform3d()` and `translateZ()`
- Minimal repaints with `will-change` and `contain` properties
- RequestAnimationFrame-based smooth animations
- Intersection Observer for efficient scroll handling

### Asset Optimization
- Critical resource preloading
- Lazy loading for non-critical images
- Optimized SVG animations
- Minimal external dependencies

### Accessibility
- ARIA labels and semantic HTML
- Keyboard navigation support
- Reduced motion preferences respected
- High contrast mode support
- Screen reader compatibility

## 🔧 Technical Details

### Animation System
The website features a custom-built animation system with:
- **OrbitWheel**: Creates planetary-style orbital animations with depth
- **ScrollHandler**: Manages smooth scroll transitions and hero transformations
- **DharmaWheel**: Interactive wheel with touch/drag support and scroll rotation

### Interaction Features
- Touch/mouse drag support for dharma wheel
- Smooth scroll navigation between sections
- Responsive social media links with hover effects
- Progressive hero section transformation on scroll

### Build System
- **Vite**: Fast development server and optimized production builds
- **ES6 Modules**: Modern JavaScript module system
- **CSS Modules**: Organized, maintainable stylesheets
- **Code Splitting**: Automatic optimization for better loading

## 🎨 Customization

### Adding New Sections
1. Add a new `.bg-section` div in `index.html`
2. Set background image in the `style` attribute
3. Update section navigation logic if needed

### Modifying Animations
- Edit `OrbitWheel.js` for orbital behavior
- Adjust `DharmaWheel.js` for wheel interactions
- Modify `ScrollHandler.js` for scroll effects

### Styling Changes
- Update relevant CSS modules in `src/css/`
- Use CSS custom properties for consistent theming
- Follow mobile-first responsive design principles

## 📱 Browser Support

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+
- iOS Safari 14.5+
- Android Chrome 88+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the existing code style
4. Test across different devices and browsers
5. Submit a pull request

## 📄 License

This project is open source. Feel free to use it as inspiration for your own portfolio.

## 🔗 Links

- [Live Website](https://vineethvajipey.github.io)
- [LinkedIn](https://www.linkedin.com/in/vineeth-vajipey/)
- [GitHub](https://github.com/vineethvajipey)
- [Google Scholar](https://scholar.google.com/citations?user=xiKrcQgAAAAJ&hl=en&oi=ao)
