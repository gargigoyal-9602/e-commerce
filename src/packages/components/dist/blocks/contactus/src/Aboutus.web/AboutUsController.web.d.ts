import { Message } from "../../../../framework/src/Message";
import { BlockComponent } from "../../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
    history: any;
    match: any;
}
interface S {
    content: any;
    loading: boolean;
}
interface SS {
    id: any;
}
export default class AboutUsController extends BlockComponent<Props, S, SS> {
    getHelpCenterCallID: string;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    getHelpceterData(): void;
}
export {};
