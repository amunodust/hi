const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause");
const playPauseImg = document.getElementById("play-icon");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const timeLabel = document.getElementById("time");
const volumeControl = document.getElementById("volume");

function formatTime(s) {
  const min = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

audio.addEventListener("loadedmetadata", () => {
  timeLabel.textContent = `0:00 / ${formatTime(audio.duration)}`;
});

audio.addEventListener("timeupdate", () => {
  const percent = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  progress.style.width = percent + "%";
  timeLabel.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
});

playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseImg.src = "images/pause.png";
    playPauseImg.alt = "一時停止";
  } else {
    audio.pause();
    playPauseImg.src = "images/play.PNG";
    playPauseImg.alt = "再生";
  }
});

progressContainer.addEventListener("click", e => {
  const rect = progressContainer.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  audio.currentTime = (clickX / rect.width) * audio.duration;
});

volumeControl.addEventListener("input", () => {
  audio.volume = volumeControl.value;
});


