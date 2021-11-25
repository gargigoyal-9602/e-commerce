import { BackHandler } from 'react-native';
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import StorageProvider from '../../../framework/src/StorageProvider';

import {
  GoogleSignin,
} from '@react-native-community/google-signin';

import ImagePicker from 'react-native-image-crop-picker';
// Customizable Area Start
import R from "../../../components/src/R";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  enableField: boolean;
  txtInputValue: string;
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
  isSocialLoginUser: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class ProfilebioController extends BlockComponent<
  Props,
  S,
  SS
  > {
  getUserProfileApiCallId: any;
  getWishlistApiCallId: any;
  updateProfileApiCallId: any;
  updateProfileNotificationApiCallId: any;
  cartHasProductAPICallID: any;

  _unsubscribe: any;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.AccoutLoginSuccess),
    getName(MessageEnum.RestAPIResponceMessage)];

    this.state = {
      profileImage: '',
      txtInputValue: '',
      enableField: false,
      userData: null,
      isFetching: true,
      isShowError: false,
      message: undefined,
      showAlertModal: false,
      showPickerModal: false,
      profileImageData: null,
      token: '',
      wishList: 0,
      cartHasProduct: false,
      isNotificationOn: false,
      showGuestModal: false,
      showLogoutModal: false,
      isSocialLoginUser: false,
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('willFocus', async () => {
      this.getProfileData();
      this.getWishList();
      let isSocialLoginUser = await StorageProvider.get('SOCIAL_LOGIN_USER');
      if (isSocialLoginUser) {
        this.setState({ isSocialLoginUser: true });
      }
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    });
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }

  getProfileData = async () => {
    const token = await StorageProvider.get('Userdata');
    const isGuestUser = await StorageProvider.get('GUEST_USER');
    this.setState({ token: token }, () => {
      !isGuestUser && this.getUserProfile();
    })
  };

  async componentWillUnmount() {
    this._unsubscribe.remove();
    runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
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

        if (apiRequestCallId === this.getUserProfileApiCallId) {
          this.getUserProfileSuccessCallBack(responseJson.data);
        }

        if (apiRequestCallId === this.getWishlistApiCallId) {
          this.setState({ wishList: responseJson?.data?.wishlist?.data?.attributes?.wishlist_items?.length, isFetching: false });
        }

        if (apiRequestCallId === this.updateProfileApiCallId) {
          this.updateProfileDataSuccessCallBack(responseJson.data);
        }

        if (apiRequestCallId === this.updateProfileNotificationApiCallId) {
          this.updateProfileNotificationDataSuccessCallBack(responseJson.data);
        }

        if (apiRequestCallId === this.cartHasProductAPICallID) {
          this.cartHasProductSuccessCallBack(responseJson.data);
        }

      }
      else if (responseJson && responseJson.errors) {

        if (apiRequestCallId === this.updateProfileApiCallId) {
          this.updateProfileDataFailureCallBack(responseJson);
        }

        if (apiRequestCallId === this.updateProfileNotificationApiCallId) {
          this.updateProfileNotificationDataFailureCallBack(responseJson);
        }

        if (apiRequestCallId === this.cartHasProductAPICallID) {
          this.cartHasProductFailureCallBack(responseJson);
        }

        this.setState({
          // isShowError: true, message: this.parseApiErrorResponse(responseJson), showAlertModal: true,
          isFetching: false,
        })
      }
      else if (errorReponse) {
        this.setState({ isFetching: false });
      }
    }
  }

  apiCall = async (data: any) => {
    const { contentType, method, endPoint, body } = data;
    const token = (await StorageProvider.get('Userdata')) || "";
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

  onPressCameraUploadImage = () => {
    this.setState({ showPickerModal: true });
  }

  onPressCamera = () => {
    try {
      ImagePicker.openCamera({
        mediaType: 'photo',
        compressImageQuality: 0.3,
        includeBase64: true,
        cropping: true,
      }).then(async (image) => {
        const source = { uri: image.path };
        this.setState(
          {
            profileImage: source,
            profileImageData: image,
            showPickerModal: false,
          },
          () => this.updateProfileData(),
        );
      });
    } catch (e) {
    }
  }

  onPressPickImage = () => {
    try {
      ImagePicker.openPicker({
        mediaType: 'photo',
        compressImageQuality: 0.3,
        includeBase64: true,
        cropping: true,
      }).then(async (image) => {
        const source = { uri: image.path };
        this.setState(
          {
            profileImage: source,
            profileImageData: image,
            showPickerModal: false,
          },
          () => this.updateProfileData(),
        );
      });
    } catch (e) {
    }
  }

  refreshCart = async () => {
    this.cartHasProductAPICallID = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.GetMethodType,
      endPoint: configJSON.cartHasProductEndPoint,
    });
  };

  getUserProfile = async () => {
    this.getUserProfileApiCallId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.GetMethodType,
      endPoint: configJSON.userProfileApiEndPoint,
    });
  }

  getUserProfileSuccessCallBack = async (res: any) => {
    this.setState({ userData: res, isFetching: false, isNotificationOn: res.attributes.is_notification_enabled }, () => {
      this.refreshCart();
    });
  }

  getUserProfileFailureCallBack = (error: any) => {
    if (error) {
      setTimeout(() => {
        this.setState({ message: this.parseApiErrorResponse(error), isShowError: true, showAlertModal: true });
      }, 0);
    } else {
      setTimeout(() => {
        this.setState({ message: 'Network Error!', isShowError: true, showAlertModal: true });
      }, 0);
    }
  }

  cartHasProductSuccessCallBack = (res: any) => {
    this.setState({ cartHasProduct: res.has_cart_product });
  }

  cartHasProductFailureCallBack = (error: any) => {
  }

  updateProfileData = async () => {
    let formData: any = {};
    let data: any = {};
    if (
      this.state.profileImageData.data &&
      !this.state.profileImageData.data.includes('https')
    ) {
      data['image'] = 'data:image/jpeg;base64,' + this.state.profileImageData.data
    }
    formData['data'] = data;
    this.updateProfileApiCallId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.PutMethodType,
      endPoint: configJSON.userProfileApiEndPoint,
      body: formData,
    });
  }

  updateProfileDataSuccessCallBack = async (res: any) => {
    setTimeout(() => {
      this.setState({ message: 'Your profile pic has been updated Successfully !', isShowError: false, showAlertModal: true }, async () => {
        this.getUserProfile();
      });
    }, 0);
  }

  updateProfileDataFailureCallBack = (error: any) => {
    if (error) {
      setTimeout(() => {
        this.setState({ message: this.parseApiErrorResponse(error), isShowError: true, showAlertModal: true });
      }, 0);
    } else {
      setTimeout(() => {
        this.setState({ message: 'Network Error!', isShowError: true, showAlertModal: true });
      }, 0);
    }
  }

  getWishList = async () => {
    this.getWishlistApiCallId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.GetMethodType,
      endPoint: configJSON.getWishListAPIEndPoint
    })
  }

  // Customizable Area Start
  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address"
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? R.profileBioImage.imgPasswordVisible
        : R.profileBioImage.imgPasswordInVisible;
    }
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? R.profileBioImage.imgPasswordVisible
      : R.profileBioImage.imgPasswordInVisible
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed()
  };

  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }

  onPressLoginButton = async () => {
    await StorageProvider.remove('GUEST_USER');
    await StorageProvider.remove('USER_ID');
    await StorageProvider.remove("Userdata")
    await StorageProvider.remove("SOCIAL_LOGIN_USER")
    this.props.navigation.replace('Auth');
  };

  onPressLogout = async () => {
    this.setState({ isFetching: true, showLogoutModal: false })
    const userInfo = await GoogleSignin.isSignedIn();
    if (userInfo)
      await GoogleSignin.signOut();
    await StorageProvider.remove("Userdata")
    await StorageProvider.remove('GUEST_USER');
    await StorageProvider.remove('USER_ID');
    await StorageProvider.remove('SOCIAL_LOGIN_USER');
    setTimeout(() => {
      this.setState({
        isFetching: false
      }, () => {
        this.props.navigation.replace("Auth");
        this.setState({ userData: null });
      });
    }, 500)
  }

  toggleSwitch = () => {
    this.setState({ isNotificationOn: !this.state.isNotificationOn }, () => {
      this.updateProfileNotification();
    });
  }

  updateProfileNotification = async () => {
    let formData: any = {};
    let data: any = {};
    data['is_notification_enabled'] = this.state.isNotificationOn
    formData['data'] = data;
    this.updateProfileNotificationApiCallId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.PutMethodType,
      endPoint: configJSON.userProfileApiEndPoint,
      body: formData,
    });
  }

  updateProfileNotificationDataSuccessCallBack = async (res: any) => {
    this.setState({ isFetching: false });
  }

  updateProfileNotificationDataFailureCallBack = (error: any) => {
    if (error) {
      setTimeout(() => {
        this.setState({ message: this.parseApiErrorResponse(error), isShowError: true, showAlertModal: true, isFetching: false, });
      }, 0);
    } else {
      setTimeout(() => {
        this.setState({ message: 'Network Error!', isShowError: true, showAlertModal: true, isFetching: false, });
      }, 0);
    }
  }

}
