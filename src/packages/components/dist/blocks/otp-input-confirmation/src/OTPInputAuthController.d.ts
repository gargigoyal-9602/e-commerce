import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
export interface S {
    emailInput: string;
    email: boolean;
    OTPError: boolean;
    OTP: string;
    OTPfocus: boolean;
    fullName: string;
    passwordInput: string;
    token: string;
    emailError: boolean;
    showAlertModal: boolean;
    message: any;
    sendLink: boolean;
    showTimer: boolean;
    startTimer: boolean;
    isOTPSent: boolean;
    showResendLink: boolean;
    fromCart: boolean;
    isShowError: boolean;
    isFetching: boolean;
    labelInfo: any;
}
export interface SS {
    id: any;
}
export default class OTPInputAuthController extends BlockComponent<Props, S, SS> {
    signupApiCallId: string;
    sendOtpApiCallId: string;
    verifyOtpApiCallId: string;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    loadScreen(): Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    apiCall: (data: any) => Promise<string>;
    onFocus(item: string): void;
    resetErrors: () => void;
    onCloseAlertModal: () => void;
    verifyOTPSuccessCallBack: () => Promise<void>;
    verifyOTPFailureCallBack: (error: any) => void;
    sendOTPSuccessCallBack: (res: any) => Promise<void>;
    sendOTPFailureCallBack: (error: any) => void;
    onSignUpUserSuccessCallBack: (res: any) => Promise<void>;
    onSignUpUserFailureCallBack: (error: any) => void;
    onPressVerifyOTP: () => Promise<void>;
    onPressSendLink: () => Promise<void>;
    onCreateAccount: () => Promise<void>;
    saveLoggedInUserData(responseJson: any, isGuestUser?: any): Promise<void>;
}
