import { BackHandler } from "react-native";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import StorageProvider from "../../../framework/src/StorageProvider";

export const configJSON = require("./config");

// Customizable Area Start
// Customizable Area End

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  faqList: any;
  isFetching: boolean;
  isShowError: boolean;
  showAlertModal: boolean;
  message: any;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class InteractivefaqController extends BlockComponent<
  Props,
  S,
  SS
> {
  getFAQDataApiCallId: any;
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
      faqList: [],
      isFetching: false,
      isShowError: false,
      showAlertModal: false,
      message: undefined
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
      this.getFAQData();
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
    runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
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
        if (apiRequestCallId === this.getFAQDataApiCallId) {
          this.getFAQListSuccessCallBack(responseJson.data);
          // Customizable Area Start
          // Customizable Area End
        }
      } else if (responseJson && responseJson.errors) {
        if (apiRequestCallId === this.getFAQDataApiCallId) {
          this.getFAQListFailureCallBack(responseJson);
          // Customizable Area Start
          // Customizable Area End
        }
        this.setState({
          isFetching: false
          // Customizable Area Start
          // Customizable Area End
        });
      } else if (errorReponse) {
        this.setState({ isFetching: false });
        // Customizable Area Start
        // Customizable Area End
      }
    }
    // Customizable Area Start
    // Customizable Area End
  }

  apiCall = async (data: any) => {
    const { contentType, method, endPoint, body } = data;
    const token = (await StorageProvider.get("Userdata")) || "";
    const header = {
      "Content-Type": contentType,
      token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );
    body &&
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
      );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  };

  getFAQData = async () => {
    this.getFAQDataApiCallId = await this.apiCall({
      contentType: configJSON.faqApiApiContentType,
      method: configJSON.httpGetMethod,
      endPoint: configJSON.getFAQApiEndPoint
    });
  };

  getFAQListSuccessCallBack = (res: any) => {
    let localCategoryList: any = [];
    this.setState({ faqList: res.faqs }, () => {
      this.state.faqList.map((item: any) => {
        let localItem = item;
        localItem.isExpanded = false;
        localCategoryList.push(localItem);
      });
    });
    this.setState({ faqList: localCategoryList });
  };

  getFAQListFailureCallBack = (error: any) => {
    if (error) {
      setTimeout(() => {
        this.setState({
          message: this.parseApiErrorResponse(error),
          isShowError: true,
          showAlertModal: true,
          isFetching: false
        });
      }, 0);
    } else {
      setTimeout(() => {
        this.setState({
          message: "Network Error!",
          isShowError: true,
          showAlertModal: true,
          isFetching: false
        });
      }, 0);
    }
  };

  onPressExpandableView = (item: any, _: any) => {
    let localFAQList = this.state.faqList;
    let selectedIndex = localFAQList.findIndex(
      (catItem: any) => catItem.id === item.id
    );
    localFAQList[selectedIndex].isExpanded = !item.isExpanded;
    this.setState({ faqList: localFAQList });
  };

  // Customizable Area Start
  // Customizable Area End
}
