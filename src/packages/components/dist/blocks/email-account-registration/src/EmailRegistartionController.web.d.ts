import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
    history: any;
    isPopup: boolean;
}
interface S {
    showSpinner: boolean;
    loginError: string;
    showPass: boolean;
    emailErr: string;
    userToken?: string;
    userEmail?: string;
    userName?: string;
    userPassword?: string;
    socialMediaResult?: any;
    showAlert?: boolean;
    messageType?: any;
    message?: any;
    loading?: boolean;
    helpCenterData?: any;
}
interface SS {
    id: any;
}
export default class EmailAccountRegistrationController extends BlockComponent<Props, S, SS> {
    apiEmailLoginCallId: string;
    validationApiCallId: string;
    emailReg: RegExp;
    labelTitle: string;
    verfiySocialLoginApiCallId: string;
    registartionEmailCallId: string;
    guestRegisterApiCallId: string;
    sendOTPAPICallId: string;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    showPassword: (e: any) => void;
    signupUser: (values: any) => void;
    receive(from: String, message: Message): Promise<void>;
    registartionEmail: (values: any) => void;
    verifyEmailBeforeRegistartion: (resultData: any, socialMediaName: string) => void;
    guestRegister: () => void;
    connectGoogle: () => void;
    connectFacebook: () => void;
}
export {};
