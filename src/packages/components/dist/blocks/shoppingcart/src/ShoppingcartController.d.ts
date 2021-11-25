import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    showCouponCodeModal: boolean;
    showGuestModal: boolean;
    token: string;
    codeValue: string;
    cart_Value: string;
    isShowError: boolean;
    showAlertModal: boolean;
    message: any;
    isFetching: boolean;
    cartList: any;
    cartData: any;
    quantity: string;
    catalogue_variant_id: string;
    catalogue_id: string;
    cart_id: any;
    emptyCart: boolean;
    isCouponApplied: boolean;
    isValidCoupon: boolean;
    isGuestUser: boolean;
    couponCodeErrorMsg: any;
    selectedCatalogueId: any;
    selectedVariantId: any;
}
interface SS {
    id: any;
}
export default class ShoppingcartController extends BlockComponent<Props, S, SS> {
    apiApplyCouponCallId: any;
    getCartListApiCallId: any;
    updateQtyApiCallId: any;
    emptyCartApiCallId: any;
    removeCartItemApiCallId: any;
    removeCouponApiCallId: any;
    getCartProductId: any;
    addToWishlistApiCallId: any;
    _unsubscribe: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    handleBackButtonClick: () => boolean;
    componentWillUnmount(): Promise<void>;
    getProfileData: () => Promise<void>;
    getToken: () => Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    codeTextInputProps: {
        onChangeText: (text: string) => void;
        secureTextEntry: boolean;
    };
    applyCoupon: () => Promise<void>;
    removeCoupon: () => Promise<void>;
    getCartList: (token: any) => Promise<void>;
    onUpdateCartValue: (qty: number, catalogue_id: any, catalogue_variant_id: any) => void;
    removeCartItem: (catalogue_id: number, catalogue_variant_id: number) => Promise<void>;
    emptyCart: () => Promise<void>;
    updateQty: () => Promise<void>;
    apiCall: (data: any) => Promise<string>;
    getCartHasProduct: () => Promise<void>;
    onPressProduct: (item: any) => void;
    handleGuest: () => void;
    getVarientString: (properties: any) => string;
    addToWishlist: (id: any, variantID: any) => Promise<void>;
}
export {};
