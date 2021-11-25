import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    cart: any;
    wholeCart: any;
    cartId: any;
    catalogue_id: any;
    couponSuccess: any;
    isRealeasedShippingCharge: boolean;
    loading: boolean;
    buyNow: any;
    buyNowQuantity: any;
    alreadyInWishlist: boolean;
}
interface SS {
    id: any;
}
export default class DashboardController extends BlockComponent<Props, S, SS> {
    auth: string | null | undefined;
    GetCartApiCallId: string;
    releaseShippingAddressChargeCallId: string;
    putUpdateCartQuantityApiCallId: string;
    delCartItemApiCallId: string;
    postWishlistApiCallId: string;
    postApplyCouponApiCallId: string;
    delCouponApiCallId: string;
    postBuyNowApiCallId: string;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    releaseShippingCharge: () => void;
    getCart: () => boolean;
    putUpdateCartQuantity: (product_id: any, product_variant: any, quantity: any) => boolean;
    deleteCartItem: (product_id: any, product_variant: any) => boolean;
    postWishlist: (catalogue_id: any) => boolean;
    postApplyCoupon: (code: any, amount: any) => boolean;
    deleteCoupon: () => boolean;
    postBuyNow: (catalogue_id: any, catalogue_variant_id: any) => boolean;
    toSetdefaultVariant: (index: any, catalogue_id: any) => void;
    moveToWishlist: (catalogue_id: any, variant_id: any) => void;
    toApplyCoupon: (code: any, amount: any) => void;
}
export {};
