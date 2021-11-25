import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
interface Props {
    navigation: any;
    id: string;
}
interface S {
    message: string;
    title: string;
    buttonText: string;
    buttonMessage: Message;
}
interface SS {
    id: any;
}
export default class InfoPageBlock extends BlockComponent<Props, S, SS> {
    constructor(props: Props);
    render(): JSX.Element;
    receive(from: String, message: Message): Promise<void>;
}
export {};
