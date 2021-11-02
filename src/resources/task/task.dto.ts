import {
 IsString,
 IsNotEmpty,
 IsOptional,
 IsEnum,
 IsUUID,
} from 'class-validator';
import {TaskStatusType} from './task.interface';

export const TaskStatusTypes: TaskStatusType[] = [
 'to-do',
 'in-progress',
 'completed',
];

class CreateTaskDto {
  @IsString()
  @IsNotEmpty({message: 'Sorry, name is required!'})
   name!: string;

  @IsString()
  @IsOptional()
  @IsEnum(TaskStatusTypes, {
   message: `Status is invalid. Status should be to-do, 
      in-progress or completed, but actual value is $value.`,
  })
   status!: TaskStatusType;
}

class UpdateTaskDto {
  @IsString()
  @IsOptional()
   name!: string;

  @IsString()
  @IsOptional()
  @IsEnum(TaskStatusTypes, {
   message: `Status is invalid. Status should be to-do, 
      in -progress or completed, but actual value is $value.`,
  })
   status!: TaskStatusType;
}

class UUIDIdParamDto {
  @IsUUID('all', {
   message:
      'ID is invalid. Id should by type of UUID, but actual value is $value.',
  })
   id!: string;
}

export {CreateTaskDto, UpdateTaskDto, UUIDIdParamDto};
