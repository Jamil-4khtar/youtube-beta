import{g as p,a as s}from"./register-Bb6nlgJK.js";import{c as d}from"./auth-DUcfcsZs.js";p();const u=window.location.href;console.log("Current URL:",u);const i="AIzaSyCvny8BgZliBGVdkYVUSVHl7vMtgjta3kE",a=new URLSearchParams(window.location.search).get("videoId");console.log(a);document.getElementById("player");const l=document.createElement("script");l.src="https://www.youtube.com/iframe_api";const r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(l,r);window.onYouTubeIframeAPIReady=()=>{new YT.Player("player",{videoId:a,playerVars:{autoplay:1,modestbranding:1,rel:0}})};async function g(){try{const e=(await s.get("https://www.googleapis.com/youtube/v3/videos",{params:{id:a,key:i,part:"snippet, statistics"}})).data.items[0];console.log("video data: ",e),document.getElementById("video-title").innerText=e.snippet.title,document.getElementById("video-description").innerHTML=`
                <p><strong>${e.statistics.viewCount} views ${new Date(e.snippet.publishedAt).toLocaleString()}</strong></p>
                <p>${e.snippet.description}</p>
            `,document.getElementById("like-count").innerText=e.statistics.likeCount,document.getElementById("comment-count").innerText=e.statistics.commentCount,document.getElementById("channel-name").innerText=e.snippet.channelTitle,v(e.snippet.channelId),y()}catch(n){console.error(n)}}async function v(n){try{const o=(await s.get("https://www.googleapis.com/youtube/v3/channels",{params:{id:n,key:i,part:"snippet, statistics"}})).data.items[0];console.log("🚀 ~ loadChannelDetails ~ channelData:",o),document.getElementById("subscriber-count").innerText=o.statistics.subscriberCount,document.getElementById("channel-avatar").src=o.snippet.thumbnails.default.url}catch(e){console.error("Error loading channel details:",e)}}async function y(){try{const e=(await s.get("https://www.googleapis.com/youtube/v3/commentThreads",{params:{videoId:a,key:i,part:"snippet",maxResults:10}})).data;console.log("🚀 ~ loadComments ~ data:",e);const o=document.getElementById("comments-container");o.innerHTML=e.items.map(c=>{const t=c.snippet.topLevelComment.snippet;return`
                <div class="comment">
                        <img src="${t.authorProfileImageUrl}" alt="${t.authorDisplayName}">
                        <div class="comment-content">
                            <div class="comment-header">
                                <span class="comment-author">${t.authorDisplayName}</span>
                                <span class="comment-date">
                                    ${new Date(t.publishedAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p>${t.textDisplay}</p>
                            <div class="comment-actions">
                                <button>
                                    <i class="fas fa-thumbs-up"></i>
                                    ${t.likeCount}
                                </button>
                                <button>
                                    <i class="fas fa-thumbs-down"></i>
                                </button>
                                <button>Reply</button>
                            </div>
                        </div>
                </div>
            `}).join("")}catch(n){console.error("Error loading comments:",n)}}async function h(){try{const e=(await s.get("https://www.googleapis.com/youtube/v3/search",{params:{relatedToVIdeoId:a,key:i,part:"snippet",type:"video",maxResults:10}})).data;console.log("��� ~ loadRelatedVideos ~ data:",e);const o=document.getElementById("related-videos-container");o.innerHTML=e.items.map(t=>`
            <div class="related-video-card" data-video-id="${t.id.videoId}">
                <div class="related-video-thumbnail">
                    <img src="${t.snippet.thumbnails.medium.url}" alt="${t.snippet.title}">
                </div>
                <div class="related-video-info">
                    <h4>${t.snippet.title}</h4>
                    <div class="related-video-meta">
                        <div>${t.snippet.channelTitle}</div>
                    </div>
                </div>
            </div>
        `).join(""),document.querySelectorAll(".related-video-card").forEach(t=>{t.addEventListener("click",()=>{console.log("video is clicked"),console.log(t);const m=t.dataset.videoId;window.location.href=`videoPage.html?videoId=${m}`})})}catch(n){console.error("Error loading related videos:",n)}}window.addEventListener("DOMContentLoaded",()=>{g(),h()});const w=document.getElementById("search-input"),I=document.getElementById("search-button");I.addEventListener("click",d);w.addEventListener("keypress",n=>{n.key==="Enter"&&d()});
