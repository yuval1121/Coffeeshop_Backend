import { Router } from 'express';
import { swaggerSpec } from '../utils/swagger';
import swaggerUi from 'swagger-ui-express';

const swaggerRouter: Router = Router();

swaggerRouter.use('/docs', swaggerUi.serve);
swaggerRouter.get('/docs', swaggerUi.setup(swaggerSpec));

export { swaggerRouter };
