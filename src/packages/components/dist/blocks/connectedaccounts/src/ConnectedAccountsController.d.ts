import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    showDisconnectModal: boolean;
    socialAccountList: any;
    selectedAccountData: any;
    selectedAccountName: string;
    isFetching: boolean;
    userDetails: any;
    isFromFacebook: boolean;
    isShowError: boolean;
    token: string;
    message: any;
    showAlertModal: boolean;
    userInfo: any;
}
interface SS {
    id: any;
}
export default class ConnectedAccountsController extends BlockComponent<Props, S, SS> {
    _unsubscribe: any;
    getAccountListApiCallId: any;
    getConnectedSocialMediaDataApiCallId: any;
    addSocialMediaAccountApiCallId: any;
    removeSocialMediaAccountApiCallId: any;
    apiSocialLoginCallId: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    componentWillUnmount(): Promise<void>;
    setupGoogleConfiguration: () => void;
    handleBackButtonClick: () => boolean;
    receive(from: string, message: Message): Promise<void>;
    apiCall: (data: any) => Promise<string>;
    initUser: (token: string) => Promise<void>;
    onPressLoginWithFacebook: () => void;
    onPressGoogleSignIn: () => Promise<void>;
    _signOut: () => Promise<void>;
    getConnectedSocialMediaData: () => Promise<void>;
    getSocialMediaAccountDetailsSuccessCallBack: (res: any) => void;
    getSocialMediaAccountDetailsFailureCallBack: (error: any) => void;
    addSocialMediaAccountDetailsSuccessCallBack: () => void;
    addSocialMediaAccountDetailsFailureCallBack: () => void;
    removeSocialMediaAccountDetails: () => Promise<void>;
    removeSocialMediaAccountDetailsSuccessCallBack: () => void;
    removeSocialMediaAccountDetailsFailureCallBack: () => void;
}
export {};
