import React, { Component } from 'react';
import { View, Image, StyleSheet, Linking } from 'react-native';
//@ts-ignore
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import * as IMG_CONST from '../blocks/studio-store-ecommerce-theme/src/ImageConstants';
import scale, { verticalScale } from '../framework/src/utils/Scale';

import StorageProvider from '../framework/src/StorageProvider';

import HomeScreen from '../components/src/HomeScreen';
import InfoPage from '../blocks/info-page/src/InfoPageBlock';

import { fcmService } from '../services/notifications/FCMService';
import { localNotificationService } from '../services/notifications/LocalNotificationService';
import TargetedFeed200 from "../blocks/TargetedFeed200/src/TargetedFeed200";
import AddressManagement2 from "../blocks/AddressManagement2/src/AddressManagement2";
import ProductDescription from "../blocks/productdescription/src/ProductDescription";
import ReviewList from "../blocks/productdescription/src/ReviewList";
import Auth from "../blocks/auth/src/Auth";
import ForgotPassword from "../blocks/forgot-password/src/ForgotPassword";
import NewPassword from "../blocks/forgot-password/src/NewPassword";
import ApiIntegration200 from "../blocks/ApiIntegration200/src/ApiIntegration200";
import WishList from "../blocks/wishlist/src/WishList";
import Contactus from "../blocks/contactus/src/Contactus";
import Splashscreen from "../blocks/splashscreen/src/Splashscreen";
import EmailNotifications2 from "../blocks/EmailNotifications2/src/EmailNotifications2";
import Orderdetailview from "../blocks/orderdetailview/src/Orderdetailview";
import Profilebio from "../blocks/profilebio/src/Profilebio";
import EditProfile from "../blocks/profilebio/src/EditProfile";
import ChangePassword from "../blocks/profilebio/src/ChangePassword";
import Notifications from "../blocks/notifications/src/Notifications";
import FacebookLogin200 from "../blocks/FacebookLogin200/src/FacebookLogin200";
import Dashboard200 from "../blocks/Dashboard200/src/Dashboard200";
import UploadMedia200 from "../blocks/UploadMedia200/src/UploadMedia200";
import Payments from "../blocks/payments/src/Payments";
import Hyperpay from "../blocks/payments/src/Hyperpay";
import OrderConfirm from "../blocks/payments/src/OrderConfirm";
import Reviews200 from "../blocks/Reviews200/src/Reviews200";
import InvoiceBilling200 from "../blocks/InvoiceBilling200/src/InvoiceBilling200";
import BulkUploading200 from "../blocks/BulkUploading200/src/BulkUploading200";
import LiveChat200 from "../blocks/LiveChat200/src/LiveChat200";
import Login from "../blocks/login/src/Login";
import Ordermanagement from "../blocks/ordermanagement/src/Ordermanagement";
import Share2 from "../blocks/Share2/src/Share2";
import GoogleLogin1710 from "../blocks/GoogleLogin1710/src/GoogleLogin1710";
import ShippingChargeCalculator200 from "../blocks/ShippingChargeCalculator200/src/ShippingChargeCalculator200";
import AdHocReporting2 from "../blocks/AdHocReporting2/src/AdHocReporting2";
import DiscountsOffers from "../blocks/DiscountsOffers/src/DiscountsOffers";
import Shoppingcart from "../blocks/shoppingcart/src/Shoppingcart";
import EditAddress from "../blocks/shoppingcart/src/EditAddress";
import SavedAddress from "../blocks/shoppingcart/src/SavedAddress";
import Checkout from "../blocks/shoppingcart/src/Checkout";
import RolesPermissions from "../blocks/RolesPermissions/src/RolesPermissions";
import Catalogue from "../blocks/catalogue/src/Catalogue";
import AdminConsole2 from "../blocks/AdminConsole2/src/AdminConsole2";
import Signup from "../blocks/signup/src/Signup";
import Filteritems from "../blocks/filteritems/src/Filteritems";
import Filteroptions from "../blocks/filteritems/src/Filteroptions";
import ApiIntegration5 from "../blocks/ApiIntegration5/src/ApiIntegration5";
import Sorting from "../blocks/sorting/src/Sorting";
import ConnectedAccounts from "../blocks/connectedaccounts/src/ConnectedAccounts";
import Interactivefaqs from "../blocks/interactivefaqs/src/Interactivefaqs";
import AccountCreation2 from "../blocks/AccountCreation2/src/AccountCreation2";
import Ordersummary from "../blocks/ordersummary/src/Ordersummary";
import CustomisedOrderStatus200 from "../blocks/CustomisedOrderStatus200/src/CustomisedOrderStatus200";
import Search from "../blocks/search/src/Search";
import Categoriessubcategories from "../blocks/categoriessubcategories/src/Categoriessubcategories";
import PhoneLogin200 from "../blocks/PhoneLogin200/src/PhoneLogin200";
import HelpCenter from "../blocks/helpcenter/src/HelpCenter";
import HelpCenterData from "../blocks/helpcenter/src/HelpCenterData";
import OTPInputAuth from "../blocks/otp-input-confirmation/src/OTPInputAuth";
import RolesPermissions2 from "../blocks/RolesPermissions2/src/RolesPermissions2";
import EmailLists2 from "../blocks/EmailLists2/src/EmailLists2";
import CouponCodeGenerator200 from "../blocks/CouponCodeGenerator200/src/CouponCodeGenerator200";
import networkHOC from '../framework/src/utils/NetInfoHoc';
import NoNetwork from '../components/src/NoNetwork/NoNetworkScreen';

