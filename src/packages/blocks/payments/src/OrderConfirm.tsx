import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Platform,
  Image,
} from "react-native";

import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import TopHeader from "../../../components/src/TopHeader";
import COLOR_CONST, { FONTS } from '../../studio-store-ecommerce-theme/src/AppFonts'
import scale, { verticalScale } from "../../../framework/src/utils/Scale";
import * as IMG_CONST from "../../studio-store-ecommerce-theme/src/ImageConstants";
import OrderConfirmController, {Props} from "./OrderConfirmController";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
const themeJson = require('../../studio-store-ecommerce-theme/src/theme.json');
export default class OrderConfirm extends OrderConfirmController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    let orderplaced = this.state.orderConfirmStatus === "" ? "empty" : this.state.orderConfirmStatus;
    const total = this.props.navigation.state.params?.orderData?.order?.total;
    let placed_at = this.props.navigation.state.params?.orderData?.order?.placed_at;
    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <TopHeader
          headerRightIcons={[

          ]}
          navigation={this.props.navigation}
          headerTitleStyle={{}}
          headerStyle={{}}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.contentCtr}
          style={styles.scrollViewStyle}
        >
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1 / 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            />
            <View
              style={{
                flex: 1.5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ flex: 1 }}
                source={IMG_CONST.CHECKMARK_ICON}
                resizeMode="contain"
                height={hp("20%")}
                width={wp("30%")}
              />
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <Text style={styles.orderConfirm1Txt}>Order Confirmed</Text>
                <Text style={styles.orderConfirm2Txt}>
                  Thank you so much for your order
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      justifyContent: "center",
                      marginTop: hp("2%"),
                    }}
                  >
                    <Text style={styles.dollerTxt}>{themeJson.attributes.currency_type} {total}</Text>
                  </View>
                  <View style={{ justifyContent: "center" }}>
                    <Text style={styles.amountTxt}>
                      {
                        //@ts-ignore
                        orderplaced?.body?.amount
                      }
                    </Text>
                  </View>
                </View>
                <View style={styles.dateRow}>
                  <Text style={styles.productDate}>{moment(placed_at).format("DD")}/{moment(placed_at).format("MMM")}/{moment(placed_at).format("YY")}</Text>
                </View>
              </View>
            </View>
            <View style={styles.amountTxtView} />
            <View
              style={{
                flex: 1 / 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => this.handleGotoOrders()} >
                <LinearGradient colors={[themeJson.attributes.common_button_color, themeJson.attributes.common_button_color]} style={styles.loginButton}>
                  <Text style={styles.loginText}>GO TO MY ORDERS </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: wp("2%"),
  },
  contentCtr: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    justifyContent: "center",
    alignItems: "center",
  },
  productView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  dollerTxt: {
    color: "rgb(62, 69, 79)",
    fontSize: RFValue(18),
    lineHeight: RFValue(18),
  },
  amountTxt: {
    color: "rgb(62, 69, 79)",
    fontSize: RFValue(41),
    lineHeight: RFValue(50),
  },
  scrollViewStyle: {
    flex: 1,
    backgroundColor: "#fff",
  },
  productTxt: {
    color: "rgb(139, 143, 149)",
    fontSize: RFValue(14),
    lineHeight: RFValue(16),
  },
  checkIcon: {
    fontSize: RFValue(30),
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
    backgroundColor: "rgb(48, 68, 133)",
    shadowColor: "#c3c3c3",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.6,
    shadowRadius: 5.62,
    elevation: 6,
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

  buttonBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  viewBtnWidth: {
    width: "48%",
  },
  dateRow: {
    flexDirection: 'row',
  },
  orderText: {
    fontSize: scale(13),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.4,
    marginTop: verticalScale(6),
    marginLeft: scale(11),
  },

  productDate: {
    fontSize: scale(14),
    marginTop: verticalScale(6.5),
    lineHeight: scale(16),
    color: COLOR_CONST.charcoalGrey,
    fontFamily: FONTS.GTWalsheimProMedium,
  },

  loginButton: {
    alignSelf: 'center',
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: scale(339),
    height: scale(42),
    borderRadius: scale(21),
    opacity: 0.99,
    marginBottom: verticalScale(100)
  },
  loginText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    opacity: 0.9,
    letterSpacing: scale(0.4),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.white
  },
});
