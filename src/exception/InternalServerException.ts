import {HttpException} from '.';

export class InternalServerException extends HttpException {
 constructor(message: string) {
  super(500, message);
 }
}
