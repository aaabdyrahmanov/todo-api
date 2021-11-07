import {
 Get,
 Put,
 Route,
 Tags,
 Post,
 Body,
 Path,
 Delete,
 Example,
 Query,
} from 'tsoa';

import {UserResponseDto} from './user.dto';
import {User} from './user.entity';
import {
 IUserPayload,
 IUserUpdatePayload,
 UserRoleType,
} from './user.interface';
import {
 createUser,
 getUsers,
 getUser,
 updateUser,
 deleteUser,
} from './user.repository';

@Route('users')
@Tags('User')
export default class UserController {
  @Post('/')
  @Example<UserResponseDto>({
   id: '7b0a1e58-e9fe-4a23-a5a2-081ddd22a6c8',
   username: 'Jane Doe',
   role: 'admin',
   createdAt: new Date('2021-10-24T10:11:12'),
  })
 static async createUser(
    @Body() body: IUserPayload
 ): Promise<UserResponseDto> {
  return createUser(body);
 }

  @Get('{userId}')
  @Example<UserResponseDto>({
   id: '31bee44e-1feb-4aa5-a6f8-2ead6056becd',
   username: 'John Doe',
   role: 'user',
   createdAt: new Date('2021-10-24T10:11:12'),
   updatedAt: new Date('2021-10-24T10:11:12'),
  })
  static async getUser(@Path() userId: string): Promise<User> {
   return getUser(userId);
  }

  @Get('/')
  @Example<Array<UserResponseDto>>([
   {
    id: '93b2ac04-02fe-4d3c-9adc-7f39d511bf0e',
    username: 'Jane Doe',
    role: 'admin',
    createdAt: new Date('2021-02-17T13:21:09'),
    updatedAt: new Date('2021-02-17T13:21:09'),
   },
   {
    id: '7b0a1e58-e9fe-4a23-a5a2-081ddd22a6c8',
    username: 'John Doe',
    role: 'user',
    createdAt: new Date('2021-02-17T13:21:09'),
    updatedAt: new Date('2021-10-17T21:10:07'),
   },
  ])
  static async getUsers(
    @Query() limit?: number,
    @Query() page?: number,
    @Query() role?: UserRoleType
  ): Promise<Array<UserResponseDto>> {
   return getUsers(limit, page, role);
  }

  @Put('{userId}')
  @Example<UserResponseDto>({
   id: '199a3692-d65e-49f7-8400-330cc434b372',
   username: 'Jane Doe',
   role: 'admin',
   createdAt: new Date('2021-02-17T13:21:09'),
   updatedAt: new Date('2021-07-02T16:32:17'),
  })
  static async updateUser(
    @Path() userId: string,
    @Body() body: IUserUpdatePayload
  ): Promise<UserResponseDto> {
   return updateUser(userId, body);
  }

  @Delete('{userId}')
  @Example<UserResponseDto>({
   id: '199a3692-d65e-49f7-8400-330cc434b372',
   username: 'Jane Doe',
   role: 'admin',
   createdAt: new Date('2021-02-17T13:21:09'),
   updatedAt: new Date('2021-07-02T16:32:17'),
  })
  static async deleteUser(@Path() userId: string): Promise<UserResponseDto> {
   return deleteUser(userId);
  }
}
