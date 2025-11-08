const sounds = document.querySelectorAll(".sounds button");
const breatheText = document.getElementById("breatheText");
const themeToggle = document.getElementById("themeToggle");
const startTimerBtn = document.getElementById("startTimer");
const minutesInput = document.getElementById("minutes");

let currentAudio = null;
let isDark = false;

// ========== SOUND PLAYER ==========
sounds.forEach(btn => {
  btn.addEventListener("click", () => {
    const soundId = btn.dataset.sound;
    const audio = document.getElementById(soundId);

    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    if (audio.paused) {
      audio.play();
      currentAudio = audio;
      btn.textContent = "⏸ Pause";
    } else {
      audio.pause();
      btn.textContent = btn.dataset.sound === "rain" ? "🌧 Rain" :
                        btn.dataset.sound === "ocean" ? "🌊 Ocean" :
                        btn.dataset.sound === "forest" ? "🌲 Forest" :
                        "💨 Wind";
    }
  });
});

// ========== BREATHING ANIMATION ==========
const phases = ["Inhale...", "Hold...", "Exhale...", "Hold..."];
let phase = 0;

setInterval(() => {
  breatheText.textContent = phases[phase];
  phase = (phase + 1) % phases.length;
}, 4000);

// ========== THEME TOGGLE ==========
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  isDark = !isDark;
  themeToggle.textContent = isDark ? "🌞 Light Mode" : "🌗 Dark Mode";
});

// ========== RELAX TIMER ==========
startTimerBtn.addEventListener("click", () => {
  const mins = parseInt(minutesInput.value);
  if (isNaN(mins) || mins <= 0) return alert("Enter valid minutes!");

  setTimeout(() => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      alert("⏰ Time’s up! Session complete.");
    }
  }, mins * 60000);
});
