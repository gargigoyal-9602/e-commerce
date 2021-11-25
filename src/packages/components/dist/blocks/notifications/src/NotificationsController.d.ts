import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    notificationList: any;
    noProductFound: boolean;
    isFetchingData: boolean;
    showReadAll: boolean;
    pageCount: number;
    limit: number;
    index: number;
    loading: boolean;
    pageLoader: boolean;
    pullToRefresh: boolean;
    onEndReachedCalledDuringMomentum: boolean;
    lastLoadCount: number;
    notFinalLoad: boolean;
    isFetching: boolean;
    isShowError: boolean;
    message: any;
    showAlertModal: boolean;
}
interface SS {
    id: any;
}
export default class NotificationsController extends BlockComponent<Props, S, SS> {
    getNotificationListApiCallId: any;
    readNotificationApiCallId: any;
    deleteNotificationApiCallId: any;
    _unsubscribe: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    handleBackButtonClick: () => boolean;
    componentWillUnmount(): Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    apiCall: (data: any) => Promise<string>;
    getNotificationList: () => Promise<void>;
    getNotificationListSuccessCallBack: (res: any) => Promise<void>;
    getNotificationListFailureCallBack: (error: any) => void;
    deleteNotification: (item: any) => Promise<void>;
    deleteNotificationSuccessCallBack: () => Promise<void>;
    deleteNotificationFailureCallBack: (error: any) => void;
    readNotification: (item: any) => Promise<void>;
    readNotificationSuccessCallBack: () => Promise<void>;
    readNotificationFailureCallBack: (error: any) => void;
    readAllNotification: () => Promise<void>;
    readAllNotificationSuccessCallBack: () => Promise<void>;
    readAllNotificationFailureCallBack: (error: any) => void;
    onEndReached: () => void;
    _keyExtractor: (item: any) => any;
    _onMomentumScrollBegin: () => void;
}
export {};
