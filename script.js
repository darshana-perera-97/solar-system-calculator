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

// Add loading state to buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn') && !e.target.classList.contains('btn-outline')) {
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
    const customSizeInput = document.getElementById('customSize');
    const presetButtons = document.querySelectorAll('.preset-btn');
    
    // Handle system size selection
    systemSizeSelect.addEventListener('change', function() {
        console.log('System size changed to:', this.value);
        console.log('SOLAR_CONFIG available:', !!SOLAR_CONFIG);
        console.log('System pricing:', SOLAR_CONFIG?.systemPricing);
        
        if (this.value === 'custom') {
            customSizeInput.disabled = false;
            customSizeInput.focus();
            // Clear installation cost for custom size
            document.getElementById('installationCost').value = '';
        } else {
            customSizeInput.disabled = true;
            customSizeInput.value = '';
            // Auto-fill installation cost based on selected size
            if (SOLAR_CONFIG && SOLAR_CONFIG.systemPricing && SOLAR_CONFIG.systemPricing[this.value]) {
                const cost = SOLAR_CONFIG.systemPricing[this.value];
                console.log('Auto-filling installation cost:', cost);
                document.getElementById('installationCost').value = cost;
            } else {
                console.log('No pricing found for size:', this.value);
            }
        }
    });
    
    // Handle custom size input for installation cost estimation
    customSizeInput.addEventListener('input', function() {
        const customSize = parseFloat(this.value);
        if (customSize > 0) {
            // Estimate installation cost based on size (rough calculation)
            const estimatedCost = Math.round(customSize * 120000); // Approx 120k per kW
            document.getElementById('installationCost').value = estimatedCost;
        }
    });
    
    // Handle form submission
    calculatorForm.addEventListener('submit', function(e) {
        e.preventDefault();
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
    
    // Test auto-fill functionality
    setTimeout(() => {
        console.log('Testing auto-fill functionality...');
        if (systemSizeSelect.value && systemSizeSelect.value !== 'custom') {
            const cost = SOLAR_CONFIG.systemPricing[systemSizeSelect.value];
            if (cost) {
                console.log('Setting initial installation cost for', systemSizeSelect.value, 'kW:', cost);
                document.getElementById('installationCost').value = cost;
            }
        }
        
        // Add a manual trigger button for testing
        const testButton = document.createElement('button');
        testButton.type = 'button';
        testButton.className = 'btn btn-sm btn-outline-secondary mt-2';
        testButton.textContent = 'Test Auto-fill';
        testButton.onclick = function() {
            const selectedSize = systemSizeSelect.value;
            if (selectedSize && selectedSize !== 'custom') {
                const cost = SOLAR_CONFIG.systemPricing[selectedSize];
                if (cost) {
                    document.getElementById('installationCost').value = cost;
                    showNotification(`Auto-filled installation cost: LKR ${cost.toLocaleString()}`, 'success');
                }
            }
        };
        document.getElementById('installationCost').parentNode.appendChild(testButton);
    }, 100);
}

function setDefaultValues() {
    // Set realistic default values for Sri Lanka from config
    document.getElementById('feedInTariff').value = SOLAR_CONFIG.tariffs.feedInTariff;
    document.getElementById('monthlyGenerationPerKW').value = SOLAR_CONFIG.performance.monthlyGenerationPerKW;
    document.getElementById('systemLosses').value = SOLAR_CONFIG.performance.systemLosses;
    document.getElementById('maintenanceCost').value = SOLAR_CONFIG.performance.maintenanceCost;
    document.getElementById('tariffIncrease').value = SOLAR_CONFIG.performance.tariffIncrease;
}

function applyPreset(preset) {
    if (SOLAR_CONFIG.presets[preset]) {
        const presetData = SOLAR_CONFIG.presets[preset];
        document.getElementById('systemSize').value = presetData.systemSize;
        document.getElementById('installationCost').value = presetData.installationCost;
        document.getElementById('monthlyConsumption').value = presetData.monthlyConsumption;
        
        // Enable custom size if needed
        if (preset === 'commercial') {
            document.getElementById('systemSize').value = 'custom';
            document.getElementById('customSize').disabled = false;
            document.getElementById('customSize').value = '20';
        } else {
            document.getElementById('customSize').disabled = true;
            document.getElementById('customSize').value = '';
        }
        
        // Auto-calculate
        calculateSolarROI();
    }
}

function calculateSolarROI() {
    // Get input values
    const systemSize = parseFloat(document.getElementById('systemSize').value) || 
                      parseFloat(document.getElementById('customSize').value) || 0;
    const installationCost = parseFloat(document.getElementById('installationCost').value) || 0;
    const monthlyConsumption = parseFloat(document.getElementById('monthlyConsumption').value) || 0;
    const electricityTariff = SOLAR_CONFIG.tariffs.electricityTariff; // Use hidden config value
    const feedInTariff = parseFloat(document.getElementById('feedInTariff').value) || 0;
    const monthlyGenerationPerKW = parseFloat(document.getElementById('monthlyGenerationPerKW').value) || 0;
    const systemLosses = parseFloat(document.getElementById('systemLosses').value) || 0;
    const maintenanceCost = parseFloat(document.getElementById('maintenanceCost').value) || 0;
    const tariffIncrease = parseFloat(document.getElementById('tariffIncrease').value) || 0;
    
    // Validate inputs
    if (!systemSize || !installationCost || !monthlyConsumption) {
        showNotification('Please fill in all required fields', 'info');
        return;
    }
    
    // Calculate system performance
    const monthlyGeneration = systemSize * monthlyGenerationPerKW * (1 - systemLosses / 100);
    const selfConsumption = Math.min(monthlyGeneration, monthlyConsumption);
    const gridExport = Math.max(0, monthlyGeneration - monthlyConsumption);
    
    // Calculate monthly benefits
    const monthlySavings = selfConsumption * electricityTariff;
    const surplusRevenue = gridExport * feedInTariff;
    const totalMonthlyBenefit = monthlySavings + surplusRevenue;
    
    // Calculate payback period
    const paybackPeriod = installationCost / (totalMonthlyBenefit * 12);
    
    // Calculate 25-year analysis
    const systemLifetime = 25;
    let totalSavings = 0;
    let currentTariff = electricityTariff;
    
    for (let year = 1; year <= systemLifetime; year++) {
        const yearlyBenefit = totalMonthlyBenefit * 12;
        totalSavings += yearlyBenefit;
        currentTariff *= (1 + tariffIncrease / 100);
    }
    
    // Subtract maintenance costs
    const totalMaintenanceCost = maintenanceCost * systemLifetime;
    const netProfit = totalSavings - installationCost - totalMaintenanceCost;
    
    // Calculate ROI
    const roi = ((netProfit / installationCost) * 100);
    
    // Display results
    displayResults({
        paybackPeriod: paybackPeriod.toFixed(1),
        roiPercentage: roi.toFixed(1),
        monthlySavings: formatCurrency(monthlySavings),
        surplusRevenue: formatCurrency(surplusRevenue),
        totalMonthlyBenefit: formatCurrency(totalMonthlyBenefit),
        monthlyGeneration: monthlyGeneration.toFixed(0),
        selfConsumption: selfConsumption.toFixed(0),
        gridExport: gridExport.toFixed(0),
        totalSavings: formatCurrency(totalSavings),
        netProfit: formatCurrency(netProfit)
    });
    
    // Show results section
    document.getElementById('calculatorInitial').classList.add('d-none');
    document.getElementById('calculatorResults').classList.remove('d-none');
    
    // Scroll to results
    document.getElementById('calculatorResults').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function displayResults(results) {
    // Update all result fields
    Object.keys(results).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = results[key];
        }
    });
}

function formatCurrency(amount) {
    return `LKR ${amount.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })}`;
}

// Calculator functionality is now complete and integrated with the main CSS 