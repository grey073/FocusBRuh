function startFocusSession(minutes) {
  // Reset counters and states
  distractionCounter = 0;
  tabCounter = 0;
  lastX = null;
  motionLevel = 0;
  missingTime = 0;
  inBreak = false;
  lastDistractionTime = 0; // reset cooldown

  showSessionScreen();
  startTimer(minutes);
  startCamera();
}
function finishSession() {
  let reward = "⭐ Bronze Focus!";
  let streak = parseInt(localStorage.getItem("streak") || 0);

  if (distractionCounter < 3) {
    streak++;
    localStorage.setItem("streak", streak);

    if (streak >= 7) reward = "🥈 Silver Focus!";
    if (streak >= 14) reward = "🥇 Gold Focus!";
  }

  showCheerScreen(reward);
}
document.querySelectorAll(".breakPreset").forEach(btn => {
  btn.onclick = () => {
    const breakTime = parseInt(btn.dataset.time);
    breakSelect.classList.add("hidden");
    startBreakTimer(breakTime);
  };
});
breakBtn.onclick = () => {
  if (!inBreak) breakSelect.classList.remove("hidden");
};

document.querySelectorAll(".breakPreset").forEach(btn => {
  btn.onclick = () => {
    const breakTime = parseInt(btn.dataset.time);
    breakSelect.classList.add("hidden");
    startBreakTimer(breakTime);
  };
});