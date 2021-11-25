import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
    history: any;
}
interface S {
    paymentType: string;
    cardtData: any;
    wholeCartData: any;
    addressData: any;
    razorpay_order_id: any;
    isOpen: any;
}
interface SS {
    id: any;
}
export default class OrderSummaryController extends BlockComponent<Props, S, SS> {
    saveAddressId: any;
    checkZipcodeId: any;
    checkAvailabilityId: any;
    releaseBlockId: any;
    placeOrderId: any;
    createOrderId: any;
    verifyRazorPayId: any;
    getUserProfileApiCallId: any;
    releaseBlockQuantityApiCallId: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    componentWillUnmount(): Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    apiCall: (data: any) => Promise<string>;
    getCartHasProduct: () => Promise<void>;
    getUserProfile: () => Promise<void>;
    getUserProfileSuccessCallBack: (res: any) => Promise<void>;
    onSetAddress: (isFromShipping: boolean, addressData: any) => void;
    onAddAddress: (isFromShipping: boolean) => void;
    saveAddress: () => Promise<void>;
    releaseBlockQuantity: () => Promise<void>;
    releaseBlockQuantitySuccessCallBack: (res: any) => void;
    releaseBlockQuantityFailureCallBack: (error: any) => void;
    checkZipcodeAvailability: () => Promise<void>;
    checkProductAvailability: () => Promise<void>;
    toggleIsOpen: () => void;
    onConfirmingOrder: () => void;
    placeOrder: () => Promise<void>;
    getRazorpayOrderId: () => Promise<void>;
    razorpayAddonMethod: (razorpay_order_id: any) => Promise<void>;
    verifyAddonRazorPay: (razorPay_data: any) => Promise<void>;
    placeConfirmOrder: () => Promise<void>;
    onVerifyAddonRazorpaySuccess: (res: any) => void;
    onHandleBack: () => void;
}
export {};
