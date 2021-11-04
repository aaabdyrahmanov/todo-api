import express, {Request, Response} from 'express';
import TaskController from './task.controller';

import {CreateTaskDto, UpdateTaskDto, UUIDIdParamDto} from './task.dto';
import validationMiddleware from '../../middleware/validation.middleware';

import {ValidationSource} from '../../types';
import {TaskStatusType} from './task.interface';

const router = express.Router();

router.post(
 '/',
 validationMiddleware(CreateTaskDto, ValidationSource.BODY),
 async (req: Request, res: Response): Promise<Response> => {
  try {
   const controller = new TaskController();
   const response = await controller.createTask(req.body);

   return res.status(201).send(response);
  } catch (err) {
   return res.status(400).send({
    status: 'failure',
    message: (err as Error).message,
   });
  }
 }
);

router.get(
 '/:id',
 validationMiddleware(UUIDIdParamDto, ValidationSource.PARAM),
 async (req: Request, res: Response): Promise<Response> => {
  try {
   const controller = new TaskController();
   const response = await controller.getTask(req.params.id);

   return res.status(200).send(response);
  } catch (err) {
   return res.status(404).send({
    status: 'failure',
    message: (err as Error).message,
   });
  }
 }
);

router.get('/', async (req: Request, res: Response): Promise<Response> => {
 const limit: number = (req.query as any).limit;
 const page: number = (req.query as any).page;
 const status: TaskStatusType = (req.query as any).status;

 try {
  const controller = new TaskController();
  const response = await controller.getTasks(limit, page, status);

  return res.status(200).send(response);
 } catch (err) {
  return res.status(400).send({
   status: 'failure',
   message: (err as Error).message,
  });
 }
});

router.put(
 '/:id',
 validationMiddleware(UUIDIdParamDto, ValidationSource.PARAM),
 validationMiddleware(UpdateTaskDto, ValidationSource.BODY),
 async (req: Request, res: Response): Promise<Response> => {
  try {
   const controller = new TaskController();
   const response = await controller.updateTask(req.params.id, req.body);

   return res.status(200).send(response);
  } catch (err) {
   return res.status(404).send({
    status: 'failure',
    message: (err as Error).message,
   });
  }
 }
);

router.delete(
 '/:id',
 validationMiddleware(UUIDIdParamDto, ValidationSource.PARAM),
 async (req: Request, res: Response): Promise<Response> => {
  try {
   const controller = new TaskController();
   const response = await controller.deleteTask(req.params.id);

   return res.status(200).send(response);
  } catch (err) {
   return res.status(404).send({
    status: 'failure',
    message: (err as Error).message,
   });
  }
 }
);

export default router;
