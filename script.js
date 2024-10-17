// Получаем элементы
const progressCircle = document.querySelector(".progress-ring__circle");
const radius = progressCircle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

const valueInput = document.getElementById("value");
const animateCheckbox = document.getElementById("animate");
const hideCheckbox = document.getElementById("hide");
const progressRing = document.querySelector(".progress-ring");

// Устанавливаем начальные параметры дуги
progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
progressCircle.style.strokeDashoffset = circumference; // Начальная точка — 12 часов

// Функция для обновления прогресса
function setProgress(value) {
  const offset = circumference - (value / 100) * circumference;
  progressCircle.style.strokeDashoffset = offset;
}

// Обработчик для изменения значения Value
valueInput.addEventListener("input", function () {
  let value = Math.min(parseInt(this.value || 0), 100); // Ограничиваем от 0 до 100
  this.value = value; // Устанавливаем ограниченное значение в поле
  setProgress(value);

  // Отключаем анимацию, если она была включена
  if (animateCheckbox.checked) {
    animateCheckbox.checked = false; // Снимаем чекбокс анимации
    toggleAnimation(false); // Останавливаем анимацию
  }
});

// Функция для включения/выключения анимации
function toggleAnimation(isAnimated) {
  if (isAnimated) {
    progressCircle.style.animation = "progress-fill 2s linear infinite";
  } else {
    progressCircle.style.animation = "none"; // Останавливаем анимацию
  }
}

// Обработчик анимации
animateCheckbox.addEventListener("change", function () {
  toggleAnimation(this.checked);
});

// Обработчик для скрытия только круга
hideCheckbox.addEventListener("change", function () {
  progressRing.style.visibility = this.checked ? "hidden" : "visible";
});

/* CSS для анимации
stroke-dashoffset управляет тем, сколько части окружности (круга) скрыто. 
Когда это значение максимально, окружность выглядит как пустая.
Когда оно уменьшается до нуля, окружность полностью видна.*/

const style = document.createElement("style");
style.innerHTML = `
  @keyframes progress-fill {
    0% {
      stroke-dashoffset: ${circumference};
    }
    100% {
      stroke-dashoffset: 0;
    }
  }
`;
document.head.appendChild(style);

// Устанавливаем начальное значение
setProgress(valueInput.value);
