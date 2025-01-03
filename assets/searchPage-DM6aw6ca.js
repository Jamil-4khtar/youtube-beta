import{d as p,g,a as i}from"./register-Bb6nlgJK.js";p();g();const a=document.getElementById("search-input"),h=document.getElementById("search-button"),o=document.querySelector(".video-container"),s=[],r="AIzaSyCvny8BgZliBGVdkYVUSVHl7vMtgjta3kE",m="https://www.googleapis.com/youtube/v3/search",u="https://www.googleapis.com/youtube/v3/channels";if(localStorage.getItem("searchText")){let e=JSON.parse(localStorage.getItem("searchText"));a.value=e,l(),localStorage.removeItem("searchText")}async function l(){console.log("🚀 :",a.value.trim()),localStorage.setItem("reloadText",JSON.stringify(a.value.trim())),o.innerHTML="",o.innerHTML="Loading videos...";try{let t=(await i.get(m,{params:{key:r,part:"snippet",regionCode:"US",q:a.value.trim(),maxResults:70}})).data.items;o.innerHTML="",t.forEach(n=>{v(n)})}catch(e){console.error(e),o.innerHTML=`
            <div class="error">
                <p>Something went wrong.</p>
                <p>${e.message}. Please ty again.</p>
            </div>
        `}}async function v(e){try{const n=(await i.get(u,{params:{id:e.snippet.channelId,key:r,part:"snippet"}})).data.items[0].snippet.thumbnails;e.channelIcon=n,console.log(e),s.push(e),c(e),localStorage.setItem("videos",JSON.stringify(s))}catch(t){console.error("channel error dekho: ",t)}}function c(e){o.innerHTML+=`
            <div class="video-card" data-video-id = ${e.id.videoId}>

                <img class="thumbnails" src="${e.snippet.thumbnails.high.url}" alt="${e.snippet.description}" class="thumbnail">

                <div class="icon-title">
                    <h3 class="title">${e.snippet.title}</h3>
                    <div class="title-div">
                        <img class="channel-icon" src="${e.channelIcon.default.url}" alt="channel-logo">
                        <p class="channel-name">${e.snippet.channelTitle}</p>
                    </div>
                    <p class="description">${e.snippet.description}</p>

                </div>
                
            </div>
        `,document.querySelectorAll(".video-card").forEach(t=>{t.addEventListener("click",()=>{console.log("video is clicked"),console.log(t);const n=t.dataset.videoId;console.log(n),window.location.href=`/youtube-beta/src/pages/videoPage.html?videoId=${n}`})})}function d(){a.value.trim()&&(console.log("Searching..."),l())}h.addEventListener("click",d);a.addEventListener("keypress",e=>{e.key==="Enter"&&d()});window.addEventListener("load",()=>{if(localStorage.getItem("videos")){console.log("trying to reload");let e=JSON.parse(localStorage.getItem("reloadText"));a.value=e.trim();let t=JSON.parse(localStorage.getItem("videos"));o.innerHTML="",o.innerHTML="Loading videos...",o.innerHTML="",t.forEach(n=>{c(n)})}});
