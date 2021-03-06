//@ts-nocheck;
import React from 'react';
import { } from 'react-router-dom';
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import firebase from 'firebase';
import { resultsAriaMessage } from 'react-select/src/accessibility';
export const configJSON = require('./config');

export interface Props {

    // Customizable Area Start
    // Customizable Area End
};

interface S {
    isFacebookConnceted?: boolean;
    isGoogleCoonected?: boolean;
    googleUserName?: any;
    facebookUserName?: any;
    googleId?: any;
    fbId?: any;

    //get user & social data
    userProfileDetails?: any;

    //modal data
    isModalOpen?: boolean;
    modalTitle?: any;
    modalContent?: any;
    modalId?: any;
    modalSocialType?: string;

    //localStorage user Data
    userData?: any;
    userToken?: any;

    //social accounts suucess data
    socialAccountResult?: any;
    googleSocialAccountResult?: any;
    facebookSocialAccountResult?: any;

    //alert
    showAlert?: boolean;
    alertType?: string;
    alertMessage?: string;

    loading?: boolean;
};

interface SS {
    id: any;
}

export default class ConnnectedAccountsController extends BlockComponent<Props, S, SS>{
    getAllSocialAccountlistAPiCallId: string;
    deActivateSocialAccountAPiCallId: string;
    conncetToSocialAccountAPiCallId: string;
    constructor(props: Props) {
        super(props);
        this.state = {
            // isFacebookConnceted: true
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
            if (apiRequestCallId === this.getAllSocialAccountlistAPiCallId) {
                if (responseJson && responseJson.data && responseJson.data.social_accounts && responseJson.data.social_accounts.data.length > 0) {
                    let socialDetails = responseJson.data.social_accounts.data;
                    let googleActive = false, googlenmae = '', facebookactive = false, fbName = '', gId = '', fbid = '';
                    socialDetails.map((ele: any, index: number) => {
                        if (ele.attributes.provider == 'google') {
                            googleActive = true;
                            googlenmae = ele.attributes.display_name;
                            gId = ele.id
                        }
                        if (ele.attributes.provider == 'facebook') {
                            facebookactive = true;
                            fbName = ele.attributes.display_name;
                            fbid = ele.id
                        }
                    });
                    this.setState({
                        userProfileDetails: responseJson.data.account && responseJson.data.account.data,
                        isFacebookConnceted: facebookactive,
                        isGoogleCoonected: googleActive,
                        facebookUserName: fbName,
                        googleUserName: googlenmae,
                        googleId: gId,
                        fbId: fbid,
                        loading: false
                        // socialAccountDataList: responseJson.data.social_accounts.data && responseJson.data.social_accounts.data
                    });
                    console.log("thi.state,", this.state);
                }
                if (responseJson && responseJson.data && responseJson.data.social_accounts && responseJson.data.social_accounts.data.length == 0) {
                    this.setState({
                        userProfileDetails: responseJson.data.account && responseJson.data.account.data,
                        isFacebookConnceted: false,
                        isGoogleCoonected: false,
                        facebookUserName: '',
                        googleUserName: '',
                        googleId: '',
                        fbId: '',
                        loading: false
                    });
                    console.log("thi.state,", this.state);
                }
                else {
                    this.parseApiErrorResponse(responseJson);
                }
            }
            else if (apiRequestCallId === this.conncetToSocialAccountAPiCallId) {
                if (responseJson && responseJson.data && responseJson.data.account && responseJson.data.social_account) {
                    const { account_id, display_name, provider, uid } = responseJson.data.social_account && responseJson.data.social_account.data && responseJson.data.social_account.data.attributes;
                    this.setState({
                        ...this.state,
                        socialAccountResult: responseJson
                    });
                    //@ts-ignore
                    window.notify([{ type: 'success', message: `Successfully Connected to ${provider}` }])
                    this.getAllSocialAccountsList();
                }
                if (responseJson && responseJson.errors && responseJson.errors.length > 0) {
                    //@ts-ignore
                    window.notify([{ type: 'danger', message: responseJson.errors[0].social_auth }])
                }
            }
            else if (apiRequestCallId === this.deActivateSocialAccountAPiCallId) {
                if (responseJson && responseJson.data && responseJson.data.message) {
                    this.setState({
                        modalId: '',
                        modalContent: '',
                        modalTitle: '',
                        isModalOpen: false,
                        loading: false
                        // showAlert: true,
                        // alertType: responseJson.data.message == "Social account disconnected successfully" ? 'success' : '',
                        // alertMessage: responseJson.data.message
                    });
                    console.log("iam here")
                    this.getAllSocialAccountsList();

                    // @ts-ignore
                    window.notify([{ message: responseJson.data.message || "Something went wrong!!!", type: "success" }]);
                }
                if (responseJson && responseJson.errors && responseJson.errors.length > 0) {
                    // @ts-ignore
                    window.notify([{ message: responseJson.errors[0].social_auth || "Something went wrong!!!", type: "warning" }]);
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
    //get list connceted social accounts
    getAllSocialAccountsList = () => {
        this.setState({
            ...this.state,
            loading: true
        });
        const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
        this.getAllSocialAccountlistAPiCallId = requestMessage.messageId;
        requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.getAllSocialAccountsApiEndPoint);
        const token = localStorage.getItem("token");

        const headers = {
            'Content-Type': 'application/json',
            token
        }

        requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), headers);
        requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiGetMethod);

        runEngine.sendMessage(requestMessage.id, requestMessage);
    };
    //connect to social account based on unique-auth-id and social media name
    activateSocialAccount = (data: any, socialMediaName: string) => {
        const token = localStorage.getItem("token");
        const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));

        this.conncetToSocialAccountAPiCallId = requestMessage.messageId;
        requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.postActivateSocialAccountsAPIEndPoint);
        const headers = {
            'Content-Type': 'application/json',
            token
        };
        const requestBody =
        {
            "data": {
                "attributes": {
                    "display_name": data && data.user && data.user.displayName,
                    "provider": socialMediaName,
                    "unique_auth_id": data && data.user && data.user.uid,
                    "account_id": this.state.userData && this.state.userData.id
                }
            }
        };

        requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), headers);
        requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(requestBody));
        requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiPostMethod);

        runEngine.sendMessage(requestMessage.id, requestMessage);
    };
    //deActivate to social account based on socialId
    deActivateSocialAccount = () => {
        this.setState({
            ...this.state,
            loading: true
        });
        const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));

        this.deActivateSocialAccountAPiCallId = requestMessage.messageId;
        let id = this.state.modalId && this.state.modalId;
        requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.deleteActivateSocialAccountAPiEndPoint + '/' + id);

        const headers = {
            'Content-Type': 'application/json',
            'token': this.state.userToken && this.state.userToken
        };
        requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), headers);
        requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiDeleteMethod);

        runEngine.sendMessage(requestMessage.id, requestMessage);
    };
    //connect to google account
    connectGoogle = () => {
        const googleResult = new firebase.auth.GoogleAuthProvider();
        googleResult.addScope('profile');
        googleResult.addScope('email');
        firebase.auth().signInWithPopup(googleResult)
            .then(result => {
                console.log(result, "google result");
                if (result.credential && result.user && result.additionalUserInfo) {
                    let userName = result.user.displayName;
                    this.setState({
                        ...this.state,
                        googleSocialAccountResult: result,
                        isGoogleCoonected: true,
                        googleUserName: result.user.displayName
                    });
                    this.activateSocialAccount(result, 'google');
                }
            }).catch(err => {
                console.log("Googleerrr", err);
            });
    };
    //connect to facebook account
    connectFacebook = () => {
        const facebookResult = new firebase.auth.FacebookAuthProvider();
        facebookResult.addScope('email');
        // facebookResult.setCustomParameters({
        //   'display': 'popup'
        // })
        firebase.auth().signInWithPopup(facebookResult).then(result => {
            console.log(result, "facebook result");
            if (result.credential && result.user && result.additionalUserInfo) {
                this.setState({
                    ...this.state,
                    facebookSocialAccountResult: result,
                    isFacebookConnceted: true,
                    facebookUserName: result.user.displayName
                });
                this.activateSocialAccount(result, 'facebook');
            }
        }).catch(err => {
            console.log("facebookErr", err);
        })
    };
}