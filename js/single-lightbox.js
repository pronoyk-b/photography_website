// Single Lightbox Solution
// This script completely replaces both lightbox.js and enhanced-lightbox.js

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // First, remove any existing lightboxes to avoid duplicates
    const existingLightboxes = document.querySelectorAll('#lightbox');
    existingLightboxes.forEach(box => box.remove());
    
    // Create a single lightbox element
    const lightboxHTML = `
        <div id="lightbox" class="lightbox">
            <div class="lightbox-content">
                <span class="close-lightbox" onclick="closeLightbox()"></span>
                <img id="lightbox-img" class="lightbox-img">
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    // Add click event to all gallery images
    setupGalleryClicks();
});

// Set up click events for all gallery images
function setupGalleryClicks() {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        // Remove any existing click handlers to avoid duplicates
        img.removeEventListener('click', imageClickHandler);
        img.addEventListener('click', imageClickHandler);
        
        // Make parent div clickable too
        const parentDiv = img.parentElement;
        if (parentDiv && parentDiv.classList.contains('gallery-item')) {
            parentDiv.removeEventListener('click', divClickHandler);
            parentDiv.addEventListener('click', divClickHandler);
            parentDiv.setAttribute('data-img-src', img.src);
        }
    });
}

// Handler for image clicks
function imageClickHandler(e) {
    e.stopPropagation();
    openLightbox(this);
}

// Handler for div clicks
function divClickHandler(e) {
    // Only trigger if the click was directly on the div, not on the img
    if (e.target === this) {
        e.stopPropagation();
        const imgSrc = this.getAttribute('data-img-src');
        if (imgSrc) {
            const img = this.querySelector('img');
            if (img) {
                openLightbox(img);
            }
        }
    }
}

// Open the lightbox
function openLightbox(img) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    if (!lightbox || !lightboxImg) return;
    
    // Set the image source
    lightboxImg.src = img.src;
    
    // Show the lightbox with animation
    lightbox.style.display = 'flex';
    setTimeout(() => {
        lightbox.classList.add('show');
    }, 10);
    
    // Prevent scrolling on the body
    document.body.style.overflow = 'hidden';
    
    // Add event listener to close on escape key
    document.addEventListener('keydown', closeLightboxOnEscape);
    
    // Add event listener to close on click outside the image
    lightbox.addEventListener('click', closeLightboxOnOutsideClick);
}

// Close the lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    // Hide the lightbox with animation
    lightbox.classList.remove('show');
    setTimeout(() => {
        lightbox.style.display = 'none';
    }, 400); // Match transition duration from CSS
    
    // Re-enable scrolling on the body
    document.body.style.overflow = 'auto';
    
    // Remove event listeners
    document.removeEventListener('keydown', closeLightboxOnEscape);
    lightbox.removeEventListener('click', closeLightboxOnOutsideClick);
}

// Close lightbox when pressing Escape key
function closeLightboxOnEscape(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
}

// Close lightbox when clicking outside the image
function closeLightboxOnOutsideClick(e) {
    if (e.target === document.getElementById('lightbox')) {
        closeLightbox();
    }
}
