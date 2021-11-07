import {Request, Response, Router} from 'express';

import {HttpException} from '../../exception';
import {validateDto} from '../../middleware';
import {ValidationSource} from '../../types';

import UserController from './user.controller';
import {CreateUserDto, UpdateUserDto, UUIDIdParamDto} from './user.dto';
import {UserRoleType} from './user.interface';

const router = Router();

router.post(
 '/',
 validateDto(CreateUserDto, ValidationSource.BODY),
 async (req: Request, res: Response): Promise<Response> => {
  try {
   const response = await UserController.createUser(req.body);

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
   const response = await UserController.getUser(req.params.id);

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
 const role: UserRoleType = (req.query as any).role;

 try {
  const response = await UserController.getUsers(limit, page, role);

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
 validateDto(UpdateUserDto, ValidationSource.BODY),
 async (req: Request, res: Response): Promise<Response> => {
  try {
   const response = await UserController.updateUser(req.params.id, req.body);

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
   const response = await UserController.deleteUser(req.params.id);

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
