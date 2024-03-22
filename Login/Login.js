document.addEventListener('DOMContentLoaded', () => {
    // Obtener el elemento del formulario
    const form = document.querySelector('form');
  
    // Agregar un evento de envio al formulario
    form.addEventListener('submit', (event) => {
      // Prevenir que el formulario se envie normalmente
      event.preventDefault();
  
      // // Obtener los valores de los campos de nombre de usuario y contraseña
      const username = document.querySelector('#username').value;
      const password = document.querySelector('#password').value;
  
      // Verificar si el nombre de usuario y la contraseña son válidos
      if (username === 'admin' && password === 'password') {
        // Si el nombre de usuario y la contraseña son válidos, redirigir al usuario a la página de inicio
        window.location.href = 'dashboard.html';
      } else {
        // Si el nombre de usuario y la contraseña no son válidos, mostrar un mensaje de error
        alert('Invalid username or password');
      }
    });
  
    // Agregar un evento de clic al enlace "Forgot Password"
    document.querySelector('#forgot-password').addEventListener('click', (event) => {
        event.preventDefault();
        // Redirigir al usuario a la página de restablecimiento de contraseña
        window.location.href = 'reset-password.html';
      });
      
    // Agregar un evento de clic al checkbox "Recordarme"
    document.querySelector('#remember-me').addEventListener('change', () => {
      if (event.target.checked) {
        // Si el checkbox está marcado, guardar el nombre de usuario y la contraseña en el almacenamiento local
        localStorage.setItem('username', 'admin');
        localStorage.setItem('password', 'password');
      } else {
        // Si el checkbox no está marcado, eliminar el nombre de usuario y la contraseña del almacenamiento local
        localStorage.removeItem('username');
        localStorage.removeItem('password');
      }
    });
  
    // Verificar si el nombre de usuario y la contraseña están guardados en el almacenamiento local
    if (localStorage.getItem('username') && localStorage.getItem('password')) {
      // Si el nombre de usuario y la contraseña están guardados, establecer los valores de los campos de entrada en esos valores
      document.querySelector('#username').value = localStorage.getItem('username');
      document.querySelector('#password').value = localStorage.getItem('password');
      // Marcar el checkbox "Recordarme"
      document.querySelector('#remember-me').checked = true;
    }
  });