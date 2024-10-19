const startTimerBtn = document.getElementById("startTimerBtn");
startTimerBtn.addEventListener("click", () => {
    const hours = parseInt(document.getElementById("hours").value) || 0;
    const minutes = parseInt(document.getElementById("minutes").value) || 0;
    const seconds = parseInt(document.getElementById("seconds").value) || 0;
    let totalTime = (hours * 3600) + (minutes * 60) + seconds;
    if (totalTime === 0) {
        alert("Please enter a valid time!");
        return;
    }
    const timerId = createTimerDisplay(totalTime);
    startCountdown(timerId, totalTime);
});

function createTimerDisplay(totalTime) {
    const timersContainer = document.getElementById("timers");
    timersContainer.querySelector(".p")?.remove();

    const timerId = `timer_${Date.now()}`;

    const timerElement = document.createElement("div");
    timerElement.setAttribute("id", timerId);
    timerElement.classList.add("timer-box");
    const { hours, minutes, seconds } = formatTime(totalTime);
    timerElement.innerHTML = `
                            <p class="timer-box-label">
                                Time Left:
                            </p>
                            <div class="timer-box-time">
                                <div class="col">
                                    <span class="time-text hh">${hours}</span>
                                </div>
                                <div class="col">
                                    <span>:</span>
                                </div>
                                <div class="col">
                                    <span class="time-text mm">${minutes}</span>
                                </div>
                                <div class="col">
                                    <span>:</span>
                                </div>
                                <div class="col">
                                    <span class="time-text ss">${seconds}</span>
                                </div>
                            </div>
                            <button class="timer-box-btn stop-timer-btn">
                                Delete
                            </button>`;
    console.log(timerElement);
    timersContainer.appendChild(timerElement);
    
    timerElement.querySelector(".stop-timer-btn").addEventListener("click", () => {
        clearTimer(timerId);
    })

    return timerId;
}
function startCountdown(timerId, totalTime) {
    const intervalId = setInterval(function() {
        if (totalTime <= 0) {
            clearInterval(intervalId);
            handleTimerEnd(timerId);
            return;
        }
        totalTime--;

        const { hours, minutes, seconds } = formatTime(totalTime);
        document.querySelector(`#${timerId} .hh`).textContent = hours;
        document.querySelector(`#${timerId} .mm`).textContent = minutes;
        document.querySelector(`#${timerId} .ss`).textContent = seconds;
    }, 1000);

    document.getElementById(timerId).setAttribute('data-interval-id', intervalId);
}
function clearTimer(timerId) {
    const timerElement = document.getElementById(timerId);
    const intervalId = timerElement.getAttribute('data-interval-id');
    clearInterval(intervalId);
    timerElement.remove();
    if (document.querySelectorAll("#timers .timer-box").length === 0) {
        document.getElementById("timers").innerHTML = `<p class="text-center p">You have no timers currently!</p>`;
    }
}
function handleTimerEnd(timerId) {
    const timerElement = document.getElementById(timerId);
    timerElement.classList.add("over");
    timerElement.innerHTML = `
    <div class="timer-box-time flex-grow-1">
        <h3>Timer Is Up!</h3>
    </div>
    <button class="timer-box-btn stop-timer-btn">
        Stop
    </button>
    `;
    playAlertSound();
    timerElement.querySelector(".stop-timer-btn").addEventListener("click", () => {
        clearTimer(timerId);
    });
}
function playAlertSound() {
    const audio = new Audio('./beep-01a.mp3');
    audio.play();
}
function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0')
    };
}
document.getElementById("minutes").addEventListener("keyup", (event) => {
    if (event.target.value.length > 0) {
        event.target.classList.remove("mm-control");
    } else {
        event.target.classList.add("mm-control");
    }
})