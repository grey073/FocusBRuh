let distractionCounter = 0;
let tabCounter = 0;
let lastX = null;
let motionLevel = 0;
let missingTime = 0;
let inBreak = false;

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

        if (motionLevel > 0.15) {
          triggerDistraction();
        }
      }

      lastX = currentX;
      document.getElementById("status").innerText = "Focused";
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

function triggerDistraction() {
  if (inBreak) return;

  distractionCounter++;
  document.getElementById("distractionCount").innerText = distractionCounter;
  document.getElementById("status").innerText = "⚠ Distraction!";
  startBreak();
}

function startBreak() {
  inBreak = true;
  let breakTime = 300;

  const breakInterval = setInterval(() => {
    breakTime--;
    document.getElementById("status").innerText = "Break: " + breakTime;

    if (breakTime <= 0) {
      clearInterval(breakInterval);
      playRandomAlarm();
      inBreak = false;
    }
  }, 1000);
}

function playRandomAlarm() {
  const sound = alarms[Math.floor(Math.random()*alarms.length)];
  new Audio(sound).play();
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    tabCounter++;
    document.getElementById("tabCount").innerText = tabCounter;
    triggerDistraction();
  }
});