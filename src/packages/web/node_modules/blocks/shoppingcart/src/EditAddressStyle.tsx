import { StyleSheet, Platform } from "react-native";
import scale, { verticalScale } from "../../../framework/src/utils/Scale";
import COLOR_CONST, { FONTS } from "../../studio-store-ecommerce-theme/src/AppFonts";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
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

  formContainer: {
    flex: 1,
    backgroundColor: COLOR_CONST.white,
    paddingHorizontal: scale(18),
    paddingTop: verticalScale(22)
  },

  loginButton: {
    width: scale(339),
    height: scale(42),
    borderRadius: scale(21),
    opacity: 0.99,
    marginVertical: verticalScale(15.1),
    alignSelf: "center"
  },

  loginText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    letterSpacing: scale(0.4),
    color: COLOR_CONST.white,
    fontFamily: FONTS.GTWalsheimProBold
  }
});