const HomeStack = createStackNavigator({
  Home: { screen: Payments, navigationOptions: { header: null, title: "Home" } },
  TargetedFeed200: { screen: TargetedFeed200, navigationOptions: { title: "TargetedFeed200" } },
  AddressManagement2: { screen: AddressManagement2, navigationOptions: { title: "AddressManagement2" } },
  ProductDescription: { screen: ProductDescription, navigationOptions: { title: "ProductDescription" } },
  ReviewList: { screen: ReviewList, navigationOptions: { title: "ReviewList" } },
  Auth: { screen: Auth, navigationOptions: { title: "Auth" } },
  ForgotPassword: { screen: ForgotPassword, navigationOptions: { title: "ForgotPassword" } },
  NewPassword: { screen: NewPassword, navigationOptions: { title: "NewPassword" } },
  ApiIntegration200: { screen: ApiIntegration200, navigationOptions: { title: "ApiIntegration200" } },
  WishList: { screen: WishList, navigationOptions: { title: "WishList" } },
  Contactus: { screen: Contactus, navigationOptions: { title: "Contactus" } },
  Splashscreen: { screen: Splashscreen, navigationOptions: { title: "Splashscreen" } },
  EmailNotifications2: { screen: EmailNotifications2, navigationOptions: { title: "EmailNotifications2" } },
  Orderdetailview: { screen: Orderdetailview, navigationOptions: { title: "Orderdetailview" } },
  Profilebio: { screen: Profilebio, navigationOptions: { title: "Profilebio" } },
  EditProfile: { screen: EditProfile, navigationOptions: { title: "EditProfile" } },
  ChangePassword: { screen: ChangePassword, navigationOptions: { title: "ChangePassword" } },
  Notifications: { screen: Notifications, navigationOptions: { title: "Notifications" } },
  FacebookLogin200: { screen: FacebookLogin200, navigationOptions: { title: "FacebookLogin200" } },
  Dashboard200: { screen: Dashboard200, navigationOptions: { title: "Dashboard200" } },
  UploadMedia200: { screen: UploadMedia200, navigationOptions: { title: "UploadMedia200" } },
  Payments: { screen: Payments, navigationOptions: { title: "Payments" } },
  Hyperpay: { screen: Hyperpay, navigationOptions: { title: "Hyperpay" } },
  OrderConfirm: { screen: OrderConfirm, navigationOptions: { title: "OrderConfirm" } },
  Reviews200: { screen: Reviews200, navigationOptions: { title: "Reviews200" } },
  InvoiceBilling200: { screen: InvoiceBilling200, navigationOptions: { title: "InvoiceBilling200" } },
  BulkUploading200: { screen: BulkUploading200, navigationOptions: { title: "BulkUploading200" } },
  LiveChat200: { screen: LiveChat200, navigationOptions: { title: "LiveChat200" } },
  Login: { screen: Login, navigationOptions: { title: "Login" } },
  Ordermanagement: { screen: Ordermanagement, navigationOptions: { title: "Ordermanagement" } },
  Share2: { screen: Share2, navigationOptions: { title: "Share2" } },
  GoogleLogin1710: { screen: GoogleLogin1710, navigationOptions: { title: "GoogleLogin1710" } },
  ShippingChargeCalculator200: { screen: ShippingChargeCalculator200, navigationOptions: { title: "ShippingChargeCalculator200" } },
  AdHocReporting2: { screen: AdHocReporting2, navigationOptions: { title: "AdHocReporting2" } },
  DiscountsOffers: { screen: DiscountsOffers, navigationOptions: { title: "DiscountsOffers" } },
  Shoppingcart: { screen: Shoppingcart, navigationOptions: { title: "Shoppingcart" } },
  EditAddress: { screen: EditAddress, navigationOptions: { title: "EditAddress" } },
  SavedAddress: { screen: SavedAddress, navigationOptions: { title: "SavedAddress" } },
  Checkout: { screen: Checkout, navigationOptions: { title: "Checkout" } },
  RolesPermissions: { screen: RolesPermissions, navigationOptions: { title: "RolesPermissions" } },
  Catalogue: { screen: Catalogue, navigationOptions: { title: "Catalogue" } },
  AdminConsole2: { screen: AdminConsole2, navigationOptions: { title: "AdminConsole2" } },
  Signup: { screen: Signup, navigationOptions: { title: "Signup" } },
  Filteritems: { screen: Filteritems, navigationOptions: { title: "Filteritems" } },
  Filteroptions: { screen: Filteroptions, navigationOptions: { title: "Filteroptions" } },
  ApiIntegration5: { screen: ApiIntegration5, navigationOptions: { title: "ApiIntegration5" } },
  Sorting: { screen: Sorting, navigationOptions: { title: "Sorting" } },
  ConnectedAccounts: { screen: ConnectedAccounts, navigationOptions: { title: "ConnectedAccounts" } },
  Interactivefaqs: { screen: Interactivefaqs, navigationOptions: { title: "Interactivefaqs" } },
  AccountCreation2: { screen: AccountCreation2, navigationOptions: { title: "AccountCreation2" } },
  Ordersummary: { screen: Ordersummary, navigationOptions: { title: "Ordersummary" } },
  CustomisedOrderStatus200: { screen: CustomisedOrderStatus200, navigationOptions: { title: "CustomisedOrderStatus200" } },
  Search: { screen: Search, navigationOptions: { title: "Search" } },
  Categoriessubcategories: { screen: Categoriessubcategories, navigationOptions: { title: "Categoriessubcategories" } },
  PhoneLogin200: { screen: PhoneLogin200, navigationOptions: { title: "PhoneLogin200" } },
  HelpCenter: { screen: HelpCenter, navigationOptions: { title: "HelpCenter" } },
  HelpCenterData: { screen: HelpCenterData, navigationOptions: { title: "HelpCenterData" } },
  OTPInputAuth: { screen: OTPInputAuth, navigationOptions: { title: "OTPInputAuth" } },
  RolesPermissions2: { screen: RolesPermissions2, navigationOptions: { title: "RolesPermissions2" } },
  EmailLists2: { screen: EmailLists2, navigationOptions: { title: "EmailLists2" } },
  CouponCodeGenerator200: { screen: CouponCodeGenerator200, navigationOptions: { title: "CouponCodeGenerator200" } },

});

