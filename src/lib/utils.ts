import { useuserStore } from '@/components/auth/store';
import { usecartStore } from '@/components/cart/store';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
    console.log(cart);

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
