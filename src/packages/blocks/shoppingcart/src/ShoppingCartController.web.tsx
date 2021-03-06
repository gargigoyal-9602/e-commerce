import React from "react"
import { AsyncStorage } from "react-native";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';
import shape from "@material-ui/core/styles/shape";
import Catalogue from "../../catalogue/src/Catalogue";
import { string } from "yup";
// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config.js")

export interface Props {
  navigation: any;
  id: string;
}
interface S {
  cart: any;
  wholeCart: any;
  cartId: any;
  catalogue_id: any;
  couponSuccess: any;
  isRealeasedShippingCharge: boolean;
  loading: boolean;
  buyNow: any;
  buyNowQuantity: any
  alreadyInWishlist: boolean
}
interface SS {
  id: any;
}

export default class DashboardController extends BlockComponent<Props, S, SS> {
  auth: string | null | undefined = window.localStorage.getItem("token");
  GetCartApiCallId: string = "";
  releaseShippingAddressChargeCallId: string = "";
  putUpdateCartQuantityApiCallId: string = "";
  delCartItemApiCallId: string = "";
  postWishlistApiCallId: string = "";
  postApplyCouponApiCallId: string = "";
  delCouponApiCallId: string = "";
  postBuyNowApiCallId: string = ""




  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials)
    ];

    this.state = {
      cart: [],
      wholeCart: "",
      cartId: "",
      catalogue_id: "",
      couponSuccess: "",
      isRealeasedShippingCharge: false,
      loading: false,
      buyNow: JSON.parse(localStorage.getItem("buyNow") || '{}'),
      buyNowQuantity: 1,
      alreadyInWishlist: false
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }


  // Customizable Area Start

  async componentDidMount() {
    //this.getCart();
    Object.keys(this.state.buyNow).length > 0
      ? this.postBuyNow(this.state.buyNow.cat_id, this.state.buyNow.sub_id) :
      this.getCart();

  }

  async receive(from: string, message: Message) {

    // runEngine.debugLog("Message Recived", message);

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      if (responseJson) {
        const apiRequestCallId = message.getData(
          getName(MessageEnum.RestAPIResponceDataMessage)
        );
        if (apiRequestCallId != null) {

          if (apiRequestCallId === this.releaseShippingAddressChargeCallId) {
            Object.keys(this.state.buyNow).length > 0
              ? this.postBuyNow(this.state.buyNow.cat_id, this.state.buyNow.sub_id) :
              this.getCart();

          }
          // get cart
          if (apiRequestCallId === this.GetCartApiCallId) {
            if (responseJson && responseJson.data) {
              //console.log(responseJson.data[0], "here iscart")
              this.setState({
                cart: responseJson.data[0]?.attributes?.order_items,
                cartId: responseJson.data[0]?.id,
                wholeCart: responseJson.data[0]?.attributes,
                loading: false
              }, this.releaseShippingCharge)
              localStorage.setItem("cart_length", responseJson.data[0].attributes.order_items.length)


            }
            if (responseJson && responseJson.errors && responseJson.errors.length > 0) {
              this.setState({
                loading: false
              })
              localStorage.removeItem("cart_length")


              //@ts-ignore
              //window.notify([{ type: 'error', message: responseJson.errors[0].message }])
            }
          }

          //update cart quantity

          if (apiRequestCallId === this.putUpdateCartQuantityApiCallId) {
            //console.log(responseJson, "UpdateCartQuantity");
            {
              Object.keys(JSON.parse(localStorage.getItem("buyNow") || '{}')).length == 0 &&
                this.getCart()
            }
            // @ts-ignore
            window.notify([{ message: "Cart updated successfully ", type: "success" }]);
          }

          // delete cart item

          if (apiRequestCallId === this.delCartItemApiCallId) {
            //console.log(responseJson, "deleted cart");

            this.getCart()

            // @ts-ignore
            const cart_length = parseInt(localStorage.getItem("cart_length"))
            // @ts-ignore

            localStorage.setItem("cart_length", cart_length - 1)

          }

          /// add to wishlist 

          if (apiRequestCallId === this.postWishlistApiCallId) {
            if (!responseJson.errors) {
              //console.log(responseJson, "added to wishlist");
              //this.getCart()
              if (responseJson?.message == "Could not add, maybe already present in wishlist") {
                this.setState({
                  alreadyInWishlist: true
                })
              } else {
                // @ts-ignore
                const wishlist_length = parseInt(localStorage.getItem("wishlist_len"))
                // @ts-ignore
                localStorage.setItem("wishlist_len", wishlist_length + 1)
              }
              // @ts-ignore
              window.notify([{ message: responseJson?.message, type: "success" }]);

            }
            else {
              // @ts-ignore
              window.notify([{ message: responseJson?.message, type: "success" }]);
            }

          }

          //apply coupon 
          if (apiRequestCallId === this.postApplyCouponApiCallId) {
            if (responseJson && responseJson.data) {
              //console.log(responseJson, "apply coupon");
              // @ts-ignore
              window.notify([{ message: responseJson?.data?.message, type: "success" }]);
              this.getCart()

            }
            if (responseJson && responseJson.errors) {
              // @ts-ignore
              window.notify([{ message: responseJson.errors[0], type: "error" }]);
            }
            else {
              // @ts-ignore
              window.notify([{ message: responseJson.message, type: "warning" }]);
            }
          }

          //post buynow 
          if (apiRequestCallId === this.postBuyNowApiCallId) {
            //console.log(responseJson.data, "postbuy")
            if (responseJson && responseJson.data) {

              this.setState({
                cart: responseJson.data.attributes.order_items,
                cartId: responseJson.data.id,
                wholeCart: responseJson.data.attributes,
                loading: false
              }, this.releaseShippingCharge)
              localStorage.setItem("cart_length", responseJson.data.attributes.order_items.length)


            }
            if (responseJson && responseJson.errors && responseJson.errors.length > 0) {
              this.setState({
                loading: false
              })
              localStorage.removeItem("cart_length")


              //@ts-ignore
              //window.notify([{ type: 'error', message: responseJson.errors[0].message }])
            }


          }

          // delete coupon 
          if (apiRequestCallId === this.delCouponApiCallId) {
            //console.log(responseJson, "delete coupon");
            // @ts-ignore
            window.notify([{ message: "Coupon deleted successfully", type: "success" }]);
            setTimeout(() => {

              this.getCart()
            }, 300)


          }
        }


      } if (responseJson && responseJson.errors && responseJson.errors.length > 0) {

        const errors = responseJson.errors[0].order
        // @ts-ignore
        window.notify([{ message: errors, type: "error" }]);

      }
    }
  }


  releaseShippingCharge = () => {

    const { isRealeasedShippingCharge } = this.state;

    if (!isRealeasedShippingCharge) {
      this.setState({ isRealeasedShippingCharge: true });
      const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
      const token = localStorage.getItem("token");
      const httpBody = {
        cart_id: this.state?.cartId,
      };
      this.releaseShippingAddressChargeCallId = requestMessage.messageId;
      requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.releaseShippingAddressChargeAPIEndPoint);

      const headers = {
        'Content-Type': 'application/json',
        token
      };

      requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), headers);
      requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.putAPiMethod);
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(httpBody)
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
    }
  }
  // get cart items
  getCart = (): boolean => {
    const token1 = localStorage.getItem("token");
    this.setState({
      ...this.state,
      loading: true,
    });

    let headers = {
      "Content-Type": configJSON.validationApiContentType,
      token: token1,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.GetCartApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiGetIsCartCreated
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  // update cart quantity 
  putUpdateCartQuantity = (product_id: any, product_variant: any, quantity: any): boolean => {

    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: localStorage.getItem("token"),

    };
    setTimeout(() => {

      const httpBody = {
        "quantity": quantity,
        "product_id": product_id,
        "product_variant": product_variant
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.putUpdateCartQuantityApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.endPointApiPutUpdateCartQuantity + `${this.state.cartId}/update_item_quantity`
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(httpBody)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.putAPiMethod
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);

    }, 500);




    return true;
  };


  // delete cart item
  deleteCartItem = (product_id: any, product_variant: any): boolean => {

    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: localStorage.getItem("token"),

    };
    const httpBody = {
      "product_variant_id": product_variant,
      "product_id": product_id
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.delCartItemApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiPutUpdateCartQuantity + `${this.state.cartId}/delete_item`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.delAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };


  /// add to wishlist 
  postWishlist = (catalogue_id: any): boolean => {
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: localStorage.getItem("token"),

    };

    const httpBody = {
      "catalogue_id": catalogue_id
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postWishlistApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiPostWishlist
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);


    return true;
  };

  // apply coupon
  postApplyCoupon = (code: any, amount: any): boolean => {
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: localStorage.getItem("token"),

    };

    const httpBody = {
      "code": code,
      "cart_value": amount
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postApplyCouponApiCallId = requestMessage.messageId;
    //console.log(this.state.cartId)
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiPostApplyCoupon + `${this.state.cartId}/apply_coupon`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);


    return true;
  };

  // delete coupon
  deleteCoupon = (): boolean => {

    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: localStorage.getItem("token"),

    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.delCouponApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiPostApplyCoupon + `${this.state.cartId}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );



    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.delAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  //buy now post
  postBuyNow = (catalogue_id: any, catalogue_variant_id: any): boolean => {

    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: localStorage.getItem("token"),
    };
    console.log(this.state.buyNow.quantity, "qasdfgthjkhgfdsaAGFTHJK,")
    const httpBody = {
      "catalogue_id": catalogue_id,
      "catalogue_variant_id": catalogue_variant_id,
      "quantity": this.state.buyNow.quantity
    };


    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postBuyNowApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApipostBuyNow
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }


  // to set item quantity 
  toSetdefaultVariant = (index: any, catalogue_id: any) => {
    this.setState({
      catalogue_id: catalogue_id
    })
    // @ts-ignore
    this.props?.history.push(`/shop/${catalogue_id}`)

    const default_variant = this.state.cart[index].attributes.catalogue_variant_id

    //localStorage.setItem("default_variant", default_variant)
  }

  //item to move to wishlist
  moveToWishlist = (catalogue_id: any, variant_id: any) => {


    this.getCart()
    this.postWishlist(catalogue_id);
    setTimeout(() => {
      (this.state.alreadyInWishlist == false) && this.deleteCartItem(catalogue_id, variant_id);
      this.setState({
        alreadyInWishlist: false
      })
    }, 500);

  }

  // to apply coupon

  toApplyCoupon = (code: any, amount: any) => {

    this.state.cartId && this.postApplyCoupon(code, amount)
  }

  // Customizable Area End
}
