import { combineReducers } from 'redux'

import type { UsersType } from '../modules/user';

export type State = {
    users: UsersType,
}

const reducer = combineReducers({});

export default reducer;
