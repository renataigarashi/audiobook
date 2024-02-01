const chapterName = document.getElementById('chapter');
const buttonPlayPause = document.getElementById('play-pause');
const buttonNextChapter = document.getElementById('next');
const buttonPreviousChapter = document.getElementById('previous');
const audio = document.getElementById('audio-chapter');
const progress = document.getElementById('audio-progress');
const chaptersQuantity = 10;
let isPlaying = false;
let chapter = 1;

const playTrack = () => {
  audio.play();
  buttonPlayPause.querySelector('i').classList.remove('bi-play-circle');
  buttonPlayPause.querySelector('i').classList.add('bi-pause-circle');
  isPlaying = true;
};

const pauseTrack = () => {
  audio.pause();
  buttonPlayPause.querySelector('i').classList.add('bi-play-circle');
  buttonPlayPause.querySelector('i').classList.remove('bi-pause-circle');
  isPlaying = false;
};

const playOrPause = () => {
  isPlaying ? pauseTrack() : playTrack();
};

const updateProgressBar = () => {
  const progressValue = (audio.currentTime / audio.duration) * 100;
  progress.value = progressValue;
};

const seek = (event) => {
  const seekTime = (event.offsetX / progress.clientWidth) * audio.duration;
  audio.currentTime = seekTime;
};

const nextChapter = () => {
  chapter++;
  audio.src = `books/dom-casmurro/${chapter}.mp3`;
  chapterName.innerText = `Capítulo ${chapter}`;
  playTrack();
};

const previousChapter = () => {
  chapter === 1 ? (chapter = chaptersQuantity) : chapter--;
  audio.src = `books/dom-casmurro/${chapter}.mp3`;
  chapterName.innerText = `Capítulo ${chapter}`;
  playTrack();
};

buttonPlayPause.addEventListener('click', playOrPause);
buttonNextChapter.addEventListener('click', nextChapter);
buttonPreviousChapter.addEventListener('click', previousChapter);
audio.addEventListener('ended', nextChapter);
audio.addEventListener('timeupdate', updateProgressBar);
progress.addEventListener('click', seek);
