import { Component } from 'react';
import { IBlock } from './IBlock';
import { Message } from './Message';
export declare class BlockComponent<Props, S, SS> extends Component<Props, S, SS> implements IBlock {
    isLoaded: boolean;
    send: (message: Message) => void;
    blockId: string;
    subScribedMessages: string[];
    constructor(props: Props);
    receive(from: string, message: Message): void;
    componentDidMount(): Promise<void>;
    componentWillUnmount(): Promise<void>;
    toggleState(objectID: string): void;
    changeState(objectID: string, value: any): void;
    getState(objectID: string): string | boolean | null;
    processOnClickMessage(messageID: string, value?: any): void;
    showAlert(title: string, error: string, btnPositiveText?: string, btnPositiveMessage?: Message, btnNegativeText?: string, btnNegativeMessage?: Message, btnNeutralText?: string, btnNeutralMessage?: Message): void;
    parseApiErrorResponse(responseJson: any): string | undefined;
    isPlatformWeb(): boolean;
    isPlatformiOS(): boolean;
    isPlatformAndroid(): boolean;
    parseApiCatchErrorResponse(errorReponse: any): string | undefined;
    hideKeyboard(): void;
}
