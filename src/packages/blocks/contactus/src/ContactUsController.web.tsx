import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// @ts-ignore
import map from "lodash/map";

export const configJSON = require("./config");

export interface Props {
    navigation: any;
    id: string;
    // Customizable Area Start
    // Customizable Area End
}

interface S {
    // Customizable Area Start
    values: any,
    messageSent: boolean;
    sending: boolean;

    //localStorgae data
    userDetails?: any;
    loading: boolean;

    // Customizable Area End
}

interface SS {
    id: any;
}

export default class ContactusController extends BlockComponent<Props, S, SS> {
    deleteContactApiCallId: any;
    addContactApiCallId: any;
    constructor(props: Props) {
        super(props);
        this.receive = this.receive.bind(this);

        // Customizable Area Start
        this.subScribedMessages = [
            getName(MessageEnum.SessionResponseMessage),
            getName(MessageEnum.RestAPIResponceMessage)
        ];

        this.state = {
            values: undefined,
            messageSent: false,
            sending: false,
            loading: false,
            //@ts-ignore
            userDetails: JSON.parse(localStorage.getItem('user'))
        };

        // Customizable Area End
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    }

    async componentDidMount() {

    }

    async receive(from: string, message: Message) {
        // Customizable Area Start
        runEngine.debugLog("Message Recived", message);
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
            if (apiRequestCallId === this.addContactApiCallId) {
                this.setState({ loading: false });
                if (responseJson && responseJson.data) {
                    this.setState({
                        messageSent: true
                    });
                    // @ts-ignore
                    window.notify([{ type: "success", message: "Thank you for contact us !!!" }])
                } else if (responseJson && responseJson.errors) {
                    if (responseJson?.request?.response && responseJson?.request?.status !== 0) {
                        let response = JSON.parse(responseJson.request.response);
                        map(response?.errors, (errorMesage: any) => {
                            map(errorMesage, (val: any, key: any) => {
                                console.log(key)
                                // @ts-ignore
                                window.notify([{ message: val || "Something went wrong", type: "danger" }]);
                            })
                        })
                    }
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
            // Customizable Area End
        }
    }

    //submitting contact us form
    submitContactusForm(values: any) {
        this.setState({ loading: true });
        const token = localStorage.getItem("token");
        const GuestUserData = localStorage.getItem('guestUUID');
        let requestBody;

        //@ts-ignore
        const userData = JSON.parse(localStorage.getItem('user'));
        const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
        this.addContactApiCallId = requestMessage.messageId;
        requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.saveContactUsApiEndPoint);

        const headers = {
            'Content-Type': 'application/json',
            token
        };
        if (GuestUserData) {
            requestBody = {
                "data": {
                    "attributes": {
                        "name": values.name,
                        "phone_number": values.phone,
                        "email": values.email,
                        "description": values.message,
                    }
                }
            }
        } else {
            requestBody = {
                "data": {
                    "attributes": {
                        "name": values.name,
                        "phone_number": values.phone,
                        "email": values.email,
                        "description": values.message,
                        "account_id": userData.id
                    }
                }
            };
        }
        requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), headers);
        requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(requestBody));
        requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.PostMethodType);
        runEngine.sendMessage(requestMessage.id, requestMessage);
    };

}
