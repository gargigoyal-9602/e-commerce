declare class LocalNotificationService {
    configure: (onOpenNotification: any) => void;
    unregister: () => void;
    showNotification: (id: any, title: any, message: any, data?: {}, options?: {}) => void;
    buildAndroidNotification: (id: any, title: any, message: any, data?: {}, options?: {}) => {
        channelId: string;
        id: any;
        autoCancel: boolean;
        largeIcon: any;
        smallIcon: any;
        bigText: any;
        subText: any;
        vibrate: any;
        priority: any;
        importance: any;
        data: {};
    };
    buildIOSNotification: (id: any, title: any, message: any, data?: {}, options?: {}) => {
        alertAction: any;
        category: any;
        userInfo: {
            id: any;
            item: {};
        };
    };
    cancelAllLocalNotifications: () => void;
    removeDeliveredNotificationByID: (notificationId: any) => void;
}
export declare const localNotificationService: LocalNotificationService;
export {};
