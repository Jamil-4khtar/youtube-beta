const BASE_URL = import.meta.env.BASE_URL;
export function goHomeFunc() {
    const homeButton = document.getElementById('home-button');

    homeButton.addEventListener("click", () => {
        window.location.href = BASE_URL;
    })
}