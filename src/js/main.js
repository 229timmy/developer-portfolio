// Import styles
import '../styles/main.scss';

import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Import resume PDF
import resumePDF from '../assets/timothy resume.pdf';

// Set up resume link
document.getElementById('resume-link').href = resumePDF;

// Wait for styles and content to load
document.addEventListener('DOMContentLoaded', () => {
    // Hide content initially
    document.body.style.visibility = 'hidden';
    
    // Initialize smooth scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
});

// Loading animation
window.addEventListener('load', () => {
    // Show content once everything is loaded
    document.body.style.visibility = 'visible';
    
    const loader = document.querySelector('.loader');
    const heroLines = document.querySelectorAll('.hero-title .line');
    
    const tl = gsap.timeline({
        onComplete: () => {
            document.body.style.overflow = 'auto';
            loader.style.display = 'none';
        }
    });
    
    tl.to('.loader-text', {
        duration: 1.2,
        opacity: 0,
        y: -100,
        ease: 'power4.out',
        delay: 1.5
    })
    .to(loader, {
        duration: 1.5,
        y: '-100%',
        ease: 'power4.inOut'
    })
    .from(heroLines, {
        duration: 1.2,
        y: 100,
        opacity: 0,
        stagger: 0.3,
        ease: 'power4.out'
    }, '-=0.5');
});

// Navbar animation
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // When scrolling down & past 100px
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.classList.add('scroll-down');
        navbar.classList.remove('scroll-up');
    } 
    // When scrolling up or at top
    else if (currentScroll < lastScroll || currentScroll < 100) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Add scroll animations for work section
const projects = document.querySelectorAll('.project');

projects.forEach((project, index) => {
    gsap.from(project, {
        scrollTrigger: {
            trigger: project,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        delay: index * 0.2
    });
});

// About section animations
gsap.from('.about-text .section-title', {
    scrollTrigger: {
        trigger: '.about-text',
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
});

gsap.from('.bio', {
    scrollTrigger: {
        trigger: '.bio',
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: 'power4.out'
});

gsap.from('.skills', {
    scrollTrigger: {
        trigger: '.skills',
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.4,
    ease: 'power4.out'
});

gsap.from('.about-image', {
    scrollTrigger: {
        trigger: '.about-image',
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
    },
    x: 100,
    opacity: 0,
    duration: 1.2,
    ease: 'power4.out'
});

// Animate skill tags on hover
const tags = document.querySelectorAll('.tag');
tags.forEach(tag => {
    tag.addEventListener('mouseover', () => {
        gsap.to(tag, {
            y: -5,
            duration: 0.2,
            ease: 'power2.out'
        });
    });
    
    tag.addEventListener('mouseout', () => {
        gsap.to(tag, {
            y: 0,
            duration: 0.2,
            ease: 'power2.out'
        });
    });
});

// Contact section animations
gsap.from('.contact-info', {
    scrollTrigger: {
        trigger: '.contact-info',
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
    },
    x: -50,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
});

gsap.from('.contact-form', {
    scrollTrigger: {
        trigger: '.contact-form',
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
    },
    x: 50,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
});

// Form submission handling
const form = document.getElementById('contact-form');
const successMessage = document.querySelector('.message-success');
const successContent = document.querySelector('.success-content');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.disabled = true;

    try {
        const formData = new FormData(form);
        const response = await fetch('https://formspree.io/f/xnnndldp', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Show success message
            successMessage.style.display = 'flex';
            setTimeout(() => {
                successMessage.classList.add('active');
                successContent.classList.add('active');
            }, 100);

            // Reset form
            form.reset();

            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessage.classList.remove('active');
                successContent.classList.remove('active');
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 300);
            }, 3000);
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error sending message. Please try again.');
    }

    submitBtn.disabled = false;
});

// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Animate links
    links.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
            link.classList.remove('fade-in');
        } else {
            link.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1 + 0.2}s`;
            link.classList.add('fade-in');
        }
    });
});

// Close mobile menu when clicking a link
links.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Scroll to top functionality
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Set initial dark theme
body.classList.add('dark-theme');
themeToggle.checked = false;

themeToggle.addEventListener('change', function() {
    if (this.checked) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        document.documentElement.style.setProperty('--bg-primary', '#f8f9fa');
        document.documentElement.style.setProperty('--bg-secondary', '#ffffff');
        document.documentElement.style.setProperty('--text-color', '#1a1a1a');
        document.documentElement.style.setProperty('--accent-color', '#d5573b');
        document.documentElement.style.setProperty('--highlight-color', '#d5573b');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        document.documentElement.style.setProperty('--bg-primary', '#11151c');
        document.documentElement.style.setProperty('--bg-secondary', '#373f51');
        document.documentElement.style.setProperty('--text-color', '#cfd7c7');
        document.documentElement.style.setProperty('--accent-color', '#4a8fe7');
        document.documentElement.style.setProperty('--highlight-color', '#d5573b');
    }
});

// Ensure page starts at top when loaded or refreshed
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

// Alternative method for some browsers
history.scrollRestoration = 'manual';

// Rest of your JavaScript code... 