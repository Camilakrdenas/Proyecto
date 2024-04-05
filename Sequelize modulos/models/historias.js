const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('historias', {
    ID_HISTORIA: {
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
    FECHA_ADMISION: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    CIUDAD: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ciudad',
        key: 'ID_CIUDAD'
      }
    },
    DEPARTAMENTO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'departamento',
        key: 'ID_DEPARTAMENTO'
      }
    },
    MOTIVO_CONSULTA: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    DIAGNOSTICO: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    PRODUCTOS_ADMINISTRADOS: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'historias',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_HISTORIA" },
        ]
      },
      {
        name: "FK_MASCOTA",
        using: "BTREE",
        fields: [
          { name: "ID_MASCOTA" },
        ]
      },
      {
        name: "FK_CIUDAD_NOMBRE",
        using: "BTREE",
        fields: [
          { name: "CIUDAD" },
        ]
      },
      {
        name: "FK_DEPARTAMENTO_NOMBRE",
        using: "BTREE",
        fields: [
          { name: "DEPARTAMENTO" },
        ]
      },
    ]
  });
};
