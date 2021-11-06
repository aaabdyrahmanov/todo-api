import express, {Request, Response} from 'express';
import TaskController from './task.controller';

import {CreateTaskDto, UpdateTaskDto, UUIDIdParamDto} from './task.dto';
import {validateDto} from '../../middleware';
import {HttpException} from '../../exception';

import {ValidationSource} from '../../types';
import {TaskStatusType} from './task.interface';

const router = express.Router();

router.post(
 '/',
 validateDto(CreateTaskDto, ValidationSource.BODY),
 async (req: Request, res: Response): Promise<Response> => {
  try {
   const controller = new TaskController();
   const response = await controller.createTask(req.body);

   return res.status(201).send(response);
  } catch (err) {
   return res.status((err as HttpException).status).send({
    status: 'failure',
    message: (err as HttpException).message,
   });
  }
 }
);

router.get(
 '/:id',
 validateDto(UUIDIdParamDto, ValidationSource.PARAM),
 async (req: Request, res: Response): Promise<Response> => {
  try {
   const controller = new TaskController();
   const response = await controller.getTask(req.params.id);

   return res.status(200).send(response);
  } catch (err) {
   return res.status((err as HttpException).status).send({
    status: 'failure',
    message: (err as HttpException).message,
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
  return res.status((err as HttpException).status).send({
   status: 'failure',
   message: (err as HttpException).message,
  });
 }
});

router.put(
 '/:id',
 validateDto(UUIDIdParamDto, ValidationSource.PARAM),
 validateDto(UpdateTaskDto, ValidationSource.BODY),
 async (req: Request, res: Response): Promise<Response> => {
  try {
   const controller = new TaskController();
   const response = await controller.updateTask(req.params.id, req.body);

   return res.status(200).send(response);
  } catch (err) {
   return res.status((err as HttpException).status).send({
    status: 'failure',
    message: (err as HttpException).message,
   });
  }
 }
);

router.delete(
 '/:id',
 validateDto(UUIDIdParamDto, ValidationSource.PARAM),
 async (req: Request, res: Response): Promise<Response> => {
  try {
   const controller = new TaskController();
   const response = await controller.deleteTask(req.params.id);

   return res.status(200).send(response);
  } catch (err) {
   return res.status((err as HttpException).status).send({
    status: 'failure',
    message: (err as HttpException).message,
   });
  }
 }
);

export default router;
