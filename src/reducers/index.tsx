import { combineReducers } from 'redux'

import users from './users';
import jobs from './jobs';

import type { State as JobsState } from './jobs';
import type { UsersType } from '../modules/user';

export type State = {
    users: UsersType,
    jobs: JobsState,
}

const reducer = combineReducers({
    users,
    jobs,
});

export default reducer;
