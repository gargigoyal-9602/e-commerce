import { IBlock } from "../../../../framework/src/IBlock";
import { Message } from "../../../../framework/src/Message";
import { BlockComponent } from "../../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";

import { runEngine } from "../../../../framework/src/RunEngine";
import parse from 'html-react-parser';
// @ts-ignore
import map from "lodash/map";

// Customizable Area Start
// import { imgPasswordInVisible, imgPasswordVisible } from "../assets";
// Customizable Area End

export const configJSON = require("../config");

export interface Props {
  navigation: any;
  id: string;
  history: any;
  match: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  content: any;
  loading: boolean;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class AboutUsController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  getHelpCenterCallID: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials)
    ]

    this.state = {
      content: "",
      loading: true,
    };

    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }



  async componentDidMount() {

    this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    this.getHelpceterData();
    window.scrollTo(0, 0);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  // Customizable Area End

  async receive(from: string, message: Message) {

    // Customizable Area Start
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJSON = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      const errorMessage = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

      if (this.getHelpCenterCallID === apiRequestCallId) {
        this.setState({ loading: false });

        if (responseJSON?.errors) {
          map(responseJSON.errors, (error: any) => {
            map(error, (value: any, key: any) => {
              // @ts-ignore
              window.notify([{ message: value || "Something went wrong!!!", type: "danger" }])
            })
          })
        }

        if (responseJSON?.data) {
          map(responseJSON.data, (d: any) => {
            if (d.attributes.help_center_type === "About Us") {
              this.setState({ content: parse(d.attributes.description) })
            }
          })
        }
      }
    }
    // Customizable Area End
  }

  getHelpceterData() {
    const header = {
      "Content-Type": "application/json"
    }

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getHelpCenterCallID = requestMessage.messageId;
    // Set Method Type
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.httpGetMethod)
    // Set EndPoints
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.helpCenterAPIEndPoint);
    // set Headers 
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

}
