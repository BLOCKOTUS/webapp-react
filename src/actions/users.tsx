import type { User } from '../modules/user';
import type { Dispatch, GetState } from '../store';


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

export type Action = UsersLoginUserAction;
