import type { Action } from '../actions/users';
import type { UsersType } from '../modules/user';

export type State = UsersType | null;

const initialState = {
  tmp: null,
  loggedInUser: null,
  users: [],
};

const users = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'users/loginUser':
      if (state && action.payload.user) {
        if (state.users.findIndex(u => u.id === action.payload.user.id) < 0) {
          return {
            ...state,
            users: [
              ...state.users,
              action.payload.user,
            ],
          }
        }
      }
      return state;

    default:
      return state;
  }
};

export default users;
