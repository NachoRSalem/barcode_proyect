const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Disfraz = sequelize.define(
  'Disfraces',
  {
    codigo_barra: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'disfraces', 
    timestamps: false,
  }
);

module.exports = Disfraz;
