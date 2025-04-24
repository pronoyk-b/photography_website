# A&P Photography Website

A professional photography website for Anuvab Saha (Videographer) and Pronoy Kumar Biswas (Photographer), featuring different photography services including Ring Ceremony, Wedding, Pre-Wedding, and Model Photography.

## Features

- **Responsive Design**: Fully responsive layout that works seamlessly on all devices (mobile, tablet, desktop)
- **Custom Styling**: Unique visual identity for each photography type
- **Interactive Image Gallery**: 
  - Lightbox functionality for viewing full-size images
  - Animated cross button for closing the lightbox
  - Multiple ways to close (button, Escape key, clicking outside)
- **Dynamic Slideshow**:
  - Smooth fade transitions between images
  - Consistent timing for each slide
  - Manual navigation with dots and arrows
  - Automatic slideshow with reset functionality
- **Elegant Typography**:
  - Smooth typing effect for headings and subheadings
  - Cursor disappears after typing is complete
  - Responsive font sizes across devices
- **Decorative Elements**:
  - SVG decorators for wedding pages
  - Hover animations for interactive elements
- **Organized Image Structure**:
  - Dedicated folders for each photography type
  - Support for up to 10 photos per category
- **Service Cards**: Easy navigation to specialized photography pages
- **Video Sections**: Showcase video content for each photography type
- **Contact Form**: Integrated contact form for client inquiries
- **Smooth Animations**: Carefully crafted transitions and effects

## Project Structure

```
├── index.html                  # Homepage
├── ring-ceremony.html          # Ring Ceremony photography page
├── wedding.html                # Wedding photography page
├── pre-wedding.html            # Pre-Wedding photography page
├── model.html                  # Model photography page
├── generate-placeholders.html  # Tool to generate placeholder images
├── css/
│   ├── style.css               # Main stylesheet with global styles
│   ├── ring-ceremony.css       # Ring Ceremony specific styles
│   ├── wedding.css             # Wedding specific styles
│   ├── pre-wedding.css         # Pre-Wedding specific styles
│   ├── model.css               # Model specific styles
│   └── lightbox.css            # Lightbox functionality styles
├── js/
│   ├── script.js               # Main JavaScript functionality
│   └── lightbox.js             # Lightbox popup functionality
├── images/                     # Image assets and placeholders
│   ├── model/                  # Model photography images (model 1.jpg, model 2.jpg, etc.)
│   ├── wedding/                # Wedding photography images (wedding 1.jpg, wedding 2.jpg, etc.)
│   ├── pre-wedding/            # Pre-wedding photography images (pre-wedding 1.jpg, etc.)
│   ├── ring-ceremony/          # Ring ceremony photography images (ring-ceremony 1.jpg, etc.)
│   ├── decorator.svg           # Elegant SVG decorator for wedding pages
│   ├── kolka-underline.svg     # SVG for wedding page underline
│   ├── ring-ceremony-decoration.svg
│   ├── ring-ceremony-underline.svg
│   └── wedding-decoration.svg
├── slideshow_homepage/         # Slideshow images for homepage
└── videos/                     # Video files for each photography type
```

## Setup Instructions

1. Download all the files and maintain the folder structure.
2. Open `index.html` in a web browser to view the website.
3. To add real images:
   - Add your photography images to the appropriate folders:
     - `images/wedding/` - Wedding photos (named "wedding 1.jpg", "wedding 2.jpg", etc.)
     - `images/pre-wedding/` - Pre-wedding photos (named "pre-wedding 1.jpg", etc.)
     - `images/model/` - Model photos (named "model 1.jpg", "model 2.jpg", etc.)
     - `images/ring-ceremony/` - Ring ceremony photos (named "ring-ceremony 1.jpg", etc.)
   - Replace placeholder images in the `slideshow_homepage/` folder for the homepage slideshow
   - Add actual videos to the `videos/` folder
4. The website supports up to 10 photos for each photography type

## Placeholder Images

The website currently uses placeholder images. To generate placeholder images:

1. Open `generate-placeholders.html` in a web browser
2. Right-click on each image and select "Save image as..." to download
3. Save the images to their respective folders

## Customization

### To change colors:

Edit the CSS variables in the `:root` section of `css/style.css` to change the global color scheme.

### To add more images:

1. Add new images to the appropriate folders following the naming convention:
   - `images/wedding/wedding X.jpg` (where X is the number)
   - `images/pre-wedding/pre-wedding X.jpg`
   - `images/model/model X.jpg`
   - `images/rice-ceremony/rice-ceremony X.jpg`
2. The website automatically displays images from these folders
3. For adding more than 10 images, modify the gallery sections in the respective HTML files

### To modify the typing effect:

1. Edit the typing speed in `css/style.css` by changing the `steps()` values in the animations
2. Adjust the timing of cursor disappearance by modifying the iteration count in the blink animations
3. Change the text content in the respective HTML files

### To customize the lightbox:

1. Edit the `css/lightbox.css` file to change the appearance of the popup
2. Modify the close button animation in the pulse keyframes
3. Adjust the transition timing for smoother or faster animations

### To add more pages:

1. Create a new HTML file based on the existing templates
2. Create a corresponding CSS file if needed
3. Update the navigation links in all HTML files
4. Add appropriate typing effects and lightbox functionality

## Technologies Used

- **HTML5**: Semantic markup for structure
- **CSS3**: 
  - Advanced animations and transitions
  - Custom keyframe animations for typing effects
  - Responsive design with media queries
  - CSS variables for consistent theming
- **JavaScript**: 
  - Interactive slideshow functionality
  - Lightbox image popup system
  - Typing effect timing and control
  - Event handling for user interactions
- **Bootstrap 5**: Responsive grid system and components
- **Google Fonts**: Typography enhancements
- **Bootstrap Icons**: Vector icons for UI elements
- **SVG Graphics**: Custom decorative elements

## Browser Compatibility

The website is compatible with:
- Google Chrome (recommended for best animation performance)
- Mozilla Firefox
- Microsoft Edge
- Safari
- Opera

## Special Features

### Typing Effect
The website features a custom typing effect that creates the illusion of text being typed in real-time:
- Main headings type first, followed by subheadings
- Cursor blinks during typing and disappears after completion
- Different timing for different sections creates a natural flow
- Responsive across all device sizes

### Image Lightbox
The image gallery includes a sophisticated lightbox system:
- Click any gallery image to view it in full size
- Animated opening and closing transitions
- Pulsing close button with rotation effect on hover
- Multiple ways to close: button, Escape key, or clicking outside
- Prevents scrolling of background content when open

### Elegant Decorators
The wedding pages feature elegant SVG decorators that enhance the visual appeal:
- Subtle animations on hover
- Positioned strategically to frame important content
- Responsive scaling across different screen sizes

## Contact

For any questions or support, please contact:
- Email: info@anphotography.com
- Phone: +91 1234567890
