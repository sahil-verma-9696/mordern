document.addEventListener("DOMContentLoaded", function () {
    // Get references to various HTML elements
    const audioPlayer = document.querySelector(".audio-player");
    const playlist = document.querySelectorAll(".playlist li");
    const playlistDisplay = document.querySelector(".playlist");
    const playPauseButton = document.querySelector(".play-pause-btn");
    const nextSongButton = document.querySelector(".next-song");
    const prevSongButton = document.querySelector(".pre-song");
    const loopButton = document.querySelector(".mode");
    const progressBar = document.querySelector(".progress-bar");
    const sliderScale = document.querySelector(".slider-scale");
    const sliderCircle = document.querySelector(".slider-circle");
    const currentTimeDisplay = document.querySelector(".current-time");
    const playlistButton = document.querySelector(".playlist-btn");

    // Initialize variables for the current track and drag state
    let currentTrack = 0;
    let isDraggingBar = false;
    // let isDraggingCircle = false;

    // Function to load a track by its index and start playing it
    function loadTrack(trackIndex) {
        const track = playlist[trackIndex];
        audioPlayer.src = track.getAttribute("data-src");
        audioPlayer.load();
        audioPlayer.play(); // Start playing the new track
        playPauseButton.innerHTML = '<i class="fa-solid fa-pause fa-2xl"></i>';
        updateActivePlaylistItem(trackIndex);
    }

    // Function to toggle play/pause
    function togglePlay() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseButton.innerHTML = '<i class="fa-solid fa-pause fa-2xl"></i>';
        } else {
            audioPlayer.pause();
            playPauseButton.innerHTML = '<i class="fa-solid fa-play fa-2xl"></i>';
        }
    }

    // Function to play the next track
    function nextTrack() {
        currentTrack = (currentTrack + 1) % playlist.length;
        loadTrack(currentTrack);
    }

    // Function to play the previous track
    function prevTrack() {
        currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrack);
    }

    // Function to toggle the loop mode
    function toggleLoop() {
        audioPlayer.loop = !audioPlayer.loop;
        if (audioPlayer.loop) {
            loopButton.innerHTML = '<i class="fa-solid fa-person-walking-arrow-loop-left fa-2xl"></i>';
        } else {
            loopButton.innerHTML = '<i class="fa-solid fa-person-walking-arrow-loop fa-2xl"></i>';
        }
    }

    // Event listener for the end of a track to play the next track
    audioPlayer.addEventListener("ended", nextTrack);

    // Event listener for time updates to update the progress bar and current time display
    audioPlayer.addEventListener("timeupdate", function () {
        if (!isDraggingBar) {
            const currentTime = audioPlayer.currentTime;
            const duration = audioPlayer.duration;
            const progress = (currentTime / duration) * 100;
            sliderScale.style.width = progress + "%";
            sliderCircle.style.left = progress + "%";
            currentTimeDisplay.textContent = formatTime(currentTime);

            // Update the subtitle based on the current time
            updateSubtitleForTime(currentTime);
        }
    });

    // Event listener to toggle play/pause
    playPauseButton.addEventListener("click", togglePlay);
    nextSongButton.addEventListener("click", nextTrack);
    prevSongButton.addEventListener("click", prevTrack);
    loopButton.addEventListener("click", toggleLoop);

    // Event listener for playlist items to load and play the selected track
    playlist.forEach((item, index) => {
        item.addEventListener("click", function () {
            currentTrack = index;
            loadTrack(currentTrack);
        });
    });

    // Event listener for slider bar drag
    progressBar.addEventListener("mousedown", () => {
        isDraggingBar = true;
        document.addEventListener("mousemove", updateProgressBar);
        document.addEventListener("mouseup", () => {
            isDraggingBar = false;
            document.removeEventListener("mousemove", updateProgressBar);
        });
    });

    // Event listener for slider circle drag
    sliderCircle.addEventListener("mousedown", () => {
        isDraggingCircle = true;
        document.addEventListener("mousemove", updateSliderCircle);
        document.addEventListener("mouseup", () => {
            isDraggingCircle = false;
            document.removeEventListener("mousemove", updateSliderCircle);
        });
    });

    // Event listener to update the progress bar when clicked
    progressBar.addEventListener("click", (e) => {
        const sliderRect = progressBar.getBoundingClientRect();
        const newPosition = (e.clientX - sliderRect.left) / sliderRect.width;
        const duration = audioPlayer.duration;

        if (newPosition >= 0 && newPosition <= 1) {
            audioPlayer.currentTime = newPosition * duration;
        }
    });

    // Function to update the progress bar when dragging
    function updateProgressBar(e) {
        const sliderRect = progressBar.getBoundingClientRect();
        const newPosition = (e.clientX - sliderRect.left) / sliderRect.width;
        const duration = audioPlayer.duration;

        if (newPosition >= 0 && newPosition <= 1) {
            audioPlayer.currentTime = newPosition * duration;
        }
    }

    // Function to update the slider circle when dragging
    function updateSliderCircle(e) {
        const sliderRect = progressBar.getBoundingClientRect();
        const newPosition = (e.clientX - sliderRect.left) / sliderRect.width;

        if (newPosition >= 0 && newPosition <= 1) {
            audioPlayer.currentTime = newPosition * audioPlayer.duration;
        }
    }

    // Function to format time in MM:SS format
    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    // Function to update the active playlist item
    function updateActivePlaylistItem(index) {
        playlist.forEach((item, idx) => {
            if (idx === index) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    }

    // Event listner toggle playlist
    playlistButton.addEventListener("click", () => {
        if (playlistDisplay.style.display === "none") {
            playlistDisplay.style.display = "block";
        } else {
            playlistDisplay.style.display = "none";
        }
    })

    function updateSubtitleForTime(currentTime) {
        // Find the subtitle that corresponds to the current time
        const currentSubtitle = findSubtitleForTime(currentTime);

        // Update the subtitle element
        updateSubtitle(currentSubtitle);
    }

    function findSubtitleForTime(currentTime) {
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        return formattedTime;
    }

    function updateSubtitle(subtitle) {
        // Update the subtitle element with the provided subtitle text
        const subtitleElement = document.querySelector(".lyrics");
        subtitleElement.textContent = subtitle;
    }



    // Load and play the first track when the page loads
    loadTrack(currentTrack);
});

