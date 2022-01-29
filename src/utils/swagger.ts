import swaggerJsdoc from 'swagger-jsdoc';
import yaml from 'js-yaml';
import { promises } from 'fs';
import { logger } from './logger';

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

const swaggerSpec: object = swaggerJsdoc(options);
const yamlFile: string = yaml.dump(swaggerSpec);

promises
  .writeFile('swagger.yaml', yamlFile)
  .then(() => logger.info('Docs generated Successfully'))
  .catch((err: unknown) =>
    logger.error('Error occured when generating swagger docs', err)
  );

export { swaggerSpec };
