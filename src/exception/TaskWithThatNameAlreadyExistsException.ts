import {HttpException} from './';

export class TaskWithThatNameAlreadyExistsException extends HttpException {
 constructor(name: string) {
  super(400, `Task with name ${name} already exists!`);
 }
}
