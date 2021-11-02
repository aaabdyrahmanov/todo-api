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
import {Task} from './task.entity';
import {
 createTask,
 getTasks,
 getTask,
 updateTask,
 deleteTask,
} from './task.repository';

import {ITaskPayload, TaskStatusType} from './task.interface';

@Route('tasks')
@Tags('Task')
export default class TaskController {
  @Get('/')
  @Example<Array<Task>>([
   {
    id: '7b0a1e58-e9fe-4a23-a5a2-081ddd22a6c8',
    name: 'Task 1',
    status: 'to-do',
    createdAt: new Date('2021-02-17T13:21:09'),
    updatedAt: new Date('2021-02-17T13:21:09'),
   },
   {
    id: '7b0a1e58-e9fe-4a23-a5a2-081ddd22a6c8',
    name: 'Task 2',
    status: 'in-progress',
    createdAt: new Date('2021-10-14T13:14:21'),
    updatedAt: new Date('2021-10-17T21:10:07'),
   },
   {
    id: 'c325876b-7d81-4a62-bb65-b6d842e1ef17',
    name: 'Task 3',
    status: 'completed',
    createdAt: new Date('2020-11-26T09:01:12'),
    updatedAt: new Date('2021-01-13T13:21:09'),
   },
  ])
 public async getTasks(
    @Query() limit?: number,
    @Query() page?: number,
    @Query() status?: TaskStatusType
 ): Promise<Array<Task>> {
  return getTasks(limit, page, status);
 }

  @Post('/')
  @Example<Task>({
   id: 'c325876b-7d81-4a62-bb65-b6d842e1ef17',
   name: 'Task 1',
   status: 'to-do',
   createdAt: new Date('2021-10-24T10:11:12'),
   updatedAt: new Date('2021-10-24T10:11:12'),
  })
  public async createTask(@Body() body: ITaskPayload): Promise<Task> {
   return createTask(body);
  }

  @Get('{taskId}')
  @Example<Task>({
   id: 'c325876b-7d81-4a62-bb65-b6d842e1ef17',
   name: 'Task 3',
   status: 'completed',
   createdAt: new Date('2020-11-26T09:01:12'),
   updatedAt: new Date('2021-01-13T13:21:09'),
  })
  public async getTask(@Path() taskId: string): Promise<Task> {
   return getTask(taskId);
  }

  @Put('{taskId}')
  @Example<ITaskPayload>({
   name: 'Task 3',
   status: 'in-progress',
  })
  public async updateTask(
    @Path() taskId: string,
    @Body() body: ITaskPayload
  ): Promise<Task> {
   return updateTask(taskId, body);
  }

  @Delete('{taskId}')
  public async deleteTask(@Path() taskId: string): Promise<Task> {
   return deleteTask(taskId);
  }
}
