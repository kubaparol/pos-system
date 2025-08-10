import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import packageJson from '../../../package.json';

const options: swaggerJSDoc.Options = {
  apis: ['src/*/*.swagger.ts'],
  definition: {
    info: {
      description:
        'REST API for managing products and orders in MyStoreAssistant app',
      title: 'MyStoreAssistant API',
      version: packageJson.version,
    },
    openapi: '3.0.0',
  },
};

const specs = swaggerJSDoc(options);

export { specs, swaggerUi };
