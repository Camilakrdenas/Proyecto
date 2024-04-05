var DataTypes = require("sequelize").DataTypes;
var _agendar_citas = require("./agendar_citas");
var _carnet_mascota = require("./carnet_mascota");
var _ciudad = require("./ciudad");
var _departamento = require("./departamento");
var _especie = require("./especie");
var _genero = require("./genero");
var _historias = require("./historias");
var _raza = require("./raza");
var _recetas = require("./recetas");
var _tipo_usuario = require("./tipo_usuario");
var _tipos_id = require("./tipos_id");
var _usuario = require("./usuario");
var _usuarios = require("./usuarios");
var _vacunas = require("./vacunas");

function initModels(sequelize) {
  var agendar_citas = _agendar_citas(sequelize, DataTypes);
  var carnet_mascota = _carnet_mascota(sequelize, DataTypes);
  var ciudad = _ciudad(sequelize, DataTypes);
  var departamento = _departamento(sequelize, DataTypes);
  var especie = _especie(sequelize, DataTypes);
  var genero = _genero(sequelize, DataTypes);
  var historias = _historias(sequelize, DataTypes);
  var raza = _raza(sequelize, DataTypes);
  var recetas = _recetas(sequelize, DataTypes);
  var tipo_usuario = _tipo_usuario(sequelize, DataTypes);
  var tipos_id = _tipos_id(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);
  var vacunas = _vacunas(sequelize, DataTypes);

  agendar_citas.belongsTo(carnet_mascota, { as: "ID_MASCOTA_carnet_mascotum", foreignKey: "ID_MASCOTA"});
  carnet_mascota.hasMany(agendar_citas, { as: "agendar_cita", foreignKey: "ID_MASCOTA"});
  historias.belongsTo(carnet_mascota, { as: "ID_MASCOTA_carnet_mascotum", foreignKey: "ID_MASCOTA"});
  carnet_mascota.hasMany(historias, { as: "historia", foreignKey: "ID_MASCOTA"});
  recetas.belongsTo(carnet_mascota, { as: "ID_MASCOTA_carnet_mascotum", foreignKey: "ID_MASCOTA"});
  carnet_mascota.hasMany(recetas, { as: "receta", foreignKey: "ID_MASCOTA"});
  vacunas.belongsTo(carnet_mascota, { as: "ID_MASCOTA_carnet_mascotum", foreignKey: "ID_MASCOTA"});
  carnet_mascota.hasMany(vacunas, { as: "vacunas", foreignKey: "ID_MASCOTA"});
  historias.belongsTo(ciudad, { as: "CIUDAD_ciudad", foreignKey: "CIUDAD"});
  ciudad.hasMany(historias, { as: "historia", foreignKey: "CIUDAD"});
  usuario.belongsTo(ciudad, { as: "CIUDAD_ciudad", foreignKey: "CIUDAD"});
  ciudad.hasMany(usuario, { as: "usuarios", foreignKey: "CIUDAD"});
  ciudad.belongsTo(departamento, { as: "ID_DEPARTAMENTO_departamento", foreignKey: "ID_DEPARTAMENTO"});
  departamento.hasMany(ciudad, { as: "ciudads", foreignKey: "ID_DEPARTAMENTO"});
  historias.belongsTo(departamento, { as: "DEPARTAMENTO_departamento", foreignKey: "DEPARTAMENTO"});
  departamento.hasMany(historias, { as: "historia", foreignKey: "DEPARTAMENTO"});
  usuario.belongsTo(departamento, { as: "DEPARTAMENTO_departamento", foreignKey: "DEPARTAMENTO"});
  departamento.hasMany(usuario, { as: "usuarios", foreignKey: "DEPARTAMENTO"});
  carnet_mascota.belongsTo(especie, { as: "ESPECIE_especie", foreignKey: "ESPECIE"});
  especie.hasMany(carnet_mascota, { as: "carnet_mascota", foreignKey: "ESPECIE"});
  carnet_mascota.belongsTo(genero, { as: "GENERO_genero", foreignKey: "GENERO"});
  genero.hasMany(carnet_mascota, { as: "carnet_mascota", foreignKey: "GENERO"});
  carnet_mascota.belongsTo(raza, { as: "RAZA_raza", foreignKey: "RAZA"});
  raza.hasMany(carnet_mascota, { as: "carnet_mascota", foreignKey: "RAZA"});
  usuario.belongsTo(tipo_usuario, { as: "TIPO_USUARIO_tipo_usuario", foreignKey: "TIPO_USUARIO"});
  tipo_usuario.hasMany(usuario, { as: "usuarios", foreignKey: "TIPO_USUARIO"});
  usuario.belongsTo(tipos_id, { as: "TIPO", foreignKey: "TIPO_ID"});
  tipos_id.hasMany(usuario, { as: "usuarios", foreignKey: "TIPO_ID"});
  agendar_citas.belongsTo(usuario, { as: "ID_USUARIO_usuario", foreignKey: "ID_USUARIO"});
  usuario.hasMany(agendar_citas, { as: "agendar_cita", foreignKey: "ID_USUARIO"});
  carnet_mascota.belongsTo(usuario, { as: "ID_USUARIO_usuario", foreignKey: "ID_USUARIO"});
  usuario.hasMany(carnet_mascota, { as: "carnet_mascota", foreignKey: "ID_USUARIO"});

  return {
    agendar_citas,
    carnet_mascota,
    ciudad,
    departamento,
    especie,
    genero,
    historias,
    raza,
    recetas,
    tipo_usuario,
    tipos_id,
    usuario,
    usuarios,
    vacunas,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
