const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const value = dropdown.querySelector('.dropdown__value');
    const list = dropdown.querySelector('.dropdown__list');

    value.addEventListener('click', function(event) {
        event.stopPropagation();
        list.classList.toggle('dropdown__list_active');
    });

    const links = dropdown.querySelectorAll('.dropdown__link');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const newValue = this.textContent.trim();
            value.textContent = newValue;
            list.classList.remove('dropdown__list_active');
        });
    });
});