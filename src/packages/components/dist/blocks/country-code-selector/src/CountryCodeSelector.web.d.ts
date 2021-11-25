import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
interface Props {
    navigation: any;
    style: any;
    id: string;
    disable: boolean;
    allowPropChange: boolean;
    value: string;
}
interface S {
    dataSource: any[];
    countryCodeSelected: string;
    mobileNo: string;
    token: string;
    placeHolder: string;
    disable: boolean;
    label: any;
}
interface SS {
}
export default class CountryCodeSelector extends BlockComponent<Props, S, SS> {
    countryCodeApiCallId: any;
    constructor(props: Props);
    render(): JSX.Element;
    handleChange(item: any): void;
    componentDidMount(): Promise<void>;
    countryCodesToDropDown: (data: any) => any;
    receive(from: String, message: Message): Promise<void>;
    makeRemoteRequest: () => void;
}
export {};
