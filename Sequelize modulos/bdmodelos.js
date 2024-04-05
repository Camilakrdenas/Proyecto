const { SequelizeAuto } = require('sequelize-auto');

// Configuración de Sequelize-auto
const auto = new SequelizeAuto('bd_mettazooa', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  directory: '/Users/Miguel/Desktop/Sequelize/models', // Directorio donde se guardarán los modelos
  port: '3306',
  additional: {
    timestamps: false // Opcionalmente, desactivar los timestamps automáticos
  }
});

// Generar modelos
auto.run(function (err) {
  if (err) throw err;
  console.log('Modelos generados exitosamente.');
});
