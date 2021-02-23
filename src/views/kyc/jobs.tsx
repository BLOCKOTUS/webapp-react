import { connect } from 'react-redux';
import { useState, useEffect } from 'react';

import { getMyJobs } from '../../modules/job';
import ButtonBack from '../../ui/button-back';
import InfoBar from '../../ui/info-bar';
import View from '../../ui/view';

import type { ReactElement } from 'react';

import type { UsersType } from '../../modules/user';
import type { JobList } from '../../modules/job';
import type { InfoType } from '../../modules/info';
import type { State } from '../../store';

const Jobs = ({
  users,
}: {
  users?: UsersType,
}): ReactElement => {
  const [jobs, setJobs] = useState<JobList | null>();
  // const [identity, setIdentity] = useState<IdentityTypeWithKYC | null>(users?.loggedInUser?.identity?);
  const [info, setInfo] = useState<InfoType | null>();

  useEffect(() => {
    const pullJobsFromNetwork = async () => {
      if (users && users.loggedInUser) {
        const response = await getMyJobs({ user: users.loggedInUser, onInfo: setInfo, status: 'pending' });
        response && setJobs(response);

        console.log(response);
      }
    };
    pullJobsFromNetwork();
  }, [users]);

  return (
    <View title="Jobs">
      <InfoBar info={info} />
      <ButtonBack />
    </View>
  );
};

const mapStateToProps = (state: State) => {
  const { users } = state
  return { users };
};

export default connect(
  mapStateToProps,
  null,
)(Jobs);;
