// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, editProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware para verificar autenticación

// Ruta para registrar un nuevo usuario
router.post('/register', register);

// Ruta para login de usuario
router.post('/login', login);

// Ruta para editar perfil de usuario (requiere autenticación)
router.put('/me', authMiddleware, editProfile);

module.exports = router;
