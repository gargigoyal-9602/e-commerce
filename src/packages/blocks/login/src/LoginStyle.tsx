import { StyleSheet, Platform } from "react-native";
import scale, { verticalScale } from "../../../framework/src/utils/Scale";
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";
const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");

// Customizable Area Start
// Customizable Area End

export default StyleSheet.create({
  // Customizable Area Start
  container: {
    backgroundColor: "#fff"
  },
  imgPasswordShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {},

  innerTopContainer: {
    backgroundColor: "#fff",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1
  },

  fieldContainer: {
    marginTop: 61,
    alignItems: "center"
  },

  input: {
    width: 256,
    height: 40,
    fontSize: 15,
    color: COLOR_CONST.darkishBlue,
    lineHeight: 18,
    marginLeft: 18
  },

  input1: {
    width: 222.8,
    height: 40,
    fontSize: 15,
    color: COLOR_CONST.darkishBlue,
    lineHeight: 18,
    marginLeft: 18.3
  },

  loginSuccess: {
    width: 42,
    height: 42,
    marginTop: 29
  },

  loginButton: {
    width: 312,
    height: 44,
    marginTop: 29,
    backgroundColor: themeJson.attributes.primary_color,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22
  },

  loginText: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 1,
    opacity: 0.9
  },

  forgotText: {
    fontSize: 13,
    lineHeight: 15,
    textAlign: "center",
    marginTop: 24,
    marginBottom: 21,
    color: COLOR_CONST.charcoalGrey
  },

  continueText: {
    fontSize: 11,
    lineHeight: 13,
    color: COLOR_CONST.charcoalGrey,
    textAlign: "center",
    marginTop: 21
  },

  signUpVia: {
    fontSize: 11,
    color: COLOR_CONST.charcoalGrey,
    textAlign: "center"
  },

  bottomContainer: {},

  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: scale(110),
    height: scale(37.8),
    borderRadius: scale(19.8),
    marginHorizontal: scale(2),
    backgroundColor: COLOR_CONST.darkishBlueTwo,
    flex: 1
  },

  socialButtonContainer: {
    marginTop: verticalScale(13.8),
    marginHorizontal: scale(15),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },

  appleSocialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: scale(37.8),
    borderRadius: scale(19.8),
    backgroundColor: COLOR_CONST.black
  },

  appleSocialButtonContainer: {
    marginTop: verticalScale(13.8),
    marginHorizontal: scale(20)
  },

  fStyle: {
    width: scale(5.7),
    height: scale(13.1),
    marginRight: verticalScale(12)
  },

  gStyle: {
    width: scale(16.3),
    height: scale(12.2),
    marginRight: scale(7.7)
  },

  aStyle: {
    width: scale(13.5),
    height: scale(16.5),
    marginRight: scale(8.4)
  },

  fbText: {
    fontSize: scale(14.4),
    lineHeight: scale(17),
    color: COLOR_CONST.white
  },

  skipText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    marginTop: verticalScale(20),
    color: COLOR_CONST.charcoalGrey,
    textAlign: "center",
    marginBottom: verticalScale(61)
  },

  SectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.8,
    borderColor: COLOR_CONST.whiteThree,
    width: scale(312),
    height: scale(40),
    borderRadius: scale(20)
  },

  SectionStyle1: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.8,
    borderColor: COLOR_CONST.focusDarkColor,
    width: scale(312),
    height: scale(40),
    borderRadius: scale(20)
  },

  ImageStyleEmail: {
    width: scale(22.7),
    height: scale(14.3),
    marginLeft: scale(15),
    resizeMode: "stretch",
    alignItems: "center"
  },

  ImageStylekey: {
    width: scale(23.9),
    height: scale(11.7),
    marginLeft: scale(15),
    resizeMode: "stretch",
    alignItems: "center"
  },

  eye: {
    marginRight: scale(16.8)
  },

  ImageStyleEye: {
    width: scale(16.5),
    height: scale(11.3)
  },

  modalContainer: {
    flex: 1,
    justifyContent: "flex-end"
  }
  // Customizable Area End
});
