import { BackHandler, Platform } from "react-native";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import StorageProvider from "../../../framework/src/StorageProvider";
import DeviceInfo from "react-native-device-info";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import {
  GoogleSignin,
  statusCodes
} from "@react-native-community/google-signin";
// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  showDisconnectModal: boolean;
  socialAccountList: any;
  selectedAccountData: any;
  selectedAccountName: string;
  isFetching: boolean;
  userDetails: any;
  isFromFacebook: boolean;
  isShowError: boolean;
  token: string;
  message: any;
  showAlertModal: boolean;
  userInfo: any;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ConnectedAccountsController extends BlockComponent<
  Props,
  S,
  SS
> {
  _unsubscribe: any;
  getAccountListApiCallId: any;
  getConnectedSocialMediaDataApiCallId: any;
  addSocialMediaAccountApiCallId: any;
  removeSocialMediaAccountApiCallId: any;
  apiSocialLoginCallId: any;

  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials)
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      token: "",
      showDisconnectModal: false,
      socialAccountList: [],
      selectedAccountData: null,
      selectedAccountName: "",
      message: "",
      isFetching: true,
      userDetails: null,
      userInfo: null,
      isFromFacebook: false,
      isShowError: false,
      showAlertModal: false
      // Customizable Area Start
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    this.setupGoogleConfiguration();
    this._unsubscribe = this.props.navigation.addListener(
      "willFocus",
      async () => {
        this.getConnectedSocialMediaData();
        BackHandler.addEventListener(
          "hardwareBackPress",
          this.handleBackButtonClick
        );
      }
    );
    // Customizable Area Start
    // Customizable Area End
  }

  async componentWillUnmount() {
    super.componentWillUnmount();
    this._unsubscribe.remove();
    runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    // Customizable Area Start
    // Customizable Area End
  }

  setupGoogleConfiguration = () => {
    // Customizable Area Start
    GoogleSignin.configure({
      //It is mandatory to call this method before attempting to call signIn()
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId generated from Firebase console
      webClientId: "60789253831-jm71v8bdhhptl8qn7dg7je6o8e6lno6v.apps.googleusercontent.com"
    });
    // Customizable Area End
  };

  handleBackButtonClick = () => {
    if (this.props.navigation.goBack) {
        this.props.navigation.goBack();
    } 
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
        if (apiRequestCallId === this.getConnectedSocialMediaDataApiCallId) {
          this.getSocialMediaAccountDetailsSuccessCallBack(responseJson.data);
        }
        if (apiRequestCallId === this.addSocialMediaAccountApiCallId) {
          this.addSocialMediaAccountDetailsSuccessCallBack();
        }
        if (apiRequestCallId === this.removeSocialMediaAccountApiCallId) {
          this.removeSocialMediaAccountDetailsSuccessCallBack();
        }
        // Customizable Area Start
        // Customizable Area End
      } else if (responseJson && responseJson.errors) {
        if (apiRequestCallId === this.getConnectedSocialMediaDataApiCallId) {
          this.getSocialMediaAccountDetailsSuccessCallBack(responseJson);
        }
        if (apiRequestCallId === this.addSocialMediaAccountApiCallId) {
          this.addSocialMediaAccountDetailsFailureCallBack();
        }
        if (apiRequestCallId === this.removeSocialMediaAccountApiCallId) {
          this.removeSocialMediaAccountDetailsFailureCallBack();
        }
        // Customizable Area Start
        // Customizable Area End
      } else if (errorReponse) {
        // Customizable Area Start
        // this.setState({
        //     isShowError: true, message: errorReponse, showAlertModal: true,
        //     isFetching: false,
        // })
        // Customizable Area End
      }
    }
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

  initUser = async (token: string) => {
    fetch(
      "https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=" +
        token
    )
      .then(response => {
        response.json().then(async json => {
          const userID = (await StorageProvider.get("USER_ID")) || "";
          let data = {
            access_token: token,
            provider: "facebook",
            display_name: json.name,
            uuid: DeviceInfo.getUniqueId(),
            account_id: userID,
            unique_auth_id: json.id
          };
          const socialData = {
            data: {
              type: "social_account",
              attributes: data
            }
          };
          this.setState({ selectedAccountName: "Facebook" });
          this.addSocialMediaAccountApiCallId = await this.apiCall({
            contentType: configJSON.ApiContentType,
            method: configJSON.PostMethodType,
            endPoint: `${configJSON.addSocialConnectedAccountsApiEndPoint}`,
            body: socialData
          });
        });
      })
      .catch(() => {
        console.log("ERROR GETTING DATA FROM FACEBOOK");
      });
  };
  onPressLoginWithFacebook = () => {
    if (Platform.OS === "android") {
      LoginManager.setLoginBehavior("web_only");
    }
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      result => {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken =
              data && data.accessToken ? data.accessToken : "";
            this.initUser(accessToken);
          });

          if (result && result.grantedPermissions) {
            console.log(
              "Login success with permissions: " +
                result.grantedPermissions.toString()
            );
          }
        }
      },
      function(error) {
        console.log("Login fail with error: " + error);
      }
    );
  };

  onPressGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true
      });
      const userInfo = await GoogleSignin.signIn();
      const userToken = await GoogleSignin.getTokens();
      const userID = (await StorageProvider.get("USER_ID")) || "";
      let data = {
        access_token: userToken.accessToken,
        provider: "google",
        uuid: DeviceInfo.getUniqueId(),
        display_name: userInfo.user.name,
        account_id: userID,
        unique_auth_id: userInfo.user.id
      };
      const socialData = {
        data: {
          type: "social_account",
          attributes: data
        }
      };
      this.setState({ selectedAccountName: "Google" });
      this.addSocialMediaAccountApiCallId = await this.apiCall({
        contentType: configJSON.ApiContentType,
        method: configJSON.PostMethodType,
        endPoint: `${configJSON.addSocialConnectedAccountsApiEndPoint}`,
        body: socialData
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User Cancelled the Login Flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Signing In");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play Services Not Available or Outdated");
      } else {
        console.log("Some Other Error Happened");
      }
    }
  };

  _signOut = async () => {
    AccessToken.getCurrentAccessToken().then(data => {
      if (data) {
        LoginManager.logOut();
      }
    });
    //Remove user session from the device.
    try {
      const userInfo = await GoogleSignin.isSignedIn();
      if (userInfo) {
        await GoogleSignin.signOut();
      }
      this.setState({ userInfo: null }); // Remove the user from your app's state as well
    } catch (error) {}
  };

  getConnectedSocialMediaData = async () => {
    this.getConnectedSocialMediaDataApiCallId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.GetMethodType,
      endPoint: `${configJSON.getconnectedAccountsApiEndPoint}`
    });
  };

  getSocialMediaAccountDetailsSuccessCallBack = (res: any) => {
    this.setState({
      socialAccountList: res.social_accounts.data,
      userDetails: res.account.data.attributes,
      isFetching: false
    });
  };

  getSocialMediaAccountDetailsFailureCallBack = (error: any) => {
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

  addSocialMediaAccountDetailsSuccessCallBack = () => {
    this._signOut();
    this.getConnectedSocialMediaData();
    let accountName = this.state.selectedAccountName;
    let msg = "";
    // Customizable Area Start
    if (accountName === "Google") {
      msg = "Google account added successfully.";
    } else if (accountName === "Facebook") {
      msg = "Facebook account added successfully.";
    }
    // Customizable Area End
    this.getConnectedSocialMediaData();
    setTimeout(() => {
      this.setState({ message: msg, isShowError: false, showAlertModal: true });
    }, 0);
  };

  addSocialMediaAccountDetailsFailureCallBack = () => {
    // Customizable Area Start
    // Customizable Area End
  };

  removeSocialMediaAccountDetails = async () => {
    this.removeSocialMediaAccountApiCallId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.DeleteMethodType,
      endPoint: `${configJSON.removeSocialConnectedAccountsApiEndPoint}/${
        this.state.selectedAccountData.id
      }`
    });
  };

  removeSocialMediaAccountDetailsSuccessCallBack = () => {
    this._signOut();
    let accountName = this.state.selectedAccountData.attributes.provider;
    let msg = "";
    // Customizable Area Start
    if (accountName === "google") {
      msg = "Google account removed successfully.";
    } else if (accountName === "facebook") {
      msg = "Facebook account removed successfully.";
      // Customizable Area End
    }
    this.getConnectedSocialMediaData();
    setTimeout(() => {
      this.setState({ message: msg, isShowError: false, showAlertModal: true });
    }, 0);
  };

  removeSocialMediaAccountDetailsFailureCallBack = () => {
    this._signOut();
  };

  // Customizable Area Start
  // Customizable Area End
}
