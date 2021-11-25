import { IBlock } from './IBlock';
import { Message } from './Message';
export declare const _ = "";
export declare class Channel {
    subscribers: IBlock[];
    topic: string;
    constructor(topic: string);
    pub(from: string, message: Message): void;
    sub(subscriber: IBlock): void;
    unsub(subscriber: IBlock): void;
}
