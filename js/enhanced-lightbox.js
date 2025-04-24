// Enhanced Lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
    // Remove any existing lightbox elements first
    const existingLightbox = document.getElementById('lightbox');
    if (existingLightbox) {
        existingLightbox.remove();
    }
    
    // Create enhanced lightbox element
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
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this);
        });
        
        // Make parent div clickable too
        img.parentElement.addEventListener('click', function(e) {
            // Only trigger if the click was directly on the div, not on the img
            if (e.target === this) {
                openLightbox(img);
            }
        });
    });
});

// Open the lightbox
function openLightbox(img) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
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
