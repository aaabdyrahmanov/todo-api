export type TaskStatusType = 'to-do' | 'in-progress' | 'completed';

export interface ITaskPayload {
  name: string;
  status?: TaskStatusType;
}

export interface ITaskUpdatePayload {
  name?: string;
  status?: TaskStatusType;
}
