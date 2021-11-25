import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
}
interface S {
    isFacebookConnceted?: boolean;
    isGoogleCoonected?: boolean;
    googleUserName?: any;
    facebookUserName?: any;
    googleId?: any;
    fbId?: any;
    userProfileDetails?: any;
    isModalOpen?: boolean;
    modalTitle?: any;
    modalContent?: any;
    modalId?: any;
    modalSocialType?: string;
    userData?: any;
    userToken?: any;
    socialAccountResult?: any;
    googleSocialAccountResult?: any;
    facebookSocialAccountResult?: any;
    showAlert?: boolean;
    alertType?: string;
    alertMessage?: string;
    loading?: boolean;
}
interface SS {
    id: any;
}
export default class ConnnectedAccountsController extends BlockComponent<Props, S, SS> {
    getAllSocialAccountlistAPiCallId: string;
    deActivateSocialAccountAPiCallId: string;
    conncetToSocialAccountAPiCallId: string;
    constructor(props: Props);
    receive(from: String, message: Message): Promise<void>;
    getAllSocialAccountsList: () => void;
    activateSocialAccount: (data: any, socialMediaName: string) => void;
    deActivateSocialAccount: () => void;
    connectGoogle: () => void;
    connectFacebook: () => void;
}
export {};
