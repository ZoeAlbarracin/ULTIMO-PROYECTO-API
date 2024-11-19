// controllers/userController.js
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// 1. Registrar un nuevo usuario
exports.register = async (req, res) => {
  try {
    const { name, nickname, email, password, avatar } = req.body;

    // Validar que no existan el email ni el nickname
    const existingUser = await User.findOne({
      where: {
        [Sequelize.Op.or]: [{ email }, { nickname }]
      }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'El email o el nickname ya están en uso' });
    }

    // Crear un nuevo usuario
    const user = await User.create({ name, nickname, email, password, avatar });

    res.status(201).json({
      message: 'Usuario registrado con éxito',
      user: { id: user.id, name: user.name, nickname: user.nickname, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error });
  }
};

// 2. Login de usuario
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar el usuario por email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Crear un JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

// 3. Editar perfil del usuario (requiere autenticación)
exports.editProfile = async (req, res) => {
  try {
    const { name, nickname, avatar } = req.body;
    const userId = req.user.id;

    // Actualizar los datos del usuario
    const user = await User.update({ name, nickname, avatar }, { where: { id: userId } });

    if (!user[0]) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Perfil actualizado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el perfil', error });
  }
};
