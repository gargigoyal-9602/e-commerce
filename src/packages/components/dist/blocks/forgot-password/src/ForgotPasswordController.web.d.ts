import { BlockComponent } from "../../../framework/src/BlockComponent";
import { Message } from "../../../framework/src/Message";
export declare const configJSON: any;
export interface Props {
    navigation: any;
}
interface S {
    email: string;
    emailError: string;
    notRegister: string;
    otp: string;
    otpError: string;
    passwordError: string;
    otpToken: any;
    showSpinner: boolean;
    timer: number;
    seconds: any;
    loading?: boolean;
}
interface SS {
    navigation: any;
}
export default class ForgotPasswordController extends BlockComponent<Props, S, SS> {
    validationAPICallId: any;
    guestLoginApiCallId: string;
    resetOTPApiCallId: string;
    confirmEmailAPiCallID: string;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    secondsToTime(secs: any): {
        s: number;
    };
    startTimer(): void;
    countDown(): void;
    receive(from: string, message: Message): Promise<void>;
    isValidEmail(email: string): boolean;
    isValidOTP(otp: any): boolean;
    SendOtpBtn: (e: any) => void;
    emailConfirm: () => void;
    handleEmail: (e: any) => void;
    handleOTP: (e: any) => void;
    verifyOTP: () => void;
    guestUserHandler: () => void;
}
export {};
