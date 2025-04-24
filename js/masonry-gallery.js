// Masonry Gallery Layout Handler
document.addEventListener('DOMContentLoaded', function() {
    // Convert existing gallery to masonry layout
    setupMasonryGallery();
    
    // Set up resize handler for window resize events
    window.addEventListener('resize', debounce(function() {
        resizeAllMasonryItems();
    }, 250));
});

// Function to set up the masonry gallery
function setupMasonryGallery() {
    // Find the gallery container
    const galleryContainer = document.querySelector('.gallery-section .row');
    if (!galleryContainer) return;
    
    // Create a new masonry grid container
    const masonryGrid = document.createElement('div');
    masonryGrid.className = 'masonry-grid';
    
    // Get all existing gallery items
    const galleryItems = galleryContainer.querySelectorAll('.gallery-item');
    
    // Process each gallery item
    galleryItems.forEach(function(item) {
        // Get the parent column
        const parentCol = item.closest('[class*="col-"]');
        if (!parentCol) return;
        
        // Get the image from the gallery item
        const img = item.querySelector('img');
        if (!img) return;
        
        // Create a new masonry item
        const masonryItem = document.createElement('div');
        masonryItem.className = 'masonry-item';
        
        // Clone the image and add it to the masonry item
        const newImg = img.cloneNode(true);
        masonryItem.appendChild(newImg);
        
        // Add click event for lightbox
        masonryItem.addEventListener('click', function() {
            openLightbox(newImg);
        });
        
        // Add the masonry item to the grid
        masonryGrid.appendChild(masonryItem);
    });
    
    // Replace the original gallery with the masonry grid
    galleryContainer.innerHTML = '';
    galleryContainer.appendChild(masonryGrid);
    
    // Initialize the masonry layout
    resizeAllMasonryItems();
    
    // Handle dynamic gallery loading
    observeGalleryChanges(masonryGrid);
}

// Function to resize all masonry items based on their content
function resizeAllMasonryItems() {
    // Get all masonry items
    const allItems = document.querySelectorAll('.masonry-item');
    
    // Resize each item
    allItems.forEach(function(item) {
        resizeMasonryItem(item);
    });
}

// Function to resize a single masonry item
function resizeMasonryItem(item) {
    // Get the grid row height
    const grid = document.querySelector('.masonry-grid');
    if (!grid) return;
    
    const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap')) || 20;
    
    // Get the content height
    const img = item.querySelector('img');
    if (!img) return;
    
    // Create a temporary image to get the natural dimensions
    const tempImg = new Image();
    tempImg.src = img.src;
    
    tempImg.onload = function() {
        const ratio = tempImg.naturalHeight / tempImg.naturalWidth;
        const contentHeight = item.getBoundingClientRect().width * ratio;
        
        // Calculate the number of rows the item should span
        const rowSpan = Math.ceil((contentHeight + rowGap) / (rowHeight + rowGap));
        
        // Set the grid row end property
        item.style.gridRowEnd = 'span ' + rowSpan;
    };
}

// Function to handle dynamically added gallery items
function observeGalleryChanges(masonryGrid) {
    // Create a new MutationObserver
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Process new nodes
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && node.classList.contains('masonry-item')) {
                        resizeMasonryItem(node);
                    }
                });
            }
        });
    });
    
    // Start observing the masonry grid
    observer.observe(masonryGrid, { childList: true });
}

// Function to add a new image to the masonry grid
function addImageToMasonryGrid(imagePath) {
    const masonryGrid = document.querySelector('.masonry-grid');
    if (!masonryGrid) return;
    
    // Create a new masonry item
    const masonryItem = document.createElement('div');
    masonryItem.className = 'masonry-item';
    
    // Create a new image
    const img = document.createElement('img');
    img.src = imagePath;
    img.alt = 'Photography';
    img.className = 'gallery-image';
    
    // Add the image to the masonry item
    masonryItem.appendChild(img);
    
    // Add click event for lightbox
    masonryItem.addEventListener('click', function() {
        openLightbox(img);
    });
    
    // Add the masonry item to the grid
    masonryGrid.appendChild(masonryItem);
    
    // Resize the masonry item
    resizeMasonryItem(masonryItem);
}

// Utility function to debounce events
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}
