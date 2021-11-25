import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import StorageProvider from '../../../framework/src/StorageProvider';
//import COLOR_CONST from '../studio-store-ecommerce-theme/ColorConstants';
import COLOR_CONST, { FONTS } from '../../studio-store-ecommerce-theme/src/AppFonts'

//@ts-ignore
import RazorpayCheckout from "react-native-razorpay";
const themeJson = require('../../studio-store-ecommerce-theme/src/theme.json');

export const configJSON = require("./config");
export var orderID = "";
// Customizable Area Start
const RAZORPAY_KEY_ID = "rzp_test_PJtBwF1j6tybPX";
// Customizable Area End
export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  token: string;
  Order_Id: string;
  name: string;
  currency: string;
  razorPayModal: boolean;
  hyperpayModal: boolean;
  gatewaytype: string;
  orders: any;
  dropdownStatus: boolean;
  profileData: any;
  cartData: any;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class PaymentsController extends BlockComponent<Props, S, SS> {
  getOrdersAPICallId: any;
  getIdApiCallId: any;
  getsavePurchaseCallId: any;
  getUserProfileApiCallId: any;
  cartHasProductAPICallID: any;
  createOrderId: any;
  verifyRazorPayId: any;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
      profileData: null,
      cartData: null,
      token: "",
      Order_Id: "",
      name: "",
      currency: "INR",
      razorPayModal: false,
      orders: [],
      dropdownStatus: false,
      hyperpayModal: false,
      gatewaytype: "razorpay"
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    // super.componentDidMount();
    this.getToken();
  }

  getToken = async () => {
    // const msg: Message = new Message(
    //   getName(MessageEnum.SessionRequestMessage)
    // );
    const token = await StorageProvider.get('Userdata');
    console.log('token-------------------', token)
    this.setState({ token: token }, () => this.getOrdersDataRequest(token));
    this.getUserProfile();
    this.refreshCart();
    // this.send(msg);
  };

  setOrderId = (item: any) => {
    this.setState({ Order_Id: item.id });
    this.setState({ dropdownStatus: false });
  };

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      // console.log("responseJson.data order", JSON.stringify(responseJson));
      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      // runEngine.debugLog("API Message Recived", message);

      if (responseJson && responseJson.data) {
        if (apiRequestCallId === this.getOrdersAPICallId) {
          console.log('response in orders-----', responseJson.data);
          this.setState({ orders: responseJson.data });
        } else if (apiRequestCallId === this.getIdApiCallId) {
          // alert(JSON.stringify(responseJson.data.faqs))
          // let array = responseJson.data;

          // runEngine.debugLog("get Order Id", message);
          if (this.state.gatewaytype === "razorpay") {
            this.openRazorPay(
              responseJson.data.attributes.razorpay_order_id,
              responseJson.data.attributes.total
            );
          } else {
            this.setState(
              { hyperpayModal: false, razorPayModal: false },
              () => {
                orderID = responseJson.data.attributes.order_number;
                this.props.navigation.navigate("Hyperpay", {
                  orderid: responseJson.data.attributes.order_number,
                });
              }
            );
          }
        }
        if (apiRequestCallId === this.cartHasProductAPICallID) {
          console.log('cartHasProductAPICallID---------', responseJson.data);
          this.setState({
            cartData: responseJson.data
          });
        }
        if (apiRequestCallId === this.getUserProfileApiCallId) {
          this.getUserProfileSuccessCallBack(responseJson.data);
        }
        //this.setState({ isVisible: false });
      } else if (apiRequestCallId === this.getsavePurchaseCallId) {
        this.showAlert("Success", responseJson.message);
        this.setState({ Order_Id: "" });
        this.setState({ razorPayModal: false });
        // runEngine.debugLog("save Purchase Recived", message);
      } else if (errorReponse || responseJson.errors) {
        this.setState({ razorPayModal: false });
        this.parseApiErrorResponse(errorReponse);
        this.parseApiErrorResponse(errorReponse);
        this.parseApiCatchErrorResponse(responseJson.errors);
        this.parseApiCatchErrorResponse(errorReponse);
      }
    }
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

  refreshCart = async () => {
    this.cartHasProductAPICallID = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.GetMethodType,
      endPoint: configJSON.cartHasProductAPIEndPoint
    });
  };

  getUserProfile = async () => {
    this.getUserProfileApiCallId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.GetMethodType,
      endPoint: configJSON.userProfileApiEndPoint
    });
  };

  getUserProfileSuccessCallBack = async (res: any) => {
    console.log('@@@ Get profile Data Success CallBack ===================', res);
    this.setState({ profileData: res }, () => {
      this.refreshCart();
    });
  };

  // Customizable Area Start

  openRazorPay = (razorPay_Id: string, amount: string) => {
    var options = {
      currency: this.state.currency,
      order_id: razorPay_Id,
      key: RAZORPAY_KEY_ID, // Your api key
      amount: amount,
      name: this.state.name,
      theme: { color: "#F37254" },
    };
    RazorpayCheckout.open(options)
      .then((data: any) => {
        // handle success
        // console.log(data);
        this.savePurchase(
          data.razorpay_order_id,
          data.razorpay_payment_id,
          data.razorpay_signature
        );
      })
      .catch((error: any) => {
        console.log(error);
        // handle failure
      });
  };

  getRazorpayOrderId = async () => {
    const { order_id } = this.state.cartData;
    const total = this.props.navigation.state.params.data;
    let data = {
      order_id: order_id,
      value: total
    };
    this.createOrderId = await this.apiCall({
      endPoint: configJSON.createRazorpayApiEndPoint,
      contentType: configJSON.ApiContentType,
      method: configJSON.apiMethodTypePost,
      body: data
    });
  };

  razorpayAddonMethod = (razorpay_order_id: any) => {
    let profileData = this.state.profileData;
    const { email, name, phone_number } = profileData;
    var options = {
      description: "Credits towards consultation",
      // image: "https://i.imgur.com/3g7nmJC.png", //optional
      currency: "INR",
      key: RAZORPAY_KEY_ID, // Your api key
      // amount: parseInt(total) * 100, //getting amount from backend
      order_id: razorpay_order_id,
      name: "Branded Wholesale",
      prefill: {
        email: email ? email : "",
        contact: phone_number ? phone_number : "",
        name: name ? name : ""
      },
      theme: { color: themeJson.attributes.primary_color }
    };
    RazorpayCheckout.open(options)
      .then((data: any) => {
        // handle success
        this.verifyAddonRazorPay(data);
      })
      .catch((error: any) => {
        // handle failure
        setTimeout(() => {
          let message = "";
          if (this.isPlatformiOS()) {
            message = error.description;
          } else {

            let localError = JSON.parse(error.description);
            console.log('localError in localError', localError);
            message = localError.error.description;
          }
          // this.setState({ isShowError: true})
          // this.props.showErrorModal(message);
        }, 0);
      });
  }

  verifyAddonRazorPay = async (razorPay_data: any) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = razorPay_data;
    let razorPayData = new FormData;
    razorPayData.append("razorpay_order_id", razorpay_order_id);
    razorPayData.append("razorpay_payment_id", razorpay_payment_id);
    razorPayData.append("razorpay_signature", razorpay_signature);
    this.verifyRazorPayId = await this.apiCall({
      endPoint: configJSON.verifyRazorpayApiEndPoint,
      contentType: configJSON.ApiContentType,
      method: configJSON.apiMethodTypePost,
      body: razorPayData
    });
  }

  onVerifyAddonRazorpaySuccess = (res: any) => {
    this.props.navigation.replace('OrderConfirm', {
      orderSuccess: true,
      orderData: {
        order: {
          placed_at: res.data.placed_at,
          total: res.data.total
        }
      },
    });
  }

  showHyperPayModal = () => {
    this.setState({
      hyperpayModal: !this.state.hyperpayModal,
      gatewaytype: "hyperpay",
    });
  };
  showModal = () => {
    this.setState({
      razorPayModal: !this.state.razorPayModal,
      gatewaytype: "razorpay",
    });
  };
  closeModal = () => {
    this.setState({ razorPayModal: false, hyperpayModal: false });
  };
  hyperPay = () => {
    this.showAlert("Error", "This functionality is yet to implement");
  };

  checkout = () => {
    if (
      this.state.Order_Id === null ||
      this.state.Order_Id.length === 0 ||
      this.state.name === null ||
      this.state.name.length === 0
    ) {
      this.showAlert("Error", configJSON.errorOrderNotValid);
      return false;
    } else {
      this.setState({ razorPayModal: false });
      let data = {
        order_id: this.state.Order_Id,
      };
      const header = {
        "Content-Type": configJSON.razorpayApiContentType,
        token: this.state.token,
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.getIdApiCallId = requestMessage.messageId;
      this.getIdApiCallId =

        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          configJSON.razorpayAPiEndPoint
        );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(data)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.httpPostType
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;
    }
  };

  savePurchase = (
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string
  ) => {
    const header = {
      "Content-Type": configJSON.razorpayApiContentType,
      token: this.state.token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getsavePurchaseCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.razorpayAPiEndPoint +
      `/verify_signature?razorpay_order_id=${razorpay_order_id}&razorpay_payment_id=${razorpay_payment_id}&razorpay_signature=${razorpay_signature}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  getOrdersDataRequest = (token: string) => {
    const header = {
      "Content-Type": configJSON.razorpayApiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getOrdersAPICallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.ordersAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  // Customizable Area End
}
