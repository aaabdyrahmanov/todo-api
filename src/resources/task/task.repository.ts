import {getRepository} from 'typeorm';

import {Task} from './task.entity';
import {ITaskPayload, ITaskUpdatePayload, TaskStatusType} from './task.interface';
import {
 TaskWithThatNameAlreadyExistsException,
 TaskNotFoundException,
} from '../../exception';

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

 return taskRepository.find(query);
};

export const getTask = async (id: string): Promise<Task> => {
 const taskRepository = getRepository(Task);
 const task = await taskRepository.findOne(id, {where: {isActive: true}});

 if (!task) throw new TaskNotFoundException(id);

 return task;
};

export const createTask = async (payload: ITaskPayload): Promise<Task> => {
 const taskRepository = getRepository(Task);
 const task = await taskRepository.findOne({name: payload.name});

 if (task) {
  throw new TaskWithThatNameAlreadyExistsException(task.name);
 }

 const createTask = new Task();
 return taskRepository.save({
  ...createTask,
  ...payload,
 });
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

 return taskRepository.save(task);
};

export const deleteTask = async (id: string): Promise<Task> => {
 const taskRepository = getRepository(Task);
 const task = await getTask(id);

 task.isActive = false;

 return taskRepository.save(task);
};
