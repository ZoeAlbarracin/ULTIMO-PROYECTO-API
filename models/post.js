// models/post.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user'); // Relación con el modelo User

const Post = sequelize.define('Post', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
});

// Relación: un Post pertenece a un Usuario
Post.belongsTo(User, { foreignKey: 'id_usuario' });

module.exports = Post;
