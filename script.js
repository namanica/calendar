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

let eventsArr = [];

const monthArr = [
  {
    name: "January",
    image: "january.png",
    background: "grey.jpg",
    color:"#76ADA2",
  },
  {
    name: "February",
    image: "february.png",
    background: "beige.jpg",
    color: "#A1895D",
  },
  {
    name: "March",
    image: "march.png",
    background: "pink.jpg",
    color: "#D66DBF",
  },
  {
    name:  "April",
    image: "april.png",
    background: "pinknwhite.jpg",
    color: "#C69238",
  },
  {
    name:  "May",
    image: "may.png",
    background: "pinknblue.jpg",
    color: "#33B9CB",
  },
  {
    name:  "June",
    image: "june.png",
    background: "rainbow.jpg",
    color: "#4AC638",
  },
  {
    name:  "July",
    image: "july.png",
    background: "greennblue.jpg",
    color: "#45B96C",
  },
  {
    name:  "August",
    image: "august.png",
    background: "yellownpurple.jpg",
    color: "#7C5BA3",
  },
  {
    name:  "September",
    image: "september.png",
    background: "orangenblue.jpg",
    color: "#DB2A23",
  },
  {
    name:  "October",
    image: "october.png",
    background: "orangenyellow.jpg",
    color: "#F0890E",
  },
  {
    name:  "November",
    image: "november.png",
    background: "burgundy.jpg",
    color: "#AC5B52",
  },
  {
    name:  "December",
    image: "december.png",
    background: "whitenblue.jpg",
    color: "#2B49D3",
  },
];

function initCalendar() {
  const firstDay = new Date(year,month,1);
  const firstDayNumber = firstDay.getDay();

  const lastDay = new Date(year,month + 1,0);
  const lastDayDate = lastDay.getDate();

  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();

  const nextDays = 6 - lastDay.getDay();

  const day = firstDay.getDay();

  //header with month and year
  monthName.innerHTML = monthArr[month].name.toUpperCase() + " " + year;
  monthImage.setAttribute('src', `images/monthCats/${monthArr[month].image}`);
  body.style.backgroundImage = `url(images/backgrounds/${monthArr[month].background})`;
  let days = '';

  //blocks with dates of previous month
  for (let x = day; x > 0; x --) {
    days += `<div class="block"><div class="dayNumber">${prevDays - x + 1}</div></div>`;
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

  //blocks with dates of the next month
  for ( let i = 1; i <= nextDays; i++) {
    days += `<div class="block"><div class="dayNumber">${i}</div></div>`;
  }
  dayNumbers.innerHTML = days;

  //function for highlighting weekends
  const dayNumbersArr = document.querySelectorAll(".dayNumber");
  function paintWeekends() {
    dayNumbersArr.forEach((elem,index) =>{
      if ((index + 1) % 7 === 0 || (index + 1) % 7 === 1 ) {
        elem.style.backgroundColor = monthArr[month].color;
      }
    });
  }

  paintWeekends();
}

initCalendar();

function prevMonth() {
  month--;
  if (month < 0){
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}


leftArrow.addEventListener("click", prevMonth);
rightArrow.addEventListener("click", nextMonth);
