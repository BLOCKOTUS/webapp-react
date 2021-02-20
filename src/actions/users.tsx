import type { User } from '../modules/user';

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
  | UsersSelectLoggedUserAction;
