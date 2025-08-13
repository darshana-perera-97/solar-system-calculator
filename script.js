// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavbar();
    initAnimations();
    initFormHandling();
    initScrollEffects();
    initFAQ();
    initSolarCalculator();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow');
        } else {
            navbar.classList.remove('shadow');
        }
    });
}

// Smooth scrolling for navigation links
function initScrollEffects() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animation effects
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.solution-card, .pricing-card, .testimonial-card');
    animateElements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
    
    // Hero section animation
    const heroContent = document.querySelector('.hero-section .row');
    if (heroContent) {
        heroContent.classList.add('loading');
        setTimeout(() => {
            heroContent.classList.add('loaded');
        }, 300);
    }
}

// Form handling
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            this.querySelectorAll('input, select').forEach(input => {
                formObject[input.name || input.placeholder] = input.value;
            });
            
            // Simulate form submission
            showNotification('Thank you! We\'ll contact you within 24 hours.', 'success');
            
            // Reset form
            this.reset();
        });
    }
}

// FAQ functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.accordion-item');
    
    faqItems.forEach(item => {
        const button = item.querySelector('.accordion-button');
        const content = item.querySelector('.accordion-collapse');
        
        button.addEventListener('click', function() {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherButton = otherItem.querySelector('.accordion-button');
                    const otherContent = otherItem.querySelector('.accordion-collapse');
                    
                    if (!otherButton.classList.contains('collapsed')) {
                        otherButton.classList.add('collapsed');
                        otherContent.classList.remove('show');
                    }
                }
            });
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    });
}

// Lazy loading for images (if any are added later)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Mobile menu toggle enhancement
function initMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            // Add smooth animation
            navbarCollapse.style.transition = 'all 0.3s ease';
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = navbarCollapse.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    navbarCollapse.classList.remove('show');
                }
            });
        });
    }
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced scroll effects with debouncing
const debouncedScroll = debounce(function() {
    // Add any additional scroll-based effects here
}, 16);

window.addEventListener('scroll', debouncedScroll);

// Initialize mobile-specific functionality
if (window.innerWidth < 768) {
    initMobileMenu();
}

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth < 768) {
        initMobileMenu();
    }
});

// Add loading state to buttons (excluding calculator button)
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn') && !e.target.classList.contains('btn-outline') && !e.target.closest('#solarCalculator')) {
        const originalText = e.target.innerHTML;
        e.target.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Loading...';
        e.target.disabled = true;
        
        // Reset button after 2 seconds (simulate API call)
        setTimeout(() => {
            e.target.innerHTML = originalText;
            e.target.disabled = false;
        }, 2000);
    }
});

// Easter egg: Solar system facts
const solarFacts = [
    "Solar panels can last up to 40 years with proper maintenance!",
    "The sun provides enough energy in one hour to power the entire world for a year.",
    "Solar energy is the most abundant energy resource on Earth.",
    "Modern solar panels are 20% more efficient than those from 10 years ago.",
    "Solar panels work even on cloudy days, just with reduced efficiency."
];

// Show random fact in console (for developers)
console.log(`%c🌞 Solar Fact: ${solarFacts[Math.floor(Math.random() * solarFacts.length)]}`, 
    'color: #2563eb; font-size: 14px; font-weight: bold;');

// Solar Calculator Functionality
function initSolarCalculator() {
    // Check if configuration is loaded
    if (typeof SOLAR_CONFIG === 'undefined') {
        console.error('SOLAR_CONFIG not loaded. Please ensure config.js is loaded before script.js');
        return;
    }
    
    console.log('Initializing solar calculator with config:', SOLAR_CONFIG);
    
    const calculatorForm = document.getElementById('solarCalculator');
    const systemSizeSelect = document.getElementById('systemSize');
    const presetButtons = document.querySelectorAll('.preset-btn');
    
    // Check if required elements exist
    if (!calculatorForm) {
        console.error('Calculator form not found');
        return;
    }
    if (!systemSizeSelect) {
        console.error('System size select not found');
        return;
    }
    
    console.log('All required elements found');
    
    // Handle system size selection
    systemSizeSelect.addEventListener('change', function() {
        console.log('System size changed to:', this.value);
        
        if (this.value && this.value !== '') {
            // Store installation cost for calculations
            if (SOLAR_CONFIG && SOLAR_CONFIG.systemPricing && SOLAR_CONFIG.systemPricing[this.value]) {
                const cost = SOLAR_CONFIG.systemPricing[this.value];
                console.log('Setting installation cost for', this.value, 'kW:', cost);
                window.currentInstallationCost = cost;
            } else {
                console.error('No pricing found for system size:', this.value);
            }
        } else {
            console.log('No system size selected');
        }
    });
    
    // Handle form submission
    calculatorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted, starting calculation...');
        calculateSolarROI();
    });
    
    // Handle preset buttons
    presetButtons.forEach(button => {
        button.addEventListener('click', function() {
            const preset = this.getAttribute('data-preset');
            applyPreset(preset);
        });
    });
    
    // Initialize with default values
    setDefaultValues();
}

