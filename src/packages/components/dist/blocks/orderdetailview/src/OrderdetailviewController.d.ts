import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    myOrderList: any;
    shippingAddressData: any;
    showCancelOrderModal: boolean;
    ratingList: any;
    showSubmitReviewModal: boolean;
    trackingDetails: any;
    orderDetails: any;
    productDetails: any;
    reviewText: any;
    isInvalidReview: boolean;
    isFetching: boolean;
    subscriptionOrders: [];
    showAlertModal: boolean;
    isShowError: boolean;
    cartHasProduct: boolean;
    message: any;
    cartData: any;
}
interface SS {
    id: any;
}
export default class OrderdetailviewController extends BlockComponent<Props, S, SS> {
    getLogisiticTrackIdDetailsCallID: any;
    getTrackIdDetailsCallID: any;
    createCartAPICallID: any;
    submitOrderReviewCallID: any;
    cartHasProductAPICallID: any;
    cancelOrderAPICallID: any;
    getSubscrptionOrdersAPICallID: any;
    extendDeliveryAPICallID: any;
    _unsubscribe: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    handleBackButtonClick: () => boolean;
    componentWillUnmount(): Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    apiCall: (data: any) => Promise<string>;
    getTrackIdDetails: () => Promise<void>;
    getTrackIdDetailsSuccessCallBack: (res: any) => void;
    getTrackIdDetailsFailureCallBack: (error: any) => void;
    cartHasProductSuccessCallBack: (res: any) => void;
    cartHasProductFailureCallBack: () => void;
    createCartSuccessCallBack: () => void;
    createCartFailureCallBack: (error: any) => void;
    getLogisticTrackIdDetails: () => Promise<void>;
    getLogisticTrackIdDetailsSuccessCallBack: (res: any) => void;
    getLogisticTrackIdDetailsFailureCallBack: (error: any) => void;
    getSubscrptionOrders: () => Promise<void>;
    getSubscrptionOrdersSuccess: (res: any) => void;
    getSubscrptionOrdersFailure: (error: any) => void;
    submitOrderReview: () => Promise<void>;
    submitOrderReviewSuccessCallBack: () => void;
    submitOrderReviewFailureCallBack: (error: any) => void;
    cancelOrder: () => Promise<void>;
    cancelOrderSuccessCallBack: () => void;
    cancelOrderFailureCallBack: (error: any) => void;
    onPressStar: (item: any) => void;
    resetStar: () => void;
    getVarientString: (properties: any) => string;
    getSlotString: (slot: any) => "Morning" | "Evening";
    onPressCancelDelivery: (subscriptionOrderId: any) => void;
    onCancelDelivery: (subscriptionOrderId: any) => Promise<void>;
    cancelOrderSuccess: () => void;
    cancelOrderFailure: (error: any) => void;
    refreshCart: () => Promise<void>;
}
export {};