if (window.innerWidth <= 768) {
    // Code for mobile devices (e.g., screen width is 768 pixels or less)
    const imgs = document.querySelectorAll(".imgs");
    imgs.forEach((elem) => {
        elem.style.display = "none";
    })
} else {
    // Code for other devices (e.g., desktop)
    Shery.imageEffect("#back", {
        style: 5,
        // debug: true,
        config: { "a": { "value": 0.74, "range": [0, 30] }, "b": { "value": 0.75, "range": [-1, 1] }, "zindex": { "value": -9996999, "range": [-9999999, 9999999] }, "aspect": { "value": 1.8708891595615103 }, "gooey": { "value": true }, "infiniteGooey": { "value": true }, "growSize": { "value": 4, "range": [1, 15] }, "durationOut": { "value": 1, "range": [0.1, 5] }, "durationIn": { "value": 1.5, "range": [0.1, 5] }, "displaceAmount": { "value": 0.5 }, "masker": { "value": true }, "maskVal": { "value": 1.2, "range": [1, 5] }, "scrollType": { "value": 0 }, "geoVertex": { "range": [1, 64], "value": 1 }, "noEffectGooey": { "value": false }, "onMouse": { "value": 1 }, "noise_speed": { "value": 0.2, "range": [0, 10] }, "metaball": { "value": 0.2, "range": [0, 2] }, "discard_threshold": { "value": 0.5, "range": [0, 1] }, "antialias_threshold": { "value": 0, "range": [0, 0.1] }, "noise_height": { "value": 0.5, "range": [0, 2] }, "noise_scale": { "value": 5.79, "range": [0, 100] } },
        gooey: true,
    });
}