import type { User } from '../modules/user';
import type { IdentityType } from '../modules/identity';

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

export type UsersCreateIdentityAction = {
  type: "users/createIdentity",
  payload: {
    identity: IdentityType,
  },
};

export const createIdentity = (identity: IdentityType): UsersCreateIdentityAction => ({
  type: "users/createIdentity",
  payload: {
    identity,
  },
});

export type Action = UsersLoginUserAction
  | UsersCreateIdentityAction
  | UsersDeleteUserAction
  | UsersSelectLoggedUserAction;
