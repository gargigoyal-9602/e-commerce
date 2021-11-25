import { BackHandler } from "react-native";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
import { runEngine } from "../../../framework/src/RunEngine";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

import * as Validators from "../../../framework/src/Validators";
import StorageProvider from "../../../framework/src/StorageProvider";
import DeviceInfo from "react-native-device-info";
import R from "../../../components/src/R";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  accountType: string;
  emailSchema: any;
  phoneSchema: any;
  otpSchema: any;
  passwordSchema: any;
  accountStatus: any;
  passwordRules: any;
  emailInput: any;
  otpInput: any;
  countryCodeSelected: any;
  token: any;
  enablePasswordField: Boolean;
  btnConfirmPasswordShowHide: Boolean;
  isOTPSent: boolean;
  showTimer: boolean;
  startTimer: boolean;
  sendLink: boolean;
  email: boolean;
  otp: boolean;
  showAlertModal: boolean;
  message: any;
  OTPError: boolean;
  showResendLink: boolean;
  isShowError: boolean;
  isFetching: boolean;
  emailError: boolean;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  navigation: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ForgotPasswordController extends BlockComponent<
  Props,
  S,
  SS
> {
  validationAPICallId: any;
  requestEmailOtpCallId: any;
  requestPhoneOtpCallId: any;
  requestChangePasswordCallId: any;
  requestGoToConfirmationCallId: any;
  apiGuestLoginCallId: any;
  otpToken: any;
  _unsubscribe: any;
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

    //@ts-ignore
    this.state = {
      email: true,
      otp: true,
      accountType: "email_account",
      accountStatus: "ChooseAccountType",
      emailInput: "",
      otpInput: "",
      countryCodeSelected: "",
      passwordRules: "",
      token: "",
      enablePasswordField: true,
      btnConfirmPasswordShowHide: true,
      isOTPSent: false,
      showTimer: false,
      startTimer: true,
      sendLink: false,
      showAlertModal: false,
      message: "",
      OTPError: false,
      showResendLink: false,
      isShowError: false,
      isFetching: false,
      emailError: false
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    this._unsubscribe = this.props.navigation.addListener("willFocus", () => {
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.handleBackButtonClick
      );
    });
    // Customizable Area Start
    // Customizable Area End
  }

  handleBackButtonClick = () => {
    this.props.navigation.navigate("Auth");
    return true;
  };

  async componentWillUnmount() {
    super.componentWillUnmount();
    this._unsubscribe.remove();
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    // Customizable Area Start
    // Customizable Area End
  }

  onFocus(item: any) {
    if (item === "email") {
      this.setState({ email: false, otp: true }, () => this.resetErrors());
    } else {
      this.setState({ email: true, otp: false }, () => this.resetErrors());
    }
  }

  onCloseAlertModal = () => {
    this.setState({ showAlertModal: false });
  };

  resetErrors = () => {
    this.setState({
      OTPError: false,
      emailError: false,
      message: "",
      showAlertModal: false
      // Customizable Area Start
      // Customizable Area End
    });
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
      if (
        responseJson &&
        responseJson.data &&
        responseJson.meta &&
        responseJson.meta.token
      ) {
        if (apiRequestCallId === this.requestEmailOtpCallId) {
          this.onSendVerificationOTPSuccessCallBack(responseJson);
        }
        if (apiRequestCallId === this.verifyOtpApiCallId) {
          this.verifyOTPSuccessCallBack(responseJson);
        }
        if (apiRequestCallId === this.apiGuestLoginCallId) {
          this.onGuestLoginSuccessCallBack(responseJson);
        }
        // Customizable Area Start
        // Customizable Area End
      } else if (responseJson && responseJson.errors) {
        if (apiRequestCallId === this.requestEmailOtpCallId) {
          this.onSendVerificationOTPFailureCallBack(responseJson);
        }
        if (apiRequestCallId === this.verifyOtpApiCallId) {
          this.verifyOTPFailureCallBack(responseJson);
        }
        if (apiRequestCallId === this.apiGuestLoginCallId) {
          this.onGuestLoginFailureCallBack(responseJson);
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

  onPressSendLink = async () => {
    this.setState({ isFetching: true });
    let signUpData = {
      data: {
        type: "email_account",
        process: "reset_password",
        attributes: {
          email: this.state.emailInput
        }
      }
    };
    this.requestEmailOtpCallId = await this.apiCall({
      contentType: configJSON.forgotPasswordAPiContentType,
      method: configJSON.httpPostMethod,
      endPoint: configJSON.sendOTPAPIEndPoint,
      body: signUpData
    });
  };

  onSendVerificationOTPSuccessCallBack = async (res: any) => {
    let token = "";
    if (res && res.meta && res.meta.token) {
      token = res.meta.token;
    }
    this.setState({
      isOTPSent: true,
      showTimer: true,
      sendLink: true,
      token: token,
      isFetching: false,
      email: true,
      isShowError: false,
      message: "OTP has been sent to your registered email",
      showAlertModal: true,
      showResendLink: false
    });
  };

  onSendVerificationOTPFailureCallBack = (error: any) => {
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

  verifyOTPSuccessCallBack = async (res: any) => {
    this.setState(
      {
        isOTPSent: false,
        showTimer: false,
        sendLink: false,
        isFetching: false,
        token: res.meta.token,
        isShowError: false,
        message:
          "Your OTP is verified. Please proceed and reset your password.",
        showAlertModal: true
      },
      () => {
        setTimeout(() => {
          this.props.navigation.navigate("NewPassword", {
            token: res.meta.token
          });
        }, 2000);
      }
    );
  };

  verifyOTPFailureCallBack = (error: any) => {
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
  };

  onPressVerifyOTP = async () => {
    if (this.state.otpInput.trim().length === 0 && this.state.isOTPSent) {
      this.setState({
        OTPError: true,
        message: `OTP can't be empty`,
        showAlertModal: true,
        isShowError: true
      });
      return;
    } else {
      this.setState({ isFetching: true });
      this.setState({ isFetching: true });
      const verifyData = {
        token: this.state.token,
        pin: this.state.otpInput
      };

      this.verifyOtpApiCallId = await this.apiCall({
        contentType: configJSON.forgotPasswordAPiContentType,
        method: configJSON.httpPostMethod,
        endPoint: configJSON.verifyOTPAPIEndPoint,
        body: verifyData
      });
    }
  };

  onPressSubmitButton = () => {
    if (
      this.state.emailInput.trim().length === 0 ||
      !Validators.isEmailValid(this.state.emailInput)
    ) {
      this.setState({
        emailError: true,
        message: "Invalid Email.",
        showAlertModal: true,
        isShowError: true
      });
      return;
    }
    this.onPressSendLink();
  };

  onGuestLogin = async () => {
    this.setState({ isFetching: true });
    const guestData = {
      data: {
        type: "guest_account",
        attributes: {
          uuid: DeviceInfo.getUniqueId()
        }
      }
    };
    this.apiGuestLoginCallId = await this.apiCall({
      contentType: configJSON.forgotPasswordAPiContentType,
      method: configJSON.httpPostMethod,
      endPoint: configJSON.guestLoginAPIEndPoint,
      body: guestData
    });
  };

  onGuestLoginSuccessCallBack = async (res: any) => {
    setTimeout(() => {
      this.setState(
        {
          message: "You have been Logged In Successfully as Guest user",
          isShowError: false,
          showAlertModal: true,
          isFetching: false
        },
        async () => {}
      );
      setTimeout(() => {
        this.saveLoggedInUserData(res, true);
      }, 2000);
    }, 0);
  };

  onGuestLoginFailureCallBack = (error: any) => {
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

  async saveLoggedInUserData(responseJson: any, isGuestUser: any = false) {
    await StorageProvider.set("Userdata", responseJson.meta.token);
    if (isGuestUser) {
      await StorageProvider.set("GUEST_USER", "true");
    }
    this.props.navigation.replace("MainNavigator");
  }

  imgEmailIcon = {
    source: R.forgotPasswordImage.imgEmailIcon
  };

  imgOTPIcon = {
    source: R.forgotPasswordImage.imgPasswordIcon
  };

  crossIcon = {
    source: R.forgotPasswordImage.crossIcon
  };

  txtEmailInputProps = {
    onChangeText: (text: string) => {
      this.setState({ emailInput: text, emailError: false }, () =>
        this.resetErrors()
      );
      //@ts-ignore
      this.txtEmailInputProps.value = text;
    }
  };

  txtOtpInputProps = {
    onChangeText: (text: string) => {
      this.setState({ otpInput: text, OTPError: false }, () =>
        this.resetErrors()
      );
      //@ts-ignore
      this.txtOtpInputProps.value = text;
    }
  };
}
