import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

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

// Loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    const heroLines = document.querySelectorAll('.hero-title .line');
    
    const tl = gsap.timeline();
    
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
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.setAttribute('aria-label', 'Sending message...');
    submitBtn.disabled = true;
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('http://localhost:3001/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Success
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
        submitBtn.setAttribute('aria-label', 'Message sent!');
        form.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
            submitBtn.setAttribute('aria-label', 'Send message');
            submitBtn.disabled = false;
        }, 3000);

    } catch (error) {
        console.error('Error:', error);
        submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
        submitBtn.setAttribute('aria-label', 'Error sending message');
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
            submitBtn.setAttribute('aria-label', 'Send message');
            submitBtn.disabled = false;
        }, 3000);
    }
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