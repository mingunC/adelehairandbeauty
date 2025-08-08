document.addEventListener('DOMContentLoaded', () => {
    // ========== Mobile Navigation Toggle ==========
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navList = document.querySelector('nav ul');

    if (mobileNavToggle && navList) {
        mobileNavToggle.addEventListener('click', () => {
            mobileNavToggle.classList.toggle('active');
            navList.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav') && navList.classList.contains('active')) {
                mobileNavToggle.classList.remove('active');
                navList.classList.remove('active');
            }
        });

        const navLinks = navList.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavToggle.classList.remove('active');
                navList.classList.remove('active');
            });
        });
    }

    // ========== Scroll event (navbar, booking-link) ==========
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const button = document.querySelector('.booking-link');

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (button) {
            button.style.backgroundColor = '#2C233A';
        }
    });
});

window.toggleService = function(element, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const content = element.nextElementSibling;
    const icon = element.querySelector('.toggle-icon');

    // Close other service contents
    const allContents = document.querySelectorAll('.service-content');
    const allIcons = document.querySelectorAll('.toggle-icon');
    
    allContents.forEach((item, index) => {
        if (item !== content) {
            item.classList.remove('active');
            if (allIcons[index]) {
                allIcons[index].textContent = '+';
            }
        }
    });

    // Toggle current content
    content.classList.toggle('active');
    icon.textContent = content.classList.contains('active') ? '−' : '+';

    // Scroll into view with a slight delay to ensure content is visible
    if (content.classList.contains('active')) {
        setTimeout(() => {
            const headerOffset = 100; // Adjust this value based on your header height
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }, 50);
    }
};

window.toggleSubCategory = function(element, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const content = element.nextElementSibling;
    const icon = element.querySelector('.sub-toggle-icon');

    // Toggle current sub-category content
    content.classList.toggle('active');
    icon.textContent = content.classList.contains('active') ? '−' : '+';
};