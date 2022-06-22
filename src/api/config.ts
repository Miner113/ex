import { STORAGE_DEFAULT_LIMIT } from '../constants';
import { Config } from './types';

export const defaultConfig: Config = {
    api: {
      authUrl: 'http://app.grms.pw/api/v2/barong',
      tradeUrl: 'http://app.grms.pw/api/v2/peatio',
      applogicUrl: 'http://app.grms.pw/api/v2/applogic',
      rangerUrl: 'ws://app.grms.pw/api/v2/ranger',
    },
    minutesUntilAutoLogout: '5',
    rangerReconnectPeriod: '1',
    withCredentials: true,
    captcha: {
        captchaType: 'none',
        siteKey: '',
    },
    storage: {},
    msAlertDisplayTime: '5000',
};

export const Cryptobase = {
    config: defaultConfig,
};

declare global {
    interface Window {
        env: Config;
    }
}

window.env = window.env || defaultConfig;
Cryptobase.config = { ...window.env };
Cryptobase.config.storage = Cryptobase.config.storage || {};
Cryptobase.config.captcha = Cryptobase.config.captcha || defaultConfig.captcha;

export const authUrl = () => Cryptobase.config.api.authUrl;
export const tradeUrl = () => Cryptobase.config.api.tradeUrl;
export const applogicUrl = () => Cryptobase.config.api.applogicUrl;
export const rangerUrl = () => Cryptobase.config.api.rangerUrl;
export const minutesUntilAutoLogout = (): string => Cryptobase.config.minutesUntilAutoLogout || '5';
export const withCredentials = () => Cryptobase.config.withCredentials;
export const defaultStorageLimit = () => Cryptobase.config.storage.defaultStorageLimit || STORAGE_DEFAULT_LIMIT;
export const siteKey = () => Cryptobase.config.captcha.siteKey;
export const captchaType = () => Cryptobase.config.captcha.captchaType;
export const msAlertDisplayTime = (): string => Cryptobase.config.msAlertDisplayTime || '5000';
export const rangerReconnectPeriod = (): number => Cryptobase.config.rangerReconnectPeriod ? Number(Cryptobase.config.rangerReconnectPeriod) : 1;
