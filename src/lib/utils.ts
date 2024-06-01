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
