import { User } from "@prisma/client";

export type UserResponse = {
  username: string;
  name: string;
  token?: string;
};

export type CreateUserRequest = {
  username: string;
  password: string;
  name: string;
};

export type LoginUserRequest = {
  username: string;
  password: string;
};

export type UpdateUserRequest = {
  password: string;
  name: string;
};

export function toUserResponse(user: User): UserResponse {
  return {
    username: user.username,
    name: user.name,
  };
}
