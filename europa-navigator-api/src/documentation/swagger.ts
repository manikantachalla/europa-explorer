import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Europa Explorer API',
      version: '1.0.0',
      description: 'API to simulate robot navigation on Europa’s grid surface.',
    }
  },
  apis: ['./src/server.ts'] // path to your annotated routes
});
