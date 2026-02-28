const dashboard = document.getElementById("dashboard");
const timerSelect = document.getElementById("timerSelect");
const session = document.getElementById("session");
const cheer = document.getElementById("cheer");

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