import {getRepository} from 'typeorm';
import {
 AlreadyExistsException,
 InternalServerException,
 NotFoundException,
} from '../../exception';
import {Resource} from '../../types';

import {User} from './user.entity';
import {
 IUserPayload,
 IUserUpdatePayload,
 UserRoleType,
} from './user.interface';

export const createUser = async (payload: IUserPayload) => {
 const userRepository = getRepository(User);
 const user = new User();
 user.username = payload.username;
 user.password = payload.password;
 user.role = payload.role ? payload.role : UserRoleType.USER;

 // hash the password
 // to securely store on DB
 user.hashPassword();

 try {
  const {id, username, role, createdAt} = await userRepository.save(user);
  return {id, username, role, createdAt};
 } catch (err: any) {
  // check whether or not
  // the error is related on being duplicate value
  if (err.code == 23505) {
   throw new AlreadyExistsException(Resource.USER, payload.username);
  }
  throw new InternalServerException(err.message);
 }
};

export const getUsers = async (
 limit: number | undefined,
 page: number | undefined,
 role: UserRoleType | undefined
): Promise<Array<User>> => {
 const userRepository = getRepository(User);

 const limitation: number = limit ? limit : 100;
 const skip: number = page ? (page - 1) * limitation : 0;
 const query = {
  skip: skip,
  take: limitation,
  where: role ?
   {isActive: true, role: role.toLowerCase()} :
   {isActive: true},
 };

 try {
  const users = await userRepository.find(query);
  return users;
 } catch (err) {
  throw new InternalServerException((err as Error).message);
 }
};

export const getUser = async (id: string): Promise<User> => {
 const userRepository = getRepository(User);
 let user;

 try {
  user = await userRepository.findOneOrFail(id, {
   where: {isActive: true},
  });
 } catch (error) {
  throw new NotFoundException(Resource.USER, id);
 }

 return user;
};

export const updateUser = async (
 id: string,
 payload: IUserUpdatePayload
): Promise<User> => {
 const userRepository = getRepository(User);
 const user = await getUser(id);

 user.username = payload.username ? payload.username : user.username;
 user.role = payload.role ? payload.role : user.role;
 user.updatedAt = new Date();

 try {
  const updatedUser = await userRepository.save(user);
  return updatedUser;
 } catch (e) {
  throw new AlreadyExistsException(Resource.USER, user.username);
 }
};

export const deleteUser = async (id: string): Promise<User> => {
 const userRepository = getRepository(User);
 const user = await getUser(id);

 user.isActive = false;

 try {
  const deletedUser = await userRepository.save(user);
  return deletedUser;
 } catch (err) {
  throw new InternalServerException((err as Error).message);
 }
};
