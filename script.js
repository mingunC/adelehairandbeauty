// Mobile Navigation Toggle
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navList = document.querySelector('nav ul');

mobileNavToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
    mobileNavToggle.classList.toggle('active');
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navList.classList.remove('active');
            mobileNavToggle.classList.remove('active');
        }
    });
});

// Reveal Elements on Scroll
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);

// Service Cards Hover Effect
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('hover');
    });
    card.addEventListener('mouseleave', () => {
        card.classList.remove('hover');
    });
});
