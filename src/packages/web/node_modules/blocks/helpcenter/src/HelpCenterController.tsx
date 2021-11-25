import { BackHandler } from "react-native";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  helpCenterList: any;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class HelpCenterController extends BlockComponent<Props, S, SS> {
  getHelpCenterApiCallId: any;
  _unsubscribe: any;
  // Customizable Area Start
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage)
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      helpCenterList: []
      // Customizable Area Start
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    this.getHelpCenterList();
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    // Customizable Area Start
    // Customizable Area End
  }

  async componentWillUnmount() {
    super.componentWillUnmount();
    this._unsubscribe.remove();
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    // Customizable Area Start
    // Customizable Area End
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  };

  async receive(from: string, message: Message) {

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (responseJson && responseJson.data) {
        if (apiRequestCallId === this.getHelpCenterApiCallId) {
          let arr = this.state.helpCenterList.concat(responseJson.data);
          this.setState({ helpCenterList: arr });
        }

        // Customizable Area Start   
        // Customizable Area End

      } else if (responseJson && responseJson.errors) {
        this.parseApiErrorResponse(responseJson);
        this.parseApiCatchErrorResponse(responseJson.errors);
        // Customizable Area Start   
        // Customizable Area End
      } else if (errorReponse) {
        this.parseApiErrorResponse(responseJson);
        this.parseApiCatchErrorResponse(errorReponse);
        // Customizable Area Start   
        // Customizable Area End
      }
    }
    // Customizable Area Start   
    // Customizable Area End
  }

  getHelpCenterList = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getHelpCenterApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.helpCenterApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GetMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  // Customizable Area Start   
  // Customizable Area End

}
