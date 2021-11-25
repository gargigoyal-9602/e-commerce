import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
    order: any;
    history: any;
    location: any;
}
interface S {
    userData: any;
    email: string;
    userName: string;
    profileImage: any;
    activeTab: any;
    orders: any;
    openLogoutModal?: boolean;
    data?: any;
    wishlist: any;
    loadingOrder: boolean;
    loadingWishlist: boolean;
    totalNotifications?: number;
    commonLoader?: boolean;
    totalOrdersCount?: number;
    isLoadMoreOrders?: boolean;
    currentOrdersPageNo?: number;
}
interface SS {
    id: any;
}
export default class ProfileWebController extends BlockComponent<Props, S, SS> {
    apiEmailLoginCallId: string;
    validationApiCallId: string;
    getOrdersCallID: string;
    cancelOrderCallID: string;
    getWishListCallID: string;
    emailReg: RegExp;
    labelTitle: string;
    openLogout?: boolean;
    getAllNotificationsAPICallId: string;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    sendLoginFailMessage(): void;
    routeToProfile(value: string): void;
    routeToHelpCenter(): void;
    openLogoutModal(): void;
    deleteLogout: () => void;
    getOrders(): void;
    cancelOrder(ID: string): void;
    getWishList(): void;
    onHandleLogout(): void;
    getAllNotificationsList: () => void;
}
export {};
