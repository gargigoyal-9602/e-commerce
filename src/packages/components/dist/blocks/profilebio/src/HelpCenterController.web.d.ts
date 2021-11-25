import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
    history: any;
    match: any;
}
interface S {
    activeTab: string;
    activeMobileTab: boolean;
    errorData: any;
    loading: boolean;
    helpCenterData: any;
    tabName: any;
    isLoggedIn: boolean;
    FaqData?: any;
}
interface SS {
    id: any;
}
export default class HelpCenterController extends BlockComponent<Props, S, SS> {
    helpCenterallId: string;
    validationApiCallId: string;
    emailReg: RegExp;
    labelTitle: string;
    FAQAPICallId: string;
    constructor(props: Props);
    componentWillReceiveProps(nextProps: any): void;
    componentDidMount(): Promise<void>;
    UNSAFE_componentWillReceiveProps(): void;
    receive(from: string, message: Message): Promise<void>;
    getHelpceterData(): void;
    toggle(tab: any): void;
    routeToProfile: () => void;
    routeHelpCenter: (value: any) => void;
    routeHelpCenterMb(value: any): void;
    getFAQsData: () => void;
}
export {};
