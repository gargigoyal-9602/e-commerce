import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
export interface S {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    otpAuthToken: string;
    reTypePassword: string;
    data: any[];
    passwordHelperText: string;
    enablePasswordField: boolean;
    enableReTypePasswordField: boolean;
    countryCodeSelected: string;
    phone: string;
}
export interface SS {
    id: any;
}
export default class EmailAccountRegistrationController extends BlockComponent<Props, S, SS> {
    arrayholder: any[];
    passwordReg: RegExp;
    emailReg: RegExp;
    createAccountApiCallId: any;
    validationApiCallId: string;
    imgPasswordVisible: any;
    imgPasswordInVisible: any;
    labelHeader: any;
    labelFirstName: string;
    lastName: string;
    labelEmail: string;
    labelPassword: string;
    labelRePassword: string;
    labelLegalText: string;
    labelLegalTermCondition: string;
    labelLegalPrivacyPolicy: string;
    btnTextSignUp: string;
    currentCountryCode: any;
    constructor(props: Props);
    receive(from: string, message: Message): Promise<void>;
    goToPrivacyPolicy(): void;
    goToTermsAndCondition(): void;
    isStringNullOrBlank(str: string): boolean;
    isValidEmail(email: string): boolean;
    createAccount(): boolean;
    getValidations(): void;
    isNonNullAndEmpty(value: String): boolean;
    validateCountryCodeAndPhoneNumber(countryCode: string, phoneNumber: string): any;
    imgEnableRePasswordFieldProps: {
        source: any;
    };
    btnConfirmPasswordShowHideProps: {
        onPress: () => void;
    };
    imgEnablePasswordFieldProps: {
        source: any;
    };
    btnPasswordShowHideProps: {
        onPress: () => void;
    };
    btnSignUpProps: {
        onPress: () => boolean;
    };
    btnLegalPrivacyPolicyProps: {
        onPress: () => void;
    };
    btnLegalTermsAndConditionProps: {
        onPress: () => void;
    };
    txtInputEmailWebPrpos: {
        onChangeText: (text: string) => void;
    };
    txtInputEmailMobilePrpos: {
        keyboardType: string;
        onChangeText: (text: string) => void;
    };
    txtInputEmailPrpos: {
        onChangeText: (text: string) => void;
    };
    txtPhoneNumberWebProps: {
        onChangeText: (text: string) => void;
    };
    txtPhoneNumberMobileProps: {
        autoCompleteType: string;
        keyboardType: string;
        onChangeText: (text: string) => void;
    };
    txtPhoneNumberProps: {
        onChangeText: (text: string) => void;
    };
    txtInputLastNamePrpos: {
        onChangeText: (text: string) => void;
    };
    txtInputFirstNamePrpos: {
        onChangeText: (text: string) => void;
    };
    txtInputConfirmPasswordProps: {
        onChangeText: (text: string) => void;
        secureTextEntry: boolean;
    };
    txtInputPasswordProps: {
        onChangeText: (text: string) => void;
        secureTextEntry: boolean;
    };
}
