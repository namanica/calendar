// global variables
const calendarWrapper = document.querySelector(".calendar-wrapper");
const monthImg = document.querySelector(".img");
const monthImage = document.querySelector(".monthImage");
const body = document.querySelector("body");
const calendar = document.querySelector(".calendar");
const monthName = document.querySelector(".monthName");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const weekDays = document.querySelector(".weekDays");
const calendarTable = document.querySelector(".table");
const tableBlock = document.querySelector(".block");
const dayNumber = document.querySelector(".dayNumber");
const dayNumbers = document.querySelector(".dayNumbers");

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let activeDay;

const monthArr = [
  {
    name: "January",
    image: "january.png",
    background: "grey.jpg",
  },
  {
    name: "February",
    image: "january.png",
    background: "beige.jpg",
  },

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

let eventsArr = [];

function initCalendar(){
  const firstDay = new Date(year,month,1);
  const firstDayNumber = firstDay.getDay();

  const lastDay = new Date(year,month + 1,0);
  const lastDayDate = lastDay.getDate();

  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();

  const nextDays = 6 - lastDay.getDay();

  const day = firstDay.getDay();

  monthName.innerHTML = monthArr[month].name.toUpperCase() + " " + year; //header with month and year
  monthImage.setAttribute('src', `images/monthCats/${monthArr[month].image}`);
  body.style.backgroundImage = `url(images/backgrounds/${monthArr[month].background})`;
  let days = '';

  for (let x = day; x > 0; x --) {
    days += `<div class="block"><div class="dayNumber">${prevDays - x + 1}</div></div>`; //blocks with dates of previous month
  }

  for (let i = 1; i <= lastDayDate; i ++) {
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (eventObj.day === i && eventObj.month === (month + 1) && eventObj.year === year) {
        event = true;
      }
    });
    if (i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
      activeDay = i;
      // getActiveDay(i);
      // updateEvents(i);
      if (event) {
        days += `<div class="block"><div class="dayNumber">${i}</div></div>`;
      } else {
        days += `<div class="block"><div class="dayNumber">${i}</div></div>`;
      }
    } else {
      if (event) {
        days += `<div class="block"><div class="dayNumber">${i}</div></div>`;
      } else {
        days += `<div class="block"><div class="dayNumber">${i}</div></div>`;
      }
    }
  }

  for ( let i = 1; i <= nextDays; i++) {
    days += `<div class="block"><div class="dayNumber">${i}</div></div>`; //blocks with dates of the next month
  }
  dayNumbers.innerHTML = days;
}

initCalendar();
