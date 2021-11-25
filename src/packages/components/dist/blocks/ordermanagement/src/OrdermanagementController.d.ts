import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    myOrderList: any;
    productItems: any;
    noProductFound: boolean;
    showCancelOrderModal: boolean;
    showSubmitReviewModal: boolean;
    ratingList: any;
    reviewText: string;
    isInvalidReview: boolean;
    selectedOrderData: any;
    cancelData: any;
    isCancelLoadig: boolean;
    pageCount: number;
    limit: number;
    pageLoader: boolean;
    onEndReachedCalledDuringMomentum: boolean;
    lastLoadCount: 0;
    notFinalLoad: boolean;
    isFetching: boolean;
    showAlertModal: boolean;
    isShowError: boolean;
    message: any;
    cartData: any;
    isCancleLoading: boolean;
    cartHasProduct: boolean;
}
interface SS {
    id: any;
}
export default class OrdermanagementController extends BlockComponent<Props, S, SS> {
    getMyOrdersListAPICallID: any;
    submitOrderReviewAPICallID: any;
    createCartAPICallID: any;
    cartHasProductAPICallID: any;
    cancelOrderAPICallID: any;
    _unsubscribe: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    handleBackButtonClick: () => boolean;
    componentWillUnmount(): Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    apiCall: (data: any) => Promise<string>;
    getMyOrderListData: () => Promise<void>;
    myOrderListSuccessCallBack: (res: any) => Promise<void>;
    myOrderListFailureCallBack: (error: any) => void;
    createCartSuccessCallBack: () => void;
    createCartFailureCallBack: (error: any) => void;
    cartHasProductSuccessCallBack: (res: any) => void;
    cartHasProductFailureCallBack: () => void;
    submitOrderReview: () => Promise<void>;
    submitOrderReviewSuccessCallBack: () => void;
    submitOrderReviewFailureCallBack: (error: any) => void;
    onPressStar: (item: any) => void;
    resetStar: () => void;
    cancelOrder: () => Promise<void>;
    cancelOrderSuccessCallBack: () => void;
    cancelOrderFailureCallBack: (error: any) => void;
    onEndReached: () => Promise<void>;
    _onMomentumScrollBegin: () => void;
    getVarientString: (properties: any) => string;
    getSlotString: (slot: any) => "Morning" | "Evening";
    refreshCart: () => Promise<void>;
}
export {};
