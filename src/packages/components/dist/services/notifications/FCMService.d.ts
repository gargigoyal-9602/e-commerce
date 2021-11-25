declare class FCMService {
    register: (onRegister: any, onNotification: any, onOpenNotification: any) => void;
    registerAppWithFCM: () => Promise<void>;
    checkPermission: (onRegister: any) => void;
    getToken: (onRegister: any) => void;
    requestPermission: (onRegister: any) => void;
    deleteToken: () => void;
    createNotificationListeners: (onRegister: any, onNotification: any, onOpenNotification: any) => void;
}
export declare const fcmService: FCMService;
export {};
