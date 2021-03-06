//@ts-nocheck;
import React from 'react';
import { } from 'react-router-dom';
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
export const configJSON = require('./config');
export const getValidationsSchema = require('../../../components/src/Validations/ValidationSchema');

export interface Props {
    // Customizable Area Start
    updateProfile?: any;
    // Customizable Area End
}

interface S {
    // Customizable Area Start
    // items: any[];
    // routesConfig: any[];
    activeTab: string;

    editProfile?: boolean;
    profileImgBase64?: string;
    isChangePassword?: boolean;
    newProfileImgBase64?: any;
    removeClicked?: boolean;
    isPasswordUpdated?: boolean;
    isNewImageAdded?: boolean;
    passwordError: string;
    showPassword?: boolean;
    showCurrentPassword?: boolean;
    currentPasswordErr: string;
    showConfirmPassword?: boolean;
    confirmPasswordError: string;

    //get details
    getUserDeatils?: any;
    userDetails?: any;

    //alert Messages
    messageType?: string;
    message?: string;
    showAlertPassword: boolean;
    //logoutmodal
    disableLogout?: boolean;

    loading?: boolean;
    showSpinner?: boolean;
    // Customizable Area End
}

interface SS {
    id: any;
}

export default class ProfilebioController extends BlockComponent<Props, S, SS>{
    updateProfileAPICallId: string;
    updateProfilePasswrdAPICallId: string;
    getUserProfileAPICallId: string;
    constructor(props: Props) {
        super(props);
        this.state = {
            activeTab: '1',
            showAlertPassword: false,
            passwordError: '',
            currentPasswordErr: '',
            confirmPasswordError: ''
        };
        this.subScribedMessages = [
            getName(MessageEnum.RestAPIResponceMessage),
            getName(MessageEnum.AccoutLoginSuccess),
            getName(MessageEnum.AlertMessage)
        ];
        this.receive = this.receive.bind(this);
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    };

    async receive(from: String, message: Message) {
        runEngine.debugLog('Message Received', message);
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
            if (apiRequestCallId === this.getUserProfileAPICallId) {
                if (responseJson && responseJson.data) {
                    this.setState({
                        ...this.state,
                        loading: false,
                        getUserDeatils: responseJson.data,
                        newProfileImgBase64: responseJson.data && responseJson.data.attributes && responseJson.data.attributes.image_url
                    });
                    let dat = {
                        'name': responseJson.data && responseJson.data.attributes && responseJson.data.attributes.full_name,
                        'email': responseJson.data && responseJson.data.attributes && responseJson.data.attributes.email
                    };
                    //@ts-ignore
                    localStorage.setItem('userData', JSON.stringify(dat));
                    localStorage.setItem('user', JSON.stringify(responseJson.data));
                    localStorage.setItem('profileImage', responseJson.data.attributes.image_url);
                    this.props.updateProfile();
                } else {
                    this.parseApiErrorResponse(responseJson);
                }
            }
            else if (apiRequestCallId === this.updateProfilePasswrdAPICallId) {
                if (responseJson && responseJson.message) {
                    this.setState({
                        ...this.state,
                        loading: false,
                        isPasswordUpdated: true,
                        isChangePassword: false,
                        showSpinner: false
                    });
                    // @ts-ignore
                    window.notify([{ message: responseJson.message || 'something went wrong!!!', type: "success" }]);
                }
                if (responseJson && responseJson.errors && responseJson.errors.length > 0) {
                    console.log("I am coming", this.state);
                    this.setState({
                        ...this.state,
                        showSpinner: false,
                        showAlertPassword: true,
                        loading: false,
                        messageType: responseJson.errors[0].message ? 'danger' : '',
                        message: responseJson.errors[0].message
                    });
                    // @ts-ignore
                    window.notify([{ message: responseJson.errors[0].message || 'something went wrong!!!', type: "danger" }]);
                }
                else {
                    this.parseApiErrorResponse(responseJson);
                }
            }
            else if (apiRequestCallId === this.updateProfileAPICallId) {
                if(responseJson && responseJson.message){
                    this.setState({
                        loading:false,
                        showSpinner: false,
                    });
                    // @ts-ignore
                    window.notify([{ message: responseJson.message || 'something went wrong!!!', type: "danger" }]);
                }
                if (responseJson && responseJson.data) {
                    if (responseJson && responseJson.data && responseJson.meta) {
                        this.setState({
                            ...this.state,
                            loading: false,
                            userDetails: responseJson.data,
                            editProfile: false,
                            showSpinner: false,
                        });
                        // @ts-ignore
                        window.notify([{ message: responseJson.meta.message || 'something went wrong!!!', type: "success" }]);
                        this.getUserProfileHandler();
                    };
                } else {
                    this.parseApiErrorResponse(responseJson);
                }
            }
        }
        else if (getName(MessageEnum.AlertMessage) === message.id) {
            const title = message.getData(
                getName(MessageEnum.AlertTitleMessage)
            );
            let AlertBodyMessage = message.getData(
                getName(MessageEnum.AlertBodyMessage)
            );
        }
    };
    //update userProfile Password
    updatePasswordHandler = (values: any) => {
        this.setState({
            ...this.state,
            loading: true,
            showSpinner: true
        });
        const token = localStorage.getItem("token");
        const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));

        this.updateProfilePasswrdAPICallId = requestMessage.messageId;
        requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.updateProfilePasswordAPIEndPoint);

        const headers = {
            'content-type': 'application/json'
        };
        const requestBody = {
            token,
            "data": {
                "current_password": values.currentPassword,
                "password": values.newPassword,
                "password_confirmation": values.confirmPassword
            }
        };

        requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(headers));
        requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(requestBody));
        requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiPutMethod);

        runEngine.sendMessage(requestMessage.id, requestMessage);
    };
    //update userProfile Details
    updateProfileHandler = (values: any) => {
        this.setState({
            ...this.state,
            loading: true,
            showSpinner: true
        });
        const token: any = localStorage.getItem("token");
        const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
        this.updateProfileAPICallId = requestMessage.messageId;
        requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.updateProfileAPIEndPoint);

        const headers = {
        };
        let formData = new FormData();
        formData.append('token', token);
        formData.append(`data[full_name]`, values.name);
        formData.append(`data[email]`, values.email);
        formData.append(`data[full_phone_number]`, values.phone);
        //@ts-ignore
        this.state.removeClicked && this.state.newProfileImgBase64 == '' ? formData.append(`data[remove_profile]`, true) : ''
        // formData.append(`data[image]`, this.state.newProfileImgBase64 && this.state.newProfileImgBase64);
        this.state.isNewImageAdded && this.state.newProfileImgBase64 ? formData.append(`data[image]`, this.state.newProfileImgBase64) : ''

        requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(headers));
        requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), formData);
        requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiPutMethod);

        runEngine.sendMessage(requestMessage.id, requestMessage);
    };
    //get userProfile Details
    getUserProfileHandler = () => {
        this.setState({
            ...this.state,
            loading: true,
        });
        const token = localStorage.getItem("token");
        const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));

        this.getUserProfileAPICallId = requestMessage.messageId;
        requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.getProfileDetails);

        const headers = {
            'Content-Type': 'application/json',
            token
        }
        requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), headers);
        requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiGetMethod);

        runEngine.sendMessage(requestMessage.id, requestMessage);
    };
};