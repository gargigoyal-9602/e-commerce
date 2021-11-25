import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
    history: any;
    confirm: any;
    toggle: any;
    headerMessage: string;
    bodyMessage: string;
}
interface S {
    modal: boolean;
    deleteorder: boolean;
}
interface SS {
    id: any;
}
export default class ModalController extends BlockComponent<Props, S, SS> {
    apiEmailLoginCallId: string;
    validationApiCallId: string;
    emailReg: RegExp;
    labelTitle: string;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    routeToshop: () => void;
    toggle(): void;
    ConfirmDelete: () => void;
}
export {};
