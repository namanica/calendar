// global variables 
const calendarWrapper = document.querySelector(".calendar-wrapper");
const monthImg = document.querySelector(".img");
const calendar = document.querySelector(".calendar");
const monthName = document.querySelector(".monthName");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const weekDays = document.querySelector(".weekDays");
const calendarTable = document.querySelector(".table");
const tableBlock = document.querySelector(".block");
const dayNumber = document.querySelector(".dayNumber");

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();

const monthArr = [
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


function initCalendar(){
  const firstDay = new Date(year,month,1);
  const firstDayNumber = firstDay.getDay();
  const lastDay = new Date(year,month+1,0);
  const lastDayDate = lastDay.getDate();


  monthName.innerHTML = monthArr[month].toUpperCase() + " " + year;


}

initCalendar();
