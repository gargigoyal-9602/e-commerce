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
    textInputFocusData: any;
    textInputData: any;
    textInputErrorData: any;
    shippingtextInputData: any;
    shippingtextInputFocusData: any;
    shippingtextInputErrorData: any;
    billingAndAddressSame: boolean;
    saveAddress: boolean;
    shippingsaveAddress: boolean;
    token: any;
    isFetching: boolean;
    addressList: any;
    customErrorModal: boolean;
    isShowError: boolean;
    customErrorMessage: string;
}
interface SS {
    id: any;
}
export default class CheckoutController extends BlockComponent<Props, S, SS> {
    scrollViewRef: any;
    getAddressDataId: any;
    saveBillingAddressId: any;
    saveShippingAddressId: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    handleBackButtonClick: () => boolean;
    componentWillUnmount(): Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    apiCall: (data: any) => Promise<string>;
    enableMyBillingAddressSame: () => void;
    textInputNameProps: {
        onChangeText: (text: string) => void;
    };
    textInputFlatProps: {
        onChangeText: (text: string) => void;
    };
    textInputAddressLine1Props: {
        onChangeText: (text: string) => void;
    };
    textInputAddressLine2Props: {
        onChangeText: (text: string) => void;
    };
    textInputCityProps: {
        onChangeText: (text: string) => void;
    };
    textInputStateProps: {
        onChangeText: (text: string) => void;
    };
    textInputCountryProps: {
        onChangeText: (text: string) => void;
    };
    textInputPinCodeProps: {
        onChangeText: (text: string) => void;
    };
    textInputPhoneNoProps: {
        onChangeText: (text: string) => void;
    };
    shippingtextInputNameProps: {
        onChangeText: (text: string) => void;
    };
    shippingtextInputFlatProps: {
        onChangeText: (text: string) => void;
    };
    shippingtextInputAddressLine1Props: {
        onChangeText: (text: string) => void;
    };
    shippingtextInputAddressLine2Props: {
        onChangeText: (text: string) => void;
    };
    shippingtextInputCityProps: {
        onChangeText: (text: string) => void;
    };
    shippingtextInputStateProps: {
        onChangeText: (text: string) => void;
    };
    shippingtextInputCountryProps: {
        onChangeText: (text: string) => void;
    };
    shippingtextInputPinCodeProps: {
        onChangeText: (text: string) => void;
    };
    shippingtextInputPhoneNoProps: {
        onChangeText: (text: string) => void;
    };
    onSetAddress: (address: any, type: string) => void;
    validateInput: () => void;
    getAddressData: () => Promise<void>;
    onAddressSave: () => void;
    createAddress: () => {
        billing_same_as_shipping: boolean;
        address: any;
    };
    saveAddress: () => Promise<void>;
}
export {};
