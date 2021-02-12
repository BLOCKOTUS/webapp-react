
import appConfig from '../../config/app';
import { request } from '../nerves';

import type { AxiosResponse } from 'axios';
import type { User } from '../user';
import type { RequestReponseObject } from '../nerves';


type Service = {
    id: string;
    type: string;
    serviceEndpoint: string;
};

type PublicKey = {
    id: string;
    type: string;
    controller: string;
};

type VerificationMethod = {
    id: string;
    type: string;
    controller: string;
};

/**
 * Data returned by the network when performing a DID request.
 */
export type DidDocument = {
    '@context': Array<string> | string;
    id: string;
    controller?: string;
    verificationMethod?: Array<VerificationMethod>;
    publicKey?: Array<PublicKey>;
    service?: Array<Service>;
    created?: string;
    updated?: string;
    blockotus?: any; 
};

/**
 * Object returned by the network when performing a DID request.
 */
export type RequestDidResponseObject = RequestReponseObject & { 
    data: DidDocument;
};

/**
 * Object returned by Axios when performing a DID request.
 */
export type RequestDidResponse = AxiosResponse<RequestDidResponseObject>;


const did = (
    {
        methodName,
        methodSpecificId,
        urlPath,
        query,
        fragment,
        user,
    }: {
        methodName: string,
        methodSpecificId: string,
        urlPath: string,
        query: object,
        fragment: string,
        user: User,
    },
): Promise<RequestDidResponse> => 
    request({
        username: user.username,
        wallet: user.wallet,
        url: appConfig.nerves.did.url,
        method: 'GET',
        params: {
            methodName,
            methodSpecificId,
            urlPath,
            query,
            fragment,
        },          
    });

export const testDidUrl = (user: User) => {
    return did({
        methodName: 'blockotus',
        methodSpecificId: btoa(`user:${user.id}`),
        urlPath: '',
        query: { service: 'user' },
        fragment: '',
        user,
    });
};