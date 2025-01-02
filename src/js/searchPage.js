import axios from "axios";
import { goHomeFunc } from "./goToHomePage";
import { darkMode } from "./darkMode";

const BASE_URL = import.meta.env.BASE_URL;
// dark mode
darkMode();

// go to the home page
goHomeFunc();


// console.log("Starting.....");

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const videoContainer = document.querySelector('.video-container');
const ArrayOfVideos = []; //for local search


const API_KEY = "AIzaSyCvny8BgZliBGVdkYVUSVHl7vMtgjta3kE";
const SEARCH_API_URL = "https://www.googleapis.com/youtube/v3/search";
const CHANNEL_API_URL = "https://www.googleapis.com/youtube/v3/channels";



// Search from HomePage
if (localStorage.getItem("searchText")) {
    let searchText = JSON.parse(localStorage.getItem("searchText"));

    searchInput.value = searchText;

    searchVideosFunc();

    localStorage.removeItem("searchText");
}

// console.log(searchInput.value);
async function searchVideosFunc() {

    console.log("🚀 :", searchInput.value.trim());
    localStorage.setItem("reloadText", JSON.stringify(searchInput.value.trim()));


    videoContainer.innerHTML = ""; // remove previous content
    videoContainer.innerHTML = "Loading videos...";
    try {
        let response = await axios.get(SEARCH_API_URL, {
            params: {
                key: API_KEY,
                part: "snippet",
                regionCode: "US",
                q: searchInput.value.trim(),
                maxResults: 70
            }
        });
        let videos = response.data.items;
        videoContainer.innerHTML = ""; // remove loading indicator

        // get channel info for each video
        videos.forEach(video => {
            getChannelInfo(video)
        });

    } catch (error) {
        console.error(error);
        videoContainer.innerHTML = `
            <div class="error">
                <p>Something went wrong.</p>
                <p>${error.message}. Please ty again.</p>
            </div>
        `;
    }
}




async function getChannelInfo(video) {
    try {
        let response = await axios.get(CHANNEL_API_URL, {
            params: {
                id: video.snippet.channelId,
                key: API_KEY,
                part: "snippet"
            }
        });
        const channelData = response.data.items[0].snippet.thumbnails;

        video.channelIcon = channelData;

        console.log(video);

        ArrayOfVideos.push(video); // array of videos for localStorage

        // display each video
        displayVideo(video)

        localStorage.setItem("videos", JSON.stringify(ArrayOfVideos));


    } catch (error) {
        console.error("channel error dekho: ", error);
    }
}

// display each video
function displayVideo(video) {

    videoContainer.innerHTML += `
            <div class="video-card" data-video-id = ${video.id.videoId}>

                <img class="thumbnails" src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="thumbnail">

                <div class="icon-title">
                    <h3 class="title">${video.snippet.title}</h3>
                    <div class="title-div">
                        <img class="channel-icon" src="${video.channelIcon.default.url}" alt="channel-logo">
                        <p class="channel-name">${video.snippet.channelTitle}</p>
                    </div>
                    <p class="description">${video.snippet.description}</p>

                </div>
                
            </div>
        `;

    document.querySelectorAll('.video-card').forEach(eachVideo => {
        eachVideo.addEventListener("click", () => {
            console.log("video is clicked");
            console.log(eachVideo);
            const videoId = eachVideo.dataset.videoId;
            console.log(videoId)
            window.location.href = `${BASE_URL}src/pages/videoPage.html?videoId=${videoId}`;
        })
    })


}

function handleSearch() {
    if (searchInput.value.trim()) {
        console.log("Searching...");

        searchVideosFunc()
    }
}



searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        handleSearch()
    }
});





window.addEventListener("load", () => {
    // reload the searced videos from the localStorage
    if (localStorage.getItem("videos")) {
        console.log("trying to reload");

        let reloadText = JSON.parse(localStorage.getItem("reloadText"));
        searchInput.value = reloadText.trim();

        let videos = JSON.parse(localStorage.getItem("videos"));
        // console.log("🚀 ~ localvideos:", videos)
        videoContainer.innerHTML = "";
        videoContainer.innerHTML = "Loading videos...";
        videoContainer.innerHTML = "";

        videos.forEach(video => {
            // console.log("🚀 ~ video from storage:", video)
            displayVideo(video)
        });
    }
})