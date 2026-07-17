var typed = new Typed('.text', {
    strings: ["Web Designer", "Frontend Developer", "Content Creator"],
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