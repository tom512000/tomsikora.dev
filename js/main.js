// Affiche le mail et le numéro de téléphone
function numero(x){
    x.parentNode.innerHTML = "06 26 88 83 79";
}
function mail(x){
    x.parentNode.innerHTML = "tom.sikora03@gmail.com";
}

const screen = document.querySelector('html');
screen.addEventListener('mousedown', (event) => {
    if (event.button === 0) {
        screen.style.cursor = 'grabbing';
    }
});

screen.addEventListener('mouseup', () => {
    screen.style.cursor = 'grab';
});