import type { User } from '../modules/user';

export type UsersDeleteUserAction = {
  type: "users/deleteUser",
  payload: {
    username: string,
  },
};

export const deleteUser = (username: string): UsersDeleteUserAction => ({
  type: "users/deleteUser",
  payload: {
    username,
  },
});

export type UsersLoginUserAction = {
  type: "users/loginUser",
  payload: {
    user: User,
  },
};

export const loginUser = (user: User): UsersLoginUserAction => ({
  type: "users/loginUser",
  payload: {
    user,
  },
});

export type UsersSelectLoggedUserAction = {
  type: "users/selectLoggedUser",
  payload: {
    username: string,
  },
};

export const selectLoggedUser = (username: string): UsersSelectLoggedUserAction => ({
  type: "users/selectLoggedUser",
  payload: {
    username,
  },
});

export type Action = UsersLoginUserAction
  | UsersDeleteUserAction
  | UsersSelectLoggedUserAction;
