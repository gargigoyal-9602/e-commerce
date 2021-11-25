import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    password: string;
    email: string;
    enablePasswordField: boolean;
    checkedRememberMe: boolean;
    placeHolderEmail: string;
    placeHolderPassword: string;
    imgPasswordVisible: any;
    imgPasswordInVisible: any;
    labelHeader: string;
    btnTxtLogin: string;
    labelRememberMe: string;
    btnTxtSocialLogin: string;
    labelOr: string;
}
interface SS {
    id: any;
}
export default class EmailAccountLoginController extends BlockComponent<Props, S, SS> {
    apiEmailLoginCallId: string;
    validationApiCallId: string;
    emailReg: RegExp;
    labelTitle: string;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    btnSocialLoginProps: {
        onPress: () => void;
    };
    btnEmailLogInProps: {
        color: string;
        onPress: () => boolean;
    };
    btnPasswordShowHideProps: {
        onPress: () => void;
    };
    CustomCheckBoxProps: {
        onChangeValue: (value: boolean) => void;
        isChecked: boolean;
    };
    btnForgotPasswordProps: {
        onPress: () => void;
    };
    txtInputPasswordProps: {
        onChangeText: (text: string) => void;
        secureTextEntry: boolean;
    };
    btnPasswordShowHideImageProps: {
        source: any;
    };
    btnRememberMeProps: {
        onPress: () => void;
    };
    txtInputEmailWebProps: {
        onChangeText: (text: string) => void;
    };
    txtInputEmailMobileProps: {
        autoCompleteType: string;
        keyboardType: string;
        onChangeText: (text: string) => void;
    };
    txtInputEmailProps: {
        onChangeText: (text: string) => void;
    };
    receive(from: string, message: Message): Promise<void>;
    sendLoginFailMessage(): void;
    sendLoginSuccessMessage(): void;
    saveLoggedInUserData(responseJson: any): void;
    openInfoPage(): void;
    goToForgotPassword(): void;
    goToSocialLogin(): void;
    doEmailLogIn(): boolean;
    callGetValidationApi(): void;
}
export {};
