import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// import { imgPasswordInVisible, imgPasswordVisible } from "../assets";
// Customizable Area End

export const configJSON = require("../config");

export interface Props {
  navigation: any;
  id: string;
  history: any;
  confirm: any;
  toggle: any;
  headerMessage: string;
  bodyMessage: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  modal: boolean;
  deleteorder: boolean;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class ModalController extends BlockComponent<
  Props,
  S,
  SS
  > {

  // Customizable Area Start
  apiEmailLoginCallId: string = "";
  validationApiCallId: string = "";
  emailReg: RegExp;
  labelTitle: string = "";
  // Customizable Area End

  constructor(props: Props) {

    super(props);
    this.receive = this.receive.bind(this);
    this.toggle = this.toggle.bind(this);
    this.ConfirmDelete = this.ConfirmDelete.bind(this);
    this.routeToshop = this.routeToshop.bind(this);
    
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials)
    ]

    this.state = {
      modal: true,
      deleteorder: false
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async componentDidMount() {
    // this.callGetValidationApi();
    this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start


  // Customizable Area End

  async receive(from: string, message: Message) {

    // Customizable Area Start

    // Customizable Area End
  }

  routeToshop = () => {
    this.props.history.push("/shop");
  };

  toggle() {
    // this.setState({ modal: !this.state.modal });
    this.props.toggle();
  }

  ConfirmDelete = () => {
    this.props.confirm()
    
    // commands.orders.cancelOrder({ ...order, onSuccess: () => { SetDelete(true); props.getOrders(); } });

    /*
    SetDelete(!deleteorder);
    setTimeout(function() {
      setModal(!modal);
      return "Deleted";
    }, 3000);
    */
  };
}
