import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    orders: any;
    isCancelVisible: boolean;
    isRateVisible: boolean;
    cancelDialog: boolean;
    starCount: number;
    comment: string;
    token: string;
    itemDetail: any;
    activeOrderId: number;
    activeItemId: number;
    orderConfirmStatus: any;
    amount: number;
}
interface SS {
    id: any;
}
export default class OrderConfirmController extends BlockComponent<Props, S, SS> {
    getOrdersAPICallId: any;
    getItemDetailAPICallId: any;
    cancelOrderAPICallId: any;
    rateOrderAPICallId: any;
    _unsubscribe: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    componentWillUnmount(): Promise<void>;
    handleBackButtonClick: () => boolean;
    receive(from: string, message: Message): Promise<void>;
    handleGotoOrders: () => void;
}
export {};
