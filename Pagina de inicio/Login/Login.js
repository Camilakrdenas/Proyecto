/**
 * Clase para manejar el formulario de inicio de sesión.
 * @class LoginFormHandler
 */
class LoginFormHandler {
    /**
     * Crea una instancia de LoginFormHandler e inicializa los escuchadores de eventos.
     * @memberof LoginFormHandler
     */
    constructor() {
      // Inicializa los escuchadores de eventos cuando se crea una instancia de la clase
      this.initEventListeners();
    }
  
    /**
     * Inicializa los escuchadores de eventos para el formulario de inicio de sesión.
     * @memberof LoginFormHandler
     */
    initEventListeners() {
      // Obtiene el formulario de inicio de sesión por su ID
      const loginForm = document.getElementById('LoginForm');
      // Agrega un evento de envío al formulario que llama a handleLogin cuando se envía el formulario
      loginForm.addEventListener('submit', async (event) => this.handleLogin(event));
    }
  
    /**
     * Maneja el evento de envío del formulario de inicio de sesión.
     * @param {Event} event - El evento de envío del formulario.
     * @async 
     * @memberof LoginFormHandler
     */
    async handleLogin(event) {
      // Previene el comportamiento predeterminado del formulario (recargar la página)
      event.preventDefault();
      // Obtiene los valores del correo electrónico y la contraseña de los campos del formulario
      const email = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      try {
        // Realiza una solicitud POST a la API de inicio de sesión con los datos de usuario
        const response = await fetch('api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })// Envía los datos en formato JSON
        });
        // Verifica si la respuesta de la API es exitosa
        if (!response.ok) {
          throw new Error('Error en la consulta.');
        }
        // Convierte la respuesta en un objeto JSON
        const data = await response.json();
        // Si la respuesta de la API indica éxito en el inicio de sesión
        if (data.success) {
          // Redirige al usuario según su tipo (cliente o veterinaria)
          if (data.userType === 'cliente') {
            window.location.href = 'C:/Users/Miguel/Desktop/Proyecto/Pagina de inicio/Login/inicio cliente/index.html';
          } else if (data.userType === 'veterinaria') {
            window.location.href = 'C:/Users/Miguel/Desktop/Proyecto/Pagina de inicio/Login/inicio veterinaria/index.html';
          }
        } else {
          // Muestra un mensaje de alerta si las credenciales son incorrectas
          alert('Credenciales incorrectas');
        }
      } catch (error) {
        // Muestra un mensaje de error si ocurre un problema con la solicitud
        console.error('Error:', error);
        alert('Error en el inicio de sesión, por favor inténtelo de nuevo.');
      }
    }
  }
  
// Inicializa el manejo del formulario de inicio de sesión cuando el DOM se ha cargado completamente
  document.addEventListener('DOMContentLoaded', () => {
    new LoginFormHandler();
  });
  