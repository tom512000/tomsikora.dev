var maDiv = document.querySelector('.portfolio');
var boutonBlocs = document.querySelectorAll('.bouton_bloc');

function gererClic(event) {
  event.preventDefault();
  var boutonDiv = document.querySelector('.portfolio');

  boutonDiv.style.transform = 'scale(0.7)';
  boutonDiv.style.transition = 'transform 1s';

  Array.from(boutonBlocs).forEach(function(boutonBloc) {
    boutonBloc.style.backgroundColor = 'transparent';
  });

  setTimeout(function() {
    boutonDiv.style.transform = 'scale(0.7) translateX(1000px)';
    boutonDiv.style.transition = 'transform 1s';
  }, 1000);

  setTimeout(function() {
    window.location.href = 'portfolio.html';
  }, 1700);
}

maDiv.addEventListener('click', gererClic);
