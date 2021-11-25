import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    txtInputValue: string;
    txtSavedValue: string;
    enableField: boolean;
}
interface SS {
    id: any;
}
export default class RolesPermissionsController extends BlockComponent<Props, S, SS> {
    constructor(props: Props);
    receive(from: string, message: Message): Promise<void>;
    txtInputWebProps: {
        onChangeText: (text: string) => void;
        secureTextEntry: boolean;
    };
    txtInputMobileProps: {
        autoCompleteType: string;
        keyboardType: string;
        onChangeText: (text: string) => void;
        secureTextEntry: boolean;
    };
    txtInputProps: {
        onChangeText: (text: string) => void;
        secureTextEntry: boolean;
    };
    btnShowHideProps: {
        onPress: () => void;
    };
    btnShowHideImageProps: {
        source: any;
    };
    btnExampleProps: {
        onPress: () => void;
    };
    doButtonPressed(): void;
}
export {};
