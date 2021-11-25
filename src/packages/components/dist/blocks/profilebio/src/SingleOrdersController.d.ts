import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
    wishlist: any;
    order: any;
    history: any;
    getOrders: any;
}
interface S {
    ShowCOModal: boolean;
    ShowPRModal: boolean;
    currentOrder: any;
    activeTab: string;
    orders: any;
    cancelOrder: any;
    reviewProduct: any;
}
interface SS {
    id: any;
}
export default class SingleOrdersController extends BlockComponent<Props, S, SS> {
    getOrdersCallId: string;
    cancelOrderCallId: string;
    writeReviewCallID: string;
    validationApiCallId: string;
    emailReg: RegExp;
    labelTitle: string;
    getAllNotificationsAPICallId: string;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    sendLoginFailMessage(): void;
    getOrders(): void;
    routeToProfile(value: string): void;
    openProductRatingModal(): void;
    setProductAndOpenPM(product: any): void;
    openCancelOrderModal(order: any, item: any): void;
    confirmCancelOrder(): void;
    toggleCancelModal: () => void;
    routeToOrderDetails(order: any, item: any): void;
    writeReview(data: any): void;
    getAllNotificationsList: () => void;
}
export {};
