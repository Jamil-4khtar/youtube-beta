import"./register-C8IjAsV9.js";import"./auth-BgQ6r9TF.js";const e=document.getElementById("container");localStorage.getItem("isOpen")=="open"?e.classList.remove("toggle-bar"):e.classList.add("toggle-bar");document.getElementById("sideBar-toggle").addEventListener("click",()=>{e.classList.toggle("toggle-bar"),localStorage.getItem("isOpen")=="closed"?localStorage.setItem("isOpen","open"):localStorage.setItem("isOpen","closed")});