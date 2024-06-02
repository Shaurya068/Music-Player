let song1 = document.querySelector("#s1");
let song2 = document.querySelector("#s2");
let song3 = document.querySelector("#s3");
let song4 = document.querySelector("#s4");
let songs = [song1, song2, song3, song4];
let back = document.querySelector(".back");
let play = document.querySelector(".plays");
let forw = document.querySelector(".forward");
let title = document.querySelector(".songName");
let image = document.querySelector(".imagesa")
let i1 = document.querySelector("#i1");
let i2 = document.querySelector("#i2");
let i3 = document.querySelector("#i3");
let i4 = document.querySelector("#i4");
let images = [i1, i2, i3, i4];
let time = document.querySelector(".time input"); // Select the input element inside the .time div
let pause = true;
let currentsongindex = 0;
const updateImage = () => {
    image.src = images[currentsongindex].src;
    images[currentsongindex].style.width = image.style.width;
    images[currentsongindex].style.height = image.style.height;
    images[currentsongindex].style.border = image.style.border;
    images[currentsongindex].style.borderRadius = image.style.borderRadius;
    images[currentsongindex].style.marginBottom = image.style.marginBottom;

}

const updateSongInfo = () => {
    title.innerText = songs[currentsongindex].textContent;
    time.max = songs[currentsongindex].duration || 0;
    time.value = songs[currentsongindex].currentTime;

    image.src = images[currentsongindex].src;
    console.log(time.value);
};

play.addEventListener('click', () => {
    if (pause) {
        play.innerHTML = '<i class="fas fa-pause"></i>';
        pause = false;
        songs[currentsongindex].play();
        updateSongInfo();
        updateImage();
    } else {
        play.innerHTML = '<i class="fa-solid fa-play"></i>';
        pause = true;
        songs[currentsongindex].pause();
    }
});

songs.forEach((song, index) => {
    song.addEventListener('timeupdate', () => {
        if (!pause) {
            time.value = song.currentTime;
        }
    });

    song.addEventListener('loadedmetadata', () => {
        if (index === currentsongindex) {
            updateSongInfo();
        }
    });

    song.addEventListener('ended', () => {
        currentsongindex = (currentsongindex + 1) % songs.length;
        playSong();
    });
});

time.addEventListener('input', () => {
    songs[currentsongindex].currentTime = time.value;
});

forw.addEventListener('click', () => {
    songs[currentsongindex].pause();
    currentsongindex = (currentsongindex + 1) % songs.length;
    songs[currentsongindex].currentTime = 0;
    updateImage();
    playSong();

});

back.addEventListener('click', () => {
    songs[currentsongindex].pause();
    currentsongindex = (currentsongindex - 1 + songs.length) % songs.length;
    songs[currentsongindex].currentTime = 0;
    updateImage();

    playSong();

});

const playSong = () => {
    songs[currentsongindex].play();
    play.innerHTML = '<i class="fas fa-pause"></i>';
    pause = false;
    updateSongInfo();
};


updateSongInfo();
