import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import StorageProvider from "../../../framework/src/StorageProvider";

import { Alert, Platform, BackHandler } from "react-native";
//@ts-ignore
import RazorpayCheckout from "react-native-razorpay";
//@ts-ignore
import stripe from "tipsi-stripe";
const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");
// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");
const RAZORPAY_KEY_ID = themeJson.attributes.razorpay.api_key;
const STRIPE_PUB_KEY = themeJson.attributes.stripe.stripe_pub_key;

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  showCouponCodeModal: boolean;
  showGuestModal: boolean;
  token: string;
  codeValue: string;
  cart_Value: string;
  isShowError: boolean;
  showAlertModal: boolean;
  message: any;
  isFetching: boolean;
  cartList: any;
  cartData: any;
  quantity: string;
  catalogue_variant_id: string;
  catalogue_id: string;
  cart_id: any;
  emptyCart: boolean;
  isCouponApplied: boolean;
  isValidCoupon: boolean;
  shippingAddressData: any;
  billingAddressData: any;
  isPaymentOption1Selected: boolean;
  isPaymentOption2Selected: boolean;
  isPaymentOption3Selected: boolean;
  profileData: any;
  cardToken: any;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class OrdersummaryController extends BlockComponent<
  Props,
  S,
  SS
> {
  apiApplyCouponCallId: any;
  getCartListApiCallId: any;
  updateQtyApiCallId: any;
  emptyCartApiCallId: any;
  removeCartItemApiCallId: any;
  removeCouponApiCallId: any;
  getCartProductId: any;
  saveAddressId: any;
  checkZipcodeId: any;
  checkAvailabilityId: any;
  releaseBlockId: any;
  placeOrderId: any;
  createOrderId: any;
  verifyRazorPayId: any;
  getUserProfileApiCallId: any;
  releaseBlockQuantityApiCallId: any;
  createStripePaymentId: any;
  confirmStripePaymentID: any;
  shippingChargeCalculationApiCallID: any;
  releaseShippingChargeCalculationApiCallID: any;
  // Customizable Area Start
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];

    this.state = {
      showCouponCodeModal: false,
      showGuestModal: false,
      token: "",
      codeValue: "",
      isCouponApplied: false,
      isValidCoupon: false,
      cart_Value: "",
      isShowError: false,
      isFetching: false,
      message: null,
      showAlertModal: false,
      cartList: null,
      cartData: null,
      quantity: "1",
      catalogue_id: "",
      catalogue_variant_id: "",
      cart_id: null,
      emptyCart: false,
      shippingAddressData: null,
      billingAddressData: null,
      isPaymentOption1Selected: true,
      isPaymentOption2Selected: false,
      isPaymentOption3Selected: false,
      profileData: null,
      cardToken: ""
      // Customizable Area Start
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    stripe.setOptions({
      publishableKey: STRIPE_PUB_KEY
    });
    this.getToken();
    if (this.props.navigation.state.params.checkoutData) {
      const { address } = this.props.navigation.state.params.checkoutData;
      this.setState(
        {
          shippingAddressData: address,
          billingAddressData: address.billing_address
        },
        () => {}
      );
    }
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick = () => {
    this.releaseShippingChargeCalculation();
    return true;
  };

  async componentWillUnmount() {
    super.componentWillUnmount();
    runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    // Customizable Area Start
    // Customizable Area End
  }

  getToken = async () => {
    const token = await StorageProvider.get("Userdata");
    this.setState({ token: token }, () => this.getCartList());
    this.getCartHasProduct();
    this.getUserProfile();
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

      if (apiRequestCallId === this.emptyCartApiCallId) {
        this.setState({
          emptyCart: true,
          isFetching: false
        });
      }
      if (responseJson.data) {
        if (apiRequestCallId === this.getUserProfileApiCallId) {
          this.getUserProfileSuccessCallBack(responseJson.data);
        }
        if (apiRequestCallId === this.getCartProductId) {
          this.setState({
            isFetching: false,
            cart_id: responseJson.data.order_id
          });
        }
        if (apiRequestCallId === this.getCartListApiCallId) {
          this.setState(
            {
              cartList: responseJson.data[0].attributes.order_items,
              cartData: responseJson.data[0],
              isFetching: false,
              emptyCart:
                responseJson.data[0].attributes.order_items.length === 0
                  ? true
                  : false,
              isCouponApplied:
                responseJson.data[0].attributes.coupon_code_id != null &&
                responseJson.data[0].attributes.applied_discount > 0.0
                  ? true
                  : false,
              isValidCoupon:
                responseJson.data[0].attributes.coupon_code_id != null &&
                responseJson.data[0].attributes.applied_discount > 0.0
                  ? true
                  : false
            },
            () => this.getShippingChargeCalculation()
          );
        } else if (
          apiRequestCallId === this.shippingChargeCalculationApiCallID
        ) {
          this.getShippingChargeCalculationSuccessCallBack(responseJson);
        } else if (
          apiRequestCallId === this.releaseShippingChargeCalculationApiCallID
        ) {
          this.releaseShippingChargeCalculationSuccessCallBack();
        } else if (apiRequestCallId === this.saveAddressId) {
          this.checkProductAvailability();
        } else if (apiRequestCallId === this.checkAvailabilityId) {
          this.checkZipcodeAvailability();
        } else if (apiRequestCallId === this.releaseBlockQuantityApiCallId) {
          this.releaseBlockQuantitySuccessCallBack();
        } else if (apiRequestCallId === this.checkZipcodeId) {
          this.onConfirmingOrder();
        } else if (apiRequestCallId === this.releaseBlockId) {
        } else if (apiRequestCallId === this.placeOrderId) {
          if (responseJson) {
            this.setState({
              isShowError: true,
              message: responseJson.message,
              showAlertModal: true,
              isFetching: false,
              isValidCoupon: false
            });
          }
          this.props.navigation.navigate("OrderConfirm", {
            orderSuccess: true,
            orderData: {
              order: {
                placed_at: responseJson.data.placed_at,
                total: responseJson.data.total
              }
            }
          });
        } else if (apiRequestCallId === this.createOrderId) {
          this.razorpayAddonMethod(
            responseJson.data.order.data.attributes.razorpay_order_id
          );
        } else if (apiRequestCallId === this.verifyRazorPayId) {
          this.onVerifyAddonRazorpaySuccess(responseJson.data);
        } else if (apiRequestCallId === this.createStripePaymentId) {
          this.createStripePaymentSuccessCallBack(responseJson.data);
        } else if (apiRequestCallId === this.confirmStripePaymentID) {
          this.onConfirmStripePaymentSuccessCallBack(responseJson.data);
        }
        // Customizable Area Start
        // Customizable Area End
      }
      if (responseJson.message) {
        if (apiRequestCallId === this.getUserProfileApiCallId) {
        }
        if (apiRequestCallId === this.getCartProductId) {
          this.setState({
            isFetching: false
          });
        }
        if (apiRequestCallId === this.getCartListApiCallId) {
          this.setState({
            isShowError: false,
            message: responseJson.message,
            showAlertModal: true,
            isFetching: false,
            isValidCoupon: false
          });
        } else if (apiRequestCallId === this.saveAddressId) {
          this.setState({
            isFetching: false
          });
          this.checkProductAvailability();
        } else if (apiRequestCallId === this.checkAvailabilityId) {
        } else if (apiRequestCallId === this.checkZipcodeId) {
          if (
            responseJson.message ===
            "Sorry, currently delivery is not available for this location."
          ) {
            this.setState({
              isShowError: true,
              message: responseJson.message,
              showAlertModal: true,
              isFetching: false,
              isValidCoupon: false
            });
          } else {
            this.onConfirmingOrder();
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
          this.releaseBlockQuantityFailureCallBack();
        } else if (apiRequestCallId === this.createStripePaymentId) {
          this.releaseBlockQuantity();
          this.setState({ isFetching: false });
        } else if (apiRequestCallId === this.confirmStripePaymentID) {
          this.releaseBlockQuantity();
          this.setState({ isFetching: false });
        } else if (
          apiRequestCallId === this.shippingChargeCalculationApiCallID
        ) {
          this.setState({
            isShowError: true,
            message: responseJson.message,
            showAlertModal: true,
            isFetching: false
          });
        } else if (
          apiRequestCallId === this.releaseShippingChargeCalculationApiCallID
        ) {
          this.setState({
            isShowError: true,
            message: responseJson.message,
            showAlertModal: true,
            isFetching: false
          });
          this.props.navigation.goBack();
        }
        // Customizable Area Start
        // Customizable Area End
      }
      if (responseJson && responseJson.errors) {
        if (apiRequestCallId === this.getUserProfileApiCallId) {
          this.setState({
            isShowError: true,
            message: responseJson.errors,
            showAlertModal: true,
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
            message: responseJson.errors,
            showAlertModal: true,
            isFetching: false
          });
        } else if (apiRequestCallId === this.saveAddressId) {
          this.setState({
            isShowError: true,
            message: responseJson.errors,
            showAlertModal: true,
            isFetching: false
          });
        } else if (apiRequestCallId === this.checkAvailabilityId) {
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
        } else if (apiRequestCallId === this.createStripePaymentId) {
          this.setState({
            isShowError: true,
            message: responseJson.errors,
            showAlertModal: true,
            isFetching: false
          });
        }
        // Customizable Area Start
        // Customizable Area End
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
        } else if (apiRequestCallId === this.createStripePaymentId) {
          this.setState({
            isShowError: true,
            message: errorReponse,
            showAlertModal: true,
            isFetching: false
          });
        }
        // Customizable Area Start
        // Customizable Area End
      }
    }
    // Customizable Area Start
    // Customizable Area End
  }

  getShippingChargeCalculation = async () => {
    const shipping = this.state.shippingAddressData;
    let cartId = "";
    const buyNowCartID = this.props.navigation.state.params.buyNowCartID;
    if (buyNowCartID) {
      cartId = buyNowCartID;
    } else {
      cartId = this.state.cartData.attributes.id;
    }
    let data = {
      cart_id: cartId,
      zipcode: shipping.zip_code
    };
    this.shippingChargeCalculationApiCallID = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.apiMethodTypePut,
      endPoint: configJSON.shippingChargeCalculationApiEndPoint,
      body: data
    });
  };

  releaseShippingChargeCalculation = async () => {
    const shipping = this.state.shippingAddressData;
    let cartId = "";
    const buyNowCartID = this.props.navigation.state.params.buyNowCartID;
    if (buyNowCartID) {
      cartId = buyNowCartID;
    } else {
      cartId = this.state.cartData.attributes.id;
    }
    let data = {
      cart_id: cartId,
      zipcode: shipping.zip_code
    };
    this.releaseShippingChargeCalculationApiCallID = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.apiMethodTypePut,
      endPoint: configJSON.releaseShippingChargeCalculationApiEndPoint,
      body: data
    });
  };

  getShippingChargeCalculationSuccessCallBack = (res: any) => {
    this.setState({
      cartList: res.data.attributes.order_items,
      cartData: res.data,
      isFetching: false,
      emptyCart: res.data.attributes.order_items.length === 0 ? true : false,
      isCouponApplied:
        res.data.attributes.coupon_code_id != null &&
        res.data.attributes.applied_discount > 0.0
          ? true
          : false,
      isValidCoupon:
        res.data.attributes.coupon_code_id != null &&
        res.data.attributes.applied_discount > 0.0
          ? true
          : false
    });
  };

  releaseShippingChargeCalculationSuccessCallBack = () => {
    this.props.navigation.goBack();
  };

  getCartList = async () => {
    this.setState({
      isFetching: true
    });
    let endPoint = configJSON.cartListAPiEndPoint;
    const buyNowCartID = this.props.navigation.state.params.buyNowCartID;
    if (buyNowCartID) {
      endPoint = `${configJSON.cartListAPiEndPoint}?cart_id=${buyNowCartID}`;
    }
    this.getCartListApiCallId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: endPoint
    });
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
      addressData.delivery_address_id = addressData.address.id;
    }
    this.saveAddressId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.apiMethodTypePut,
      endPoint:
        configJSON.addAddressToOrder +
        "/" +
        this.state.cartData.attributes.id +
        "/add_address_to_order",
      body: addressData
    });
  };

  releaseBlockQuantity = async () => {
    this.releaseBlockQuantityApiCallId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.apiMethodTypePut,
      endPoint:
        configJSON.cartListAPiEndPoint +
        "/" +
        this.state.cartData.id +
        "/release_products"
    });
  };

  releaseBlockQuantitySuccessCallBack = () => {};

  releaseBlockQuantityFailureCallBack = () => {};

  checkZipcodeAvailability = async () => {
    const shipping = this.state.shippingAddressData;
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
        this.state.cartData.id +
        "/check_availability"
    });
  };

  onConfirmingOrder = () => {
    // Customizable Area Start
    Alert.alert(
      "Order Confirmation",
      "Are you sure want to place the order?",
      [
        {
          text: "Cancel",
          onPress: () => this.releaseBlockQuantity(),
          style: "cancel"
        },
        { text: "OK", onPress: () => this.placeOrder() }
      ],
      { cancelable: false }
    );
    // Customizable Area End
  };

  placeOrder = async () => {
    // Customizable Area Start
    if (this.state.isPaymentOption1Selected) {
      this.placeConfirmOrder();
    } else {
      const id = this.state.cartData.attributes.id;
      let orderData = new FormData();
      orderData.append("order_id", id);
      const currencyType = themeJson.attributes.currency_type;
      if (currencyType === "INR") {
        this.getRazorpayOrderId();
      } else {
        this.requestPayment();
      }
    }
    // Customizable Area End
  };

  requestPayment = async () => {
    try {
      const paymentMethod = await stripe.paymentRequestWithCardForm({
        theme: {
          primaryBackgroundColor: "white",
          secondaryBackgroundColor: "white",
          primaryForegroundColor: "black",
          secondaryForegroundColor: "black",
          accentColor: "blue",
          errorColor: "red"
        }
      });
      if (paymentMethod) {
        const userID = (await StorageProvider.get("USER_ID")) || "";
        let stripeData = {
          data: {
            attributes: {
              account_id: userID,
              order_id: this.state.cartData.attributes.id
            },
            payment_token: paymentMethod.id
          }
        };
        this.setState(
          { cardToken: paymentMethod.id, isFetching: true },
          async () => {
            this.createStripePaymentId = await this.apiCall({
              endPoint: configJSON.createPaymentApiEndPoint,
              contentType: configJSON.ApiContentType,
              method: configJSON.ApiMethodPostType,
              body: stripeData
            });
          }
        );
      }
    } catch (error) {
      let message = "";
      if (this.isPlatformiOS()) {
        message = error.message;
      } else {
        message = error.message;
      }
      this.setState({
        isShowError: true,
        message: message,
        showAlertModal: true,
        isFetching: false
      });
      this.releaseBlockQuantity();
    }
  };

  getRazorpayOrderId = async () => {
    const { id } = this.state.cartData;
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

  razorpayAddonMethod = (razorpay_order_id: any) => {
    // Customizable Area Start
    let profileData = this.state.profileData;
    const { email, full_name, full_phone_number } = profileData.attributes;
    var options = {
      description: "Credits towards consultation",
      currency: "INR",
      key: RAZORPAY_KEY_ID, // Your api key
      order_id: razorpay_order_id,
      name: "Ecommerce",
      prefill: {
        email: email,
        contact: full_phone_number,
        name: full_name
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
        let message = "";
        if (Platform.OS === "ios") {
          message = error.description;
        } else {
          let localError = JSON.parse(error.description);
          message = localError.error.description;
        }
        this.setState({
          isShowError: true,
          message: message,
          showAlertModal: true,
          isFetching: false
        });
        this.releaseBlockQuantity();
        console.log("localError in localError", error);
      });
      // Customizable Area End
  };

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
      cart_id: this.state.cartData.attributes.id,
      is_gift: false,
      schedule_time: ""
    };
    this.placeOrderId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.ApiMethodPostType,
      endPoint: configJSON.placeOrderAPIEndPoint,
      body: data
    });
  };

  onVerifyAddonRazorpaySuccess = (res: any) => {
    this.props.navigation.navigate("OrderConfirm", {
      orderSuccess: true,
      orderData: {
        order: {
          placed_at: res.order.placed_at,
          total: res.order.total
        }
      }
    });
  };

  createStripePaymentSuccessCallBack = async (res: any) => {
    try {
      const result = await stripe.confirmPaymentIntent({
        clientSecret: res.client_secret,
        paymentMethodId: this.state.cardToken
      });

      if (result.status === "succeeded") {
        this.setState({ isFetching: true });
        let stripeData = {
          data: {
            stripe_payment_id: this.state.cardToken,
            payment_intent_id: result.paymentIntentId
          }
        };
        this.confirmStripePaymentID = await this.apiCall({
          endPoint: configJSON.confirmStripePaymentEndPoint,
          contentType: configJSON.ApiContentType,
          method: configJSON.apiMethodTypePut,
          body: stripeData
        });
      }
    } catch (e) {
      this.releaseBlockQuantity();
    }
  };

  onConfirmStripePaymentSuccessCallBack = (res: any) => {
    this.setState({ isFetching: false });
    this.props.navigation.navigate("OrderConfirm", {
      orderSuccess: true,
      orderData: {
        order: {
          placed_at: res.order.placed_at,
          total: res.order.total
        }
      }
    });
  };

  getVarientString = (properties: any) => {
    let varientString = "";
    if (properties) {
      properties.map((property: any, index: any) => {
        varientString = `${varientString}${property.variant_name}: ${
          property.property_name
        }`;
        if (!(index === properties.length - 1)) {
          varientString += `,${"\n"}`;
        }
      });
    }
    return varientString;
  };
  // Customizable Area Start
  // Customizable Area End
}
