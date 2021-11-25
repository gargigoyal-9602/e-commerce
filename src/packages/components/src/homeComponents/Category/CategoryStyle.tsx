import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale, { verticalScale } from '../../../../framework/src/utils/Scale';
import COLOR_CONST, { FONTS } from '../../../../blocks/studio-store-ecommerce-theme/src/AppFonts';
const themeJson = require('../../../../blocks/studio-store-ecommerce-theme/src/theme.json');

export default StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: verticalScale(11.2),
        marginTop: verticalScale(11.2),
        marginBottom: verticalScale(11.2),
        backgroundColor: COLOR_CONST.white
    },

    flexStyle: {
        flex: 1
    },

    titleContainer: {
        flex: 1,
        marginHorizontal: scale(5),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    titleText: {
        fontSize: scale(15),
        marginLeft: verticalScale(5),
        textAlign: 'center',
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
    },

    listContainer: {
        flex: 1,
    },

    categoryContainer: {
        alignItems: 'center',
        width: scale(350 / 4),
        paddingTop: verticalScale(11.2),
    },

    categoryView: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        width: scale(65),
        height: scale(65),
        borderRadius: scale(65/2),
    },

    featured: {
        fontSize: scale(17),
        lineHeight: scale(19),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.charcoalGrey,
        marginBottom: verticalScale(14.8),
        marginLeft: scale(20),
    },

    categoryText: {
        fontSize: scale(12),
        marginTop: verticalScale(4.8),
        marginBottom: verticalScale(6.7),
        lineHeight: scale(14),
        width: scale(65),
        textAlign: 'center',
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
    },

    categoryImage: {
        width: scale(65),
        height: scale(65),
        borderRadius: 64,
        borderWidth: 1
    },

    cardViewContainer: {
        backgroundColor: COLOR_CONST.white,
        height: scale(60),
        width: scale(160),
        margin: scale(10),
        borderRadius: 5,
    },

    viewContainer: {
        backgroundColor: themeJson.attributes.primary_color,
        width: scale(61),
        height: scale(61),
        borderRadius: scale(61 / 2),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: scale(0.1),
        overflow: 'hidden',
        marginRight: scale(20),
    },


    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: scale(25),
        height: scale(25),
        borderRadius: scale(25 / 2),
        backgroundColor: COLOR_CONST.white,
        overflow: 'hidden',
        borderWidth: scale(0.3)
    },

    cardView: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: scale(15),
    },

    cardImage: {
        height: scale(25),
        width: scale(25),
    },

    cardText: {
        marginHorizontal: scale(9.6),
        color: COLOR_CONST.charcoalGrey,
        fontSize: scale(14),
        lineHeight: scale(16),
        fontFamily: FONTS.GTWalsheimProMedium
    },

    viewAllContainer: {
        backgroundColor: COLOR_CONST.white,
        height: scale(60),
        borderWidth: 1.2,
        borderColor: themeJson.attributes.primary_color,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    viewAllText: {
        color: themeJson.attributes.primary_color,
        fontSize: scale(15),
        marginTop: verticalScale(4.8),
        marginBottom: verticalScale(6.7),
        lineHeight: scale(14),
        width: scale(60),
        textAlign: 'center',
        fontFamily: FONTS.GTWalsheimProMedium,
    }

});