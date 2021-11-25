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

  listContainer: {
    backgroundColor: COLOR_CONST.white,
    paddingBottom: verticalScale(6),
    shadowColor: COLOR_CONST.black,
    shadowOffset: { width: 4, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2
  },

  cellContainer: {
    justifyContent: "center"
  },

  itemText: {
    fontSize: scale(15),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
    marginLeft: scale(20),
    lineHeight: scale(18),
    paddingTop: verticalScale(16),
    opacity: 0.8,
    paddingBottom: verticalScale(11)
  },

  separatorView: {
    marginLeft: scale(31),
    height: scale(0.5),
    opacity: 0.3,
    backgroundColor: themeJson.attributes.primary_color
  },
  questionView: {
    backgroundColor: COLOR_CONST.white,
    shadowColor: COLOR_CONST.black,
    shadowOffset: { width: 4, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    paddingBottom: verticalScale(49)
  },

  question: {
    fontSize: scale(16),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    lineHeight: scale(18),
    opacity: 0.9,
    marginLeft: scale(18),
    marginTop: verticalScale(24)
  },

  answer: {
    fontSize: scale(16),
    width: scale(327),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
    lineHeight: scale(18),
    marginLeft: scale(18),
    marginTop: verticalScale(11)
  },
  mainTableContainer: {
    padding: 16
  },
  catIcon: {
    width: 25,
    height: 25,
    borderRadius: 30,
    backgroundColor: "#ddd"
  },
  tableBox: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#FFF",
    marginVertical: 3,
    marginHorizontal: 2,
    padding: 15
  },
  innerExpendTable: {
    backgroundColor: "#ffffff",
    marginBottom: 5,
    marginHorizontal: 2,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4
  },
  innerExpendTableBox: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    marginHorizontal: 2,
    paddingLeft: scale(50),
    paddingVertical: 6
  },
  innerTableBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  arrow: {
    height: verticalScale(16),
    width: scale(16),
    resizeMode: "contain"
  },
  infoText: {
    width: "83%",
    fontSize: 16,
    marginVertical: 4,
    marginLeft: scale(10),
    fontFamily: FONTS.GTWalsheimProRegular
  },
  labelText: {
    fontSize: 20,
    fontFamily: FONTS.GTWalsheimProRegular
  },
  infoSubText: {
    width: "70%",
    fontSize: 16,
    marginVertical: 4,
    color: "#999A9C",
    fontFamily: FONTS.GTWalsheimProRegular
  },
  commanContainer: {
    marginTop: verticalScale(2),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
    backgroundColor: COLOR_CONST.white
  },
  commanHeading: {
    fontSize: scale(18),
    fontFamily: FONTS.GTWalsheimProMedium,
    marginVertical: verticalScale(10)
  },
  commamDescription: {
    fontSize: scale(16),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey
  }
  // Customizable Area End
});
