import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare var navigationParamsToken: string;
export declare var navigationParamsURL: string;
export declare var orderConfirmStatus: string;
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    cardNumber: string;
    cardHolder: string;
    expiry: string;
    cvv: string;
    cardNumber2: String;
    token: string;
    errorMsg: string;
    loadingChekout: boolean;
    checkout_detail: any;
    isSubmit: boolean;
    isInvalidCardNo: boolean;
    isInvalidCardHolder: boolean;
    isInvalidCVV: boolean;
    isInvalidExpiry: boolean;
    count: any;
    dataid: string;
    redirectURL: any;
    showConfirmOrder: boolean;
    statuscallcnt: boolean;
    PaymentGateWay: string;
    orderNumber: string;
}
interface SS {
    id: any;
}
export default class HyperpayController extends BlockComponent<Props, S, SS> {
    chekoutApiCallId: any;
    apiHyperpayStatusCallId: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    getToken: () => void;
    receive(from: string, message: Message): Promise<void>;
    getCheckoutId(orderid: string): boolean;
    getCardType: (number: any) => string | undefined;
    hyperPayNativeCall(): void;
    getPaymentStatus: () => boolean;
    hyperPayTranscation(paymentParams: any): Promise<void>;
    handleTrasaction: () => Promise<void>;
}
export {};
