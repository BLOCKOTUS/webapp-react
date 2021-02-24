import type { AxiosResponse } from 'axios';
import { Crypt } from 'hybrid-crypto-js';

import appConfig from '../../config/app';
import { request } from '../nerves';
import { makeInfoProps } from '../info';
import type { RequestReponseObject } from '../nerves';
import type { InfoType } from '../info';
import type { User } from '../user';
import type { Encrypted, Keypair } from '../crypto';

/**
 * Job object, as stored on the ledger.
 */
export type JobType = {
    chaincode: string;
    key: string;
    creator: string;
    data: string;
    type: string;
};

/**
 * User selected for executing a task/job.
 */
export type WorkerType = {
    _id: string;
    publicKey: string;
};

/**
 * Data returned by the network when requesting a job.
 */
type JobResponseObject = { 
    job: JobType;
};


export type JobListItemType = { jobId: string };
export type JobList = Array<JobListItemType>;

/**
 * Data returned by the network when requesting a job list.
 */
type JobListResponseObject = { list: JobList };

/**
 * Data returned by the network when posting a new job.
 */
type PostJobResponseObject = {
    workersIds: Array<WorkerType>;
    jobId: string;
};

/**
 * Object returned by the network when doing a request.
 */
export type RequestJobResponseObject = RequestReponseObject & JobResponseObject;
export type RequestPostJobResponseObject = RequestReponseObject & PostJobResponseObject;
export type RequestCompleteJobResponseObject = RequestReponseObject;
export type RequestJobListResponseObject = RequestReponseObject & JobListResponseObject;

/**
 * Object returned by Axios when doing a request.
 */
export type RequestJobResponse = AxiosResponse<RequestJobResponseObject>;
export type RequestPostJobResponse = AxiosResponse<RequestPostJobResponseObject>;
export type RequestCompleteJobResponse = AxiosResponse<RequestCompleteJobResponseObject>;
export type RequestJobListResponse = AxiosResponse<RequestJobListResponseObject>;

/**
 * Request a job by jobId from the network.
 */
export const getJob = (
    {
        user,
        jobId,
    }: {
        user: User,
        jobId: string,
    },
): Promise<RequestJobResponse> =>
    request({
        username: user.username,
        wallet: user.wallet,
        url: appConfig.nerves.job.url,
        method: 'GET',
        params: {
          jobId,
        },
    });

/**
 * Submit a new job to the network.
 */
export const postJob = (
    {
        user,
        encryptedIdentity,
    }: {
        user: User,
        encryptedIdentity: Encrypted,
    },
): Promise<RequestPostJobResponse> => 
    request({
        username: user.username,
        wallet: user.wallet,
        url: appConfig.nerves.job.url,
        method: 'POST',
        data: {
            type: 'confirmation',
            data: encryptedIdentity,
            chaincode: 'identity',
            key: user.id,
        },
    });

/**
 * Complete a job by submitting a result for the job.
 */
export const completeJob = (
    {
        user,
        jobId,
        result,
    }: {
        user: User,
        jobId: string,
        result: 0| 1 ,
    },
): Promise<RequestCompleteJobResponse> => 
    request({
        username: user.username,
        wallet: user.wallet,
        url: appConfig.nerves.job.complete.url,
        method: 'POST',
        data: {
            jobId,
            result,
        },
    });

/**
 * Approve or Refuse ( 1 or 0 ) a job verification task, and submit the result to the network.
 */
export const onClickApproveRefuse = async (
    {
        jobId,
        result,
        user,
        onInfo,
        onComplete,
    }: {
        jobId: string,
        result: 0 | 1,
        user: User,
        onInfo?: (info: InfoType | null) => void,
        onComplete?: () => void,
    },
): Promise<boolean> => {
    const setInfo = onInfo ? onInfo : () => null;

    setInfo(makeInfoProps({ type: 'info', value: 'Submitting result...', loading: true }));

    try {
        const resComplete = await completeJob({ user, jobId, result });
        if(!resComplete || !resComplete.data.success){
            setInfo(makeInfoProps({ type: 'error', value: resComplete.data.message || 'error', loading: false }));
            return false;
        }
    
        setInfo(makeInfoProps({ type: 'info', value: 'Job complete. You will be redirected to the job list.', loading: true }));
        if (onComplete) onComplete();
        return true;
    } catch (e) {
        setInfo(makeInfoProps({ type: 'error', value: e.message || 'error', loading: false }));
        return false;
    }
};

/**
 * Decrypt the details of a job with a Keypair.
 */
export const decryptJob = (
    {
        keypair,
        encryptedJob,
    }: {
        keypair: Keypair,
        encryptedJob: Encrypted,
    },
): any | false => {
    const crypt = new Crypt();
    try {
        const rawEncryptedJob = crypt.decrypt(keypair.privateKey, encryptedJob);
        return JSON.parse(rawEncryptedJob.message);
    } catch (e) {
        return false;
    }
};

/**
 * Request jobs associated to the logged in user, by status, key, or chaincode, from the network.
 */
export const getJobList = (
    {
        user,
        chaincode,
        key,
        status,
    }: {
        user: User,
        chaincode?: string,
        key?: string,
        status?: string,
}): Promise<RequestJobListResponse> => 
    request({
        username: user.username,
        wallet: user.wallet,
        url: appConfig.nerves.job.list.url,
        method: 'GET',
        params: {
            chaincode,
            key,
            status,
        },
    });

export const getMyJobs = async (
    {
        user,
        onInfo,
        status,
    }: {
        user: User,
        onInfo?: (info: InfoType | null) => void,
        status: string,
    }): Promise<JobList | false> => {
    const setInfo = onInfo ? onInfo : () => null;

    setInfo(makeInfoProps({ type: 'info', value: 'Querying job list...', loading: true }));
    
    try {
        const resJobList = await getJobList({ user, status });
        if (!resJobList || !resJobList.data.success) {
            setInfo(makeInfoProps({ type: 'error', value: resJobList.data.message || 'error', loading: false }));
            return false;
        }
        if (resJobList.data.list.length === 0) {
            setInfo(makeInfoProps({ type: 'info', value: 'You have no job assigned.', loading: false }));
        }
        else { setInfo(null); }
        return resJobList.data.list;
    } catch (e) {
        setInfo(makeInfoProps({ type: 'error', value: e.message || 'error', loading: false }));
        return false;
    }
}