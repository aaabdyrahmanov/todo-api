export type TaskStatusType = 'to-do' | 'in-progress' | 'completed';

export interface ITaskPayload {
  name: string;
  status?: TaskStatusType;
}

export type ITaskListLimit = {
  limit: number;
};

export type ITaskListPage = {
  page: number;
};

export interface ITaskListStatus {
  status?: TaskStatusType;
}
