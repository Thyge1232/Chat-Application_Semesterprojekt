export type User = {
  id: number;
  username: string;
  email: string;
  createdAt: string;
};

export interface CreateUserDto {
  name: string;
}

export interface UpdateUserDto {
  name?: string;
}
