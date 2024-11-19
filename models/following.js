// models/following.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user'); // Relación con el modelo User

const Following = sequelize.define('Following', {
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_usuario_seguido: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

// Relación: un usuario puede seguir a muchos otros usuarios
Following.belongsTo(User, { foreignKey: 'id_usuario' });
Following.belongsTo(User, { foreignKey: 'id_usuario_seguido' });

module.exports = Following;
