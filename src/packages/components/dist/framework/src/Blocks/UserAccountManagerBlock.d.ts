import { Message } from '../Message';
import { Block } from '../Block';
export default class UserAccountManagerBlock extends Block {
    private static instance;
    userCredsKey: string;
    userName: null;
    password: null;
    phoneNumber: null;
    countryCode: null;
    private constructor();
    static getInstance(): UserAccountManagerBlock;
    loadCreds(): Promise<void>;
    receive(from: string, message: Message): void;
    saveUserData(countryCode: any, userName: any, password: any, isRememberMe: any): Promise<void>;
    clearUserData(): Promise<void>;
}
