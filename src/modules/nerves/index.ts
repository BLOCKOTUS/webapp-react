import axios, { AxiosPromise } from 'axios';

import type { Wallet } from '../user';

/**
 * Minimum object properties always returned by the nerves from the network when submnitting a request.
 */
export type RequestReponseObject = { 
  success: boolean; 
  message: string;
};

/**
* Prepare and submit a request to the nerves -> network.
* and return the response: network -> nerves -> ui
*/
export const request = ({
  username = '',
  wallet,
  method,
  url,
  data = {},
  params = {},
}: {
  username?: string;
  wallet?: Wallet | string;
  method: 'POST' | 'GET';
  url: string;
  data?: Record<string, unknown>;
  params?: Record<string, unknown>;
}): AxiosPromise => 
  axios({
    url,
    data,
    params: params,
    method,
    headers: {
      'Authorization': `Basic ${btoa(`${username}:${JSON.stringify(wallet)}`)}`,
    },
  });

