// Redireccionar a la página de inicio de sesión cuando se hace clic en el botón de inicio de sesión
document.querySelector('.btn-1').addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = 'Login/Login.html';
  });
  
  // Redireccionar a la página de información cuando se hace clic en el botón de información
  document.querySelector('.link a:last-child').addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = 'information.html';
  });
  
  // Agregar eventos de clic a los elementos de la barra de navegación
  const navLinks = document.querySelectorAll('.navbar ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      const targetElement = document.querySelector(href);
      const targetPosition = targetElement.getBoundingClientRect().top;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1000;
      let start;
      requestAnimationFrame(step);
  
      function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        window.scrollTo(0, easeInOutQuad(progress, startPosition, distance, duration));
        if (progress < duration) requestAnimationFrame(step);
      }
  
      function easeInOutQuad(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
      };
    });
  });