const themeJson = require('./../blocks/studio-store-ecommerce-theme/src/theme.json');

const Footer = createBottomTabNavigator(
  {
    Catalogue: { screen: Catalogue, navigationOptions: { header: null, gestureEnabled: false } },
    Home: { screen: Search, navigationOptions: { header: null, title: 'Search' } },
    Categoriessubcategories: {
      screen: Categoriessubcategories,
      navigationOptions: { header: null, },
    },
    WishList: {
      screen: WishList,
      navigationOptions: { header: null, },
    },
    Profilebio: {
      screen: Profilebio,
      navigationOptions: { header: null, },
    },
  },
  {
    navigationOptions: ({ navigation }: any) => ({
      tabBarIcon: ({ tintColor, focused, iconIndex }: any) => {
        const { routeName } = navigation.state;
        if (routeName === 'Catalogue') {
          return (
            <View style={styles.outerContainer}>
              <View style={[styles.tabContainer, { borderTopColor: focused ? themeJson.attributes.primary_color : 'transparent' }]}>
                <Image source={focused ? IMG_CONST.HOME_ACTIVE : IMG_CONST.HOME_INACTIVE} style={styles.homeIcons} />
              </View>
            </View>
          )
        } else if (routeName === 'Home') {
          return (
            <View style={styles.outerContainer}>
              <View style={[styles.tabContainer, { borderTopColor: focused ? themeJson.attributes.primary_color : 'transparent' }]}>
                <Image source={focused ? IMG_CONST.SEARCH_ACTIVE : IMG_CONST.SEARCH_INACTIVE} style={styles.searchIcons} />
              </View>
            </View>
          )
        } else if (routeName === 'Categoriessubcategories') {
          return (
            <View style={styles.outerContainer}>
              <View style={[styles.tabContainer, { borderTopColor: focused ? themeJson.attributes.primary_color : 'transparent' }]}>
                <Image source={focused ? IMG_CONST.EXPLORE_ACTIVE : IMG_CONST.EXPLORE_INACTIVE} style={styles.exploreIcons} />
              </View>
            </View>
          )
        } else if (routeName === 'WishList') {
          return (
            <View style={styles.outerContainer}>
              <View style={[styles.tabContainer, { borderTopColor: focused ? themeJson.attributes.primary_color : 'transparent' }]}>
                <Image source={focused ? IMG_CONST.WISH_ACTIVE : IMG_CONST.WISH_INACTIVE} style={styles.wishListIcons} />
              </View>
            </View>
          )
        } else if (routeName === 'Profilebio') {
          return (
            <View style={styles.outerContainer}>
              <View style={[styles.tabContainer, { borderTopColor: focused ? themeJson.attributes.primary_color : 'transparent' }]}>
                <Image source={focused ? IMG_CONST.ACCOUNT_ACTIVE : IMG_CONST.ACCOUNT_INACTIVE} style={styles.profileIcons} />
              </View>
            </View>
          )
        }
      },
    }),
    tabBarOptions: {
      style: {
        backgroundColor: "#ffffff",
        borderColor: '#ffffff',
        height: verticalScale(50),
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.55,
        elevation: 2,
      },
      showLabel: false,
      activeTintColor: '#EFBBCF',
      inactiveTintColor: '#ccc',

    },
  }
);

