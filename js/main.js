
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navList = document.querySelector('nav ul');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('nav') && navList.classList.contains('active')) {
            mobileNavToggle.classList.remove('active');
            navList.classList.remove('active');
        }
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNavToggle.classList.remove('active');
            navList.classList.remove('active');
        });
    });

    // Get the home link
    const homeLink = document.querySelector('a[href="#home"]');
    
    // Add click event listener for smooth scrolling to top
    if (homeLink) {
        homeLink.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    window.addEventListener('scroll', function() {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
    
    window.addEventListener('scroll', function() {
        const button = document.querySelector('.booking-link');
        if (window.scrollY > 100) {
            button.style.backgroundColor = '#2C233A'; // Ensure consistent color
        } else {
            button.style.backgroundColor = '#2C233A'; // Ensure consistent color
        }
    });


    document.addEventListener('DOMContentLoaded', function() {
        // Mobile Navigation Toggle
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        const navList = document.querySelector('nav ul');
        
        if (mobileNavToggle && navList) {
            mobileNavToggle.addEventListener('click', () => {
                mobileNavToggle.classList.toggle('active');
                navList.classList.toggle('active');
                console.log('Toggle clicked'); // 디버깅용 로그
            });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && navList.classList.contains('active')) {
                mobileNavToggle.classList.remove('active');
                navList.classList.remove('active');
            }
        });

        const navLinks = document.querySelectorAll('.navbar ul li a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileNavToggle.classList.remove('active');
                    navList.classList.remove('active');
                });
            });
        } else {
            console.error('Mobile nav elements not found'); // 오류 확인용
        }
            
        const homeLink = document.querySelector('a[href="#home"]');
        if (homeLink) {
            homeLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    // Booking link scroll effect (unchanged)
    window.addEventListener('scroll', () => {
        const button = document.querySelector('.booking-link');
        if (button) {
            if (window.scrollY > 100) {
                button.style.backgroundColor = '#2C233A';
            } else {
                button.style.backgroundColor = '#2C233A';
            }
        }
    });

    });

    window.toggleService = function(element) {
        const allServiceContents = document.querySelectorAll('.service-content');
        const allServiceHeaders = document.querySelectorAll('.service-header');
    
        allServiceContents.forEach(content => {
            if (content !== element.nextElementSibling) {
                content.style.display = 'none';
            }
        });
    
        allServiceHeaders.forEach(header => {
            if (header !== element) {
                header.querySelector('.toggle-icon').textContent = '+';
            }
        });
    
        const content = element.nextElementSibling;
        const icon = element.querySelector('.toggle-icon');
    
        if (content.style.display === 'block') {
            content.style.display = 'none';
            icon.textContent = '+';
        } else {
            content.style.display = 'block';
            icon.textContent = '−';
        }
    };





});