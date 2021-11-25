import { StyleSheet, Platform } from "react-native";
import scale, { verticalScale } from "../../../framework/src/utils/Scale";
import COLOR_CONST, {
  FONTS
} from "../../studio-store-ecommerce-theme/src/AppFonts";

// Customizable Area Start
// Customizable Area End

export default StyleSheet.create({
  // Customizable Area Start
  container: {
    flex: 1,
    backgroundColor: COLOR_CONST.white
  },

  backButton: {
    paddingVertical: verticalScale(20),
    paddingRight: scale(20)
  },

  headerTitleStyle: {
    fontSize: scale(15),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    lineHeight: scale(18)
  },

  backIcon: {
    width: scale(11.9),
    height: scale(21.7),
    marginLeft: scale(18)
  },

  cartIcon: {
    width: scale(20.2),
    height: scale(17.9),
    marginRight: scale(25.6)
  },

  headerContainer: {
    flexDirection: "row",
    backgroundColor: COLOR_CONST.white,
    paddingBottom: verticalScale(22),
    shadowColor: COLOR_CONST.black,
    shadowOffset: { width: 4, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1
  },

  leftRow: {
    flexDirection: "row"
  },

  innerContainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: COLOR_CONST.white
  },

  passwordChangedContainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: COLOR_CONST.white
  },

  formContainer: {
    flex: 1,
    backgroundColor: COLOR_CONST.white,
    paddingHorizontal: scale(25),
    paddingTop: verticalScale(31)
  },

  inputText: {
    color: COLOR_CONST.charcoalGrey,
    fontSize: scale(13),
    lineHeight: scale(15),
    fontFamily: FONTS.GTWalsheimProRegular,
    opacity: 1
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR_CONST.lightGreyText,
    marginTop: Platform.OS === "ios" ? verticalScale(7) : 0,
    marginBottom: verticalScale(24),
    fontSize: scale(17),
    lineHeight: scale(19),
    opacity: 0.9,
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
    paddingBottom: 0
  },

  loginButton: {
    alignSelf: "center",
    width: scale(335),
    height: scale(44),
    borderRadius: scale(2210),
    opacity: 0.99,
    marginBottom: verticalScale(30.2)
  },

  loginText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProBold
  },

  enterPasswordHeader: {
    fontSize: scale(15),
    lineHeight: scale(18),
    marginTop: verticalScale(30),
    alignSelf: "center",
    width: scale(233),
    textAlign: "center",
    opacity: 0.8,
    color: COLOR_CONST.charcoalGrey,
    fontFamily: FONTS.GTWalsheimProRegular
  },

  passwordMismatch: {
    fontSize: scale(15),
    lineHeight: scale(18),
    width: scale(233),
    alignSelf: "center",
    marginTop: verticalScale(14),
    textAlign: "center",
    color: COLOR_CONST.pastelRed,
    fontFamily: FONTS.GTWalsheimProRegular
  },

  lockIcon: {
    width: scale(77.9),
    height: scale(121.7),
    alignSelf: "center",
    marginTop: verticalScale(66)
  },

  passwordChanged: {
    fontSize: scale(17),
    lineHeight: scale(19),
    alignSelf: "center",
    marginTop: verticalScale(37.3),
    textAlign: "center",
    color: COLOR_CONST.charcoalGrey,
    fontFamily: FONTS.GTWalsheimProMedium
  },

  youCan: {
    fontSize: scale(15),
    lineHeight: scale(18),
    width: scale(233),
    alignSelf: "center",
    opacity: 0.5,
    marginTop: verticalScale(8),
    textAlign: "center",
    color: COLOR_CONST.charcoalGrey,
    fontFamily: FONTS.GTWalsheimProRegular
  },

  ratingInput: {
    fontSize: scale(13),
    lineHeight: scale(15),
    color: COLOR_CONST.charcoalGrey,
    width: scale(325),
    height: scale(150),
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: COLOR_CONST.lightGreyText,
    marginBottom: verticalScale(15.8),
    alignSelf: "center",
    paddingTop: verticalScale(12.8),
    paddingHorizontal: scale(12)
  },

  emptyText: {
    fontSize: scale(12),
    lineHeight: scale(14),
    marginBottom: verticalScale(15.8),
    fontFamily: FONTS.GTWalsheimProMedium,
    textAlign: "center",
    color: COLOR_CONST.pastelRed
  }
  // Customizable Area End
});
