export declare class Message {
    id: string;
    properties: any;
    messageId: string;
    constructor(id: string);
    addData(key: any, value: any): void;
    getData(key: any): any;
    initializeFromObject: (from: any) => void;
    copyAllPropertiesOf(from: Message): void;
}
