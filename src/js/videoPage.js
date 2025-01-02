import axios from "axios";
import { darkMode } from "./darkMode.js";
import { goHomeFunc } from "./goToHomePage.js";
import { carryTextFunc } from "./app.js";

// dark mode
// darkMode();
// go to home
goHomeFunc();

// for other page 
// export function videoClickedFunc(video) {
//     console.log("video is clicked");
//     console.log(video);
//     const videoId = video.dataset.videoId;
//     window.location.href = `videoPage.html?id=${videoId}`;
// }

const currentUrl = window.location.href;
console.log('Current URL:', currentUrl);

// base variables

const API_KEY = "AIzaSyCvny8BgZliBGVdkYVUSVHl7vMtgjta3kE";
const videoId = new URLSearchParams(window.location.search).get('videoId');
console.log(videoId)
let player = document.getElementById("player");




// Load Youtube Iframe API
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);




// create Youtube player when API is ready
window.onYouTubeIframeAPIReady = () => {
    player = new YT.Player('player', {
        videoId: videoId,
        playerVars: {
            autoplay: 1,
            modestbranding: 1,
            rel: 0
        }
    });
};


async function loadVideoDetails() {
    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
            params: {
                id: videoId,
                key: API_KEY,
                part: "snippet, statistics"
            }
        });
        const videoData = response.data.items[0];
        console.log("video data: ", videoData);

        document.getElementById("video-title").innerText = videoData.snippet.title;
        document.getElementById("video-description").innerHTML = `
                <p><strong>${videoData.statistics.viewCount} views ${new Date(videoData.snippet.publishedAt).toLocaleString()}</strong></p>
                <p>${videoData.snippet.description}</p>
            `;
        document.getElementById("like-count").innerText = videoData.statistics.likeCount;
        document.getElementById("comment-count").innerText = videoData.statistics.commentCount;
        document.getElementById("channel-name").innerText = videoData.snippet.channelTitle;

        loadChannelDetails(videoData.snippet.channelId);
        loadComments();
    } catch (error) {
        console.error(error);

    }
}

async function loadChannelDetails(channelId) {
    try {
        const response = await axios.get("https://www.googleapis.com/youtube/v3/channels", {
            params: {
                id: channelId,
                key: API_KEY,
                part: "snippet, statistics"
            }
        });

        const channelData = response.data.items[0];
        console.log("🚀 ~ loadChannelDetails ~ channelData:", channelData)

        // subscriber-count
        document.getElementById("subscriber-count").innerText = channelData.statistics.subscriberCount;
        document.getElementById('channel-avatar').src = channelData.snippet.thumbnails.default.url;

    } catch (error) {
        console.error('Error loading channel details:', error);
    }
}

async function loadComments() {
    try {
        const response = await axios.get("https://www.googleapis.com/youtube/v3/commentThreads", {
            params: {
                videoId: videoId,
                key: API_KEY,
                part: "snippet",
                maxResults: 10
            }
        });
        const data = response.data;
        console.log("🚀 ~ loadComments ~ data:", data)

        const container = document.getElementById('comments-container');
        container.innerHTML = data.items.map(comment => {
            const c = comment.snippet.topLevelComment.snippet;
            return `
                <div class="comment">
                        <img src="${c.authorProfileImageUrl}" alt="${c.authorDisplayName}">
                        <div class="comment-content">
                            <div class="comment-header">
                                <span class="comment-author">${c.authorDisplayName}</span>
                                <span class="comment-date">
                                    ${new Date(c.publishedAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p>${c.textDisplay}</p>
                            <div class="comment-actions">
                                <button>
                                    <i class="fas fa-thumbs-up"></i>
                                    ${c.likeCount}
                                </button>
                                <button>
                                    <i class="fas fa-thumbs-down"></i>
                                </button>
                                <button>Reply</button>
                            </div>
                        </div>
                </div>
            `;
        }).join('');

    } catch (error) {
        console.error('Error loading comments:', error);

    }
}
// load video details when page is loaded


// relatedVideos

async function loadRelatedVideos() {
    try {
        const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
            params: {
                relatedToVIdeoId: videoId,
                key: API_KEY,
                part: "snippet",
                type: "video",
                maxResults: 10
            }
        });
        const data = response.data;
        console.log("��� ~ loadRelatedVideos ~ data:", data)

        const container = document.getElementById('related-videos-container');
        container.innerHTML = data.items.map(video => `
            <div class="related-video-card" data-video-id="${video.id.videoId}">
                <div class="related-video-thumbnail">
                    <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}">
                </div>
                <div class="related-video-info">
                    <h4>${video.snippet.title}</h4>
                    <div class="related-video-meta">
                        <div>${video.snippet.channelTitle}</div>
                    </div>
                </div>
            </div>
        `).join('');

        const relatedVideos = document.querySelectorAll('.related-video-card');
        relatedVideos.forEach(video => {
            video.addEventListener("click", () => {
                console.log("video is clicked");
                console.log(video);
                const videoId = video.dataset.videoId;
                window.location.href = `videoPage.html?videoId=${videoId}`;
            })
        })
    } catch (error) {
        console.error('Error loading related videos:', error);
    }
}
// loadRelatedVideos()

window.addEventListener("DOMContentLoaded", () => {
    loadVideoDetails();
    loadRelatedVideos();
})


// Search function
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener("click", carryTextFunc)
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        carryTextFunc();
    }
})