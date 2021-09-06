import { connect } from 'react-redux';
import { useState, useEffect } from 'react';

import * as actions from '../../actions/jobs';
import { getMyJobs } from '../../modules/job';
import ButtonBack from '../../ui/button-back';
import InfoBar from '../../ui/info-bar';
import ListJobs from '../../ui/list-jobs';
import View from '../../ui/view';

import type { ReactElement } from 'react';

import type { UsersType } from '../../modules/user';
import type { JobList } from '../../modules/job';
import type { InfoType } from '../../modules/info';
import type { State as JobsState } from '../../reducers/jobs';
import type { State } from '../../store';

const Jobs = ({
  users,
  jobs,
  setJobList,
}: {
  users?: UsersType,
  jobs?: JobsState,
  setJobList: (jobs: JobList) => void,
}): ReactElement => {
  const [info, setInfo] = useState<InfoType | null>();

  useEffect(() => {
    const pullJobsFromNetwork = async () => {
      if (users && users.loggedInUser) {
        setJobList([]);
        const response = await getMyJobs({ user: users.loggedInUser, onInfo: setInfo, status: 'pending' });
        response && setJobList(response);
      }
    };
    pullJobsFromNetwork();
  }, [users, setJobList]);

  return (
    <View title="Jobs">
      <InfoBar info={info} />
      <ListJobs jobList={jobs?.list} />
      <ButtonBack />
    </View>
  );
};

const mapStateToProps = (state: State) => {
  const { users, jobs } = state
  return { users, jobs };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setJobList: (jobs: JobList) => dispatch(actions.setJobList(jobs)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Jobs);;
