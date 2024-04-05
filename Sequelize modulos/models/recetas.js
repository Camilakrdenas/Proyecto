const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recetas', {
    ID_RECETA: {
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
    FECHA_EMISION: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    NOMBRE_VETERINARIA: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    NOMBRE_PROFESIONAL: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    TARJETA_PROFESIONAL: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PRESCRIPCION: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'recetas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_RECETA" },
        ]
      },
      {
        name: "FK_MASCOTA_ID",
        using: "BTREE",
        fields: [
          { name: "ID_MASCOTA" },
        ]
      },
    ]
  });
};
