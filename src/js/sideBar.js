const container = document.getElementById("container")

localStorage.getItem("isOpen") == "open" ? container.classList.remove
("toggle-bar") : container.classList.add("toggle-bar"); 

document.getElementById("sideBar-toggle").addEventListener("click", () => {
    container.classList.toggle("toggle-bar")
    
    localStorage.getItem("isOpen") == "closed" ? localStorage.setItem("isOpen", "open") : localStorage.setItem("isOpen", "closed"); 

    // if (!localStorage.getItem("isOpen")) {
    //     localStorage.setItem("isOpen", "closed");
    // }
})
