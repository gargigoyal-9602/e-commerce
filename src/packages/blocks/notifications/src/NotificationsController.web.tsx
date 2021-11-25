//@ts-nocheck;
import React from 'react';
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
//@ts-ignore
import moment from 'moment';
export const configJSON = require('./config');

export interface Props {
    total: any;
};

interface S {
    loader?: boolean;
    notificationsList?: Array<any>;
    activeTab?: any;
    isDeleteNotificationCheck?: boolean;
    deleteNotificationID?: any;
    isShowLoadMore?: boolean;
    currentPage?: number;
};

interface SS {

};

export default class NotificationController extends BlockComponent<Props, S, SS>{
    getAllNotificationsAPICallId: string;
    readAllNotificationsAPICallId: string;
    readSingleNotificationOnIDAPICallID: string;
    deleteAllNotificationAPICallID: string;
    deleteSingleNotificationOnIDAPICallID: string;
    constructor(props: Props) {
        super(props);
        this.state = {
        };
        this.subScribedMessages = [
            getName(MessageEnum.AccoutLoginSuccess),
            getName(MessageEnum.AlertMessage),
            getName(MessageEnum.RestAPIResponceMessage),
        ];

        this.getAllNotificationsAPICallId = "";
        this.readAllNotificationsAPICallId = "";
        this.readSingleNotificationOnIDAPICallID = "";
        this.deleteAllNotificationAPICallID = "";
        this.deleteSingleNotificationOnIDAPICallID = "";

        this.receive = this.receive.bind(this);
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    }

