import React from "react";

import {
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  SafeAreaView
  // Customizable Area Start
  // Customizable Area End
} from "react-native";

import OTPInputAuthController from "./OTPInputAuthController";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./OTPInputStyle";
import { verticalScale } from "../../../framework/src/utils/Scale";
//@ts-ignore
import CountDown from "react-native-countdown-component";
import R from "../../../components/src/R";
import GreenButton from "../../../components/src/GreenButton";
import FocusAwareStatusBar from "../../../components/src/FocusAwareStatusBar";
import ApplicationLoader from "../../../components/src/AppLoader/AppLoader";
import CustomErrorModal from "../../../components/src/CustomErrorModal/CustomErrorModal";
const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";

// Customizable Area Start
// Customizable Area End

export default class OTPInputAuth extends OTPInputAuthController {
  renderTopHeader = () => {
    return (
      // Customizable Area Start
      <View style={styles.innerContainer}>
        <Text style={styles.brandName}>{themeJson.attributes.heading}</Text>
        <Text style={styles.getStartedText}>
          {themeJson.attributes.sub_heading}
        </Text>
      </View>
      // Customizable Area End
    );
  };

  renderForgotHeader = () => {
    return (
      // Customizable Area Start
      <View style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotTextHeader}>Verify Account</Text>
      </View>
      // Customizable Area End
    );
  };

  renderCounter() {
    if (this.state.showTimer) {
      return (
        // Customizable Area Start
        <View style={styles.counterContainer}>
          <CountDown
            until={45}
            onFinish={() => this.setState({ showResendLink: true })}
            digitStyle={styles.digitContainer}
            digitTxtStyle={styles.digitStyle}
            separatorStyle={styles.digitStyle}
            timeToShow={["M", "S"]}
            timeLabels={{ m: null, s: null }}
            showSeparator
            running={this.state.startTimer}
          />
        </View>
        // Customizable Area Start
      );
    } else {
      return (
        // Customizable Area Start
        <View style={styles.counterContainer} />
        // Customizable Area Start
      );
    }
  }
  render() {
    return (
      // Customizable Area Start
      <KeyboardAwareScrollView
        style={{ backgroundColor: COLOR_CONST.lightGreyText }}
      >
        <SafeAreaView style={styles.container}>
          <FocusAwareStatusBar
            barStyle="light-content"
            backgroundColor={themeJson.attributes.primary_color}
            isFocused={true}
          />
          <View style={styles.topContainer}>
            {this.renderForgotHeader()}
            {this.renderTopHeader()}
            <View style={styles.innerTopContainer}>
              {this.state.sendLink && (
                <Text style={styles.resetText}>
                  We have sent an OTP to your email address, to confirm your
                  email address.
                </Text>
              )}
              {!this.state.sendLink && (
                <Text style={styles.enterYourText}>
                  Enter your registered Email and we’ll sent you a link to reset
                  your password.
                </Text>
              )}
              <View style={styles.fieldContainer}>
                <View
                  style={
                    this.state.emailError
                      ? styles.errorSectionStyle
                      : this.state.email
                      ? styles.SectionStyle
                      : styles.SectionStyle1
                  }
                >
                  <Image
                    source={R.otpInputAuthImage.email}
                    style={[
                      styles.ImageStyleEmail,
                      {
                        tintColor: this.state.emailInput
                          ? COLOR_CONST.charcoalGrey
                          : COLOR_CONST.focusDarkColor
                      }
                    ]}
                  />
                  <TextInput
                    style={styles.input}
                    editable={!this.state.isOTPSent}
                    onFocus={() => this.onFocus("email")}
                    secureTextEntry={false}
                    placeholder="Email"
                    placeholderTextColor={
                      this.state.emailError
                        ? COLOR_CONST.pastelRed
                        : COLOR_CONST.coolGreyTwo
                    }
                    underlineColorAndroid="transparent"
                    value={this.state.emailInput}
                    onChangeText={value =>
                      this.setState({ emailInput: value }, () => {
                        this.resetErrors();
                      })
                    }
                  />
                </View>
                {this.state.isOTPSent && (
                  <View
                    style={[
                      this.state.OTPError
                        ? styles.errorSectionStyle
                        : this.state.OTPfocus
                        ? styles.SectionStyle
                        : styles.SectionStyle1,
                      { marginTop: verticalScale(13) }
                    ]}
                  >
                    <Image
                      source={R.otpInputAuthImage.key}
                      style={[
                        styles.ImageStylekey,
                        {
                          tintColor: this.state.OTP
                            ? COLOR_CONST.charcoalGrey
                            : COLOR_CONST.focusDarkColor
                        }
                      ]}
                    />
                    <TextInput
                      style={[
                        styles.input,
                        {
                          color: this.state.OTPError
                            ? COLOR_CONST.pastelRed
                            : this.state.fullName
                            ? COLOR_CONST.charcoalGrey
                            : COLOR_CONST.focusDarkColor
                        }
                      ]}
                      onFocus={() => this.onFocus("OTP")}
                      keyboardType={"number-pad"}
                      secureTextEntry={false}
                      placeholder="Enter OTP"
                      placeholderTextColor={
                        this.state.OTPError
                          ? COLOR_CONST.pastelRed
                          : COLOR_CONST.coolGreyTwo
                      }
                      underlineColorAndroid="transparent"
                      value={this.state.OTP}
                      onChangeText={value =>
                        this.setState({ OTP: value }, () => {
                          this.resetErrors();
                        })
                      }
                    />
                  </View>
                )}
                <GreenButton
                  title={this.state.isOTPSent ? "OTP VERIFY" : "SUBMIT"}
                  disabled={this.state.emailInput.trim() === ""}
                  customStyle={[
                    styles.loginButton,
                    {
                      opacity: this.state.emailInput.trim() === "" ? 0.5 : 1,
                      marginBottom:
                        this.state.isOTPSent || this.state.showResendLink
                          ? verticalScale(20.2)
                          : verticalScale(57.2)
                    }
                  ]}
                  customTxtStyle={styles.loginText}
                  onPress={() => {
                    if (!this.state.isOTPSent) {
                      this.onPressSendLink();
                    } else {
                      this.onPressVerifyOTP();
                    }
                  }}
                />
                {this.state.isOTPSent &&
                  !this.state.showResendLink &&
                  this.renderCounter()}
                {this.state.showResendLink && (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState(
                        { isOTPSent: false, showResendLink: false },
                        () => {
                          this.onPressSendLink();
                        }
                      );
                    }}
                  >
                    <Text style={styles.resendText}>Resend OTP</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </SafeAreaView>
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
