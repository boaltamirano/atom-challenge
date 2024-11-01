import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Documented API with Swagger',
      version: '1.0.0',
      description: 'ATOM API Documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000', 
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    }
  },
  apis: ['./src/routes/*.ts'], // Cambia la ruta según la ubicación de tus archivos de rutas
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
export default swaggerSpecs;