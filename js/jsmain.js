// This script controls the horizontal scrolling/carousel effect on the homepage.

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
            // Using offsetWidth is the dynamic, better way to calculate this.
            cardWidth = cards[0].offsetWidth + 20; 
            updateFocus();
        }
    });

    function updateFocus() {
      cards.forEach((card, index) => {
        card.classList.remove("active");
        card.style.opacity = "0.5";
        
        // Determine which cards should be visible/active
        if (index >= activeIndex && index < activeIndex + visibleCards) {
          card.classList.add("active");
          card.style.opacity = "1";
        }
      });
      // Apply the scroll animation (translateX)
      sections.style.transform = `translateX(-${activeIndex * cardWidth}px)`;
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