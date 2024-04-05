const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('agendar_citas', {
    ID_REGISTRO: {
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
    FECHA: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    HORA: {
      type: DataTypes.TIME,
      allowNull: true
    },
    DESCRIPCION: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'agendar_citas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_REGISTRO" },
        ]
      },
      {
        name: "FK_IDMASCOTA",
        using: "BTREE",
        fields: [
          { name: "ID_MASCOTA" },
        ]
      },
      {
        name: "FK_IDUSUARIO",
        using: "BTREE",
        fields: [
          { name: "ID_USUARIO" },
        ]
      },
    ]
  });
};
