import { createCipher, createDecipher } from 'crypto';

/* Consider supporting these values being settable in future refactoring */
export type CryptOptions = {
    /** Which AES mode to use */
    algorithm?: string;
    /** A.K.A. key */
    password?: string;
    /** Some algorithms require this Iinitialization Vector (it's like a salt) */
    iv?: string;
    inputEncoding?: string;
    outputEncoding?: string;
}

export const decryptAsync = async(data: string, options?: CryptOptions): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            const mykey = createDecipher('aes-128-cbc', process.env.PASSWORD_SALT as string);
            let mystr: string = mykey.update(data, 'hex', 'utf8')
            mystr += mykey.final('utf8');
            resolve(mystr);
        } catch (exception) {
            reject({ message: (exception as Error).message });
        }
    });
}

export const encryptAsync = async(data: string, options?: CryptOptions): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            const mykey = createCipher('aes-128-cbc', process.env.PASSWORD_SALT as string);
            let mystr = mykey.update(data, 'utf8', 'hex')
            mystr += mykey.final('hex');
            resolve(mystr);
        } catch (exception) {
            reject({ message: (exception as Error).message });
        }
    });
}

export default {
    decryptAsync,
    encryptAsync,
}
