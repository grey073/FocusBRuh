let distractionCounter = 0;
let tabCounter = 0;
let lastX = null;
let motionLevel = 0;
let missingTime = 0;
let inBreak = false;

let cooldownActive = false; // block distractions during cooldown
const distractionCooldownMs = 10 * 1000; // 30s
let cooldownInterval = null;

const alarms = [
  "sounds/alarm1.mp3",
  "sounds/alarm2.mp3",
  "sounds/alarm3.mp3"
];

function startCamera() {
  const video = document.getElementById("video");

  const faceDetection = new FaceDetection({
    locateFile: file =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`
  });

  faceDetection.setOptions({
    model: 'short',
    minDetectionConfidence: 0.6
  });

  faceDetection.onResults(results => {
    if (results.detections.length === 0) {
      missingTime++;
      if (missingTime > 8) triggerDistraction();
    } else {
      missingTime = 0;

      const box = results.detections[0].boundingBox;
      const currentX = box.xCenter;

      if (lastX !== null) {
        motionLevel = Math.abs(currentX - lastX);
        if (motionLevel > 0.15) triggerDistraction();
      }

      lastX = currentX;

      // Only show "Focused" if not in cooldown
     
    }
  });

  const camera = new Camera(video, {
    onFrame: async () => {
      await faceDetection.send({ image: video });
    },
    width: 400,
    height: 300
  });

  camera.start();
}

// ===== Trigger Distraction =====
function triggerDistraction() {
  if (inBreak || cooldownActive) return;

  distractionCounter++;
  document.getElementById("distractionCount").innerText = distractionCounter;
  playRandomAlarm();

  // Start cooldown
  startCooldownUI(distractionCooldownMs);
}

// ===== Cooldown UI =====
function startCooldownUI(durationMs) {
  cooldownActive = true;
  pauseTimer(); // pause study timer

  if (cooldownInterval) clearInterval(cooldownInterval);

  let remaining = Math.floor(durationMs / 1000);
  document.getElementById("status").innerText = `⚠ Cooldown: ${remaining}s`;

  cooldownInterval = setInterval(() => {
    remaining--;
    if (remaining > 0) {
      document.getElementById("status").innerText = `⚠ Cooldown: ${remaining}s`;
    } else {
      clearInterval(cooldownInterval);
      cooldownInterval = null;
      cooldownActive = false;
      resumeTimer(); // resume study timer
      document.getElementById("status").innerText = "Focused";
    }
  }, 1000);
}

// ===== Tab Switch Detection =====
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    tabCounter++;
    document.getElementById("tabCount").innerText = tabCounter;
    triggerDistraction();
  }
});

// ===== Play Alarm =====
function playRandomAlarm() {
  const sound = alarms[Math.floor(Math.random() * alarms.length)];
  new Audio(sound).play().catch(e => console.warn("Alarm failed to play:", e));
}

// ===== Start Focus Session =====
function startFocusSession(minutes) {
  distractionCounter = 0;
  tabCounter = 0;
  lastX = null;
  motionLevel = 0;
  missingTime = 0;
  inBreak = false;
  cooldownActive = false;

  showSessionScreen();
  startTimer(minutes);
  startCamera();
}
if (!cooldownActive && !inBreak) {
  document.getElementById("status").innerText = "Focused";
}
 breakInterval = null;

function startBreakTimer(minutes) {
  pauseTimer();  // pause study timer
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

    // Update status text for break
    document.getElementById("status").innerText = `🛌 Break: ${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;

    // Update progress bar
    breakProgress.style.width = ((minutes*60 - totalBreakSeconds) / (minutes*60)) * 100 + "%";

    if (totalBreakSeconds <= 0) {
      clearInterval(breakInterval);
      breakInterval = null;
      inBreak = false;
      breakProgressContainer.classList.add("hidden");
      resumeTimer(); // resume study timer
      document.getElementById("status").innerText = "Focused";
    }
  }, 1000);
  faceDetection.onResults(results => {
  if (results.detections.length === 0) {
    missingTime++;
    if (missingTime > 8) triggerDistraction();
  } else {
    missingTime = 0;

    const box = results.detections[0].boundingBox;
    const currentX = box.xCenter;

    if (lastX !== null) {
      motionLevel = Math.abs(currentX - lastX);
      if (motionLevel > 0.15) triggerDistraction();
    }

    lastX = currentX;

    // Only update status if not in break or cooldown
    if (!cooldownActive && !inBreak) {
      document.getElementById("status").innerText = "Focused";
    }
  }
});
}