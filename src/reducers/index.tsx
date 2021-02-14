import { combineReducers } from 'redux'

import users from './users';

import type { UsersType } from '../modules/user';

export type State = {
    users: UsersType,
}

const reducer = combineReducers({
    users
});

export default reducer;
