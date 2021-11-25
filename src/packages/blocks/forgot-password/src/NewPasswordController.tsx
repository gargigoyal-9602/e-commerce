import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
import { runEngine } from "../../../framework/src/RunEngine";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import * as Validators from "../../../framework/src/Validators";
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
  // Customizable Area Start
  accountType: string;
  emailSchema: any;
  phoneSchema: any;
  otpSchema: any;
  passwordSchema: any;
  accountStatus: any;
  passwordRules: any;
  emailValue: any;
  phoneValue: any;
  countryCodeSelected: any;
  token: any;
  enablePasswordField: Boolean;
  btnConfirmPasswordShowHide: Boolean;
  isOTPSent: boolean;
  showTimer: boolean;
  startTimer: boolean;
  sendLink: boolean;
  newPasswordInput: any;
  confirmPasswordInput: any;
  showAlertModal: boolean;
  message: any;
  isShowError: any;
  isFetching: boolean;
  passwordError: boolean;
  confirmPasswordError: boolean;
  password: boolean;
  confirmPassword: boolean;
  nameError: any;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  navigation: any;
  // Customizable Area End
}

export default class NewPasswordController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  validationAPICallId: any;
  requestEmailOtpCallId: any;
  requestPhoneOtpCallId: any;
  requestChangePasswordCallId: any;
  requestGoToConfirmationCallId: any;
  otpToken: any;
  resetPasswordApiCallId: any;
  secondTextInput: any;

  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
      // Customizable Area End
    ];

    this.receive = this.receive.bind(this);

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    //@ts-ignore
    this.state = {
      password: true,
      confirmPassword: true,
      nameError: false,
      newPasswordInput: "",
      confirmPasswordInput: "",
      accountType: "sms",
      accountStatus: "ChooseAccountType",
      emailValue: "",
      phoneValue: "",
      countryCodeSelected: "",
      passwordRules: "",
      token: "",
      enablePasswordField: true,
      btnConfirmPasswordShowHide: true,
      isOTPSent: false,
      showTimer: false,
      startTimer: true,
      sendLink: false,
      message: "",
      showAlertModal: false,
      isFetching: false,
      isShowError: false,
      passwordError: false,
      confirmPasswordError: false
      // Customizable Area Start
      // Customizable Area End
    };

    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();

    if (this.props.navigation.state && this.props.navigation.state.params) {
      this.setState({
        token: this.props.navigation.state.params.token
      });
    }
    // Customizable Area Start
    // Customizable Area End
  }

  async loadScreen() {
    this.setState({
      token: this.props.navigation.state.params.token
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
        if (apiRequestCallId === this.resetPasswordApiCallId) {
          this.resetPasswordSuccessCallBack(responseJson);
        }
        // Customizable Area Start
        // Customizable Area End
      } else if (responseJson && responseJson.errors) {
        if (apiRequestCallId === this.resetPasswordApiCallId) {
          this.resetPasswordFailureCallBack(responseJson);
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

  resetPasswordSuccessCallBack = async (res: any) => {
    // Customizable Area Start
    let message = "";
    if (res && res.meta && res.meta.message) {
      message = res.meta.message;
    }
    this.setState(
      {
        isShowError: false,
        message: message,
        showAlertModal: true,
        isFetching: false
      },
      () => {
        setTimeout(() => {
          this.props.navigation.replace("Auth");
        }, 2000);
      }
    );
    // Customizable Area End
  };

  resetPasswordFailureCallBack = (error: any) => {
    // Customizable Area Start
    if (error) {
      setTimeout(() => {
        this.setState({
          message: this.parseApiErrorResponse(error),
          isShowError: true,
          showAlertModal: true,
          isFetching: false,
          passwordError: true,
          confirmPasswordError: true
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

  startForgotPassword(accountType: String) {
    this.setState({
      accountStatus: accountType === "sms" ? "EnterPhone" : "EnterEmail"
    });
  }

  onCloseAlertModal = () => {
    this.setState({ showAlertModal: false }, () => {
      this.resetErrors();
    });
  };
  resetErrors = () => {
    this.setState({
      message: "",
      passwordError: false,
      confirmPasswordError: false
      // Customizable Area Start
      // Customizable Area End
    });
  };

  onFocus(item: any) {
    if (item === "password") {
      this.setState({ password: false, confirmPassword: true }, () =>
        this.resetErrors()
      );
    } else {
      this.setState({ confirmPassword: false, password: true }, () =>
        this.resetErrors()
      );
    }
  }

  resetPassword = async () => {
    // Customizable Area Start
    if (
      this.state.newPasswordInput.trim().length < 5 ||
      !Validators.isPasswordValid(this.state.newPasswordInput)
    ) {
      this.setState({
        passwordError: true,
        message:
          "Enter a password with alphabets A-z, number and a symbol(minimum 6 characters long)",
        showAlertModal: true,
        isShowError: true
      });
      return;
    }
    if (
      this.state.confirmPasswordInput.trim().length < 5 ||
      !Validators.isPasswordValid(this.state.confirmPasswordInput)
    ) {
      this.setState({
        confirmPasswordError: true,
        message:
          "Enter a password with alphabets A-z, number and a symbol(minimum 6 characters long)",
        showAlertModal: true,
        isShowError: true
      });
      return;
    }
    if (
      this.state.newPasswordInput.trim() !==
      this.state.confirmPasswordInput.trim()
    ) {
      this.setState({
        message: `Password and Confirm Password didn't match`,
        showAlertModal: true,
        isShowError: true,
        passwordError: true,
        confirmPasswordError: true
      });
      return;
    }
    this.setState({ isFetching: true });
    const resetData = {
      token: this.state.token,
      data: {
        password: this.state.newPasswordInput,
        password_confirmation: this.state.confirmPasswordInput
      }
    };

    this.resetPasswordApiCallId = await this.apiCall({
      contentType: configJSON.forgotPasswordAPiContentType,
      method: configJSON.httpPutMethod,
      endPoint: configJSON.resetPasswordAPIEndPoint,
      body: resetData
    });
    // Customizable Area End
  };

  txtInputNewPasswordProps = {
    onChangeText: (text: string) => {
      this.setState({ newPasswordInput: text }, () => this.resetErrors());
    },
    secureTextEntry: true
  };
  txtInputConfirmPasswordProps = {
    onChangeText: (text: string) => {
      this.setState({ confirmPasswordInput: text }, () => this.resetErrors());
    },
    secureTextEntry: true
  };
  imgOTPIcon = {
    source: R.forgotPasswordImage.imgPasswordIcon
  };
  crossIcon = {
    source: R.forgotPasswordImage.crossIcon
  };

  imgEnableNewPasswordFieldProps = {
    source: R.forgotPasswordImage.imgPasswordShowIcon
  };

  imgEnableConfirmPasswordFieldProps = {
    source: R.forgotPasswordImage.imgPasswordShowIcon
  };

  btnNewPasswordShowHideProps = {
    onPress: () => {
      this.setState({ enablePasswordField: !this.state.enablePasswordField });
      this.txtInputNewPasswordProps.secureTextEntry = !this.state
        .enablePasswordField;
      this.imgEnableNewPasswordFieldProps.source = this.txtInputNewPasswordProps
        .secureTextEntry
        ? R.forgotPasswordImage.imgPasswordShowIcon
        : R.forgotPasswordImage.imgPasswordHideIcon;
    }
  };
  btnConfirmPasswordShowHideProps = {
    onPress: () => {
      this.setState({ enablePasswordField: !this.state.enablePasswordField });
      this.txtInputConfirmPasswordProps.secureTextEntry = !this.state
        .enablePasswordField;
      this.imgEnableConfirmPasswordFieldProps.source = this
        .txtInputConfirmPasswordProps.secureTextEntry
        ? R.forgotPasswordImage.imgPasswordShowIcon
        : R.forgotPasswordImage.imgPasswordHideIcon;
    }
  };

  // Customizable Area Start
  // Customizable Area End
}
