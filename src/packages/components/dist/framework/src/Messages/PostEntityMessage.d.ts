import { Message } from '../Message';
export default class PostEntityMessage extends Message {
    static id: string;
    endpoint: string;
    headers: string;
    body: string;
    constructor(endpoint: string, headers: string, body: string);
}
