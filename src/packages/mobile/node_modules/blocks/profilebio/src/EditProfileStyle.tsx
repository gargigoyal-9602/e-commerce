import { StyleSheet, Platform } from 'react-native';
import scale, { verticalScale } from '../../../framework/src/utils/Scale';
import COLOR_CONST, { FONTS } from '../../studio-store-ecommerce-theme/src/AppFonts';

export default StyleSheet.create({

    inputText: {
        color: COLOR_CONST.charcoalGrey,
        fontSize: scale(13),
        lineHeight: scale(15),
        fontFamily: FONTS.GTWalsheimProRegular,
        opacity: 1
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: COLOR_CONST.borderduckEggBlue,
        marginTop: Platform.OS === 'ios' ? verticalScale(7) : 0,
        marginBottom: verticalScale(24),
        fontSize: scale(17),
        lineHeight: scale(19),
        opacity: 0.9,
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.charcoalGrey,
        paddingBottom: 0,
    },
    backButton: {
        paddingVertical: verticalScale(20),
        paddingRight: scale(20),
    },

    headerTitleStyle: {
        fontSize: scale(15),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
        lineHeight: scale(18),
    },

    backIcon: {
        width: scale(11.9),
        height: scale(21.7),
        marginLeft: scale(18),
    },

    formContainer: {
        backgroundColor: COLOR_CONST.white,
        paddingHorizontal: scale(18),
        paddingBottom: verticalScale(40),
        marginTop: verticalScale(2),
    },

    container: {
        flex: 1,
        backgroundColor: COLOR_CONST.white,
    },

    innerContainer: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: COLOR_CONST.white,
    },

    loginButton: {
        width: scale(339),
        height: scale(42),
        borderRadius: scale(21),
        opacity: 0.99,
        marginBottom: verticalScale(45),
        alignSelf: 'center'
    },

    cameraButton: {
        width: scale(122),
        height: scale(122),
        borderRadius: scale(6),
        backgroundColor: COLOR_CONST.charcoalGrey,
        marginTop: verticalScale(36),
        marginBottom: verticalScale(29),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        overflow: 'hidden'
    },

    profileIcon: {
        width: scale(122),
        height: scale(122),
    },

    cameraIcon: {
        width: scale(34.8),
        height: scale(27.5),
    },

    loginText: {
        fontSize: scale(15),
        lineHeight: scale(18),
        opacity: 0.9,
        letterSpacing: scale(0.4),
        fontFamily: FONTS.GTWalsheimProMedium,
    },

    modalContainer: {
        flex: 1,
    },

    transparentBg: {
        flex: 1,
        backgroundColor: COLOR_CONST.modalTransparentBg,
        opacity: 0.55,
    },

    bottomView: {
        width: scale(375),
        height: scale(211),
        backgroundColor: COLOR_CONST.white
    },

    crossIcon: {
        width: scale(24),
        height: scale(24),
        alignSelf: 'flex-end',
        marginTop: verticalScale(16),
        marginRight: scale(16),
    },

    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: verticalScale(19)
    },

    leftButton: {
        alignItems: 'center',
        marginRight: scale(39),
    },

    rightButton: {
        alignItems: 'center',
        marginLeft: scale(39),
    },

    takePictureText: {
        fontSize: scale(14),
        lineHeight: scale(20),
        marginTop: verticalScale(24),
        fontFamily: FONTS.GTWalsheimProBold,
        textAlign: 'center',
        color: COLOR_CONST.black
    },

    whiteCameraContainer: {
        width: scale(122),
        height: scale(122),
        backgroundColor: 'transparent',
        position: 'absolute',
        alignSelf: 'center',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },

    whiteCamera: {
        width: scale(34.8),
        height: scale(27.5),
    },

    checkContainer: {
        marginLeft: scale(13)
    }


});
