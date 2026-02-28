let totalSeconds;
let timerInterval;

function startTimer(minutes) {
  totalSeconds = minutes * 60;
  updateTimerUI();

  timerInterval = setInterval(() => {
    totalSeconds--;
    updateTimerUI();

    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      finishSession();
    }
  }, 1000);
}

function updateTimerUI() {
  const min = Math.floor(totalSeconds / 60);
  const sec = totalSeconds % 60;

  document.getElementById("timerDisplay").innerText =
    `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}