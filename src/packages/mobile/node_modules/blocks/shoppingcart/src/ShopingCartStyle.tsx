import { StyleSheet, Dimensions } from "react-native";
import scale, { verticalScale } from "../../../framework/src/utils/Scale";
import COLOR_CONST, { FONTS } from "../../studio-store-ecommerce-theme/src/AppFonts";
const themeJson = require('../../studio-store-ecommerce-theme/src/theme.json');;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_CONST.white,
    alignItems: "center"
  },

  backButton: {
    paddingVertical: verticalScale(20),
    paddingRight: scale(25.6)
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

  notifIcon: {
    width: scale(16.7),
    height: scale(19),
    marginRight: scale(20.3)
  },

  cartIcon: {
    width: scale(22),
    height: scale(17.9),
    marginRight: scale(25.6)
  },

  emtpyAddressContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center"
  },

  cartempty: {
    flex: 1,
    justifyContent: "center"
  },

  emptyAddressIcon: {
    width: scale(145.1),
    height: scale(165),
    alignSelf: "center"
  },

  noAnyOrder: {
    fontSize: scale(17),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    lineHeight: scale(19),
    marginTop: verticalScale(24.6),
    opacity: 0.9,
    textAlign: "center"
  },

  youhave: {
    fontSize: scale(15),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
    width: scale(233),
    lineHeight: scale(18),
    textAlign: "center",
    marginTop: verticalScale(8),
    opacity: 0.5
  },

  listContainer: {
    marginTop: verticalScale(9.8)
  },

  orderNumber: {
    fontSize: scale(13),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    marginLeft: scale(11),
    opacity: 0.89
  },

  rowContainer: {
    backgroundColor: COLOR_CONST.white,
    borderRadius: scale(4),
    width: scale(353),
    alignSelf: "center",
    marginBottom: verticalScale(11)
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: verticalScale(18)
  },

  productImage: {
    width: scale(65),
    height: scale(65),
    marginLeft: scale(9),
    marginTop: verticalScale(16),
    backgroundColor: "#ddd"
  },

  middleInfo: {
    marginTop: verticalScale(15)
  },

  prodName: {
    fontSize: scale(17),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.black,
    marginLeft: scale(11)
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center"
  },

  orderText: {
    fontSize: scale(13),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
    marginTop: verticalScale(2),
    marginLeft: scale(11)
  },

  date: {
    fontSize: scale(13),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.89,
    marginTop: verticalScale(6),
    marginLeft: scale(4)
  },

  priceValue: {
    width: scale(100),
    fontSize: scale(15),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: themeJson.attributes.primary_color,
    opacity: 0.9
  },

  rightInfo: {
    alignItems: "flex-end",
    marginTop: verticalScale(12)
  },

  quantity: {
    fontSize: scale(13),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.4
  },

  placedRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(32)
  },

  greenDot: {
    width: scale(7),
    height: scale(7),
    borderRadius: scale(3.5),
    backgroundColor: COLOR_CONST.greenyBlue
  },

  placedText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.9,
    marginLeft: scale(11)
  },

  horizontalLinse: {
    width: scale(338),
    height: scale(1),
    backgroundColor: COLOR_CONST.lightGreyText,
    marginTop: verticalScale(18),
    opacity: 0.5,
    alignSelf: "center"
  },

  writeReview: {
    fontSize: scale(15),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.7,
    textAlign: "center",
    marginTop: scale(15),
    marginBottom: scale(11)
  },

  toolRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(10),
    marginLeft: scale(11)
  },

  tools: {
    borderWidth: scale(1),
    borderColor: COLOR_CONST.borderduckEggBlue,
    backgroundColor: COLOR_CONST.white,
    marginLeft: scale(77),
    flexDirection: "row",
    alignItems: "center",
    height: scale(30)
  },

  minus: {
    fontSize: scale(15),
    marginLeft: scale(8),
    marginRight: scale(15.4),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.5
  },

  count: {
    fontSize: scale(15),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey
  },

  plus: {
    fontSize: scale(15),
    lineHeight: scale(18),
    marginLeft: scale(15.4),
    marginRight: scale(8),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.5
  },

  bottomDetails: {
    backgroundColor: COLOR_CONST.white,
    marginBottom: verticalScale(2)
  },

  headerCart: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(20),
    marginBottom: verticalScale(18)
  },

  list: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(8)
  },

  yourCart: {
    fontSize: scale(15),
    lineHeight: scale(19),
    marginLeft: scale(18),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey
  },

  amountText: {
    fontSize: scale(15),
    lineHeight: scale(19),
    marginRight: scale(18),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey
  },

  productName: {
    fontSize: scale(15),
    lineHeight: scale(18),
    marginLeft: scale(18),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.black
  },

  price: {
    fontSize: scale(15),
    lineHeight: scale(18),
    marginRight: scale(18),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.black
  },

  tax: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(26)
  },

  delivery: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(8),
    marginBottom: verticalScale(8)
  },

  coupon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(25)
  },

  total: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(24),
    marginBottom: verticalScale(24)
  },

  couponText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    marginLeft: scale(18),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.black
  },

  changeCouponText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    marginTop: verticalScale(5),
    marginBottom: verticalScale(5),
    marginLeft: scale(18),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.pastelRed
  },

  couponPrice: {
    fontSize: scale(15),
    lineHeight: scale(18),
    marginRight: scale(18),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.black
  },

  loginButton: {
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: scale(339),
    height: scale(42),
    borderRadius: scale(21),
    opacity: 0.99,
    marginBottom: verticalScale(30)
  },

  loginText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    opacity: 0.9,
    letterSpacing: scale(0.4),
    fontFamily: FONTS.GTWalsheimProBold,
    color: COLOR_CONST.white
  },

  cancelText: {
    fontSize: scale(15),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
    marginVertical: verticalScale(20)
  },

  modalContainer: {
    flex: 1,
    backgroundColor: COLOR_CONST.modalTransparentBg,
    justifyContent: "flex-end",
    alignItems: "center"
  },

  popup: {
    width: Dimensions.get("window").width,
    alignItems: "center",
    backgroundColor: COLOR_CONST.white
  },

  oopsText: {
    fontSize: scale(13),
    lineHeight: scale(19),
    color: COLOR_CONST.pastelRed,
    marginTop: verticalScale(10),
    textAlign: "center",
    fontFamily: FONTS.GTWalsheimProRegular
  },

  validText: {
    fontSize: scale(13),
    lineHeight: scale(19),
    color: themeJson.attributes.primary_color,
    marginTop: verticalScale(10),
    textAlign: "center",
    fontFamily: FONTS.GTWalsheimProRegular
  },

  couponTick: {
    width: scale(42),
    height: scale(42),
    marginTop: verticalScale(25),
    marginBottom: verticalScale(57)
  },

  enterCouponText: {
    fontSize: scale(15),
    lineHeight: scale(19),
    color: COLOR_CONST.charcoalGrey,
    marginTop: verticalScale(23),
    letterSpacing: scale(0.4),
    textAlign: "center",
    fontFamily: FONTS.GTWalsheimProMedium
  },

  couponInput: {
    width: scale(261),
    fontSize: scale(15),
    lineHeight: scale(18),
    color: COLOR_CONST.charcoalGrey,
    marginTop: verticalScale(41),
    fontFamily: FONTS.GTWalsheimProRegular,
    borderBottomWidth: scale(0.5),
    borderBottomColor: COLOR_CONST.charcoalGrey,
    paddingBottom: verticalScale(9),
    textAlign: "center"
  },

  buttonContainer: {
    width: scale(375),
    height: scale(59),
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: scale(0.5),
    borderBottomWidth: scale(0.5),
    borderTopColor: COLOR_CONST.lightGreyText,
    borderBottomColor: COLOR_CONST.lightGreyText,
    marginTop: verticalScale(14),
    marginBottom: verticalScale(10)
  },

  loginButton1: {
    zIndex: 1000,
    width: scale(335),
    height: scale(42),
    marginTop: verticalScale(25),
    backgroundColor: themeJson.attributes.primary_color
  },

  loginText1: {
    fontSize: scale(14),
    lineHeight: scale(16),
    letterSpacing: scale(0.4),
    color: COLOR_CONST.white,
    fontFamily: FONTS.GTWalsheimProBold
  },

  applyCouponRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: verticalScale(5)
  },

  applyCouponText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    marginTop: verticalScale(5),
    marginBottom: verticalScale(10),
    marginLeft: scale(18),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.pastelRed
  },

  subText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    marginTop: verticalScale(5),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.black,
    marginRight: scale(18)
  },

  continueShoppingButton: {
    width: scale(339),
    height: scale(42),
    marginTop: verticalScale(25),
    borderRadius: scale(20),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    opacity: 0.99
  },

  applyText: {
    fontSize: scale(15),
    color: COLOR_CONST.white,
    fontFamily: FONTS.GTWalsheimProBold,
    lineHeight: scale(18)
  },

  modalContainer1: {
    flex: 1,
    backgroundColor: COLOR_CONST.modalTransparentBg,
    justifyContent: "center",
    alignItems: "center"
  },

  popup1: {
    width: scale(286),
    borderRadius: scale(8),
    backgroundColor: COLOR_CONST.white
  },

  deleteAddress1: {
    fontSize: scale(18),
    lineHeight: scale(20),
    marginTop: verticalScale(31),
    fontFamily: FONTS.GTWalsheimProMedium,
    textAlign: "center",
    color: COLOR_CONST.charcoalGrey
  },

  areYouSure1: {
    fontSize: scale(15),
    lineHeight: scale(18),
    opacity: 0.8,
    marginTop: verticalScale(23),
    color: COLOR_CONST.charcoalGrey,
    width: scale(221),
    fontFamily: FONTS.GTWalsheimProRegular,
    textAlign: "center",
    alignSelf: "center"
  },

  changeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: scale(11),
    width: scale(180)
  },

  periodText: {
    fontSize: scale(10),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: themeJson.attributes.primary_color
  },

  bottomPopupView1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: verticalScale(30),
    paddingTop: verticalScale(7.5),
    marginBottom: verticalScale(12.4),
    borderTopWidth: scale(0.5),
    borderTopColor: COLOR_CONST.lightGreyText
  },

  verticalLine1: {
    width: scale(0.5),
    height: scale(25),
    backgroundColor: COLOR_CONST.lightGreyText
  },

  cancelText1: {
    fontSize: scale(15),
    lineHeight: scale(18),
    color: COLOR_CONST.charcoalGrey,
    fontFamily: FONTS.GTWalsheimProRegular,
    textAlign: "center"
  },

  yesDelete1: {
    fontSize: scale(15),
    lineHeight: scale(18),
    opacity: 0.8,
    fontFamily: FONTS.GTWalsheimProRegular,
    textAlign: "center",
    color: COLOR_CONST.charcoalGrey
  },

  labelSticker: {
    width: scale(74.5),
    height: scale(22.2),
    borderTopLeftRadius: scale(50),
    borderBottomLeftRadius: scale(50),
    backgroundColor: COLOR_CONST.pastelRed,
    position: "absolute",
    right: 0,
    bottom: verticalScale(10),
    justifyContent: "center"
  },

  stickerText: {
    fontSize: scale(8),
    lineHeight: scale(9),
    letterSpacing: scale(0.3),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.white,
    marginLeft: scale(12.1)
  },

  crossButton: {
    position: "absolute",
    top: verticalScale(10),
    right: scale(17.4),
    width: scale(20),
    height: scale(20),
    justifyContent: "center",
    alignItems: "center"
  },

  crossIcon: {
    width: scale(14.6),
    height: scale(14.6)
  },

  changeText: {
    fontSize: scale(10),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProMedium,
    marginLeft: scale(11),
    textDecorationLine: "underline",
    color: COLOR_CONST.charcoalGrey
  },
  
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: scale(1),
    borderTopColor: COLOR_CONST.coolGreyTwo,
  },
  
  removeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingVertical: verticalScale(8),
  },

  removeText: {
    fontSize: scale(14),
    lineHeight: scale(16),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.pastelRed,
  },

  vertical: {
    width: scale(1),
    height: scale(17),
    backgroundColor: COLOR_CONST.coolGreyTwo
  },

  moveWishlistText: {
    fontSize: scale(14),
    lineHeight: scale(16),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.boderdarkishBlueTwo
  },
});
