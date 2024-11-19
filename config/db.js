// config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Cargar las variables de entorno del archivo .env

// Crear una instancia de Sequelize para conectarse a MySQL
const sequelize = new Sequelize({
  dialect: 'mysql',               // Tipo de base de datos (MySQL en este caso)
  host: process.env.DB_HOST,      // Dirección del host (usamos la variable de entorno DB_HOST)
  username: process.env.DB_USER,  // Usuario de la base de datos (DB_USER de .env)
  password: process.env.DB_PASSWORD, // Contraseña (DB_PASSWORD de .env)
  database: process.env.DB_NAME,  // Nombre de la base de datos (DB_NAME de .env)
});

// Comprobar la conexión a la base de datos
const authenticateDB = async () => {
  try {
    await sequelize.authenticate(); // Intenta conectar con la base de datos
    console.log('Conexión a la base de datos establecida con éxito');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

authenticateDB(); // Llamar a la función que intenta la conexión

// Exportamos sequelize para poder usarlo en otros archivos
module.exports = sequelize;
