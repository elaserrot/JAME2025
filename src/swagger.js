const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API JAME',
    description: 'Documentación automática de la API',
  },
  host: 'localhost:3001',
  schemes: ['http'],
};

const outputFile = './src/swagger.json';
const endpointsFiles = ['./src/app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
 