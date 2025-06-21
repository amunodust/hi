document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("enter-btn");
  const loader = document.getElementById("loader");
  const canvas = document.querySelector(".canvas");
  const musicPlayer = document.getElementById("music-player");
  const audio = document.getElementById("audio");
  const playPauseBtn = document.getElementById("play-pause");
  const playPauseImg = document.getElementById("play-icon");
  const progressContainer = document.getElementById("progress-container");
  const progress = document.getElementById("progress");
  const timeLabel = document.getElementById("time");
  const volumeControl = document.getElementById("volume");

  // スピナーがあれば非表示にして、ボタンを表示
  const spinner = document.querySelector(".spinner");
  if (spinner) spinner.style.display = "none";
  button.style.display = "block";

  // 音楽再生位置の時間表記を整える関数
  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  }

  // 再生可能になったら合計時間表示
  audio.addEventListener("loadedmetadata", () => {
    timeLabel.textContent = `0:00 / ${formatTime(audio.duration)}`;
  });

  // 再生中の更新
  audio.addEventListener("timeupdate", () => {
    const percent = (audio.currentTime / audio.duration) * 100 || 0;
    progress.style.width = `${percent}%`;
    timeLabel.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
  });

  // 再生/一時停止トグル
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

  // プログレスバーのクリックでシーク
  progressContainer.addEventListener("click", (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = clickX / rect.width;
    audio.currentTime = ratio * audio.duration;
  });

  // 音量変更
  volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
  });

  // ボタン押下時に画面切り替え＆音楽再生
  button.addEventListener("click", () => {
    loader.style.display = "none";
    canvas.style.display = "block";
    musicPlayer.style.display = "flex";

    audio.play().catch((err) => {
      console.warn("自動再生がブロックされました:", err);
    });
  });
});



