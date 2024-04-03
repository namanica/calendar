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
// const tableBlock = document.querySelector(".block");
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
    color:"#C3E2C2",
  },
  {
    name: "February",
    image: "february.png",
    background: "beige.jpg",
    color: "#DBCC95",
  },
  {
    name: "March",
    image: "march.png",
    background: "pink.jpg",
    color: "#E1AFD1",
  },
  {
    name:  "April",
    image: "april.png",
    background: "pinknwhite.jpg",
    color: "#F2C18D",
  },
  {
    name:  "May",
    image: "may.png",
    background: "pinknblue.jpg",
    color: "#B7C9F2",
  },
  {
    name:  "June",
    image: "june.png",
    background: "rainbow.jpg",
    color: "#BFEA7C",
  },
  {
    name:  "July",
    image: "july.png",
    background: "greennblue.jpg",
    color: "#76ABAE",
  },
  {
    name:  "August",
    image: "august.png",
    background: "yellownpurple.jpg",
    color: "#B784B7",
  },
  {
    name:  "September",
    image: "september.png",
    background: "orangenblue.jpg",
    color: "#B3A398",
  },
  {
    name:  "October",
    image: "october.png",
    background: "orangenyellow.jpg",
    color: "#F6B17A",
  },
  {
    name:  "November",
    image: "november.png",
    background: "burgundy.jpg",
    color: "#CAA6A6",
  },
  {
    name:  "December",
    image: "december.png",
    background: "whitenblue.jpg",
    color: "#BFCFE7",
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

//functions for month forwarding
function prevMonth() {
  month--;
  if (month < 0){
    month = 11;
    year--;
  }
  initCalendar();
  setPopUpOpen();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
  setPopUpOpen();
}


leftArrow.addEventListener("click", prevMonth);
rightArrow.addEventListener("click", nextMonth);

//functions for creating and shutting event pop-up
function setPopUpOpen() {
  const tableBlocks = document.querySelectorAll(".block");

  tableBlocks.forEach(block => {
    block.addEventListener("click", () => {
      const popup = document.createElement('div');
      popup.classList.add('pop-up');
      popup.innerHTML = `<div class="inner-pop-up">
      <div class="pop-up-day-submit-wrapper">
      <div class="pop-up-day">Date</div>
      <input type="submit" value="Add event..." class="pop-up-submit">
    </div>
      <input type="text" class="pop-up-time" placeholder="add time...">
      <textarea name="comment" class="pop-up-comment" cols="30" rows="10" placeholder="add comment..." ></textarea>
    </div>`;
      document.body.appendChild(popup);
      setPopUpClosed();
    })
  });
}

function setPopUpClosed() {
  const popUp = document.querySelector(".pop-up");
  if (popUp) {
    popUp.addEventListener("click", (event) => {
      const innerPopUp = document.querySelector('.inner-pop-up');
      if (event.target !== innerPopUp && !innerPopUp.contains(event.target)) {
        popUp.remove();
      }
    });
  }
}

setPopUpOpen();

