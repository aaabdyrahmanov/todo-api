import {HttpException} from './';

export class TaskNotFoundException extends HttpException {
 constructor(id: string) {
  super(404, `Task with id ${id} not found!`);
 }
}
