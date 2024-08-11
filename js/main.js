// Managing the progress bar
window.addEventListener('scroll', function () {
    const progressBar = document.getElementById('progress-bar');
    const scrollPosition = window.scrollY;
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollPosition / windowHeight) * 100;
    progressBar.style.width = scrollPercentage + '%';
});

// Change cursor based on click
const screen = document.querySelector('html');
screen.addEventListener('mousedown', (event) => {
    if (event.button === 0) {
        screen.style.cursor = 'grabbing';
    }
});

screen.addEventListener('mouseup', () => {
    screen.style.cursor = 'grab';
});
