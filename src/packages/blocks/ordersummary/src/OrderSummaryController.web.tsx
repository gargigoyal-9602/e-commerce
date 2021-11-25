//@ts-nocheck
import React from "react";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
export const configJSON = require("./config");


export interface Props {
  navigation: any;
  id: string;
  history: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  paymentType: string;
  cardtData: any;
  wholeCartData: any;
  addressData: any;
  razorpay_order_id: any;
  isOpen: any;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class OrderSummaryController extends BlockComponent<
  Props,
  S,
  SS
> {
  saveAddressId: any;
  checkZipcodeId: any;
  checkAvailabilityId: any;
  releaseBlockId: any;
  placeOrderId: any;
  createOrderId: any;
  verifyRazorPayId: any;
  getUserProfileApiCallId: any;
  releaseBlockQuantityApiCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];

    this.state = {
      paymentType: "stripe",
      cardtData: "",
      wholeCartData: "",
      addressData: "",
      razorpay_order_id: ""
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    const cardtData = this.props.history.location.state.cart;
    const addressData = this.props.history.location.state.addressData;
    const billing_address_data = this.props.history.location.state.billing_address_Data;
    const wholeCartData = this.props.history.location.state.cardtData;
    this.setState({ cardtData: cardtData, addressData: addressData, billing_address_data: billing_address_data, wholeCartData: wholeCartData })
    /* @ts-ignore */
    if (_.lowerCase(JSON.parse(localStorage.getItem('countryCode')).countryName) == 'uk') {
      this.setState({
        paymentType: "stripe"
      })
    }
    /* @ts-ignore */
    if (_.lowerCase(JSON.parse(localStorage.getItem('countryCode')).countryName) == 'india') {
      this.setState({
        paymentType: "razorpay"
      })
    }
  }

  async componentWillUnmount() {
    runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
  }


