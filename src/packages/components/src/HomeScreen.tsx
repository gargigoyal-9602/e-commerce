import React from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";
import { BlockComponent } from "../../framework/src/BlockComponent";
import AlertBlock from '../../blocks/alert/src/AlertBlock';
import CustomTextItem from "./CustomTextItem";
import NavigationBlock from "../../framework/src/Blocks/NavigationBlock";
import SingletonFactory from '../../framework/src/SingletonFactory';

import HomeScreenAdapter from '../../blocks/adapters/src/HomeScreenAdapter';
import InfoPageAdapter from '../../blocks/adapters/src/InfoPageAdapter';
import AlertPageWebAdapter from "../../blocks/adapters/src/AlertPageWebAdapter";

// Customizable Area Start
import PrivacyPolicyAdapter from "../../blocks/adapters/src/PrivacyPolicyAdapter";
import TermsAndConditionAdapter from "../../blocks/adapters/src/TermsAndConditionAdapter";

//Assembler generated adapters start

//Assembler generated adapters end



const privacyAdapter = new PrivacyPolicyAdapter();
const termAndConditionAdapter = new TermsAndConditionAdapter();
// Customizable Area End


const restAPIBlock = SingletonFactory.getRestBlockInstance();
const alertBlock = new AlertBlock();
const navigationBlock = new NavigationBlock();
const sessionBlock = SingletonFactory.getSessionBlockInstance();
const userAccountManagerBlock = SingletonFactory.getUserManagerInstance();
const homeScreenAdapter = new HomeScreenAdapter();
const infoPageAdapter = new InfoPageAdapter();
const alertPageWebAdapter = new AlertPageWebAdapter()

const instructions = Platform.select({
  // Customizable Area Start
  ios: "The iOS APP to rule them all!",
  android: "Now with Android AI",
  web: "Selector your adventure."
  // Customizable Area End
});

interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

// Customizable Area Start
interface S { }

interface SS { }

class HomeScreen extends BlockComponent<Props, S, SS> {

  static instance: HomeScreen;

  constructor(props: Props) {
    super(props);
    HomeScreen.instance = this;
  }

  render() {
    const { navigation } = this.props;
    const _this = this;

    return (
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollView} bounces={false}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.welcome}>
                Welcome to Freemium87482!
              </Text>
            </View>

