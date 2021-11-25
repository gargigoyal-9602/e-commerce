import { StyleSheet, Platform } from 'react-native';
import scale, { verticalScale } from '../../../framework/src/utils/Scale';
import COLOR_CONST, { FONTS } from '../../studio-store-ecommerce-theme/src/AppFonts';
const themeJson = require('../../studio-store-ecommerce-theme/src/theme.json');
// Customizable Area Start
// Customizable Area End
export default StyleSheet.create({
    // Customizable Area Start  
    container: {
        backgroundColor: COLOR_CONST.white,
        width: scale(375),
        height: scale(313)
    },

    flexstyle: {
        flex: 1
    },

    headerTitleStyle: {
        fontSize: scale(15),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
        lineHeight: scale(18),
        width: scale(200),
        textAlign: 'center'
    },

    backButton: {
        paddingVertical: verticalScale(20),
        paddingRight: scale(20),
    },

    backIcon: {
        width: scale(11.9),
        height: scale(21.7),
        marginLeft: scale(18),
    },

    notifIcon: {
        width: scale(16.7),
        height: scale(19),
    },

    cartIcon: {
        width: scale(20.2),
        height: scale(17.9),
        marginLeft: scale(6.5)
    },

    wishlistCartIcon: {
        width: scale(20.2),
        height: scale(17.9),
        marginRight: scale(25.6)
    },

    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: scale(25.6),
    },

    mainContainer: {
        flex: 1,
        backgroundColor: COLOR_CONST.white,
    },

    sortHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLOR_CONST.white,
        shadowColor: COLOR_CONST.black,
        shadowOffset: { width: 4, height: 0.5 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        height: verticalScale(40)
    },

    textpoup: {
        fontFamily: FONTS.GTWalsheimProRegular,
        marginHorizontal: 10,
        color: COLOR_CONST.charcoalGrey,
        opacity: 0.8,
        fontSize: scale(17),
        lineHeight: scale(19)
    },

    gridTitleContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: scale(20),
        marginTop: verticalScale(18)
    },

    titleTextStyle: {
        color: COLOR_CONST.charcoalGrey,
        opacity: 0.5,
        fontSize: scale(17),
        lineHeight: scale(19),
        fontFamily: FONTS.GTWalsheimProRegular
    },

    viewAllText: {
        color: COLOR_CONST.charcoalGrey,
        opacity: 0.8,
        fontSize: scale(15),
        lineHeight: scale(18),
        fontFamily: FONTS.GTWalsheimProMedium
    },

    listContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: verticalScale(10)
    },

    listContainerOne: {
        flex: 1,
        marginLeft: scale(11),
        marginTop: verticalScale(10)
    },

    productGridStyle: {
        borderWidth: 1,
        borderRadius: scale(4),
        width: scale(166),
        borderColor: COLOR_CONST.borderduckEggBlue,
        marginHorizontal: scale(5),
        marginBottom: verticalScale(11),
        overflow: 'hidden'
    },

    imageMainContainer: {
        alignItems: 'center',
    },

    imageContainer: {
        flexDirection: 'row',
    },

    heartIcon: {
        width: scale(50),
        height: scale(50),
    },

    BottalImage: {
        width: scale(171),
        height: scale(171),
    },

    titleContainer: {
        width: scale(159),
    },

    titleNameStyle: {
        fontSize: scale(17),
        lineHeight: scale(19),
        height: scale(19),
        color: COLOR_CONST.charcoalGrey,
        marginTop: verticalScale(11),
        fontFamily: FONTS.GTWalsheimProRegular,
        marginHorizontal: scale(12),
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
        width: scale(171),
        backgroundColor: COLOR_CONST.charcoalGrey,
        height: scale(40),
        justifyContent: 'center',
        alignItems: 'center'
    },

    addToCartText: {
        color: COLOR_CONST.pastelRed,
        alignSelf: 'center',
        fontFamily: FONTS.GTWalsheimProRegular,
        fontSize: scale(13),
        lineHeight: scale(15),
    },

    spinner: {
        width: Platform.OS === 'ios' ? scale(171) : scale(177),
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

    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    sortByContiner: {
        alignSelf: 'flex-end',
        width: scale(375),
        height: scale(250),
        backgroundColor: COLOR_CONST.white,
        shadowColor: COLOR_CONST.black,
        shadowOffset: { width: 4, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
    },

    crossIcon: {
        width: scale(12),
        height: scale(12),
        marginRight: scale(30.3),
    },

    sortRow: {
        marginTop: verticalScale(24),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    sortByText: {
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
        fontSize: scale(18),
        lineHeight: scale(20),
        marginLeft: scale(24),
    },

    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: verticalScale(22),
        marginLeft: scale(26.6)
    },

    innerRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    dollarDown: {
    },

    newIcon: {
    },

    popularityIcon: {
        width: scale(12),
        height: scale(15),
        resizeMode: 'contain'
    },

    filterText: {
        fontSize: scale(17),
        lineHeight: scale(19),
        fontFamily: FONTS.GTWalsheimProRegular,
        marginLeft: scale(9),
        color: COLOR_CONST.charcoalGrey
    },

    tickCorrect: {
        width: scale(18.3),
        height: scale(18.3),
        marginRight: scale(26.8)
    },

    TitleSort: {
        marginLeft: scale(10.5),
        alignSelf: 'center',
        color: themeJson.attributes.primary_color,
        fontSize: scale(15),
        lineHeight: scale(18),
        fontFamily: FONTS.GTWalsheimProMedium
    },

    emtpyAddressContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    cartempty: {
        flex: 1,
        justifyContent: 'center'
    },

    emptyAddressIcon: {
        width: scale(171.5),
        height: scale(186.7),
        alignSelf: 'center',
    },

    noAnyOrder: {
        fontSize: scale(17),
        textAlign: 'center',
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
        lineHeight: scale(19),
        marginTop: verticalScale(24.6),
        opacity: 0.9
    },

    youhave: {
        fontSize: scale(15),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.charcoalGrey,
        width: scale(233),
        lineHeight: scale(18),
        textAlign: 'center',
        marginTop: verticalScale(8),
        opacity: 0.5
    },

    loginButton: {
        alignSelf: 'center',
        width: scale(339),
        height: scale(42),
        borderRadius: scale(21),
        opacity: 0.99,
        marginBottom: verticalScale(30.2),
    },

    loginText: {
        fontSize: scale(14),
        lineHeight: scale(16),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.white,
    },

    showingResults: {
        fontSize: scale(10),
        lineHeight: scale(11),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.charcoalGrey,
        marginLeft: scale(11),
        marginTop: verticalScale(8.8),
    },

    touchableOpacityStyle: {
        backgroundColor: COLOR_CONST.white,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: verticalScale(16),
        right: verticalScale(14.1),
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
    ratingText: {
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.black,
        fontSize: scale(15),
        textAlign: 'center',
        lineHeight: scale(15),
        letterSpacing: scale(0.3),
    },
    lineDivider: { width: 2, height: scale(12), backgroundColor: COLOR_CONST.charcoalGrey, marginLeft: scale(5), marginTop: scale(1) },
    starRating: { margin: scale(2), width: scale(8), height: scale(8) },
    discountPercentage: {
        fontSize: scale(15),
        lineHeight: scale(18),
        color: themeJson.attributes.primary_color,
        fontFamily: FONTS.GTWalsheimProMedium,
        marginTop: verticalScale(25),
        marginBottom: verticalScale(9),
        height: scale(18),
    },
    outOfStockCont: {
        flex: 1,
        width: '100%',
    },
    outOfStock: {
        fontSize: scale(15),
        lineHeight: scale(18),
        color: COLOR_CONST.pastelRed,
        fontFamily: FONTS.GTWalsheimProMedium,
        marginLeft: scale(5),
        height: scale(18),
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
    },

    buttonSort: {
      flex: 1,
      justifyContent: "center",
      flexDirection: "row"
    },
    buttonSortImage: {
      height: scale(15),
      width: scale(15),
      resizeMode: "contain",
      alignSelf: "center"
    }
    // Customizable Area End
});