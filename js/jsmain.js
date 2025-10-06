// This script controls the horizontal scrolling/carousel effect on the homepage.
// It now uses CSS Custom Properties (--scroll-offset) and classes for animation.

const sections = document.querySelector(".sections");
const cards = document.querySelectorAll(".section-card");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

// Check if elements exist before proceeding
if (sections && cards.length > 0 && nextBtn && prevBtn) {
    
    let activeIndex = 0; // starting focus index
    let visibleCards = 4; // number of cards visible at a time
    let cardWidth = 0;

    // Set the card width after the page loads to ensure CSS values are correct
    window.addEventListener("load", () => {
        if (cards[0]) {
            // Card width (200px) + margin-right (20px) = 220px in our CSS.
            cardWidth = cards[0].offsetWidth + 20; 
            updateFocus();
        }
    });

    function updateFocus() {
        // Sets the CSS Custom Property for Transform. 
        // This is read by the .sections[data-scroll-offset] CSS rule for smooth movement.
        sections.style.setProperty("--scroll-offset", `-${activeIndex * cardWidth}px`);
        
        cards.forEach((card, index) => {
            card.classList.remove("active");
            card.classList.remove("inactive-card"); // Clean up existing classes
            
            // Determine which cards should be visible/active
            if (index >= activeIndex && index < activeIndex + visibleCards) {
                card.classList.add("active"); // CSS handles opacity: 1 and scale
            } else {
                card.classList.add("inactive-card"); // CSS handles opacity: 0.4 and scale
            }
        });
    }

    // Next button logic
    nextBtn.addEventListener("click", () => {
        activeIndex++;
        if (activeIndex > cards.length - visibleCards) {
            activeIndex = 0; // loop back to first
        }
        updateFocus();
    });

    // Previous button logic
    prevBtn.addEventListener("click", () => {
        activeIndex--;
        if (activeIndex < 0) {
            activeIndex = cards.length - visibleCards; // loop to last set
        }
        updateFocus();
    });
}