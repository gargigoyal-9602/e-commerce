import { BackHandler } from "react-native";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { initialRatingList } from "../../studio-store-ecommerce-theme/src/constants";
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
  myOrderList: any;
  productItems: any;
  noProductFound: boolean;
  showCancelOrderModal: boolean;
  showSubmitReviewModal: boolean;
  ratingList: any;
  reviewText: string;
  isInvalidReview: boolean;
  selectedOrderData: any;
  cancelData: any;
  isCancelLoadig: boolean;
  pageCount: number;
  limit: number;
  pageLoader: boolean;
  onEndReachedCalledDuringMomentum: boolean;
  lastLoadCount: 0;
  notFinalLoad: boolean;
  isFetching: boolean;
  showAlertModal: boolean;
  isShowError: boolean;
  message: any;
  cartData: any;
  isCancleLoading: boolean;
  cartHasProduct: boolean;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class OrdermanagementController extends BlockComponent<
  Props,
  S,
  SS
> {
  getMyOrdersListAPICallID: any;
  submitOrderReviewAPICallID: any;
  createCartAPICallID: any;
  cartHasProductAPICallID: any;
  cancelOrderAPICallID: any;

  _unsubscribe: any;
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage)
    ];

    this.state = {
      myOrderList: [],
      productItems: [],
      noProductFound: false,
      showCancelOrderModal: false,
      showSubmitReviewModal: false,
      ratingList: initialRatingList,
      reviewText: "",
      isInvalidReview: false,
      selectedOrderData: null,
      cancelData: null,
      isCancelLoadig: false,
      pageCount: 1,
      limit: 10,
      pageLoader: false,
      onEndReachedCalledDuringMomentum: true,
      lastLoadCount: 0,
      notFinalLoad: false,
      isFetching: true,
      showAlertModal: false,
      isShowError: false,
      message: "",
      cartData: null,
      isCancleLoading: false,
      cartHasProduct: false
      // Customizable Area Start
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("willFocus", () => {
      this.getMyOrderListData();
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.handleBackButtonClick
      );
    });
    // Customizable Area Start
    // Customizable Area End
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
    // Customizable Area Start
    // Customizable Area End
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
        if (apiRequestCallId === this.getMyOrdersListAPICallID) {
          this.myOrderListSuccessCallBack(responseJson.data);
        }

        if (apiRequestCallId === this.submitOrderReviewAPICallID) {
          this.submitOrderReviewSuccessCallBack();
        }

        if (apiRequestCallId === this.cancelOrderAPICallID) {
          this.cancelOrderSuccessCallBack();
        }

        if (apiRequestCallId === this.createCartAPICallID) {
          this.createCartSuccessCallBack();
        }

        if (apiRequestCallId === this.cartHasProductAPICallID) {
          this.cartHasProductSuccessCallBack(responseJson.data);
        }
        // Customizable Area Start
        // Customizable Area End
      } else if (responseJson && responseJson.errors) {
        if (apiRequestCallId === this.getMyOrdersListAPICallID) {
          this.myOrderListFailureCallBack(responseJson);
        }

        if (apiRequestCallId === this.submitOrderReviewAPICallID) {
          this.submitOrderReviewFailureCallBack(responseJson);
        }

        if (apiRequestCallId === this.cancelOrderAPICallID) {
          this.cancelOrderFailureCallBack(responseJson);
        }

        if (apiRequestCallId === this.createCartAPICallID) {
          this.createCartFailureCallBack(responseJson);
        }

        if (apiRequestCallId === this.cartHasProductAPICallID) {
          this.cartHasProductFailureCallBack();
        }
        // Customizable Area Start
        // Customizable Area End
      } else if (errorReponse) {
        setTimeout(() => {
          this.setState({
            isFetching: false
          });
        }, 0);
        // Customizable Area Start
        // Customizable Area End
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

  getMyOrderListData = async () => {
    this.setState({ isFetching: true });

    this.getMyOrdersListAPICallID = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.GetMethodType,
      endPoint: `${configJSON.getMyOrdersListEndPoint}?page=${
        this.state.pageCount
      }&per_page=10`
    });
  };

  myOrderListSuccessCallBack = async (res: any) => {
    if (this.state.pageCount === 1) {
      this.setState(
        {
          myOrderList: res.order.data,
          pageLoader: false,
          lastLoadCount: res.order.data.length,
          onEndReachedCalledDuringMomentum:
            res.order.data.length >= this.state.limit ? true : false,
          notFinalLoad: res.order.data.length >= this.state.limit ? true : false
        },
        () => {
          if (this.state.myOrderList.length === 0) {
            this.setState({ noProductFound: true, isFetching: false });
          } else {
            this.setState({ isFetching: false });
          }
        }
      );
    } else {
      this.setState(
        {
          myOrderList: this.state.myOrderList.concat(res.order.data),
          pageLoader: false,
          lastLoadCount: this.state.myOrderList.concat(res.order.data).length,
          onEndReachedCalledDuringMomentum:
            this.state.myOrderList.concat(res.order.data).length >=
            this.state.limit
              ? true
              : false,
          notFinalLoad:
            this.state.myOrderList.concat(res.order.data).length >=
            this.state.limit
              ? true
              : false
        },
        () => {
          if (this.state.myOrderList.length === 0) {
            this.setState({ noProductFound: true, isFetching: false });
          } else {
            this.setState({ isFetching: false });
          }
        }
      );
    }
    this.refreshCart();
    // Customizable Area Start
    // Customizable Area End
  };

  myOrderListFailureCallBack = (error: any) => {
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
    // Customizable Area Start
    // Customizable Area End
  };

  createCartSuccessCallBack = () => {
    // Customizable Area Start
    // Customizable Area End
  };

  createCartFailureCallBack = (error: any) => {
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
    // Customizable Area Start
    // Customizable Area End
  };

  cartHasProductSuccessCallBack = (res: any) => {
    this.setState({ cartHasProduct: res.has_cart_product });
    // Customizable Area Start
    // Customizable Area End
  };

  cartHasProductFailureCallBack = () => {
    // Customizable Area Start
    // Customizable Area End
  };

  submitOrderReview = async () => {
    if (this.state.reviewText.trim().length === 0) {
      this.setState({ isInvalidReview: true });
      return;
    }
    this.setState({ showSubmitReviewModal: false }, async () => {
      let count = 0;
      this.state.ratingList.map((item: any) => {
        if (item.isSelected) {
          count = count + 1;
        }
      });

      let userID = (await StorageProvider.get("Userdata")) || "";
      let data = {
        userID: userID,
        order_item_id: this.state.selectedOrderData.id,
        rating: count,
        comment: this.state.reviewText
      };
      this.submitOrderReviewAPICallID = await this.apiCall({
        contentType: configJSON.ApiContentType,
        method: configJSON.PostMethodType,
        endPoint: configJSON.submitOrderReviewEndPoint,
        body: data
      });
    });
  };

  submitOrderReviewSuccessCallBack = () => {
    setTimeout(() => {
      this.setState({
        message: "Review submitted successfully.",
        isShowError: false,
        showAlertModal: true,
        isFetching: false
      });
    }, 0);
    this.resetStar();
    this.getMyOrderListData();
  };

  submitOrderReviewFailureCallBack = (error: any) => {
    this.resetStar();
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

  onPressStar = (item: any) => {
    let localRating = this.state.ratingList;
    let selectedRatingIndex = localRating.findIndex(
      (ratItem: any) => ratItem.id === item.id
    );
    localRating.map((ratingItem: any, index: any) => {
      if (index <= selectedRatingIndex) {
        return (ratingItem.isSelected = true);
      } else {
        return (ratingItem.isSelected = false);
      }
    });
    this.setState({ ratingList: localRating });
  };

  resetStar = () => {
    let localRating: any = this.state.ratingList;
    localRating.map((ratingItem: any) => {
      if (ratingItem.id !== 1) {
        ratingItem.isSelected = false;
      }
    });
    this.setState({ ratingList: localRating, reviewText: "" }, () => {});
  };

  cancelOrder = async () => {
    this.setState({ isCancleLoading: true, showCancelOrderModal: false });
    let myOrderList = this.state.cancelData;
    this.cancelOrderAPICallID = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.PutMethodType,
      endPoint: `${configJSON.cancelOrderEndPoint}/${
        myOrderList.id
      }/cancel_order`
    });
  };

  cancelOrderSuccessCallBack = () => {
    this.setState({
      pageCount: 1,
      isCancleLoading: false,
      showCancelOrderModal: false,
      isFetching: false
    });
    setTimeout(() => {
      this.setState({
        message: "Order cancelled successfully.",
        isShowError: false,
        showAlertModal: true,
        isFetching: false
      });
    }, 0);
    this.getMyOrderListData();
  };

  cancelOrderFailureCallBack = (error: any) => {
    this.setState({ isCancleLoading: false, showCancelOrderModal: false });
    this.resetStar();
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

  onEndReached = async () => {
    const {
      lastLoadCount,
      notFinalLoad,
      limit,
      onEndReachedCalledDuringMomentum
    } = this.state;
    if (!onEndReachedCalledDuringMomentum) {
      this.setState({ onEndReachedCalledDuringMomentum: true }, () => {
        setTimeout(() => {
          if (lastLoadCount >= limit && notFinalLoad) {
            this.setState(
              {
                pageCount: this.state.pageCount + 1,
                pageLoader: true
              },
              async () => {
                this.setState({ isFetching: true });
                this.getMyOrdersListAPICallID = await this.apiCall({
                  contentType: configJSON.ApiContentType,
                  method: configJSON.GetMethodType,
                  endPoint: `${configJSON.getMyOrdersListEndPoint}?page=${
                    this.state.pageCount
                  }&per_page=10`
                });
              }
            );
          }
        }, 1500);
      });
    }
  };

  // Check if list has started scrolling
  _onMomentumScrollBegin = () =>
    this.setState({ onEndReachedCalledDuringMomentum: false });

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

  getSlotString = (slot: any) => {
    if (slot.includes("AM") || slot.includes("am")) {
      return "Morning";
    }
    return "Evening";
  };

  refreshCart = async () => {
    this.cartHasProductAPICallID = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.GetMethodType,
      endPoint: configJSON.cartHasProductEndPoint
    });
  };
  // Customizable Area Start
  // Customizable Area End
}
