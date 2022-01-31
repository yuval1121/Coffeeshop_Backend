import { Router } from 'express';
import { swaggerSpec } from '../utils/swagger';
import swaggerUi from 'swagger-ui-express';

const swaggerRouter: Router = Router();

//sets up swagger ui page at localhost:5000/docs
swaggerRouter.use('/', swaggerUi.serve);
swaggerRouter.get('/', swaggerUi.setup(swaggerSpec));

export default swaggerRouter;
