import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
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

export interface S {
  emailInput: string;
  email: boolean;
  OTPError: boolean;
  OTP: string;
  OTPfocus: boolean;
  fullName: string;
  passwordInput: string;
  token: string;
  emailError: boolean;
  showAlertModal: boolean;
  message: any;
  sendLink: boolean;
  showTimer: boolean;
  startTimer: boolean;
  isOTPSent: boolean;
  showResendLink: boolean;
  fromCart: boolean;
  isShowError: boolean;
  isFetching: boolean;
  labelInfo: any;
  // Customizable Area Start
  // Customizable Area End
}

export interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class OTPInputAuthController extends BlockComponent<
  Props,
  S,
  SS
> {
  signupApiCallId: string = "";
  sendOtpApiCallId: string = "";
  verifyOtpApiCallId: string = "";

  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);

    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      emailInput: "",
      fullName: "",
      passwordInput: "",
      token: "",
      emailError: false,
      OTPError: false,
      OTP: "",
      email: true,
      OTPfocus: true,
      showAlertModal: false,
      sendLink: true,
      showTimer: true,
      startTimer: true,
      isOTPSent: true,
      showResendLink: false,
      message: undefined,
      fromCart: false,
      isShowError: false,
      isFetching: false,
      labelInfo: ""
      // Customizable Area Start
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    if (this.props.navigation.state && this.props.navigation.state.params) {
      this.loadScreen();
    }
    // Customizable Area Start
    // Customizable Area End
  }

  async loadScreen() {
    this.setState({
      token: this.props.navigation.state.params.token,
      emailInput: this.props.navigation.state.params.email,
      passwordInput: this.props.navigation.state.params.password,
      fullName: this.props.navigation.state.params.fullname
    });
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
        if (apiRequestCallId === this.verifyOtpApiCallId) {
          this.verifyOTPSuccessCallBack();
        }
        if (apiRequestCallId === this.sendOtpApiCallId) {
          this.sendOTPSuccessCallBack(responseJson);
        }
        if (apiRequestCallId === this.signupApiCallId) {
          this.onSignUpUserSuccessCallBack(responseJson);
        }
      } else if (responseJson && responseJson.errors) {
        if (apiRequestCallId === this.verifyOtpApiCallId) {
          this.verifyOTPFailureCallBack(responseJson);
        }
        if (apiRequestCallId === this.sendOtpApiCallId) {
          this.sendOTPFailureCallBack(responseJson);
        }
        if (apiRequestCallId === this.signupApiCallId) {
          this.onSignUpUserFailureCallBack(responseJson);
        }
        // Customizable Area Start
        // Customizable Area End
      } else if (errorReponse) {
        this.setState({
          isShowError: true,
          message: errorReponse,
          showAlertModal: true,
          isFetching: false
        });
        // Customizable Area Start
        // Customizable Area End
      }
    }

    // Customizable Area Start
    // Customizable Area End
  }

  apiCall = async (data: any) => {
    const { contentType, method, endPoint, body } = data;
    const token = this.state.token;
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

  onFocus(item: string) {
    if (item === "email") {
      this.setState({ email: false, OTPfocus: true }, () => this.resetErrors());
      // Customizable Area Start
      // Customizable Area End
    } else {
      this.setState({ email: true, OTPfocus: false }, () => this.resetErrors());
      // Customizable Area Start
      // Customizable Area End
    }
  }

  resetErrors = () => {
    this.setState({
      emailError: false,
      OTPError: false,
      message: ""
      // Customizable Area Start
      // Customizable Area End
    });
  };

  onCloseAlertModal = () => {
    this.setState({ showAlertModal: false }, () => {
      this.resetErrors();
    });
  };

  verifyOTPSuccessCallBack = async () => {
    this.onCreateAccount();
  };

  verifyOTPFailureCallBack = (error: any) => {
    // Customizable Area Start
    if (error) {
      setTimeout(() => {
        this.setState({
          message: this.parseApiErrorResponse(error),
          isShowError: true,
          OTPError: true,
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
    // Customizable Area End
  };

  sendOTPSuccessCallBack = async (res: any) => {
    // Customizable Area Start
    this.setState({
      token: res.meta.token,
      OTP: "",
      isFetching: false,
      sendLink: true,
      isOTPSent: true,
      showTimer: true
    });
    setTimeout(() => {
      this.setState(
        {
          message: "OTP resent Successfully",
          isShowError: false,
          showAlertModal: true,
          isFetching: false
        },
        async () => {}
      );
    }, 0);
    // Customizable Area End
  };

  sendOTPFailureCallBack = (error: any) => {
    // Customizable Area Start
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
    // Customizable Area End
  };

  onSignUpUserSuccessCallBack = async (res: any) => {
    // Customizable Area Start
    setTimeout(() => {
      this.setState(
        {
          message: "You have been Logged In Successfully",
          isShowError: false,
          showAlertModal: true,
          isFetching: false
        },
        async () => {}
      );
      setTimeout(() => {
        this.saveLoggedInUserData(res);
      }, 2000);
    }, 0);
    // Customizable Area End
  };

  onSignUpUserFailureCallBack = (error: any) => {
    // Customizable Area Start
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
    // Customizable Area End
  };

  onPressVerifyOTP = async () => {
    // Customizable Area Start
    if (this.state.OTP.trim().length === 0 && this.state.isOTPSent) {
      this.setState({
        OTPError: true,
        message: `OTP can't be empty`,
        showAlertModal: true,
        isShowError: true
      });
      return;
    } else {
      this.setState({ isFetching: true });
      const verifyData = {
        token: this.state.token,
        pin: this.state.OTP
      };

      this.verifyOtpApiCallId = await this.apiCall({
        contentType: configJSON.apiVerifyOtpContentType,
        method: configJSON.httpPostMethod,
        endPoint: configJSON.verifyOtpApiEndPoint,
        body: verifyData
      });
    }
    // Customizable Area End
  };

  onPressSendLink = async () => {
    this.setState({ isFetching: true });
    let signUpData = {
      data: {
        type: "email_account",
        process: "register",
        attributes: {
          email: this.state.emailInput
        }
      }
    };
    this.sendOtpApiCallId = await this.apiCall({
      contentType: configJSON.apiVerifyOtpContentType,
      method: configJSON.httpPostMethod,
      endPoint: configJSON.sendOtpApiEndPoint,
      body: signUpData
    });
  };

  onCreateAccount = async () => {
    this.setState({ isFetching: true });
    const accountData = {
      token: this.state.token,
      data: {
        type: "email_account",
        attributes: {
          full_name: this.state.fullName,
          email: this.state.emailInput,
          password: this.state.passwordInput
        }
      }
    };
    this.signupApiCallId = await this.apiCall({
      contentType: configJSON.apiVerifyOtpContentType,
      method: configJSON.httpPostMethod,
      endPoint: configJSON.accountsAPiEndPoint,
      body: accountData
    });
  };

  async saveLoggedInUserData(responseJson: any, isGuestUser: any = false) {
    await StorageProvider.set("Userdata", responseJson.meta.token);
    await StorageProvider.set("USER_ID", responseJson.data.id);
    if (isGuestUser) {
      await StorageProvider.set("GUEST_USER", "true");
    }
    this.props.navigation.replace("MainNavigator");
  }

  // Customizable Area Start
  // Customizable Area End
}
