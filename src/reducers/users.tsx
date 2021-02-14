import type { Action } from '../actions/users';
import type { State } from '../reducers';

const users = (state: State, action: Action) => {
  switch (action.type) {
    case 'users/loginUser':
      if (state && action.payload.user) {
        if (state.users.users.findIndex(u => u.id === action.payload.user.id) < 0) {
          return {
            ...state,
            users: {
              ...state.users,
              users: [...state.users.users, action.payload.user],
            },
          }
        }
      }
      return state;

    default:
      return state;
  }
};

export default users;