const MainNavigator = createStackNavigator({
  Footer: { screen: Footer, navigationOptions: { header: null, title: 'Home' } },

  Filteritems: { screen: Filteritems, navigationOptions: { header: null, } },

  Filteroptions: {
    screen: Filteroptions,
    navigationOptions: { header: null },
  },

  Notifications: {
    screen: Notifications,
    navigationOptions: { header: null, },
  },

  Orderdetailview: {
    screen: Orderdetailview,
    navigationOptions: { header: null }
  },

  Search: { screen: Search, navigationOptions: { header: null } },

  Sorting: { screen: Sorting, navigationOptions: { title: 'Sorting' } },

  EditProfile: {
    screen: EditProfile,
    navigationOptions: { header: null }
  },

  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: { header: null }
  },

  HelpCenter: {
    screen: HelpCenter,
    navigationOptions: { header: null }
  },

  HelpCenterData: {
    screen: HelpCenterData,
    navigationOptions: { header: null }
  },

  ConnectedAccounts: {
    screen: ConnectedAccounts,
    navigationOptions: { header: null }
  },

  EditAddress: {
    screen: EditAddress,
    navigationOptions: { header: null }
  },

  ProductDescription: {
    screen: ProductDescription,
    navigationOptions: { header: null },
  },

  ReviewList: {
    screen: ReviewList,
    navigationOptions: { header: null },
  },

  SavedAddress: {
    screen: SavedAddress,
    navigationOptions: { header: null },
  },

  Contactus: {
    screen: Contactus,
    navigationOptions: { header: null },
  },

  Splashscreen: {
    screen: Splashscreen,
    navigationOptions: { title: 'Splashscreen' },
  },

  Shoppingcart: {
    screen: Shoppingcart,
    navigationOptions: { header: null },
  },

  Interactivefaqs: {
    screen: Interactivefaqs,
    navigationOptions: { header: null },
  },

  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: { header: null },
  },

  Profilebio: { screen: Profilebio, navigationOptions: { header: null } },

  WishList: { screen: WishList, navigationOptions: { header: null } },

  Ordersummary: {
    screen: Ordersummary,
    navigationOptions: { header: null },
  },

  Payments: { screen: Payments, navigationOptions: { header: null } },

  Hyperpay: { screen: Hyperpay, navigationOptions: { title: 'Hyperpay' } },

  OrderConfirm: {
    screen: OrderConfirm,
    navigationOptions: { header: null, gesturesEnabled: false },
  },

  Ordermanagement: {
    screen: Ordermanagement,
    navigationOptions: { header: null, gesturesEnabled: false },
  },

  InfoPage: { screen: InfoPage, navigationOptions: { title: 'Info' } },

  Auth: {
    screen: Auth,
    navigationOptions: { header: null, gestureEnabled: false }
  },

  Checkout: {
    screen: Checkout,
    navigationOptions: { header: null }
  },

  MainNavigator: { screen: Footer, navigationOptions: { header: null, gestureEnabled: false } },

});

