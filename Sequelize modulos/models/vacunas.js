const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vacunas', {
    ID_VACUNA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ID_MASCOTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'carnet_mascota',
        key: 'ID_MASCOTA'
      }
    },
    VACUNA_SUMINISTRADA: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    NOMBRE_VETERINARIA: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    NOMBRE_PROFESIONAL: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    TARJETA_PROFESIONAL: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FECHA_APLICACION: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vacunas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_VACUNA" },
        ]
      },
      {
        name: "FK_ID_MASCOTA",
        using: "BTREE",
        fields: [
          { name: "ID_MASCOTA" },
        ]
      },
    ]
  });
};
