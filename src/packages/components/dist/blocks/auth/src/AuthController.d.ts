import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    button2: boolean;
    button1: boolean;
    currentindex: number;
    fromCart: boolean;
}
interface SS {
    id: any;
}
export default class AuthController extends BlockComponent<Props, S, SS> {
    _unsubscribe: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    componentWillUnmount(): Promise<void>;
    handleBackButtonClick: () => boolean;
    receive(from: string, message: Message): Promise<void>;
    stateChange: (num: number) => void;
}
export {};
