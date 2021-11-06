import {RequestHandler} from 'express';
import {plainToClass} from 'class-transformer';
import {validate, ValidationError} from 'class-validator';

import {ValidationSource} from '../types';

/**
 * Capture dto validation errors
 * @param {CreateTaskDto|UpdateTaskDto|UUIDIdParamDto} type
 * @param  {BODY|PARAM} source
 * @param {Boolean} skipMissingProperties
 * @return {Response|void}
 */
export function validateDto(
 type: any,
 source: ValidationSource = ValidationSource.BODY,
 skipMissingProperties = false
): RequestHandler {
 return (req, res, next) => {
  const dtoObj = plainToClass(type, req[source]);
  validate(dtoObj, {skipMissingProperties}).then(
   (errors: ValidationError[]) => {
    if (errors.length > 0) {
     const dtoErrors = errors
      .map((error: ValidationError) =>
       (Object as any).values(error.constraints)
      )
      .join(', ');

     return res.status(400).json({
      status: 'failure',
      message: {
       code: `invalid_request_${source}`,
       details: dtoErrors,
      },
     });
    }

    // call the next middleware
    next();
   }
  );
 };
}
