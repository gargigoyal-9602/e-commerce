//@ts-nocheck;
import { IBlock } from "../../../../framework/src/IBlock";
import { Message } from "../../../../framework/src/Message";
import { BlockComponent } from "../../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
// @ts-ignore
import map from "lodash/map";
import axios from "axios";
import { uuid } from 'uuidv4';

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  history: any
  isPopup: boolean
  // Customizable Area Start
  // Customizable Area End
};

interface S {
  // Customizable Area Start
  showSpinner: boolean;
  loginError: string;
  showPass: boolean;
  emailErr: string;

  //success Email Response Data
  userToken?: string;
  userEmail?: string;
  userName?: string;
  userPassword?: string;

  //social media result
  socialMediaResult?: any;


  // showing alerts
  showAlert?: boolean;
  messageType?: any;
  message?: any;

  loading?: boolean;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class EmailAccountRegistrationController extends BlockComponent<Props, S, SS> {

  // Customizable Area Start
  apiEmailLoginCallId: string = "";
  validationApiCallId: string = "";
  emailReg: RegExp;
  labelTitle: string = "";
  verfiySocialLoginApiCallId: string;
  registartionEmailCallId: string;
  guestRegisterApiCallId: string;
  sendOTPAPICallId: string;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.signupUser = this.signupUser.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.AlertMessage),
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.ReciveUserCredentials)
    ];
    this.state = {
      showSpinner: false,
      loginError: "",
      showPass: false,
      emailErr: ""
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;
    // Customizable Area End

    this.receive = this.receive.bind(this);
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  };

  async componentDidMount() {
    this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    // Customizable Area Start
    // Customizable Area End
  }

  showPassword = (e: any) => {
    e.preventDefault();
    this.setState(prevState => ({
      showPass: !prevState.showPass
    }))
    // setShowPass(!showPass);
  };

  signupUser = (values: any) => {
    this.setState({ showSpinner: true });
    // const data = {
    //   user: {
    //     name: values.FullName,
    //     email: values.Email,
    //     password: values.password,
    //   },
    // };
    const data = {
      data: {
        type: "email_account",
        attributes: {
          email: values.Email,
          full_name: values.FullName,
          phone_number: values.fullPhoneNumber
        },
        process: "register"
      }
    }
    localStorage.setItem("signUpUser", JSON.stringify(values));

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.sendOTPAPICallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.sendEmailOTPAPIEndPoint);

    const headers = {
      'Content-Type': 'application/json',
    };
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(headers));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(data));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeAddDetail);

    return runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  async receive(from: String, message: Message) {
    runEngine.debugLog('Message Received', message);
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      let apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (apiRequestCallId === this.registartionEmailCallId) {
        if (responseJson && responseJson.data && responseJson.meta) {
          this.setState({
            ...this.state,
          });
        }
        if (responseJson && responseJson.errors && responseJson.errors.length > 0) {
          this.setState({
            ...this.state,
            showAlert: true,
            messageType: 'danger',
            message: responseJson.errors[0].account
          })
        }
      }
      else if (apiRequestCallId === this.verfiySocialLoginApiCallId) {
        if (responseJson) {
          if (this.state.socialMediaResult) {
            const { user, credential, additionalUserInfo } = this.state.socialMediaResult;
            let dat = {
              'email': user.email,
              'name': user.displayName
            }
            console.log(user.photoURL, "user.photoURL", JSON.stringify(dat), "this.state", this.state.socialMediaResult);
            const GuestUserId = localStorage.getItem('guestUUID');
            if (GuestUserId) {
              setTimeout(() => {
                this.props.history.push('/cart');
              }, 1000);
            } else {
              setTimeout(() => {
                this.props.history.push('/home-page');
              }, 1000);
            }
            await localStorage.setItem('user', JSON.stringify(responseJson.data));
            await localStorage.setItem('token', responseJson.meta.token);
            await localStorage.setItem('profileImage', user.photoURL);
            await localStorage.setItem('userData', JSON.stringify(dat));
          }
        }
      }
      else if (apiRequestCallId === this.guestRegisterApiCallId) {
        if (responseJson && responseJson.data && responseJson.meta) {
          this.setState({
            ...this.state,
            loading: false
          });
          localStorage.setItem('guestUserData', JSON.stringify(responseJson.data));
          localStorage.setItem('token', responseJson.meta.token);
          //@ts-ignore
          window.notify([{ type: 'success', message: 'Welcome to Our Store!' }]);
          this.props.history?.push('/home-page');
        }
      }
      else if (apiRequestCallId === this.sendOTPAPICallId) {
        if (responseJson && responseJson.data && responseJson.meta) {
          this.setState({ showSpinner: false });
          const { data } = responseJson;
          const name = data?.attributes?.full_name;
          localStorage.setItem('token', responseJson.meta.token);
          localStorage.setItem('userFullName', name);
          this.props.history.push({
            pathname: '/otpconfirm',
            state: {
              data: responseJson.data?.user,
            },
          });
          // @ts-ignore
          window.notify([{ message: "OTP has beed sent to you", type: "success" }]);
        }
        if (responseJson && responseJson.errors && responseJson.errors.length > 0) {
          this.setState({ showSpinner: false });
          //@ts-ignore
          window.notify([{ message: responseJson.errors[0]?.phone_number || responseJson.errors[0]?.account || 'something went wrong!', type: 'danger' }]);
        }
      }
    }
    else {

    }
  }

  //Registeration through Email
  registartionEmail = (values: any) => {
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.registartionEmailCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.registrationThorughEmailAPIEndPoint);

    const headers = {
      'Content-Type': 'application/json',
    };
    const requestBody = {
      "data": {
        "type": "email_account",
        "process": "register",
        "attributes": {
          "email": values.Email,
        },
      }
    };

    //setting userDeatils to state
    this.setState({
      ...this.state,
      userEmail: values.Email,
      userPassword: values.password,
      userName: values.FullName
    });
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(headers));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(requestBody));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeAddDetail);


    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  //registartion through social Login
  verifyEmailBeforeRegistartion = (resultData: any, socialMediaName: string) => {
    //@ts-ignore
    const guestuserID = localStorage.getItem('guestUUID');
    let requestBody;

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.verfiySocialLoginApiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.socialRegistartionAPIEndPoint);
    const headers = {
      'Content-Type': 'application/json'
    };
    if (guestuserID) {
      requestBody = {
        "uuid": guestuserID,
        "data": {
          "type": "social_account",
          "attributes": {
            "provider": socialMediaName,
            "access_token": resultData.credential && resultData.credential.accessToken,
          }
        }
      };
    } else {
      requestBody = {
        "data": {
          "type": "social_account",
          "attributes": {
            "provider": socialMediaName,
            "access_token": resultData.credential && resultData.credential.accessToken
          }
        }
      };
    }

    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), headers);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(requestBody));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeAddDetail);

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  //guest user Registration
  guestRegister = () => {
    this.setState({
      ...this.state,
      loading: true
    });

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.guestRegisterApiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.guestRegistrationAPIEndPoint);
    const headers = {
      'Content-Type': 'application/json'
    };
    const generateUUId = uuid();
    localStorage.setItem('guestUUID', generateUUId);
    const requestBody = {
      "data": {
        "type": "guest_account",
        "attributes": {
          "uuid": generateUUId
        }
      }
    };

    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), headers);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(requestBody));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeAddDetail);

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }
}
