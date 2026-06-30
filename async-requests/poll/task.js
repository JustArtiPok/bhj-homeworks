// Элементы DOM
const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');

const API_URL = 'https://students.netoservices.ru/nestjs-backend/poll';

async function loadPoll() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const data = await response.json();
        renderPoll(data);
    } catch (error) {
        console.error('Ошибка загрузки опроса:', error);
        pollTitle.textContent = 'Не удалось загрузить опрос. Попробуйте позже.';
    }
}

function renderPoll(data) {
    const { id, data: pollData } = data;
    const { title, answers } = pollData;

    pollTitle.textContent = title;
    pollAnswers.innerHTML = '';

    answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'poll__answer';
        button.textContent = answer;
        button.dataset.index = index;        
        button.dataset.pollId = id;           
        button.addEventListener('click', onAnswerClick);
        pollAnswers.appendChild(button);
    });
}

async function onAnswerClick(event) {
    const button = event.currentTarget;
    const pollId = button.dataset.pollId;
    const answerIndex = button.dataset.index;

    const allButtons = document.querySelectorAll('.poll__answer');
    allButtons.forEach(btn => btn.disabled = true);

    try {
        const formData = new URLSearchParams();
        formData.append('vote', pollId);
        formData.append('answer', answerIndex);

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()
        });

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const result = await response.json();

        showStatistics(result.stat);

        alert('Спасибо, ваш голос засчитан!');

    } catch (error) {
        console.error('Ошибка при голосовании:', error);
        alert('Произошла ошибка. Попробуйте позже.');
        allButtons.forEach(btn => btn.disabled = false);
    }
}
function showStatistics(stat) {
    pollAnswers.innerHTML = '';
    const totalVotes = stat.reduce((sum, item) => sum + item.votes, 0);

    stat.forEach(item => {
        const div = document.createElement('div');
        div.className = 'poll__stat';
        const percent = totalVotes > 0 ? ((item.votes / totalVotes) * 100).toFixed(1) : 0;
        div.textContent = `${item.answer}: ${item.votes} голосов (${percent}%)`;
        pollAnswers.appendChild(div);
    });

    const totalDiv = document.createElement('div');
    totalDiv.className = 'poll__stat_total';
    totalDiv.textContent = `Всего проголосовало: ${totalVotes}`;
    pollAnswers.appendChild(totalDiv);
}

document.addEventListener('DOMContentLoaded', loadPoll);