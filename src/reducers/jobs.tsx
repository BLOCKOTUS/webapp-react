import type { Action } from '../actions/jobs';
import type { JobList } from '../modules/job';

export type State = {
  list: JobList;
} | null;

const initialState = {
  list: [],
};

const jobs = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'jobs/setJobList':
      if (state && action.payload.list) {
        return {
          ...state,
          list: action.payload.list,
        }
      }
      return state;

    default:
      return state;
  }
};

export default jobs;
