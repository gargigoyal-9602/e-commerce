import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    helpCenterList: any;
}
interface SS {
    id: any;
}
export default class HelpCenterController extends BlockComponent<Props, S, SS> {
    getHelpCenterApiCallId: any;
    _unsubscribe: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    componentWillUnmount(): Promise<void>;
    handleBackButtonClick: () => boolean;
    receive(from: string, message: Message): Promise<void>;
    getHelpCenterList: () => void;
}
export {};
