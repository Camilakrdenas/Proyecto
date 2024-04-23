document.getElementById('LoginForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
      const response = await fetch('api/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
          throw new Error('Error in the request.');
      }

      const data = await response.json();

      if (data.success) {
          if (data.userType === 'cliente') {
              window.location.href = '/Proyecto/Cliente/Cliente.html';
          } else if (data.userType === 'veterinaria') {
              window.location.href = '/Proyecto/Veterinaria/Veterinaria.html';
          }
      } else {
          alert('Credenciales incorrectas');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('Error en el inicio de sesión, por favor inténtelo de nuevo.');
  }
});