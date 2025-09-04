function openFeatures() {
  let allElems = document.querySelectorAll(".elem");
  let fullElemPage = document.querySelectorAll(".fullElem");
  let allFullElemsBackBtn = document.querySelectorAll(".fullElem .back");

  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      fullElemPage[elem.id].style.display = "block";
    });
  });

  allFullElemsBackBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      fullElemPage[back.id].style.display = "none";
    });
  });
}
openFeatures();


function todoList() {
  let currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("empty");
  }

  function renderTask() {
    let allTask = document.querySelector(".allTask");

    let sum = "";

    currentTask.forEach(function (elem, idx) {
      sum += `<div class="task">
                        <h5>${elem.task} <span class=${elem.imp}>Imp</span> </h5>
                        <button id=${idx}>Mark as Completed</button>
                    </div>`;
    });

    allTask.innerHTML = sum;

    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    document.querySelectorAll(".task button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.idx, 1);
        renderTask();
      });
    });
  }
  renderTask();

  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form input");
  let taskDetailsInput = document.querySelector(".addTask form textarea");
  let taskCheckbox = document.querySelector("#check");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    currentTask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: taskCheckbox.checked,
    });

    taskInput.value = "";
    taskDetailsInput = "";
    taskCheckbox.checked = false;
    renderTask();
  });
}
todoList();


function dailyPlanner() {
  let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  let dayPlanner = document.querySelector(".day-planner");

  let hours = Array.from({ length: 18 }, function (elem, idx) {
    return `${5 + idx}:00 - ${6 + idx}:00`;
  });

  let wholeDaySum = "";
  hours.forEach(function (elem, idx) {
    let savedData = dayPlanData[idx] || "";

    wholeDaySum += `<div class="day-planner-time">
                    <p>${elem}</p>
                    <input id=${idx} type="text" placeholder="..." value=${savedData}>
                </div>`;
  });

  dayPlanner.innerHTML = wholeDaySum;

  let dayPlannerInput = document.querySelectorAll(".day-planner input");
  dayPlannerInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayPlanData[elem.id] = elem.value;

      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}
dailyPlanner();


function motivationalQuote() {
  let motivationQuote = document.querySelector("motivation-2 h1");
  let motivationAuthor = document.querySelector("motivation-3 h2");

  async function fetchQuote() {
    let response = await fetch("https://api.quotable.io/quotes/random");
    let data = await response.json();

    console.log(data);

    // motivationQuote.innerHTML = data.content
    motivationAuthor.innerHTML = data.author;
  }
  fetchQuote();
}
// motivationalQuote()

function pomodoroTimer() {
  let timer = document.querySelector(".pomo-timer h1");
  let startBtn = document.querySelector(".pomo-timer .start-timer");
  let pauseBtn = document.querySelector(".pomo-timer .pause-timer");
  let resetBtn = document.querySelector(".pomo-timer .reset-timer");
  let WorkSession = document.querySelector(".pomodoro-fullpage .session");

  let isWorkSession = true;

  let totalSeconds = 25 * 60;
  let timerInterval = null;

  function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    timer.innerHTML = `${String(minutes).padStart("2", "0")}:${String(
      seconds
    ).padStart("2", "0")}`;
  }
  updateTimer();

  function startTimer() {
    clearInterval(timerInterval);

    if (isWorkSession) {
      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = false;
          clearInterval(timerInterval);
          timer.innerHTML = `5:00`;
          WorkSession.innerHTML = "Break";
          totalSeconds = 5 * 60;
        }
      }, 1000);
    } else {
      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = true;
          clearInterval(timerInterval);
          timer.innerHTML = `25:00`;
          WorkSession.innerHTML = " Work Session";
          totalSeconds = 25 * 60;
        }
      }, 1000);
    }
  }

  function pauseTimer() {
    clearInterval(timerInterval);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    totalSeconds = 25 * 60;
    updateTimer();
  }

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
}
pomodoroTimer();


function weatherFunctionality(){
  let apiKey = "227f2061629844b1a7481342250409";
let city = "kanpur";

let headerDate = document.querySelector(".header1 h1");
let headerMonth = document.querySelector(".header1 h2");
let header2Temp = document.querySelector(".header2 h2");
let condition = document.querySelector(".header2 .condition");
let preci = document.querySelector(".header2 .preci");
let humidity = document.querySelector(".header2 .humidity");
let wind = document.querySelector(".header2 .wind");

let data = null;

async function weatherAPICall() {
  let response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
  );
  data = await response.json();


  header2Temp.innerHTML = `${data.current.temp_c}°C`;
  condition.innerHTML = `${data.current.condition.text}`;
  humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
  wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`;
  preci.innerHTML = `Heat Index : ${data.current.heatindex_c}%`;
}

weatherAPICall();

function timeDate() {
  const TotaldayOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const TotalMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = new Date();
  let dayOfWeek = TotaldayOfWeek[date.getDay()];
  let hours = date.getHours();
  let minutes = String(date.getMinutes()).padStart("2", "0");
  let seconds = String(date.getSeconds()).padStart("2", "0");
  let day = date.getDay();
  let year = date.getFullYear();
  let month = TotalMonths[date.getMonth()];

  headerMonth.innerHTML = `${day} ${month}, ${year}`;

  if (hours > 12) {
    headerDate.innerHTML = `${dayOfWeek}, ${
      hours - 12
    }:${minutes}:${seconds} PM `;
  } else {
    headerDate.innerHTML = `${dayOfWeek}, ${hours}:${minutes}:${seconds} AM `;
  }
}

setInterval(() => {
  timeDate();
}, 1000);
}
weatherFunctionality()

function theme(){
  
let theme = document.querySelector('.theme')
let rootElement = document.documentElement

var flag = 0
theme.addEventListener("click",function(){
   if (flag == 0) {
            rootElement.style.setProperty('--pri', '#F8F4E1')
            rootElement.style.setProperty('--sec', '#222831')
            rootElement.style.setProperty('--tri1', '#948979')
            rootElement.style.setProperty('--tri2', '#393E46')
            flag = 1
        } else if (flag == 1) {
            rootElement.style.setProperty('--pri', '#F1EFEC')
            rootElement.style.setProperty('--sec', '#030303')
            rootElement.style.setProperty('--tri1', '#D4C9BE')
            rootElement.style.setProperty('--tri2', '#123458')
            flag = 2
        } else if (flag == 2) {
            rootElement.style.setProperty('--pri', '#F8F4E1')
            rootElement.style.setProperty('--sec', '#381c0a')
            rootElement.style.setProperty('--tri1', '#FEBA17')
            rootElement.style.setProperty('--tri2', '#74512D')
            flag = 0
        }
})
}
theme()