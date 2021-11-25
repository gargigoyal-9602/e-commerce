import React from "react";

import {
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
  SafeAreaView
  // Customizable Area Start
  // Customizable Area End
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from "react-native-animatable";
import {
  facebook,
  google,
  apple
} from "./../../studio-store-ecommerce-theme/src/AppAssets/appassets";
import * as IMG_CONST from "../../studio-store-ecommerce-theme/src/ImageConstants";
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";
import FocusAwareStatusBar from "../../../components/src/FocusAwareStatusBar";
import { verticalScale } from "../../../framework/src/utils/Scale";
import CustomErrorModal from "../../../components/src/CustomErrorModal/CustomErrorModal";
import ApplicationLoader from "../../../components/src/AppLoader/AppLoader";
import appleAuth from "@invertase/react-native-apple-authentication";
import styles from "./LoginStyle";
const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");

import LoginController, { Props } from "./LoginController";

// Customizable Area Start
// Customizable Area End

export default class Login extends LoginController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    return (
      // Customizable Area Start
      <KeyboardAwareScrollView style={{ backgroundColor: "#fff" }}>
        <SafeAreaView style={styles.container}>
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
                    : verticalScale(40)
                }
              ]}
            >
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
                  placeholder="Email"
                  placeholderTextColor={
                    this.state.emailError
                      ? COLOR_CONST.pastelRed
                      : COLOR_CONST.coolGreyTwo
                  }
                  underlineColorAndroid="transparent"
                  value={this.state.emailInput}
                  autoCapitalize="none"
                  blurOnSubmit={false}
                  returnKeyType={"next"}
                  onSubmitEditing={() => {
                    this.secondTextInput.focus();
                  }}
                  {...this.txtInputEmailPrpos}
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
                  ref={input => {
                    this.secondTextInput = input;
                  }}
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
              {this.state.showLoginSuccess ? (
                <Animatable.Image
                  animation="bounceIn"
                  delay={200}
                  source={IMG_CONST.LOGIN_SUCCESS}
                  style={styles.loginSuccess}
                  resizeMode="stretch"
                />
              ) : (
                <TouchableOpacity
                  style={[
                    styles.loginButton,
                    {
                      backgroundColor: themeJson.attributes.common_button_color,
                      opacity:
                        this.state.emailInput.trim() === "" ||
                        this.state.passwordInput.trim() === ""
                          ? 0.5
                          : 1
                    }
                  ]}
                  onPress={() => this.onPressLogin()}
                  disabled={
                    this.state.emailInput.trim() === "" ||
                    this.state.passwordInput.trim() === ""
                  }
                >
                  <Text style={styles.loginText}>LOG IN</Text>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.replace("ForgotPassword")}
            >
              <Text style={styles.forgotText}>Forgot Password ?</Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.bottomContainer,
              {
                backgroundColor: this.state.fromCart ? "#ffffff" : "#f5f5f5",
                elevation: this.state.fromCart ? 1 : 0,
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
            <TouchableOpacity onPress={() => this.onGuestLogin()}>
              <Text style={styles.skipText}>Skip & Continue as Guest</Text>
            </TouchableOpacity>
          </View>
          {/* {this.renderAlertModal()} */}
          <ApplicationLoader isFetching={this.state.isFetching} />
          <CustomErrorModal
            showModal={this.state.showAlertModal}
            message={this.state.message}
            isShowError={this.state.isShowError}
            hideErrorModal={() => this.setState({ showAlertModal: false })}
          />
        </SafeAreaView>
      </KeyboardAwareScrollView>
      // Customizable Area End
    );
  }
}
