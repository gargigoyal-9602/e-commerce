import React from "react";

import {
  Text,
  Image,
  TouchableOpacity,
  View,
  SafeAreaView
  // Customizable Area Start
  // Customizable Area End
} from "react-native";
import { WebView } from "react-native-webview";

import HelpCenterDataController, { Props } from "./HelpCenterDataController";
import {
  DOWN_ARROW,
  RIGHT_ARROW,
  BACK_ICON
} from "../../studio-store-ecommerce-theme/src/AppAssets/appassets";
import TopHeader from "../../../components/src/TopHeader";
import styles from "./HelpCenterDataStyle";
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";
import scale from "../../../framework/src/utils/Scale";
import FocusAwareStatusBar from "../../../components/src/FocusAwareStatusBar";

// Customizable Area Start
// Customizable Area End

export default class HelpCenterData extends HelpCenterDataController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  renderQuestionView = () => {
    return (
      // Customizable Area Start
      <View style={styles.mainTableContainer}>
        {this.state.faqData &&
          this.state.faqData.map((item: any, index: number) => {
            return (
              <View>
                <View key={index} style={styles.tableBox}>
                  <View style={styles.innerTableBox}>
                    <Text style={styles.infoText}>
                      <Text style={styles.labelText}>{item.title}</Text>
                    </Text>

                    <TouchableOpacity onPress={() => this.expand(item.id)}>
                      <Image
                        style={styles.arrow}
                        source={item.expand ? DOWN_ARROW : RIGHT_ARROW}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.innerExpendTable}>
                  {item.expand && item.content !== "" && (
                    <View style={styles.innerExpendTableBox}>
                      <Text style={styles.infoSubText}>{item.content}</Text>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
      </View>
      // Customizable Area End
    );
  };

  renderCommanData = () => {
    return (
      // Customizable Area Start
      <View style={styles.commanContainer}>
        <Text style={styles.commanHeading}>
          {this.props.navigation.getParam
            ? this.props.navigation.getParam("heading")
            : ""}
        </Text>
        <Text style={styles.commamDescription}>
          {this.props.navigation.getParam
            ? this.props.navigation.getParam("description")
            : ""}
        </Text>
      </View>
      // Customizable Area End
    );
  };
  render() {
    return (
      // Customizable Area Start
      <SafeAreaView style={styles.container}>
        <FocusAwareStatusBar
          barStyle="dark-content"
          backgroundColor={COLOR_CONST.white}
          isFocused={true}
        />
        <TopHeader
          headerTitle={
            this.props.navigation.state.params.Title
              ? this.props.navigation.state.params.Title
              : ""
          }
          onPressLeft={() => this.props.navigation.goBack()}
          headerLeftIconName={BACK_ICON}
          navigation={this.props.navigation}
          headerTitleStyle={{}}
          headerStyle={{}}
        />
        <View style={{ flex: 1, padding: scale(20) }}>
          <WebView
            originWhitelist={["*"]}
            source={{
              html: this.props.navigation.getParam
                ? this.props.navigation.getParam("description")
                : ""
            }}
            style={{ flex: 1 }}
          />
        </View>
      </SafeAreaView>
      // Customizable Area End
    );
  }
}
