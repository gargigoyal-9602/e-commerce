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
  token: string;
  productList: any;
  noProductFound: boolean;
  customErrorModal: boolean;
  customErrorMessage: String;
  isFetching: boolean;
  cartProduct: any;
  cartLength: number;
  isShowError: boolean;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class WishListController extends BlockComponent<Props, S, SS> {
  _unsubscribe: any;
  getWishlistApiCallId: any;
  removeFromWishlistApiCallId: any;
  addToCartApiCallId: any;
  getCartProductId: any;
  getCartListId: any;
  // Customizable Area Start
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.unsubscribeMessages();
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      token: "",
      productList: [],
      noProductFound: false,
      customErrorModal: false,
      customErrorMessage: "",
      isFetching: false,
      cartProduct: null,
      cartLength: 0,
      isShowError: false
      // Customizable Area Start
      // Customizable Area End
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    this._unsubscribe = this.props.navigation.addListener("willFocus", () => {
      this.getToken();
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.handleBackButtonClick
      );
    });
    // Customizable Area Start
    // Customizable Area End
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  };

  async componentWillUnmount() {
    super.componentWillUnmount();
    this._unsubscribe.remove();
    // Customizable Area Start
    // Customizable Area End
  }
  getToken = async () => {
    const token = await StorageProvider.get("Userdata");
    this.setState({ token: token });
    this.getListRequest();
    this.getCartHasProduct();
    this.getCartList();
  };

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

  async receive(from: string, message: Message) {

    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token });
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
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
        if (apiRequestCallId === this.getWishlistApiCallId) {
          let array = responseJson.data.wishlist.data.attributes.wishlist_items;
          if (array.length > 0) {
            this.setState({
              productList: array,
              noProductFound: false,
              isFetching: false
            });
          } else {
            this.setState({
              productList: array,
              noProductFound: true,
              isFetching: false
            });
          }
        } else if (apiRequestCallId === this.removeFromWishlistApiCallId) {
          this.getListRequest();
          this.setState({
            customErrorModal: true,
            isFetching: false,
            isShowError: true,
            customErrorMessage: responseJson.message
          });
        } else if (apiRequestCallId === this.getCartProductId) {
          this.setState({ cartProduct: responseJson.data.has_cart_product, isFetching: false });
        } else if (apiRequestCallId === this.getCartListId) {
          let array = responseJson.data;
          this.setState({ cartLength: array.length, isFetching: false });
        } else if (apiRequestCallId === this.addToCartApiCallId) {
          this.getCartHasProduct();
          this.setState({ isFetching: false });
        }
        // Customizable Area Start
        // Customizable Area End
      } else if (responseJson.message) {
        if (apiRequestCallId === this.removeFromWishlistApiCallId) {
          this.getListRequest();
          this.setState({
            customErrorModal: true,
            isFetching: false,
            isShowError: true,
            customErrorMessage: responseJson.message
          });
        } else if (apiRequestCallId === this.getWishlistApiCallId) {
          this.setState({
            noProductFound: true,
            customErrorModal: true,
            isFetching: false,
            isShowError: true,
            customErrorMessage: responseJson.message
          });
        }
        // Customizable Area Start
        // Customizable Area End
      } else if (responseJson && responseJson.errors) {
        this.setState({ isFetching: false });
        this.parseApiErrorResponse(responseJson);
        // Customizable Area Start
        // Customizable Area End
      } else if (errorReponse) {
        this.setState({ isFetching: false });
        this.parseApiCatchErrorResponse(errorReponse);
        // Customizable Area Start
        // Customizable Area End
      }
    }
    // Customizable Area Start
    // Customizable Area End
  }

  onHeartPress = (id: any) => {
    this.setState({ isFetching: true });
    const header = {
      "Content-Type": configJSON.ApiContentType,
      token: this.state.token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.removeFromWishlistApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getWishlistApiEndPoint + "/remove_catalogue/" + id
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.DeleteMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  getListRequest = async () => {
    this.setState({ isFetching: true });

    this.getWishlistApiCallId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.GetMethodType,
      endPoint: configJSON.getWishlistApiEndPoint
    });
  };

  addToCart = async (item: any) => {
    const data = this.state.cartProduct;
    runEngine.debugLog("add to cart item", item.item.data.attributes.id.data);
    const httpBody = {
      catalogue_id: item.item.data.attributes.id.data.id,
      catalogue_variant_id:
        item.item.data.attributes.id.data.attributes.catalogue_variants[0].id,
      quantity: 1
    };

    this.setState({ isFetching: true });
    if (data.has_cart_product) {
      this.addToCartApiCallId = await this.apiCall({
        contentType: configJSON.ApiContentType,
        method: configJSON.PutMethodType,
        endPoint: configJSON.addToCartApiEndPoint + data.order_id + "/add_item",
        body: httpBody
      });
    } else {
      this.addToCartApiCallId = await this.apiCall({
        contentType: configJSON.ApiContentType,
        method: configJSON.PostMethodType,
        endPoint: configJSON.addToCartApiEndPoint,
        body: httpBody
      });
    }
  };

  getCartHasProduct = async () => {
    this.setState({ isFetching: true });
    this.getCartProductId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.GetMethodType,
      endPoint: configJSON.cartHasProductEndPoint
    });
  };

  getCartList = async () => {
    this.getCartListId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.GetMethodType,
      endPoint: configJSON.getCartApiEndPoint
    });
  };

  unsubscribeMessages = () => {
    runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
  };

  // Customizable Area Start
  // Customizable Area End

}

