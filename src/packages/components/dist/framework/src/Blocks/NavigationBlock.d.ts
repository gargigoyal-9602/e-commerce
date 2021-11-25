import { BlockComponent } from '../../../framework/src/BlockComponent';
import { Message } from "../../../framework/src/Message";
interface Props {
}
interface S {
}
interface SS {
}
declare class NavigationBlock extends BlockComponent<Props, S, SS> {
    constructor(props?: Props);
    receive(from: string, message: Message): Promise<void>;
}
export default NavigationBlock;
