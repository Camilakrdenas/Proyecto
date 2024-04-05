const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('carnet_mascota', {
    ID_MASCOTA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ID_USUARIO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'usuario',
        key: 'NUMERO_ID'
      }
    },
    NOMBRE_MASCOTA: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    ESPECIE: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'especie',
        key: 'ID_ESPECIE'
      }
    },
    RAZA: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'raza',
        key: 'ID_RAZA'
      }
    },
    FECHA_NACIMIENTO: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    GENERO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'genero',
        key: 'ID_GENERO'
      }
    },
    EDAD: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'carnet_mascota',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_MASCOTA" },
        ]
      },
      {
        name: "FK_USUARIO",
        using: "BTREE",
        fields: [
          { name: "ID_USUARIO" },
        ]
      },
      {
        name: "FK_ESPECIE",
        using: "BTREE",
        fields: [
          { name: "ESPECIE" },
        ]
      },
      {
        name: "FK_RAZA",
        using: "BTREE",
        fields: [
          { name: "RAZA" },
        ]
      },
      {
        name: "FK_GENERO",
        using: "BTREE",
        fields: [
          { name: "GENERO" },
        ]
      },
    ]
  });
};
