import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    faqList: any;
    isFetching: boolean;
    isShowError: boolean;
    showAlertModal: boolean;
    message: any;
}
interface SS {
    id: any;
}
export default class InteractivefaqController extends BlockComponent<Props, S, SS> {
    getFAQDataApiCallId: any;
    _unsubscribe: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    componentWillUnmount(): Promise<void>;
    handleBackButtonClick: () => boolean;
    receive(from: string, message: Message): Promise<void>;
    apiCall: (data: any) => Promise<string>;
    getFAQData: () => Promise<void>;
    getFAQListSuccessCallBack: (res: any) => void;
    getFAQListFailureCallBack: (error: any) => void;
    onPressExpandableView: (item: any, _: any) => void;
}
export {};
