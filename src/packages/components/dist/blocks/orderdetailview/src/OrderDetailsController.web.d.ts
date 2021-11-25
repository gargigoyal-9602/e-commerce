import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
    history: any;
    order: any;
    orderItem: any;
    refetchData: any;
    location: any;
}
interface S {
    ShowCOModal: boolean;
    ShowPRModal: boolean;
    shippingAddress: any;
    trackingDetails: any;
    loader: boolean;
}
interface SS {
    id: any;
}
export default class SingleOrdersController extends BlockComponent<Props, S, SS> {
    apiEmailLoginCallId: string;
    validationApiCallId: string;
    fetchTrackingDetailsCallId: string;
    emailReg: RegExp;
    labelTitle: string;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    fetchTrackingDetails(): void;
    sendLoginFailMessage(): void;
    routeToProfile(): void;
    getImageUrl(): any;
    getAddressString(): string;
    getLocalDate: (data: any) => string;
}
export {};
