// Affiche le mail et le numéro de téléphone
function numero(x){
    x.parentNode.innerHTML = "06 26 88 83 79";
}
function mail(x){
    x.parentNode.innerHTML = "tom.sikora03@gmail.com";
}

// Change de curseur en fonction du clic
const screen = document.querySelector('html');
screen.addEventListener('mousedown', (event) => {
    if (event.button === 0) {
        screen.style.cursor = 'grabbing';
    }
});

screen.addEventListener('mouseup', () => {
    screen.style.cursor = 'grab';
});

// Gestion du carrousel
let currentIndex = 0;
const totalItems = document.querySelectorAll('.carousel-item').length;

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
}

function updateCarousel() {
    const translateValue = -currentIndex * 100 + '%';
    document.querySelector('.carousel-inner').style.transform = 'translateX(' + translateValue + ')';
}
