//@ts-nocheck;
import React from 'react';
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { log } from 'console';
export const configJSON = require('./config');


export interface Props {
    // Customizable Area Start
    // Customizable Area End
};

interface S {
    activeTab?: any;
    addingNewAddressCheck?: boolean;
    isDeleteAddressCheck?: boolean;
    addressIndex?: number;
    editAddressChecked?: boolean;
    userAddedAddressDeatails?: any;
    userToken?: any;

    //get all deliveryAddress list
    userAddress?: Array<any>;

    //edit /delete deliveryAddress data
    deliveryAddressID?: number;
    defaultAddressCheck?: boolean;
    deleteAddressId?: number;
    defaultAddressID?: number

    //default address popup
    isDefaultAddressChanged?: boolean;

    loading?: boolean;
    showSpinner?: boolean;

    countryName?: string;
};

interface SS {
    id: any;
};



export default class AddressController extends BlockComponent<Props, S, SS>{
    addNewAddressAPICallId: string;
    getUserDeliveryAddressAPICallId: string;
    updateDeliveryAddressByIdAPICallId: string;
    deleteDeliveryAddressByIdAPICallId: string;
    changeDefaultAddressAPICallId: string;
    constructor(props: Props) {
        super(props);
        this.subScribedMessages = [
            getName(MessageEnum.AccoutLoginSuccess),
            getName(MessageEnum.AlertMessage),
            getName(MessageEnum.RestAPIResponceMessage),
        ];
        this.state = {
        };
        this.receive = this.receive.bind(this);
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    };
    async receive(from: string, message: Message) {
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
            if (apiRequestCallId === this.addNewAddressAPICallId) {
                if (responseJson && responseJson.data) {
                    this.setState({
                        ...this.state,
                        loading: false,
                        userAddedAddressDeatails: responseJson.data,
                        addingNewAddressCheck: false,
                        showSpinner: false,
                    });
                    // @ts-ignore
                    window.notify([{ message: 'Address Added Successfully !' || "Something went wrong!!!", type: "success" }]);

                    this.getDeliveryAddressList();
                }
            }
            else if (apiRequestCallId === this.getUserDeliveryAddressAPICallId) {
                if (responseJson && responseJson.data) {
                    this.setState({
                        ...this.state,
                        loading: false,
                        userAddress: responseJson.data,
                        defaultAddressCheck: responseJson.data.attributes && responseJson.data.attributes.is_default,
                        deliveryAddressID: responseJson.data.atrributes && responseJson.data.attributes.id
                    });
                } else {
                    this.parseApiErrorResponse(responseJson);
                }
            }
            else if (apiRequestCallId === this.deleteDeliveryAddressByIdAPICallId) {
                if (responseJson) {
                    this.setState({
                        loading: false,
                        isDeleteAddressCheck: false
                    });
                    // @ts-ignore
                    window.notify([{ message: responseJson.message || "Something went wrong!!!", type: "success" }]);

                    this.getDeliveryAddressList();
                }
            }
            else if (apiRequestCallId === this.updateDeliveryAddressByIdAPICallId) {
                if (responseJson && responseJson.data) {
                    this.setState({
                        ...this.state,
                        loading: false,
                        editAddressChecked: false,
                        showSpinner: false,
                    });
                    // @ts-ignore
                    window.notify([{ message: 'Address Updated Successfully !' || "Something went wrong!!!", type: "success" }]);

                    this.getDeliveryAddressList();
                }
            }
            else if (apiRequestCallId === this.changeDefaultAddressAPICallId) {
                if (responseJson && responseJson.data) {
                    this.setState({
                        loading: false,
                        defaultAddressID: responseJson.data.id
                    });
                    // @ts-ignore
                    window.notify([{ message: 'Address Updated Successfully !' || "Something went wrong!!!", type: "success" }]);

                    this.getDeliveryAddressList();
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
    //add a new address
    addNewAddressHandler = (values: any) => {
        this.setState({
            ...this.state,
            loading: true,
            showSpinner: true
        });
        const token = localStorage.getItem("token");
        const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
        const headers = {
            'Content-Type': 'application/json',
            token
        };
        let addressData = values.addressLine1;
        addressData = addressData + values.addressLine2;
        const checkingExistedData = this.state.userAddress && this.state.userAddress.length > 0 ? false : true;
        let requestBody = {
            "address": {
                "name": values.name,
                "flat_no": values.doorNo,
                "address": values.addressLine1,
                "address_line_2": values.addressLine2,
                "city": values.city,
                "state": values.state,
                "country": values.country,
                "zip_code": values.pinCode,
                "phone_number": values.phone,
                "is_default": checkingExistedData
            }
        }

        this.addNewAddressAPICallId = requestMessage.messageId;
        requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.createNewAddressAPIEndPoint);
        requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(headers));
        requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(requestBody));
        requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiPostMethod);

