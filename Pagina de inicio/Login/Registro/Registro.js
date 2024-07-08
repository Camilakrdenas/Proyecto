/**
 * Clase para manejar el formulario de registro de usuarios.
 * @class RegisterFormHandler
 */
class RegisterFormHandler {
    /**
     * Constructor de la clase RegisterFormHandler.
     * Inicializa los métodos para obtener y mostrar los departamentos, tipos de usuario y tipos de identificación,
     * y agrega los escuchadores de eventos necesarios para el formulario.
     * @memberof RegisterFormHandler
     */
    constructor() {
        // Llama a los métodos para obtener y mostrar los departamentos, tipos de usuario y tipos de identificación
        this.fetchDepartments();
        this.fetchTipoUsuarios();
        this.fetchTiposId();

        // Agrega un evento de cambio al select de departamentos para mostrar las ciudades correspondientes
        const departamentoSelect = document.getElementById('departamento');
        departamentoSelect.addEventListener('change', () => {
            const departmentId = departamentoSelect.value;
            this.fetchCities(departmentId);
        });

        // Agrega un evento de envío al formulario de registro
        document.getElementById('registerForm').addEventListener('submit', (event) => {
            event.preventDefault(); // Previene el comportamiento predeterminado del formulario
            this.registrarUsuario(); // Llama al método para enviar los datos del formulario al servidor
        });
    }

    
    /**
     * Método para obtener y mostrar los departamentos desde el servidor.
     * Realiza una solicitus fetch para obtener los departamentos y los agrega al select de departamentos.
     * @memberof RegisterFormHandler
     */
    async fetchDepartments() {
        try {
            const response = await fetch('http://localhost:3000/departments');
            if (!response.ok) {
                throw new Error('Error fetching departments');
            }
            const departments = await response.json();
            const departamentoSelect = document.getElementById('departamento');
            departamentoSelect.innerHTML = '';
            const selectOption = document.createElement('option');
            selectOption.value = '';
            selectOption.textContent = 'Seleccionar departamento';
            departamentoSelect.appendChild(selectOption);
            departments.forEach(department => {
                const option = document.createElement('option');
                option.value = department.ID_DEPARTAMENTO;
                option.textContent = department.NOMBRE_DEPARTAMENTO;
                departamentoSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    }

     
    /**
     * Método para obtener y mostrar las ciudades del departamento seleccionado desde el servidor.
     * Realiza una solicitud fetch para obtener las ciudades y las agrega al select de ciudades.
     * @param {*} departmentId - El ID del departamento seleccionado.
     * @memberof RegisterFormHandler
     */
    async fetchCities(departmentId) {
        try {
            const response = await fetch(`http://localhost:3000/cities/${departmentId}`);
            if (!response.ok) {
                throw new Error('Error fetching cities');
            }
            const cities = await response.json();
            const ciudadSelect = document.getElementById('ciudad');
            ciudadSelect.innerHTML = '';
            const selectOption = document.createElement('option');
            selectOption.value = '';
            selectOption.textContent = 'Seleccionar ciudad';
            ciudadSelect.appendChild(selectOption);
            cities.forEach(city => {
                const option = document.createElement('option');
                option.value = city.ID_CIUDAD;
                option.textContent = city.NOMBRE_CIUDAD;
                ciudadSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    }

    /**
     * Método para obtener y mostrar los tipos de usuario desde el servidor.
     * Realiza una solicitud fetch para obtener los tipos de usuario y los agrega al select de tipos de usuario.
     * @memberof RegisterFormHandler
     */
    async fetchTipoUsuarios() {
        try {
            const response = await fetch('http://localhost:3000/tipousuario');
            if (!response.ok) {
                throw new Error('Error fetching tipo usuarios');
            }
            const tipoUsuarios = await response.json();
            const tipoUsuarioSelect = document.getElementById('tipoUsuario');
            tipoUsuarioSelect.innerHTML = '';
            const selectOption = document.createElement('option');
            selectOption.value = '';
            selectOption.textContent = 'Seleccionar tipo usuario';
            tipoUsuarioSelect.appendChild(selectOption);
            tipoUsuarios.forEach(tipoUsuario => {
                const option = document.createElement('option');
                option.value = tipoUsuario.ID_TIPO;
                option.textContent = tipoUsuario.NOMBRE_TIPO;
                tipoUsuarioSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching tipo usuarios:', error);
        }
    }

    /**
     * Método para obtener y mostrar los tipos de identificación desde el servidor
     * Realiza una solicitud fetch para obtener los tipos de identificación y los agrega al select de tipos de identificación.
     * @memberof RegisterFormHandler
     */
    async fetchTiposId() {
        try {
            const response = await fetch('http://localhost:3000/tiposid');
            if (!response.ok) {
                throw new Error('Error fetching tipos id');
            }
            const tiposId = await response.json();
            const tipoIdSelect = document.getElementById('tipoId');
            tipoIdSelect.innerHTML = '';
            const selectOption = document.createElement('option');
            selectOption.value = '';
            selectOption.textContent = 'Seleccionar tipo de ID';
            tipoIdSelect.appendChild(selectOption);
            tiposId.forEach(tipo => {
                const option = document.createElement('option');
                option.value = tipo.ID_TIPOS;
                option.textContent = tipo.NOMBRE_TIPOS;
                tipoIdSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching tipos id:', error);
        }
    }

    /**
     * Método para enviar los datos del formulario al servidor para registrar un nuevo usuario.
     * Realiza una solicitud fetch con los datos del formulario y maneja la respuesta del servidor.
     * @memberof RegisterFormHandler
     */
    async registrarUsuario() {
        try {
            // Obtener los valores de los elementos input
            const nombreUsuario = document.getElementById('nombreUsuario').value;
            const telefono = document.getElementById('telefono').value;
            const direccion = document.getElementById('direccion').value;
            const email = document.getElementById('email').value;
            const contrasena = document.getElementById('contrasena').value;
    
            // Obtener los valores seleccionados de los elementos select
            const tipoId = document.getElementById('tipoId').value;
            const numeroId = document.getElementById('numeroId').value;
            const tipoUsuario = document.getElementById('tipoUsuario').value;
            const departamento = document.getElementById('departamento').value;
            const ciudad = document.getElementById('ciudad').value;
    
            // Enviar los datos al servidor utilizando fetch
            const response = await fetch('http://localhost:3000/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombreUsuario,
                    tipoId,
                    numeroId,
                    tipoUsuario,
                    telefono,
                    direccion,
                    departamento,
                    ciudad,
                    email,
                    contrasena
                })
            });
    
            if (!response.ok) {
                throw new Error('Error al registrar usuario');
            }
    
            // Manejar la respuesta del servidor
            const data = await response.json();
            alert('Usuario registrado exitosamente');
            window.location.href = 'C:Users/Miguel/Desktop/Proyecto/Pagina de inicio/Login/Login.html'; // Redirigir al usuario a la página de inicio de sesión
        }catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al registrar usuario');
        }
    }
}

// Crea una instancia de la clase RegisterFormHandler cuando se carga el DOM para iniciar la funcionalidad
window.addEventListener('DOMContentLoaded', () => {
    new RegisterFormHandler();
});
