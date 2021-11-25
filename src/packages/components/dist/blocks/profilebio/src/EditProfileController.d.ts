import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    showPickerModal: boolean;
    profileImage: any;
    profileImageData: any;
    showProfileImage: boolean;
    name: string;
    email: string;
    phone: string;
    isShowError: boolean;
    showAlertModal: boolean;
    message: any;
    userData: any;
    isFetching: boolean;
    token: string;
}
interface SS {
    id: any;
}
export default class EditProfileController extends BlockComponent<Props, S, SS> {
    apiEditProfileCallId: any;
    getUserProfileApiCallId: any;
    updateProfileApiCallId: any;
    _unsubscribe: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    componentWillUnmount(): Promise<void>;
    getToken: () => Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    apiCall: (data: any) => Promise<string>;
    getUserProfile: () => Promise<void>;
    getUserProfileSuccessCallBack: (res: any) => Promise<void>;
    getUserProfileFailureCallBack: (error: any) => void;
    validateInput: () => void;
    updateProfileData: () => Promise<void>;
    updateProfileDataSuccessCallBack: (res: any) => Promise<void>;
    updateProfileDataFailureCallBack: (error: any) => void;
    txtInputNameProps: {
        onChangeText: (text: string) => void;
        secureTextEntry: boolean;
    };
    txtInputEmailProps: {
        onChangeText: (text: string) => void;
        secureTextEntry: boolean;
    };
    txtInputPhoneProps: {
        onChangeText: (text: string) => void;
        secureTextEntry: boolean;
    };
    onPressCameraUploadImage: () => void;
    onPressCamera: () => void;
    onPressPickImage: () => void;
}
export {};
