import { BlockComponent } from "../../../../framework/src/BlockComponent";
import { IBlock } from "../../../../framework/src/IBlock";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import axios from "axios";
// @ts-ignore
import map from "lodash/map";
//@ts-ignore
import StroageProvider from "../../../../framework/src/StorageProvider.web";
// Customizable Area Start
// Customizable Area End

export const configJSON = require("../config");

export interface Props {
  navigation: any;
  history: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  showPass: boolean;
  showConfirmPass: boolean;
  message: string;
  invalidPass: string;
  showSpinner: boolean;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  navigation: any;
  // Customizable Area End
}

// Customizable Area Start

// Customizable Area End

export default class ForgotPasswordController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  validationAPICallId: any;
  resetPasswordAPICallId: string = "";

  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.CountryCodeMessage)
      // Customizable Area End
    ];

    this.receive = this.receive.bind(this);

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start

    this.state = {
      showPass: false,
      showConfirmPass: false,
      message: "",
      invalidPass: "",
      showSpinner: false
    };
    // Customizable Area End
  }

  async componentDidMount() {
  }


  async receive(from: string, message: Message) {
    runEngine.debugLog('Message Received', message);
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      let apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (apiRequestCallId === this.resetPasswordAPICallId) {
        if (responseJson) {
          this.setState({ showSpinner: false });
          this.setState({ invalidPass: "" })
          localStorage.setItem("token", "");
          this.props.history.push("/login");
          if (responseJson?.data?.meta) {
            // @ts-ignore
            window.notify([{ message: responseJson?.data?.meta?.message, type: "success" }])
          }
        }
        if (responseJson && responseJson.errors && responseJson.errors.length > 0) {
          this.setState({ showSpinner: false });
          //@ts-ignore
          window.notify([{ type: 'danger', message: responseJson.errors[0].email || 'Something Went Wrong!' }])
        }
      }
    }
    else {

    }
  }

  setNewPass = async (values: any) => {
    console.log(values);
    const token = await localStorage.getItem('token');
    // const token = localStorage.getItem("token");
    // setShowSpinner(true);
    this.setState({ showSpinner: true });
    let data = {
      token,
      data: {
        password: values.password,
        password_confirmation: values.confirmpassword
      }
    }
    return this.handleResetPassword(data);
  };




  showPassword = (e: any) => {
    e.preventDefault();
    // setShowPass(!showPass);
    this.setState({ showPass: !this.state.showPass })
  };
  showConfirmPassword = (e: any) => {
    e.preventDefault();
    this.setState({ showConfirmPass: !this.state.showConfirmPass })
    // setConfirmPass(!showConfirmPass);
  };

  //Reset Password 
  handleResetPassword = async (data: any) => {
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.resetPasswordAPICallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.resetPasswordAPIEndPoint);

    const headers = {
      'Content-Type': 'application/json'
    };

    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(headers));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(data));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.httpPutMethod);

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

}
