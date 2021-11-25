import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    fromCart: boolean;
}
interface S {
    emailInput: string;
    passwordInput: string;
    emailError: boolean;
    passwordError: boolean;
    email: boolean;
    password: boolean;
    message: any;
    showAlertModal: boolean;
    showLoginSuccess: boolean;
    enablePasswordField: boolean;
    fromCart: boolean;
    isShowError: boolean;
    isFetching: boolean;
    errorMessage: any;
}
interface SS {
}
export default class LoginController extends BlockComponent<Props, S, SS> {
    emailReg: RegExp;
    apiEmailLoginCallId: string;
    apiSocialLoginCallId: string;
    apiGuestLoginCallId: string;
    sendOtpApiCallId: string;
    secondTextInput: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    componentWillUnmount(): Promise<void>;
    setupGoogleConfiguration: () => void;
    receive(from: string, message: Message): Promise<void>;
    apiCall: (data: any) => Promise<string>;
    onCloseAlertModal: () => void;
    onFocus(item: any): void;
    resetErrors: () => void;
    imgEmailIcon: {
        source: any;
    };
    crossIcon: {
        source: any;
    };
    txtInputEmailWebPrpos: {
        onChangeText: (text: string) => void;
    };
    txtInputEmailMobilePrpos: {
        keyboardType: string;
        onChangeText: (text: string) => void;
    };
    txtInputEmailPrpos: {
        onChangeText: (text: string) => void;
    };
    txtInputPasswordProps: {
        onChangeText: (text: string) => void;
        secureTextEntry: boolean;
    };
    imgPasswordIcon: {
        source: any;
    };
    imgEnablePasswordFieldProps: {
        source: any;
    };
    btnPasswordShowHideProps: {
        onPress: () => void;
    };
    onPressLogin: () => Promise<void>;
    onLoginUserSuccessCallBack: (res: any) => Promise<void>;
    onLoginUserFailureCallBack: (error: any) => void;
    onSocialLoginSuccessCallBack: (res: any) => Promise<void>;
    onSocialLoginFailureCallBack: (error: any) => void;
    onGuestLoginSuccessCallBack: (res: any) => Promise<void>;
    onGuestLoginFailureCallBack: (error: any) => void;
    onSendVerificationOTP: () => Promise<void>;
    onSendVerificationOTPSuccessCallBack: (res: any) => Promise<void>;
    onSendVerificationOTPFailureCallBack: (error: any) => void;
    initUser: (token: string) => Promise<void>;
    onPressLoginWithFacebook: () => void;
    onPressGoogleSignIn: () => Promise<void>;
    onPressLoginWithApple: () => Promise<void>;
    sendLoginFailMessage(message: any): void;
    saveLoggedInUserData(responseJson: any, isGuestUser?: any): Promise<void>;
    onSocialLogin: (item: any) => Promise<void>;
    onGuestLogin: () => Promise<void>;
}
export {};