            <Text style={styles.instructions}>{instructions}</Text>
            <Text style={styles.header}>DEFAULT BLOCKS</Text>
            <CustomTextItem
              content={'InfoPage'}
              onPress={() => navigation.navigate("InfoPage")}
            />
            <CustomTextItem
              content={'Alert'}
              onPress={() => this.showAlert("Example", "This happened")}
            />
            <CustomTextItem content={'Auth'} onPress={() => navigation.navigate("Auth")} />
            <CustomTextItem content={'PhoneNumberInput'} onPress={() => navigation.navigate("PhoneNumberInput")} />
            <CustomTextItem content={'CountryCodeSelector'} onPress={() => navigation.navigate("CountryCodeSelector")} />
            <CustomTextItem content={'OTPInputAuth'} onPress={() => navigation.navigate("OTPInputAuth")} />
            <CustomTextItem content={'EmailAccountRegistration'} onPress={() => navigation.navigate("EmailAccountRegistration")} />
            <CustomTextItem content={'SocialMediaAccountRegistrationScreen'} onPress={() => navigation.navigate("SocialMediaAccountRegistrationScreen")} />
            <CustomTextItem content={'social-media-account'} onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
            <CustomTextItem content={'EmailAccountLoginBlock'} onPress={() => navigation.navigate("EmailAccountLoginBlock")} />
            <CustomTextItem content={'ForgotPassword'} onPress={() => navigation.navigate("ForgotPassword")} />
            <CustomTextItem content={'UserProfileBasicBlock'} onPress={() => navigation.navigate("UserProfileBasicBlock")} />
            <CustomTextItem content={'Adminconsole'} onPress={() => navigation.navigate("Adminconsole")} />
            <CustomTextItem content={'Adhocreporting'} onPress={() => navigation.navigate("Adhocreporting")} />
            <CustomTextItem content={'Deliveryestimator'} onPress={() => navigation.navigate("Deliveryestimator")} />
            <CustomTextItem content={'Paymentadmin'} onPress={() => navigation.navigate("Paymentadmin")} />
            <CustomTextItem content={'Discountsoffers'} onPress={() => navigation.navigate("Discountsoffers")} />
            <CustomTextItem content={'Catalogue'} onPress={() => navigation.navigate("Catalogue")} />
            <CustomTextItem content={'Categoriessubcategories'} onPress={() => navigation.navigate("Categoriessubcategories")} />
            <CustomTextItem content={'Payments'} onPress={() => navigation.navigate("Payments")} />
            <CustomTextItem content={'Contactus'} onPress={() => navigation.navigate("Contactus")} />
            <CustomTextItem content={'Couponcodegenerator'} onPress={() => navigation.navigate("Couponcodegenerator")} />
            <CustomTextItem content={'Photolibrary'} onPress={() => navigation.navigate("Photolibrary")} />
            <CustomTextItem content={'Emaillists'} onPress={() => navigation.navigate("Emaillists")} />
            <CustomTextItem content={'Emailnotifications'} onPress={() => navigation.navigate("Emailnotifications")} />
            <CustomTextItem content={'Dashboard'} onPress={() => navigation.navigate("Dashboard")} />
            <CustomTextItem content={'Profilebio'} onPress={() => navigation.navigate("Profilebio")} />
            <CustomTextItem content={'Filteritems'} onPress={() => navigation.navigate("Filteritems")} />
            <CustomTextItem content={'Pushnotifications'} onPress={() => navigation.navigate("Pushnotifications")} />
            <CustomTextItem content={'Gallery'} onPress={() => navigation.navigate("Gallery")} />
            <CustomTextItem content={'Geofence'} onPress={() => navigation.navigate("Geofence")} />
            <CustomTextItem content={'Scheduling'} onPress={() => navigation.navigate("Scheduling")} />
            <CustomTextItem content={'Search'} onPress={() => navigation.navigate("Search")} />
            <CustomTextItem content={'Interactivefaqs'} onPress={() => navigation.navigate("Interactivefaqs")} />
            <CustomTextItem content={'Settings'} onPress={() => navigation.navigate("Settings")} />
            <CustomTextItem content={'Share'} onPress={() => navigation.navigate("Share")} />
            <CustomTextItem content={'Shoppingcart'} onPress={() => navigation.navigate("Shoppingcart")} />
            <CustomTextItem content={'Sms'} onPress={() => navigation.navigate("Sms")} />
            <CustomTextItem content={'Sorting'} onPress={() => navigation.navigate("Sorting")} />
            <CustomTextItem content={'Livechat'} onPress={() => navigation.navigate("Livechat")} />
            <CustomTextItem content={'Location'} onPress={() => navigation.navigate("Location")} />
            <CustomTextItem content={'Splashscreen'} onPress={() => navigation.navigate("Splashscreen")} />
            <CustomTextItem content={'Stripeintegration'} onPress={() => navigation.navigate("Stripeintegration")} />
            <CustomTextItem content={'Targetedfeed'} onPress={() => navigation.navigate("Targetedfeed")} />
            <CustomTextItem content={'Notifications'} onPress={() => navigation.navigate("Notifications")} />
            <CustomTextItem content={'Notificationsettings'} onPress={() => navigation.navigate("Notificationsettings")} />
            <CustomTextItem content={'Orderdetailview'} onPress={() => navigation.navigate("Orderdetailview")} />
            <CustomTextItem content={'Ordermanagement'} onPress={() => navigation.navigate("Ordermanagement")} />
            <CustomTextItem content={'Ordersummary'} onPress={() => navigation.navigate("Ordersummary")} />
            <CustomTextItem content={'Fedexintegration'} onPress={() => navigation.navigate("Fedexintegration")} />
            <CustomTextItem content={'Posintegration'} onPress={() => navigation.navigate("Posintegration")} />
            <CustomTextItem content={'AdarshBlock'} onPress={() => navigation.navigate("AdarshBlock")} />


<CustomTextItem content={'splashscreen'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'studio-store-ecommerce-core'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'studio-store-ecommerce-theme'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'studio-store-ecommerce-translations'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'notifications'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'search'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'productdescription'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'filteritems'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'contactus'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'connectedaccounts'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'otp-input-confirmation'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'categoriessubcategories'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'catalogue'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'orderdetailview'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'shoppingcart'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'Sorting'}  onPress={() => navigation.navigate("Sorting")} />
<CustomTextItem content={'ordermanagement'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'wishlist'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'profilebio'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'ordersummary'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'auth'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'signup'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'login'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'forgot-password'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'helpcenter'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'interactivefaqs'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'payments'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'CustomisedOrderStatus200'}  onPress={() => navigation.navigate("CustomisedOrderStatus200")} />
<CustomTextItem content={'core'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'UploadMedia200'}  onPress={() => navigation.navigate("UploadMedia200")} />
<CustomTextItem content={'TargetedFeed200'}  onPress={() => navigation.navigate("TargetedFeed200")} />
<CustomTextItem content={'Share2'}  onPress={() => navigation.navigate("Share2")} />
<CustomTextItem content={'AdHocReporting2'}  onPress={() => navigation.navigate("AdHocReporting2")} />
<CustomTextItem content={'AccountCreation2'}  onPress={() => navigation.navigate("AccountCreation2")} />
<CustomTextItem content={'AddressManagement2'}  onPress={() => navigation.navigate("AddressManagement2")} />
<CustomTextItem content={'DiscountsOffers'}  onPress={() => navigation.navigate("DiscountsOffers")} />
<CustomTextItem content={'AdminConsole2'}  onPress={() => navigation.navigate("AdminConsole2")} />
<CustomTextItem content={'EmailNotifications2'}  onPress={() => navigation.navigate("EmailNotifications2")} />
<CustomTextItem content={'GoogleLogin1710'}  onPress={() => navigation.navigate("GoogleLogin1710")} />
<CustomTextItem content={'Reviews200'}  onPress={() => navigation.navigate("Reviews200")} />
<CustomTextItem content={'EmailLists2'}  onPress={() => navigation.navigate("EmailLists2")} />
<CustomTextItem content={'PhoneLogin200'}  onPress={() => navigation.navigate("PhoneLogin200")} />
<CustomTextItem content={'Dashboard200'}  onPress={() => navigation.navigate("Dashboard200")} />
<CustomTextItem content={'CouponCodeGenerator200'}  onPress={() => navigation.navigate("CouponCodeGenerator200")} />
<CustomTextItem content={'ApiIntegration5'}  onPress={() => navigation.navigate("ApiIntegration5")} />
<CustomTextItem content={'BulkUploading200'}  onPress={() => navigation.navigate("BulkUploading200")} />
<CustomTextItem content={'RolesPermissions2'}  onPress={() => navigation.navigate("RolesPermissions2")} />
<CustomTextItem content={'InvoiceBilling200'}  onPress={() => navigation.navigate("InvoiceBilling200")} />
<CustomTextItem content={'ShippingChargeCalculator200'}  onPress={() => navigation.navigate("ShippingChargeCalculator200")} />
<CustomTextItem content={'FacebookLogin200'}  onPress={() => navigation.navigate("FacebookLogin200")} />
<CustomTextItem content={'ApiIntegration200'}  onPress={() => navigation.navigate("ApiIntegration200")} />
<CustomTextItem content={'RolesPermissions'}  onPress={() => navigation.navigate("RolesPermissions")} />
<CustomTextItem content={'LiveChat200'}  onPress={() => navigation.navigate("LiveChat200")} />

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
// Customizable Area End

// Customizable Area Start
const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    height: Platform.OS === "web" ? '100vh' : 'auto',
    backgroundColor: "#F5FCFF"
  },
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "white"
  },
  instructions: {
    textAlign: "center",
    color: "#6200EE",
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 16,

    padding: 10
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 15,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  header: {
    backgroundColor: '#6200EE',
    padding: 15,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  item: {
    backgroundColor: '#00000000',
    padding: 18,
    color: '#6200EE',
    fontSize: 16,
    fontWeight: 'normal'
  }
});
// Customizable Area End
export default HomeScreen;