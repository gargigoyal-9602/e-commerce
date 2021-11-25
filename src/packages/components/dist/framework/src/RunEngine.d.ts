import { Channel } from './Channel';
import { IBlock } from './IBlock';
import { Message } from './Message';
declare class RunEngine {
    channels: Map<string, Channel>;
    debugLog: (tag: any, data?: any) => void;
    constructor();
    addChannel(topic: string): void;
    unSubscribeFromMessages(block: IBlock, subscribedMessages: string[]): void;
    attachBuildingBlock(block: IBlock, subscribedMessages: string[]): void;
    sendMessage(from: string, message: Message): void;
}
declare const runEngine: RunEngine;
export { runEngine };
