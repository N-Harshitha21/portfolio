document.addEventListener('DOMContentLoaded', () => {

    // Navbar Toggle for Mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');

        // Animate Links
        links.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Close mobile menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');
            }
        });
    });

    // Smooth Scrolling for Anchors (Polyfill for older browsers/Safari)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Animation (Fade In Elements on Scroll)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');

                // Trigger tech keywords animation if container is viewed
                // Trigger tech keywords animation
                // Check if the intersecting element contains keywords or IS the container
                if (entry.target.classList.contains('about-text') || entry.target.querySelector('.tech-keyword')) {
                    const keywords = entry.target.querySelectorAll('.tech-keyword');
                    keywords.forEach((keyword, index) => {
                        // Only animate if not already animated
                        if (!keyword.classList.contains('popped')) {
                            keyword.style.animationDelay = `${index * 0.25}s`; /* Slower stagger for distinct "one by one" effect */
                            keyword.classList.add('popped');
                        }
                    });
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.section, .project-card, .skill-category, .timeline-item, .about-text');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add class for visible state styles
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        @keyframes navLinkFade {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0); }
        }
        .toggle .bar:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        .toggle .bar:nth-child(2) {
            opacity: 0;
        }
        .toggle .bar:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    `;
    document.head.appendChild(style);
});
