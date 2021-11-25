import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    addressData: any;
    cartDetails: any;
}
interface S {
    checkingZipCode: string;
    stripe: any;
    elements: any;
    loading: boolean;
    paymentMethodData?: any;
}
interface SS {
    id: any;
}
export default class StripeWebController extends BlockComponent<Props, S, SS> {
    checkZipcodeId: any;
    checkAvailabilityId: any;
    releaseBlockId: any;
    placeOrderId: any;
    createOrderId: any;
    getUserProfileApiCallId: any;
    releaseBlockQuantityApiCallId: any;
    createStripeAPICallId: string;
    confrimStripeAPICallId: string;
    constructor(props: Props);
    componentWillUnmount(): Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    apiCall: (data: any) => Promise<string>;
    getCartHasProduct: () => Promise<void>;
    getUserProfile: () => Promise<void>;
    getUserProfileSuccessCallBack: (res: any) => Promise<void>;
    releaseBlockQuantity: () => Promise<void>;
    releaseBlockQuantitySuccessCallBack: (res: any) => void;
    releaseBlockQuantityFailureCallBack: (error: any) => void;
    checkZipcodeAvailability: () => Promise<void>;
    checkProductAvailability: () => Promise<void>;
    onConfirmingOrder: () => void;
    placeOrder: () => Promise<void>;
    placeConfirmOrder: () => Promise<void>;
    createStripePaymentSuccess: (res: any, token: any, stripe: any) => Promise<void>;
    confirmPaymentSuccess: (data: any) => void;
    handleSubmit: (event: any, stripe: any, elements: any) => Promise<void>;
    handleCreateSTrip: (data: any, headers: any) => void;
    handleConfrimStripe: (data: any, headers: any) => void;
}
export {};
