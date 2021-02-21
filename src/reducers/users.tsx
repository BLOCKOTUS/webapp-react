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
    case 'users/deleteUser':
      if (state && action.payload.username) {
        return {
          ...state,
            loggedInUser: state.loggedInUser?.username !== action.payload.username ? state.loggedInUser : null,
            users: [
              ...state.users.filter(u => u.username !== action.payload.username),
            ],
        };
      }
      return state;

    case 'users/selectLoggedUser':
      if (state && action.payload.username) {
        return {
          ...state,
          loggedInUser: state.users.filter(u => u.username === action.payload.username)[0],
        };
      }
      return state;

    case 'users/loginUser':
      if (state && action.payload.user) {
        if (state.users.findIndex(u => u.username === action.payload.user.username) < 0) {
          return {
            ...state,
            loggedInUser: action.payload.user,
            users: [
              ...state.users,
              action.payload.user,
            ],
          }
        }
        return {
          ...state,
          loggedInUser: action.payload.user,
        };
      }
      return state;

    default:
      return state;
  }
};

export default users;
