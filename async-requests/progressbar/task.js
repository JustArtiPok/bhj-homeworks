// Получаем ссылки на элементы DOM
const form = document.getElementById('form');
const progress = document.getElementById('progress');
const fileInput = document.getElementById('file');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    if (!fileInput.files.length) {
        alert('Пожалуйста, выберите файл.');
        return;
    }

    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', function(e) {
        if (e.lengthComputable) {
            const percentComplete = e.loaded / e.total;
            progress.value = percentComplete;
        }
    });

    xhr.addEventListener('load', function() {
        if (xhr.status === 200 || xhr.status === 201) {
            alert('Файл успешно загружен!');
            progress.value = 0;
            fileInput.value = '';
        } else {
            alert(`Произошла ошибка. Код ответа: ${xhr.status}`);
        }
    });

    xhr.addEventListener('error', function() {
        alert('Ошибка сети. Проверьте подключение к интернету.');
        progress.value = 0;
    });

    xhr.addEventListener('abort', function() {
        alert('Загрузка была отменена.');
        progress.value = 0;
    });

    xhr.open('POST', form.action);
    xhr.send(formData);
});