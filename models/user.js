// models/user.js
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,  // El nombre es obligatorio
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // No se permiten dos usuarios con el mismo nickname
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // No se permiten dos usuarios con el mismo mail
    validate: {
      isEmail: true,  // Verifica que sea un correo electrónico válido
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,  // La contraseña es obligatoria
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,  // El avatar es opcional
  }
}, {
  hooks: {
    // Hook para encriptar la contraseña antes de crear el usuario
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 10);  // Encriptar la contraseña
    },
  },
  // Opcionalmente, puedes agregar validaciones a nivel de modelo aquí
  validate: {
    // Por ejemplo, validación para que la contraseña sea suficientemente segura
    async checkPasswordStrength() {
      if (this.password && this.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres.');
      }
    }
  }
});

// Método para verificar si la contraseña es correcta
User.prototype.validPassword = async function(password) {
  return await bcrypt.compare(password, this.password);  // Compara la contraseña proporcionada con la almacenada
};

module.exports = User;

