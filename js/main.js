window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
      location.reload();
    }
  });

var page = window.location.pathname.split('/').pop().toLowerCase();
switch (page) {
  case 'index.html':
    window.history.replaceState(null, null, '/menu');
    break;
  case 'cv.html':
    window.history.replaceState(null, null, '/cv');
    break;
  case 'portfolio.html':
    window.history.replaceState(null, null, '/portfolio');
    break;
  default:
    window.history.replaceState(null, null, '/error');
    break;
}
