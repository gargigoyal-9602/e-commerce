import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    dashboardData: any;
    token: string;
    errorMsg: string;
    loading: boolean;
}
interface SS {
    id: any;
}
export default class DashboardController extends BlockComponent<Props, S, SS> {
    apiDashboardItemCallId: string;
    dashboardApiCallId: string;
    apiGetQueryStrinurl: string;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    getToken: () => void;
    getDashboardData(): boolean;
    receive(from: string, message: Message): Promise<void>;
}
export {};
