import {getRepository} from 'typeorm';
import {mocked} from 'ts-jest/utils';

import * as TaskRepository from '../task.repository';
import {generateTasksData} from '../../../../test/utils/generate';

jest.mock('typeorm');

const mockedGetRepo = mocked(getRepository(<jest.Mock>{}));
beforeEach(() => {
 mockedGetRepo.find.mockClear();
});

describe('TaskRepository', () => {
 describe('getTasks', () => {
  test('should return empty array', async () => {
   mockedGetRepo.find.mockResolvedValue([]);
   const tasks = await TaskRepository.getTasks(10, 10, 'completed');
   expect(tasks).toEqual([]);
   expect(mockedGetRepo.find).toHaveBeenCalledWith({
    skip: 90,
    take: 10,
    where: {isActive: true, status: 'completed'},
   });
   expect(mockedGetRepo.find).toHaveBeenCalledTimes(1);
  });

  test('should return tasks list', async () => {
   const tasksData = generateTasksData(2);
   mockedGetRepo.find.mockResolvedValue(tasksData);
   const posts = await TaskRepository.getTasks(4, 20, 'to-do');
   expect(posts).toEqual(tasksData);
   expect(mockedGetRepo.find).toHaveBeenCalledWith({
    skip: 76,
    take: 4,
    where: {isActive: true, status: 'to-do'},
   });
   expect(mockedGetRepo.find).toHaveBeenCalledTimes(1);
  });
 });
});
