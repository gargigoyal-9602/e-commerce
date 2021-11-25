import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import axios from "axios";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  history: any;
  productList: any;
  getWishList: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  showModal: boolean;
  removeProduct: any;

  loading?: boolean;
  cartId: any;
  productToBeAdded: any;

  isItemAddedToCart?: boolean;
  getAddedProductID?: any;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class WishListController extends BlockComponent<
  Props,
  S,
  SS
> {
  deleteItemAPICallId: string;
  addToWishListAPICallId: string;
  // Customizable Area Start
  apiEmailLoginCallId: string = "";
  validationApiCallId: string = "";
  GetIsCartCreatedApiCallId: string = "";
  postCreateCartApiCallId: string = "";
  emailReg: RegExp;
  labelTitle: string = "";
  putItemToCartApiCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.onHandleConfirm = this.onHandleConfirm.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials)
    ]

    this.state = {
      showModal: false,
      removeProduct: [],
      productToBeAdded: "",
      cartId: ""
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
    this.getIsCartCreated();
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      const errorMesssage = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (apiRequestCallId === this.deleteItemAPICallId) {
        if (responseJson && responseJson.data) {
          console.log("responseJson && responseJson.data", responseJson, "&&", responseJson.data);
          this.setState({
            ...this.state,
            loading: false,
          });
          // @ts-ignore
          const wishlist_length = parseInt(localStorage.getItem("wishlist_len"))
          // @ts-ignore
          localStorage.setItem("wishlist_len", wishlist_length - 1)

          // @ts-ignore
          window.notify([{ message: responseJson.message || "The item has been removed from the wishlist", type: "success" }]);
          this.props.getWishList();
        }
      }
      // Add Wish list
      if (apiRequestCallId === this.addToWishListAPICallId) {
        if (responseJson) {
          // @ts-ignore
          window.notify([{ message: responseJson.message || "The item has been added to the wishlist", type: "success" }]);
        }
      }

      //is cart created || checking
      if (apiRequestCallId === this.GetIsCartCreatedApiCallId) {
        console.log(responseJson, "is cart created")
        {
          responseJson?.data && responseJson?.data?.length > 0 && (
            this.setState({
              cartId: responseJson?.data[0]?.id
            }),
            localStorage.setItem("cart_length", responseJson.data[0].attributes.order_items.length)
          )
        }
        // if cart not created then creating cart
        if (apiRequestCallId === this.postCreateCartApiCallId) {
          console.log(responseJson, " cart created")
          if (responseJson.data) {
            //@ts-ignore
            window.notify([{ message: "Item added in cart successfully", type: "success" }]);
            this.getIsCartCreated();
            // @ts-ignore
            const cart_length = parseInt(localStorage.getItem("cart_length"))
            // @ts-ignore
            localStorage.setItem("cart_length", cart_length + 1)

          }
        }
      }
      // add items to the cart
      if (apiRequestCallId === this.putItemToCartApiCallId) {
        // console.log(responseJson, "add items to the cart");
        // // @ts-ignore
        // window.notify([{ message: "Item added in cart successfully", type: "success" }]);
        // // window.location.pathname ==="/home-page" ?  "": this.state.catalogue_id && this.getProductDetails()
        // // @ts-ignore
        // const cart_length = parseInt(localStorage.getItem("cart_length"))
        // // @ts-ignore
        // localStorage.setItem("cart_length", cart_length + 1)
        if (responseJson && responseJson.data) {
          console.log(responseJson, "add items to the cart");
          this.setState({
            loading: false,
            isItemAddedToCart: true
          });
          this.removeProductFromWishList();
          // @ts-ignore
          window.notify([{ message: "Item added in cart successfully", type: "success" }]);
          // this.props?.history?.push('/cart');
          // window.location.pathname ==="/home-page" ?  "": this.state.catalogue_id && this.getProductDetails()
          // @ts-ignore
          const cart_length = parseInt(localStorage.getItem("cart_length"));
          // @ts-ignore
          const wishlist_len = parseInt(localStorage.getItem('wishlist_len'));
          // @ts-ignore
          localStorage.setItem("cart_length", cart_length + 1);
          // @ts-ignore
          localStorage.setItem('wishlist_len', wishlist_len - 1);
        }
        if (responseJson && responseJson.errors && responseJson.errors.length > 0) {
          this.setState({
            loading: false,
            isItemAddedToCart: false
          })
          // @ts-ignore
          window.notify([{ message: responseJson.errors[0].order || "Something Went Wrong !", type: "error" }]);
        }
      }
    }
  }

  addToWishlist(product: any) {
    const token = localStorage.getItem("token");
    const headers = {
      'Content-Type': 'application/json',
      "token": token
    };

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.addToWishListAPICallId = requestMessage.id;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), configJSON.getWishlistApiEndPoint);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), headers);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.PostMethodType)
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  removeFromWishlist(product: any) {
    this.setState({ removeProduct: product, showModal: true });
  }

  removeProductFromWishList() {
    const { removeProduct } = this.state;
    this.setState({
      ...this.state,
      loading: true,
    })
    const productID = this.state.isItemAddedToCart ? this.state.getAddedProductID : removeProduct?.data?.attributes?.id?.data?.id;
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.deleteItemAPICallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.deleteItemAPiEndPoint + '/' + productID);
    const token = localStorage.getItem("token");
    const headers = {
      'Content-Type': 'application/json',
      "token": token
    };

    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), headers);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.DeleteMethodType);
    // requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage),'');
    console.log("request", requestMessage);

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  //  cart function 
  addToCart = (product: any) => {
    console.log(product, "product")
    //this.postCreateCart(product)
    setTimeout(() => {
      this.setState({
        productToBeAdded: product
      })
      console.log(this.state.cartId, "cartid");
      this.state.cartId != "" ? this.putItemToCart(this.state.cartId) : this.postCreateCart(product)
    }, 500);
  }

  toggleModal() {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }))
    // @ts-ignore
    // window.notify([{ message: "Notification", type: "success" }]);
  }

  onHandleConfirm() {
    this.removeProductFromWishList();
    this.setState({ showModal: false });
  }

  //is cart created || checking
  getIsCartCreated = (): boolean => {
    const headers = {
      "Content-Type": configJSON.dashboarContentType,
      token: localStorage.getItem("token"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.GetIsCartCreatedApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getCartApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GetMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  /// create cart 
  postCreateCart = (product: any): boolean => {
    // const product = this.state.productToBeAdded

    const header = {
      "Content-Type": configJSON.dashboarContentType,
      token: localStorage.getItem("token"),

    };

    const httpBody = {
      "catalogue_id": product.catalogue_id,
      "catalogue_variant_id": product.id,
      "quantity": 1

    };


    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postCreateCartApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getCartApiEndPoint
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
      configJSON.PostMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  /// add items into the cart
  putItemToCart = (cartId: any): boolean => {
    this.setState({
      loading: true,
      getAddedProductID: this.state.productToBeAdded?.catalogue_id
    });
    const product = this.state.productToBeAdded;
    const catlogue_variant = product?.attributes?.catalogue_variants?.length > 0 ? product?.attributes?.catalogue_variants?.length : '';

    const header = {
      "Content-Type": configJSON.dashboarContentType,
      token: localStorage.getItem("token"),

    };
    const httpBody = {
      "catalogue_id": product.catalogue_id,
      "catalogue_variant_id": product.id,
      // "catalogue_id": product.id,
      // "catalogue_variant_id": product?.attributes?.catalogue_variants[catlogue_variant - 1]?.id,
      "quantity": 1
    };

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.putItemToCartApiCallId = requestMessage.messageId;

    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getCartApiEndPoint + `/${cartId}/add_item`);

    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(httpBody));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.PutMethodType);

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };
}
