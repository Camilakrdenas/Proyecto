const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ciudad', {
    ID_CIUDAD: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NOMBRE_CIUDAD: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    ID_DEPARTAMENTO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'departamento',
        key: 'ID_DEPARTAMENTO'
      }
    }
  }, {
    sequelize,
    tableName: 'ciudad',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_CIUDAD" },
        ]
      },
      {
        name: "FK_DEPARTAMENTO",
        using: "BTREE",
        fields: [
          { name: "ID_DEPARTAMENTO" },
        ]
      },
    ]
  });
};
