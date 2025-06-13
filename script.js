// DOM Elements
const nav = document.querySelector('nav');
const mobileMenuBtn = document.querySelector('nav button');
const mobileMenu = document.querySelector('.md\\:flex');
const sections = document.querySelectorAll('section');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
    mobileMenu.classList.toggle('flex-col');
    mobileMenu.classList.toggle('absolute');
    mobileMenu.classList.toggle('top-full');
    mobileMenu.classList.toggle('left-0');
    mobileMenu.classList.toggle('w-full');
    mobileMenu.classList.toggle('bg-black');
    mobileMenu.classList.toggle('p-6');
});

// Scroll Animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.classList.add('section');
    observer.observe(section);
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('bg-black/90', 'backdrop-blur-sm');
    } else {
        nav.classList.remove('bg-black/90', 'backdrop-blur-sm');
    }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenuBtn.click();
            }
        }
    });
});

// Portfolio Item Click Handler
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', function() {
        const title = this.getAttribute('data-title');
        const description = this.getAttribute('data-description');
        const image = this.querySelector('img').src;
        
        // Create and show modal
        showPortfolioModal(title, description, image);
    });
});

// Portfolio Modal
function showPortfolioModal(title, description, image) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-neutral-900 max-w-4xl w-full p-6 rounded-lg relative">
            <button class="absolute top-4 right-4 text-white hover:text-blue-600 transition-colors">
                ✕
            </button>
            <img src="${image}" alt="${title}" class="w-full h-64 object-cover mb-6">
            <h3 class="text-2xl font-bold mb-4">${title}</h3>
            <p class="text-gray-300">${description}</p>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal
    modal.querySelector('button').addEventListener('click', () => {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
    });
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }
    });
}

// Page Load Animation
window.addEventListener('load', () => {
    document.body.classList.add('animate-fade-in');
});

// Cursor Animation (Optional)
const cursor = document.createElement('div');
cursor.className = 'fixed w-4 h-4 border-2 border-white rounded-full pointer-events-none mix-blend-difference z-50 transition-transform duration-100 ease-out';
document.body.appendChild(cursor);

let cursorX = -100;
let cursorY = -100;

document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    cursor.style.transform = `translate(${cursorX - 8}px, ${cursorY - 8}px)`;
});

// Hover effect for interactive elements
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('scale-150');
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('scale-150');
    });
});
