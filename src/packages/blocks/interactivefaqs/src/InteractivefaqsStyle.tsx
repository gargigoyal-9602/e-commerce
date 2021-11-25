import { StyleSheet } from "react-native";
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

  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: scale(25.6)
  },

  notifIcon: {
    width: scale(16.7),
    height: scale(19)
  },

  listContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: verticalScale(19.8)
  },

  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: scale(335),
    height: scale(60),
    backgroundColor: COLOR_CONST.white,
    borderRadius: scale(5),
    marginBottom: verticalScale(10)
  },

  downContent: {
    backgroundColor: COLOR_CONST.white,
    marginBottom: verticalScale(10),
    borderRadius: scale(5)
  },

  downContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: scale(335),
    backgroundColor: COLOR_CONST.white,
    borderRadius: scale(5),
    marginBottom: verticalScale(10)
  },

  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: scale(25),
    height: scale(25),
    borderRadius: scale(25 / 2),
    backgroundColor: COLOR_CONST.white,
    overflow: "hidden",
    borderWidth: scale(0.3),
    marginLeft: scale(13)
  },

  imageContainer1: {
    justifyContent: "center",
    alignItems: "center",
    width: scale(25),
    height: scale(25),
    borderRadius: scale(25 / 2),
    backgroundColor: COLOR_CONST.white,
    overflow: "hidden",
    borderWidth: scale(0.3),
    marginLeft: scale(13)
  },

  bottleImage: {
    width: scale(25),
    height: scale(25)
  },

  categoryNameText: {
    fontFamily: FONTS.GTWalsheimProMedium,
    fontSize: scale(14),
    lineHeight: scale(16),
    color: COLOR_CONST.charcoalGrey,
    marginLeft: verticalScale(20),
    alignSelf: "center"
  },

  htmlView: {
    height: scale(300),
    marginLeft: scale(20)
  },

  subText: {
    fontFamily: FONTS.GTWalsheimProRegular,
    fontSize: scale(15),
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.5,
    alignSelf: "center",
    marginHorizontal: verticalScale(10)
  },

  nextImage: {
    width: scale(15),
    height: scale(15),
    alignSelf: "center",
    opacity: 0.5
  },

  left: {
    flexDirection: "row",
    alignItems: "center"
  },

  left1: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(18),
    marginBottom: verticalScale(10.5)
  },

  rightArrow: {
    marginRight: scale(20.3),
    width: scale(8.7),
    height: scale(15.8)
  },

  downArrow: {
    marginTop: verticalScale(26),
    marginRight: scale(16.8),
    width: scale(15.8),
    height: scale(8.7)
  },

  line: {
    height: scale(0.5),
    width: scale(335),
    backgroundColor: COLOR_CONST.lightGreyText
  },

  subCategoryList: {
    flex: 1,
    marginTop: verticalScale(15.5),
    marginLeft: scale(47.6),
    backgroundColor: COLOR_CONST.white
  },

  subCategoryCellContainer: {
    justifyContent: "center",
    marginBottom: verticalScale(15)
  },

  subCatText: {
    fontFamily: FONTS.GTWalsheimProRegular,
    fontSize: scale(12),
    color: COLOR_CONST.charcoalGrey
  }
  // Customizable Area End
});
