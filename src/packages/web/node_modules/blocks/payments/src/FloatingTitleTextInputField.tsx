import React, { Component } from "react";
import {
  View,
  Animated,
  StyleSheet,
  TextInput,
  Dimensions,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
interface S {
  isFieldActive: boolean;
}
export class FloatingTitleTextInputField extends Component<S> {
  static defaultProps = {
    keyboardType: "default",
    //@ts-ignore
    titleActiveSize: Platform.isPad ? 28 : RFValue(11.5), //RFPercentage(2),//RFValue(11.5, height),//Platform.isPad ? 28 : 11.5,
    //@ts-ignore
    titleInActiveSize: Platform.isPad ? 31.5 : RFValue(14), //RFPercentage(4), //RFValue(14, height),//Platform.isPad ? 31.5 : 14,
    titleActiveColor: "rgb(84, 89, 95)",
    titleInactiveColor: "rgb(84, 89, 95)",
    otherTextInputAttributes: {},
    textInputStyles: {},
  };
  position: any;
  constructor(props: any) {
    super(props);
    //@ts-ignore
    const { value } = this.props;
    this.position = new Animated.Value(value ? 1 : 0);
    this.state = {
      isFieldActive: false,
      //value > 0 ? true : false,
    };
  }

  _handleFocus = () => {
    //@ts-ignore
    if (!this.state.isFieldActive) {
      // console.log('TextINput Focused')
      this.setState({ isFieldActive: true });
      Animated.timing(this.position, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start();
      //this._onChangeText()
    }
  };

  _handleBlur = () => {
    //@ts-ignore
    if (this.state.isFieldActive && !this.props.value) {
      // console.log('TextINput UNFocused')
      this.setState({ isFieldActive: false });
      Animated.timing(this.position, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };

  _onChangeText = (updatedValue: any) => {
    //@ts-ignore
    const { attrName, updateMasterState, textInputRef } = this.props;
    updateMasterState(attrName, updatedValue, textInputRef);
  };

  _returnAnimatedTitleStyles = (attrName: any) => {
    //@ts-ignore
    const { isFieldActive } = this.state;
    //@ts-ignore
    const {
      //@ts-ignore
      titleActiveColor,
      //@ts-ignore
      titleInactiveColor,
      //@ts-ignore
      titleActiveSize,
      //@ts-ignore
      titleInActiveSize,
    } = this.props;
    //alert('titleActiveSize' + titleActiveSize);
    //console.log('TextINput _returnAnimatedTitleStyles' + attrName)
    switch (attrName) {
      case "cardNumber":
        //console.log('!this.props.value' + this.props.value.length);
        //@ts-ignore
        if (this.props.value.length > 0) {
          this._handleFocus();
        }
        break;

      case "cardHolder":
        //@ts-ignore
        if (this.props.value.length > 0) {
          this._handleFocus();
        } else {
          this._handleBlur();
        }
        break;

      case "expiry":
        //@ts-ignore
        if (this.props.value.length > 0) {
          this._handleFocus();
        } else {
          this._handleBlur();
        }
        break;
      case "cvv":
        //@ts-ignore
        if (this.props.value.length > 0) {
          this._handleFocus();
        } else {
          this._handleBlur();
        }
        break;
    }
    //this._handleFocus();

    return {
      top: this.position.interpolate({
        inputRange: [0, 1],
        //@ts-ignore
        outputRange: [this.props.interpolation, 0],
      }),
      fontSize: isFieldActive ? titleActiveSize : titleInActiveSize,
      color: isFieldActive ? "rgb(195, 195, 195)" : "rgb(84, 89, 95)",
      //fontFamily: fonts.OpenSans_Regular,
      //color: isFieldActive ? titleActiveColor : titleInactiveColor,
      //floatingTxtTitleColor
    };
  };
  setPlaceHolderMove = () => {
    //@ts-ignore
    if (this.state.isFieldActive) {
      //@ts-ignore
      if (Platform.isPad) {
        return hp("2.8%");
      } else {
        return hp("2%");
      }
    } else {
      //@ts-ignore
      if (Platform.isPad) {
        return hp("3.8%");
      } else {
        return hp("2.9%");
      }
    }
  };
  render() {
    //console.log('textInputStyles' + this.props.value)
    //isFieldActive is true means Placeholder value wich is moving on border
    return (
      <View
        style={[
          Styles.container,
          {
            width:
              //@ts-ignore
              this.props.width,
          },
        ]}
      >
        {/** floating text view whic remove the border according to the length of title */}
        <Animated.View
          style={{
            position: "absolute",
            bottom: hp("5.5%"),
            //@ts-ignore
            height: this.state.isFieldActive
              ? this.setPlaceHolderMove()
              : this.setPlaceHolderMove(), //handling placeholder position 1.6  2.6
            //@ts-ignore
            width: this.state.isFieldActive
              ? //@ts-ignore
                wp(`${this.props.title.length * 1.7}%`)
              : wp("-1%"),
            //backgroundColor: "rgb(255, 255, 255)",
          }}
        >
          <Animated.Text
            style={[
              Styles.titleStyles,
              //@ts-ignore
              this._returnAnimatedTitleStyles(this.props.attrName),
            ]}
          >
            {
              //@ts-ignore
              this.props.title
            }
          </Animated.Text>
        </Animated.View>
        <TextInput
          //@ts-ignore
          refs={(input) => (this.props.textInputRef = input)}
          //@ts-ignore
          value={this.props.value}
          //@ts-ignore
          style={[Styles.textInput, this.props.textInputStyles]}
          //underlineColorAndroid="rgb(84, 89, 95)"
          onFocus={this._handleFocus}
          onBlur={this._handleBlur}
          onChangeText={this._onChangeText}
          //@ts-ignore
          keyboardType={this.props.keyboardType}
          //@ts-ignore
          {...this.props.otherTextInputProps}
        />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    height: hp("6%"),
    marginVertical: height / (2 * 30),
    width: wp("80%"),
  },
  textInput: {
    height: hp("6%"), // 60,//height / 14,
    borderBottomWidth: 1,
    borderBottomColor: "#c3c3c3",
    padding: 0,
    //@ts-ignore
    fontSize: Platform.isPad ? 32 : RFValue(16),
    width: width / 1.1,
  },
  titleStyles: {
    position: "absolute",
    fontSize: RFValue(20),
  },
});
