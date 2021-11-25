import { StyleSheet } from "react-native";
import scale, { verticalScale } from "../../../framework/src/utils/Scale";
import COLOR_CONST, { FONTS } from "../../studio-store-ecommerce-theme/src/AppFonts";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_CONST.white
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

  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: COLOR_CONST.paleGrey
},

reviewListContainer: {
    flex: 1,
    backgroundColor: COLOR_CONST.white,
    marginTop: verticalScale(20.8),
  },

reviewCell: {

},

nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scale(18),
},

reviewName: {
    fontSize: scale(14),
    lineHeight: scale(16),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
},

dateText: {
    fontSize: scale(8),
    lineHeight: scale(9),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.coolGreyTwo,
},

starListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: scale(71),
    marginLeft: scale(18),
    marginTop: verticalScale(3.8),
    marginBottom: verticalScale(7.2),
},

listStar: {
    width: scale(10.8),
    height: scale(10),
},

reviewText: {
    fontSize: scale(12),
    lineHeight: scale(14),
    marginLeft: scale(18),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
},

listHorizontalLine: {
    width: scale(339),
    height: scale(0.5),
    backgroundColor: COLOR_CONST.lightGreyText,
    marginVertical: verticalScale(15.5),
    alignSelf: 'center'
},
});