        runEngine.sendMessage(requestMessage.id, requestMessage);
    }
    //update a address based on Id
    updateAddressBasedonId = (values: any, id: any) => {
        this.setState({
            ...this.state,
            loading: true,
            showSpinner: true
        });
        const token = localStorage.getItem("token");
        const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
        this.updateDeliveryAddressByIdAPICallId = requestMessage.messageId;

        requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.editUserDeliveryAddressByIdAPIEndPoint + "/" + id);

        const headers = {
            'Content-Type': 'application/json',
            token
        };

        let addressData = values.addressLine1;
        addressData = addressData + values.addressLine2;
        const requestBody = {
            "address": {
                "name": values.name,
                "flat_no": values.doorNo,
                "address": values.addressLine1,
                "address_line_2": values.addressLine2,
                "city": values.city,
                "state": values.state,
                "country": values.country,
                "zip_code": values.pinCode,
                "phone_number": values.phone,
                "is_default": this.state.defaultAddressID == id ? true : false
            }
        };

        requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), headers);
        requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(requestBody));
        requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiPutMethod);

        runEngine.sendMessage(requestMessage.id, requestMessage);
    };
    //get a delivery address by user Id
    getDeliveryAddressList = () => {
        this.setState({
            ...this.state,
            loading: true
        });
        const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
        const token = localStorage.getItem("token");

        this.getUserDeliveryAddressAPICallId = requestMessage.messageId;
        requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.getUserDeliveryAddressAPIEndPoint);

        const headers = {
            'Content-Type': 'application/json',
            token
        };

        requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), headers);
        requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiGetMethod);

        runEngine.sendMessage(requestMessage.id, requestMessage);
    };
    //delete a address based on Id
    deleteAddressBasedOnId = () => {
        this.setState({
            ...this.state,
            loading: true,
        });
        const token = localStorage.getItem("token");
        const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
        this.deleteDeliveryAddressByIdAPICallId = requestMessage.messageId;
        requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.deleteUserDeliveryAddressByIdAPIEndPoint + "/" + this.state.deleteAddressId);

        const headers = {
            'Content-Type': 'application/json',
            token
        };

        requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), headers);
        requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiDeleteMethod);

        runEngine.sendMessage(requestMessage.id, requestMessage);
    };
    //handling address as default
    handleDefaultAddress = (id: any) => {
        this.setState({
            // ...this.state,
            loading: true,
            defaultAddressID: id
        });
        const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
        const token = localStorage.getItem("token");

        this.changeDefaultAddressAPICallId = requestMessage.messageId;
        requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.changeDefaultAddressByIDAPIEndpoint + '/' + id);

        const headers = {
            'Content-Type': 'application/json',
            token
        };
        const requestBody = {
            "address":
            {
                "is_default": true
            }
        };

        requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), headers);
        requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiPutMethod);
        requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(requestBody));

        runEngine.sendMessage(requestMessage.id, requestMessage);
    };

};