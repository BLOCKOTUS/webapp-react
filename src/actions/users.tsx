import type { User } from '../modules/user';

export type UsersLoginUserAction = {
    type: "users/loginUser",
    payload: {
      user: User,
    },
};

export type Action = UsersLoginUserAction;
