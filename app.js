// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const sequelize = require('./config/db'); // Conexión con la base de datos
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes'); // Importamos las rutas de usuario
const postRoutes = require('./routes/postRoutes'); // Rutas de post
const followingRoutes = require('./routes/followingRoutes'); // Rutas de following

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Analizar el cuerpo de las peticiones en formato JSON

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Red Social API',
      version: '1.0.0',
      description: 'Documentación de la API de la red social',
    },
  },
  apis: ['./routes/*.js'], // Incluye las rutas para la documentación de Swagger
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Endpoint para Swagger

// Rutas
app.use('/api/usuarios', userRoutes); // Ruta de usuarios
app.use('/api/posts', postRoutes); // Ruta de publicaciones
app.use('/api/following', followingRoutes); // Ruta de seguidores

// Conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida con éxito');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
