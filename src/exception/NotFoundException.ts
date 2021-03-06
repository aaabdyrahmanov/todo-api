import {HttpException} from '.';

export class NotFoundException extends HttpException {
 constructor(type: string, id: string) {
  super(404, `${type} with id ${id} not found!`);
 }
}