function setDefaultValues() {
    // Set default values for visible fields
    // Other values will be calculated automatically
}

function applyPreset(preset) {
    if (SOLAR_CONFIG.presets[preset]) {
        const presetData = SOLAR_CONFIG.presets[preset];
        const systemSizeSelect = document.getElementById('systemSize');
        
        systemSizeSelect.value = presetData.systemSize;
        document.getElementById('monthlyConsumption').value = presetData.monthlyConsumption;
        
        // Store installation cost for calculations
        if (SOLAR_CONFIG.systemPricing[presetData.systemSize]) {
            window.currentInstallationCost = SOLAR_CONFIG.systemPricing[presetData.systemSize];
        }
        
        // Auto-calculate
        calculateSolarROI();
    }
}

function calculateSolarROI() {
    console.log('Starting calculation...');
    
    // Get input values
    const systemSize = parseFloat(document.getElementById('systemSize').value) || 0;
    const monthlyConsumption = parseFloat(document.getElementById('monthlyConsumption').value) || 0;
    const installationCost = window.currentInstallationCost || 0;
    
    console.log('Input values:', { systemSize, monthlyConsumption, installationCost });
    
    // Validate inputs
    if (!systemSize) {
        showNotification('Please select a system size first', 'info');
        return;
    }
    
    if (!monthlyConsumption) {
        showNotification('Please enter your monthly power usage', 'info');
        return;
    }
    
    if (!installationCost) {
        showNotification('Please select a system size to get installation cost', 'info');
        return;
    }
    
    console.log('All inputs validated successfully');
    
    // Calculate solar production: System Size (kW) * 5 * 30 (for month)
    const monthlyGenerationPerKW = 5 * 30; // 150 kWh per kW per month
    const totalMonthlyGeneration = systemSize * monthlyGenerationPerKW;
    
    // Calculate power given to CEB (surplus after self-consumption)
    const powerGivenToCEB = Math.max(0, totalMonthlyGeneration - monthlyConsumption);
    
    // Get tariffs from config
    const electricityTariff = SOLAR_CONFIG.tariffs.electricityTariff; // LKR 27.50/kWh
    const feedInTariff = SOLAR_CONFIG.tariffs.feedInTariff; // LKR 27.06/kWh
    
    // Calculate monthly income
    const electricityBillSavings = Math.min(totalMonthlyGeneration, monthlyConsumption) * electricityTariff;
    const cebPaymentForSurplus = powerGivenToCEB * feedInTariff;
    const totalMonthlyIncome = electricityBillSavings + cebPaymentForSurplus;
    
    // Calculate maintenance cost (5% of installation cost per year)
    const annualMaintenanceCost = installationCost * 0.05;
    const totalInvestment = installationCost + annualMaintenanceCost;
    
    // Calculate time to recover investment
    const paybackPeriod = totalInvestment / (totalMonthlyIncome * 12);
    
    console.log('Calculation results:', {
        monthlyGenerationPerKW,
        totalMonthlyGeneration,
        powerGivenToCEB,
        electricityBillSavings,
        cebPaymentForSurplus,
        totalMonthlyIncome,
        annualMaintenanceCost,
        totalInvestment,
        paybackPeriod
    });
    
    // Display results
    const results = {
        installationCostDisplay: formatCurrency(installationCost),
        monthlyGenerationPerKWDisplay: `${monthlyGenerationPerKW} kWh`,
        monthlyGeneration: `${totalMonthlyGeneration.toFixed(0)} kWh`,
        gridExport: `${powerGivenToCEB.toFixed(0)} kWh`,
        monthlySavings: formatCurrency(electricityBillSavings),
        surplusRevenue: formatCurrency(cebPaymentForSurplus),
        totalMonthlyBenefit: formatCurrency(totalMonthlyIncome),
        totalInvestment: formatCurrency(totalInvestment),
        paybackPeriod: `${paybackPeriod.toFixed(1)} Years`
    };
    
    displayResults(results);
    
    // Show results section
    const initialElement = document.getElementById('calculatorInitial');
    const resultsElement = document.getElementById('calculatorResults');
    
    if (initialElement && resultsElement) {
        initialElement.classList.add('d-none');
        resultsElement.classList.remove('d-none');
        
        // Smoothly scroll to results (now below the button)
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        console.log('Results section shown successfully below the button');
    } else {
        console.error('Results elements not found:', { initialElement, resultsElement });
    }
}

function displayResults(results) {
    console.log('Displaying results:', results);
    
    // Update all result fields
    Object.keys(results).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = results[key];
            console.log(`Updated ${key}:`, results[key]);
        } else {
            console.warn(`Element with id '${key}' not found`);
        }
    });
    
    console.log('Results displayed:', results);
}

function formatCurrency(amount) {
    return `LKR ${amount.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })}`;
}

// Calculator functionality is now complete and integrated with the main CSS 