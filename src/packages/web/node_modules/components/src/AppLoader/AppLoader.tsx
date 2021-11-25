import React, { Component } from 'react'
import { View, StyleSheet, Text, ActivityIndicator, Platform } from 'react-native';
import COLOR_CONST, { FONTS } from '../../../blocks/studio-store-ecommerce-theme/src/AppFonts';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './AppLoaderStyle';
const themeJson = require('../../../blocks/studio-store-ecommerce-theme/src/theme.json');
const ApplicationLoader = (props: any) => {

    if (!props.isFetching) {
        return null;
    } else {
        return (
            <View style={styles.container}>
                {Platform.OS === 'ios' ? <ActivityIndicator size="large" color={themeJson.attributes.primary_color} /> :
                    <Spinner
                        cancelable
                        color={themeJson.attributes.primary_color}
                        visible={true}
                        textStyle={{ color: '#fff' }}
                    />}
            </View>
        )
    }
}


export default ApplicationLoader;