import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import axios from "axios";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// @ts-ignore
import map from "lodash/map";
// Customizable Area Start
// import { imgPasswordInVisible, imgPasswordVisible } from "../assets";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  wishlist: any;
  order: any;
  history: any;
  getOrders: any;
  // cancelOrder: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  ShowCOModal: boolean;
  ShowPRModal: boolean;
  currentOrder: any;
  activeTab: string;
  orders: any;
  cancelOrder: any;
  reviewProduct: any;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class SingleOrdersController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  getOrdersCallId: string = "";
  cancelOrderCallId: string = "";
  writeReviewCallID: string = "";
  validationApiCallId: string = "";
  emailReg: RegExp;
  labelTitle: string = "";
  getAllNotificationsAPICallId: string;
  // Customizable Area End

  constructor(props: Props) {

    super(props);
    this.receive = this.receive.bind(this);
    this.confirmCancelOrder = this.confirmCancelOrder.bind(this);
    this.openProductRatingModal = this.openProductRatingModal.bind(this);
    this.writeReview = this.writeReview.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials)
    ]

    this.state = {
      ShowCOModal: false,
      ShowPRModal: false,
      currentOrder: {},
      activeTab: '1',
      orders: [],
      cancelOrder: {},
      reviewProduct: {}
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    // this.callGetValidationApi();
    this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    this.getOrders();
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start


  // Customizable Area End

  async receive(from: string, message: Message) {

    // Customizable Area Start
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJSON = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      const errorMessage = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (this.getOrdersCallId === apiRequestCallId) {
        this.setState({ orders: responseJSON?.data?.order });
      }

      if (this.cancelOrderCallId === apiRequestCallId) {

        if (responseJSON?.errors) {
          map(responseJSON.errors, (error: any) => {
            map(error, (value: any, key: any) => {
              // @ts-ignore
              window.notify([{ message: value || "Something went wrong!!!", type: "danger" }]);
            })
          })
        } else {
          // @ts-ignore
          window.notify([{ message: responseJSON?.data?.message || "Order cancelled successfully!!!", type: "success" }]);
          this.props.getOrders();
        }
      }

      if (this.writeReviewCallID === apiRequestCallId) {
        if (responseJSON?.errors) {
          map(responseJSON.errors, (error: any) => {
            map(error, (value: any, key: any) => {
              // @ts-ignore
              window.notify([{ message: value || "Something went wrong!!!", type: "danger" }])
            })
          })
        } else if (responseJSON?.data) {
          // @ts-ignore
          window.notify([{ message: "Thank you for you review!!!", type: "success" }])
          this.props.getOrders();
          this.openProductRatingModal();
        }
      }
      if (apiRequestCallId === this.getAllNotificationsAPICallId) {
        if (responseJSON && responseJSON.data) {
          const { notifications } = responseJSON.data;
          const { data, meta } = responseJSON;
          let unreadNotifyCount: number = 0;
          notifications?.data?.map((ele: any, index: number) => {
            if (!ele?.attributes?.is_read) {
              //@ts-ignore
              unreadNotifyCount = unreadNotifyCount + 1;
            }
          });
          //@ts-ignore
          console.log("unreadNotifyCount", unreadNotifyCount);
          const countNotify = localStorage.getItem('notifctaion_len');
          //@ts-ignore
          if (countNotify != unreadNotifyCount) {
            //@ts-ignore
            localStorage.setItem('notifctaion_len', unreadNotifyCount);
          }
        }
      }
    }
    // Customizable Area End
  }

  sendLoginFailMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginFaliureMessage));
    this.send(msg);
  }

  getOrders() {
    const token = localStorage.getItem("token");
    const header = {
      token
    }
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getOrdersCallId = requestMessage.messageId;
    // Set Method Type
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.GetMethodType)
    // Set EndPoints
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.getMyOrdersListEndPoint);
    // set Headers 
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);

    // Send Request

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  routeToProfile(value: string) {
    let matchTabName = '';
    switch (value) {
      case 'profile':
        matchTabName = '1';
        break;
      case 'wishlist':
        matchTabName = '2';
        break;
      case 'myorder':
        matchTabName = '3';
        break;
      case 'saveaddresses':
        matchTabName = '4';
        break;
      case 'connectaccount':
        matchTabName = '5';
        break;
      default:
        matchTabName = '1';
        break;
    }
    // @ts-ignore
    this.setState({
      activeTab: matchTabName
    })
  }

  openProductRatingModal() {
    // pRsettt(!ShowPRModal);
    this.setState(prevState => ({
      ShowPRModal: !prevState.ShowPRModal
    }))

  }

  setProductAndOpenPM(product: any) {
    this.openProductRatingModal();
    this.setState({ reviewProduct: product })
  }

  openCancelOrderModal(order: any, item: any) {
    //  setCurrentOrder({ orderId: order?.id, itemId: item?.id });
    //  settt(!ShowCOModal);
    this.setState({
      cancelOrder: { order, item },
      ShowCOModal: true,
    });
  };

  confirmCancelOrder() {
    const { cancelOrder: { order, item } } = this.state;
    const token = localStorage.getItem("token");
    this.setState({
      currentOrder: { orderId: order?.id, itemId: item?.id },
      ShowCOModal: !this.state.ShowCOModal
    })
    const header = {
      token
    }

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.cancelOrderCallId = requestMessage.messageId;
    // Set Method Type
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiPutMethod)
    // Set EndPoints
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), `order_management/orders/${order.id}/cancel_order`);
    // set Headers 
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
    // Send Request

    runEngine.sendMessage(requestMessage.id, requestMessage);

  }

  toggleCancelModal = () => {
    this.setState({ ShowCOModal: !this.state.ShowCOModal })
  }

  routeToOrderDetails(order: any, item: any) {
    this.props.history.push({ pathname: `profile/myorder/${order.id}/${item.id}`, state: { order, orderItem: item } });
  };

  writeReview(data: any) {
    const { comment, rating } = data;
    const token = localStorage.getItem("token");
    const header = {
      "Content-Type": "application/json",
      token
    }
    const body = {
      comment,
      rating,
      order_item_id: this.state?.reviewProduct?.id
    }

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.writeReviewCallID = requestMessage.messageId;
    // Set Method Type
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.PostMethodType)
    // Set EndPoints
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.submitOrderReviewEndPoint);
    // set Headers 
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
    // set Body
    requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(body));
    // requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(requestBody));

    runEngine.sendMessage(requestMessage.id, requestMessage);

  }
  //Get All Notifications API
  getAllNotificationsList = () => {
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getAllNotificationsAPICallId = requestMessage.messageId;

    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.getAllNotificationsAPIEndPoint);
    const headers = {
      'Content-Type': 'application/json',
      token: localStorage.getItem('token'),
    };

    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(headers));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.GetMethodType);

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
}
