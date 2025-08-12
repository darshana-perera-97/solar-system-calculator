# SolarFlow - Premium Solar Solutions Website

A modern, responsive website for selling solar systems with a clean, minimalistic design and AI-driven user experience.

## 🌟 Features

### Design & UI
- **Minimalistic & Clean**: Modern, whitish design with clean typography
- **AI-Driven**: Smart animations and interactive elements
- **Fully Responsive**: Mobile-first design that works on all devices
- **User-Friendly**: Intuitive navigation and clear call-to-actions

### Sections
- **Hero Section**: Compelling headline with solar energy benefits
- **Promotion Banner**: Limited-time offers and special deals
- **Solar Solutions**: Three main product categories
  - Residential Solar
  - Commercial Solar
  - Solar + Storage
- **Pricing**: Transparent pricing with three tiers
- **Testimonials**: Customer reviews and success stories
- **FAQ**: Common questions and answers
- **Contact Form**: Lead generation and consultation booking

### Technical Features
- **Bootstrap 5**: Latest Bootstrap framework for responsive design
- **Font Awesome**: Professional icons throughout the interface
- **Custom CSS**: Modern CSS with CSS variables and animations
- **Vanilla JavaScript**: Lightweight, performant interactions
- **Smooth Scrolling**: Enhanced navigation experience
- **Form Handling**: Contact form with validation and notifications
- **Mobile Optimization**: Touch-friendly interface for mobile devices

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- Local web server (optional, for development)

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. For development, use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

### File Structure
```
solar-system-calculator/
├── index.html          # Main HTML file
├── styles.css          # Custom CSS styles
├── script.js           # JavaScript functionality
├── config.js           # Configuration data for Sri Lanka
└── README.md           # Project documentation
```

## 🎨 Customization

### Configuration Data
The website uses a separate `config.js` file for easy customization of pricing and tariffs:
```javascript
// Update pricing for different system sizes
systemPricing: {
    '3': 600000,    // 6 Lakhs
    '5': 800000,    // 8 Lakhs
    '6': 900000,    // 9 Lakhs
    '10': 1200000   // 12 Lakhs
}

// Update tariffs and performance metrics
tariffs: {
    electricityTariff: 27.50,    // LKR/kWh
    feedInTariff: 27.06         // LKR/kWh
}
```

### Colors
The website uses CSS variables for easy color customization:
```css
:root {
    --primary-color: #2563eb;      /* Main brand color */
    --secondary-color: #1e40af;    /* Secondary brand color */
    --accent-color: #3b82f6;       /* Accent color */
    --text-dark: #1f2937;          /* Dark text */
    --text-muted: #6b7280;         /* Muted text */
    --bg-light: #f8fafc;           /* Light background */
}
```

### Content
- Update company information in the HTML
- Modify pricing in the pricing section
- Add/remove FAQ items as needed
- Customize testimonials with real customer feedback

### Images
- Replace the hero icon with actual solar panel images
- Add company logo
- Include real customer photos in testimonials
- Add product images for solar solutions

## 📱 Responsive Breakpoints

- **Mobile**: < 576px
- **Tablet**: 576px - 768px
- **Desktop**: > 768px

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📈 Performance Features

- **Lazy Loading**: Images load only when needed
- **Debounced Scroll**: Optimized scroll event handling
- **CSS Animations**: Hardware-accelerated animations
- **Minimal Dependencies**: Only essential external libraries

## 🎯 SEO Features

- Semantic HTML structure
- Meta tags for social sharing
- Clean URL structure with anchor links
- Fast loading times
- Mobile-friendly design

## 🚀 Deployment

### Static Hosting
- Netlify
- Vercel
- GitHub Pages
- AWS S3

### Web Server
- Apache
- Nginx
- IIS

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions about this project, please contact:
- Email: info@solarflow.com
- Phone: +1 (555) 123-4567

## 🔮 Future Enhancements

- **Solar Calculator**: Interactive ROI calculator
- **Live Chat**: Customer support integration
- **Appointment Booking**: Calendar integration
- **Payment Gateway**: Online payment processing
- **Customer Portal**: Account management
- **Blog Section**: Solar energy education
- **Multi-language Support**: International markets

---

**Built with ❤️ for the solar energy industry** 