  async receive(from: string, message: Message) {
    // Customizable Area Start

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

      if (apiRequestCallId === this.emptyCartApiCallId) {
        this.setState({
          emptyCart: true,
          isFetching: false
        });
      }
      if (responseJson && responseJson.data) {

        if (apiRequestCallId === this.releaseBlockId) {
        } else if (apiRequestCallId === this.placeOrderId) {
          if (responseJson) {
            this.props.history.push({
              pathname: '/order-placed',
              state: {
                orderData: {
                  order: {
                    placed_at: responseJson.data.placed_at,
                    total: responseJson.data.total
                  }
                }
              }
            })

          }
        }
        if (apiRequestCallId === this.createOrderId) {
          this.razorpayAddonMethod(
            responseJson.data.order.data.attributes.razorpay_order_id
          );
        } else if (apiRequestCallId === this.verifyRazorPayId) {
          this.onVerifyAddonRazorpaySuccess(responseJson.data);
        }
      }
      if (responseJson && responseJson.message) {

        if (apiRequestCallId === this.checkAvailabilityId) {

          if (
            responseJson.message ===
            "All products are available."
          ) {
            this.placeOrder();
          } else {
            window.notify([{ message: responseJson.errors, type: "error" }]);
          }
        } else if (apiRequestCallId === this.checkZipcodeId) {
          if (
            responseJson.message ===
            "Sorry, currently delivery is not available for this location."
          ) {
            window.notify([{ message: responseJson.message, type: "error" }]);
          } else {
            this.checkProductAvailability();
          }
        } else if (apiRequestCallId === this.releaseBlockId) {
        } else if (apiRequestCallId === this.placeOrderId) {
          this.setState({
            isShowError: false,
            message: responseJson.message,
            showAlertModal: true,
            isFetching: false,
            isValidCoupon: false
          });
        } else if (apiRequestCallId === this.createOrderId) {
          this.setState({
            isFetching: false
          });
        } else if (apiRequestCallId === this.verifyRazorPayId) {
          this.releaseBlockQuantity();
          this.setState({
            isFetching: false
          });
        } else if (apiRequestCallId === this.releaseBlockQuantityApiCallId) {
          this.releaseBlockQuantityFailureCallBack(responseJson.message);
        }
      }
      if (responseJson && responseJson.errors) {
        if (apiRequestCallId === this.checkAvailabilityId) {
          this.setState({
            isShowError: true,
            message: responseJson.errors,
            showAlertModal: true,
            isFetching: false
          });
        } else if (apiRequestCallId === this.checkZipcodeId) {
          this.setState({
            isShowError: true,
            message: responseJson.errors,
            showAlertModal: true,
            isFetching: false,
            isValidCoupon: false
          });
        } else if (apiRequestCallId === this.releaseBlockId) {
        } else if (apiRequestCallId === this.placeOrderId) {
          this.setState({
            isShowError: true,
            message: responseJson.errors,
            showAlertModal: true,
            isFetching: false
          });
        } else if (apiRequestCallId === this.createOrderId) {
          this.setState({
            isShowError: true,
            message: responseJson.errors,
            showAlertModal: true,
            isFetching: false
          });
        } else if (apiRequestCallId === this.verifyRazorPayId) {
          this.setState({
            isShowError: true,
            message: responseJson.errors,
            showAlertModal: true,
            isFetching: false
          });
        }
      }
      if (errorReponse) {
        if (apiRequestCallId === this.getUserProfileApiCallId) {
          this.setState({
            isFetching: false
          });
        }
        if (apiRequestCallId === this.getCartProductId) {
          this.setState({
            isFetching: false
          });
        }
        if (apiRequestCallId === this.getCartListApiCallId) {
          this.setState({
            isShowError: true,
            message: errorReponse,
            showAlertModal: true,
            isFetching: false
          });
        } else if (apiRequestCallId === this.saveAddressId) {
          this.setState({
            isFetching: false
          });
        } else if (apiRequestCallId === this.checkAvailabilityId) {
          this.setState({
            isShowError: true,
            message: errorReponse,
            showAlertModal: true,
            isFetching: false
          });
        } else if (apiRequestCallId === this.releaseBlockId) {
        } else if (apiRequestCallId === this.placeOrderId) {
          this.setState({
            isShowError: true,
            message: errorReponse,
            showAlertModal: true,
            isFetching: false
          });
        } else if (apiRequestCallId === this.createOrderId) {
          this.setState({
            isShowError: true,
            message: errorReponse,
            showAlertModal: true,
            isFetching: false
          });
        } else if (apiRequestCallId === this.verifyRazorPayId) {
          this.setState({
            isShowError: true,
            message: errorReponse,
            showAlertModal: true,
            isFetching: false
          });
        }
      }
    }
    // Customizable Area End
  }

  apiCall = async (data: any) => {
    const { contentType, method, endPoint, body } = data;
    const token = localStorage.getItem("token");
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

  getCartHasProduct = async () => {
    this.setState({ isFetching: false });
    this.getCartProductId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: configJSON.cartHasProductAPIEndPoint
    });
  };

  getUserProfile = async () => {
    this.getUserProfileApiCallId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: configJSON.userProfileApiEndPoint
    });
  };

  getUserProfileSuccessCallBack = async (res: any) => {
    this.setState({ profileData: res, isFetching: false });
  };

  onSetAddress = (isFromShipping: boolean, addressData: any) => {
    if (isFromShipping) {
      this.setState({ shippingAddressData: addressData });
    } else {
      this.setState({ billingAddressData: addressData });
    }
  };

  onAddAddress = (isFromShipping: boolean) => {
    this.props.navigation.navigate("SavedAddress", {
      isFromCheckout: true,
      onSetAddress: (addressData: any) =>
        this.onSetAddress(isFromShipping, addressData)
    });
  };

  saveAddress = async () => {
    let addressData = this.props.navigation.state.params.checkoutData;
    if (addressData.address && addressData.address.id) {
      addressData['delivery_address_id'] = addressData.address.id
    }
    this.saveAddressId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.apiMethodTypePut,
      endPoint:
        configJSON.addAddressToOrder +
        "/" +
        this.state.wholeCartData.id +
        "/add_address_to_order",
      body: addressData
    });
  };

  releaseBlockQuantity = async () => {
    this.toggleIsOpen();

    this.releaseBlockQuantityApiCallId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.apiMethodTypePut,
      endPoint:
        configJSON.cartListAPiEndPoint +
        "/" +
        this.state.wholeCartData.id +
        "/release_products"
    });
  };

  releaseBlockQuantitySuccessCallBack = (res: any) => {
    console.log('@@@ Release Block Quantity Success CallBack =============', res);
  }

  releaseBlockQuantityFailureCallBack = (error: any) => {
    console.log('@@@ Release Block Quantity Failure CallBack =============', error);
  }

  checkZipcodeAvailability = async () => {
    this.toggleIsOpen();

    const shipping = this.state.addressData;
    this.checkZipcodeId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: configJSON.checkZipCodeApiEndPoint + shipping.zip_code
    });
  };

  checkProductAvailability = async () => {
    this.checkAvailabilityId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint:
        configJSON.cartListAPiEndPoint +
        "/" +
        this.state.wholeCartData.id +
        "/check_availability"
    });
  };

  toggleIsOpen = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
  }

  onConfirmingOrder = () => {
    const confirVal = window.confirm(
      "Are you sure want to place the order?");

    if (confirVal) {
      this.checkZipcodeAvailability()
    } else {
      this.releaseBlockQuantity()
    }
  };

  placeOrder = async () => {
    if (this.state.paymentType === "cod") {
      this.placeConfirmOrder();
      //localStorage.removeItem("cart_length");
    } else {
      const id = this.state.wholeCartData;
      let orderData = new FormData();
      orderData.append("order_id", id);
      this.getRazorpayOrderId();
      //   localStorage.removeItem("cart_length");
    }
  };

  getRazorpayOrderId = async () => {
    const { id } = this.state.wholeCartData;
    let data = {
      order_id: id,
      value: 1500
    };
    this.createOrderId = await this.apiCall({
      endPoint: configJSON.createRazorpayApiEndPoint,
      contentType: configJSON.ApiContentType,
      method: configJSON.ApiMethodPostType,
      body: data
    });
  };

  razorpayAddonMethod = async (razorpay_order_id: any) => {
    const self = this;
    const { email, full_name, full_phone_number } = this.state.wholeCartData.account.attributes;

    var options = {
      description: 'Credits towards consultation',
      // image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_QDC256wNFutX9J', // Your api key
      amount: `${(parseFloat(this.state.wholeCartData.total).toFixed(2) * 100)}`,
      handler: function (response) {
        self.verifyAddonRazorPay(response);
      },
      name: 'Branded Wholesale',
      order_id: razorpay_order_id,
      prefill: {
        email: email,
        contact: full_phone_number,
        name: full_name
      },
      //  theme: { color: APP_COLORS.app_theme_green_color }
    }
    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response) {
      window.notify([{ message: response.error.description, type: "error" }]);
      self.releaseBlockQuantity();
      self.props.history.push({
        pathname: '/transactionfailed',
      })
    });
    rzp1.open(options);
  }

  verifyAddonRazorPay = async (razorPay_data: any) => {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = razorPay_data;

    let razorPayData = {
      razorpay_order_id: razorpay_order_id,
      razorpay_payment_id: razorpay_payment_id,
      razorpay_signature: razorpay_signature
    };
    this.verifyRazorPayId = await this.apiCall({
      endPoint: configJSON.verifyRazorpayApiEndPoint,
      contentType: configJSON.ApiContentType,
      method: configJSON.ApiMethodPostType,
      body: razorPayData
    });
  };

  placeConfirmOrder = async () => {
    const data = {
      cart_id: this.state.wholeCartData.id,
      is_gift: false,
      schedule_time: ""
    };
    this.placeOrderId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.ApiMethodPostType,
      endPoint: configJSON.placeOrderAPIEndPoint,
      body: data
    });
    localStorage.removeItem("cart_length");
  };

  onVerifyAddonRazorpaySuccess = (res: any) => {
    if (res) {
      this.props.history.push({
        pathname: '/order-placed',
        state: {
          orderSuccess: true,
          orderData: {
            order: {
              placed_at: res.order.placed_at,
              total: res.order.total
            }
          }
        }
      })

    }

    localStorage.removeItem("cart_length");


  };

  onHandleBack = () => {
    this.props.history.push("/checkout");
  }
}
