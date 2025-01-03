import{d,g as m,a as c}from"./register-C8IjAsV9.js";const u="/";console.log(u);d();m();const a=document.getElementById("search-input"),h=document.getElementById("search-button"),o=document.querySelector(".video-container"),i="AIzaSyCvny8BgZliBGVdkYVUSVHl7vMtgjta3kE",p="https://www.googleapis.com/youtube/v3/videos",g="https://www.googleapis.com/youtube/v3/channels";async function y(){o.innerHTML="",o.innerHTML="Loading...";try{const e=await c.get(p,{params:{key:i,chart:"mostPopular",part:"snippet",regionCode:"US",maxResults:70}});o.innerHTML="",e.data.items.forEach(t=>{v(t)})}catch(e){console.error(" Ye gadbad hein: ",e),o.innerHTML=`
            <div class="error">
                <p>Something went wrong.</p>
                <p>${e.message}. Please try again.</p>
            </div>
        `}}async function v(e){try{const t=(await c.get(g,{params:{id:e.snippet.channelId,key:i,part:"snippet"}})).data.items[0].snippet.thumbnails;e.channelIcon=t,console.log(e),E(e)}catch(n){console.error("channel error dekho: ",n)}}function E(e){o.innerHTML+=`
            <div class="video-card" data-video-id="${e.id}">

                <img class="thumbnails" src="${e.snippet.thumbnails.maxres.url}" alt="${e.snippet.description}" class="thumbnail">

                <div class="icon-title">
                        <img class="channel-icon" src="${e.channelIcon.default.url}" alt="channel-logo">
                        
                        <div class="title-div">
                            <h3 class="title">${e.snippet.title}</h3>
                            <p class="channel-name">${e.snippet.channelTitle}</p>
                        </div>

                </div>
                
            </div>
        `,document.querySelectorAll(".video-card").forEach(n=>{n.addEventListener("click",()=>{console.log("video is clicked"),console.log(n);const t=n.dataset.videoId;window.location.href=`/src/pages/videoPage.html?videoId=${t}`})})}document.addEventListener("DOMContentLoaded",()=>{y()});h.addEventListener("click",r);a.addEventListener("keypress",e=>{e.key==="Enter"&&r()});function r(){const e=a.value.trim();e&&(localStorage.setItem("searchText",JSON.stringify(e)),window.location.href="/src/pages/searchPage.html")}const s=document.getElementById("authModal"),f=document.querySelector(".close-modal"),L=document.querySelector(".right #userIcon"),l=document.querySelectorAll(".tab-btn");document.getElementById("loginForm");document.getElementById("signupForm");L.addEventListener("click",()=>{console.log("User clicked"),s.style.display="block"});f.addEventListener("click",()=>{s.style.display="none"});window.addEventListener("click",e=>{e.target===s&&(s.style.display="none")});l.forEach(e=>{e.addEventListener("click",()=>{I(e.dataset.tab)})});function I(e){document.querySelectorAll(".auth-form").forEach(t=>t.classList.remove("active")),l.forEach(t=>t.classList.remove("active")),document.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.getElementById(`${e}Form`).classList.add("active")}export{r as c};
