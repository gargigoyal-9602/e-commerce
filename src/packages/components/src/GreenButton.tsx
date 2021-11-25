import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import R from './R';
import LinearGradient from 'react-native-linear-gradient';
const themeJson = require('../../blocks/studio-store-ecommerce-theme/src/theme.json');
const GreenButton = (props: any) => {
  return (
    <TouchableOpacity onPress={props.onPress} {...props}>
      <LinearGradient colors={[themeJson.attributes.common_button_color, themeJson.attributes.common_button_color]} style={[styles.buttonStyle, props.customStyle]}>
        <Text style={[{ color: R.colors.white }, props.customTxtStyle]}>
          {props.title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GreenButton;

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: R.colors.greenButton,
  },
});
