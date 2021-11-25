import React from "react";

import {
  Text,
  View,
  TextInput,
  SafeAreaView
  // Customizable Area Start
  // Customizable Area End
} from "react-native";

import ContactusController, { Props } from "./ContactusController";
import TopHeader from "../../../components/src/TopHeader";
import styles from "./ContactusStyle";
import Scale, { verticalScale } from "../../../framework/src/utils/Scale";
import R from "../../../components/src/R";
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import GreenButton from "../../../components/src/GreenButton";
import ApplicationLoader from "../../../components/src/AppLoader/AppLoader";
import CustomErrorModal from "../../../components/src/CustomErrorModal/CustomErrorModal";
import FocusAwareStatusBar from "../../../components/src/FocusAwareStatusBar";

const themeJson = require("./../../studio-store-ecommerce-theme/src/theme.json");

// Customizable Area Start
// Customizable Area End

export default class Contactus extends ContactusController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  renderPasswordForm = () => {
    // Customizable Area Start
    return (
      <View style={styles.innerContainer}>
        <KeyboardAwareScrollView enableOnAndroid>
          <View style={styles.formContainer}>
            <Text
              style={[
                styles.inputText,
                {
                  color: this.state.textInputErrorData.nameError
                    ? COLOR_CONST.pastelRed
                    : COLOR_CONST.charcoalGrey
                }
              ]}
            >
              Name
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  borderBottomColor: this.state.textInputFocusData.nameFocus
                    ? themeJson.attributes.primary_color
                    : COLOR_CONST.lightGreyText
                }
              ]}
              value={this.state.textInputData.name}
              {...this.textInputNameProps}
              onFocus={() =>
                this.setState(prevState => ({
                  textInputFocusData: {
                    ...prevState.textInputFocusData,
                    nameFocus: true
                  }
                }))
              }
              onBlur={() =>
                this.setState(prevState => ({
                  textInputFocusData: {
                    ...prevState.textInputFocusData,
                    nameFocus: false
                  }
                }))
              }
              autoCapitalize={"none"}
            />
            <Text
              style={[
                styles.inputText,
                {
                  color: this.state.textInputErrorData.emailError
                    ? COLOR_CONST.pastelRed
                    : COLOR_CONST.charcoalGrey
                }
              ]}
            >
              Email
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  borderBottomColor: this.state.textInputFocusData.emailFocus
                    ? themeJson.attributes.primary_color
                    : COLOR_CONST.lightGreyText
                }
              ]}
              value={this.state.textInputData.email}
              {...this.textInputEmailProps}
              onFocus={() =>
                this.setState(prevState => ({
                  textInputFocusData: {
                    ...prevState.textInputFocusData,
                    emailFocus: true
                  }
                }))
              }
              onBlur={() =>
                this.setState(prevState => ({
                  textInputFocusData: {
                    ...prevState.textInputFocusData,
                    emailFocus: false
                  }
                }))
              }
              autoCapitalize={"none"}
            />
            <Text
              style={[
                styles.inputText,
                {
                  color: this.state.textInputErrorData.phoneNoError
                    ? COLOR_CONST.pastelRed
                    : COLOR_CONST.charcoalGrey
                }
              ]}
            >
              Phone Number
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  borderBottomColor: this.state.textInputFocusData.phoneNoFocus
                    ? themeJson.attributes.primary_color
                    : COLOR_CONST.lightGreyText
                }
              ]}
              value={this.state.textInputData.phoneNo}
              {...this.textInputPhoneNoProps}
              onFocus={() =>
                this.setState(prevState => ({
                  textInputFocusData: {
                    ...prevState.textInputFocusData,
                    phoneNoFocus: true
                  }
                }))
              }
              onBlur={() =>
                this.setState(prevState => ({
                  textInputFocusData: {
                    ...prevState.textInputFocusData,
                    phoneNoFocus: false
                  }
                }))
              }
              autoCapitalize={"none"}
              keyboardType={"number-pad"}
            />
            <TextInput
              style={styles.ratingInput}
              multiline={true}
              textAlignVertical={"top"}
              secureTextEntry={false}
              value={this.state.descriptionText}
              placeholder="Write detailed description"
              placeholderTextColor={COLOR_CONST.charcoalGrey}
              underlineColorAndroid="transparent"
              returnKeyType={"done"}
              autoCapitalize={"none"}
              onChangeText={text =>
                this.setState({
                  descriptionText: text,
                  isInvalidDescription: false
                })
              }
            />
            {this.state.isInvalidDescription && (
              <Text style={styles.emptyText}>Description cannot be empty.</Text>
            )}
          </View>
        </KeyboardAwareScrollView>
        <GreenButton
          title="SUBMIT"
          disabled={
            this.state.textInputData.name.trim() === "" ||
            this.state.textInputData.email.trim() === "" ||
            this.state.textInputData.phoneNo.trim() === "" ||
            this.state.descriptionText.trim() === ""
          }
          customStyle={[
            styles.loginButton,
            {
              opacity:
                this.state.textInputData.name.trim() === "" ||
                this.state.textInputData.email.trim() === "" ||
                this.state.textInputData.phoneNo.trim() === "" ||
                this.state.descriptionText.trim() === ""
                  ? 0.5
                  : 1
            }
          ]}
          customTxtStyle={styles.loginText}
          onPress={() => this.validateInput()}
        />
      </View>
    );
    // Customizable Area End
  };

  render() {
    return (
      // Customizable Area Start
      <SafeAreaView style={styles.container}>
        <TopHeader
          headerTitle={"Contact Us"}
          headerLeftIconName={R.contactUsImage.backIcon}
          headerLeftIconStyle={{
            resizeMode: "contain",
            width: Scale(12),
            height: verticalScale(20)
          }}
          onPressLeft={() => this.props.navigation.goBack()}
          headerRightIcons={[
            {
              src: R.contactUsImage.cart,
              onPress: () => {
                this.props.navigation.navigate("Shoppingcart");
              },
              cartHasProductFlag: this.state.cartHasProduct,
              style: { resizeMode: "contain", marginLeft: Scale(30) }
            }
          ]}
          navigation={this.props.navigation}
          headerTitleStyle={{}}
          headerStyle={{ elevation: 0 }}
        />
        <FocusAwareStatusBar
          barStyle="dark-content"
          backgroundColor={COLOR_CONST.white}
          isFocused={true}
        />
        {!this.state.showPasswordChangedSuccessfully &&
          this.renderPasswordForm()}
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

  // Customizable Area Start
  // Customizable Area End
}
