import {
 IsString,
 IsNotEmpty,
 IsOptional,
 IsEnum,
 IsUUID,
 Length,
} from 'class-validator';
import {UserRoleType} from './user.interface';

export class CreateUserDto {
  @IsString({message: 'Sorry, username must be a string type.'})
  @IsNotEmpty({message: 'Username is required.'})
  @Length(4, 20)
   username: string;

  @IsString({message: 'Sorry, password must be a string type.'})
  @IsNotEmpty({message: 'Password is required.'})
  @Length(4, 100)
   password: string;

  @IsString({message: 'Sorry, role must be a string type.'})
  @IsNotEmpty({message: 'User role is required.'})
  @IsEnum(UserRoleType, {
   message: `Role is invalid. User role can be set as admin or user, 
      but received as $value. Please, try again.`,
  })
   role: UserRoleType;
}

export class UpdateUserDto {
  @IsString({message: 'Sorry, username must be a string type.'})
  @IsOptional()
   username: string;

  @IsString({message: 'Sorry, role must be a string type.'})
  @IsOptional()
  @IsEnum(UserRoleType, {
   message: `Role is invalid. User role can be set as admin or user, 
   but received as $value. Please, try again.`,
  })
   role: UserRoleType;
}

export class UserResponseDto {
 id: string;
 username: string;
 role: string;
 createdAt: Date;
 updatedAt?: Date;
}

export class UUIDIdParamDto {
  @IsUUID('all', {
   message: `ID is invalid. Id should by type of UUID, 
   but actual value is $value. Please try again.`,
  })
   id: string;
}
