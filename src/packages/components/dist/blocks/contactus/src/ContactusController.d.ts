import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    userData: any;
    isFetching: boolean;
    isShowError: boolean;
    message: any;
    showAlertModal: boolean;
    showPickerModal: boolean;
    profileImage: any;
    profileImageData: any;
    token: string;
    wishList: number;
    cartHasProduct: boolean;
    isNotificationOn: boolean;
    showGuestModal: boolean;
    showLogoutModal: boolean;
    textInputData: any;
    textInputFocusData: any;
    textInputErrorData: any;
    descriptionText: any;
    showMissmatchError: boolean;
    showPasswordChangedSuccessfully: boolean;
    isInvalidDescription: boolean;
}
interface SS {
    id: any;
}
export default class ContactusController extends BlockComponent<Props, S, SS> {
    saveContactUsApiCallId: any;
    getUserProfileApiCallId: any;
    _unsubscribe: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    componentWillUnmount(): Promise<void>;
    handleBackButtonClick: () => boolean;
    receive(from: string, message: Message): Promise<void>;
    apiCall: (data: any) => Promise<string>;
    getUserProfile: () => Promise<void>;
    getUserProfileSuccessCallBack: (res: any) => Promise<void>;
    getUserProfileFailureCallBack: (error: any) => void;
    onChangeTextInput: (input: any, text: any) => void;
    validateInput: () => boolean;
    textInputNameProps: {
        onChangeText: (text: string) => void;
    };
    textInputEmailProps: {
        onChangeText: (text: string) => void;
    };
    textInputPhoneNoProps: {
        onChangeText: (text: string) => void;
    };
    clearInputErrors: () => void;
    saveContactUs: () => Promise<void>;
    saveContactUsSuccessCallBack: () => Promise<void>;
    saveContactUsFailureCallBack: (error: any) => void;
}
export {};
