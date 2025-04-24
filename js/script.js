// Slideshow functionality
let slideIndex = 1;
let slideshowInterval;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slideshow
    showSlides(slideIndex);
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize animations
    initAnimations();
    
    // Start auto slideshow
    startAutoSlideshow();
    
    // Pause slideshow on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', function() {
            clearInterval(slideshowInterval);
        });
        
        slideshowContainer.addEventListener('mouseleave', function() {
            startAutoSlideshow();
        });
    }
});

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Thumbnail navigation with timing reset
function currentSlideWithReset(n) {
    // Clear existing interval to reset timing
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
    }
    
    // Change to specific slide
    showSlides(slideIndex = n);
    
    // Restart interval
    startAutoSlideshow();
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    
    if (slides.length === 0) return;
    
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    // Remove active class from all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    
    // Remove active dot class
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }
    
    // Add active class to current slide with a smooth transition
    slides[slideIndex-1].classList.add("active");
    dots[slideIndex-1].className += " active-dot";
}

// Variables for slideshow timing
const SLIDE_TRANSITION_DURATION = 2000; // 2 seconds for transition (matches CSS)
const SLIDE_DISPLAY_DURATION = 5000;   // 5 seconds to display each slide
const TOTAL_SLIDE_DURATION = SLIDE_TRANSITION_DURATION + SLIDE_DISPLAY_DURATION; // 7 seconds total

// Start auto slideshow with consistent timing
function startAutoSlideshow() {
    // Clear any existing interval
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
    }
    
    // Set new interval with consistent timing
    slideshowInterval = setInterval(function() {
        plusSlides(1);
    }, TOTAL_SLIDE_DURATION);
}

// Function to manually change slides with consistent timing
function manualSlideChange(n) {
    // Clear existing interval to reset timing
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
    }
    
    // Change slide
    showSlides(slideIndex += n);
    
    // Restart interval
    startAutoSlideshow();
}

// Auto slideshow (legacy function kept for compatibility)
function autoSlideshow() {
    plusSlides(1);
    setTimeout(autoSlideshow, TOTAL_SLIDE_DURATION);
}

// Initialize animations
function initAnimations() {
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.service-card, .about-card, .contact-form');
    
    const revealOnScroll = function() {
        for (let i = 0; i < revealElements.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = revealElements[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                revealElements[i].classList.add('fade-in');
            }
        }
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on load
    
    // Start auto slideshow
    setTimeout(autoSlideshow, 5000);
}

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            const formElements = contactForm.elements;
            for (let i = 0; i < formElements.length; i++) {
                formElements[i].disabled = true;
            }
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Message Sent!';
            
            setTimeout(function() {
                for (let i = 0; i < formElements.length; i++) {
                    formElements[i].disabled = false;
                    if (formElements[i].type !== 'submit') {
                        formElements[i].value = '';
                    }
                }
                submitBtn.textContent = originalText;
            }, 3000);
        });
    }
});
