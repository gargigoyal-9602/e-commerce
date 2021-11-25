import React from "react";

import {
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  Platform
  // Customizable Area Start
  // Customizable Area End
} from "react-native";

import SignupController, { Props } from "./SignupController";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  facebook,
  google,
  apple
} from "./../../studio-store-ecommerce-theme/src/AppAssets/appassets";
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";
import { verticalScale } from "../../../framework/src/utils/Scale";
import FocusAwareStatusBar from "../../../components/src/FocusAwareStatusBar";
import CustomErrorModal from "../../../components/src/CustomErrorModal/CustomErrorModal";
import ApplicationLoader from "../../../components/src/AppLoader/AppLoader";
import appleAuth from "@invertase/react-native-apple-authentication";
import styles from "./SignupStyle";
const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");
// Customizable Area Start
// Customizable Area End

export default class Signup extends SignupController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    return (
      // Customizable Area Start
      <KeyboardAwareScrollView style={{ backgroundColor: "#f6f8fa" }}>
        <View style={styles.container}>
          <FocusAwareStatusBar
            barStyle="light-content"
            backgroundColor={themeJson.attributes.primary_color}
            isFocused={true}
          />
          <View style={styles.innerTopContainer}>
            <View
              style={[
                styles.fieldContainer,
                {
                  marginTop: this.state.fromCart
                    ? verticalScale(25)
                    : verticalScale(40),
                  borderColor: this.state.nameError
                    ? COLOR_CONST.pastelRed
                    : this.state.fullNameInput
                    ? COLOR_CONST.whiteThree
                    : COLOR_CONST.focusDarkColor
                }
              ]}
            >
              <View
                style={
                  this.state.fullName
                    ? styles.SectionStyle
                    : styles.SectionStyle1
                }
              >
                <Image
                  {...this.imgFullName}
                  style={[
                    styles.ImageStyleFullName,
                    {
                      tintColor: this.state.fullName
                        ? COLOR_CONST.charcoalGrey
                        : COLOR_CONST.focusDarkColor
                    }
                  ]}
                />
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: this.state.nameError
                        ? COLOR_CONST.pastelRed
                        : this.state.fullName
                        ? COLOR_CONST.charcoalGrey
                        : COLOR_CONST.focusDarkColor
                    }
                  ]}
                  onFocus={() => this.onFocus("fullName")}
                  placeholderTextColor={
                    this.state.nameError
                      ? COLOR_CONST.pastelRed
                      : COLOR_CONST.coolGreyTwo
                  }
                  value={this.state.fullNameInput}
                  autoCapitalize="none"
                  returnKeyType={"next"}
                  {...this.txtInputFullNamePrpos}
                />
              </View>
              <View
                style={[
                  this.state.email ? styles.SectionStyle : styles.SectionStyle1,
                  {
                    marginTop: verticalScale(13),
                    borderColor: this.state.emailError
                      ? COLOR_CONST.pastelRed
                      : this.state.email
                      ? COLOR_CONST.whiteThree
                      : COLOR_CONST.focusDarkColor
                  }
                ]}
              >
                <Image
                  {...this.imgEmailIcon}
                  style={[
                    styles.ImageStyleEmail,
                    {
                      tintColor: this.state.email
                        ? COLOR_CONST.charcoalGrey
                        : COLOR_CONST.focusDarkColor
                    }
                  ]}
                />
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: this.state.emailError
                        ? COLOR_CONST.pastelRed
                        : this.state.email
                        ? COLOR_CONST.charcoalGrey
                        : COLOR_CONST.focusDarkColor
                    }
                  ]}
                  onFocus={() => this.onFocus("email")}
                  value={this.state.emailInput}
                  placeholderTextColor={
                    this.state.emailError
                      ? COLOR_CONST.pastelRed
                      : COLOR_CONST.coolGreyTwo
                  }
                  {...this.txtInputEmailPrpos}
                  autoCapitalize={"none"}
                />
              </View>
              <View
                style={[
                  this.state.password
                    ? styles.SectionStyle
                    : styles.SectionStyle1,
                  {
                    marginTop: verticalScale(13),
                    borderColor: this.state.passwordError
                      ? COLOR_CONST.pastelRed
                      : this.state.password
                      ? COLOR_CONST.whiteThree
                      : COLOR_CONST.focusDarkColor
                  }
                ]}
              >
                <Image
                  {...this.imgPasswordIcon}
                  style={[
                    styles.ImageStylekey,
                    {
                      tintColor: this.state.password
                        ? COLOR_CONST.charcoalGrey
                        : COLOR_CONST.focusDarkColor
                    }
                  ]}
                />
                <TextInput
                  style={[
                    styles.input1,
                    {
                      color: this.state.passwordError
                        ? COLOR_CONST.pastelRed
                        : this.state.password
                        ? COLOR_CONST.charcoalGrey
                        : COLOR_CONST.focusDarkColor
                    }
                  ]}
                  onFocus={() => this.onFocus("password")}
                  placeholder="Password"
                  placeholderTextColor={
                    this.state.passwordError
                      ? COLOR_CONST.pastelRed
                      : COLOR_CONST.coolGreyTwo
                  }
                  underlineColorAndroid="transparent"
                  value={this.state.passwordInput}
                  autoCapitalize="none"
                  returnKeyType={"done"}
                  {...this.txtInputPasswordProps}
                />
                <TouchableOpacity
                  style={styles.eye}
                  {...this.btnPasswordShowHideProps}
                >
                  <Image
                    style={styles.imgPasswordShowhide}
                    {...this.imgEnablePasswordFieldProps}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[
                  styles.signupButton,
                  {
                    backgroundColor: themeJson.attributes.common_button_color,
                    opacity:
                      this.state.emailInput.trim().length === 0 ||
                      this.state.passwordInput.trim().length === 0 ||
                      this.state.fullNameInput.trim().length === 0
                        ? 0.5
                        : 1
                  }
                ]}
                onPress={() => this.onPressSignUp()}
                disabled={
                  this.state.emailInput.trim().length === 0 ||
                  this.state.passwordInput.trim().length === 0 ||
                  this.state.fullNameInput.trim().length === 0
                    ? true
                    : false
                }
              >
                <Text style={styles.signupText}>SIGN UP</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[
              styles.bottomContainer,
              {
                backgroundColor: this.state.fromCart ? "#ffffff" : "#f5f5f5",
                elevation: this.state.fromCart ? 2 : 0,
                paddingBottom: this.state.fromCart ? verticalScale(15) : 0
              }
            ]}
          >
            <Text
              style={[
                styles.continueText,
                { marginTop: this.state.fromCart ? 0 : 21 }
              ]}
            >
              or Continue via
            </Text>
            <View style={styles.socialButtonContainer}>
              {themeJson.attributes.isFacebookLogin && (
                <TouchableOpacity
                  onPress={() => this.onPressLoginWithFacebook()}
                  style={styles.socialButton}
                >
                  <Image source={facebook} style={styles.fStyle} />
                  <Text style={styles.fbText}>Facebook</Text>
                </TouchableOpacity>
              )}
              {themeJson.attributes.isGoogleLogin && (
                <TouchableOpacity
                  onPress={() => this.onPressGoogleSignIn()}
                  style={[
                    styles.socialButton,
                    { backgroundColor: COLOR_CONST.pastelRed }
                  ]}
                >
                  <Image source={google} style={styles.gStyle} />
                  <Text style={styles.fbText}>Google</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.appleSocialButtonContainer}>
              {appleAuth.isSupported &&
                Platform.OS === "ios" &&
                themeJson.attributes.isAppleLogin && (
                  <TouchableOpacity
                    onPress={() => this.onPressLoginWithApple()}
                    style={[
                      styles.appleSocialButton,
                      {
                        backgroundColor: COLOR_CONST.black
                      }
                    ]}
                  >
                    <Image source={apple} style={styles.aStyle} />
                    <Text style={styles.fbText}>Sign in with Apple</Text>
                  </TouchableOpacity>
                )}
            </View>
            <Text style={styles.bySigningUp}>
              By Signing Up you agree with our
            </Text>
            <Text style={styles.termsAndConditionText}>
              <Text onPress={() => this.state?.termsPolicy?.attributes && this.props.navigation.navigate("HelpCenterData", {
                            Title: this.state.termsPolicy.attributes ? this.state.termsPolicy.attributes.help_center_type : "", heading:
                                this.state.termsPolicy.attributes && this.state.termsPolicy.attributes.title, description: this.state.termsPolicy.attributes && this.state.termsPolicy.attributes.description
                        })}>Terms & Conditions</Text> 
              {" & "}
              <Text onPress={() => this.state.privacyPolicy.attributes && this.props.navigation.navigate("HelpCenterData",
                            {
                                Title: this.state.privacyPolicy.attributes ? this.state.privacyPolicy.attributes.help_center_type : "", heading:
                                    this.state.privacyPolicy.attributes && this.state.privacyPolicy.attributes.title, description: this.state.privacyPolicy.attributes && this.state.privacyPolicy.attributes.description
                            })}>Privacy Policy</Text>
            </Text>
            {
              <TouchableOpacity onPress={() => this.onGuestLogin()}>
                <Text style={styles.skipText}>Skip & Continue as Guest</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
        {/* {this.renderAlertModal()} */}
        <ApplicationLoader isFetching={this.state.isFetching} />
        <CustomErrorModal
          showModal={this.state.showAlertModal}
          message={this.state.message}
          isShowError={this.state.isShowError}
          hideErrorModal={() => this.setState({ showAlertModal: false })}
        />
      </KeyboardAwareScrollView>
      // Customizable Area End
    );
  }
}
