import { Block } from '../Block';
import { Message } from '../Message';
export default class AdapterBlock extends Block {
    private toMessageId;
    constructor(fromMessageId: string, toMessageId: string);
    send: (message: Message) => void;
    private convert;
    receive(from: string, message: Message): void;
}
