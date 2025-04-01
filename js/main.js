// Initialize EmailJS
(function() {
    // Your EmailJS public key - replace with your actual key after signing up
    //emailjs.init("V_LXbenP-SgdH2-qq"); // Sign up at emailjs.com to get your public key
})()

// Dick Wray Artist Website - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Page Loader
    const loaderContainer = document.querySelector('.loader-container');
    if (loaderContainer) {
        setTimeout(() => {
            loaderContainer.classList.add('fade-out');
            // Activate text animations after loader is gone
            setTimeout(() => {
                document.querySelectorAll('.split-text').forEach(text => {
                    text.classList.add('active');
                });
            }, 300);
        }, 1500);
    }
    
    // Update copyright year
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Hero Slideshow
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 5000; // Change slide every 5 seconds
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    // Start slideshow if slides exist
    if (slides.length > 1) {
        setInterval(nextSlide, slideInterval);
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Links cursor hover effect
    const links = document.querySelectorAll('a, button, .btn, .theme-toggle, .scroll-to-top');
    
    // Reset cursor styles
    document.body.style.cursor = 'auto';
    links.forEach(link => {
        link.style.cursor = 'pointer';
    });
    
    // Mobile navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li:not(.dropdown) a, .dropdown-menu li a');
    const dropdownToggle = document.querySelector('.dropdown > a');
    
    if (dropdownToggle) {
        // Handle dropdown on mobile
        const dropdownMenu = document.querySelector('.dropdown-menu');
        
        // For mobile: toggle dropdown on tap
        if (window.innerWidth <= 768) {
            dropdownToggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdownMenu.classList.toggle('active-mobile');
                }
            });
        }
    }
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('active');
        
        // Toggle Burger Animation
        burger.classList.toggle('active');
        
        // Animate Links
        const mainNavLinks = document.querySelectorAll('.nav-links > li');
        mainNavLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });
    
    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.classList.remove('active');
                
                // Reset animations
                const mainNavLinks = document.querySelectorAll('.nav-links > li');
                mainNavLinks.forEach(link => {
                    link.style.animation = '';
                });
                
                // Reset dropdown mobile state
                const dropdownMenu = document.querySelector('.dropdown-menu');
                if (dropdownMenu && dropdownMenu.classList.contains('active-mobile')) {
                    dropdownMenu.classList.remove('active-mobile');
                }
            }
        });
    });
    
    // Gallery Lightbox with Toggle functionality
    const galleryItems = document.querySelectorAll('.gallery-item, .masonry-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-content');
    const close = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentImageIndex = 0;
    
    function openLightbox(index) {
        const src = galleryItems[index].dataset.src;
        lightboxImg.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        currentImageIndex = index;
        
        // Show navigation controls only if there are multiple images
        if (galleryItems.length > 1) {
            document.querySelector('.lightbox-controls').style.display = 'flex';
        } else {
            document.querySelector('.lightbox-controls').style.display = 'none';
        }
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        const src = galleryItems[currentImageIndex].dataset.src;
        lightboxImg.src = src;
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        const src = galleryItems[currentImageIndex].dataset.src;
        lightboxImg.src = src;
    }
    
    // Toggle lightbox on gallery item click
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });
    
    // Also toggle lightbox on lightbox image click (close when clicking the enlarged image)
    lightboxImg.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from bubbling to lightbox
        closeLightbox();
    });
    
    close.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent closing the lightbox when clicking nav buttons
        showPrevImage();
    });
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent closing the lightbox when clicking nav buttons
        showNextImage();
    });
    
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // 3D Tilt Effect
    const tiltElements = document.querySelectorAll('.tilt');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = x / rect.width;
            const yPercent = y / rect.height;
            
            const rotateX = (0.5 - yPercent) * 10; // -5 to 5 degrees
            const rotateY = (xPercent - 0.5) * 10; // -5 to 5 degrees
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
    
    // Scroll to Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    function reveal() {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;
        
        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', reveal);
    
    // Ensure all elements are initially visible
    document.addEventListener('DOMContentLoaded', function() {
        // Activate all reveal elements on page load
        setTimeout(function() {
            document.querySelectorAll('.reveal').forEach(function(el) {
                el.classList.add('active');
            });
            
            document.querySelectorAll('.split-text').forEach(function(el) {
                el.classList.add('active');
            });
            
            document.querySelectorAll('.masonry-item').forEach(function(el) {
                el.classList.add('active');
            });
        }, 500);
    });
    
    // Initial call to reveal to make sure elements are visible
    reveal();
    
    // Masonry Gallery Scroll Animation
    const masonryItems = document.querySelectorAll('.masonry-item');
    
    function animateMasonryItems() {
        const windowHeight = window.innerHeight;
        
        masonryItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            const delay = index * 100; // Staggered delay
            
            if (itemTop < windowHeight - 100) {
                setTimeout(() => {
                    item.classList.add('active');
                }, delay);
            }
        });
    }
    
    window.addEventListener('scroll', animateMasonryItems);
    animateMasonryItems(); // Check on initial load
    
    // Scroll to Top Button
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('active');
            } else {
                scrollToTopBtn.classList.remove('active');
            }
        });
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-toggle i');
    const root = document.documentElement;
    
    if (themeToggle && themeIcon) {
        console.log('Theme toggle found');
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            root.classList.add('light-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            
            // Update logo images for light theme
            document.querySelectorAll('#logo-image, .footer-logo img').forEach(img => {
                img.src = 'Dick Wray Images/dickwray-logo_INVERTED.png';
            });
            document.querySelectorAll('.signature-image').forEach(img => {
                img.src = 'Dick Wray Images/Signature_black.png';
            });
        }
        
        // Make sure the click event works
        themeToggle.addEventListener('click', function() {
            console.log('Theme toggle clicked');
            toggleThemeFunction();
        });
    }
    
    // Create a global toggleTheme function for onclick attributes
    function toggleThemeFunction() {
        const root = document.documentElement;
        const themeIcon = document.querySelector('#theme-toggle i');
        
        // Toggle theme class
        root.classList.toggle('light-theme');
        
        // Toggle icon and logo images
        if (root.classList.contains('light-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
            
            // Update logo and signature images for light theme
            document.querySelectorAll('#logo-image, .footer-logo img').forEach(img => {
                img.src = 'Dick Wray Images/dickwray-logo_INVERTED.png';
            });
            document.querySelectorAll('.signature-image').forEach(img => {
                img.src = 'Dick Wray Images/Signature_black.png';
            });
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
            
            // Update logo and signature images for dark theme
            document.querySelectorAll('#logo-image, .footer-logo img').forEach(img => {
                img.src = 'Dick Wray Images/dickwray-logo_white.png';
            });
            document.querySelectorAll('.signature-image').forEach(img => {
                img.src = 'Dick Wray Images/Signature_white.png';
            });
        }
    }
    
    // Make toggleTheme function globally available for onclick attributes
    window.toggleTheme = toggleThemeFunction;
    
    // Form submission with Formspree integration
    const form = document.getElementById('contact-form');
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Check if input has a value on load (for browser autofill)
        if (input.value !== '') {
            input.nextElementSibling.classList.add('active');
        }
        
        // Handle input changes
        input.addEventListener('input', function() {
            if (this.value !== '') {
                this.nextElementSibling.classList.add('active');
            } else {
                this.nextElementSibling.classList.remove('active');
            }
        });
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple validation
        let isValid = true;
        formInputs.forEach(input => {
            if (input.value.trim() === '') {
                isValid = false;
                input.style.borderBottom = '1px solid red';
            } else {
                input.style.borderBottom = '1px solid var(--accent-color)';
            }
        });
        
        if (isValid) {
            // Display sending status
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Show success message
            const successMessage = document.getElementById('form-success');
            
            // Submit the form to Formspree
            const formData = new FormData(form);
            
            fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Reset form
                    form.reset();
                    formInputs.forEach(input => {
                        input.nextElementSibling.classList.remove('active');
                        input.style.borderBottom = '1px solid rgba(255, 255, 255, 0.3)';
                    });
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                    
                    // Display success message
                    successMessage.classList.add('show');
                    
                    // Close success message when clicking anywhere on it
                    successMessage.addEventListener('click', () => {
                        successMessage.classList.remove('show');
                    });
                    
                    // Auto close after 5 seconds
                    setTimeout(() => {
                        successMessage.classList.remove('show');
                    }, 5000);
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was a problem sending your message. Please try again later.');
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Reveal animations on scroll
    const revealElementsSection = document.querySelectorAll('section');
    
    function reveal() {
        revealElementsSection.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', reveal);
    reveal(); // Check on initial load
    
    // Optional: Preload gallery images for smoother experience
    window.addEventListener('load', () => {
        const imageElements = document.querySelectorAll('img[data-src]');
        imageElements.forEach(img => {
            const newImg = new Image();
            newImg.src = img.dataset.src;
        });
    });
});
