function startFocusSession(minutes) {
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