const AuthNavigator = createStackNavigator({
  Auth: {
    screen: Auth,
    navigationOptions: { header: null, gestureEnabled: false }
  },

  OTPInputAuth: {
    screen: OTPInputAuth,
    navigationOptions: { header: null },
  },

  NewPassword: { screen: NewPassword, navigationOptions: { header: null } },

  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: { header: null },
  },

  MainNavigator: {
    screen: MainNavigator,
    navigationOptions: { header: null }
  },
},
  {
    initialRouteName: 'Auth',
  }
)

if (!HomeScreen.instance) {
  const defaultProps = {
    navigation: null,
    id: 'HomeScreen',
  };
  const homeScreen = new HomeScreen(defaultProps);
}

export interface Props {
  navigation: any;
}

const MainStackNavigator = createStackNavigator({
  Splashscreen: { screen: Splashscreen, navigationOptions: { header: null, gestureEnabled: false } },
  AuthNavigator: { screen: AuthNavigator, navigationOptions: { header: null, gestureEnabled: false } },
  MainNavigator: { screen: MainNavigator, navigationOptions: { header: null, gestureEnabled: false } },
});

export let appObj: any = {};

class App extends Component {
  constructor(props: any) {
    super(props);
    appObj = this;
    this.state = {
      isDeepLinkUtilised: false,
    };
    console.disableYellowBox = true;
  }

  componentDidMount() {
    this.setDeepLink();
    this.setupNotification();
  }

  setDeepLink = () => {
    Linking.getInitialURL().then(url => {
      if (url) {
        this.deepLinkNavigate(url);
      }
    });
    Linking.addEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = (event: any) => { // D
    this.setState({ isDeepLinkUtilised: false }, () => {
    })
  }

  deepLinkNavigate = async (url: any) => {
    const route = url.replace(/.*?:\/\//g, '');
    const id = route.match(/\/([^\/]+)\/?$/)[1];
    const routeName = route.split('/')[0];
    let userToken = await StorageProvider.get('USER_TOKEN');
  }

  setupNotification = async () => {
    let accessToken = await StorageProvider.get('USER_TOKEN');
    if (!accessToken) {
      try {
        fcmService.register(
          (token: any) => this.onRegister(token),
          (notify: any) => this.onNotification(notify),
          (notify: any) => this.onOpenNotification(notify));
        localNotificationService.configure((notify: any) => this.onOpenNotification(notify));
      } catch (error) {
      }
    }
  }

  onRegister = async (token: any) => {
  }

  onNotification = (notify: any) => {
  }

  onOpenNotification = (notify: any) => {

  }

  render() {
    const { isConnected }: any = this.props;
    return isConnected ? (
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    ) : <NoNetwork />;
  }
}

export default networkHOC()(App);

const styles = StyleSheet.create({

  outerContainer: {
    flex: 1,
  },
  tabContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: scale(2),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(17),
    width: scale(70),
  },
  homeIcons: {
    width: scale(28.8),
    height: scale(25),
  },

  exploreIcons: {
    width: scale(22),
    height: scale(22),
  },

  searchIcons: {
    width: scale(22.4),
    height: scale(22.5),
  },

  wishListIcons: {
    width: scale(24),
    height: scale(22),
  },

  profileIcons: {
    width: scale(6.2),
    height: scale(22.2),
  },
})