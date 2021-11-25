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
    emailValue: any;
    phoneValue: any;
    countryCodeSelected: any;
    token: any;
    enablePasswordField: Boolean;
    btnConfirmPasswordShowHide: Boolean;
    isOTPSent: boolean;
    showTimer: boolean;
    startTimer: boolean;
    sendLink: boolean;
    newPasswordInput: any;
    confirmPasswordInput: any;
    showAlertModal: boolean;
    message: any;
    isShowError: any;
    isFetching: boolean;
    passwordError: boolean;
    confirmPasswordError: boolean;
    password: boolean;
    confirmPassword: boolean;
    nameError: any;
}
interface SS {
    navigation: any;
}
export default class NewPasswordController extends BlockComponent<Props, S, SS> {
    validationAPICallId: any;
    requestEmailOtpCallId: any;
    requestPhoneOtpCallId: any;
    requestChangePasswordCallId: any;
    requestGoToConfirmationCallId: any;
    otpToken: any;
    resetPasswordApiCallId: any;
    secondTextInput: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    loadScreen(): Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    apiCall: (data: any) => Promise<string>;
    resetPasswordSuccessCallBack: (res: any) => Promise<void>;
    resetPasswordFailureCallBack: (error: any) => void;
    startForgotPassword(accountType: String): void;
    onCloseAlertModal: () => void;
    resetErrors: () => void;
    onFocus(item: any): void;
    resetPassword: () => Promise<void>;
    txtInputNewPasswordProps: {
        onChangeText: (text: string) => void;
        secureTextEntry: boolean;
    };
    txtInputConfirmPasswordProps: {
        onChangeText: (text: string) => void;
        secureTextEntry: boolean;
    };
    imgOTPIcon: {
        source: any;
    };
    crossIcon: {
        source: any;
    };
    imgEnableNewPasswordFieldProps: {
        source: any;
    };
    imgEnableConfirmPasswordFieldProps: {
        source: any;
    };
    btnNewPasswordShowHideProps: {
        onPress: () => void;
    };
    btnConfirmPasswordShowHideProps: {
        onPress: () => void;
    };
}
export {};
