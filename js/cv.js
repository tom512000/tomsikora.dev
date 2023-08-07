var maDiv = document.querySelector('.cv');
var boutonBlocs = document.querySelectorAll('.bouton_bloc');

function gererClic(event) {
  event.preventDefault();
  var boutonDiv = document.querySelector('.cv');

  boutonDiv.style.transform = 'scale(0.7)';
  boutonDiv.style.transition = 'transform 1s';

  Array.from(boutonBlocs).forEach(function(boutonBloc) {
    boutonBloc.style.backgroundColor = 'transparent';
  });

  setTimeout(function() {
    boutonDiv.style.transform = 'scale(0.7) translateX(-1500px)';
    boutonDiv.style.transition = 'transform 1s';
  }, 1000);

  setTimeout(function() {
    window.location.href = 'cv.html';
  }, 1700);
}

maDiv.addEventListener('click', gererClic);
