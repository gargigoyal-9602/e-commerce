import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    values: any;
    messageSent: boolean;
    sending: boolean;
    userDetails?: any;
    loading: boolean;
}
interface SS {
    id: any;
}
export default class ContactusController extends BlockComponent<Props, S, SS> {
    deleteContactApiCallId: any;
    addContactApiCallId: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    submitContactusForm(values: any): void;
}
export {};
