// Находим все контейнеры ротаторов
const rotators = document.querySelectorAll('.rotator');
rotators.forEach(rotator => {
    const cases = rotator.querySelectorAll('.rotator__case');
    if (cases.length === 0) return;
    let activeIndex = 0;
    cases.forEach((el, idx) => {
        if (el.classList.contains('rotator__case_active')) {
            activeIndex = idx;
        }
    });
    const firstActive = cases[activeIndex];
    if (firstActive.dataset.color) {
        firstActive.style.color = firstActive.dataset.color;
    }

    function switchToNext() {
        cases[activeIndex].classList.remove('rotator__case_active');
        activeIndex = (activeIndex + 1) % cases.length;
        const currentCase = cases[activeIndex];
        currentCase.classList.add('rotator__case_active');
        if (currentCase.dataset.color) {
            currentCase.style.color = currentCase.dataset.color;
        } else {
            currentCase.style.color = '';
        }

        let speed = parseInt(currentCase.dataset.speed, 10);
        if (isNaN(speed) || speed <= 0) {
            speed = 1000;
        }

        setTimeout(switchToNext, speed);
    }

    let initialSpeed = parseInt(firstActive.dataset.speed, 10);
    if (isNaN(initialSpeed) || initialSpeed <= 0) {
        initialSpeed = 1000;
    }
    setTimeout(switchToNext, initialSpeed);
});