import { Message } from '../Message';
import { Block } from '../Block';
export default class AuthManagerBlock extends Block {
    private static instance;
    userCredsKey: string;
    userName: null;
    phoneNumber: null;
    countryCode: null;
    private constructor();
    static getInstance(): AuthManagerBlock;
    receive(from: string, message: Message): Promise<void>;
    saveUserData(countryCode: any, userName: any, password: any, isRememberMe: any): Promise<void>;
    clearUserData(): Promise<void>;
}
