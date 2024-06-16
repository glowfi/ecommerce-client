import { useuserStore } from '@/components/auth/store';
import { usecartStore } from '@/components/cart/store';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { StateStorage } from 'zustand/middleware';
import CryptoJS from 'crypto-js';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getOS = () => {
    let detectedOS = 'Unknown OS';

    if (navigator.appVersion.indexOf('Mac') != -1) detectedOS = 'MacOS';

    if (navigator.appVersion.indexOf('Win') != -1) detectedOS = 'Windows';

    if (navigator.appVersion.indexOf('Linux') != -1) detectedOS = 'Linux';

    return detectedOS;
};

var BrowserType: any;
(function (BrowserType) {
    BrowserType['OPERA'] = 'Opera';
    BrowserType['OPERA2'] = 'OPR';
    BrowserType['EDGE'] = 'Edg';
    BrowserType['CHROME'] = 'Chrome';
    BrowserType['SAFARI'] = 'Safari';
    BrowserType['FIREFOX'] = 'Firefox';
    BrowserType['UNKNOWN'] = 'unknown';
})(BrowserType || (BrowserType = {}));

export const detectBrowser = () => {
    return Object.values(BrowserType).find(
        //@ts-ignore
        (browser) => navigator.userAgent.indexOf(browser) != -1
    );
};

export const checkIsAuth = () => {
    let user = useuserStore.getState().user;
    let cart = usecartStore.getState().cart;

    if (!user.id) {
        return 'auth';
    } else if (cart.length === 0) {
        return 'cart';
    }
};

export const getNameInitials = (name: string) => {
    let spilts = name.split(' ');
    let first_name = spilts[0];
    let last_name = spilts[1];
    return first_name.charAt(0) + last_name.charAt(0);
};

export const getDateHumanReadable = (data: string) => {
    const date = new Date(data);
    const readableDate = date
        .toLocaleString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
        .replace(/(\d+)(st|nd|rd|th)/, '$1${"st","nd","rd","th"}[1]');
    return readableDate;
};

let YOUR_NONCE = process.env.STORE_NONCE;

export const SecureStorage: StateStorage = {
    getItem: async (key: string): Promise<string | null> => {
        const value = localStorage.getItem(key);

        if (value) {
            const decryptedBytes = CryptoJS.AES.decrypt(
                value,
                YOUR_NONCE as string
            );
            const decryptedValue = decryptedBytes.toString(CryptoJS.enc.Utf8);
            return decryptedValue;
        }

        return value;
    },
    setItem: async (key: string, value: any): Promise<void> => {
        const encrypted = CryptoJS.AES.encrypt(
            value,
            YOUR_NONCE as string
        ).toString();
        localStorage.setItem(key, encrypted);
    },
    removeItem: async (key: string): Promise<void> => {
        localStorage.removeItem(key);
    }
};

export function titleCase(str: string) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] =
            splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
}
