import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    isVisible: boolean;
    token: string;
    data: any;
    priceLowtoHigh: boolean;
    priceHightoLow: boolean;
    newestProduct: boolean;
    popular: boolean;
}
interface SS {
    id: any;
}
export default class SortingController extends BlockComponent<Props, S, SS> {
    getProductApiCallId: any;
    getSortAscApiCallId: any;
    getSortDescApiCallId: any;
    getsortNewApiCallId: any;
    getPopularityApiCallId: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    getToken: () => void;
    receive(from: string, message: Message): Promise<void>;
    modalVisible(): void;
    getListRequest: (token: any) => void;
    sortPriceAsc: () => void;
    sortPriceDesc: () => void;
    sortNewest: () => void;
    sortPopularity: () => void;
}
export {};
