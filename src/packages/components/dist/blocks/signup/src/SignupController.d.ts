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
    fullNameInput: string;
    emailError: boolean;
    nameError: boolean;
    passwordError: boolean;
    email: boolean;
    password: boolean;
    fullName: boolean;
    message: any;
    showAlertModal: boolean;
    showSignupSuccess: boolean;
    enablePasswordField: boolean;
    fromCart: boolean;
    token: string;
    pin: string;
    helpCenterList: any;
    isShowError: boolean;
    isFetching: boolean;
    privacyPolicy: any;
    termsPolicy: any;
}
interface SS {
}
export default class SignupController extends BlockComponent<Props, S, SS> {
    emailReg: RegExp;
    sendOtpApiCallId: string;
    apiSocialLoginCallId: string;
    apiGuestLoginCallId: string;
    getHelpCenterApiCallId: string;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    componentWillUnmount(): Promise<void>;
    setupGoogleConfiguration: () => void;
    receive(from: string, message: Message): Promise<void>;
    apiCall: (data: any) => Promise<string>;
    isStringNullOrBlank(str: string): boolean;
    onFocus(item: any): void;
    resetErrors: () => void;
    txtInputFullNamePrpos: {
        onChangeText: (text: string) => void;
        placeholder: string;
        underlineColorAndroid: string;
        blurOnSubmit: boolean;
    };
    imgFullName: {
        source: any;
    };
    imgEmailIcon: {
        source: any;
    };
    crossIcon: {
        source: any;
    };
    txtInputEmailWebPrpos: {
        onChangeText: (text: string) => void;
        placeholder: string;
        underlineColorAndroid: string;
        blurOnSubmit: boolean;
    };
    txtInputEmailMobilePrpos: {
        keyboardType: string;
        onChangeText: (text: string) => void;
        placeholder: string;
        underlineColorAndroid: string;
        blurOnSubmit: boolean;
    };
    txtInputEmailPrpos: {
        onChangeText: (text: string) => void;
        placeholder: string;
        underlineColorAndroid: string;
        blurOnSubmit: boolean;
    };
    imgPasswordIcon: {
        source: any;
    };
    imgEnablePasswordFieldProps: {
        source: any;
    };
    txtInputPasswordProps: {
        onChangeText: (text: string) => void;
        secureTextEntry: boolean;
    };
    btnPasswordShowHideProps: {
        onPress: () => void;
    };
    onCloseAlertModal: () => void;
    onPressSignUp: () => Promise<void>;
    onSignUpUserSuccessCallBack: (res: any) => Promise<void>;
    onSignUpUserFailureCallBack: (error: any) => void;
    onSocialLogin: (item: any) => Promise<void>;
    onSocialLoginSuccessCallBack: (res: any) => Promise<void>;
    onSocialLoginFailureCallBack: (error: any) => void;
    onGuestLogin: () => Promise<void>;
    onGuestLoginSuccessCallBack: (res: any) => Promise<void>;
    onGuestLoginFailureCallBack: (error: any) => void;
    initUser: (token: string) => Promise<void>;
    onPressLoginWithFacebook: () => void;
    onPressGoogleSignIn: () => Promise<void>;
    onPressLoginWithApple: () => Promise<void>;
    sendLoginFailMessage(message: any): void;
    saveLoggedInUserData(responseJson: any, isGuestUser?: any): Promise<void>;
    getHelpCenterData: () => Promise<void>;
    getHelpCenterDataSuccessCallBack: (res: any) => Promise<void>;
    getHelpCenterDataFailureCallBack: (error: any) => void;
}
export {};
