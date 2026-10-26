function updateTime() {
    const timeElement = document.getElementById("current-time");

    if (timeElement) {
        const now = new Date();
        timeElement.innerHTML = now.toLocaleTimeString("ru-RU");
    }
}

updateTime();
setInterval(updateTime, 1000);


// Элементы планировщика
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Загружаем задачи из localStorage
let tasks = [];

try {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
} catch (error) {
    tasks = [];
}

// Сохраняем задачи
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Показываем задачи на странице
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {
        const taskItem = document.createElement("li");
        const taskName = document.createElement("span");
        const doneButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        taskName.textContent = task.text;
        doneButton.textContent = "Выполнено";
        deleteButton.textContent = "Удалить";

        if (task.completed) {
            taskName.classList.add("completed");
        }

        // Отмечаем задачу выполненной
        doneButton.addEventListener("click", function () {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        });

        // Удаляем задачу
        deleteButton.addEventListener("click", function () {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        taskItem.append(taskName, doneButton, deleteButton);
        taskList.appendChild(taskItem);
    });
}

// Добавляем новую задачу
if (addButton && taskInput && taskList) {
    addButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            return;
        }

        tasks.push({
            text: taskText,
            completed: false
        });

        saveTasks();
        renderTasks();

        taskInput.value = "";
    });

    // Показываем сохранённые задачи при запуске
    renderTasks();
}
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("startTimer");
const pauseButton = document.getElementById("pauseTimer");
const resetButton = document.getElementById("resetTimer");
const timerMessage = document.getElementById("timerMessage");

let timeLeft = 25 * 60;
let timerInterval = null;

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerDisplay.innerHTML =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

startButton.addEventListener("click", function () {
    if (timerInterval !== null) return;

    timerMessage.innerHTML = "Время сосредоточиться!";

    timerInterval = setInterval(function () {
        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            timerMessage.innerHTML = "Отличная работа! Время отдохнуть.";
        }
    }, 1000);
});

pauseButton.addEventListener("click", function () {
    clearInterval(timerInterval);
    timerInterval = null;
    timerMessage.innerHTML = "Таймер на паузе.";
});

resetButton.addEventListener("click", function () {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = 25 * 60;

    updateTimer();
    timerMessage.innerHTML = "Готов начать работу?";
});

updateTimer();
const calculateButton = document.getElementById("calculate-productivity");
const productivityResult = document.getElementById("productivity-result");

calculateButton.addEventListener("click", function () {
    const work = Number(document.getElementById("work-hours").value);
    const study = Number(document.getElementById("study-hours").value);
    const exercise = Number(document.getElementById("exercise-hours").value);
    const rest = Number(document.getElementById("rest-hours").value);
    const entertainment = Number(document.getElementById("entertainment-hours").value);

    const hours = [work, study, exercise, rest, entertainment];

    if (hours.some(hour => !Number.isFinite(hour) || hour < 0 || hour > 24)) {
        productivityResult.innerHTML = "Введи число от 0 до 24 для каждого занятия.";
        return;
    }

    const totalHours = hours.reduce((sum, hour) => sum + hour, 0);
    const productiveHours = work + study + exercise;

    if (totalHours === 0) {
        productivityResult.innerHTML = "Сначала введи время для своих занятий.";
        return;
    }

    const percentage = Math.round((productiveHours / totalHours) * 100);

    productivityResult.innerHTML =
        `Продуктивность: ${percentage}%<br>` +
        `Продуктивные занятия: ${productiveHours} ч. из ${totalHours} ч.`;
});
const loadTipsButton = document.getElementById("load-tips");
const extraTip = document.getElementById("extra-tip");

loadTipsButton.addEventListener("click", async function () {
    extraTip.innerHTML = "Загружаем совет...";

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts/1"
        );

        if (!response.ok) {
            throw new Error("Не удалось загрузить данные");
        }

        const data = await response.json();

        extraTip.innerHTML =
            "<strong>Дополнительный совет:</strong> " +
            "Записывай задачи на следующий день заранее. " +
            "Пример данных с сервера: " + data.title;
    } catch (error) {
        extraTip.innerHTML =
            "Не удалось подключиться к серверу. " +
            "Попробуй ещё раз позже.";
        console.error(error);
    }
});
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
        formMessage.textContent = "Заполни все поля.";
        return;
    }

    if (!emailPattern.test(email)) {
        formMessage.textContent = "Введи корректный e-mail.";
        return;
    }

    formMessage.textContent =
        "Спасибо, " + name + "! Форма заполнена правильно.";

    contactForm.reset();
});