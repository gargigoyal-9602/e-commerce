import { BlockComponent } from "../../../framework/src/BlockComponent";
import { Message } from "../../../framework/src/Message";
interface Props {
    navigation: any;
    id: string;
    placeHolder: string;
    style: any;
    disable: boolean;
    allowPropChange: boolean;
    value: any;
}
interface S {
    dataSource: any[];
    countryCodeSelected: string;
    placeHolder: string;
    disable: boolean;
}
interface SS {
}
export default class CountryCodeSelector extends BlockComponent<Props, S, SS> {
    static defaultProps: {
        allowPropChange: boolean;
    };
    currentPlaceHolderText: string;
    constructor(props: Props);
    receive(from: string, message: Message): Promise<void>;
    onPress: () => void;
    render(): JSX.Element;
}
export {};
