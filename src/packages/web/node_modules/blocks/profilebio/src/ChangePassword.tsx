import React from "react";
// Customizable Area Start
import { Image, SafeAreaView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GreenButton from "../../../components/src/GreenButton";
import { SimpleTextInput } from '../../../components/src/SimpleTextInput';
import TopHeader from "../../../components/src/TopHeader";
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";
import { backIcon, changePasswordIcon } from "../../studio-store-ecommerce-theme/src/AppAssets/appassets";
// Customizable Area End
import ChangePasswordController, { Props } from "./ChangePasswordController";
import styles from './ChangePasswordStyle';
import ApplicationLoader from "../../../components/src/AppLoader/AppLoader";
import CustomErrorModal from "../../../components/src/CustomErrorModal/CustomErrorModal";
const themeJson = require('../../studio-store-ecommerce-theme/src/theme.json');;


export default class ChangePassword extends ChangePasswordController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderPasswordForm = () => {
    return (
      <View style={styles.innerContainer}>
        <KeyboardAwareScrollView>
          <Text style={[styles.enterPasswordHeader, { color: (this.state.textInputErrorData.currentPassError || this.state.textInputErrorData.newPassError || this.state.textInputErrorData.newPass1Error) ? COLOR_CONST.pastelRed : COLOR_CONST.charcoalGrey }]}>Enter a passsword with alphabets A-z, number and a symbol</Text>
          <Text style={styles.passwordMismatch}>{this.state.showMissmatchError ? 'Password Missmatch !' : ''}</Text>
          <View style={styles.formContainer}>
            <SimpleTextInput title={'Enter Current Password'}
              onFocus={() =>
                this.setState(prevState => ({
                  textInputFocusData: {
                    ...prevState.textInputErrorData,
                    currentPassFocus: true,
                  },
                }))
              }
              onBlur={() =>
                this.setState(prevState => ({
                  textInputFocusData: {
                    ...prevState.textInputErrorData,
                    currentPassFocus: false,
                  },
                }))
              }
              secureTextEntry={true}
              onChangeText={(text: string) => this.onChangeTextInput('currentPass', text)}
              focusData={this.state.textInputFocusData.currentPassFocus}
              errorData={this.state.textInputErrorData.currentPassError}
            />
            <SimpleTextInput
              title={'Enter New Password'}
              onFocus={() =>
                this.setState(prevState => ({
                  textInputFocusData: {
                    ...prevState.textInputErrorData,
                    newPassFocus: true,
                  },
                }))
              }
              onBlur={() =>
                this.setState(prevState => ({
                  textInputFocusData: {
                    ...prevState.textInputErrorData,
                    newPassFocus: false,
                  },
                }))
              }
              secureTextEntry={true}
              onChangeText={(text: string) => this.onChangeTextInput('newPass', text)}
              focusData={this.state.textInputFocusData.newPassFocus}
              errorData={this.state.textInputErrorData.newPassError}
            />
            <SimpleTextInput
              title={'Re-enter New Password'}
              onFocus={() =>
                this.setState(prevState => ({
                  textInputFocusData: {
                    ...prevState.textInputErrorData,
                    newPass1Focus: true,
                  },
                }))
              }
              onBlur={() =>
                this.setState(prevState => ({
                  textInputFocusData: {
                    ...prevState.textInputErrorData,
                    newPass1Focus: false,
                  },
                }))
              }
              secureTextEntry={true}
              onChangeText={(text: string) => this.onChangeTextInput('newPass1', text)}
              focusData={this.state.textInputFocusData.newPass1Focus}
              errorData={this.state.textInputErrorData.newPass1Error}
            />
          </View>
        </KeyboardAwareScrollView>
        <GreenButton
          title="CHANGE PASSWORD"
          disabled={this.state.textInputData.currentPass.trim() === '' || this.state.textInputData.newPass.trim() === '' || this.state.textInputData.newPass1.trim() === ''}
          customStyle={[styles.loginButton, { opacity: this.state.textInputData.currentPass.trim() === '' || this.state.textInputData.newPass.trim() === '' || this.state.textInputData.newPass1.trim() === '' ? 0.5 : 1 }]}
          customTxtStyle={styles.loginText}
          onPress={() => this.validateInput()}
        />
        <ApplicationLoader isFetching={this.state.isFetching} />
        <CustomErrorModal showModal={this.state.showAlertModal} message={this.state.message}
          isShowError={this.state.isShowError} hideErrorModal={() => this.setState({ showAlertModal: false })} />
      </View>
    )
  }


  renderPasswordSuccessfullyChangedView = () => {
    return (
      <View style={styles.passwordChangedContainer}>
        <View>
          <Image source={changePasswordIcon} style={styles.lockIcon} /><Text style={styles.passwordChanged}>Password changed successfully !</Text>
          <Text style={styles.youCan}>You can now go back and continue browsing products</Text>
          <Text style={styles.youCan}>Enjoy Shopping !</Text>
        </View>
        <GreenButton
          title="GO TO PROFILE"
          customStyle={[styles.loginButton]}
          customTxtStyle={styles.loginText}
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    )
  }
  // Customizable Area End

  render() {
    return (
      //Merge Engine DefaultContainer
      <SafeAreaView style={styles.innerContainer}>
        <TopHeader
          headerTitle={"Change Password"}
          onPressLeft={() => this.props.navigation.goBack()}
          headerLeftIconName={backIcon}
          navigation={this.props.navigation}
          headerTitleStyle={{}}
          headerStyle={{}}
        />
        {!this.state.showPasswordChangedSuccessfully && this.renderPasswordForm()}
        {this.state.showPasswordChangedSuccessfully && this.renderPasswordSuccessfullyChangedView()}
      </SafeAreaView>

      //Merge Engine End DefaultContainer
    );
  }
}

// Customizable Area Start

// Customizable Area End
