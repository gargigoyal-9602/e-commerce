import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
//Hyperpay OrderConfirm
import HyperpayController, {
  Props,
  navigationParamsURL,
} from "./HyperpayController";
import PaymentsController, { orderID } from "./PaymentsController";
import { FloatingTitleTextInputField } from "./FloatingTitleTextInputField";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { WebView } from "react-native-webview";
import { RFValue } from "react-native-responsive-fontsize";
// import { boolean } from "yup";

export default class Hyperpay extends HyperpayController {
  constructor(props: Props) {
    super(props);
  }
  _updateMasterState = (attrName: string, value: string) => {
    if (attrName === "expiry") {
      if (value.indexOf(".") >= 0 || value.length > 5) {
        return;
      }

      if (value.length === 2 && this.state.expiry.length === 1) {
        value += "/";
      }
      this.setState({ expiry: value });
    } else if (attrName === "cardNumber") {
      this.setState({
        cardNumber: value
          .replace(/\s?/g, "")
          .replace(/(\d{4})/g, "$1 ")
          .trim(),
      });
    } else {
      //@ts-ignore
      this.setState({ [attrName]: value });
    }
  };
  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          enabled
          keyboardVerticalOffset={Platform.OS == "ios" ? hp("11%") : hp("1%")}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollViewStyle}
          >
            <View style={styles.container}>
              {this.state.redirectURL === null ? (
                <View style={styles.cardStyle}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      padding: 0,
                      marginHorizontal: wp("5%"),
                    }}
                  >
                    <View style={{ flex: 5 }}>
                      <View style={{ flex: 1, justifyContent: "center" }}>
                        <Text style={styles.cardTxtLabel}>CARD NUMBER</Text>
                        <Text style={styles.cardTxt}>
                          {this.state.cardNumber}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          // justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <View style={{ flex: 1 }}>
                          <Text style={styles.cardTxtLabel}>CARD HOLDER</Text>
                          <Text style={styles.cardTxt}>
                            {this.state.cardHolder}
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: "flex-end",
                            alignItems: "flex-end",
                          }}
                        >
                          <Text style={styles.cardTxtLabel}>EXPIRES</Text>
                          <Text style={styles.cardTxt}>
                            {this.state.expiry === ""
                              ? "00/00"
                              : this.state.expiry}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginVertical: hp("3%"),
                        // backgroundColor: "green",
                      }}
                    >
                      <Text style={styles.cardTxt}>{"VISA"}</Text>
                    </View>
                  </View>
                </View>
              ) : null}
              {this.state.redirectURL === null ? (
                <View style={{ flex: 1 }}>
                  <View style={{ flex: 1 }}>
                    <FloatingTitleTextInputField
                      //@ts-ignore
                      testID="textinputCardNumber"
                      attrName="cardNumber"
                      title="Card Number     "
                      width="100%"
                      interpolation={hp("4%")}
                      value={this.state.cardNumber}
                      updateMasterState={this._updateMasterState}
                      textInputStyles={{
                        color: "rgb(84, 89, 95)",
                        //fontSize: 10,//131, 132, 134)',
                      }}
                      otherTextInputProps={{
                        maxLength: 19,
                        autoCapitalize: "none",
                        keyboardType: "number-pad",
                      }}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <FloatingTitleTextInputField
                      //@ts-ignore
                      testID="textinputCardHolderName"
                      attrName="cardHolder"
                      title="Card Holder     "
                      width="100%"
                      interpolation={hp("4%")}
                      value={this.state.cardHolder}
                      updateMasterState={this._updateMasterState}
                      textInputStyles={{
                        color: "rgb(84, 89, 95)",
                        //fontSize: 10,//131, 132, 134)',
                      }}
                      otherTextInputProps={{
                        maxLength: 45,
                        autoCapitalize: "none",
                      }}
                    />
                  </View>
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "flex-end",
                      }}
                    >
                      <FloatingTitleTextInputField
                        //@ts-ignore
                        testID="textinputExpiry"
                        attrName="expiry"
                        title="Expiry (MM/YY)  "
                        width="50%"
                        interpolation={hp("4%")}
                        value={this.state.expiry}
                        updateMasterState={this._updateMasterState}
                        textInputStyles={{
                          color: "rgb(84, 89, 95)",
                          //fontSize: 10,//131, 132, 134)',
                        }}
                        otherTextInputProps={{
                          maxLength: 5,
                          autoCapitalize: "none",
                          borderBottomWidth: 1,
                          keyboardType: "number-pad",
                        }}
                      />
                      <View
                        style={{
                          marginLeft: wp("10%"),
                          marginBottom: hp("1%"),
                          height: hp("4%"),
                          width: wp("10%"),
                          borderBottomWidth: 10,
                          borderBottomColor: "#fff",
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "flex-end",
                      }}
                    >
                      <FloatingTitleTextInputField
                        //@ts-ignore
                        testID="textinputCVV"
                        attrName="cvv"
                        title="CVV  "
                        width="50%"
                        interpolation={hp("4%")}
                        value={this.state.cvv}
                        updateMasterState={this._updateMasterState}
                        textInputStyles={{
                          color: "rgb(84, 89, 95)",
                          //fontSize: 10,//131, 132, 134)',
                        }}
                        otherTextInputProps={{
                          maxLength: 4,
                          keyboardType: "number-pad",
                          autoCapitalize: "none",
                          borderBottomWidth: 0,
                        }}
                      />
                      <View
                        style={{
                          marginLeft: wp("14%"),
                          marginBottom: hp("1%"),
                          height: hp("4%"),
                          width: wp("10%"),
                          borderBottomWidth: 10,
                          borderBottomColor: "#fff",
                        }}
                      />
                    </View>
                  </View>
                </View>
              ) : null}
              {this.state.redirectURL === null ? (
                <View
                  style={{
                    flex: 1 / 2,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    testID="btnProceed"
                    onPress={() => {
                      //@ts-ignore
                      this.getCheckoutId(orderID);
                    }}
                    style={styles.btnStyle}
                  >
                    <Text style={styles.btnTxt}>PROCEED</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              {this.state.redirectURL !== null ? (
                <View
                  style={{
                    width: wp("100"),
                    height: hp("100%"),
                  }}
                >
                  <WebView
                    source={{ uri: this.state.redirectURL }}
                    onNavigationStateChange={(navState) => {
                      console.log(navState.url);
                      if (navState.url.includes("payments://result")) {
                        this.handleTrasaction();
                      }
                    }}
                  />
                  {/* <WebView
                    source={{ uri: this.state.redirectURL }}
                    onNavigationStateChange={(navState) => {
                      console.log("navState.url newupd", navState.url.length);
                      if (navState.url.includes("https://www.youtube.com/")) {
                        this.handleTrasaction();
                        console.log(
                          "navState.url newup0101",
                          JSON.stringify(navState.url)
                        );
                      } else {
                        if (Platform.OS === "android") {
                          if (navState.url.length > 165) {
                            this.handleTrasaction();
                          }
                        }
                      }
                    }}
                  /> */}
                </View>
              ) : null}
              {this.state.loadingChekout ? (
                <ActivityIndicator
                  style={{
                    flex: 1,
                    top: Platform.OS === "ios" ? hp("67") : hp("45"),
                    opacity: 1,
                    position: "absolute",
                  }}
                  size="large"
                />
              ) : null}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: wp("4%"),
    justifyContent: "center",
    alignItems: "center",
    // padding: 16,
    // marginLeft: "auto",
    // marginRight: "auto",
    // width: Platform.OS === "web" ? "75%" : "100%",
    // maxWidth: 650,
    // backgroundColor: "#ffffffff",
    // alignItems: "center",
  },
  cardStyle: {
    flex: 1,
    height: hp("25%"),
    // marginHorizontal: 5,
    // marginRight: wp("4%"),
    marginVertical: hp("2%"),
    width: wp("95%"),
    borderRadius: hp("1%"),
    backgroundColor: "#AB9956",
    shadowColor: "#c3c3c3",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.6,
    shadowRadius: 5.62,
    elevation: 6,
  },
  cardTxtLabel: {
    marginVertical: hp("1%"),
    color: "#fff",
    fontSize: RFValue(12),
    lineHeight: RFValue(14),
  },
  cardTxt: {
    color: "#fff",
    fontSize: RFValue(18),
    lineHeight: RFValue(22),
  },
  scrollViewStyle: {
    // position: 'absolute',
    backgroundColor: "#fff",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    // paddingTop: 60
  },
  textInputView: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  headerText: {
    fontSize: 16,
    color: "black",
  },
  viewBtn: {
    backgroundColor: "blue",
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "blue",
  },
  viewBtnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  btnTxt: {
    color: "rgb(255, 255, 255)",
    fontSize: RFValue(14),
    lineHeight: RFValue(16),
    textAlign: "center",
  },
  btnStyle: {
    justifyContent: "center",
    height: hp("6.5%"),
    marginVertical: hp("2%"),
    borderRadius: 50,
    width: wp("90%"),
    backgroundColor: "rgb(000,000,000)",
    shadowColor: "#c3c3c3",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.6,
    shadowRadius: 5.62,
    elevation: 6,
  },
  buttonBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  viewBtnWidth: {
    width: "48%",
  },
  orderConfirm1Txt: {
    color: "rgb(59, 196, 144)",
    fontSize: RFValue(16),
    lineHeight: RFValue(18),
  },
  orderConfirm2Txt: {
    marginVertical: hp("1%"),
    color: "rgb(139, 143, 149)",
    fontSize: RFValue(14),
    lineHeight: RFValue(16),
    textDecorationLine: "underline",
  },

  amountTxtView: {
    flex: 1,
    // backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
  },
  productView: {
    flex: 1,
    // backgroundColor: "red",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  dollerTxt: {
    color: "rgb(62, 69, 79)",
    fontSize: RFValue(18),
    lineHeight: RFValue(18),
  },
  productTxt: {
    color: "rgb(139, 143, 149)",
    fontSize: RFValue(14),
    lineHeight: RFValue(16),
  },
  amountTxt: {
    color: "rgb(62, 69, 79)",
    fontSize: RFValue(41),
    lineHeight: RFValue(50),
  },
});
