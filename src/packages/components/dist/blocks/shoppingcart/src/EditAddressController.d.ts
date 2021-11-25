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
    token: any;
    isShowError: boolean;
    showAlertModal: boolean;
    message: any;
    isFetching: boolean;
}
interface SS {
    id: any;
}
export default class EditAddressController extends BlockComponent<Props, S, SS> {
    addAddressApiCallId: any;
    editAddressApiCallId: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    componentWillUnmount(): Promise<void>;
    getToken: () => Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    clearFocus: () => void;
    validateInput: () => void;
    saveAddress: () => boolean;
    editAddress: (id: any) => boolean;
    clearInputErrors: () => void;
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
}
export {};
