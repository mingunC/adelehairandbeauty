document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.stylist-grid');
    const slides = document.querySelectorAll('.stylist-card');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const dotsContainer = document.querySelector('.slider-dots');
    
    // Check if we're on mobile (max-width: 600px)
    const isMobile = () => window.innerWidth <= 600;
    
    let currentSlide = 0;
    const slidesPerView = getVisibleSlides();
    const totalSlides = Math.ceil(slides.length / slidesPerView);
    
    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i * slidesPerView));
        dotsContainer.appendChild(dot);
    }
    
    function getVisibleSlides() {
        // If on mobile, return the total number of slides to prevent sliding
        if (isMobile()) return slides.length;
        
        const containerWidth = slider.parentElement.offsetWidth - 80; // Account for padding
        const slideWidth = slides[0].offsetWidth + 32; // Use actual card width + gap
        return Math.max(1, Math.floor(containerWidth / slideWidth));
    }
    
    function updateSliderPosition() {
        // Skip slider positioning on mobile
        if (isMobile()) {
            slider.style.transform = 'none';
            return;
        }
        
        const slideWidth = slides[0].offsetWidth + 32; // Use actual card width + gap
        const maxSlide = Math.max(0, slides.length - getVisibleSlides());
        currentSlide = Math.min(currentSlide, maxSlide);
        const offset = -currentSlide * slideWidth;
        slider.style.transform = `translateX(${offset}px)`;
        
        // Update dots
        document.querySelectorAll('.slider-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === Math.floor(currentSlide / getVisibleSlides()));
        });
        
        // Update navigation buttons
        prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentSlide >= maxSlide ? '0.5' : '1';
    }
    
    function goToSlide(index) {
        // Skip on mobile
        if (isMobile()) return;
        
        currentSlide = Math.min(Math.max(index, 0), slides.length - getVisibleSlides());
        updateSliderPosition();
    }
    
    function nextSlide() {
        // Skip on mobile
        if (isMobile()) return;
        
        if (currentSlide < slides.length - getVisibleSlides()) {
            currentSlide++;
            updateSliderPosition();
        }
    }
    
    function prevSlide() {
        // Skip on mobile
        if (isMobile()) return;
        
        if (currentSlide > 0) {
            currentSlide--;
            updateSliderPosition();
        }
    }
    
    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Recalculate everything on resize
        updateSliderPosition();
        
        // Skip dot recreation on mobile
        if (isMobile()) {
            dotsContainer.style.display = 'none';
            return;
        } else {
            dotsContainer.style.display = 'flex';
        }
        
        // Recreate dots based on new slidesPerView
        const newSlidesPerView = getVisibleSlides();
        const newTotalSlides = Math.ceil(slides.length / newSlidesPerView);
        
        // Clear existing dots
        dotsContainer.innerHTML = '';
        
        // Create new dots
        for (let i = 0; i < newTotalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('slider-dot');
            if (i === Math.floor(currentSlide / newSlidesPerView)) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i * newSlidesPerView));
            dotsContainer.appendChild(dot);
        }
    });
    
    // Initial position update
    updateSliderPosition();
    
    // Optional: Touch/Swipe support - disabled on mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', e => {
        // Skip on mobile
        if (isMobile()) return;
        
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    slider.addEventListener('touchend', e => {
        // Skip on mobile
        if (isMobile()) return;
        
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        // Skip on mobile
        if (isMobile()) return;
        
        const difference = touchStartX - touchEndX;
        if (Math.abs(difference) > 50) { // Minimum swipe distance
            if (difference > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
});
