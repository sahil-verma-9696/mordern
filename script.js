Shery.imageEffect("#back", {
    style: 5,
    gooey: true,
});

const lyricsData = {
    "Aadat": {
        lyrics: [
            {
                time: "00:00",
                text: "Kaise bataaye, kaise jataaye"
            },
            {
                time: "00:09",
                text: "Subah tak tujhme jeena chahein"
            },
            {
                time: "00:19",
                text: "Bheege labon ki, geeli hansi ko"
            },
            {
                time: "00:26",
                text: "Peene ka mausam hai peena chahein"
            },
            {
                time: "00:35",
                text: "Ik baat kahoon kya ijazat hai"
            },
            {
                time: "00:45",
                text: "Tere ishq ki mujhko aadat hai"
            },
            {
                time: "00:53",
                text: "Ik baat kahoon kya ijazat hai"
            },
            {
                time: "01:02",
                text: "Tere ishq ki mujhko.."
            },
            {
                time: "01:11",
                text: "Aadat hai o.. aadat hai.."
            },
            {
                time: "01:20",
                text: "Aadat hai o.. aadat hai.."
            },
            {
                time: "01:29",
                text: "Ehsaas tere aur mere toh"
            },
            {
                time: "01:38",
                text: "Ik dooje se judd rahe"
            },
            {
                time: "01:45",
                text: "Ik teri talab mujhe aisi lagi"
            },
            {
                time: "01:52",
                text: "Mere hosh bhi udne lage"
            },
            {
                time: "02:00",
                text: "Mujhe milta sukoon teri baahon mein"
            },
            {
                time: "02:09",
                text: "Jannat jaisi ek raahat hai"
            },
            {
                time: "02:18",
                text: "Ik baat kahoon kya ijazat hai"
            },
            {
                time: "02:27",
                text: "Tere ishq ki mujhko aadat hai"
            },
            {
                time: "02:35",
                text: "Ik baat kahoon kya ijazat hai"
            },
            {
                time: "02:44",
                text: "Tere ishq ki mujhko.."
            },
            {
                time: "02:53",
                text: "Aadat hai o.. aadat hai.."
            },
            {
                time: "03:02",
                text: "Aadat hai o.. aadat hai.."
            },
            {
                time: "03:11",
                text: "Kyun sabse juda, kyun sabse alag"
            },
            {
                time: "03:20",
                text: "Andaaz tere lagte.."
            },
            {
                time: "03:27",
                text: "Besaakh ta hum saaye se tere"
            },
            {
                time: "03:34",
                text: "Har shaam lipat’te hain"
            },
            {
                time: "03:42",
                text: "Har waqt mera, qurbat mein teri"
            },
            {
                time: "03:51",
                text: "Jab guzre toh ibadat hai"
            },
            {
                time: "03:59",
                text: "Ik baat kahoon kya ijazat hai"
            },
            {
                time: "04:08",
                text: "Tere ishq ki mujhko aadat hai"
            },
            {
                time: "04:16",
                text: "Ik baat kahoon kya ijazat hai"
            },
            {
                time: "04:25",
                text: "Tere ishq ki mujhko.."
            },
            {
                time: "04:34",
                text: "Aadat hai o.. aadat hai.."
            },
            {
                time: "04:43",
                text: "Aadat hai o.. teri aadat hai.."
            }
        ]
    }
};


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
    let isDraggingCircle = false;

    // Function to load a track by its index and start playing it
    function loadTrack(trackIndex) {
        const track = playlist[trackIndex];
        audioPlayer.src = track.getAttribute("data-src");
        audioPlayer.load();
        audioPlayer.play(); // Start playing the new track
        playPauseButton.innerHTML = '<i class="fa-solid fa-pause fa-2xl"></i>';
        updateActivePlaylistItem(trackIndex);

        // Update the lyrics based on the selected track
        const lyrics = track.getAttribute("data-lyrics");
        updateLyrics(lyrics);
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

            if (!isDraggingBar) {
                const currentTime = audioPlayer.currentTime;
                displayLyricsForTime("Aadat", currentTime); // Replace "Aadat" with the track name
            }
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

    function updateLyricsForTime(currentTime) {
        // Find the lyrics that correspond to the current time
        const currentLyrics = findLyricsForTime(currentTime);

        // Update the lyrics element
        updateLyrics(currentLyrics);
    }

    function displayLyricsForTime(trackName, currentTime) {
        const lyricsDataForTrack = lyricsData[trackName];
        if (!lyricsDataForTrack) {
            // Track not found in the lyrics data
            return;
        }
    
        const lyrics = lyrics;
        let currentLyrics = "Lyrics not found";
    
        for (let i = 0; i < lyrics.length; i++) {
            const line = lyrics[i];
            if (line.time <= currentTime) {
                currentLyrics = line.text;
            } else {
                break;
            }
        }
    
        // Update the lyrics element with the current lyrics
        updateLyrics(currentLyrics);
    }
    

    function updateLyrics(lyrics) {
        // Update the lyrics element with the provided lyrics text
        const lyricsElement = document.querySelector(".lyrics");
        lyricsElement.textContent = lyrics;
    }


    // Load and play the first track when the page loads
    loadTrack(currentTrack);
});