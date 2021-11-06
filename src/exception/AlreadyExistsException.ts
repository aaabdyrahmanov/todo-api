import {HttpException} from '.';

export class AlreadyExistsException extends HttpException {
 constructor(type: string, name: string) {
  super(409, `${type} with name ${name} already exists!`);
 }
}
