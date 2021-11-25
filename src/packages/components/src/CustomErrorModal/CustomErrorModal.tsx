import React, { Component } from 'react'
import { View, StyleSheet, Text, Modal, TouchableOpacity, Image } from 'react-native'
import styles from './CustomErrorModalStyle';
import * as IMG_CONST from '../../../blocks/studio-store-ecommerce-theme/src/ImageConstants';
import ColorConstants from '../../../blocks/studio-store-ecommerce-theme/src/AppFonts';
const themeJson = require('../../../blocks/studio-store-ecommerce-theme/src/theme.json');
import COLOR_CONST from '../../../blocks/studio-store-ecommerce-theme/src/AppFonts';

const CustomErrorModal = (props: any) => {

    if (!props.showModal) {
        return null;
    } else {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={true}
                onRequestClose={() => {
                    props.hideErrorModal();
                }}
            >
                <TouchableOpacity activeOpacity={1} onPress={() => props.hideErrorModal()} style={styles.modalContainer}>
                    <View style={styles.bottomView}>
                        <Text style={[styles.alertText, {
                            color: props.isShowError ? COLOR_CONST.redAlertColor :
                                COLOR_CONST.greenThemeColor
                        }]}>{props.message}</Text>
                        <TouchableOpacity onPress={() => props.hideErrorModal()}>
                            <Image source={IMG_CONST.CROSS_ICON1} style={styles.crossIcon} />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }
}



export default CustomErrorModal;