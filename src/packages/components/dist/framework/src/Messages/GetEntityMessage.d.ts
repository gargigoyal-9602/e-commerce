import { Message } from '../Message';
export default class GetEntityMessage extends Message {
    static id: string;
    endpoint: string;
    headers: string;
    constructor(endpoint: string, headers: string);
}
