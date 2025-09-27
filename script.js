// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = themeToggleBtn.querySelector('.theme-icon');
    const body = document.body;
    
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Theme toggle event listener
    themeToggleBtn.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-moon theme-icon';
        } else {
            themeIcon.className = 'fas fa-sun theme-icon';
        }
    }

    // Language toggle functionality
    const languageToggleBtn = document.getElementById('language-toggle-btn');
    const langText = languageToggleBtn.querySelector('.lang-text');
    
    // Get saved language or default to English
    const savedLanguage = localStorage.getItem('language') || 'en';
    body.setAttribute('data-language', savedLanguage);
    updateLanguageText(savedLanguage);
    updateAllTexts(savedLanguage);
    
    // Language toggle event listener
    languageToggleBtn.addEventListener('click', function() {
        const currentLanguage = body.getAttribute('data-language');
        const newLanguage = currentLanguage === 'en' ? 'de' : 'en';
        
        body.setAttribute('data-language', newLanguage);
        localStorage.setItem('language', newLanguage);
        updateLanguageText(newLanguage);
        updateAllTexts(newLanguage);
    });
    
    function updateLanguageText(language) {
        langText.textContent = language === 'en' ? 'DE' : 'EN';
    }
    
    function updateAllTexts(language) {
        const elementsWithTranslation = document.querySelectorAll('[data-en][data-de]');
        elementsWithTranslation.forEach(element => {
            const text = language === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-de');
            element.innerHTML = text;
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            aboutSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        const currentTheme = body.getAttribute('data-theme');
        
        if (window.scrollY > 50) {
            if (currentTheme === 'dark') {
                navbar.style.background = 'rgba(30, 30, 30, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                navbar.style.borderBottom = '1px solid #e9ecef';
            }
        } else {
            if (currentTheme === 'dark') {
                navbar.style.background = 'rgba(30, 30, 30, 0.95)';
                navbar.style.borderBottom = '1px solid var(--bg-200)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.borderBottom = '1px solid #e9ecef';
            }
            navbar.style.boxShadow = 'none';
        }
    });

    // Enhanced Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for groups
                if (entry.target.classList.contains('portfolio-item')) {
                    const items = document.querySelectorAll('.portfolio-item');
                    items.forEach((item, index) => {
                        if (item === entry.target) {
                            setTimeout(() => {
                                item.style.animation = `slideInUp 0.6s ease forwards`;
                            }, index * 100);
                        }
                    });
                }
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.about-card, .skill-item, .portfolio-item, .process-step, .review-card, .section-title');
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Enhanced scroll animations with GSAP-like effects
    const scrollElements = document.querySelectorAll('.section-title, .section-subtitle');
    scrollElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        scrollObserver.observe(el);
    });

    // Floating cards animation enhancement
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotate(5deg) scale(1.05)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg) scale(1)';
        });
    });

    // Skill items hover effects
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.skill-icon');
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.skill-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Portfolio item hover effects with tilt
    portfolioItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn, .cta-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Custom cursor removed - using default browser cursor

    // Typewriter effect for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        heroSubtitle.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1500);
    }

    // Enhanced typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleLines = heroTitle.querySelectorAll('.title-line');
        titleLines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                line.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, index * 300 + 800);
        });
    }

    // Parallax effect for floating shapes
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.nav-menu .nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Cursor trail effect removed

    // Reviews slider auto-play
    const reviewsSlider = document.querySelector('.reviews-slider');
    if (reviewsSlider) {
        let currentIndex = 0;
        const reviewCards = reviewsSlider.querySelectorAll('.review-card');
        
        function showNextReview() {
            reviewCards.forEach((card, index) => {
                card.style.opacity = index === currentIndex ? '1' : '0.7';
                card.style.transform = index === currentIndex ? 'scale(1)' : 'scale(0.95)';
                card.style.transition = 'all 0.5s ease';
            });
            
            currentIndex = (currentIndex + 1) % reviewCards.length;
        }
        
        // Start auto-play
        setInterval(showNextReview, 3000);
    }

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2E8B57, #61bc84);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // Add particle system for hero background
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(46, 139, 87, 0.5);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            hero.appendChild(particle);
        }
    }

    // Add particle animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0%, 100% { 
                transform: translateY(0px) translateX(0px);
                opacity: 0.3;
            }
            50% { 
                transform: translateY(-20px) translateX(10px);
                opacity: 1;
            }
        }
        
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: var(--bg-100);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            padding: 1rem;
            border-top: 1px solid var(--bg-300);
        }
        
        .nav-toggle.active .bar:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .nav-toggle.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active .bar:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize particles
    createParticles();

    // Kinetic Typography Initialization
    function initializeKineticTypography() {
        const kineticTexts = document.querySelectorAll('.kinetic-text');
        
        kineticTexts.forEach(text => {
            const letters = text.querySelectorAll('.kinetic-letter');
            
            // Reset animation delays for each word
            letters.forEach((letter, index) => {
                letter.style.animationDelay = `${index * 0.1}s`;
            });
            
            // Add magnetic effect on hover
            text.addEventListener('mouseenter', () => {
                letters.forEach(letter => {
                    letter.style.animation = 'magneticFloat 0.6s ease-in-out infinite';
                });
            });
            
            text.addEventListener('mouseleave', () => {
                letters.forEach(letter => {
                    letter.style.animation = 'kineticReveal 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
                });
            });
        });
    }

    // Fluid Animation Mouse Interaction
    function initializeFluidAnimations() {
        const hero = document.querySelector('.hero');
        const fluidBlobs = document.querySelectorAll('.fluid-blob');
        
        if (hero && fluidBlobs.length > 0) {
            hero.addEventListener('mousemove', (e) => {
                const rect = hero.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;
                
                fluidBlobs.forEach((blob, index) => {
                    const intensity = 0.3 + (index * 0.1);
                    const moveX = deltaX * 50 * intensity;
                    const moveY = deltaY * 50 * intensity;
                    
                    blob.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + intensity * 0.2})`;
                    blob.style.transition = 'transform 0.3s ease-out';
                });
            });
            
            hero.addEventListener('mouseleave', () => {
                fluidBlobs.forEach(blob => {
                    blob.style.transform = 'translate(0, 0) scale(1)';
                    blob.style.transition = 'transform 0.6s ease-out';
                });
            });
        }
    }

    // Enhanced Button Fluid Effects
    function initializeFluidButtons() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Create liquid ripple effect
                const ripple = document.createElement('div');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: liquidRippleExpand 0.6s ease-out;
                    pointer-events: none;
                    z-index: 1;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Initialize all fluid and kinetic effects
    initializeKineticTypography();
    initializeFluidAnimations();
    initializeFluidButtons();

    // Cookie Consent Management
    function initializeCookieConsent() {
        const cookieBanner = document.getElementById('cookie-banner');
        const acceptBtn = document.getElementById('cookie-accept');
        const declineBtn = document.getElementById('cookie-decline');
        const settingsBtn = document.getElementById('cookie-settings');
        const cookieModal = document.getElementById('cookie-modal');
        const accessRestricted = document.getElementById('access-restricted');
        
        // Check if user has already made a choice
        const cookieChoice = localStorage.getItem('cookieConsent');
        
        if (!cookieChoice) {
            // Show cookie banner after 2 seconds
            setTimeout(() => {
                if (cookieBanner) {
                    cookieBanner.classList.add('show');
                }
            }, 2000);
        } else {
            // Apply saved preferences on page load
            if (cookieChoice === 'accepted') {
                enableAllCookies();
            } else if (cookieChoice === 'declined') {
                enableNecessaryCookiesOnly();
            } else if (cookieChoice === 'custom') {
                applyCustomPreferences();
            }
        }
        
        // Accept all cookies
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            localStorage.setItem('cookiePreferences', JSON.stringify({
                necessary: true,
                analytics: true,
                marketing: true,
                preferences: true
            }));
            hideCookieBanner();
            hideAccessRestricted();
            enableAllCookies();
        });
        
        // Decline non-necessary cookies
        declineBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'declined');
            localStorage.setItem('cookiePreferences', JSON.stringify({
                necessary: true,
                analytics: false,
                marketing: false,
                preferences: false
            }));
            hideCookieBanner();
            // Show access restricted overlay after declining
            setTimeout(() => {
                accessRestricted.classList.add('show');
            }, 500);
            enableNecessaryCookiesOnly();
        });
        
        // Settings button - open modal
        settingsBtn.addEventListener('click', () => {
            cookieModal.classList.add('show');
            loadCurrentPreferences();
        });
        
        // Modal functionality
        initializeCookieModal();
        
        // Access restricted buttons
        const accessAcceptBtn = document.getElementById('access-accept-cookies');
        const accessManageBtn = document.getElementById('access-manage-settings');
        
        accessAcceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            localStorage.setItem('cookiePreferences', JSON.stringify({
                necessary: true,
                analytics: true,
                marketing: true,
                preferences: true
            }));
            hideAccessRestricted();
            enableAllCookies();
        });
        
        accessManageBtn.addEventListener('click', () => {
            cookieModal.classList.add('show');
            loadCurrentPreferences();
        });
        
        function hideCookieBanner() {
            cookieBanner.classList.remove('show');
            setTimeout(() => {
                cookieBanner.style.display = 'none';
            }, 300);
        }
        
        function hideAccessRestricted() {
            accessRestricted.classList.remove('show');
            setTimeout(() => {
                accessRestricted.style.display = 'none';
            }, 300);
        }
        
        function enableAllCookies() {
            // Enable analytics, marketing, and preference cookies
            // Add your analytics code here (Google Analytics, etc.)
        }
        
        function enableNecessaryCookiesOnly() {
            // Only enable necessary cookies
            // Disable analytics and marketing cookies
        }
        
        function applyCustomPreferences() {
            const preferences = JSON.parse(localStorage.getItem('cookiePreferences') || '{}');
            
            if (preferences.analytics) {
                // Enable analytics
            }
            if (preferences.marketing) {
                // Enable marketing
            }
            if (preferences.preferences) {
                // Enable preference cookies
            }
        }
        
        function loadCurrentPreferences() {
            const preferences = JSON.parse(localStorage.getItem('cookiePreferences') || '{}');
            
            document.getElementById('analytics-cookies').checked = preferences.analytics || false;
            document.getElementById('marketing-cookies').checked = preferences.marketing || false;
            document.getElementById('preference-cookies').checked = preferences.preferences || false;
        }
    }

    function initializeCookieModal() {
        const cookieModal = document.getElementById('cookie-modal');
        const closeBtn = document.getElementById('cookie-modal-close');
        const saveBtn = document.getElementById('cookie-save-preferences');
        const acceptAllBtn = document.getElementById('cookie-accept-all-modal');
        
        // Close modal
        closeBtn.addEventListener('click', () => {
            cookieModal.classList.remove('show');
        });
        
        // Close modal when clicking outside
        cookieModal.addEventListener('click', (e) => {
            if (e.target === cookieModal) {
                cookieModal.classList.remove('show');
            }
        });
        
        // Save preferences
        saveBtn.addEventListener('click', () => {
            const preferences = {
                necessary: true, // Always true
                analytics: document.getElementById('analytics-cookies').checked,
                marketing: document.getElementById('marketing-cookies').checked,
                preferences: document.getElementById('preference-cookies').checked
            };
            
            localStorage.setItem('cookieConsent', 'custom');
            localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
            
            cookieModal.classList.remove('show');
            hideCookieBanner();
            hideAccessRestricted();
            applyCustomPreferences();
        });
        
        // Accept all from modal
        acceptAllBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            localStorage.setItem('cookiePreferences', JSON.stringify({
                necessary: true,
                analytics: true,
                marketing: true,
                preferences: true
            }));
            
            cookieModal.classList.remove('show');
            hideCookieBanner();
            hideAccessRestricted();
            enableAllCookies();
        });
        
        function hideCookieBanner() {
            const cookieBanner = document.getElementById('cookie-banner');
            cookieBanner.classList.remove('show');
            setTimeout(() => {
                cookieBanner.style.display = 'none';
            }, 300);
        }
        
        function hideAccessRestricted() {
            const accessRestricted = document.getElementById('access-restricted');
            accessRestricted.classList.remove('show');
            setTimeout(() => {
                accessRestricted.style.display = 'none';
            }, 300);
        }
        
        function enableAllCookies() {
            // Enable analytics, marketing, and preference cookies
        }
        
        function applyCustomPreferences() {
            const preferences = JSON.parse(localStorage.getItem('cookiePreferences') || '{}');
            
            if (preferences.analytics) {
                // Enable analytics
            }
            if (preferences.marketing) {
                // Enable marketing
            }
            if (preferences.preferences) {
                // Enable preference cookies
            }
        }
    }

    // Initialize cookie consent
    initializeCookieConsent();

    // Debug function to clear cookie preferences (for testing)
    // Uncomment the lines below to reset cookie preferences for testing
    // localStorage.removeItem('cookieConsent'); 
    // localStorage.removeItem('cookiePreferences');

    // Add entrance animations
    const entranceElements = document.querySelectorAll('.hero-subtitle, .hero-buttons');
    entranceElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.8s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 1000 + (index * 200));
    });

    // Add hover effects to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Show success message
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                
                // Reset form
                this.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                    submitBtn.disabled = false;
                }, 3000);
            }, 2000);
        });
        
        // Form field animations
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, select, textarea');
            const label = group.querySelector('label');
            
            input.addEventListener('focus', () => {
                group.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    group.classList.remove('focused');
                }
            });
            
            // Check if field has value on load
            if (input.value) {
                group.classList.add('focused');
            }
        });
    }

    // Animated counters for stats
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    };

    // Trigger counter animations when stats come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const number = parseInt(text.replace(/[^\d]/g, ''));
                    if (number) {
                        stat.textContent = '0';
                        animateCounter(stat, number);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    });

    const statsSections = document.querySelectorAll('.hero-photo-stats, .portfolio-stats');
    statsSections.forEach(section => {
        statsObserver.observe(section);
    });

    // Process Section Interactive Features
    const processSteps = document.querySelectorAll('.process-step');
    const progressDots = document.querySelectorAll('.progress-dot');
    let currentStep = 0;

    // Process step click interactions
    processSteps.forEach((step, index) => {
        step.addEventListener('click', () => {
            // Remove active class from all steps
            processSteps.forEach(s => s.classList.remove('active'));
            progressDots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to clicked step
            step.classList.add('active');
            progressDots[index].classList.add('active');
            currentStep = index;
            
            // Add completion to previous steps
            for (let i = 0; i < index; i++) {
                progressDots[i].classList.add('completed');
            }
            
            // Remove completion from following steps
            for (let i = index + 1; i < progressDots.length; i++) {
                progressDots[i].classList.remove('completed');
            }
        });

        // Hover effects
        step.addEventListener('mouseenter', () => {
            step.style.transform = 'translateY(-15px) scale(1.05)';
        });
        
        step.addEventListener('mouseleave', () => {
            if (!step.classList.contains('active')) {
                step.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Progress dot click interactions
    progressDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Remove active class from all dots and steps
            progressDots.forEach(d => d.classList.remove('active'));
            processSteps.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked dot and corresponding step
            dot.classList.add('active');
            processSteps[index].classList.add('active');
            currentStep = index;
            
            // Add completion to previous steps
            for (let i = 0; i < index; i++) {
                progressDots[i].classList.add('completed');
            }
            
            // Remove completion from following steps
            for (let i = index + 1; i < progressDots.length; i++) {
                progressDots[i].classList.remove('completed');
            }
        });
    });

    // Auto-advance process steps (optional)
    let autoAdvanceInterval;
    
    function startAutoAdvance() {
        autoAdvanceInterval = setInterval(() => {
            currentStep = (currentStep + 1) % processSteps.length;
            
            // Update active states
            processSteps.forEach((step, index) => {
                step.classList.toggle('active', index === currentStep);
            });
            
            progressDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentStep);
                dot.classList.toggle('completed', index < currentStep);
            });
        }, 3000);
    }

    function stopAutoAdvance() {
        if (autoAdvanceInterval) {
            clearInterval(autoAdvanceInterval);
        }
    }

    // Start auto-advance when section comes into view
    const processSection = document.querySelector('.process');
    if (processSection) {
        const processObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAutoAdvance();
                } else {
                    stopAutoAdvance();
                }
            });
        }, { threshold: 0.5 });
        
        processObserver.observe(processSection);
    }

    // Stop auto-advance when user interacts
    processSteps.forEach(step => {
        step.addEventListener('click', stopAutoAdvance);
        step.addEventListener('mouseenter', stopAutoAdvance);
    });

    progressDots.forEach(dot => {
        dot.addEventListener('click', stopAutoAdvance);
    });

    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
});
