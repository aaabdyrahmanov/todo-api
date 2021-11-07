import {getRepository} from 'typeorm';

import {
 AlreadyExistsException,
 InternalServerException,
 NotFoundException,
} from '../../exception';
import {Resource} from '../../types';
import {Task} from './task.entity';
import {
 ITaskPayload,
 ITaskUpdatePayload,
 TaskStatusType,
} from './task.interface';

export const getTasks = async (
 limit: number | undefined,
 page: number | undefined,
 status: TaskStatusType | undefined
): Promise<Array<Task>> => {
 const taskRepository = getRepository(Task);

 const limitation: number = limit ? limit : 100;
 const skip: number = page ? (page - 1) * limitation : 0;
 const query = {
  skip: skip,
  take: limitation,
  where: status ? {isActive: true, status: status} : {isActive: true},
 };

 try {
  const tasks = await taskRepository.find(query);
  return tasks;
 } catch (err) {
  throw new InternalServerException((err as Error).message);
 }
};

export const getTask = async (id: string): Promise<Task> => {
 const taskRepository = getRepository(Task);
 let task;

 try {
  task = await taskRepository.findOne(id, {where: {isActive: true}});
 } catch (err: any) {
  throw new InternalServerException(err.message);
 }

 if (!task) throw new NotFoundException(Resource.TASK, id);

 return task;
};

export const createTask = async (payload: ITaskPayload): Promise<Task> => {
 const taskRepository = getRepository(Task);
 const task = new Task();

 try {
  const createdTask = await taskRepository.save({
   ...task,
   ...payload,
  });

  return createdTask;
 } catch (err: any) {
  // check whether or not
  // the error is related on being duplicate value
  if (err.code == 23505) {
   throw new AlreadyExistsException(Resource.TASK, payload.name);
  }
  throw new InternalServerException(err.message);
 }
};

export const updateTask = async (
 id: string,
 payload: ITaskUpdatePayload
): Promise<Task> => {
 const taskRepository = getRepository(Task);
 const task = await getTask(id);

 task.name = payload.name ? payload.name : task.name;
 task.status = payload.status ? payload.status : task.status;
 task.updatedAt = new Date();

 try {
  const updatedTask = await taskRepository.save(task);
  return updatedTask;
 } catch (err: any) {
  // check whether or not
  // the error is related on being duplicate value
  if (err.code == 23505) {
   throw new AlreadyExistsException(Resource.TASK, task.name);
  }
  throw new InternalServerException(err.message);
 }
};

export const deleteTask = async (id: string): Promise<Task> => {
 const taskRepository = getRepository(Task);
 const task = await getTask(id);

 task.isActive = false;

 try {
  const deletedTask = await taskRepository.save(task);
  return deletedTask;
 } catch (err) {
  throw new InternalServerException((err as Error).message);
 }
};
