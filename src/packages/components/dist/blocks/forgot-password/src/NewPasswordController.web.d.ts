import { BlockComponent } from "../../../framework/src/BlockComponent";
import { Message } from "../../../framework/src/Message";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    history: any;
}
interface S {
    showPass: boolean;
    showConfirmPass: boolean;
    message: string;
    invalidPass: string;
    showSpinner: boolean;
}
interface SS {
    navigation: any;
}
export default class ForgotPasswordController extends BlockComponent<Props, S, SS> {
    validationAPICallId: any;
    resetPasswordAPICallId: string;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    setNewPass: (values: any) => Promise<void>;
    showPassword: (e: any) => void;
    showConfirmPassword: (e: any) => void;
    handleResetPassword: (data: any) => Promise<void>;
}
export {};
