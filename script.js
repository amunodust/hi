const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause");
const playPauseImg = document.getElementById("play-icon");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const timeLabel = document.getElementById("time");

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseImg.src = "images/pause.png"; 
    playPauseImg.alt = "一時停止";
  } else {
    audio.pause();
    playPauseImg.src = "images/play.png";
    playPauseImg.alt = "再生";
  }
});

audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100 || 0;
  progress.style.width = percent + "%";
  timeLabel.textContent = formatTime(audio.currentTime);
});

progressContainer.addEventListener("click", (e) => {
  const rect = progressContainer.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const newTime = (clickX / rect.width) * audio.duration;
  audio.currentTime = newTime;
});
