document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuSpans = menuToggle.querySelectorAll('span');
    
    let isMenuOpen = false;
    
    menuToggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        mobileMenu.classList.toggle('active');
        
        // Animate hamburger to X
        if (isMenuOpen) {
            menuSpans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            menuSpans[1].style.opacity = '0';
            menuSpans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            menuSpans[0].style.transform = 'none';
            menuSpans[1].style.opacity = '1';
            menuSpans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !e.target.closest('.mobile-menu') && !e.target.closest('.menu-toggle')) {
            isMenuOpen = false;
            mobileMenu.classList.remove('active');
            menuSpans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    });

    // Quick shop buttons
    const quickShopButtons = document.querySelectorAll('.quick-shop');
    quickShopButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.parentElement.querySelector('h3').textContent;
            const price = button.parentElement.querySelector('.price').textContent;
            
            // Update cart count
            const cartCount = document.querySelector('.cart-count');
            cartCount.textContent = parseInt(cartCount.textContent) + 1;
            
            // Show add to cart notification
            showNotification(`Added ${productName} to cart`);
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // Simulate form submission
            showNotification('Thank you for subscribing!');
            newsletterForm.reset();
        });
    }

    // Notification system
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: 'var(--primary-color)',
            color: 'var(--secondary-color)',
            padding: '1rem 2rem',
            borderRadius: '4px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            zIndex: '1000',
            transition: 'opacity 0.3s ease',
            opacity: '0'
        });

        document.body.appendChild(notification);
        
        // Fade in
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (isMenuOpen) {
                    isMenuOpen = false;
                    mobileMenu.classList.remove('active');
                    menuSpans.forEach(span => {
                        span.style.transform = 'none';
                        span.style.opacity = '1';
                    });
                }
            }
        });
    });

    // Header scroll behavior
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            return;
        }
        
        if (currentScroll > lastScroll && !isMenuOpen) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });
}); 