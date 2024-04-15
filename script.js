import monthArr from './api.js';
import { setPopUpOpen } from "./pop-up.js";

// global variables
const imageBlock = document.querySelector(".img");
const body = document.querySelector("body");
const monthName = document.querySelector(".monthName");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const dayNumbers = document.querySelector(".dayNumbers");
const dateInput = document.querySelector(".day-input");
const dateInputButton = document.querySelector(".day-search-btn");
const todaySearcherButton = document.querySelector(".today-searcher-btn");
const weekDaysNumber = 7;

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();

//basic calendar initialisation
const initCalendar = () => {

  const firstDay = new Date(year,month,1);
  const lastDay = new Date(year,month + 1,0);
  const lastDayDate = lastDay.getDate();
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const nextDays = 6 - lastDay.getDay();
  const day = firstDay.getDay();

  //header with month and year
  monthName.innerHTML = monthArr[month].name.toUpperCase() + " " + year;
  //background images setting
  imageBlock.style.backgroundImage = `url(images/monthCats/${monthArr[month].image})`;
  body.style.backgroundImage = `url(images/backgrounds/${monthArr[month].background})`;

  let days = '';

  //blocks with dates of previous month
  for (let x = day; x > 0; x --) {
    days += `<div class="block"><div class="dayNumber">${prevDays - x + 1}</div></div>`;
  }

  //blocks with dates of exact month
  for (let i = 1; i <= lastDayDate; i ++) {
    if (i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
        days += `<div class="block"><div class="dayNumber active-day">${i}</div></div>`;
    } else {
      days += `<div class="block"><div class="dayNumber">${i}</div></div>`;
    }
  }

  //blocks with dates of the next month
  for ( let i = 1; i <= nextDays; i++) {
    days += `<div class="block"><div class="dayNumber">${i}</div></div>`;
  }

  dayNumbers.innerHTML = days;

  //function for highlighting weekends
  const dayNumbersArr = document.querySelectorAll(".dayNumber");
  const paintWeekends = () => {
    dayNumbersArr.forEach((elem,index) => {
      if ((index + 1) % weekDaysNumber === 0 || (index + 1) % weekDaysNumber === 1) {
        elem.style.backgroundColor = monthArr[month].color;
      }
    });
    const daySearcher = document.querySelector(".day-searcher");
    daySearcher.style.backgroundColor = monthArr[month].color;
  }
  paintWeekends();
}

initCalendar();

//functions for month forwarding
const prevMonth = () => {
  month --;
  if (month < 0){
    month = 11;
    year --;
  }
  initCalendar();
  setPopUpOpen();
}

const nextMonth = () => {
  month ++;
  if (month > 11) {
    month = 0;
    year ++;
  }
  initCalendar();
  setPopUpOpen();
}

leftArrow.addEventListener("click", prevMonth);
rightArrow.addEventListener("click", nextMonth);

setPopUpOpen();

dateInput.addEventListener("input",(event) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");

  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }

  if (dateInput.value.length > weekDaysNumber) {
    dateInput.value = dateInput.value.slice(0, weekDaysNumber);
  }

  if (event.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0,2);
    }
  }
})

const findDate = () => {
  const dateArr = dateInput.value.split("/");

  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      setPopUpOpen();
    }
  }
  const error = new Error("couldn`t find the entered date");
  console.error(error);
}

dateInputButton.addEventListener("click", findDate);
dateInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    findDate();
  }
});

todaySearcherButton.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();

  initCalendar();
  setPopUpOpen();
})

