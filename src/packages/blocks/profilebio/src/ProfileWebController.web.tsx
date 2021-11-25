//@ts-nocheck;
import { IBlock } from '../../../framework/src/IBlock';
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// @ts-ignore
import map from "lodash/map";

// Customizable Area Start
// import { imgPasswordInVisible, imgPasswordVisible } from "../assets";
// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  order: any;
  history: any;
  location: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  userData: any;
  email: string;
  userName: string;
  profileImage: any;
  activeTab: any;
  orders: any;
  openLogoutModal?: boolean;
  data?: any;
  wishlist: any;
  loadingOrder: boolean;
  loadingWishlist: boolean;
  totalNotifications?: number;
  commonLoader?: boolean;
  totalOrdersCount?: number;
  isLoadMoreOrders?: boolean;
  currentOrdersPageNo?: number;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class ProfileWebController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  apiEmailLoginCallId: string = "";
  validationApiCallId: string = "";
  getOrdersCallID: string = "";
  cancelOrderCallID: string = "";
  getWishListCallID: string = "";
  emailReg: RegExp;
  labelTitle: string = "";
  //logout handler
  openLogout?: boolean;
  getAllNotificationsAPICallId: string;
  // Customizable Area End

  constructor(props: Props) {

    super(props);
    this.receive = this.receive.bind(this);
    this.onHandleLogout = this.onHandleLogout.bind(this);
    this.getWishList = this.getWishList.bind(this);
    this.getOrders = this.getOrders.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials)
    ]
    this.state = {
      userData: [],
      email: "xyz@gmail.com",
      userName: "Hello WOrld",
      profileImage: localStorage.getItem('profileImage') || require('./images/user.png'),
      activeTab: "1",
      orders: [],
      wishlist: [],
      loadingOrder: false,
      loadingWishlist: false
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

      if (this.getOrdersCallID === apiRequestCallId) {
        this.setState({ loadingOrder: false, commonLoader: false });
        if (responseJSON?.errors) {
          map(responseJSON.errors, (error: any) => {
            map(error, (value: any, key: any) => {
              // @ts-ignore
              window.notify([{ message: value || "Something went wrong!!!", type: "danger" }])
            })
          })
        }

        if (responseJSON?.data?.order?.data) {
          this.setState({
            orders: this.state.isLoadMoreOrders ? [...this.state.orders, ...responseJSON.data.order.data] : responseJSON.data.order.data
            // orders: responseJSON.data.order.data
          });
        }
        if (responseJSON?.data?.meta?.pagination) {
          this.setState(
            {
              totalOrdersCount: responseJSON?.data?.meta?.pagination?.total_count,
              isLoadMoreOrders: responseJSON?.data?.meta?.pagination?.next_page != null ? true : false,
              currentOrdersPageNo: responseJSON?.data?.meta?.pagination?.current_page
            });
        }
      }

      if (this.cancelOrderCallID === apiRequestCallId) {
        this.setState({ loadingOrder: false })
        if (responseJSON?.errors) {
          map(responseJSON.errors, (error: any) => {
            map(error, (value: any, key: any) => {
              // @ts-ignore
              window.notify([{ message: value || "Something went wrong!!!", type: "danger" }])
            })
          })
        } else {
          // @ts-ignore
          window.notify([{ message: "Order cancelled successfully!!!", type: "success" }]);

        }
      }

      // WishList
      if (this.getWishListCallID === apiRequestCallId) {
        this.setState({ loadingWishlist: false, commonLoader: false });
        if (responseJSON && responseJSON.data?.wishlist?.data?.attributes?.wishlist_items) {
          this.setState({ wishlist: responseJSON.data.wishlist.data.attributes.wishlist_items })
        } else if (responseJSON?.errors) {
          map(responseJSON.errors, (error: any) => {
            map(error, (value: any, key: any) => {
              // @ts-ignore
              window.notify([{ message: value || "Something went wrong!!!", type: "danger" }])
            })
          })
        }
      }
    }
    // Customizable Area End
  }

  sendLoginFailMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginFaliureMessage));
    this.send(msg);
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
      case 'helpCenter':
        // matchTabName = '6';
        this.props.history.push("/help-center");
        break;
      case 'notifications':
        matchTabName = '7';
        break;
      case 'logout':
        matchTabName = '8';
        break;
      default:
        matchTabName = '1';
        break;
    }

    this.setState({
      activeTab: matchTabName
    })
  }

  routeToHelpCenter() {
    // this.props.history.push("/help-center");
  }

  openLogoutModal() {
    this.setState({
      ...this.state,
      openLogoutModal: true
    })
  }

  deleteLogout = () => {
    this.setState({
      ...this.state,
      openLogoutModal: false

    })
  }

  getOrders() {
    this.setState({ loadingOrder: true, commonLoader: true });
    const token = localStorage.getItem("token");
    const header = {
      token,
      "Content-Type": configJSON.validationApiContentType
    };
    let pageNo: number = 1;

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getOrdersCallID = requestMessage.messageId;
    if (this.state.isLoadMoreOrders) {
      //@ts-ignore
      pageNo = this.state.currentOrdersPageNo + 1;
      // Set EndPoints
      requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), `${configJSON.getOrders}?page=${pageNo}`)
    } else {
      // Set EndPoints
      requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.getOrders);
    }

    // Set Method Type
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiGetMethod)

    // set Headers 
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
    // set Body
    // requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(body));
    // requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(requestBody));

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  cancelOrder(ID: string) {
    this.setState({ loadingOrder: true, commonLoader: true });

    const token = localStorage.getItem("token");

    const header = {
      token,
      "Content-Type": configJSON.validationApiContentType
    }

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.cancelOrderCallID = requestMessage.messageId;
    // Set Method Type
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiPutMethod)
    // Set EndPoints
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), `/orders/${ID}/cancel_order`);
    // set Headers 
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  getWishList() {
    this.setState({ loadingWishlist: true, commonLoader: true });
    const token = localStorage.getItem("token");
    const headers = {
      token,
      "Content-Type": configJSON.validationApiContentType
    }


    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getWishListCallID = requestMessage.messageId;
    // Set Method Type
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiGetMethod)
    // Set EndPoints
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.getWishListAPIEndPoint);
    // set Headers 
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), headers);

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  onHandleLogout() {
    localStorage.clear();
    this.props.history.push("/");
  }
  //Get All Notifications API
  getAllNotificationsList = () => {
    this.setState({ loadingWishlist: true, commonLoader: true });
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getAllNotificationsAPICallId = requestMessage.messageId;

    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.getAllNotificationsAPIEndPoint);
    const headers = {
      'Content-Type': 'application/json',
      token: localStorage.getItem('token'),
    };

    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(headers));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiGetMethod);

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

}
