const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const progress = document.getElementById('progress');
const coverImage = document.getElementById('cover');
const titleElement = document.getElementById('title');
const eqAnimation = document.getElementById('equalizer');

const songs = [
    {
        src: 'audio/relaxed-vlog-131746.mp3', // 替換成實際的音樂檔案
        title: 'Relax Vlog',// 替換成實際的音樂名稱
        cover: 'cover/drew-taylor-7liDpl93wt4-unsplash.jpg' // 替換成實際的封面圖片
    },
    {
        src: 'audio/dreams.mp3',
        title: 'Dreams',
        cover: 'cover/filip-zrnzevic-Ceuh97A6OYM-unsplash.jpg'
    },
    {
        src: 'audio/melancholylull.mp3',
        title: 'Melancholy Lull',
        cover: 'cover/joel-vodell-8Ogfqvw15Rg-unsplash.jpg'
    }
];

let currentSongIndex = 0;

function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    titleElement.textContent = song.title;
    coverImage.src = song.cover;
    audio.load();
}

function playSong() {
    audio.play();
    playButton.style.display = 'none';
    pauseButton.style.display = 'block';
    if (eqAnimation && eqAnimation.play) {
        eqAnimation.loop = true; // Set the animation to loop
        eqAnimation.play();
    }
}

function pauseSong() {
    audio.pause();
    playButton.style.display = 'block';
    pauseButton.style.display = 'none';
    if (eqAnimation && eqAnimation.stop) {
        eqAnimation.stop();
    }
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

function updateProgress() {
    const { duration, currentTime } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.value = progressPercent;

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);

    currentTimeElement.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
    durationElement.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}


function handleSongEnd() {
    playButton.style.display = 'block';
    pauseButton.style.display = 'none';
    nextSong();
}

playButton.addEventListener('click', playSong);
pauseButton.addEventListener('click', pauseSong);
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progress.addEventListener('click', setProgress);
audio.addEventListener('loadedmetadata', updateProgress);
audio.addEventListener('ended', handleSongEnd);

// 初始載入第一首歌曲
loadSong(currentSongIndex);

