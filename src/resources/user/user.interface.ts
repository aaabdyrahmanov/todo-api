export interface IUserPayload {
  username: string;
  password: string;
  role: UserRoleType;
}

export interface IUserUpdatePayload {
  username?: string;
  role?: UserRoleType;
}

export enum UserRoleType {
  ADMIN = 'admin',
  USER = 'user',
}
