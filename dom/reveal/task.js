const revealElements = document.querySelectorAll('.reveal');

function checkVisibility() {
    const windowHeight = window.innerHeight;
    for (const element of revealElements) {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < windowHeight && rect.bottom > 0;
        if (isVisible) {
            element.classList.add('reveal_active');
        }
    }
}

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);