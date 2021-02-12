import type { AxiosResponse } from 'axios';
import { Crypt } from 'hybrid-crypto-js';

import appConfig from '../../config/app';
import { request } from '../nerves';
import type { RequestReponseObject } from '../nerves';
import type { Encrypted, Keypair } from '../crypto';
import type { IdentityType } from '../identity';
import type { WorkerType } from '../job';

/**
 * Wallet X509 certificate.
 */
export type Wallet = {
    credentials: {
        certificate: string;
        privateKey: string;
    }
    mspId: string;
    type: string;
};

/**
 * User locally managed.
 */
export type User = {
    id: string;
    wallet: Wallet;
    keypair: Keypair;
    username: string;
    identity?: IdentityType;
};

/**
 * Users store for managing users locally.
 */
export type UsersType = {
    loggedInUser: string;
    users: Array<User>;
    tmp: User | null;
};

/**
 * Object used to specify with whom the keypair was shared.
 */
export type SharedWithKeypair = Record<string, { keypair: Encrypted }>;

/**
 * Data returned by the network when requesting a keypair.
 */
type UserKeypairResponseObject = { 
    keypair: Encrypted;
};

/**
 * Object returned by the network requesting or submitting a keypair.
 */
export type RequestUserKeypairResponseObject = RequestReponseObject & UserKeypairResponseObject;
export type RequestPostKeypairResponseObject = RequestReponseObject;

/**
 * Object returned by Axios requesting or submitting a keypair.
 */
export type RequestUserKeypairResponse = AxiosResponse<RequestUserKeypairResponseObject>;
export type RequestPostKeypairResponse = AxiosResponse<RequestPostKeypairResponseObject>;

const crypt = new Crypt();

/**
 * Prepare an object from an array of workers and a keypair.
 * Each Worker of the array receive an encrypted copy of the keypair.
 */
const makeSharedWithObjectForWorkers = (
    {
        workersIds = [],
        keypairToShare,
    }: {
        workersIds?: Array<WorkerType>,
        keypairToShare?: Keypair,
    },
): SharedWithKeypair => 
    workersIds.reduce(
        (acc: SharedWithKeypair, worker: WorkerType) => {
            return ({
                ...acc,
                [worker._id]: { keypair: JSON.stringify(crypt.encrypt(worker.publicKey, JSON.stringify(keypairToShare))) },
            });
        },
        {},
    );

/**
 * Return the logged in user, from the `users` store.
 */
export const getLoggedInUser = (users: UsersType): User => 
    users.users.filter(u => u.username === users.loggedInUser)[0];

/**
 * Request an encrypted keypair from the network.
 * The keypair must have been shared with the user, or created by the user.
 */
export const getEncryptedKeypair = (
    {
        keypairId,
        user,
    }: {
        keypairId: string,
        user: User,
    },
): Promise<RequestUserKeypairResponse> => 
    request({
        username: user.username,
        wallet: user.wallet,
        url: appConfig.nerves.keypair.url,
        method: 'GET',
        params: {
            keypairId,
        },          
    });

/**
 * Submit an encrypted keypair to the network.
 * The keypair can be shared with other users.
 * In that case, they receive an encrypted copy of the keypair.
 */
export const postEncryptedKeypair = (
    {
        workersIds,
        keypairToShare,
        jobId,
        myEncryptedKeyPair,
        user,
    }: {
        workersIds?: Array<WorkerType>,
        keypairToShare?: Keypair,
        jobId: string,
        myEncryptedKeyPair: Encrypted,
        user: User,
    },
): Promise<RequestPostKeypairResponse> => 
    request({
        username: user.username,
        wallet: user.wallet,
        url: appConfig.nerves.keypair.url,
        method: 'POST',
        data: {
            sharedWith: makeSharedWithObjectForWorkers({ workersIds, keypairToShare }),
            groupId: jobId,
            myEncryptedKeyPair,
            type: 'job',
        },
    });

/**
 * Decrypt a Keypair with the logged in user keypair. 
 */
export const decryptKeypair = (
    {
        user,
        encryptedKeypair,
    }: {
        user: User,
        encryptedKeypair: Encrypted,
    },
): Keypair => {
    const rawSharedKeypair = crypt.decrypt(user.keypair.privateKey, encryptedKeypair);
    return JSON.parse(rawSharedKeypair.message);
};
