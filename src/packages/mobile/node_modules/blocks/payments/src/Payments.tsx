import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Modal,
  ScrollView,
  Image,
  SafeAreaView
} from "react-native";

import TopHeader from "../../../components/src/TopHeader";
import COLOR_CONST, { FONTS } from '../../studio-store-ecommerce-theme/src/AppFonts'
import scale, { verticalScale } from "../../../framework/src/utils/Scale";
import PaymentsController, { Props } from "./PaymentsController";
import { upArrow, downArrow } from "./assets";
export const configJSON = require("./config");
import R from "../../../components/src/R";
export default class Payments extends PaymentsController {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TopHeader
          headerTitle={"Payments"}
          // onPressLeft={() => this.props.navigation.replace("MainNavigator")}
          // headerLeftIconName={IMG_CONST.BACK_ICON}
          // headerLeftIconStyle={{ resizeMode: "contain", width: Scale(12), height: verticalScale(20) }}
          headerRightIcons={[

          ]}
          navigation={this.props.navigation}
          headerTitleStyle={{}}
          // headerTitleViewStyle={{ marginLeft: "32%" }}
          headerStyle={{}}
        />
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={
            this.state.gatewaytype === "razorpay"
              ? this.state.razorPayModal
              : this.state.hyperpayModal
          }
        >
          <View style={styles.modal}>
            <View>
              <Text style={styles.titletxt}>Name</Text>
              <TextInput
                testID="txtInputName" //Merge Engine::From BDS
                style={styles.bgMobileInput} //UI Engine::From Sketch
                placeholder="Name" //UI Engine::From Sketch
                onChangeText={(txt: string) => {
                  this.setState({ name: txt });
                }}
              />
              <Text style={styles.titletxt}>Choose a order id</Text>
              <View style={styles.tableBox}>
                <View style={styles.innerTableBox}>
                  <Text style={styles.infoText}>
                    {this.state.Order_Id
                      ? this.state.Order_Id
                      : "Choose a order id"}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        dropdownStatus: !this.state.dropdownStatus,
                      })
                    }
                  >
                    <Image
                      style={styles.arrow}
                      source={this.state.dropdownStatus ? R.paymentsImage.upArrow : R.paymentsImage.downArrow}
                    />
                  </TouchableOpacity>
                </View>
                {this.state.dropdownStatus && (
                  <View style={styles.dropdownView}>
                    <ScrollView>
                      {this.state.orders.map((item: any, index: number) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={styles.checkbtn}
                            onPress={() => this.setOrderId(item)}
                          >
                            <Text style={styles.checktxt}>{item.id}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                )}
              </View>

              <Text style={styles.titletxt}>Currency</Text>
              <TextInput
                testID="txtInputCurrency" //Merge Engine::From BDS
                style={styles.bgMobileInput} //UI Engine::From Sketch
                editable={false}
                value={this.state.currency}
              />
            </View>

            <View style={styles.buttonBox}>
              <TouchableOpacity
                style={[styles.viewBtn, styles.viewBtnWidth]}
                onPress={() => this.checkout()}
              >
                <Text style={styles.viewBtnText}>Pay</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.viewBtn, styles.viewBtnWidth]}
                onPress={() => this.closeModal()}
              >
                <Text style={styles.viewBtnText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.buttonBox}>
          <TouchableOpacity
            testID="RazorPay"
            style={[styles.viewBtn, styles.viewBtnWidth]}
            onPress={() => {
              this.showModal();
            }}
          >
            <Text style={styles.viewBtnText}>Pay with Razor Pay</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity
            testID="HyperPay"
            style={[styles.viewBtn, styles.viewBtnWidth]}
            onPress={() => {
              this.showHyperPayModal();
              // this.props.navigation.navigate("Hyperpay", {
              //   orderid: "",
              // });
            }}
          >
            <Text style={styles.viewBtnText}>Pay with Hyper Pay</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
    // alignItems:"center"
  },
  dropdownView: {
    height: 150,
  },
  checkbtn: {
    flexDirection: "row",
    marginVertical: 10,
  },
  checktxt: {
    paddingLeft: 10,
    marginLeft: 10,
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

  buttonBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  viewBtnWidth: {
    width: "48%",
  },

  bgMobileInput: {
    flexDirection: "row",
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    borderWidth: Platform.OS === "web" ? 0 : 1,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    includeFontPadding: true,
    padding: 10,
  },
  titletxt: {
    marginBottom: 15,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  modalBox: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  modal: {
    width: "80%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 80,
    marginLeft: 40,
    padding: 15,
  },
  closeBtnText: {
    color: "#000",
    textAlign: "center",
    fontSize: 16,
  },
  closeBtn: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  tableBox: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    marginBottom: 15,
  },
  innerTableBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoText: {
    width: "70%",
    fontSize: 16,
    marginVertical: 4,
  },
  arrow: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
});
