/**
 * Importa los módulos necesarios para la aplicación.
 */
const express = require('express'); // Importa el módulo Express
const bodyParser = require('body-parser'); // Importa el módulo body-parser para analizar las solicitudes
const mysql = require('mysql'); // Importa el módulo mysql para interactuar con la base de datos
const cors = require('cors'); // Importa el módulo cors para permitir solicitudes desde diferentes orígenes
const bcrypt = require('bcrypt'); // Importa el módulo bcrypt para encriptar contraseñas

/**
 * Clase para manejar la conexión y las consultas a la base de datos.
 * @class DatabaseHandler
 */
class DatabaseHandler {
  /**
   * Constructor de la clase DatabaseHandler.
   * @param {Object} config - La configuración para la conexión a la base de datos.
   * @memberof DatabaseHandler
   */
  constructor(config) {
    this.connection = mysql.createConnection(config); // Crea una conexión a la base de datos con la configuración proporcionada
  }

  /**
   * Conecta a la base de datos.
   */
  connect() {
    this.connection.connect((error) => {
      if (error) throw error; // Lanza un error si no se puede conectar a la base de datos
      console.log('Conexión con la base de datos establecida.');
    });
  }

  /**
   * Realiza una consulta a la base de datos.
   * @param {string} sql - La consulta SQL a ejecutar.
   * @param {array} params - Los parámetros para la consulta.
   * @returns {Promise} - Una promesa que se resuelve con los resultados de la consulta.
   * @memberof DatabaseHandler
   */
  query(sql, params) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, params, (error, results) => {
        if (error) {
          console.error('Error en la consulta:', error);
          reject(error); // Rechaza la promesa si hay un error
        } else {
          resolve(results); // Resuelve la promesa con los resultados de la consulta
        }
      });
    });
  }
}

/**
 * Clase para configurar y manejar el servidor API.
 * @class APIServer
 */
class APIServer {
  /**
   * Constructor de la clase APIServer.
   * @param {DatabaseHandler} databaseHandler - Instancia de DatabaseHandle para amanejar la base de datos.
   * @memberof APIServer
   */
  constructor(databaseHandler) {
    this.app = express(); // Crea una instancia de una aplicación Express
    this.port = process.env.PORT || 3000; // Define el puerto en el que se ejecutará el servidor
    this.databaseHandler = databaseHandler; // Recibe una instancia de DatabaseHandler para manejar la base de datos

    this.configureMiddleware();
    this.configureRoutes();
  }

  /**
   *
   * Configura el middleware para la aplicación.
   * @memberof APIServer
   */
  configureMiddleware() {
    this.app.use(bodyParser.json()); // Usa middleware para parsear JSON en las solicitudes
    this.app.use(bodyParser.urlencoded({ extended: true })); // Usa middleware para parsear datos URL-encoded
    this.app.use(express.json()); // Usa middleware para parsear JSON
    this.app.use(cors()); // Usa middleware para permitir solicitudes desde diferentes orígenes
  }

  /**
   * Configura las rutas de la API.
   * @memberof APIServer
   */
  configureRoutes() {
    this.app.get('/departments', this.getDepartments.bind(this)); // Configura la ruta para obtener departamentos
    this.app.get('/cities/:ID_DEPARTAMENTO', this.getCities.bind(this)); // Configura la ruta para obtener ciudades por departamento
    this.app.get('/tipousuario', this.getTipoUsuario.bind(this)); // Configura la ruta para obtener tipos de usuario
    this.app.get('/tiposid', this.getTiposId.bind(this)); // Configura la ruta para obtener tipos de ID
    this.app.post('/registro', this.registro.bind(this)); // Configura la ruta para registrar un usuario

    this.app.use(express.static('public')); // Sirve archivos estáticos desde el directorio 'public'
  }

  /**
   * Maneja la solicitud para obtener los departamentos.
   * @param {object} req - El objeto de solicitud.
   * @param {object} res - El objeto de respuesta.
   * @memberof APIServer
   */
  async getDepartments(req, res) {
    try {
      const results = await this.databaseHandler.query('SELECT * FROM departamento');
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching departments' });
    }
  }

  /**
   * Maneja la solicitud para obtener las ciudades por departamento.
   * @param {object} req - El objeto de solicitud.
   * @param {object} res - El objeto de respuesta.
   * @memberof APIServer
   */
  async getCities(req, res) {
    const departmentId = req.params.ID_DEPARTAMENTO;
    try {
      const results = await this.databaseHandler.query('SELECT * FROM ciudad WHERE ID_DEPARTAMENTO = ?', [departmentId]);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching cities' });
    }
  }

  /**
   * Maneja la solicitud para obtener los tipos de usuario.
   * @param {object} req - El objeto de solicitud.
   * @param {object} res - El objeto de respuesta.
   * @memberof APIServer
   */
  async getTipoUsuario(req, res) {
    try {
      const results = await this.databaseHandler.query('SELECT * FROM tipo_usuario');
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tipo usuarios' });
    }
  }

  /**
   * Maneja la solicitud para obtener los tipos de ID.
   * @param {object} req - El objeto de solicitud.
   * @param {object} res - El objeto de respuesta. 
   * @memberof APIServer
   */
  async getTiposId(req, res) {
    try {
      const results = await this.databaseHandler.query('SELECT * FROM tipos_id');
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tipos id' });
    }
  }

  /**
   * Maneja la solicitud para registrar un nuevo usuario.
   * @param {object} req - El objeto de solicitud.
   * @param {object} res - El objeto de respuesta.
   * @memberof APIServer
   */
  async registro(req, res) {
    const { nombreUsuario, tipoId, numeroId, tipoUsuario, telefono, direccion, departamento, ciudad, email, contrasena } = req.body;
    console.log("Consulta recibida:", req.body);

    // Validar datos
    if (!nombreUsuario || !tipoId || !numeroId || !tipoUsuario || !telefono || !direccion || !departamento || !ciudad || !email || !contrasena) {
      return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }

    // Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'El formato del correo electrónico es inválido.' });
    }

    try {
      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(contrasena, 10); // El segundo argumento es el número de rondas de hashing (10 es un valor común)

      const sql = `INSERT INTO usuario (NOMBRE_USUARIO, TIPO_ID, NUMERO_ID, TIPO_USUARIO, TELEFONO, DIRECCION, DEPARTAMENTO, CIUDAD, CORREO_ELECTRONICO, CONTRASENA) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      await this.databaseHandler.query(sql, [nombreUsuario, tipoId, numeroId, tipoUsuario, telefono, direccion, departamento, ciudad, email, hashedPassword]);

      console.log('Usuario insertado correctamente');
      res.status(200).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
      console.error('Error al insertar usuario:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  /**
   * Inicia el servidor.
   * @memberof APIServer
   */
  start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}.`);
    });
  }
}

// Configuración de la base de datos
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bd_mettazooa',
  port: 3306
};

const databaseHandler = new DatabaseHandler(dbConfig); // Crea una instancia de DatabaseHandler con la configuración de la base de datos
databaseHandler.connect(); // Conecta a la base de datos

const apiServer = new APIServer(databaseHandler); // Crea una instancia de APIServer con el manejador de base de datos
apiServer.start(); // Inicia el servidor

