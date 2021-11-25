import { BackHandler } from "react-native";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import StorageProvider from "../../../framework/src/StorageProvider";

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
  // Customizable Area Start
  isFetching: boolean;
  showAlertModal: boolean;
  isShowError: boolean;
  message: any;
  cartData: any;
  reviewList: any,
  ratingList: any,
  cartHasProduct: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class ReviewListController extends BlockComponent<
  Props,
  S,
  SS
> {
  getReviewListAPICallID: any;
  _unsubscribe: any;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage)
    ];

    this.state = {
      reviewList: [],  
      ratingList: [1,1,1,1,1],
      isFetching: true,
      showAlertModal: false,
      isShowError: false,
      message: "",
      cartData: null,
      cartHasProduct: false
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("willFocus", () => {
        this.getReviewListData();
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.handleBackButtonClick
      );
    });
  }

  handleBackButtonClick = () => {
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.isFromPlaced
    ) {
      this.props.navigation.replace("MainNavigator");
      return true;
    } else {
      this.props.navigation.goBack();
      return true;
    }
  };

  async componentWillUnmount() {
    this._unsubscribe.remove();
    runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
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
        if (apiRequestCallId === this.getReviewListAPICallID) {
          this.getReviewListSuccessCallBack(responseJson.data);
        }
      } else if (responseJson && responseJson.errors) {
        if (apiRequestCallId === this.getReviewListAPICallID) {
          this.getReviewListFailureCallBack(responseJson);
        }
      } else if (errorReponse) {
        setTimeout(() => {
          this.setState({
            isFetching: false
          });
        }, 0);
      }
    }
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

  getReviewListData = async () => {
    this.setState({ isFetching: true });
    let productId = this.props.navigation.state.params.productData.id;
    this.getReviewListAPICallID = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: `${configJSON.getReviewListAPIEndPoint}?id=${productId}`
    });
  };

  getReviewListSuccessCallBack = (res: any) => {
    this.setState({ reviewList: res, isFetching: false })
  }

  getReviewListFailureCallBack = (error: any) => {
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
  }
}
