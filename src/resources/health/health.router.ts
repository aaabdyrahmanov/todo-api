import express, {Response, Request} from 'express';
import HealthController from './health.controller';

const router = express.Router();

router.get('/', async (_req: Request, res: Response): Promise<Response> => {
 const controller = new HealthController();
 const response = await controller.getStatus();

 return res.status(200).send(response);
});

export default router;
