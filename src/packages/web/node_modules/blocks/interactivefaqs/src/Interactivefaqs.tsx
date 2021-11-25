import React from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView
  // Customizable Area Start
  // Customizable Area End
} from "react-native";

import InteractivefaqController, { Props } from "./InteractivefaqsController";
import * as IMG_CONST from "../../studio-store-ecommerce-theme/src/ImageConstants";
import TopHeader from "../../../components/src/TopHeader";
import styles from "./InteractivefaqsStyle";
import Scale, { verticalScale } from "../../../framework/src/utils/Scale";

import { WebView } from "react-native-webview";
import ApplicationLoader from "../../../components/src/AppLoader/AppLoader";
import CustomErrorModal from "../../../components/src/CustomErrorModal/CustomErrorModal";
import FocusAwareStatusBar from "../../../components/src/FocusAwareStatusBar";
import R from "../../../components/src/R";
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";

// Customizable Area Start
// Customizable Area End

export default class Interactivefaq extends InteractivefaqController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  renderListItem = (item: any, index: any) => {
    // Customizable Area Start
    if (!item.isExpanded) {
      return (
        <TouchableOpacity
          onPress={() => this.onPressExpandableView(item, index)}
          style={styles.mainContainer}
        >
          <View style={styles.left}>
            <Text style={styles.categoryNameText}>{item.title}</Text>
          </View>
          {
            <TouchableOpacity
              onPress={() => this.onPressExpandableView(item, index)}
              hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
            >
              <Image source={IMG_CONST.RIGHT_ARROW} style={styles.rightArrow} />
            </TouchableOpacity>
          }
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={styles.downContent}>
          <View style={styles.downContainer}>
            <View style={styles.left1}>
              <Text style={styles.categoryNameText}>{item.title}</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.onPressExpandableView(item, index)}
              hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
            >
              <Image
                source={R.interactiveFaqsImage.downArrow}
                style={styles.downArrow}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
          <WebView
            originWhitelist={["*"]}
            source={{ html: item.content }}
            style={styles.htmlView}
          />
        </View>
      );
    }
    // Customizable Area End
  };

  render() {
    return (
      // Customizable Area Start
      <SafeAreaView style={styles.container}>
        <TopHeader
          headerTitle={"FAQs"}
          headerLeftIconName={R.interactiveFaqsImage.backIcon}
          onPressLeft={() => this.props.navigation.goBack()}
          headerLeftIconStyle={{
            resizeMode: "contain",
            width: Scale(12),
            height: verticalScale(20)
          }}
          navigation={this.props.navigation}
          headerTitleStyle={{}}
          headerStyle={{ elevation: 0 }}
        />
        <FocusAwareStatusBar
          barStyle="dark-content"
          backgroundColor={COLOR_CONST.white}
          isFocused={true}
        />
        <View style={styles.listContainer}>
          <FlatList
            data={this.state.faqList}
            renderItem={({ item, index }) => this.renderListItem(item, index)}
          />
        </View>
        <ApplicationLoader isFetching={this.state.isFetching} />
        <CustomErrorModal
          showModal={this.state.showAlertModal}
          message={this.state.message}
          isShowError={this.state.isShowError}
          hideErrorModal={() => this.setState({ showAlertModal: false })}
        />
      </SafeAreaView>
      // Customizable Area End
    );
  }
}
