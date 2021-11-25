import { IBlock } from "../../../../framework/src/IBlock";
import { Message } from "../../../../framework/src/Message";
import { BlockComponent } from "../../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { uuid } from 'uuidv4';
// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  history: any
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  showSpinner: boolean;
  loginError: string,
  showPass: boolean,

  loading?: boolean;
  socialMediaResult?: any;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class EmailAccountLoginController extends BlockComponent<Props, S, SS> {

  // Customizable Area Start
  apiEmailLoginCallId: string = "";
  validationApiCallId: string = "";
  emailReg: RegExp;
  labelTitle: string = "";
  verfiySocialLoginApiCallId: string;
  guestLoginApiCallId: string;
  loginAPICallID: string;
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
      showSpinner: false,
      loginError: "",
      showPass: false,
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    // Customizable Area Start

    //@ts-ignore
    const isNewUserToken = localStorage.getItem('SignUPtoken');
    const isNewUserData = localStorage.getItem('signUpUser');
    if (isNewUserData && isNewUserToken) {
      localStorage.clear();
    } else {
      //@ts-ignore
      if (window.localStorage.getItem("guestUUID") && this.verifyGuestToken() && this.props.location?.state?.calledFrom !== "guest-login") {
        this.props?.history?.push('/home-page');
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async verifyGuestToken() {
    let token = window.localStorage.getItem("token");
    return token?.length;
  }
  // Customizable Area End

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog('Message Received', message);
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      let apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (apiRequestCallId === this.verfiySocialLoginApiCallId) {
        if (responseJson) {
          if (this.state.socialMediaResult) {
            const { user, credential, additionalUserInfo } = this.state.socialMediaResult;
            let dat = {
              'email': user.email,
              'name': user.displayName
            }
            console.log(user.photoURL, "user.photoURL", JSON.stringify(dat), "this.state", this.state.socialMediaResult);
            await localStorage.setItem('user', JSON.stringify(responseJson.data));
            await localStorage.setItem('token', responseJson.meta.token);
            await localStorage.setItem('profileImage', user.photoURL);
            await localStorage.setItem('userData', JSON.stringify(dat));
            const guestId = localStorage.getItem('guestUUID');
            if (guestId) {
              //@ts-ignore
              this.props.location?.state?.redirect === "wishlist"
                ?
                (
                  setTimeout(() => {
                    this.props.history.push({
                      pathname: "/profilebio",
                      state: { activeTab: "wishlist" }
                    });
                  }, 1000)
                )
                :
                setTimeout(() => {
                  this.props.history.push('/cart');
                }, 1000)
            } else {
              setTimeout(() => {
                this.props.history.push('/home-page');
              }, 1000)
            }

          }
        }
      }
      if (apiRequestCallId === this.guestLoginApiCallId) {
        if (responseJson && responseJson.data && responseJson.meta) {
          this.setState({
            ...this.state,
            loading: false
          });
          localStorage.setItem('guestUserData', JSON.stringify(responseJson.data));
          localStorage.setItem('token', responseJson.meta.token);
          //@ts-ignore
          window.notify([{ type: 'success', message: 'Welcome to Our Store !' }])
          this.props.history?.push('/home-page');
        }
      }
      if (apiRequestCallId === this.loginAPICallID) {
        if (responseJson && responseJson.data && responseJson.meta) {
          this.setShowSpinner(false);
          const { data, meta } = responseJson;
          if (meta && meta.token) {
            localStorage.setItem("token", meta.token)
          }
          if (data) {
            localStorage.setItem("user", JSON.stringify(data));
            let dat = {
              'email': data.attributes.email,
              'name': data.attributes.full_name
            }
            //@ts-ignore
            const guestuserID = localStorage.getItem('guestUUID');

            localStorage.setItem('userData', JSON.stringify(dat));
            localStorage.setItem('profileImage', data.attributes.image_url && data.attributes.image_url);
            const GuesrUserId = localStorage.getItem('guestUUID');
            const GuestUserData = localStorage.getItem('guestUserData');
            if (GuestUserData && guestuserID) {
              //@ts-ignore
              this.props?.location?.state?.redirect === 'wishlist'
                ?
                setTimeout(() => {
                  this.props.history?.push({ pathname: '/profilebio', state: { activeTab: "wishlist" } })
                }, 1000)
                :
                // @ts-ignore
                this.routeToAll("/cart");
            }
            else {
              //@ts-ignore
              window.notify([{ type: 'success', message: meta?.message }])
              // @ts-ignore
              this.routeToAll("/home-page");
            }
          }
        }
        if (responseJson && responseJson.errors && responseJson.errors.length > 0) {
          console.log("fgbfdgbb", responseJson.errors[0])
          this.setShowSpinner(false);
          // @ts-ignore
          window.notify([{ message: responseJson.errors[0].pin || "Something went wrong!!!", type: "danger" }]);
        }
      }
    }
    else {

    }
    // Customizable Area End
  }

  logInWithFaceBook() {
    console.log("logInWithFaceBook")
  }

  logInWithGoogle() {
    console.log("logInWithGoogle")
  }

  routeToAll(route: string) {
    this.props.history.push(route)
  }

  showPassword = (e: any) => {
    e.preventDefault();
    this.setState(prevState => ({
      showPass: !prevState.showPass
    }));
  };

  setShowSpinner = (value: boolean) => {
    this.setState({ showSpinner: value })
  }

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

  //guest user login
  guestLogin = () => {
    this.setState({
      ...this.state,
      loading: true
    });

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.guestLoginApiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.guestLoginAPIEndPoint);
    const headers = {
      'Content-Type': 'application/json'
    };
    const generateID = uuid();
    console.log("&&&&&&&&", generateID);
    localStorage.setItem('guestUUID', generateID);
    const requestBody = {
      "data": {
        "type": "guest_account",
        "attributes": {
          "uuid": generateID
        }
      }
    };

    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), headers);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(requestBody));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeAddDetail);

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  //Login Form
  handleSubmitLogin = (data: any) => {
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.loginAPICallID = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.loginAPiCallEndPoint);

    const headers = {
      'Content-Type': 'application/json'
    };
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(headers));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(data));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeAddDetail);

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }
}