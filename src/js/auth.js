const authModal = document.getElementById('authModal');
const closeModal = document.querySelector('.close-modal');
const userIcon = document.querySelector('.right #userIcon');
const tabBtns = document.querySelectorAll('.tab-btn');

const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm'); 

userIcon.addEventListener("click", () => {
    console.log("User clicked");
    
    authModal.style.display = 'block';
})

closeModal.addEventListener("click", () => {
    authModal.style.display = 'none';
});

window.addEventListener("click", (e) => {
    if (e.target === authModal) {
        authModal.style.display = 'none';
    }
})

tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        switchTab(btn.dataset.tab);
    });
});

function switchTab(tabName) {
    const forms = document.querySelectorAll('.auth-form');


    forms.forEach(form => form.classList.remove('active'));
    tabBtns.forEach(btn => btn.classList.remove('active'));


    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}Form`).classList.add('active');

    // if (tabName === 'login') {
    //     loginForm.style.display = 'block';
    //     signupForm.style.display = 'none';
    // } else {
    //     loginForm.style.display = 'none';
    //     signupForm.style.display = 'block';
    // }
}


