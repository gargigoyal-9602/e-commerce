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
  faqData: any;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class HelpCenterDataController extends BlockComponent<
  Props,
  S,
  SS
> {
  getFaqApiCallId: any;
  getUserProfileApiCallId: any;
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
      faqData: null,
      // Customizable Area Start   
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start   
    // Customizable Area End
  }
  async componentDidMount() {
    this.getFaqData();
  }
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
        if (apiRequestCallId === this.getFaqApiCallId) {
          this.setState({ faqData: responseJson.data.faqs });
          // Customizable Area Start   
          // Customizable Area End
        }
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
  expand = (id: string) => {
    let array = this.state.faqData;
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        array[i].expand = !array[i].expand;
      }
    }
    this.setState({ faqData: array });
  };


  getFaqData = () => {
    const header = {
      "Content-Type": configJSON.ApiContentType
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getFaqApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.faqAPiEndPoint
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
