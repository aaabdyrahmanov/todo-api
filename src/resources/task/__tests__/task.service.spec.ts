import server from '../../../server';

import request from 'supertest';

describe('task controllers', () => {
 let api: any;

 beforeAll(async () => {
  api = await request(server);
 });

 describe('GET /v1/tasks', () => {
  it('Tasks #1 - should get tasks with empty db', () => {
   return api.get('/v1/tasks').expect(200);
  });

  it('Tasks #2 - should fail to get the task with invalid ID', () => {
   const invalidTaskId = 12;
   return api.get(`/v1/tasks/${invalidTaskId}`).expect(400);
  });

  it('Tasks #3 - should fail to get the task with missing ID', () => {
   const taskId = 'df625914-a17e-4d81-9572-be1f08387d42';
   return api.get(`/v1/tasks/${taskId}`).expect(404);
  });
 });

 describe('POST /v1/tasks', () => {
  it('Tasks #4 - should fail to create a new task with empty body', () => {
   return api.post('/v1/tasks').expect(400);
  });
 });

 describe('PUT /v1/tasks', () => {
  it('Tasks #6 - should fail to update the task with missing ID', () => {
   const taskId = 'df625914';
   return api.put(`/v1/tasks/${taskId}`).expect(400);
  });

  it('Tasks #6 - should fail to update the task with missing ID', () => {
   const taskId = 'df625914-a17e-4d81-9572-be1f08387d42';
   return api.put(`/v1/tasks/${taskId}`).expect(404);
  });
 });

 describe('DELETE /v1/tasks', () => {
  it('Tasks #7 - should fail to delete the task with invalid ID', () => {
   const invalidTaskId = 12;
   return api.delete(`/v1/tasks/${invalidTaskId}`).expect(400);
  });

  it('Tasks #8 - should fail to update the task with missing ID', () => {
   const taskId = 'df625914-a17e-4d81-9572-be1f08387d42';
   return api.delete(`/v1/tasks/${taskId}`).expect(404);
  });
 });
});
