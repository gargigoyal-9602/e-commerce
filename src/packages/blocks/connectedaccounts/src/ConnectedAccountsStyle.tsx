import { StyleSheet } from "react-native";
import scale, { verticalScale } from "../../../framework/src/utils/Scale";
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";
import { FONTS } from "../../studio-store-ecommerce-theme/src/AppFonts";
const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");

// Customizable Area Start
// Customizable Area End

export default StyleSheet.create({
  // Customizable Area Start
  container: {
    flex: 1,
    backgroundColor: COLOR_CONST.white
  },

  connectedAccountContainer: {
    flex: 1
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

  connectedListCell: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLOR_CONST.white,
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(12),
    borderBottomWidth: scale(1),
    borderBottomColor: COLOR_CONST.charcoalGrey
  },

  connectedListBottomCell: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLOR_CONST.white,
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(12),
    shadowColor: COLOR_CONST.black,
    shadowOffset: { width: 4, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    borderBottomWidth: scale(1),
    borderBottomColor: COLOR_CONST.charcoalGrey
  },

  leftRow: {
    flexDirection: "row",
    alignItems: "center"
  },

  icon: {
    width: scale(30),
    height: scale(30),
    marginLeft: scale(21)
  },

  cross: {
    width: scale(20),
    height: scale(20),
    marginRight: scale(26.7)
  },

  connectedStatus: {
    marginLeft: scale(22)
  },

  connected: {
    fontSize: scale(12),
    lineHeight: scale(14),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.6
  },

  name: {
    fontSize: scale(17),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.8,
    marginTop: verticalScale(3)
  },

  modalContainer: {
    flex: 1,
    backgroundColor: COLOR_CONST.modalTransparentBg,
    justifyContent: "center",
    alignItems: "center"
  },

  popup: {
    width: scale(286),
    height: scale(204),
    borderRadius: scale(8),
    backgroundColor: COLOR_CONST.white
  },

  deleteAddress: {
    fontSize: scale(18),
    lineHeight: scale(20),
    opacity: 0.8,
    marginTop: verticalScale(31),
    fontFamily: FONTS.GTWalsheimProMedium,
    textAlign: "center",
    color: COLOR_CONST.charcoalGrey
  },

  areYouSure: {
    fontSize: scale(15),
    lineHeight: scale(18),
    opacity: 0.8,
    marginTop: verticalScale(22),
    width: scale(233),
    fontFamily: FONTS.GTWalsheimProRegular,
    textAlign: "center",
    alignSelf: "center"
  },

  bottomPopupView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(15),
    marginBottom: verticalScale(15)
  },

  cancelText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    color: COLOR_CONST.charcoalGrey,
    marginLeft: scale(47.5),
    fontFamily: FONTS.GTWalsheimProRegular,
    textAlign: "center"
  },

  yesDelete: {
    fontSize: scale(15),
    lineHeight: scale(18),
    opacity: 0.8,
    marginRight: scale(47.5),
    fontFamily: FONTS.GTWalsheimProRegular,
    textAlign: "center",
    color: COLOR_CONST.charcoalGrey
  },

  horizontalLine: {
    width: scale(256),
    height: scale(1),
    backgroundColor: themeJson.attributes.primary_color,
    opacity: 0.2,
    alignSelf: "center",
    marginTop: verticalScale(23)
  }
  // Customizable Area End
});
