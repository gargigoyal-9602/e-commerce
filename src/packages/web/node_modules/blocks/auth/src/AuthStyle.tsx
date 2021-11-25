import { StyleSheet, Platform } from "react-native";
import scale, { verticalScale } from "../../../framework/src/utils/Scale";
import COLOR_CONST, {
  FONTS
} from "../../studio-store-ecommerce-theme/src/AppFonts";
const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");

// Customizable Area Start
// Customizable Area End

export default StyleSheet.create({
  // Customizable Area Start
  container: {
    flex: 1,
    backgroundColor: themeJson.attributes.primary_color
  },
  innerCheckoutContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: scale(15)
  },
  checkoutTextView: {
    marginVertical: verticalScale(10)
  },
  checkoutText: {
    fontSize: scale(20),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey
  },
  loginCard: {
    backgroundColor: "#ffffff",
    elevation: 2,
    borderTopLeftRadius: scale(5),
    borderTopRightRadius: scale(5),
    marginVertical: verticalScale(15)
  },
  AuthCard: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: scale(8),
    borderTopRightRadius: scale(8),
    marginTop: verticalScale(-10),
    flex: 1
  },
  authView: {
    flexDirection: "row",
    width: scale(274),
    height: verticalScale(38),
    borderRadius: 38,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#ffffff",
    marginTop: Platform.OS === "ios" ? verticalScale(-17) : verticalScale(-18)
  },
  authCheckoutView: {
    flexDirection: "row",
    width: scale(274),
    height: verticalScale(38),
    borderRadius: 38,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#ffffff",
    marginVertical: verticalScale(15)
  },
  loginView: {
    width: scale(274 / 2),
    height: verticalScale(38),
    borderRadius: scale(38),
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  loginText: {
    fontSize: scale(16),
    fontFamily: FONTS.GTWalsheimProMedium
  },
  brandName: {
    fontSize: 21,
    lineHeight: 24,
    marginTop: 40,
    width: 323,
    height: 24,
    marginLeft: 20,
    color: COLOR_CONST.white,
    fontWeight: "bold"
  },

  getStartedText: {
    fontSize: 12,
    lineHeight: 14,
    marginTop: 12,
    width: 323,
    height: 44,
    marginLeft: 20,
    color: COLOR_CONST.white
  },
  segmentContainer: {
    zIndex: 8888,
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    top: Platform.OS === "ios" ? 145 : 146
  },

  box1: {
    marginTop: verticalScale(4)
  },

  segmentButtonHolder: {
    width: 274,
    height: 38,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  tabStyle: {
    backgroundColor: "#ffffff",
    borderColor: "#fff",
    borderRadius: 18,
    width: 145,
    height: 38
  },

  activeTabStyle: {
    backgroundColor: "#e65e52",
    borderColor: "#e65e52",
    borderRadius: 18
  },

  activetabTextStyle: {
    fontSize: 14,
    color: "#ffffff"
  }
  // Customizable Area End
});
