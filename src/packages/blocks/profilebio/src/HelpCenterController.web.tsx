import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

import { runEngine } from "../../../framework/src/RunEngine";
// @ts-ignore
import isEmpty from "lodash/isEmpty";
// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  history: any;
  match: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  activeTab: string;
  activeMobileTab: boolean;
  errorData: any;
  loading: boolean;
  helpCenterData: any;
  tabName: any;
  isLoggedIn: boolean;
  FaqData?: any;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class HelpCenterController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  helpCenterallId: string = "";
  validationApiCallId: string = "";
  emailReg: RegExp;
  labelTitle: string = "";
  FAQAPICallId: string;
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
      activeTab: "1",
      activeMobileTab: false,
      errorData: null,
      loading: true,
      helpCenterData: [],
      tabName: undefined,
      isLoggedIn: false,

    };

    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps?.match?.params?.slug) {
      this.setState({ tabName: nextProps?.match?.params?.slug })
    }
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    // @ts-ignore
    const user = JSON.parse(localStorage.getItem("user"))
    if (!isEmpty(user)) {
      this.setState({ isLoggedIn: true });
    }
    if (this.props?.match?.params?.slug) {
      this.setState({ tabName: this.props?.match?.params?.slug })
    }
    this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    this.getHelpceterData();
    this.getFAQsData();    // Customizable Area Start
    // Customizable Area End
  }

  UNSAFE_componentWillReceiveProps() {
    window.scrollTo(0, 0);
  }

  // Customizable Area Start

  // Customizable Area End

  async receive(from: string, message: Message) {

    // Customizable Area Start
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallID = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJSON = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      const errorMessage = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

      if (this.helpCenterallId === apiRequestCallID) {
        this.setState({ helpCenterData: responseJSON?.data, loading: false });
      }
      if (this.FAQAPICallId === apiRequestCallID) {
        console.log("nfbgmnbdfg", this.state.FaqData)
        if (responseJSON && responseJSON.data && responseJSON.data.faqs && responseJSON.data.faqs.length > 0) {
          this.setState({
            FaqData: responseJSON
          });
          const copyHelpcenter = [...this.state.helpCenterData];
          const smapleFqa = {
            id: "3", type: "help_center",
            attributes: {
              "help_center_type": "FAQs",
              "description": responseJSON.data.faqs
            }
          }
          copyHelpcenter.push(smapleFqa);
          console.log("fdghdfg", copyHelpcenter);
          this.setState({
            helpCenterData: copyHelpcenter
          })
        }
        this.setState({
          loading: false
        })
      }
    }
    // Customizable Area End
  }

  getHelpceterData() {
    // const serviceType = serviceTypes.getHelpCenterData();
    const token = localStorage.getItem("token");
    const headers = {
      token,
      "Content-Type": "application/json"
    }
    this.setState({
      loading: true
    })
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.helpCenterallId = requestMessage.messageId;

    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.getHelpCenterAPIEndPoint);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), headers);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiGetMethod);
    console.log("request", requestMessage);

    // Sending Request to call API.
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  toggle(tab: any) {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      // setActiveTab(tab);
      this.setState({ activeTab: tab })
    }
  };

  // const history = useHistory();
  routeToProfile = () => {
    const { isLoggedIn } = this.state;
    this.props.history.push(isLoggedIn ? '/profilebio' : '/');
  };

  routeHelpCenter = (value: any) => {
    if (value !== undefined) {
      let path = '/help-center/' + value;
      this.props.history.push(path);
    } else {
      let path = '/help-center';
      this.props.history.push(path);
    }
  };

  routeHelpCenterMb(value: any) {
    if (value !== undefined) {
      let path = '/help-center/' + value;
      this.props.history.push(path);
      // setactiveMobileTab(!activeMobileTab);
      this.setState(preState => ({
        activeMobileTab: !preState.activeMobileTab
      }))
    } else {
      let path = '/help-center';
      this.props.history.push(path);
      this.setState(preState => ({
        activeMobileTab: !preState.activeMobileTab
      }))
      // setactiveMobileTab(!activeMobileTab);
    }
  };

  // if (tabName !== undefined && helpCenterData !== undefined) {
  //   let matchTabName = '';
  //   helpCenterData.map((data, index) => {
  //     if (tabName === data.title) {
  //       matchTabName = index + 1;
  //     }
  //   });
  //   toggle(matchTabName);
  // }

  // if (tabName === undefined && helpCenterData !== undefined) {
  //   toggle(1);
  // }

  //get FAQ's
  getFAQsData = () => {

    const headers = {
      "Content-Type": "application/json"
    };
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.FAQAPICallId = requestMessage.messageId;

    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.getFAQAPIEndPoint);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), headers);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiGetMethod);

    // Sending Request to call API.
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

}
