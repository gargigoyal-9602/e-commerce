import React from "react";

import {
  Text,
  Image,
  TouchableOpacity,
  View,
  Modal,
  SafeAreaView
  // Customizable Area Start
  // Customizable Area End
} from "react-native";

import ConnectedAccountsController, {
  Props
  // configJSON
} from "./ConnectedAccountsController";
import TopHeader from "../../../components/src/TopHeader";
import FocusAwareStatusBar from "../../../components/src/FocusAwareStatusBar";
import R from "../../../components/src/R";
import {
  CROSS_ICON2,
  BACK_ICON,
  googlePlus,
  facebookIcon
} from "../../studio-store-ecommerce-theme/src/AppAssets/appassets";
import ApplicationLoader from "../../../components/src/AppLoader/AppLoader";
import CustomErrorModal from "../../../components/src/CustomErrorModal/CustomErrorModal";
import styles from "./ConnectedAccountsStyle";
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";

// Customizable Area Start
// Customizable Area End

export default class ConnectedAccounts extends ConnectedAccountsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  renderFacebookConnectedAccountView = (accountItem: any) => {
    return (
      // Customizable Area Start
      <View style={styles.connectedListCell}>
        <View style={styles.leftRow}>
          <Image style={styles.icon} source={facebookIcon} />
          <View style={styles.connectedStatus}>
            <Text style={styles.connected}>Connected as</Text>
            <Text>
              {accountItem.display_name
                ? accountItem.display_name
                : this.state.userDetails.full_name}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            this.setState({
              selectedAccountData: accountItem,
              showDisconnectModal: true,
              isFromFacebook: true
            })
          }
        >
          <Image style={styles.cross} source={CROSS_ICON2} />
        </TouchableOpacity>
      </View>
      // Customizable Area End
    );
  };

  renderGoogleConnectedAccountView = (accountItem: any) => {
    return (
      // Customizable Area Start
      <View style={styles.connectedListCell}>
        <View style={styles.leftRow}>
          <Image style={styles.icon} source={googlePlus} />
          <View style={styles.connectedStatus}>
            <Text style={styles.connected}>Connected as</Text>
            <Text>
              {accountItem.display_name
                ? accountItem.display_name
                : this.state.userDetails.full_name}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            this.setState({
              selectedAccountData: accountItem,
              showDisconnectModal: true,
              isFromFacebook: false
            })
          }
        >
          <Image style={styles.cross} source={CROSS_ICON2} />
        </TouchableOpacity>
      </View>
      // Customizable Area End
    );
  };

  renderFacebookConnectAccountView = () => {
    return (
      // Customizable Area Start
      <TouchableOpacity
        onPress={() => this.onPressLoginWithFacebook()}
        style={styles.connectedListBottomCell}
      >
        <Image style={styles.icon} source={R.connectedAccountsImage.faceBook} />
        <View style={styles.connectedStatus}>
          <Text>Connect Facebook Account</Text>
        </View>
      </TouchableOpacity>
      // Customizable Area End
    );
  };

  renderGoogleConnectAccountView = () => {
    return (
      // Customizable Area Start
      <TouchableOpacity
        onPress={() => this.onPressGoogleSignIn()}
        style={styles.connectedListBottomCell}
      >
        <Image
          style={styles.icon}
          source={R.connectedAccountsImage.googlePlus}
        />
        <View style={styles.connectedStatus}>
          <Text>Connect Google Account</Text>
        </View>
      </TouchableOpacity>
      // Customizable Area End
    );
  };

  renderSocialViews = (accountItem: any) => {
    switch (accountItem.attributes.provider) {
      case "facebook":
        return this.renderFacebookConnectedAccountView(accountItem);
      case "google":
        return this.renderGoogleConnectedAccountView(accountItem);
      // Customizable Area Start
      // Customizable Area End
      default:
        break;
    }
  };

  renderSocialConnectView = (itemCode: any) => {
    let faceBookIndex = this.state.socialAccountList.findIndex(
      (item: any) => item.attributes.provider === "facebook"
    );
    let googleIndex = this.state.socialAccountList.findIndex(
      (item: any) => item.attributes.provider === "google"
    );
    switch (itemCode) {
      case 0:
        if (faceBookIndex === -1) {
          return this.renderFacebookConnectAccountView();
        }
        break;
      case 1:
        if (googleIndex === -1) {
          return this.renderGoogleConnectAccountView();
        }
        break;
      // Customizable Area Start
      // Customizable Area End
      default:
        break;
    }
  };

  renderConnectedAccounts = () => {
    return (
      // Customizable Area Start
      <View style={styles.connectedAccountContainer}>
        {this.state.socialAccountList.map((socialItem: any, index: any) => {
          console.log("Processing: " + index);
          return <View>{this.renderSocialViews(socialItem)}</View>;
        })}
        {!this.state.isFetching && this.renderSocialConnectView(0)}
        {!this.state.isFetching && this.renderSocialConnectView(1)}
      </View>
      // Customizable Area End
    );
  };

  renderDisconnectModal = () => {
    return (
      // Customizable Area Start
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showDisconnectModal}
        onRequestClose={() => {
          this.setState({ showDisconnectModal: false });
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => this.setState({ showDisconnectModal: false })}
          style={styles.modalContainer}
        >
          <View style={styles.popup}>
            <Text style={styles.deleteAddress}>
              Disconnect {this.state.isFromFacebook ? "Facebook" : "Google"}
            </Text>
            <Text style={styles.areYouSure}>
              Are you sure you want to disconnect your{" "}
              {this.state.isFromFacebook ? "facebook" : "google"} account from
              EcommApp?
            </Text>
            <View style={styles.horizontalLine} />
            <View style={styles.bottomPopupView}>
              <TouchableOpacity
                onPress={() => this.setState({ showDisconnectModal: false })}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.setState({ showDisconnectModal: false }, () =>
                    this.removeSocialMediaAccountDetails()
                  )
                }
              >
                <Text style={styles.yesDelete}>Disconnect</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      // Customizable Area End
    );
  };

  render() {
    return (
      // Customizable Area Start
      <SafeAreaView style={styles.container}>
        <TopHeader
          headerTitle={"Connected Accounts"}
          onPressLeft={() => this.props.navigation.goBack()}
          headerLeftIconName={BACK_ICON}
          navigation={this.props.navigation}
          headerTitleStyle={{}}
          headerStyle={{}}
        />
        <FocusAwareStatusBar
          barStyle="dark-content"
          backgroundColor={COLOR_CONST.white}
          isFocused={true}
        />
        {this.renderConnectedAccounts()}
        {this.renderDisconnectModal()}
        <ApplicationLoader isFetching={this.state.isFetching} />
        <CustomErrorModal
          showModal={this.state.showAlertModal}
          message={this.state.message}
          isShowError={this.state.isShowError}
          hideErrorModal={() => this.setState({ showAlertModal: false })}
        />
      </SafeAreaView>
      // Customizable Area End
    );
  }
}
