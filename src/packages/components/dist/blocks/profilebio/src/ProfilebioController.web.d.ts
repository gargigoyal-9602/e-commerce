import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export declare const getValidationsSchema: any;
export interface Props {
    updateProfile?: any;
}
interface S {
    activeTab: string;
    editProfile?: boolean;
    profileImgBase64?: string;
    isChangePassword?: boolean;
    newProfileImgBase64?: any;
    removeClicked?: boolean;
    isPasswordUpdated?: boolean;
    isNewImageAdded?: boolean;
    passwordError: string;
    showPassword?: boolean;
    showCurrentPassword?: boolean;
    currentPasswordErr: string;
    showConfirmPassword?: boolean;
    confirmPasswordError: string;
    getUserDeatils?: any;
    userDetails?: any;
    messageType?: string;
    message?: string;
    showAlertPassword: boolean;
    disableLogout?: boolean;
    loading?: boolean;
    showSpinner?: boolean;
}
interface SS {
    id: any;
}
export default class ProfilebioController extends BlockComponent<Props, S, SS> {
    updateProfileAPICallId: string;
    updateProfilePasswrdAPICallId: string;
    getUserProfileAPICallId: string;
    constructor(props: Props);
    receive(from: String, message: Message): Promise<void>;
    updatePasswordHandler: (values: any) => void;
    updateProfileHandler: (values: any) => void;
    getUserProfileHandler: () => void;
}
export {};
