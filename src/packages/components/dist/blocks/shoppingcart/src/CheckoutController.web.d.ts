import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    history: any;
}
interface S {
    activeTab?: any;
    addingNewAddressCheck?: boolean;
    selectAddressCheck?: boolean;
    addressIndex?: number;
    editAddressChecked?: boolean;
    userAddedAddressDeatails?: any;
    userToken?: any;
    userAddress?: Array<any>;
    deliveryAddressID?: any;
    defaultAddressCheck?: boolean;
    selectedAddress: {
        name: string;
        flat_no: string;
        address: string;
        address_line_2: string;
        city: string;
        state: string;
        country: string;
        zip_code: string;
        phone_number: string;
        id: any;
    };
    deliveryId: any;
    isShippingAddressSame: boolean;
    billingAndAddressSame: boolean;
    cart: any;
    wholeCart: any;
    cartId: any;
    catalogue_id: any;
    couponSuccess: any;
    zipCode: "";
    isCheckedShippingCharge: boolean;
    countryName?: any;
    loading?: boolean;
}
interface SS {
    id: any;
    history: any;
}
export default class CheckoutController extends BlockComponent<Props, S, SS> {
    addNewAddressAPICallId: string;
    getUserDeliveryAddressAPICallId: string;
    updateDeliveryAddressByIdAPICallId: string;
    deleteDeliveryAddressByIdAPICallId: string;
    calculateShippingAddressChargeCallId: string;
    releaseShippingAddressChargeCallId: string;
    backListener: any;
    auth: string | null | undefined;
    GetCartApiCallId: string;
    putUpdateCartQuantityApiCallId: string;
    delCartItemApiCallId: string;
    postWishlistApiCallId: string;
    postApplyCouponApiCallId: string;
    delCouponApiCallId: string;
    postBuyNowApiCallId: string;
    updateDeliveryAddressAPiCallID: string;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    addNewAddressHandler: (values: any) => void;
    getDeliveryAddressList: () => void;
    calculateShippingAddressCharge: () => void;
    releaseShippingCharge: () => void;
    getCart: () => boolean;
    postApplyCoupon: (code: any, amount: any) => boolean;
    postBuyNow: (catalogue_id: any, catalogue_variant_id: any) => boolean;
    deleteCoupon: () => boolean;
    toApplyCoupon: (code: any, amount: any) => void;
    setZipCode: (value: any) => void;
    checkShippingAggressCharge: () => void;
    updateDeliveryAddress: (id: number, pincode: any) => void;
}
export {};
