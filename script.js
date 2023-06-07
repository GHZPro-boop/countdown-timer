let countDown;
let displayTimeLeft = document.querySelector('.display__time-left');
let displayEndTime = document.querySelector('.display__end-time');
let timerButtons = document.querySelectorAll('.timer__button');
const customForm = document.querySelector('#custom');
//create a function that runs every second

const Timer = (seconds) => {
    clearInterval(countDown);
    //current time
    const currentTime = Date.now();
    //future time
    const futureTime = currentTime + (seconds * 1000);
    displayTimeBeBack(new Date (futureTime));

    displayCountDown(seconds);
    //create a set interval
    countDown = setInterval(() => {
        let secsLeft = Math.round((futureTime - Date.now()) / 1000);
        if (secsLeft < 0) {
            clearInterval(countDown);
            return;
        }
        displayCountDown(Math.abs(secsLeft));
    }, 1000);
}

function displayCountDown(secsLeft) {
    let minutes = Math.floor(secsLeft / 60);
    let seconds = secsLeft % 60;
    let display = `${minutes}:${seconds < 10 ? "0":""}${seconds}`;
    displayTimeLeft.textContent = display;
}

const displayTimeBeBack = (futureTime) => {
    //milliseconds changed to normal seconds display
    let formattedFutureTime = new Date(futureTime);
    let formattedHour = formattedFutureTime.getHours();
    let formattedMins = formattedFutureTime.getMinutes();
    const display = `Be Back At ${formattedHour > 12 ? formattedHour % 12: formattedHour}:${formattedMins < 10 ? "0":""}${formattedMins}`
    displayEndTime.textContent = display;
}

// Timer(70);
function handleCountDown() {
    const seconds = parseInt(this.dataset.time);
    Timer(seconds);
}

timerButtons.forEach(button => {
    button.addEventListener('click', handleCountDown)
});

customForm.addEventListener('submit', (event) => {
    //we need to first prevent the default behaviour and propagation of events
    event.preventDefault();
    let secs = this.customForm.minutes.value * 60;
    this.customForm.minutes.value = '';
    Timer(secs);
});