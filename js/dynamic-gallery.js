// Dynamic Gallery Loader
document.addEventListener('DOMContentLoaded', function() {
    // Wait a short time to ensure masonry-gallery.js has run first
    setTimeout(loadGalleryImages, 100);
});

function loadGalleryImages() {
    // Determine which page we're on and set the appropriate folder path
    let imageFolderPath = '';
    let galleryContainer = document.querySelector('.gallery-section .row');
    
    if (!galleryContainer) return; // Exit if no gallery container found
    
    // Determine which page we're on based on the URL or page title
    const currentPath = window.location.pathname;
    const pageTitle = document.title.toLowerCase();
    
    // Check for pre-wedding first (since 'wedding' is a substring of 'pre-wedding')
    if (currentPath.includes('pre-wedding') || pageTitle.includes('pre-wedding')) {
        imageFolderPath = 'images/pre-wedding/';
    } else if (currentPath.includes('ring-ceremony') || pageTitle.includes('ring ceremony')) {
        imageFolderPath = 'images/ring-ceremony/';
    } else if (currentPath.includes('wedding') || pageTitle.includes('wedding')) {
        imageFolderPath = 'images/wedding/';
    } else if (currentPath.includes('model') || pageTitle.includes('model')) {
        imageFolderPath = 'images/model/';
    } else {
        return; // Exit if we can't determine the page
    }
    
    // Clear existing gallery items
    galleryContainer.innerHTML = '';
    
    // Function to create a gallery item for masonry layout
    function createGalleryItem(imagePath, index) {
        // Check if we're using the masonry layout
        const masonryGrid = document.querySelector('.masonry-grid');
        
        if (masonryGrid) {
            // For masonry layout, add directly to the grid
            addImageToMasonryGrid(imagePath);
            return null; // Return null as we've already added it
        } else {
            // For traditional layout (fallback)
            // Determine column width based on index for visual variety
            let colClass = 'col-md-4'; // Default is 4 columns
            
            // Every 5th and 6th image will be larger (6 columns)
            if (index % 6 === 4 || index % 6 === 5) {
                colClass = 'col-md-6';
            }
            
            // Create gallery item HTML
            const galleryItem = document.createElement('div');
            galleryItem.className = colClass;
            
            galleryItem.innerHTML = `
                <div class="gallery-item">
                    <img src="${imagePath}" alt="Photography" class="img-fluid gallery-image" onclick="openLightbox(this)">
                </div>
            `;
            
            return galleryItem;
        }
    }
    
    // Fetch the list of images from the server
    // Since we can't directly read the directory in client-side JavaScript,
    // we'll simulate this by generating paths based on a pattern
    
    // For ring ceremony, wedding, pre-wedding, and model pages
    // We'll dynamically generate paths based on the naming pattern in each folder
    const imageExtensions = ['.jpg', '.jpeg', '.png'];
    let imageCount = 0;
    
    // Function to check if an image exists
    function checkImageExists(imagePath, callback) {
        const img = new Image();
        img.onload = function() { callback(true); };
        img.onerror = function() { callback(false); };
        img.src = imagePath;
    }
    
    // Function to try loading images with different naming patterns
    function tryLoadingImages() {
        let baseNames = [];
        
        if (imageFolderPath.includes('pre-wedding')) {
            baseNames = ['pre-wedding'];
        } else if (imageFolderPath.includes('ring-ceremony')) {
            baseNames = ['ring_ceremony'];
        } else if (imageFolderPath.includes('wedding')) {
            baseNames = ['wedding'];
        } else if (imageFolderPath.includes('model')) {
            baseNames = ['model'];
        }
        
        // List of model photos to exclude
        const excludedModelPhotos = [12, 16, 17, 18, 19, 20, 21];
        
        baseNames.forEach(baseName => {
            for (let i = 1; i <= 30; i++) {
                // Skip excluded model photos
                if (baseName === 'model' && excludedModelPhotos.includes(i)) continue;
                
                imageExtensions.forEach(ext => {
                    const imagePath = `${imageFolderPath}${baseName} (${i})${ext}`;
                    
                    checkImageExists(imagePath, function(exists) {
                        if (exists) {
                            const galleryItem = createGalleryItem(imagePath, imageCount);
                            if (galleryItem) {
                                galleryContainer.appendChild(galleryItem);
                            }
                            imageCount++;
                        }
                    });
                    
                    const alternateImagePath = `${imageFolderPath}${baseName} ${i}${ext}`;
                    
                    checkImageExists(alternateImagePath, function(exists) {
                        if (exists) {
                            const galleryItem = createGalleryItem(alternateImagePath, imageCount);
                            if (galleryItem) {
                                galleryContainer.appendChild(galleryItem);
                            }
                            imageCount++;
                        }
                    });
                });
            }
        });
    }
    
    // Start loading images
    tryLoadingImages();
}
