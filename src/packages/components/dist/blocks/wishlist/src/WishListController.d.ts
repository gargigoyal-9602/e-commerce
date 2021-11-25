import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    token: string;
    productList: any;
    noProductFound: boolean;
    customErrorModal: boolean;
    customErrorMessage: String;
    isFetching: boolean;
    cartProduct: any;
    cartLength: number;
    isShowError: boolean;
}
interface SS {
    id: any;
}
export default class WishListController extends BlockComponent<Props, S, SS> {
    _unsubscribe: any;
    getWishlistApiCallId: any;
    removeFromWishlistApiCallId: any;
    addToCartApiCallId: any;
    getCartProductId: any;
    getCartListId: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    handleBackButtonClick: () => boolean;
    componentWillUnmount(): Promise<void>;
    getToken: () => Promise<void>;
    apiCall: (data: any) => Promise<string>;
    receive(from: string, message: Message): Promise<void>;
    onHeartPress: (id: any) => void;
    getListRequest: () => Promise<void>;
    addToCart: (item: any) => Promise<void>;
    getCartHasProduct: () => Promise<void>;
    getCartList: () => Promise<void>;
    unsubscribeMessages: () => void;
}
export {};
