const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bd_mettazooa',
  port: 3306
});

connection.connect((error) => {
  if (error) throw error;
  console.log('Conexión con la base de datos establecida.');
});

// Departamentos API endpoint
app.get('/departments', (req, res) => {
  connection.query('SELECT * FROM departamento', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching departments' });
    } else {
      res.json(results);
    }
  });
});

// Cities API endpoint
app.get('/cities/:ID_DEPARTAMENTO', (req, res) => {
  const departmentId = req.params.ID_DEPARTAMENTO;
  connection.query('SELECT * FROM ciudad WHERE ID_DEPARTAMENTO = ?', [departmentId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching cities' });
    } else {
      res.json(results);
    }
  });
});

// TipoUsuario API endpoint
app.get('/tipousuario', (req, res) => {
  connection.query('SELECT * FROM tipo_usuario', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching tipo usuarios' });
    } else {
      res.json(results);
    }
  });
});

// TiposId API endpoint
app.get('/tiposid', (req, res) => {
  connection.query('SELECT * FROM tipos_id', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching tipos id' });
    } else {
      res.json(results);
    }
  });
});

// Registro API endpoint
app.post('/registro', async (req, res) => {
  const { nombreUsuario, tipoId, numeroId, tipoUsuario, telefono, direccion, departamento, ciudad, email, contrasena } = req.body;
  console.log("Consulta recibida:");
  console.log("Nombre de usuario:", nombreUsuario);
  console.log("Tipo de ID:", tipoId);
  console.log("Número de ID:", numeroId);
  console.log("Tipo de Usuario:", tipoUsuario);
  console.log("Teléfono:", telefono);
  console.log("Dirección:", direccion);
  console.log("Departamento:", departamento);
  console.log("Ciudad:", ciudad);
  console.log("Correo electrónico:", email);
  console.log("Contraseña:", contrasena);
  // Validar datos
  if (!nombreUsuario || !tipoId || !numeroId || !tipoUsuario || !telefono || !direccion || !departamento || !ciudad || !email || !contrasena) {
    return res.status(400).json({ message: 'Todos los campos son requeridos.' });
  }

  // Validar formato de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'El formato del correo electrónico es inválido.' });
  }

  // Hash de la contraseña
  const hashedPassword = await bcrypt.hash(contrasena, 10); // El segundo argumento es el número de rondas de hashing (10 es un valor común)

  const sql = `INSERT INTO usuario (NOMBRE_USUARIO, TIPO_ID, NUMERO_ID, TIPO_USUARIO, TELEFONO, DIRECCION, DEPARTAMENTO, CIUDAD, CORREO_ELECTRONICO, CONTRASENA) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  connection.query(sql, [nombreUsuario, tipoId, numeroId, tipoUsuario, telefono, direccion, departamento, ciudad, email, hashedPassword], (err, result) => {
    if (err) {
      console.error('Error al insertar usuario:', err);
      res.status(500).json({ message: 'Error interno del servidor' });
    } else {
      console.log('Usuario insertado correctamente');
      // Enviar respuesta al cliente
      res.status(200).json({ message: 'Usuario registrado exitosamente' });
    }
  });
});

// Serve static files (assuming 'public' is your directory containing static files)
app.use(express.static('public'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
