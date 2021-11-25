import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FocusAwareStatusBar from "../../../components/src/FocusAwareStatusBar";
import GreenButton from "../../../components/src/GreenButton";
import CustomErrorModal from "../../../components/src/CustomErrorModal/CustomErrorModal";
import TopHeader from "../../../components/src/TopHeader";
import Scale from "../../../framework/src/utils/Scale";
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";
import { BACK_ICON } from '../../studio-store-ecommerce-theme/src/AppAssets/appassets';

import {
  checkboxSelected,
  checkboxUnSelected,
  notificationIcon
} from "./assets";
import CheckoutController, { Props } from "./CheckoutController";
import styles from "./CheckoutStyle";

// Customizable Area Start
// Customizable Area End

export default class Checkout extends CheckoutController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container}>
        <FocusAwareStatusBar
          barStyle="dark-content"
          backgroundColor={COLOR_CONST.white}
          isFocused={true}
        />
        <TopHeader
          headerTitle={"Check Out"}
          onPressLeft={() => this.props.navigation.goBack()}
          headerLeftIconName={BACK_ICON}
          headerRightIcons={[
            {
              src: notificationIcon,
              onPress: () => {
                this.props.navigation.navigate("Notifications");
              },
              style: { marginLeft: Scale(40) }
            }
          ]}
          navigation={this.props.navigation}
          headerTitleStyle={{}}
          headerStyle={{}}
        />
        <CustomErrorModal
          isShowError={this.state.isShowError}
          showModal={this.state.customErrorModal}
          message={this.state.customErrorMessage}
          hideErrorModal={() => this.setState({ customErrorModal: false })}
        />
        <ScrollView>
          <View style={styles.formContainer}>
            <View style={styles.selectAddressRow}>
              <Text style={styles.billingAddress}>Billing Address</Text>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("SavedAddress", {
                    onSetAddress: (addressData: any) =>
                      this.onSetAddress(addressData, "billing"),
                    isFromCheckout: true,
                  })
                }
              >
                <Text style={styles.selectAddress}>Select Address</Text>
              </TouchableOpacity>
            </View>
            <KeyboardAwareScrollView ref={(ref: any) => (this.scrollViewRef = ref)}>
              <View>
                <Text style={styles.inputText}>Name</Text>
                <TextInput
                  style={styles.textInput}
                  value={this.state.textInputData.name}
                  {...this.textInputNameProps}
                />
                <Text style={styles.inputText}>
                  Flat / House / Apartment No.
                </Text>
                <TextInput
                  style={styles.textInput}
                  value={this.state.textInputData.flat_no}
                  {...this.textInputFlatProps}
                />
                <Text style={styles.inputText}>Address Line 1</Text>
                <TextInput
                  style={styles.textInput}
                  value={this.state.textInputData.address}
                  {...this.textInputAddressLine1Props}
                />
                <Text style={styles.inputText}>Address Line 2</Text>
                <TextInput
                  style={styles.textInput}
                  value={this.state.textInputData.address_line_2}
                  {...this.textInputAddressLine2Props}
                />
                <Text style={styles.inputText}>City</Text>
                <TextInput
                  style={styles.textInput}
                  value={this.state.textInputData.city}
                  {...this.textInputCityProps}
                />
                <Text style={styles.inputText}>State</Text>
                <TextInput
                  style={styles.textInput}
                  value={this.state.textInputData.state}
                  {...this.textInputStateProps}
                />
                <Text style={styles.inputText}>Country</Text>
                <TextInput
                  style={styles.textInput}
                  value={this.state.textInputData.country}
                  {...this.textInputCountryProps}
                />
                <Text style={styles.inputText}>Pin Code</Text>
                <TextInput
                  style={styles.textInput}
                  value={this.state.textInputData.zip_code}
                  {...this.textInputPinCodeProps}
                />
                <Text style={styles.inputText}>Phone Number</Text>
                <TextInput
                  style={styles.textInput}
                  value={this.state.textInputData.phone_number}
                  keyboardType={"number-pad"}
                  {...this.textInputPhoneNoProps}
                />
              </View>
            </KeyboardAwareScrollView>
            <TouchableOpacity
              onPress={() => this.enableMyBillingAddressSame()}
              style={styles.checkBoxContainer}
            >
              <Image
                source={
                  this.state.billingAndAddressSame
                    ? checkboxSelected
                    : checkboxUnSelected
                }
                style={styles.checkbox}
              />
              <Text style={styles.billingText}>
                My billing and shipping address are the same
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.setState({ saveAddress: !this.state.saveAddress })
              }
              style={styles.checkBoxContainer1}
            >
              <Image
                source={
                  this.state.saveAddress ? checkboxSelected : checkboxUnSelected
                }
                style={styles.checkbox}
              />
              <Text style={styles.billingText}>Save address</Text>
            </TouchableOpacity>
            {!this.state.billingAndAddressSame && (
              <>
                <View style={styles.selectAddressRow}>
                  <Text style={styles.billingAddress}>Shipping Address</Text>
                </View>
                <KeyboardAwareScrollView>
                  <View>
                    <Text style={styles.inputText}>Name</Text>
                    <TextInput
                      style={styles.textInput}
                      value={this.state.shippingtextInputData.name}
                      {...this.shippingtextInputNameProps}
                    />
                    <Text style={styles.inputText}>
                      Flat / House / Apartment No.
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      value={this.state.shippingtextInputData.flat_no}
                      {...this.shippingtextInputFlatProps}
                    />
                    <Text style={styles.inputText}>Address Line 1</Text>
                    <TextInput
                      style={styles.textInput}
                      value={this.state.shippingtextInputData.address}
                      {...this.shippingtextInputAddressLine1Props}
                    />
                    <Text style={styles.inputText}>Address Line 2</Text>
                    <TextInput
                      style={styles.textInput}
                      value={this.state.shippingtextInputData.address_line_2}
                      {...this.shippingtextInputAddressLine2Props}
                    />
                    <Text style={styles.inputText}>City</Text>
                    <TextInput
                      style={styles.textInput}
                      value={this.state.shippingtextInputData.city}
                      {...this.shippingtextInputCityProps}
                    />
                    <Text style={styles.inputText}>State</Text>
                    <TextInput
                      style={styles.textInput}
                      value={this.state.shippingtextInputData.state}
                      {...this.shippingtextInputStateProps}
                    />
                    <Text style={styles.inputText}>Country</Text>
                    <TextInput
                      style={styles.textInput}
                      value={this.state.shippingtextInputData.country}
                      {...this.shippingtextInputCountryProps}
                    />
                    <Text style={styles.inputText}>Pin Code</Text>
                    <TextInput
                      style={styles.textInput}
                      value={this.state.shippingtextInputData.zip_code}
                      {...this.shippingtextInputPinCodeProps}
                    />
                    <Text style={styles.inputText}>Phone Number</Text>
                    <TextInput
                      style={styles.textInput}
                      value={this.state.shippingtextInputData.phone_number}
                      keyboardType={"number-pad"}
                      {...this.shippingtextInputPhoneNoProps}
                    />
                  </View>
                </KeyboardAwareScrollView>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      shippingsaveAddress: !this.state.shippingsaveAddress
                    })
                  }
                  style={styles.checkBoxContainer1}
                >
                  <Image
                    source={
                      this.state.shippingsaveAddress
                        ? checkboxSelected
                        : checkboxUnSelected
                    }
                    style={styles.checkbox}
                  />
                  <Text style={styles.billingText}>Save address</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
        <GreenButton
          title="CONTINUE"
          customStyle={styles.loginButton}
          customTxtStyle={styles.loginText}
          onPress={() => this.validateInput()}
        />
      </SafeAreaView>
      // Customizable Area End
    );
  }
  // Customizable Area Start
  // Customizable Area End
}