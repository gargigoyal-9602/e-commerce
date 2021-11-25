import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale, { verticalScale } from '../../../../framework/src/utils/Scale';
import COLOR_CONST, { FONTS } from '../../../../blocks/studio-store-ecommerce-theme/src/AppFonts';
const themeJson = require('../../../../blocks/studio-store-ecommerce-theme/src/theme.json');
export default StyleSheet.create({


    container: {
        backgroundColor: COLOR_CONST.white,
        paddingBottom: verticalScale(20),
        width: scale(375),
        // height: scale(313)
    },

    flexstyle: {
        flex: 1
    },

    gridTitleContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: scale(20),
        marginTop: verticalScale(18)
    },

    titleTextStyle: {
        color: COLOR_CONST.charcoalGrey,
        fontSize: scale(17),
        lineHeight: scale(19),
        fontFamily: FONTS.GTWalsheimProRegular
    },

    viewAllText: {
        color: COLOR_CONST.charcoalGrey,
        fontSize: scale(15),
        lineHeight: scale(18),
        fontFamily: FONTS.GTWalsheimProMedium
    },

    gridListContainer: {
        marginHorizontal: scale(11),
        paddingBottom: verticalScale(20),
    },

    productGridStyle: {
        borderWidth: 1,
        borderRadius: scale(4),
        width: scale(166),
        borderColor: COLOR_CONST.borderduckEggBlue,
        overflow: 'hidden',
        marginTop: verticalScale(15),
        marginHorizontal: scale(5),
    },

    imageMainContainer: {
    },

    imageContainer: {
        flexDirection: 'row',
    },

    heartIcon: {
        width: scale(50),
        height: scale(50),
    },

    BottalImage: {
        width: scale(166),
        height: scale(166),
        // marginTop: scale(14),
    },

    titleContainer: {
        width: scale(130),
        height: scale(38),
        marginTop: verticalScale(11),
        alignItems: 'center'
    },

    titleNameStyle: {
        fontSize: scale(17),
        height: scale(19),
        marginHorizontal: scale(12),
        lineHeight: scale(19),
        marginTop: verticalScale(11),
        color: COLOR_CONST.charcoalGrey,
        fontFamily: FONTS.GTWalsheimProRegular
    },

    price: {
        fontSize: scale(15),
        lineHeight: scale(18),
        color: themeJson.attributes.primary_color,
        fontFamily: FONTS.GTWalsheimProMedium,
        marginTop: verticalScale(10),
        marginBottom: verticalScale(9),
        height: scale(18),
    },

    discountRow: {
        flexDirection: 'row',
        marginHorizontal: scale(12),
    },

    discountPrice: {
        fontSize: scale(15),
        lineHeight: scale(18),
        color: COLOR_CONST.charcoalGrey,
        fontFamily: FONTS.GTWalsheimProMedium,
        textDecorationLine: 'line-through',
        marginTop: verticalScale(10),
        marginBottom: verticalScale(9),
        height: scale(18),
    },

    addToCartContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: scale(164),
        backgroundColor: COLOR_CONST.charcoalGrey,
        height: scale(40)
    },

    addToCartText: {
        color: COLOR_CONST.pastelRed,
        alignSelf: 'center',
        fontFamily: FONTS.GTWalsheimProRegular,
        fontSize: scale(13),
        lineHeight: scale(15),
        // marginTop: verticalScale(14)
    },

    spinner: {
        alignSelf: 'center',
        width: Platform.OS === 'ios' ? scale(164) : scale(170),
        backgroundColor: COLOR_CONST.white,
        height: scale(40),
        alignItems: 'center',
    },

    qtyStyle: {
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.charcoalGrey,
        opacity: 0.7,
        fontSize: scale(13),
        lineHeight: scale(15),
        marginLeft: scale(5)
    },

    TouchableOpacityStyle: {
        // backgroundColor:COLOR_CONST.white,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: verticalScale(16),
        right: verticalScale(16),
        width: scale(18),
        height: scale(17),
        zIndex: 1000
    },

    labelSticker: {
        position: 'absolute',
        backgroundColor: COLOR_CONST.pastelRed,
        paddingHorizontal: scale(10),
        height: scale(17),
        justifyContent: 'center',
        borderTopRightRadius: scale(5),
        borderBottomRightRadius: scale(5),
        left: 0,
        top: verticalScale(16),
        alignItems: 'center'
    },
    stickerText: {
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.white,
        fontSize: scale(10),
        textAlign: 'center',
        lineHeight: scale(11),
    },
    cartView: {
        width: "100%",
        height: verticalScale(40),
        backgroundColor: "#F7F8FB",
        justifyContent: "center",
        alignItems: "center"
    },
    cartText: {
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
        fontSize: scale(15),
        textAlign: 'center',
        lineHeight: scale(15),
        letterSpacing: scale(0.3),
    },

    reviewRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: scale(12),
        marginBottom: verticalScale(10),
      },
    
      avgReview: {
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.black,
        fontSize: scale(14),
        textAlign: "center",
        lineHeight: scale(16),
      },
    
      reviewStar: {
        marginLeft: scale(4),
        width: scale(9),
        height: scale(9),
      },
    
      reviewCount: {
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.darkGreyText,
        fontSize: scale(14),
        textAlign: "center",
        lineHeight: scale(16),
        marginLeft: scale(4.5),
      }
    


});