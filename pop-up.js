const setPopUpOpen = () => {
    const tableBlocks = document.querySelectorAll(".block");
    const monthName = document.querySelector(".monthName");
    const monthYearArr = monthName.innerHTML.split(' ');

    for (const block of tableBlocks) {
        block.addEventListener("click", (event) => {
            const popup = document.createElement('div');
            popup.classList.add('pop-up');
            popup.innerHTML =
                `<div class="inner-pop-up">
                 <div class="pop-up-day-submit-wrapper">
                 <div class="pop-up-day">${event.target.innerHTML} ${monthYearArr[0].toLowerCase()} ${monthYearArr[1]}</div>
                 <input type="submit" value="Add event..." class="pop-up-submit">
                 </div>
                 <input type="text" class="pop-up-time" placeholder="add time...">
                 <textarea name="comment" class="pop-up-comment" cols="30" rows="10" placeholder="add comment..." ></textarea>
                 </div>`;
            document.body.appendChild(popup);

            const popUpTime = document.querySelector(".pop-up-time");
            popUpTime.addEventListener("input",(event) => {
                popUpTime.value =  popUpTime.value.replace(/[^0-9:]/g, "");
                const hourValueLength = 2;
                const timevalueLength = 4;
                if (popUpTime.value.length === hourValueLength) {
                    popUpTime.value += ":";
                }
                if (popUpTime.value.length >= timevalueLength) {
                    popUpTime.value =  popUpTime.value.slice(0,5);
                }
                if (event.inputType === "deleteContentBackward") {
                    if (popUpTime.value.length === hourValueLength + 1) {
                        popUpTime.value =  popUpTime.value.slice(0,2);
                    }
                }
            })
            setPopUpClosed();
        })
    }
}

const setPopUpClosed = () => {
    const popUp = document.querySelector(".pop-up");
    if (popUp) {
        popUp.addEventListener("click", (event) => {
            const innerPopUp = document.querySelector(".inner-pop-up");
            if (event.target !== innerPopUp && !innerPopUp.contains(event.target)) {
                popUp.remove();
            }
        });
    }
}

export { setPopUpOpen };
