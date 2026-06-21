// Получаем элемент книги
const book = document.getElementById('book');
const fontSizeControls = document.querySelectorAll('.book__control_font-size .font-size');
fontSizeControls.forEach(control => {
    control.addEventListener('click', function(e) {
        e.preventDefault();

        const parent = this.closest('.book__control_font-size');
        parent.querySelectorAll('.font-size').forEach(el => el.classList.remove('font-size_active'));
        this.classList.add('font-size_active');

        book.classList.remove('book_fs-small', 'book_fs-big');
        const size = this.dataset.size; 
        if (size === 'small') book.classList.add('book_fs-small');
        else if (size === 'big') book.classList.add('book_fs-big');
    });
});

const colorControls = document.querySelectorAll('.book__control_color .color');
colorControls.forEach(control => {
    control.addEventListener('click', function(e) {
        e.preventDefault();

        const parent = this.closest('.book__control_color');
        parent.querySelectorAll('.color').forEach(el => el.classList.remove('color_active'));
        this.classList.add('color_active');

        const classesToRemove = Array.from(book.classList).filter(cls => cls.startsWith('book_color-'));
        classesToRemove.forEach(cls => book.classList.remove(cls));

        const textColor = this.dataset.textColor;
        if (textColor) book.classList.add(`book_color-${textColor}`);
    });
});

const bgControls = document.querySelectorAll('.book__control_background .color');
bgControls.forEach(control => {
    control.addEventListener('click', function(e) {
        e.preventDefault();

        const parent = this.closest('.book__control_background');
        parent.querySelectorAll('.color').forEach(el => el.classList.remove('color_active'));
        this.classList.add('color_active');

        const classesToRemove = Array.from(book.classList).filter(cls => cls.startsWith('book_bg-'));
        classesToRemove.forEach(cls => book.classList.remove(cls));

        const bgColor = this.dataset.bgColor;
        if (bgColor) book.classList.add(`book_bg-${bgColor}`);
    });
});

function initBookState() {
    // Размер
    const activeFontSize = document.querySelector('.book__control_font-size .font-size_active');
    if (activeFontSize) {
        const size = activeFontSize.dataset.size;
        book.classList.remove('book_fs-small', 'book_fs-big');
        if (size === 'small') book.classList.add('book_fs-small');
        else if (size === 'big') book.classList.add('book_fs-big');
    }

    const activeTextColor = document.querySelector('.book__control_color .color_active');
    if (activeTextColor) {
        const textColor = activeTextColor.dataset.textColor;
        const classesToRemove = Array.from(book.classList).filter(cls => cls.startsWith('book_color-'));
        classesToRemove.forEach(cls => book.classList.remove(cls));
        if (textColor) book.classList.add(`book_color-${textColor}`);
    }

    const activeBgColor = document.querySelector('.book__control_background .color_active');
    if (activeBgColor) {
        const bgColor = activeBgColor.dataset.bgColor;
        const classesToRemove = Array.from(book.classList).filter(cls => cls.startsWith('book_bg-'));
        classesToRemove.forEach(cls => book.classList.remove(cls));
        if (bgColor) book.classList.add(`book_bg-${bgColor}`);
    }
}

initBookState();