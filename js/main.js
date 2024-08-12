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

// Managing the projects section
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button[id$="-btn"]');

    function updateDisplay(activeBtn) {
        buttons.forEach(button => {
            const isActive = button === activeBtn;
            button.setAttribute('aria-selected', isActive);
            button.setAttribute('data-state', isActive ? 'active' : 'inactive');
            button.setAttribute('tabindex', isActive ? '0' : '-1');

            const sectionId = button.id.replace('-btn', '');
            const section = document.getElementById(sectionId);
            if (section) {
                section.style.display = isActive ? 'block' : 'none';
            }
        });
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => updateDisplay(button));
    });

    updateDisplay(document.getElementById('professional-btn'));
});
