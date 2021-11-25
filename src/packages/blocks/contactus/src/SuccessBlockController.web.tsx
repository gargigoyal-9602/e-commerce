import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// Customizable Area End

// export const configJSON = require("./config");

export interface Props {
  title: string;
  message: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class SuccessBlockController extends BlockComponent<Props, S, SS> {
  contactUsApiCallId: any;
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
      
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
  }

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // runEngine.debugLog("Message Recived", message);

   
    // Customizable Area End
  }

  // Customizable Area Start
 

  // Customizable Area End
}
