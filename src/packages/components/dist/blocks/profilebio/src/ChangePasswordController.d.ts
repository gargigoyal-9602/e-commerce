import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    textInputData: any;
    textInputFocusData: any;
    textInputErrorData: any;
    showMissmatchError: boolean;
    showPasswordChangedSuccessfully: boolean;
    showAlertModal: boolean;
    isShowError: boolean;
    message: any;
    isFetching: boolean;
    token: any;
}
interface SS {
    id: any;
}
export default class ChangePasswordController extends BlockComponent<Props, S, SS> {
    changePasswordApiCallId: any;
    _unsubscribe: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    componentWillUnmount(): Promise<void>;
    handleBackButtonClick: () => boolean;
    getToken: () => Promise<void>;
    apiCall: (data: any) => Promise<string>;
    receive(from: string, message: Message): Promise<void>;
    profileDataFailureCallBack: (error: any) => void;
    validateInput: () => void;
    onChangeTextInput: (input: string, text: string) => void;
    changePassword: () => Promise<void>;
    unsubscribeMessages: () => void;
}
export {};
