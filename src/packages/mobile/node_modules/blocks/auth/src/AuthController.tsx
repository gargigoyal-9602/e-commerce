import { BackHandler } from "react-native";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
// import MessageEnum, {
//     getName
// } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// Customizable Area End

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  button2: boolean;
  button1: boolean;
  currentindex: number;
  fromCart: boolean;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class AuthController extends BlockComponent<Props, S, SS> {
  _unsubscribe: any;
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);

    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      button2: true,
      button1: false,
      currentindex: 1,
      fromCart:
        props.navigation.getParam("fromCart")
          ? true
          : false
      // Customizable Area Start
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    this._unsubscribe = this.props.navigation.addListener("willFocus", () => {
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.handleBackButtonClick
      );
    });
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
    BackHandler.exitApp();
    return true;
  };

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    // Customizable Area End
  }

  stateChange = (num: number) => {
    // Customizable Area Start
    if (num === 0) {
      this.setState({
        button1: true,
        button2: false
      });
    } else {
      this.setState({
        button2: true,
        button1: false
      });
    }
    // Customizable Area End
  };
  // Customizable Area Start
  // Customizable Area End
}
