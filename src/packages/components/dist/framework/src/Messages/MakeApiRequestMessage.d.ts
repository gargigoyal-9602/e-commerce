import { Message } from '../Message';
export default class MakeApiRequestMessage extends Message {
    static id: string;
    headers: string;
    constructor(endpoint: string, headers: string);
}
