import type { AxiosResponse } from 'axios';

import appConfig from '../../config/app';
import { validateKeypair, generateKeyPair } from '../crypto';
import { makeInfoProps } from '../info';
import { request } from '../nerves';
import type { User, UsersType, Wallet } from '../user';
import type { InfoType } from '../info';
import type { Keypair } from '../crypto';
import type { RequestReponseObject } from '../nerves';

/**
 * Data returned by the network when registering a new user.
 */
export type RegisterResponseObject = { 
    wallet: Wallet;
    id: string;
};

/**
 * Object returned by the network when registering a new user.
 */
export type RequestRegisterResponseObject = RequestReponseObject & RegisterResponseObject;

/**
 * Object returned by Axios when registering a new user.
 */
export type RequestRegisterResponse = AxiosResponse<RequestRegisterResponseObject>;

/**
 * Check if the username stored in `tmp` object (Register page) is already logged in.
 */
export const isAlreadyLogged = (
    users: UsersType,
): boolean => 
    users
        .users
        .filter((u: User) => users.tmp && u.username === users.tmp.username)
        .length > 0;

/**
 * Store user informations in `users` object.
 */
export const loginUser = (
    {
        users,
        setUsers,
    }: {
        users: UsersType,
        setUsers?: (u: UsersType) => void,
    },
): void => {
    if (users.tmp) {
        let newUser = {
            ...users.tmp,
            wallet: JSON.parse(users.tmp.wallet.toString()),
        };
        const newUsers = [...users.users, newUser];
        users.users = newUsers;
        users.loggedInUser = users.tmp ? users.tmp : null;
    
        users.tmp = null;
        if (setUsers) setUsers(users);
    }
};

/**
 * Used for the onClick event of the `login` button on Login page.
 * It validates the inputted keypair and perform the login action.
 */
export const login = async (
    {
        username,
        wallet,
        privateKey,
        publicKey,
        e,
        users,
        onInfo,
        setUsers,
    }: {
        username?: string,
        wallet?: string,
        publicKey?: string,
        privateKey?: string,
        e?: Event,
        users?: UsersType,
        onInfo?: (info: InfoType | null) => void,
        setUsers?: (u: UsersType) => void,
    },
): Promise<boolean> => {
    if (e) { e.preventDefault(); }

    const setInfo = onInfo ? onInfo : () => null;
    
    if ((!users || !users.tmp) && (
        !username || !wallet || !privateKey || !publicKey
    )) { 
        setInfo(makeInfoProps({ type: 'error', value: 'Data is incomplete.', loading: false }));
        return false; 
    }

    // set info loading
    setInfo(makeInfoProps({ type: 'info', value: '', loading: true }));

    // validate keypair
    try {
        if (publicKey && privateKey){
            let keypair = { publicKey, privateKey };
            await validateKeypair(keypair);
        }
        // for Svelte store compatibilty
        if (users && users.tmp) {
            await validateKeypair(users.tmp.keypair);
        }
    } catch (e) {
        setInfo(makeInfoProps({ type: 'error', value: 'Keypair is invalid.', loading: false }));
        return false;
    }

    // verify if already logged in
    // for Svelte store compatibilty
    if (users && users.tmp && isAlreadyLogged(users)) {
        setInfo(makeInfoProps({ type: 'error', value: `${users.tmp.username} already logged in.`, loading: false }));
        return false;
    }
    
    // perform login action
    // for Svelte store compatibilty
    if (users) { loginUser({ users, setUsers }); }

    setInfo(makeInfoProps({ type: 'info', value: 'Successfully registered.', loading: false}));
    return true;
};

/**
 * Check if the `Login` button should be disabled or not.
 */
export const submitLoginIsDisabled = (
    users: UsersType,
): boolean => 
    !users.tmp
    || users.tmp.username.length === 0
    || users.tmp.keypair.privateKey.length === 0
    || users.tmp.keypair.publicKey.length === 0
    || users.tmp.wallet === null;

/**
 * Submit a new user to the network.
 */
export const register = (
    {
        username,
        keypair,
    }: {
        username: string,
        keypair: Keypair,
    },
): Promise<RequestRegisterResponse> =>
    request({
        method: 'POST',
        url: appConfig.nerves.user.url,
        data: {
            username,
            publicKey: keypair.publicKey,
        },
    });

/**
 * Used for the onClick event of the `submit` button on Register page.
 * It generates a keypair, register a user in the network, receives a wallet, and login the user.
 */
export const submitRegister = async (
    {
        e,
        users,
        username,
        onInfo,
        onComplete,
        setUsers,
    }: {
        e?: Event,
        users?: UsersType,
        username?: string,
        onInfo?: (info: InfoType | null) => void,
        onComplete?: () => void,
        setUsers?: (u: UsersType) => void,
    },
): Promise<User | false> => {
    e && e.preventDefault();
    const _username = username || users?.tmp?.username;
    if (!_username) { return false; }

    const setInfo = onInfo ? onInfo : () => null;

    setInfo(makeInfoProps({ type: 'info', value: '', loading: true }));

    try {
        // generate keypair
        const keypair = await generateKeyPair();

        // get wallet from the network
        const resRegister = await register({ username: _username, keypair });
        if (!resRegister || !resRegister.data.success) {
            setInfo(makeInfoProps({ type: 'error', value: resRegister.data.message || 'error', loading: false }));
            return false;
        }

        const { wallet, id } = resRegister.data;
        setInfo(makeInfoProps({ type: 'info', value: resRegister.data.message, loading: false }));
    
        // make user object
        const user = {
            username: _username,
            wallet,
            keypair,
            id,
        };
    
        if (users) {
            // login user with Svelte store method 
            users.tmp = user; 
            loginUser({ users, setUsers });
        }
    
        if (onComplete) onComplete();
    
        return user;
    } catch (e) {
        setInfo(makeInfoProps({ type: 'error', value: e.message || 'error', loading: false }));
        return false;
    }
};
