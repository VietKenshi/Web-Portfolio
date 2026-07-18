var typed = new Typed('.text', {
    strings: ["Pro Gamer", "Content Creator", "DJ"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Automatically add open to menu, if clicked
function toggleMenu() {
    const menu = document.querySelector('.menu-list');
    const icon = document.querySelector('.menu-icon');
    menu.classList.toggle('open');
    icon.classList.toggle('open');
}

// Automatically close menu on window resize if width > 940px
window.addEventListener('resize', function() {
    if (window.innerWidth > 940) {
        const menu = document.querySelector('.menu-list');
        const icon = document.querySelector('.menu-icon');
        if (menu && icon) {
            menu.classList.remove('open');
            icon.classList.remove('open');
        }
    }
});

// Function to replay animations for a section
function replaySectionAnimations(sectionId) {
    if (sectionId === 'about') {
        const aboutSection = document.querySelector('.about');
        const aboutImg = aboutSection.querySelector('.about-img img');
        const aboutTextChildren = aboutSection.querySelectorAll('.about-text h2, .about-text h4, .about-text p, .about-text .btn-box');
        
        if (aboutImg) {
            aboutImg.style.animation = 'none';
            setTimeout(() => {
                aboutImg.style.animation = '';
            }, 5);
        }
        
        aboutTextChildren.forEach((el, index) => {
            el.style.animation = 'none';
            setTimeout(() => {
                el.style.animation = '';
            }, index * 50 + 5);
        });
    }
    
    if (sectionId === 'skills') {
        const skillBars = document.querySelectorAll('.progress-line span');
        skillBars.forEach(bar => {
            bar.classList.remove('animate-skill');
            setTimeout(() => {
                bar.classList.add('animate-skill');
            }, 10);
        });
    }
}

// Add click listeners to navbar links - only for about and skills
document.querySelectorAll('.navbar a, .menu-list a').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').substring(1);
        
        // Only replay animations for about and skills sections
        if (targetId === 'about' || targetId === 'skills') {
            setTimeout(() => {
                replaySectionAnimations(targetId);
            }, 100);
        }
    });
});

// Add click listener to all buttons that link to #about
document.querySelectorAll('a[href="#about"]').forEach(btn => {
    btn.addEventListener('click', function(e) {
        setTimeout(() => {
            replaySectionAnimations('about');
        }, 100);
    });
});

// Debounce map to track section visibility state
const sectionState = {};

// Function to trigger animations on a section
function triggerSectionAnimation(section) {
    if (section.classList.contains('skills')) {
        const skillBars = document.querySelectorAll('.progress-line span');
        skillBars.forEach(bar => {
            bar.classList.remove('animate-skill');
            setTimeout(() => {
                bar.classList.add('animate-skill');
            }, 10);
        });
    }
}

// Intersection Observer - triggers only for skills section when scrolling
const observerOptions = {
    threshold: 0.3
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        const sectionId = entry.target.id;
        
        // Only trigger when section enters view AND wasn't visible before
        if (entry.isIntersecting && !sectionState[sectionId]) {
            sectionState[sectionId] = true;
            triggerSectionAnimation(entry.target);
        } 
        // Mark as not visible when leaving view
        else if (!entry.isIntersecting) {
            sectionState[sectionId] = false;
        }
    });
}, observerOptions);

// Observe only skills section - home animations run once on load
document.querySelectorAll('.skills').forEach(section => {
    observer.observe(section);
});