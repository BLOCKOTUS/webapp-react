import { connect } from 'react-redux';
import {
  useHistory,
  useParams,
} from "react-router-dom";
import { useState, useEffect } from 'react';

import {
  canApproveIdentityVerificationJob,
  getIdentityVerificationJob,
} from '../../modules/identity';
import { onClickApproveRefuse } from '../../modules/job';
import Button from '../../ui/button';
import ButtonBack from '../../ui/button-back';
import Identity from '../../ui/identity';
import InfoBar from '../../ui/info-bar';
import View from '../../ui/view';

import type { ReactElement } from 'react';

import type { State } from '../../store';
import type { InfoType } from '../../modules/info';
import type { IdentityTypeWithKYC } from '../../modules/identity';
import type { UsersType } from '../../modules/user';
import type { State as JobsState } from '../../reducers/jobs';

const Verify = ({
  users,
  jobs,
}: {
  users?: UsersType,
  jobs?: JobsState,
}): ReactElement => {
  const [job, setJob] = useState<[IdentityTypeWithKYC, IdentityTypeWithKYC] | false>();
  const [jobId, setJobId] = useState<string>();
  const [info, setInfo] = useState<InfoType | null>();

  const params: { key: string } = useParams();
  const history = useHistory();

  const onComplete = () => setTimeout(() => history.push('/kyc/jobs'), 1500);
  
  const user = users?.loggedInUser;

  useEffect(() => {
    const pullJobFromNetwork = async () => {
      if (users && users.loggedInUser && params.key && jobs && jobs.list[Number(params.key)]) {
        setJobId(jobs.list[Number(params.key)].jobId);
        if (!jobId) { return; }
        const response = await getIdentityVerificationJob({ 
          jobId,
          user: users.loggedInUser,
          onInfo: setInfo,
        });
        response && setJob(response);
      }
    };
    pullJobFromNetwork();
  }, [users, params, jobs, jobId]);

  return (
    <View title="Verify">
      <InfoBar info={info} />
      { job
        ? (
          <div>
            <div>
              <table>
                <tr>
                    <th>Job</th>
                    <th>Original</th>
                </tr>
                <tr>
                  <td>
                      <Identity identity={job[0]} />
                  </td>
                  <td>
                      <Identity identity={job[1]} />
                  </td>
                </tr>
              </table>
            </div>
            <div>
                <Button 
                  label="Approve" 
                  onClick={jobId && user ? () => onClickApproveRefuse({
                    jobId,
                    result: 1,
                    user,
                    onInfo: setInfo,
                    onComplete
                  }) : undefined } 
                  disabled={!canApproveIdentityVerificationJob(job)} 
                />
                <Button
                  label="Refuse"
                  onClick={jobId && user ? () => onClickApproveRefuse({
                    jobId,
                    result: 0,
                    user,
                    onInfo: setInfo,
                    onComplete
                  }) : undefined }
                />
            </div>
          </div>
          )
        : (<></>)
      }
      <ButtonBack />
    </View>
  );
};

const mapStateToProps = (state: State) => {
  const { jobs, users } = state
  return { jobs, users };
};

export default connect(
  mapStateToProps,
  null,
)(Verify);
