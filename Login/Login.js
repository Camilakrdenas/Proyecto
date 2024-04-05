const handleLogin = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  const response = await fetch('/login/validate', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    const userData = await response.json();
    alert('¡Inicio de sesión exitoso!');
    // Redireccionar a la página de dashboard con los datos del usuario
    window.location.href = 'login/inicio cliente/index.html';
  } else {
    const error = await response.json();
    alert(error.message);
  }
};

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', handleLogin);