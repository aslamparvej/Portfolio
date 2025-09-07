// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;

    // Loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

        setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            this.reset();
        }, 3000);
    }, 2000);
});

// Typing animation for code
const codeLines = document.querySelectorAll('.code-line');
let delay = 0;

codeLines.forEach((line, index) => {
    setTimeout(() => {
        line.style.animation = 'none';
        line.style.overflow = 'hidden';
        line.style.borderRight = '2px solid #fff';
        line.style.whiteSpace = 'nowrap';
        line.style.animation = `typing 2s steps(${line.textContent.length}) forwards`;

        setTimeout(() => {
            line.style.borderRight = 'none';
        }, 2000);
    }, delay);
    delay += 500;
});

// Add typing keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes typing {
        from {width: 0; }
    to {width: 100%; }
            }
    `;
document.head.appendChild(style);

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero::before');
    if (parallax) {
        const speed = 0.5;
        parallax.style.transform = `translateY(${scrolled * speed}px)`;
    }
});

// Add hover effects to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-12px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add subtle animation to skills
const skills = document.querySelectorAll('.skill');
skills.forEach((skill, index) => {
    skill.style.animationDelay = `${index * 0.1}s`;
    skill.style.animation = 'fadeInUp 0.6s ease forwards';
});

// Counter animation for stats
const stats = document.querySelectorAll('.stat-number');
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target === 100 ? '%' : target === 2.5 ? '' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target === 100 ? '%' : target === 2.5 ? '' : '+');
        }
    }, 30);
};

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = stat.textContent.includes('%') ? 100 :
                    stat.textContent.includes('2.5') ? 2.5 : 25;
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelector('.stats')?.let(stats => statsObserver.observe(stats));

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});