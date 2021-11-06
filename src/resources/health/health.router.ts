import express, {Response, Request} from 'express';
import HealthController from './health.controller';

const router = express.Router();

router.get('/', (_req: Request, res: Response): Response => {
 const response = HealthController.getStatus();

 return res.status(200).send(response);
});

export default router;
