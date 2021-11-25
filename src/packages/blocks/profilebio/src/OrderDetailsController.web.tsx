import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import axios from "axios";
import moment from "moment";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// import { imgPasswordInVisible, imgPasswordVisible } from "../assets";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  history: any;
  order: any;
  orderItem: any;
  // trackingDetails: any;
  refetchData: any;
  location: any;

  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  ShowCOModal: boolean;
  ShowPRModal: boolean;
  shippingAddress: any;
  trackingDetails: any;
  loader: boolean;
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
  apiEmailLoginCallId: string = "";
  validationApiCallId: string = "";
  fetchTrackingDetailsCallId: string = "";

  emailReg: RegExp;
  labelTitle: string = "";
  // Customizable Area End

  constructor(props: Props) {

    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials)
    ]

    this.state = {
      ShowCOModal: false,
      ShowPRModal: false,
      shippingAddress: undefined,
      trackingDetails: [],
      loader: true,
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async componentDidMount() {
    this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    if (this.props?.location?.state) {
      const { order } = this.props?.location?.state;
      if (order) {
        this.setState({ shippingAddress: order.delivery_addresses[0] })
      }
      this.fetchTrackingDetails();
    } else {
      this.props.history.push("/profile-sec");
    }
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start


  // Customizable Area End

  async receive(from: string, message: Message) {

    // Customizable Area Start
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const resposeJSON = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      const errorMessage = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (this.fetchTrackingDetailsCallId === apiRequestCallId) {
        this.setState({ trackingDetails: resposeJSON?.data, loader: false });
      }
    }
    // Customizable Area End
  }

  fetchTrackingDetails() {
    if (this.props?.location?.state) {
      const token = localStorage.getItem("token");
      const headers = {
        token,
        "Content-Type": "application/json"
      }
      const ProductID = this.props?.location?.state?.orderItem?.id;
      const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
      this.fetchTrackingDetailsCallId = requestMessage.messageId;

      requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.trackingOrderDetailsAPIEndPoint + '?' + `track=order_item&id=${ProductID}`);
      requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), headers);
      requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiGetMethod);
      console.log("request", requestMessage);

      // Sending Request to call API.
      runEngine.sendMessage(requestMessage.id, requestMessage);
    }
  }

  sendLoginFailMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginFaliureMessage));
    this.send(msg);
  }

  // useEffect(() => {
  //   if (!orderItem) {
  //     routeToProfile();
  //   } else {
  //     let localAddressIndex = order.delivery_addresses.findIndex(
  //       (item) =>
  //         item.address_for === "shipping" ||
  //         item.address_for === "billing and shipping"
  //     );
  //     if (localAddressIndex >= 0) {
  //       setShippingAddress(order.delivery_addresses[localAddressIndex]);
  //     }
  //   }
  //   console.log("tracking details :", trackingDetails?.tracking_detail, orderItem);
  // }, [props])

  routeToProfile() {
    let path = "/profilebio";
    this.props.history.push({
      pathname: path,
      state: { activeTab: "myorder" }
    });
  };

  getImageUrl() {
    const { orderItem } = this.props.location.state;
    // if (orderItem?.attributes?.product_images?.data?.length && orderItem?.attributes?.product_images?.data?.length > 0) {
    //   return orderItem?.attributes?.product_images?.data[0].attributes.url
    // }
    if (orderItem?.attributes?.catalogue_variant?.attributes?.images.data && orderItem?.attributes?.catalogue_variant?.attributes?.images.data.length > 0) {
      return orderItem?.attributes?.catalogue_variant?.attributes?.images?.data[0]?.attributes?.url
    }
  }

  getAddressString() {
    const { shippingAddress } = this.state;
    if (shippingAddress) {
      return `${shippingAddress.address}, ${shippingAddress.address_line_2}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.zip_code}`
    }
    return " 503 Branson Turnpike Suite 127, Lawrenceport, Florida 112202"
  }

  getLocalDate = (data: any) => {
    const { date, toFormat } = data;
    let m =
      moment.utc(date)
        .local().subtract('minutes', 5).utcOffset(+4)
        .format(toFormat);
    return m;
  }
}
