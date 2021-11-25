import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export declare var orderID: string;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    token: string;
    Order_Id: string;
    name: string;
    currency: string;
    razorPayModal: boolean;
    hyperpayModal: boolean;
    gatewaytype: string;
    orders: any;
    dropdownStatus: boolean;
    profileData: any;
    cartData: any;
}
interface SS {
    id: any;
}
export default class PaymentsController extends BlockComponent<Props, S, SS> {
    getOrdersAPICallId: any;
    getIdApiCallId: any;
    getsavePurchaseCallId: any;
    getUserProfileApiCallId: any;
    cartHasProductAPICallID: any;
    createOrderId: any;
    verifyRazorPayId: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    getToken: () => Promise<void>;
    setOrderId: (item: any) => void;
    receive(from: string, message: Message): Promise<void>;
    apiCall: (data: any) => Promise<string>;
    refreshCart: () => Promise<void>;
    getUserProfile: () => Promise<void>;
    getUserProfileSuccessCallBack: (res: any) => Promise<void>;
    openRazorPay: (razorPay_Id: string, amount: string) => void;
    getRazorpayOrderId: () => Promise<void>;
    razorpayAddonMethod: (razorpay_order_id: any) => void;
    verifyAddonRazorPay: (razorPay_data: any) => Promise<void>;
    onVerifyAddonRazorpaySuccess: (res: any) => void;
    showHyperPayModal: () => void;
    showModal: () => void;
    closeModal: () => void;
    hyperPay: () => void;
    checkout: () => boolean;
    savePurchase: (razorpay_order_id: string, razorpay_payment_id: string, razorpay_signature: string) => boolean;
    getOrdersDataRequest: (token: string) => void;
}
export {};
