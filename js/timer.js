let totalSeconds;
let timerInterval;
let timerPaused = false;
let breakInterval = null;

// ===== Study Timer =====
function startTimer(minutes) {
  totalSeconds = minutes * 60;
  updateTimerUI();

  timerInterval = setInterval(() => {
    if (timerPaused) return;

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

function pauseTimer() { timerPaused = true; }
function resumeTimer() { timerPaused = false; }

// ===== Break Timer =====
function startBreakTimer(minutes) {
  pauseTimer();
  inBreak = true;

  const breakProgressContainer = document.getElementById("breakProgressContainer");
  const breakProgress = document.getElementById("breakProgress");
  breakProgressContainer.classList.remove("hidden");
  breakProgress.style.width = "0%";

  let totalBreakSeconds = minutes * 60;

  breakInterval = setInterval(() => {
    totalBreakSeconds--;

    const min = Math.floor(totalBreakSeconds / 60);
    const sec = totalBreakSeconds % 60;

    document.getElementById("status").innerText = `🛌 Break: ${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
    breakProgress.style.width = ((minutes*60 - totalBreakSeconds) / (minutes*60)) * 100 + "%";

    if (totalBreakSeconds <= 0) {
      clearInterval(breakInterval);
      breakInterval = null;
      inBreak = false;
      breakProgressContainer.classList.add("hidden");
      resumeTimer();
      document.getElementById("status").innerText = "Focused";
    }
  }, 1000);
}