const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reserva = sequelize.define(
  'Reserva',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    disfraz_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_retiro: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fecha_devolucion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'reservas',
    timestamps: true,
    underscored: true,
  }
);

module.exports = Reserva;
