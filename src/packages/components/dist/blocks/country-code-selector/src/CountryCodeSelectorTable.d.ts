import { BlockComponent } from "../../../framework/src/BlockComponent";
import { Message } from "../../../framework/src/Message";
interface Props {
    navigation: any;
    id: string;
}
interface S {
    loading: boolean;
    data: any[];
    error: any;
    value: string;
}
interface SS {
}
declare class CountryCodeSelectorTable extends BlockComponent<Props, S, SS> {
    arrayholder: any[];
    countryCodeApiCallId: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    renderSeparator: () => JSX.Element;
    searchFilterFunction: (text: string) => void;
    renderHeader: () => JSX.Element;
    actionOnRow(item: any): void;
    render(): JSX.Element;
    receive(from: String, message: Message): Promise<void>;
    makeRemoteRequest: () => void;
}
export default CountryCodeSelectorTable;
