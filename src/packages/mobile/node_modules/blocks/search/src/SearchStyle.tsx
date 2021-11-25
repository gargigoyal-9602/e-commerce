import { StyleSheet } from "react-native";
import scale, { verticalScale } from "../../../framework/src/utils/Scale";
import COLOR_CONST, { FONTS } from "../../studio-store-ecommerce-theme/src/AppFonts";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_CONST.white
  },

  backgroundImage: {
    alignSelf: "center"
  },

  backButton: {
    paddingVertical: verticalScale(20),
    paddingRight: scale(20)
  },

  backIcon: {
    width: scale(11.9),
    height: scale(21.7),
    marginLeft: scale(18)
  },

  TextStyles: {
    fontSize: scale(22),
    lineHeight: scale(25),
    height: scale(50),
    textAlign: "left",
    borderColor: "#FF9800",
    backgroundColor: "#fff",
    fontFamily: FONTS.GTWalsheimProMedium,
    marginLeft: scale(20),
  },

  SearchBarContainer: {
    backgroundColor: COLOR_CONST.white
  },

  recentText: {
    marginTop: scale(13),
    marginLeft: scale(18),
    fontSize: scale(15),
    lineHeight: scale(18),
    color: COLOR_CONST.charcoalGrey,
    fontFamily: FONTS.GTWalsheimProMedium,
    marginBottom: scale(6)
  },

  recentContainer: {
    backgroundColor: COLOR_CONST.white,
    width: scale(375)
  },

  itemStyle: {
    marginTop: scale(15),
    marginLeft: scale(20),
    fontFamily: FONTS.GTWalsheimProRegular,
    fontSize: scale(15),
    lineHeight: scale(18),
    color: COLOR_CONST.charcoalGrey
  },

  listContainer: {
    flex: 1,
    backgroundColor: COLOR_CONST.white,
    paddingVertical: verticalScale(12)
  },

  categoryContainer: {
    alignItems: "center",
    width: scale(350 / 3)
  },

  categoryView: {
    justifyContent: "center",
    alignItems: "center",
    width: scale(76),
    height: scale(76),
    borderRadius: scale(76 / 2),
    overflow: "hidden"
  },

  categoryText: {
    fontSize: scale(12),
    marginTop: verticalScale(4.8),
    marginBottom: verticalScale(6.7),
    lineHeight: scale(14),
    width: scale(60),
    textAlign: "center",
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey
  },

  categoryImage: {
    width: scale(76),
    height: scale(76),
    borderRadius: scale(76/2),
    borderWidth: 1
  },

  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: scale(49),
    height: scale(49),
    borderRadius: scale(49 / 2),
    backgroundColor: COLOR_CONST.white,
    overflow: "hidden",
    borderWidth: scale(0.3)
  },

  TitelStyle: {
    marginTop: scale(11),
    marginBottom: verticalScale(28),
    fontFamily: FONTS.GTWalsheimProRegular,
    fontSize: scale(15),
    lineHeight: scale(18),
    width: scale(60),
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.8,
    textAlign: "center"
  },

  ViewStrightLine: {
    borderWidth: 0.5,
    borderColor: COLOR_CONST.lightBlueGrey,
    marginTop: scale(15),
    marginHorizontal: scale(13)
  },

  cardImage: {
    height: scale(49),
    width: scale(49)
  },

  noResultImage: {
    width: scale(129),
    height: scale(108),
    marginTop: verticalScale(58)
  },

  noResultText: {
    fontSize: scale(17),
    lineHeight: scale(19),
    color: COLOR_CONST.charcoalGrey,
    fontFamily: FONTS.GTWalsheimProMedium,
    marginTop: verticalScale(46)
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLOR_CONST.white
  },

  tryText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    width: scale(233),
    textAlign: "center",
    color: COLOR_CONST.charcoalGrey,
    fontFamily: FONTS.GTWalsheimProRegular,
    marginTop: verticalScale(8)
  }
});
