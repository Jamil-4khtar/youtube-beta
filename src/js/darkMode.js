export function darkMode() {
    const toggleDark = document.getElementById('toggle-dark');
    console.log(localStorage.getItem('darkMode'));
    
    toggleDark.addEventListener('click', () => {
        const body = document.body;
        body.classList.toggle('dark-mode');
        
        localStorage.setItem('darkMode', body.classList.contains('dark-mode'));

        // console.log(localStorage.getItem('darkMode'));
        
        // Update the theme icon
        // toggleDark.innerHTML = `<i class="uil uil-sun"></i>`;

        // Change the theme icon based on the dark mode status
        if (body.classList.contains('dark-mode')) {
            toggleDark.innerHTML = `<i class="uil uil-sun"></i>`;
        } else {
            toggleDark.innerHTML = `<i class="uil uil-moon"></i>`;
        }
    })

    // Check if dark mode is enabled from local storage
    if (localStorage.getItem('darkMode') === 'true') {
        const body = document.body;
        body.classList.add('dark-mode');
        toggleDark.innerHTML = `<i class="uil uil-sun"></i>`;
    } else {
        const body = document.body;
        body.classList.remove('dark-mode');
        toggleDark.innerHTML = `<i class="uil uil-moon"></i>`;
    }
    console.log();
    
}