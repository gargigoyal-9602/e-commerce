import { IBlock } from './IBlock';
import { Message } from './Message';
export declare class Block implements IBlock {
    send: (message: Message) => void;
    blockId: string;
    constructor();
    receive(from: string, message: Message): void;
}
