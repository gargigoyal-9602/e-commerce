import React from "react";

import {
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Image,
  TouchableOpacity
  //Customizable Area Start
  //Customizable Area End
} from "react-native";

import ForgotPasswordController, { Props } from "./ForgotPasswordController";
//@ts-ignore
import CountDown from "react-native-countdown-component";
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";
import CustomErrorModal from "../../../components/src/CustomErrorModal/CustomErrorModal";
import ApplicationLoader from "../../../components/src/AppLoader/AppLoader";
import FocusAwareStatusBar from "../../../components/src/FocusAwareStatusBar";
import styles from "./ForgotPasswordStyle";
import { verticalScale } from "../../../framework/src/utils/Scale";
const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");

//Customizable Area Start
//Customizable Area End

export default class ForgotPassword extends ForgotPasswordController {
  //Customizable Area Start
  //Customizable Area End

  constructor(props: Props) {
    super(props);
    //Customizable Area Start
    //Customizable Area End
  }

  renderTopHeader = () => {
    return (
      //Customizable Area Start
      <View style={{ backgroundColor: themeJson.attributes.primary_color }}>
        <Text style={styles.brandName}>{themeJson.attributes.heading}</Text>
        <Text style={styles.getStartedText}>
          {themeJson.attributes.sub_heading}
        </Text>
      </View>
      //Customizable Area End
    );
  };

  renderForgotHeader = () => {
    return (
      //Customizable Area Start
      <View style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotTextHeader}>Forgot Password</Text>
      </View>
      //Customizable Area End
    );
  };

  renderCounter() {
    if (this.state.showTimer) {
      return (
        //Customizable Area Start
        <View style={styles.counterContainer}>
          <CountDown
            until={30}
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
        //Customizable Area End
      );
    } else {
      return (
        //Customizable Area Start
        <View style={styles.counterContainer} />
        //Customizable Area End
      );
    }
  }

  render() {
    return (
      //Customizable Area Start
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={
            this.isPlatformWeb() ? styles.containerWeb : styles.containerMobile
          }
        >
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
                  An OTP has been sent to your registered Email.
                </Text>
              )}
              {!this.state.sendLink && (
                <Text style={styles.enterYourText}>
                  Enter your registered Email and we’ll sent you OTP to reset
                  your password
                </Text>
              )}
              <View style={styles.fieldContainer}>
                <View
                  style={[
                    this.state.emailError
                      ? styles.SectionStyle
                      : styles.SectionStyle1,
                    {
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
                        tintColor: this.state.emailInput
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
                          : COLOR_CONST.focusDarkColor
                      }
                    ]}
                    secureTextEntry={false}
                    placeholder="Email"
                    onFocus={() => this.onFocus("email")}
                    placeholderTextColor={
                      this.state.emailError
                        ? COLOR_CONST.pastelRed
                        : COLOR_CONST.coolGreyTwo
                    }
                    underlineColorAndroid="transparent"
                    value={this.state.emailInput}
                    autoCapitalize={"none"}
                    editable={!this.state.isOTPSent}
                    {...this.txtEmailInputProps}
                  />
                </View>
                {this.state.isOTPSent && (
                  <View
                    style={
                      this.state.OTPError
                        ? [
                            styles.SectionStyle,
                            { marginTop: verticalScale(13) }
                          ]
                        : [
                            styles.SectionStyle1,
                            { marginTop: verticalScale(13) }
                          ]
                    }
                  >
                    <Image
                      {...this.imgOTPIcon}
                      style={[
                        styles.ImageStylekey,
                        {
                          tintColor: this.state.otp
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
                            : COLOR_CONST.focusDarkColor
                        }
                      ]}
                      secureTextEntry={false}
                      keyboardType={"number-pad"}
                      placeholder="Enter OTP"
                      onFocus={() => this.onFocus("otp")}
                      placeholderTextColor={
                        this.state.OTPError
                          ? COLOR_CONST.pastelRed
                          : COLOR_CONST.coolGreyTwo
                      }
                      underlineColorAndroid="transparent"
                      value={this.state.otpInput}
                      autoCapitalize={"none"}
                      {...this.txtOtpInputProps}
                    />
                  </View>
                )}
                {!this.state.isOTPSent ? (
                  <TouchableOpacity
                    style={[
                      styles.submitButton,
                      {
                        backgroundColor:
                          themeJson.attributes.common_button_color,
                        opacity: this.state.emailInput.trim() === "" ? 0.5 : 1
                      }
                    ]}
                    onPress={() => this.onPressSubmitButton()}
                    disabled={this.state.emailInput.trim() === ""}
                  >
                    <Text style={styles.submitText}>SUBMIT</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[
                      styles.submitButton,
                      {
                        backgroundColor:
                          themeJson.attributes.common_button_color,
                        opacity: this.state.emailInput.trim() === "" ? 0.5 : 1
                      }
                    ]}
                    onPress={() => this.onPressVerifyOTP()}
                    disabled={this.state.emailInput.trim() === ""}
                  >
                    <Text style={styles.submitText}>OTP VERIFY</Text>
                  </TouchableOpacity>
                )}
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
            <View style={styles.bottomContainer}>
              <TouchableOpacity onPress={() => this.onGuestLogin()}>
                <Text style={styles.skipText}>Skip & Continue as Guest</Text>
              </TouchableOpacity>
            </View>
          </View>
          <CustomErrorModal
            showModal={this.state.showAlertModal}
            message={this.state.message}
            isShowError={this.state.isShowError}
            hideErrorModal={() => this.setState({ showAlertModal: false })}
          />
        </ScrollView>
        <ApplicationLoader isFetching={this.state.isFetching} />
      </KeyboardAvoidingView>
      //Customizable Area End
    );
  }
}
