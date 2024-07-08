const express = require('express'); // Importa el módulo Express
const app = express(); // Crea una instancia de una aplicación Express
const port = 3000; // Define el puerto en el que se ejecutará el servidor
const sql = require('mssql'); // Importa el módulo mssql para trabajar con SQL Server

/**
 * Clase para manejar la conexión y consultas a la base de datos.
 * @class DatabaseHandler
 */
class DatabaseHandler {
  /**
   * Crea una instancia de DatabaseHandler.
   * @param {Object} config - Configuración de la base de datos.
   * @memberof DatabaseHandler
   */
  constructor(config) {
    this.config = config; // Configuración de la base de datos
  }
  
  /**
   * Conecta a la base de datos.
   * @async
   * @memberof DatabaseHandler
   * @throws {Error} Si hay un error al conectarse a la base de datos.
   */
  async connect() {
    try {
      await sql.connect(this.config); // Intenta conectarse a la base de datos con la configuración proporcionada
    } catch (error) {
      console.error('Error connecting to the database:', error);// Muestra un mensaje de error en caso de fallo en la conexión
      throw error; // Lanza el error para que pueda ser manejado externamente
    }
  }
  
  /**
   * Realiza la consulta de Login.
   * @async
   * @param {String} email - El correo electrónico del usuario.
   * @param {String} password - La contraseña del usuario.
   * @returns {Promise<Object>} - El resultado de la consulta de login. 
   * @memberof DatabaseHandler
   * @throws {Error} - Si hay un error al ejecutar la consulta.
   */
  async queryLogin(email, password) {
    try {
      const request = new sql.Request();// Crea una nueva solicitud SQL
      const query = `
        SELECT tipo_usuario AS userType
        FROM usuario
        WHERE correo_electronico = @email
        AND contrasena = @password
      `; // Define la consulta SQL para verificar el login
      
      // Agrega parámetros a la consulta para evitar inyección SQL
      request.input('email', sql.VarChar, email);
      request.input('password', sql.VarChar, password);
      const result = await request.query(query); // Ejecuta la consulta
      // Retorna el resultado de la consulta
      return result.recordset.length > 0
        ? { success: true, userType: result.recordset[0].userType } // Si se encuentra el usuario, retorna éxito y el tipo de usuario
        : { success: false };// Si no se encuentra el usuario, retorna fracaso
    } catch (error) {
      console.error('Error executing login query:', error); // Muestra un mensaje de error en caso de fallo en la consulta
      throw error; // Lanza el error para que pueda ser manejado externamente
    }
  }
}

/**
 * Clase para manejar el servidor API.
 * @class APIServer
 */
class APIServer {
  /**
   * Crea una instancia de APIServer.
   * @param {DatabaseHandler} databaseHandler - Instancia de DatabaseHandler para manejar la base de datos.
   * @memberof APIServer
   */
  constructor(databaseHandler) {
    this.app = express(); // Crea una instancia de una aplicación Express
    this.port = 3000; // Define el puerto en el que se ejecutará el servidor
    this.databaseHandler = databaseHandler; // Recibe una instancia de DatabaseHandler para manejar la base de datos
  }
  
  /**
   * Configura el servidor.
   * @memberof APIServer
   */
  configure() {
    this.app.use(express.json());// Usa middleware para parsear JSON en las solicitudes
    this.app.post('/api/login', async (req, res) => {
      const { email, password } = req.body; // Obtiene el email y password del cuerpo de la solicitud

      try {
        await this.databaseHandler.connect(); // Conecta a la base de datos
        const loginResult = await this.databaseHandler.queryLogin(email, password); // Realiza la consulta de login
        res.json(loginResult); // Retorna el resultado de la consulta como respuesta JSON
      } catch (error) {
        res.status(500).json({ error: 'Error in database query.' }); // Retorna un error 500 si algo falla
      }
    });
  }
  
  /**
   * Inicia el servidor.
   * @memberof APIServer
   */
  start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running at http://localhost:${this.port}`);// Muestra un mensaje indicando que el servidor está corriendo
    });
  }
}

// Configuración de la base de datos SQL Server
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bd_mettazooa',
  options: {
    encrypt: true 
  }
};

const databaseHandler = new DatabaseHandler(dbConfig); // Crea una instancia de DatabaseHandler con la configuración de la base de datos
const apiServer = new APIServer(databaseHandler); // Crea una instancia de APIServer con el manejador de base de datos
apiServer.configure();// Configura el servidor
apiServer.start(); // Inicia el servidor
