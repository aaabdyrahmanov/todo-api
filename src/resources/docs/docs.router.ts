import express, {Response, Request} from 'express';
import swaggerUi from 'swagger-ui-express';

const router = express.Router();

router.use(
 '/',
 swaggerUi.serve,
 async (_req: Request, res: Response): Promise<Response> => {
  return res.send(
   swaggerUi.generateHTML(await import('../../../docs/swagger.json'))
  );
 }
);

export default router;
