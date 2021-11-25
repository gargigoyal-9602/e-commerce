import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    total: any;
}
interface S {
    loader?: boolean;
    notificationsList?: Array<any>;
    activeTab?: any;
    isDeleteNotificationCheck?: boolean;
    deleteNotificationID?: any;
    isShowLoadMore?: boolean;
    currentPage?: number;
}
interface SS {
}
export default class NotificationController extends BlockComponent<Props, S, SS> {
    getAllNotificationsAPICallId: string;
    readAllNotificationsAPICallId: string;
    readSingleNotificationOnIDAPICallID: string;
    deleteAllNotificationAPICallID: string;
    deleteSingleNotificationOnIDAPICallID: string;
    constructor(props: Props);
    receive(from: string, message: Message): Promise<void>;
    getDays: (data: any) => string;
    getAllNotificationsList: () => void;
    readAllNotifications: () => void;
    readSingleNotificationBasedOnId: (id: any) => void;
    deleteAllNotifications: () => void;
    deleteSingleNotificationOnId: () => void;
}
export {};
