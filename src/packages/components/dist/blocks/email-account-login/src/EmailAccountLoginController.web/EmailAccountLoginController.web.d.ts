import { Message } from "../../../../framework/src/Message";
import { BlockComponent } from "../../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
    history: any;
}
interface S {
    showSpinner: boolean;
    loginError: string;
    showPass: boolean;
    loading?: boolean;
    socialMediaResult?: any;
}
interface SS {
    id: any;
}
export default class EmailAccountLoginController extends BlockComponent<Props, S, SS> {
    apiEmailLoginCallId: string;
    validationApiCallId: string;
    emailReg: RegExp;
    labelTitle: string;
    verfiySocialLoginApiCallId: string;
    guestLoginApiCallId: string;
    loginAPICallID: string;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    verifyGuestToken(): Promise<number | undefined>;
    receive(from: string, message: Message): Promise<void>;
    logInWithFaceBook(): void;
    logInWithGoogle(): void;
    routeToAll(route: string): void;
    showPassword: (e: any) => void;
    setShowSpinner: (value: boolean) => void;
    verifyEmailBeforeRegistartion: (resultData: any, socialMediaName: string) => void;
    guestLogin: () => void;
    handleSubmitLogin: (data: any) => void;
}
export {};
