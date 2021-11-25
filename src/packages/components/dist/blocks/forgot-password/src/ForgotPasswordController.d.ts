import { BlockComponent } from "../../../framework/src/BlockComponent";
import { Message } from "../../../framework/src/Message";
export declare const configJSON: any;
export interface Props {
    navigation: any;
}
interface S {
    accountType: string;
    emailSchema: any;
    phoneSchema: any;
    otpSchema: any;
    passwordSchema: any;
    accountStatus: any;
    passwordRules: any;
    emailInput: any;
    otpInput: any;
    countryCodeSelected: any;
    token: any;
    enablePasswordField: Boolean;
    btnConfirmPasswordShowHide: Boolean;
    isOTPSent: boolean;
    showTimer: boolean;
    startTimer: boolean;
    sendLink: boolean;
    email: boolean;
    otp: boolean;
    showAlertModal: boolean;
    message: any;
    OTPError: boolean;
    showResendLink: boolean;
    isShowError: boolean;
    isFetching: boolean;
    emailError: boolean;
}
interface SS {
    navigation: any;
}
export default class ForgotPasswordController extends BlockComponent<Props, S, SS> {
    validationAPICallId: any;
    requestEmailOtpCallId: any;
    requestPhoneOtpCallId: any;
    requestChangePasswordCallId: any;
    requestGoToConfirmationCallId: any;
    apiGuestLoginCallId: any;
    otpToken: any;
    _unsubscribe: any;
    verifyOtpApiCallId: string;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    handleBackButtonClick: () => boolean;
    componentWillUnmount(): Promise<void>;
    onFocus(item: any): void;
    onCloseAlertModal: () => void;
    resetErrors: () => void;
    receive(from: string, message: Message): Promise<void>;
    apiCall: (data: any) => Promise<string>;
    onPressSendLink: () => Promise<void>;
    onSendVerificationOTPSuccessCallBack: (res: any) => Promise<void>;
    onSendVerificationOTPFailureCallBack: (error: any) => void;
    verifyOTPSuccessCallBack: (res: any) => Promise<void>;
    verifyOTPFailureCallBack: (error: any) => void;
    onPressVerifyOTP: () => Promise<void>;
    onPressSubmitButton: () => void;
    onGuestLogin: () => Promise<void>;
    onGuestLoginSuccessCallBack: (res: any) => Promise<void>;
    onGuestLoginFailureCallBack: (error: any) => void;
    saveLoggedInUserData(responseJson: any, isGuestUser?: any): Promise<void>;
    imgEmailIcon: {
        source: any;
    };
    imgOTPIcon: {
        source: any;
    };
    crossIcon: {
        source: any;
    };
    txtEmailInputProps: {
        onChangeText: (text: string) => void;
    };
    txtOtpInputProps: {
        onChangeText: (text: string) => void;
    };
}
export {};
