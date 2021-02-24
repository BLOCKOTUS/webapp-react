import styled from 'styled-components';
import type { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../button';

import type { JobList, JobListItemType } from '../../modules/job';

type ListJobsProps = {
    jobList?: JobList,
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const ListJobItem = ({
    job,
    index,
}: {
    job: JobListItemType,
    index: number,
}): ReactElement => {
    let history = useHistory();
    const onClickVerify = (i: number) => history.push(`/kyc/verify/${i}`);
    return (
        <tr>
			<td>{job.jobId}</td>
			<td>pending</td>
			<td><Button label="verify" onClick={() => onClickVerify(index)}></Button></td>
		</tr>
    )
}

const ListJobs = ({
    jobList,
}: ListJobsProps): ReactElement => {

    return (
        <Wrapper>
            <table>
                <tbody>
                    {
                        jobList && jobList?.map((job: JobListItemType, index: number) => <ListJobItem key={index} index={index} job={job} />)
                    }
                </tbody>
            </table>
        </Wrapper>
    )
        
};

export default ListJobs;
