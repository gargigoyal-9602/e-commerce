import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    arrayHolder: any;
    token: string;
    productData: any;
    selectedProduct: any;
    currentSelection: any;
    selectedImage: any;
    similarProducts: any;
    showNotifiyModal: boolean;
    showNotifyButton: boolean;
    catalogue_variant_id: string;
    catalogue_id: string;
    quantity: any;
    productQuantity: any;
    cart_id: string;
    isShowError: boolean;
    showAlertModal: boolean;
    message: any;
    isFetching: boolean;
    selectedAttributes: any;
    cartProduct: any;
    availableAttributes: any;
    customErrorModal: boolean;
    ratingList: any;
    isGuestUser: boolean;
    updateCart: boolean;
    isProductAvailable: boolean;
    showGuestModal: boolean;
    appState: any;
}
interface SS {
    id: any;
}
export default class ProductDescriptionController extends BlockComponent<Props, S, SS> {
    getProductDescriptionApiCallId: any;
    getBuyProductApiCallId: any;
    getNotifyProductApiCallId: any;
    updateQtyApiCallId: any;
    addToCartApiCallId: any;
    addToWishlistApiCallId: any;
    removeFromWishlistApiCallId: any;
    getCartProductId: any;
    getCartProductDescriptionId: any;
    _unsubscribe: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    _handleAppStateChange: (nextAppState: any) => void;
    handleBackButtonClick: () => boolean;
    componentWillUnmount(): Promise<void>;
    setDefaultVarient: () => void;
    getToken: () => Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    getProductDescriptionRequest: (token: any) => Promise<void>;
    onPressTool: (item: any, attribute: any) => void;
    onPressBuyNow: () => Promise<void>;
    notifyProduct: () => Promise<void>;
    updateQty: () => Promise<void>;
    viewAll(): void;
    similarProducts: (item: any) => void;
    onUpdateCartValue: (value: boolean) => void;
    apiCall: (data: any) => Promise<string>;
    addToCart: () => Promise<void>;
    addToWishlist: (id: any) => Promise<void>;
    removeFromWishlist: (id: any) => Promise<void>;
    onHeartPress: (item: any, pageName: string) => void;
    getCartHasProduct: () => Promise<void>;
    getCartProduct: (cart_id: any) => Promise<void>;
    getStarImage: (index: number, ratingValue: any) => any;
    onShare: () => Promise<void>;
    setAvailbleAttributesForSelected: () => void;
    checkSelectedInAvailable: () => boolean;
    setSelectedProduct: () => void;
}
export {};
