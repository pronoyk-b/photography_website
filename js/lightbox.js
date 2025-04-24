// Lightbox functionality
function openLightbox(img) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    // Set the image source
    lightboxImg.src = img.src;
    
    // Show the lightbox
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
    }, 300);
    
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

// Initialize lightbox when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if lightbox element exists
    if (!document.getElementById('lightbox')) {
        // Create lightbox element if it doesn't exist
        const lightboxHTML = `
            <div id="lightbox" class="lightbox">
                <div class="lightbox-content">
                    <span class="close-lightbox" onclick="closeLightbox()">&times;</span>
                    <img id="lightbox-img" class="lightbox-img">
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }
});
