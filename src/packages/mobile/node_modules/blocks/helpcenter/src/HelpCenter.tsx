import React from "react";

import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  FlatList
  // Customizable Area Start
  // Customizable Area End
} from "react-native";

import HelpCenterController, { Props } from "./HelpCenterController";
import { BACK_ICON } from "../../studio-store-ecommerce-theme/src/AppAssets/appassets";
import TopHeader from "../../../components/src/TopHeader";
import styles from "./HelpCenterStyle";
import R from "../../../components/src/R";

// Customizable Area Start
// Customizable Area End

export default class HelpCenter extends HelpCenterController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  renderListItem = (item: any, index: number) => {
    return (
      // Customizable Area Start
      <TouchableOpacity
        key={index}
        style={styles.cellContainer}
        onPress={() =>
          this.props.navigation.navigate("HelpCenterData", {
            Title: item.attributes ? item.attributes.help_center_type : "",
            heading: item.attributes && item.attributes.title,
            description: item.attributes && item.attributes.description
          })
        }
      >
        <Text style={styles.itemText}>
          {item.attributes ? item.attributes.help_center_type : ""}
        </Text>
      </TouchableOpacity>
    );
    // Customizable Area End
  };

  renderItemSeparator = () => {
    // Customizable Area Start
    return <View style={styles.separatorView} />;
    // Customizable Area End
  };

  render() {
    return (
      // Customizable Area Start
      <SafeAreaView style={styles.container}>
        <TopHeader
          headerTitle={"Help Center"}
          onPressLeft={() => this.props.navigation.goBack()}
          headerLeftIconName={BACK_ICON}
          navigation={this.props.navigation}
          headerTitleStyle={{}}
          headerStyle={{}}
        />
        <View style={styles.listContainer}>
          <FlatList
            style={{ backgroundColor: R.colors.white }}
            data={this.state.helpCenterList}
            renderItem={({ item, index }) => this.renderListItem(item, index)}
            ItemSeparatorComponent={() => this.renderItemSeparator()}
          />
        </View>
      </SafeAreaView>
      // Customizable Area End
    );
  }
}
