/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
let todos = [];

const fetchTodos = async () => {
  try {
    const response = await fetch('/todos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      todos = await response.json();
      console.log(todos);
    } else {
      console.error('Error:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const setPopUpOpen = () => {
  fetchTodos();
  const tableBlocks = document.querySelectorAll('.block');
  const monthName = document.querySelector('.monthName');
  const monthYearArr = monthName.innerHTML.split(' ');

  for (const block of tableBlocks) {
    block.addEventListener('click', (event) => {
      const popup = document.createElement('div');
      const data = `${event.target.innerHTML} ${monthYearArr[0].toLowerCase()} ${monthYearArr[1]}`;
      popup.classList.add('pop-up');
      popup.innerHTML =
                `<div class="inner-pop-up">
                 <form id="popup-form">
                 <div class="pop-up-day-submit-wrapper">
                 <div class="pop-up-day" name="data">${data}</div>
                 <button type="submit" class="pop-up-submit">Add event...</button>
                 </div>
                   <div class="author-time-wrapper">
                     <input type="text" name="time" class="pop-up-time" placeholder="add time...">
                     <input type="text" name="author" class="pop-up-author" placeholder="add author...">
                   </div>
                   <textarea name="todo" class="pop-up-comment" placeholder="add comment..."></textarea>
                   <input type="hidden" name="data" value="${data}">
                 </form>
                 </div>`;

      document.body.appendChild(popup);
      displayTodosForDate(data, popup);

      const popUpTime = document.querySelector('.pop-up-time');
      popUpTime.addEventListener('input', (event) => {
        popUpTime.value = popUpTime.value.replace(/[^0-9:]/g, '');
        const hourValueLength = 2;
        const timevalueLength = 5;
        if (popUpTime.value.length === hourValueLength) {
          popUpTime.value += ':';
        }
        if (popUpTime.value.length > timevalueLength) {
          popUpTime.value = popUpTime.value.slice(0, timevalueLength);
        }
        if (event.inputType === 'deleteContentBackward') {
          if (popUpTime.value.length === hourValueLength + 1) {
            popUpTime.value = popUpTime.value.slice(0, hourValueLength);
          }
        }
      });

      const popupForm = document.getElementById('popup-form');
      popupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(popupForm);
        const data = Object.fromEntries(formData.entries());
        try {
          const response = await fetch('/add-todo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });

          if (response.ok) {
            const result = await response.json();
            console.log('Success:', result);
            popup.remove();
            await fetchTodos();
          } else {
            console.error('Error:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      });

      setPopUpClosed();
    });
  }
};

const setPopUpClosed = () => {
  const popUp = document.querySelector('.pop-up');
  if (popUp) {
    popUp.addEventListener('click', (event) => {
      const innerPopUp = document.querySelector('.inner-pop-up');
      if (event.target !== innerPopUp && !innerPopUp.contains(event.target)) {
        popUp.remove();
      }
    });
  }
};

const displayTodosForDate = (date, popup) => {
  const relevantTodos = todos.filter((todo) => todo.data === date);
  if (relevantTodos.length > 0) {
    const latestTodo = relevantTodos[relevantTodos.length - 1];
    const popUpTime = popup.querySelector('.pop-up-time');
    const popUpAuthor = popup.querySelector('.pop-up-author');
    const popUpComment = popup.querySelector('.pop-up-comment');

    popUpTime.value = latestTodo.time || '';
    popUpAuthor.value = latestTodo.author || '';
    popUpComment.value = latestTodo.todo || '';
  }
};

export { setPopUpOpen };
