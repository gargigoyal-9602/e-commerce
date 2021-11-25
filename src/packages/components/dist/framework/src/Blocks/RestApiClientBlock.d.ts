import { Message } from '../../../framework/src/Message';
import { Block } from '../../../framework/src/Block';
export default class RestApiClientBlock<Entity> extends Block {
    private props;
    private static instance;
    private constructor();
    static getInstance(): RestApiClientBlock<any>;
    receive(from: string, message: Message): Promise<void>;
    makeApiCall(uniqueApiCallId: string, method: string, endpoint: string, headers: any, body: string): Promise<void>;
}
