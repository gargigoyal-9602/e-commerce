import { Message } from '../../../framework/src/Message';
export default class HomeScreenAdapter {
    send: (message: Message) => void;
    constructor();
    convert: (from: Message) => Message;
    receive(from: string, message: Message): void;
}
