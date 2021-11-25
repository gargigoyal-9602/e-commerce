import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    isFetching: boolean;
    showAlertModal: boolean;
    isShowError: boolean;
    message: any;
    cartData: any;
    reviewList: any;
    ratingList: any;
    cartHasProduct: boolean;
}
interface SS {
    id: any;
}
export default class ReviewListController extends BlockComponent<Props, S, SS> {
    getReviewListAPICallID: any;
    _unsubscribe: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    handleBackButtonClick: () => boolean;
    componentWillUnmount(): Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    apiCall: (data: any) => Promise<string>;
    getReviewListData: () => Promise<void>;
    getReviewListSuccessCallBack: (res: any) => void;
    getReviewListFailureCallBack: (error: any) => void;
}
export {};
