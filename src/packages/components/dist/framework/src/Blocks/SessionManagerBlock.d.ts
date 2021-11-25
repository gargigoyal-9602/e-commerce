import { Message } from "../../../framework/src/Message";
import { Block } from '../../../framework/src/Block';
export default class SessionManagerBlock extends Block {
    private static instance;
    sessionToken: any;
    sessionData: any;
    private constructor();
    static getInstance(): SessionManagerBlock;
    receive(from: string, message: Message): Promise<void>;
    saveSessionData(sessionToken: any, sessionData: any): void;
    getToken(): any;
    getData(): any;
    getError(): any;
    isSessionValid(): boolean;
}
