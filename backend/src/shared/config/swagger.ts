import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
  apis: ['src/*/*.swagger.ts'],
  definition: {
    info: {
      description:
        'REST API for managing products and orders in POS System app',
      title: 'POS System API',
      version: '1.0.0',
    },
    openapi: '3.0.0',
  },
};

const specs = swaggerJSDoc(options);

export { specs, swaggerUi };
