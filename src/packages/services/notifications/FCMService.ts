import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import StorageProvider from '../../framework/src/StorageProvider';

class FCMService {

    register = (onRegister: any, onNotification: any, onOpenNotification: any) => {
        this.checkPermission(onRegister);
        this.createNotificationListeners(onRegister, onNotification, onOpenNotification);
    }

    registerAppWithFCM = async () => {
        if (Platform.OS === 'ios') {
            await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled(true);
        }
    }

    checkPermission = (onRegister: any) => {
        messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    // User has permission
                    this.getToken(onRegister);
                } else {
                    // User doesn't have permission
                    this.requestPermission(onRegister);
                }
            }).catch(error => {
                console.log('@@@ FCM SERVICE PERMISSION REJECT ERROR ===========', error);
            })
    }

    getToken = (onRegister: any) => {
        messaging().getToken()
            .then(async fcmToken => {
                if (fcmToken) {
                    await StorageProvider.set('USER_FCM_TOKEN', fcmToken);
                    onRegister(fcmToken);
                } else {
                    console.log('@@@ FCM SERVICE USER DOES NOT HAVE DEVICE TOKEN ===========');
                }
            }).catch(error => {
                console.log('@@@ FCM SERVICE GET TOKEN ERROR ===========', error);
            })
    }

    requestPermission = (onRegister: any) => {
        messaging().requestPermission()
            .then(() => {
                this.getToken(onRegister);
            }).catch(error => {
                console.log('@@@ FCM SERVICE REQUEST PERMISSION REJECTED ===========', error);
            })
    }

    deleteToken = () => {
        //@ts-ignore
        messaging.deleteToken()
            .catch((error: any) => {
                console.log('@@@ FCM SERVICE DELETE TOKEN ERROR ===========', error);
            })
    }

    createNotificationListeners = (onRegister: any, onNotification: any, onOpenNotification: any) => {

        // When the application is running, but in the background
        messaging()
            .onNotificationOpenedApp(remoteMessage => {
                console.log('@@@ FCM SERVICE ON NOTIFICATION CAUSED APP TO OPEN FROM BACKGROUND STATE ===========', remoteMessage);
                if (remoteMessage) {
                    const notification = remoteMessage.notification
                    if (!remoteMessage.data) {
                        onOpenNotification(notification);
                        return;
                    }
                    //@ts-ignore
                    notification.userInteraction = true;
                    onOpenNotification(Platform.OS === 'ios' ? remoteMessage.data.item : remoteMessage);
                    // this.removeDeliveredNotification(notification.notificationId)
                }
            });

        // When the application is opened from a quit state.
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                console.log('@@@ FCM SERVICE ON NOTIFICATION CAUSED APP TO OPEN FROM KILLED STATE ===========', remoteMessage);
                if (remoteMessage) {
                    const notification = remoteMessage.notification;
                    if (!remoteMessage.data) {
                        onOpenNotification(notification);
                        return;
                    }
                    //@ts-ignore
                    notification.userInteraction = true;
                    onOpenNotification(Platform.OS === 'ios' ? remoteMessage.data.item : remoteMessage);
                    //this.removeDeliveredNotification(notification.notificationId)
                }
            });

        // Foreground state messages
        messaging().onMessage(async (remoteMessage: any) => {
            console.log('@@@ FCM SERVICE A NEW FCM MESSAGE IS ARRIVED FOREGROUND ===========', remoteMessage);
            if (remoteMessage) {
                let notification: any = null;
                if (Platform.OS === 'ios') {
                    notification = remoteMessage;
                } else {
                    notification = remoteMessage;
                }
                notification['title'] = remoteMessage.notification.title;
                notification['message'] = remoteMessage.notification.body;
                onNotification(notification);
            }
        });

        // Triggered when have new token
        messaging().onTokenRefresh(fcmToken => {
            console.log('@@@ FCM SERVICE A NEW TOKEN REFRESH ===========', fcmToken);
            onRegister(fcmToken);
        });

    }

    // unRegister = () => {
    //     this.messageListener();
    // }

}

export const fcmService = new FCMService();