import { Message } from "../../../../framework/src/Message";
import { BlockComponent } from "../../../../framework/src/BlockComponent";
export interface Props {
    title: string;
    message: string;
}
interface S {
}
interface SS {
    id: any;
}
export default class SuccessBlockController extends BlockComponent<Props, S, SS> {
    contactUsApiCallId: any;
    deleteContactApiCallId: any;
    addContactApiCallId: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    getToken: () => void;
    receive(from: string, message: Message): Promise<void>;
}
export {};
