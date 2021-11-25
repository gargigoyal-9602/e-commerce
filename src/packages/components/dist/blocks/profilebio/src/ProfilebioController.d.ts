import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    enableField: boolean;
    txtInputValue: string;
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
    isSocialLoginUser: boolean;
}
interface SS {
    id: any;
}
export default class ProfilebioController extends BlockComponent<Props, S, SS> {
    getUserProfileApiCallId: any;
    getWishlistApiCallId: any;
    updateProfileApiCallId: any;
    updateProfileNotificationApiCallId: any;
    cartHasProductAPICallID: any;
    _unsubscribe: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    handleBackButtonClick: () => boolean;
    getProfileData: () => Promise<void>;
    componentWillUnmount(): Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    apiCall: (data: any) => Promise<string>;
    onPressCameraUploadImage: () => void;
    onPressCamera: () => void;
    onPressPickImage: () => void;
    refreshCart: () => Promise<void>;
    getUserProfile: () => Promise<void>;
    getUserProfileSuccessCallBack: (res: any) => Promise<void>;
    getUserProfileFailureCallBack: (error: any) => void;
    cartHasProductSuccessCallBack: (res: any) => void;
    cartHasProductFailureCallBack: (error: any) => void;
    updateProfileData: () => Promise<void>;
    updateProfileDataSuccessCallBack: (res: any) => Promise<void>;
    updateProfileDataFailureCallBack: (error: any) => void;
    getWishList: () => Promise<void>;
    txtInputWebProps: {
        onChangeText: (text: string) => void;
        secureTextEntry: boolean;
    };
    txtInputMobileProps: {
        autoCompleteType: string;
        keyboardType: string;
        onChangeText: (text: string) => void;
        secureTextEntry: boolean;
    };
    txtInputProps: {
        onChangeText: (text: string) => void;
        secureTextEntry: boolean;
    };
    btnShowHideProps: {
        onPress: () => void;
    };
    btnShowHideImageProps: {
        source: any;
    };
    btnExampleProps: {
        onPress: () => void;
    };
    doButtonPressed(): void;
    onPressLoginButton: () => Promise<void>;
    onPressLogout: () => Promise<void>;
    toggleSwitch: () => void;
    updateProfileNotification: () => Promise<void>;
    updateProfileNotificationDataSuccessCallBack: (res: any) => Promise<void>;
    updateProfileNotificationDataFailureCallBack: (error: any) => void;
}
export {};
