const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario', {
    NUMERO_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NOMBRE_USUARIO: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    TIPO_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tipos_id',
        key: 'ID'
      }
    },
    TIPO_USUARIO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tipo_usuario',
        key: 'ID'
      }
    },
    TELEFONO: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DIRECCION: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    DEPARTAMENTO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'departamento',
        key: 'ID_DEPARTAMENTO'
      }
    },
    CIUDAD: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ciudad',
        key: 'ID_CIUDAD'
      }
    },
    CORREO_ELECTRONICO: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    CONTRASENA: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'usuario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "NUMERO_ID" },
        ]
      },
      {
        name: "FK_TIPO_USUARIO",
        using: "BTREE",
        fields: [
          { name: "TIPO_USUARIO" },
        ]
      },
      {
        name: "FK_TIPO_ID",
        using: "BTREE",
        fields: [
          { name: "TIPO_ID" },
        ]
      },
      {
        name: "FK_DEPARTAMENTOS",
        using: "BTREE",
        fields: [
          { name: "DEPARTAMENTO" },
        ]
      },
      {
        name: "FK_CIUDAD",
        using: "BTREE",
        fields: [
          { name: "CIUDAD" },
        ]
      },
    ]
  });
};
