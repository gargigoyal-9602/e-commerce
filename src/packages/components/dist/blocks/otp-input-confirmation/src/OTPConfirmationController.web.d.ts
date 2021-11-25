import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
}
interface S {
    otpError?: any;
    showSpinner?: boolean;
    otpToken?: boolean;
    timer: number;
    isResendClicked?: boolean;
}
interface SS {
    id: any;
}
export default class OTPConfirmationController extends BlockComponent<Props, S, SS> {
    resendOTPEmailAPICallId: string;
    sendEmailOTPApiCallId: string;
    registerEmailAPICallId: string;
    constructor(props: Props);
    startTimer(): void;
    countDown(): void;
    receive(from: String, message: Message): Promise<void>;
    sendEmailOTP: (values: any) => void;
    resendOTP: () => void;
    SignUp: () => void;
}
export {};
