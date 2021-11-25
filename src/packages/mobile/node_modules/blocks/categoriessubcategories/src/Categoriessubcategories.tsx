import React from "react";
import {
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
  // Customizable Area Start
  // Customizable Area End
} from "react-native";
import TopHeader from "../../../components/src/TopHeader";
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";
import {
  CART_BLACK_ICON,
  DOWN_ARROW,
  RIGHT_ARROW,
  NOTIFICATIONS_ICON
} from "../../studio-store-ecommerce-theme/src/AppAssets/appassets";
import Scale from "../../../framework/src/utils/Scale";
import CategoriessubcategoriesController, {
  Props
} from "./CategoriessubcategoriesController";
import CustomErrorModal from "../../../components/src/CustomErrorModal/CustomErrorModal";
import ApplicationLoader from "../../../components/src/AppLoader/AppLoader";
import FocusAwareStatusBar from "../../../components/src/FocusAwareStatusBar";
import styles from "./CategoriessubcategoriesStyle";
// Customizable Area Start
// Customizable Area End

export default class Categoriessubcategories extends CategoriessubcategoriesController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  renderCategories = (mainItem: any) => {
    // Customizable Area Start
    return (
      <View key={mainItem.id} style={styles.containerFlex}>
        <View style={styles.tableBox}>
          <View style={styles.innerTableBox}>
            <TouchableOpacity
              onPress={() => this.navigateToFilters(mainItem, [], false)}
              style={styles.containerDirection}
            >
              <Image
                style={styles.catIcon}
                source={{
                  uri: mainItem.attributes.product_image
                    ? mainItem.attributes.product_image.url
                    : ""
                }}
              />
              <View style={styles.infoText}>
                <Text style={styles.labelText}>{mainItem.attributes.name}</Text>
              </View>
            </TouchableOpacity>
            {mainItem.attributes.sub_categories.length > 0 ? (
              <TouchableOpacity
                onPress={() => this.expand(mainItem.id)}
                style={{ paddingRight: Scale(30), paddingVertical: Scale(10) }}
              >
                <Image
                  style={styles.arrow}
                  source={mainItem.expand ? DOWN_ARROW : RIGHT_ARROW}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <View style={styles.innerExpendTable}>
          {mainItem.expand && (
            <FlatList
              data={mainItem.attributes.sub_categories}
              extraData={this.state}
              renderItem={({ item, index }) =>
                this.renderSubCategories(item, index, mainItem)
              }
            />
          )}
        </View>
      </View>
    );
    // Customizable Area End
  };

  renderSubCategories = (subItem: any, subIndex: number, item: any) => {
    // Customizable Area Start
    return (
      <TouchableOpacity
        onPress={() => this.navigateToFilters(item, subItem, true)}
        style={styles.innerExpendTableBox}
      >
        <Text key={subIndex} style={styles.infoSubText}>
          {subItem.name}
        </Text>
      </TouchableOpacity>
    );
    // Customizable Area End
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
          headerTitle={"Explore"}
          headerRightIcons={[
            {
              src: NOTIFICATIONS_ICON,
              onPress: () => {
                this.props.navigation.navigate("Notifications");
              }
            },
            {
              src: CART_BLACK_ICON,
              onPress: () => {
                this.props.navigation.navigate("Shoppingcart");
              },
              cartHasProductFlag: this.state.cartHasProduct
            }
          ]}
          navigation={this.props.navigation}
          headerLeftIconStyle={{}}
          headerTitleStyle={{}}
          headerStyle={{}}
        />
        <ScrollView>
          <View style={styles.mainTableContainer}>
            <FlatList
              data={this.state.categoriesArray}
              extraData={this.state}
              renderItem={({ item }) => this.renderCategories(item)}
            />
          </View>
        </ScrollView>
        <ApplicationLoader isFetching={this.state.isFetching} />
        <CustomErrorModal
          showModal={this.state.customErrorModal}
          message={this.state.customErrorMessage}
          hideErrorModal={() => this.setState({ customErrorModal: false })}
        />
      </SafeAreaView>
      // Customizable Area End
    );
  }
  // Customizable Area Start
  // Customizable Area End
}
