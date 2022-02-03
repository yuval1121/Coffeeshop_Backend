import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../../swagger.json';

const swaggerRouter: Router = Router();
swaggerRouter.use('/', swaggerUi.serve);
swaggerRouter.get('/', swaggerUi.setup(swaggerSpec));

export default swaggerRouter;
