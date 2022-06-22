export interface Wallet {
    balance: number;
    currency: string;
    name: string;
    type: 'fiat' | 'coin';
    fee: number;
    address?: string;
    locked?: number;
    explorerTransaction: string;
    explorerAddress: string;
    fixed: number;
    iconUrl?: string;
}

export interface WalletAddress {
    address: string;
    currency: string;
}

export interface WalletWithdrawCCY {
    amount: number;
    currency: string;
    otp: string;
    rid: string;
}

export interface WalletWithdrawFiat {
    amount: number;
    currency: string;
    currency_type: string;
    otp: string;
    rid: string;
}
