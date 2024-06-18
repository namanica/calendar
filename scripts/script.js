/* eslint-disable space-unary-ops */
/* eslint-disable space-in-parens */
/* eslint-disable max-len */
import monthArr from './api.js';
import { setPopUpOpen } from './pop-up.js';

// global variables
const imageBlock = document.querySelector('.img');
const body = document.querySelector('body');
const monthName = document.querySelector('.monthName');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const dayNumbers = document.querySelector('.dayNumbers');
const dateInput = document.querySelector('.day-input');
const dateInputButton = document.querySelector('.day-search-btn');
const todaySearcherButton = document.querySelector('.today-searcher-btn');
const weekDaysNumber = 7;

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();

//basic calendar initialisation
const initCalendar = () => {

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const lastDayDate = lastDay.getDate();
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const nextDays = 6 - lastDay.getDay();
  const day = firstDay.getDay();
  const todayDay = new Date();
  const todayExact = todayDay.getDate();
  const monthExact = todayDay.getMonth();
  const yearExact = todayDay.getFullYear();

  //header with month and year
  monthName.innerHTML = monthArr[month].name.toUpperCase() + ' ' + year;

  //background images setting
  imageBlock.style.backgroundImage = `url(images/monthCats/${monthArr[month].image})`;
  body.style.backgroundImage = `url(images/backgrounds/${monthArr[month].background})`;

  //blocks with dates of previous month
  const days = [];
  for (let x = day; x > 0; x--) {
    const dayNumberBlock = `<div class="block"><div class="dayNumber">${prevDays - x + 1}</div></div>`;
    days.push(dayNumberBlock);
  }

  //blocks with dates of exact month
  for (let i = 1; i <= lastDayDate; i++) {
    if (i === todayExact && year === yearExact && month === monthExact) {
      const dayNumberActiveBlock = `<div class="block"><div class="dayNumber active-day">${i}</div></div>`;
      days.push(dayNumberActiveBlock);
    } else {
      const dayNumberIndexBlock = `<div class="block"><div class="dayNumber">${i}</div></div>`;
      days.push(dayNumberIndexBlock);
    }
  }

  //blocks with dates of the next month
  for ( let i = 1; i <= nextDays; i++) {
    const dayNumberIndexBlock = `<div class="block"><div class="dayNumber">${i}</div></div>`;
    days.push(dayNumberIndexBlock);
  }
  dayNumbers.innerHTML = days.join('');

  //function for highlighting weekends
  const dayNumbersArr = document.querySelectorAll('.dayNumber');
  const paintWeekends = () => {
    for (let i = 0; i < dayNumbersArr.length; i++) {
      if ((i + 1) % weekDaysNumber === 0 || (i + 1) % weekDaysNumber === 1) {
        dayNumbersArr[i].style.backgroundColor = monthArr[month].color;
      }
    }
  };
  paintWeekends();
};

initCalendar();

const monthNumber = 11;
leftArrow.addEventListener('click', () => {
  month--;
  if (month < 0) {
    month = monthNumber;
    year--;
  }
  initCalendar();
  setPopUpOpen();
});
rightArrow.addEventListener('click', () => {
  month++;
  if (month > monthNumber) {
    month = 0;
    year ++;
  }
  initCalendar();
  setPopUpOpen();
});

setPopUpOpen();

dateInput.addEventListener('input', (event) => {
  let inputValue = dateInput.value;
  inputValue = inputValue.replace(/[^0-9/]/g, '');
  const monthValueLength = 2;
  const maxLength = 7;

  if (inputValue.length === monthValueLength) {
    inputValue += '/';
  }

  if (inputValue.length > maxLength) {
    inputValue = inputValue.slice(0, maxLength);
  }

  if (event.inputType === 'deleteContentBackward') {
    if (inputValue.length === monthValueLength + 1) {
      inputValue = inputValue.slice(0, 2);
    }
  }

  dateInput.value = inputValue;
});

const findDate = () => {
  const dateArr = dateInput.value.split('/');

  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      setPopUpOpen();
    }
  }
  const error = new Error('couldn`t find the entered date');
  console.error(error);
};

dateInputButton.addEventListener('click', findDate);
dateInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    findDate();
  }
});

todaySearcherButton.addEventListener('click', () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();

  initCalendar();
  setPopUpOpen();
});

