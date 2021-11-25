import { Message } from '../Message';
export default class RestAPIResponceMessage extends Message {
    static id: string;
    responce: Response;
    data: any;
    constructor(responce: Response);
}
