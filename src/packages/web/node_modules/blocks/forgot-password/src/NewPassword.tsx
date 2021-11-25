import React from "react";

import {
  View,
  Platform,
  ScrollView,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";
import NewPasswordController, { Props } from "./NewPasswordController";
import ApplicationLoader from "../../../components/src/AppLoader/AppLoader";
import { verticalScale } from "../../../framework/src/utils/Scale";
import CustomErrorModal from "../../../components/src/CustomErrorModal/CustomErrorModal";
import styles from "./NewPasswordStyle";
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";
const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");

 // Customizable Area Start
// Customizable Area End

export default class NewPassword extends NewPasswordController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  renderTopHeader = () => {
    return (
      // Customizable Area Start
      <View style={{ backgroundColor: themeJson.attributes.primary_color }}>
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
        <Text style={styles.forgotTextHeader}>Create New Password</Text>
      </View>
      // Customizable Area End
    );
  };

  render() {
    return (
      // Customizable Area Start
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={
            Platform.OS === "web" ? styles.containerWeb : styles.containerMobile
          }
        >
          <View style={styles.topContainer}>
            {this.renderForgotHeader()}
            {this.renderTopHeader()}
            <View style={styles.innerTopContainer}>
              <View style={styles.fieldContainer}>
                <View
                  style={[
                    this.state.passwordError
                      ? styles.errorSectionStyle
                      : this.state.password
                      ? styles.SectionStyle
                      : styles.SectionStyle1,
                    { marginTop: verticalScale(13) }
                  ]}
                >
                  <Image
                    {...this.imgOTPIcon}
                    style={[
                      styles.ImageStylekey,
                      {
                        tintColor: this.state.password
                          ? COLOR_CONST.charcoalGrey
                          : themeJson.attributes.primary_color
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
                          : themeJson.attributes.primary_color
                      }
                    ]}
                    placeholder="Enter New Password"
                    placeholderTextColor={
                      this.state.passwordError
                        ? COLOR_CONST.pastelRed
                        : COLOR_CONST.charcoalGrey
                    }
                    underlineColorAndroid="transparent"
                    onFocus={() => this.onFocus("password")}
                    value={this.state.newPasswordInput}
                    autoCapitalize="none"
                    returnKeyType={"done"}
                    {...this.txtInputNewPasswordProps}
                  />
                  <TouchableOpacity
                    style={styles.eye}
                    {...this.btnNewPasswordShowHideProps}
                  >
                    <Image
                      style={styles.imgPasswordShowhide}
                      {...this.imgEnableNewPasswordFieldProps}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    this.state.confirmPasswordError
                      ? styles.errorSectionStyle
                      : this.state.confirmPassword
                      ? styles.SectionStyle
                      : styles.SectionStyle1,
                    { marginTop: verticalScale(13) }
                  ]}
                >
                  <Image
                    {...this.imgOTPIcon}
                    style={[
                      styles.ImageStylekey,
                      {
                        tintColor: this.state.confirmPassword
                          ? COLOR_CONST.charcoalGrey
                          : themeJson.attributes.primary_color
                      }
                    ]}
                  />
                  <TextInput
                    ref={input => {
                      this.secondTextInput = input;
                    }}
                    style={[
                      styles.input1,
                      {
                        color: this.state.confirmPasswordError
                          ? COLOR_CONST.pastelRed
                          : this.state.confirmPassword
                          ? COLOR_CONST.charcoalGrey
                          : themeJson.attributes.primary_color
                      }
                    ]}
                    placeholder="Confirm New Password"
                    onFocus={() => this.onFocus("confirmPassword")}
                    placeholderTextColor={
                      this.state.confirmPasswordError
                        ? COLOR_CONST.pastelRed
                        : COLOR_CONST.charcoalGrey
                    }
                    underlineColorAndroid="transparent"
                    value={this.state.confirmPasswordInput}
                    autoCapitalize="none"
                    returnKeyType={"done"}
                    {...this.txtInputConfirmPasswordProps}
                  />
                  <TouchableOpacity
                    style={styles.eye}
                    {...this.btnConfirmPasswordShowHideProps}
                  >
                    <Image
                      style={styles.imgPasswordShowhide}
                      {...this.imgEnableConfirmPasswordFieldProps}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    {
                      backgroundColor: themeJson.attributes.common_button_color,
                      opacity:
                        this.state.confirmPasswordInput.trim() === "" ||
                        this.state.newPasswordInput.trim() === ""
                          ? 0.5
                          : 1
                    }
                  ]}
                  onPress={() => this.resetPassword()}
                  disabled={
                    this.state.confirmPasswordInput.trim() === "" ||
                    this.state.newPasswordInput.trim() === ""
                  }
                >
                  <Text style={styles.submitText}>RESET PASSWORD</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <ApplicationLoader isFetching={this.state.isFetching} />
          <CustomErrorModal
            showModal={this.state.showAlertModal}
            message={this.state.message}
            isShowError={this.state.isShowError}
            hideErrorModal={() => this.setState({ showAlertModal: false })}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      // Customizable Area End
    );
  }
}
