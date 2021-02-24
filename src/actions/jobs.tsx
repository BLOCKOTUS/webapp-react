import type { JobList } from '../modules/job';

export type JobsSetJobList = {
  type: "jobs/setJobList",
  payload: {
    list: JobList,
  },
};

export const setJobList = (list: JobList): JobsSetJobList => ({
  type: "jobs/setJobList",
  payload: {
    list,
  },
});

export type Action = JobsSetJobList;