    async receive(from: string, message: Message) {
        runEngine.debugLog('----Message DebugLog------', message);
        if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
            const apiRequestCallId = message.getData(
                getName(MessageEnum.RestAPIResponceDataMessage)
            );
            var responseJson = message.getData(
                getName(MessageEnum.RestAPIResponceSuccessMessage)
            );
            var errorReponse = message.getData(
                getName(MessageEnum.RestAPIResponceErrorMessage)
            );
            if (this.getAllNotificationsAPICallId === apiRequestCallId) {
                if (responseJson && responseJson.data) {
                    const { notifications } = responseJson.data;
                    const { data, meta } = responseJson;
                    // let totalData: any = [];
                    // //@ts-ignore
                    // if (this.state?.notificationsList?.length > 0) {
                    //     //@ts-ignore
                    //     totalData = this.state?.notificationsList?.splice();
                    //     totalData.push(notifications?.data);
                    // } else {
                    //     totalData.push(notifications?.data);
                    // }
                    let unreadNotifyCount: number = 0;
                    notifications?.data?.map((ele: any, index: number) => {
                        if (!ele?.attributes?.is_read) {
                            //@ts-ignore
                            unreadNotifyCount = unreadNotifyCount + 1;
                        }
                    });
                    //@ts-ignore
                    console.log("unreadNotifyCount", unreadNotifyCount);
                    this.setState({
                        loader: false,
                        //@ts-ignore
                        notificationsList: this.state.isShowLoadMore ? [...this.state?.notificationsList, ...notifications?.data] : notifications?.data,
                        // notificationsList: totalData,
                        isShowLoadMore: meta?.pagination?.next_page,
                        currentPage: meta?.pagination?.current_page
                    });
                    //@ts-ignore
                    // localStorage.setItem('notifctaion_len', JSON.stringify(meta?.pagination?.total_count))
                    localStorage.setItem('notifctaion_len', unreadNotifyCount);
                }
            }
            if (this.readAllNotificationsAPICallId === apiRequestCallId) {
                if (responseJson) {
                    this.setState({
                        loader: false
                    });
                    this.getAllNotificationsList();
                }
            }
            if (this.readSingleNotificationOnIDAPICallID === apiRequestCallId) {
                if (responseJson) {
                    this.setState({
                        loader: false
                    });
                    this.getAllNotificationsList();
                }
            }
            if (this.deleteSingleNotificationOnIDAPICallID === apiRequestCallId) {
                if (responseJson && responseJson.data) {
                    this.setState({
                        loader: false,
                        deleteNotificationID: '',
                        isDeleteNotificationCheck: false
                    });
                    //@ts-ignore
                    window.notify([{ type: 'success', message: responseJson?.data?.message || 'Something went Wrong!!!' }])
                    this.getAllNotificationsList();
                }
            }
            if (this.deleteAllNotificationAPICallID === apiRequestCallId) {
                if (responseJson) {
                    this.setState({
                        loader: false
                    })
                    //@ts-ignore
                    window.notify([{ type: 'success', message: responseJson.message }]);
                    this.getAllNotificationsList();
                }
            }
        }
        else {

        }
    };

    //
    getDays = (data: any) => {
        let date = moment(data);
        if (moment().diff(date, 'days') >= 1) {
            return date.fromNow(); // '2 days ago' etc.
        }
        return date.calendar().split(' ')[0]; // 'Today', 'yesterday', 'tomorrow'
    }

    //Get All Notifications API
    getAllNotificationsList = () => {
        this.setState({
            loader: true
        });
        const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
        this.getAllNotificationsAPICallId = requestMessage.messageId;

        let pageNo = 1;
        if (this.state.isShowLoadMore) {
            //@ts-ignore
            pageNo = this.state.currentPage + 1;
            requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), `${configJSON.getAllNotificationsAPIEndPoint}?page=${pageNo}`);
        }
        else {
            requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), `${configJSON.getAllNotificationsAPIEndPoint}`);
        }
        //`${configJSON.getAllNotificationsAPIEndPoint}?page=${pageNo}`
        // requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), `${configJSON.getAllNotificationsAPIEndPoint}?page=${pageNo}`);
        const headers = {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token'),
        };

        requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(headers));
        requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiGetMethod);

        runEngine.sendMessage(requestMessage.id, requestMessage);
    };

    //readAll Notifications API
    readAllNotifications = () => {
        this.setState({
            loader: true,
        });
        const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));

        this.readAllNotificationsAPICallId = requestMessage.messageId;
        requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.readAllNotificationsAPIEndPoint);

        const headers = {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token'),
        };
        const requestBody = {
            "read_all": true
        };

        requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(headers));
        requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(requestBody));
        requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiPutMethod);

        runEngine.sendMessage(requestMessage.id, requestMessage);
    };

    //read single notification on Id
    readSingleNotificationBasedOnId = (id: any) => {
        this.setState({
            loader: true,
        });
        const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
        this.readSingleNotificationOnIDAPICallID = requestMessage.messageId;
        requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.readOneNotificationOnIdAPIEndPoint);

        const headers = {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token'),
        };
        const requestBody = {
            "read_all": false,
            "notification_id": id
        };

        requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(headers));
        requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(requestBody));
        requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiPutMethod);

        runEngine.sendMessage(requestMessage.id, requestMessage);

    };

    //deleteAll Notifications API
    deleteAllNotifications = () => {
        this.setState({
            loader: true,
        });
        const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
        this.deleteAllNotificationAPICallID = requestMessage.messageId;
        requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.deleteAllNotificationsAPIEndPoint);

        const headers = {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token'),
        };

        requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(headers));
        requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiDeleteMethod);

        runEngine.sendMessage(requestMessage.id, requestMessage);
    };

    //deleteSingle Notification on ID
    deleteSingleNotificationOnId = () => {
        this.setState({
            loader: true,
        });
        const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
        this.deleteSingleNotificationOnIDAPICallID = requestMessage.messageId;
        requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.deleteOneNotificationOnIdAPIEndPoint + '/' + this.state?.deleteNotificationID);

        const headers = {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token'),
        };

        requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(headers));
        requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiDeleteMethod);

        runEngine.sendMessage(requestMessage.id, requestMessage);
    };
}