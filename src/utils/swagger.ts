import swaggerJsdoc from 'swagger-jsdoc';
import yaml from 'js-yaml';
import { promises } from 'fs';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API Docs',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.ts', '.src/schema/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);
const yamlFile = yaml.dump(swaggerSpec);

promises
  .writeFile('swagger.yml', yamlFile)
  .then(() => console.log('Docs generated Successfully'))
  .catch(err =>
    console.error(`Error occured when generating swagger docs`, err)
  );

export { swaggerSpec };
