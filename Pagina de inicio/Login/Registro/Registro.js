window.addEventListener('DOMContentLoaded', () => {
    const fetchDepartments = async () => {
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
    };

    const fetchCities = async (departmentId) => {
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
    };

    const fetchTipoUsuarios = async () => {
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
    };

    const fetchTiposId = async () => {
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
    };

    // Llama a la función para obtener y mostrar los departamentos al cargar la página
    fetchDepartments();

    // Llama a la función para obtener y mostrar las ciudades del departamento seleccionado
    const departamentoSelect = document.getElementById('departamento');
    departamentoSelect.addEventListener('change', () => {
        const departmentId = departamentoSelect.value;
        fetchCities(departmentId);
    });

    // Llama a la función para obtener y mostrar los tipos de usuario
    fetchTipoUsuarios();
    fetchTiposId();

    async function registrarUsuario() {
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
    
    // Event listener para el formulario de registro
    document.getElementById('registerForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
        registrarUsuario(); // Llamar a la función para enviar los datos del formulario al servidor
    });

});
