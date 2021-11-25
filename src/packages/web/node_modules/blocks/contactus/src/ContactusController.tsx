import { BackHandler } from "react-native";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import StorageProvider from "../../../framework/src/StorageProvider";
import * as Validators from "../../../framework/src/utils/Validators";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  userData: any;
  isFetching: boolean;
  isShowError: boolean;
  message: any;
  showAlertModal: boolean;
  showPickerModal: boolean;
  profileImage: any;
  profileImageData: any;
  token: string;
  wishList: number;
  cartHasProduct: boolean;
  isNotificationOn: boolean;
  showGuestModal: boolean;
  showLogoutModal: boolean;
  textInputData: any;
  textInputFocusData: any;
  textInputErrorData: any;
  descriptionText: any;
  showMissmatchError: boolean;
  showPasswordChangedSuccessfully: boolean;
  isInvalidDescription: boolean;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ContactusController extends BlockComponent<Props, S, SS> {
  saveContactUsApiCallId: any;
  getUserProfileApiCallId: any;
  _unsubscribe: any;

  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);

    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage)
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      profileImage: "",
      userData: null,
      isFetching: false,
      isShowError: false,
      message: undefined,
      showAlertModal: false,
      showPickerModal: false,
      profileImageData: null,
      token: "",
      wishList: 0,
      cartHasProduct: false,
      isNotificationOn: false,
      showGuestModal: false,
      showLogoutModal: false,
      textInputData: {
        name: "",
        email: "",
        phoneNo: ""
      },
      textInputFocusData: {
        nameFocus: false,
        emailFocus: false,
        phoneNoFocus: false
      },
      textInputErrorData: {
        nameError: false,
        emailError: false,
        phoneNoError: false
      },
      descriptionText: "",
      showMissmatchError: false,
      showPasswordChangedSuccessfully: false,
      isInvalidDescription: false
      // Customizable Area Start
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    if (this.props.navigation.addListener) {
      this._unsubscribe = this.props.navigation.addListener("willFocus", () => {
        this.getUserProfile();
        BackHandler.addEventListener(
          "hardwareBackPress",
          this.handleBackButtonClick
        );
      });
    }
    // Customizable Area Start
    // Customizable Area End
  }

  async componentWillUnmount() {
    super.componentWillUnmount();
    this._unsubscribe && this._unsubscribe.remove();
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    // Customizable Area Start
    // Customizable Area End
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
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
      if (responseJson && responseJson.data) {
        if (apiRequestCallId === this.saveContactUsApiCallId) {
          this.saveContactUsSuccessCallBack();
        }

        if (apiRequestCallId === this.getUserProfileApiCallId) {
          this.getUserProfileSuccessCallBack(responseJson.data);
        }

        // Customizable Area Start
        // Customizable Area End
      } else if (responseJson && responseJson.errors) {
        if (apiRequestCallId === this.saveContactUsApiCallId) {
          this.saveContactUsFailureCallBack(responseJson);
        }

        if (apiRequestCallId === this.getUserProfileApiCallId) {
          this.getUserProfileFailureCallBack(responseJson.data);
        }

        this.setState({
          isFetching: false
        });

        // Customizable Area Start
        // Customizable Area End
      } else if (errorReponse) {
        this.setState({ isFetching: false });
        // Customizable Area Start
        // Customizable Area End
      }
    }

    // Customizable Area Start
    // Customizable Area End
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

  getUserProfile = async () => {
    this.getUserProfileApiCallId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.GetMethodType,
      endPoint: configJSON.userProfileApiEndPoint
    });
  };

  getUserProfileSuccessCallBack = async (res: any) => {
    let userProfileData = res.attributes;
    this.setState(prevState => ({
      textInputData: {
        ...prevState.textInputData,
        name: userProfileData.full_name,
        email: userProfileData.email,
        phoneNo: userProfileData.full_phone_number
          ? userProfileData.full_phone_number
          : ""
      }
    }));
  };

  getUserProfileFailureCallBack = (error: any) => {
    if (error) {
      setTimeout(() => {
        this.setState({
          message: this.parseApiErrorResponse(error),
          isShowError: true,
          showAlertModal: true
        });
      }, 0);
    } else {
      setTimeout(() => {
        this.setState({
          // Customizable Area Start
          message: "Network Error!",
          // Customizable Area End
          isShowError: true,
          showAlertModal: true
        });
      }, 0);
    }
  };

  onChangeTextInput = (input: any, text: any) => {
    this.setState({ isInvalidDescription: false });
    this.setState(prevState => ({
      textInputErrorData: {
        ...prevState.textInputErrorData,
        nameError: false,
        emailError: false,
        phoneNoError: false
      }
    }));
    this.setState({ ...this.state.textInputData, [input]: text });
    this.setState(prevState => ({
      textInputData: {
        ...prevState.textInputData,
        [input]: text
      }
    }));
  };

  validateInput = () => {
    if (
      this.state.textInputData.name.trim().length === 0 ||
      !Validators.isNameValid(this.state.textInputData.name)
    ) {
      this.setState(prevState => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          nameError: true
        }
      }));
      return false;
    } else if (
      this.state.textInputData.email.trim().length === 0 ||
      !Validators.isEmailValid(this.state.textInputData.email)
    ) {
      this.setState(prevState => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          emailError: true
        }
      }));
      return false;
    } else if (
      this.state.textInputData.phoneNo.trim().length === 0 ||
      !Validators.isPhoneNoValid(this.state.textInputData.phoneNo)
    ) {
      this.setState(prevState => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          phoneNoError: true
        }
      }));
      return false;
    } else if (this.state.descriptionText.trim().length === 0) {
      this.setState({ isInvalidDescription: true });
      return false;
    } else {
      this.saveContactUs();
      return true;
    }
  };

  textInputNameProps = {
    onChangeText: (text: string) => {
      this.setState(prevState => ({
        textInputData: {
          ...prevState.textInputData,
          name: text
        }
      }));
      this.clearInputErrors();
    }
  };

  textInputEmailProps = {
    onChangeText: (text: string) => {
      this.setState(prevState => ({
        textInputData: {
          ...prevState.textInputData,
          email: text
        }
      }));
      this.clearInputErrors();
    }
  };

  textInputPhoneNoProps = {
    onChangeText: (text: string) => {
      this.setState(prevState => ({
        textInputData: {
          ...prevState.textInputData,
          phoneNo: text
        }
      }));
      this.clearInputErrors();
    }
  };

  clearInputErrors = () => {
    this.setState(prevState => ({
      textInputErrorData: {
        ...prevState.textInputErrorData,
        nameError: false,
        emailError: false,
        phoneNoError: false
      }
    }));
  };

  saveContactUs = async () => {
    this.setState({ isFetching: true });
    const userID = (await StorageProvider.get("USER_ID")) || "";
    const isGuestUser = await StorageProvider.get("GUEST_USER");

    let data = {
      name: this.state.textInputData.name,
      email: this.state.textInputData.email,
      phone_number: this.state.textInputData.phoneNo,
      description: this.state.descriptionText,
      account_id: isGuestUser ? "" : userID
    };
    const contactUsData = {
      data: {
        attributes: data
      }
    };
    this.saveContactUsApiCallId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.PostMethodType,
      endPoint: configJSON.saveContactUsApiEndPoint,
      body: contactUsData
    });
  };

  saveContactUsSuccessCallBack = async () => {
    setTimeout(() => {
      this.setState(
        {
          // Customizable Area Start
          message: "Details sent successfully.",
          // Customizable Area End
          isShowError: false,
          showAlertModal: true
        },
        async () => {
          setTimeout(() => {
            this.props.navigation.goBack();
          }, 2000);
        }
      );
    }, 0);
  };

  saveContactUsFailureCallBack = (error: any) => {
    this.setState({
      isShowError: true,
      showAlertModal: true,
      message: this.parseApiErrorResponse(error)
    });
  };

  // Customizable Area Start
  // Customizable Area End
}
