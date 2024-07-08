/**
 * Clase principal de la aplicación.
 * @class App
 */
class App {
  /**
   * Crea una instancia de App e inicializa los escuchadores de eventos.
   * @memberof App
   */
  constructor() {
    // Inicializa los escuchadores de eventos cuando se crea una instancia de la clase
    this.initEventListeners();
  }

  /**
   * Inicializa los escuchadores de eventos para varios elementos de la interfaz.
   */
  initEventListeners() {
    // Redireccionar a la página de inicio de sesión cuando se hace clic en el botón de inicio de sesión
    document.querySelector('.btn-1').addEventListener('click', this.redirectToLogin);

    // Redireccionar a la página de información cuando se hace clic en el botón de información
    document.querySelector('.link a:last-child').addEventListener('click', this.redirectToInformation);

    // Agregar eventos de clic a los elementos de la barra de navegación
    const navLinks = document.querySelectorAll('.navbar ul li a');
    navLinks.forEach(link => {
      // Al hacer clic en un enlace de la barra de navegación, se ejecuta scrollToSection
      link.addEventListener('click', this.scrollToSection.bind(this));
    });
  }
  /**
   *Redirecciona a la página de inicio de sesión
   * @param {Event} e - El evento del clic.
   * @memberof App
   */
  redirectToLogin(e) {
    // Evitar el comportamiento predeterminado del enlace
    e.preventDefault();
    // Redirigir a la página de inicio de sesión
    window.location.href = 'Login/Login.html';
  }
  
  /**
   *Redirecciona a la página de información.
   * @param {Event} e - El evento del clic.
   * @memberof App
   */
  redirectToInformation(e) {
    // Evitar el comportamiento predeterminado del enlace
    e.preventDefault();
    // Redirigir a la página de información
    window.location.href = 'information.html';
  }
  
  /**
   *Realiza scroll a una sección específica de la página.
   * @param {Event} e -El evento del clic
   * @memberof App
   */
  scrollToSection(e) {
    // Evitar el comportamiento predeterminado del enlace
    e.preventDefault();
    // Obtener el href del enlace clicado
    const href = e.currentTarget.getAttribute('href');
    // Obtener el elemento de destino utilizando el href
    const targetElement = document.querySelector(href);
    // Obtener la posición del elemento de destino respecto al viewport
    const targetPosition = targetElement.getBoundingClientRect().top;
    // Obtener la posición de desplazamiento actual de la página
    const startPosition = window.pageYOffset;
    // Calcular la distancia a desplazar
    const distance = targetPosition - startPosition;
    // Definir la duración del desplazamiento en milisegundos
    const duration = 1000;
    let start;
    // Iniciar la animación del desplazamiento
    requestAnimationFrame(step);

    
    /**
     * Anima el desplazamiento.
     * @param {number} timestamp - El tiempo actual.
     */
    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      // Realizar el desplazamiento utilizando una función de easing
      window.scrollTo(0, App.easeInOutQuad(progress, startPosition, distance, duration));
      if (progress < duration) requestAnimationFrame(step);
    }
  }
  
  /**
   *Función de easing para suavizar el desplazamiento.
   * @param {number} t - El tiempo transcurrido.
   * @param {number} b - La posición inicial.
   * @param {number} c - El cambio en la posición.
   * @param {number} d - La duración total.
   * @returns {number} - La posición calculada
   * @memberof App
   */
  static easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
}

// Inicializar la aplicación cuando el DOM se ha cargado completamente
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
