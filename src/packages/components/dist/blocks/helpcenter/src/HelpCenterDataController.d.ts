import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    faqData: any;
}
interface SS {
    id: any;
}
export default class HelpCenterDataController extends BlockComponent<Props, S, SS> {
    getFaqApiCallId: any;
    getUserProfileApiCallId: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    expand: (id: string) => void;
    getFaqData: () => void;
}
export {};
