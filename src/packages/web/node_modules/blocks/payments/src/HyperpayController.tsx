import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import StorageProvider from '../../../framework/src/StorageProvider';
import { NativeModules } from "react-native";
// Customizable Area Start
// Customizable Area End
export var navigationParamsToken = "";
export var navigationParamsURL = "";
export var orderConfirmStatus = "";
export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
  cardNumber2: String;
  token: string;
  errorMsg: string;
  loadingChekout: boolean;
  checkout_detail: any;
  isSubmit: boolean;
  isInvalidCardNo: boolean;
  isInvalidCardHolder: boolean;
  isInvalidCVV: boolean;
  isInvalidExpiry: boolean;
  count: any;
  dataid: string;
  redirectURL: any;
  showConfirmOrder: boolean;
  statuscallcnt: boolean;
  PaymentGateWay: string;
  orderNumber: string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class HyperpayController extends BlockComponent<Props, S, SS> {
  chekoutApiCallId: any;
  apiHyperpayStatusCallId: any;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
    ];
    // Customizable Area Start

    this.state = {
      cardNumber: "",
      cardHolder: "",
      expiry: "",
      cvv: "",
      cardNumber2: "",
      token: "",
      errorMsg: "",
      loadingChekout: false,
      isSubmit: false,
      checkout_detail: "",
      isInvalidCardNo: false,
      isInvalidCardHolder: false,
      isInvalidCVV: false,
      isInvalidExpiry: false,
      count: 0,
      dataid: "",
      redirectURL: null,
      showConfirmOrder: false,
      statuscallcnt: false,
      PaymentGateWay: "",
      orderNumber: "",
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  async componentDidMount() {
    // super.componentDidMount();
    this.getToken();
  }
  getToken = () => {
    // const msg: Message = new Message(
    //   getName(MessageEnum.SessionRequestMessage)
    // );
    // this.send(msg);
  };
  async receive(from: string, message: Message) {
    // Customizable Area Start

    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      runEngine.debugLog("Message Recived", message);
      const token = await StorageProvider.get('Userdata');
      // let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token });
      //console.log("Builder AI token", token);
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.chekoutApiCallId != null &&
      this.chekoutApiCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var chekoutResp = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      // console.log("Checkout Resp ", JSON.stringify(chekoutResp));
      if (chekoutResp && !chekoutResp.errors) {
        if (chekoutResp.length === 0 || chekoutResp.status === 404) {
          this.showAlert("Something went wrong!", "");
        } else if (chekoutResp.status === 500) {
          this.setState({
            loadingChekout: false,
          });
          this.showAlert("Internal Server Error", "");
        } else {
          navigationParamsToken = chekoutResp.body.id;

          this.setState(
            {
              isSubmit: true,
              checkout_detail: chekoutResp,
            },
            () => {
              this.hyperPayNativeCall();
              //     this.props.navigation.push(
              //       "FedexintegrationOrderTracking",
              //       {
              //         shippmentDetails: this.state
              //           .new_shippment_detail,
              //         authKey: this.state.token,
              //       }
              //     );
            }
          );
        }
      }
    } else {
      this.setState({ loadingChekout: false });
      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (errorReponse === undefined) {
        this.setState({
          errorMsg: "Something went wrong",
        });
      } else {
        this.setState({
          errorMsg: errorReponse,
        });
      }
    }
    //Checkout Status
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.apiHyperpayStatusCallId != null &&
      this.apiHyperpayStatusCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var chekoutResp = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      //console.log("Checkout Resp ", JSON.stringify(chekoutResp));
      if (chekoutResp && !chekoutResp.errors) {
        if (chekoutResp.length === 0 || chekoutResp.status === 404) {
          this.showAlert("Something went wrong!", "");
        } else if (chekoutResp.status === 500) {
          this.setState({
            loadingChekout: false,
          });
          this.showAlert("Internal Server Error", "");
        } else if (chekoutResp.status) {
          // console.log("Checkout  Status Resp", JSON.stringify(chekoutResp));
          orderConfirmStatus = chekoutResp;
          this.props.navigation.navigate("OrderConfirm");
        }
      }
    } else {
      this.setState({ loadingChekout: false });
      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (errorReponse === undefined) {
        this.setState({
          errorMsg: "Something went wrong",
        });
      } else {
        this.setState({
          errorMsg: errorReponse,
        });
      }
    }
    // Customizable Area End
  }
  getCheckoutId(orderid: string): boolean {
    this.setState({ loadingChekout: true });
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token,
    };
    const attrs = {
      merchantTransactionId: orderid,
      currency_code: "SAR",
      paymentType: "DB",
      entityId: "8ac7a4c874672c64017468b0fdcf0756",
      //amount: 450,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.chekoutApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.checkoutAPiEndPoint
    );
    //hyperpayAPIMethodType checkoutAPiEndPoint
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(attrs)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.hyperpayAPIMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  getCardType = (number: any) => {
    const numberFormated = number.replace(/\D/g, "");
    var patterns = {
      VISA: /^4[0-9]{12}(?:[0-9]{3})?$/,
      MASTER: /^5[1-5][0-9]{14}$/,
      AMEX: /^3[47][0-9]{13}$/,
      ELO: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})$/,
      AURA: /^(5078\d{2})(\d{2})(\d{11})$/,
      JCB: /^(?:2131|1800|35\d{3})\d{11}$/,
      DINERS: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
      DISCOVERY: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
      HIPERCARD: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/,
      ELECTRON: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
      MAESTRO: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
      DANKORT: /^(5019)\d+$/,
      INTERPAYMENT: /^(636)\d+$/,
      UNIONPAY: /^(62|88)\d+$/,
    };

    for (var key in patterns) {
      //@ts-ignore
      if (patterns[key].test(numberFormated)) {
        return key;
      }
    }
  };
  hyperPayNativeCall() {
    //const checkoutId = await this.getCheckoutId();
    // console.log(
    //   "this.state.checkout_detail.body.id   ",
    //   this.state.checkout_detail.body.id
    // );
    let cardType = this.getCardType(this.state.cardNumber);

    let expdate = this.state.expiry.split("/");

    // console.log("asfkjasfas", cardType);
    //this.state.checkout_detail.body.id;
    let paymentParams = {
      checkoutID: this.state.checkout_detail.body.id,
      //this.state.checkout_detail.body.id,
      paymentBrand: cardType,
      cardNumber: this.state.cardNumber,
      //this.state.cardNumber,
      //"4111111111111111",
      holderName: this.state.cardHolder,
      //"nishant",
      expiryMonth: expdate[0],
      expiryYear: "20" + expdate[1],
      cvv: this.state.cvv,
    };
    try {
      //for (let trans = 0; trans < 2; trans++) {
      this.hyperPayTranscation(paymentParams);
      //}

      // let resp = await NativeModules.Hyperpay.transactionPayment(
      //   paymentParams
      // );
      // console.log("sdgfkjabsdkjb", JSON.stringify(resp));
    } catch (error) {
      alert(error);
      // console.log("Errr", error);
    }
  }
  getPaymentStatus = (): boolean => {
    //checkoutStatus checkoutStatusMethodType
    // console.log("navigationParamsToken", navigationParamsToken);
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token,
    };
    // console.log("header  ", JSON.stringify(header));
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    // console.log("requestMessage, ", requestMessage);
    this.apiHyperpayStatusCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.checkoutStatus +
        `${navigationParamsToken}&entityId=8ac7a4c874672c64017468b0fdcf0756`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.checkoutStatusMethodType
    );
    //console.log('requestMessage@, ',requestMessage);
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  async hyperPayTranscation(paymentParams: any) {
    //console.log("paymentParams", paymentParams.checkoutID);
    try {
      //https://test.oppwa.com/v1/checkouts/01D6CF8374F5A56BCC75C6D5583FB42C.uat01-vm-tx03/redirect
      let resp = await NativeModules.Hyperpay.transactionPayment(paymentParams);
      // console.log("resp transactionPayment", JSON.stringify(resp));
      this.setState({ loadingChekout: false });
      //if (resp.status===) console.log("CheckoutID", JSON.stringify(resp.status));
      if (resp.status === "pending") {
        this.setState(
          {
            redirectURL: resp.redirectURL,
            PaymentGateWay: "HyperPay",
          },
          () => {
            navigationParamsURL = resp.redirectURL;
            // this.props.navigation.push("Hyperpay", {
            //   redirectURL: resp.redirectURL,
            // });
          }
        );
      } else if (resp.status === "complete") {
        this.handleTrasaction();
      } else if (resp.staatus === "failure" || resp.error) {
        // this.props.showErrorModal(resp.error, true);
      }
      //this.getPaymentStatus(resp.checkoutId);
    } catch (error) {
      // console.log(" Transcation Error: ", error);
      alert(error);
    }
  }
  handleTrasaction = async () => {
    //  const { checkoutID } = this.state;
    //  const { cartData, route } = this.props;
    //  let orderId;
    //  if (
    //    route &&
    //    route.params &&
    //    route.params.cartData
    //  ) {
    //    orderId = route.params.cartData.id;
    //  } else if (cartData && cartData.order) {
    //    orderId = cartData.order.id;
    //  }
    //this.props.navigation.push("OrderConfirm");
    let count = 1;
    // if (!this.state.statuscallcnt) {
    //   this.getPaymentStatus();
    //   console.log("COuntCall0101");
    // }

    this.setState(
      { redirectURL: null, showConfirmOrder: true, statuscallcnt: true },
      () => {
        console.log("COuntCall");
        this.getPaymentStatus();
      }
    );
    //this.props.startSpinner();
    // const paymentStatus = await this.getPaymentStatus();
    // console.log(paymentStatus);
    // if (/^(000\.000\.|000\.100\.1|000\.[36])/.test(paymentStatus.code)) {
    //   console.log("conform order");
    //   //  this.props.conformOrder(
    //   //    {
    //   //      cart_id: "OD00000040",
    //   //      checkout_id: this.state.checkout_detail.body.id,
    //   //    },
    //   //    this.orderSuccess,
    //   //    this.orderFailure
    //   //  );
    // } else if (/^(100.100|100.2[01])/.test(paymentStatus.code)) {
    //   console.log(paymentStatus.description);
    //   //  this.props.stopSpinner();
    //   //  setTimeout(() => {
    //   //    this.props.showErrorModal(
    //   //      paymentStatus.description
    //   //    );
    //   //  }, 500);
    // }
  };

  // Customizable Area Start
  // Customizable Area End
}
