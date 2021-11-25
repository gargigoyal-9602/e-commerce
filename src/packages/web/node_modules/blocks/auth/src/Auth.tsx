import React from "react";

import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";

import Login from "../../login/src/Login";
import Signup from "../../signup/src/Signup";
import TopHeader from "../../../components/src/TopHeader";
import { verticalScale } from "../../../framework/src/utils/Scale";
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";
import styles from "./AuthStyle";
const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");

// Customizable Area Start
// Customizable Area End

import AuthController, { Props } from "./AuthController";

export default class Auth extends AuthController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    return (
      // Customizable Area Start
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={themeJson.attributes.primary_color}
        />
        {this.state.fromCart && (
          <TopHeader
            headerTitle={"Secure Checkout"}
            onPressLeft={() => this.props.navigation.goBack()}
            navigation={this.props.navigation}
            headerTitleStyle={{}}
            headerTitleViewStyle={{ paddingLeft: "2%" }}
            headerStyle={{}}
          />
        )}
        {!this.state.fromCart ? (
          <View style={styles.innerContainer}>
            <View
              style={{
                height: verticalScale(145),
                backgroundColor: themeJson.attributes.primary_color
              }}
            >
              <Text style={styles.brandName}>
                {themeJson.attributes.heading}
              </Text>
              <Text style={styles.getStartedText}>
                {themeJson.attributes.sub_heading}
              </Text>
            </View>

            <View style={styles.AuthCard}>
              <View style={styles.authView}>
                <TouchableOpacity
                  onPress={() => this.stateChange(0)}
                  style={[
                    styles.loginView,
                    {
                      backgroundColor: this.state.button1
                        ? COLOR_CONST.charcoalGrey
                        : "white"
                    }
                  ]}
                >
                  <Text
                    style={[
                      styles.loginText,
                      { color: this.state.button1 ? "white" : "black" }
                    ]}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.stateChange(1)}
                  style={[
                    styles.loginView,
                    {
                      backgroundColor: this.state.button2
                        ? COLOR_CONST.charcoalGrey
                        : "white"
                    }
                  ]}
                >
                  <Text
                    style={[
                      styles.loginText,
                      { color: this.state.button2 ? "white" : "black" }
                    ]}
                  >
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.box1}>
                {this.state.button1 && (
                  <Signup
                    navigation={this.props.navigation}
                    fromCart={this.state.fromCart}
                  />
                )}
                {this.state.button2 && (
                  <Login
                    navigation={this.props.navigation}
                    fromCart={this.state.fromCart}
                  />
                )}
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.innerCheckoutContainer}>
            <View style={styles.checkoutTextView}>
              <Text style={styles.checkoutText}>
                Please login / Signup to complete your shopping
              </Text>
            </View>
            <View style={styles.loginCard}>
              <View style={styles.authCheckoutView}>
                <TouchableOpacity
                  onPress={() => this.stateChange(0)}
                  style={[
                    styles.loginView,
                    {
                      backgroundColor: this.state.button1
                        ? COLOR_CONST.charcoalGrey
                        : "white"
                    }
                  ]}
                >
                  <Text
                    style={[
                      styles.loginText,
                      { color: this.state.button1 ? "white" : "black" }
                    ]}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.stateChange(1)}
                  style={[
                    styles.loginView,
                    {
                      backgroundColor: this.state.button2
                        ? COLOR_CONST.charcoalGrey
                        : "white"
                    }
                  ]}
                >
                  <Text
                    style={[
                      styles.loginText,
                      { color: this.state.button2 ? "white" : "black" }
                    ]}
                  >
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.box1}>
                {this.state.button1 && (
                  <Signup
                    navigation={this.props.navigation}
                    fromCart={this.state.fromCart}
                  />
                )}
                {this.state.button2 && (
                  <Login
                    navigation={this.props.navigation}
                    fromCart={this.state.fromCart}
                  />
                )}
              </View>
            </View>
          </View>
        )}
      </SafeAreaView>
      // Customizable Area End
    );
  }
}
