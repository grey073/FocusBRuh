const dashboard = document.getElementById("dashboard");
const timerSelect = document.getElementById("timerSelect");
const session = document.getElementById("session");
const cheer = document.getElementById("cheer");
const breakBtn = document.getElementById("breakBtn");
const breakSelect = document.getElementById("breakSelect");

breakBtn.onclick = () => {
  breakSelect.classList.remove("hidden");
};


function showSessionScreenAfterBreak() {
  breakSelect.classList.add("hidden");
  document.getElementById("status").innerText = "Focused";
}

document.getElementById("customStart").onclick = function () {

  const input = document.getElementById("customMinutes");
  const minutes = parseInt(input.value);

  if (!minutes || minutes <= 0) {
    alert("Please enter valid minutes");
    return;
  }

  startFocusSession(minutes);
};
document.getElementById("startBtn").onclick = () => {
  dashboard.classList.add("hidden");
  timerSelect.classList.remove("hidden");
};

document.querySelectorAll(".preset").forEach(btn => {
  btn.onclick = () => {
    const time = btn.dataset.time;
    startFocusSession(time);
  };
});

document.getElementById("homeBtn").onclick = () => {
  location.reload();
};

let streak = localStorage.getItem("streak") || 0;
document.getElementById("streakDisplay").innerText = streak;

function showSessionScreen() {
  timerSelect.classList.add("hidden");
  session.classList.remove("hidden");
}

function showCheerScreen(reward) {
  session.classList.add("hidden");
  cheer.classList.remove("hidden");
  document.getElementById("rewardText").innerText = reward;
}
breakBtn.onclick = () => breakSelect.classList.remove("hidden");

document.querySelectorAll(".breakPreset").forEach(btn => {
  btn.onclick = () => {
    const breakTime = parseInt(btn.dataset.time);
    breakSelect.classList.add("hidden");
    startBreakTimer(breakTime);
  };
});
