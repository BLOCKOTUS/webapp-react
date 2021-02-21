import { RSA, Crypt } from 'hybrid-crypto-js';
import md5 from 'md5';

import type { IdentityType, IdentityTypeWithKYC } from '../identity';

/**
 * Message encrypted with a Keypair.
 */
export type Encrypted = string;

/**
 * Object returned when decrypting a message with a private key.
 */
export type Decrypted = {
    message: string;
    signature: string;
};

/**
 * Standard Keypair.
 */
export type Keypair = {
    publicKey: string;
    privateKey: string;
};

const crypt = new Crypt();

/**
 * Promise implementation of rsa.generateKeyPair function.
 */
export const generateKeyPair = (): Promise<Keypair> => {
    const rsa = new RSA();
    return new Promise((resolve) => {
        rsa.generateKeyPair(resolve);
    });
};

/**
 * Return a md5 hash based on identity properties.
 */
export const uniqueHashFromIdentity = (identity: IdentityType | IdentityTypeWithKYC): string =>
    md5(`${identity.nation}-${identity.nationalId}-${identity.birthdate}`);

/**
 * Validate a keypair by checking if it can encrypt and decrypt a message.
 */
export const validateKeypair = async (keypair: Keypair): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        if(!keypair.privateKey || !keypair.publicKey) {
            reject(false);
            return;
        }
        const message = 'testme';
        try {
            const encrypted = crypt.encrypt(keypair.publicKey, message);
            const decrypted = crypt.decrypt(keypair.privateKey, encrypted);
            decrypted.message === message ? resolve(true) : reject(false);
        } catch (e) {
            reject(false);
        }
        return;
    });
};
