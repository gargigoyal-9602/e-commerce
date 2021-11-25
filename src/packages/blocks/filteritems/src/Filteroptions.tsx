import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Dimensions,
  TextInput,
  FlatList,
  Image,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";
const windowWidth = Dimensions.get("window").width;
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import GreenButton from "../../../components/src/GreenButton";
import styles from "./FilterOptionStyle";
import scale from "../../../framework/src/utils/Scale";
import TopHeader from "../../../components/src/TopHeader";
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";
import * as IMG_CONST from "../../studio-store-ecommerce-theme/src/ImageConstants";

import CustomErrorModal from "../../../components/src/CustomErrorModal/CustomErrorModal";
import ApplicationLoader from "../../../components/src/AppLoader/AppLoader";

const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");

// Customizable Area Start
// Customizable Area End

import FilteroptionsController, {
  Props,
  //configJSON
} from "./FilteroptionsController";

export default class Filteroptions extends FilteroptionsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  renderPrice() {
    if (this.state.pricerange === true) {
      return (
        <View style={styles.rangeConatiner}>
          <Text style={styles.SelectPriceTitle}>Select a price range</Text>
          <View style={styles.rangeRow}>
            <Text style={styles.rangeText}>
              {themeJson.attributes.currency_type} {this.state.rangeLow}
            </Text>
            <Text style={styles.rangeText}>
              {themeJson.attributes.currency_type} {this.state.rangeHigh}
            </Text>
          </View>
          <View style={styles.rangeInnerConatiner}>
            <MultiSlider
              onValuesChange={(value) => {
                this.setState({ rangeLow: value[0], rangeHigh: value[1] });
              }}
              markerStyle={styles.sliderMarker}
              trackStyle={styles.sliderTracker}
              selectedStyle={styles.sliderSelected}
              sliderLength={windowWidth - 215}
              values={[this.state.rangeLow, this.state.rangeHigh]}
              min={this.state.rangeMin}
              max={this.state.rangeMax}
              enableLabel={false}
              step={1}
            />
          </View>
          <View style={styles.checkBoxContainer}>
            <TouchableOpacity onPress={() => this.onCheckDiscoutTrue()}>
              {this.state.discount ? (
                <Image
                  source={IMG_CONST.CHECKED}
                  style={styles.CheckIocnStyle}
                />
              ) : (
                <Image
                  source={IMG_CONST.UNCHECKED}
                  style={styles.CheckIocnStyle}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.DiscountedStyle}> Discounted Items </Text>
          </View>
        </View>
      );
    }
  }

  renderListItemCategory = (item: any) => {
    return (
      <View style={styles.CategoryFilterConatiner}>
        <TouchableOpacity onPress={() => this.onCheckPressCategory(item)}>
          {item.item.active ? (
            <Image source={IMG_CONST.CHECKED} style={styles.CheckIocnStyle} />
          ) : (
            <Image source={IMG_CONST.UNCHECKED} style={styles.CheckIocnStyle} />
          )}
        </TouchableOpacity>
        <Text
          style={[
            styles.labelTitle,
            {
              color: item.active
                ? COLOR_CONST.pastelRed
                : COLOR_CONST.charcoalGrey,
            },
          ]}
        >
          {this.state.subCategory ? item.item.name : item.item.attributes.name}
        </Text>
      </View>
    );
  };

  renderCategory() {
    if (this.state.category === true) {
      return (
        <View style={styles.CategoryConatiner}>
          <View style={styles.searchCatgeory}>
            <Image source={IMG_CONST.SEARCH} style={styles.searchImage} />
            <TextInput
              style={styles.TextInputStyle}
              placeholder="Search for a Category(s)"
              underlineColorAndroid="transparent"
              value={this.state.searchText}
              onChangeText={(value) => this.handleInputChange(value)}
            />
          </View>
          <View style={styles.starightLine} />
          <FlatList
            data={this.state.searchedCategoryFilterList}
            extraData={this.state}
            renderItem={this.renderListItemCategory}
          />
        </View>
      );
    }
  }

  renderListItem = (item: any) => {
    return (
      <View style={styles.BrandFilterConatiner}>
        <TouchableOpacity onPress={() => this.onCheckPressBrand(item)}>
          {item.item.active ? (
            <Image source={IMG_CONST.CHECKED} style={styles.CheckIocnStyle} />
          ) : (
            <Image source={IMG_CONST.UNCHECKED} style={styles.CheckIocnStyle} />
          )}
        </TouchableOpacity>
        <Text
          style={[
            styles.labelTitle,
            {
              color: item.active
                ? COLOR_CONST.pastelRed
                : COLOR_CONST.charcoalGrey,
            },
          ]}
        >
          {item.item.attributes.name}
        </Text>
      </View>
    );
  };

  renderTagsListItem = (item: any) => {
    return (
      <View style={styles.BrandFilterConatiner}>
        <TouchableOpacity onPress={() => this.onCheckPressTags(item)}>
          {item.item.active ? (
            <Image source={IMG_CONST.CHECKED} style={styles.CheckIocnStyle} />
          ) : (
            <Image source={IMG_CONST.UNCHECKED} style={styles.CheckIocnStyle} />
          )}
        </TouchableOpacity>
        <Text
          style={[
            styles.labelTitle,
            {
              color: item.active
                ? COLOR_CONST.pastelRed
                : COLOR_CONST.charcoalGrey,
            },
          ]}
        >
          {item.item.attributes.name}
        </Text>
      </View>
    );
  };

  renderBrand() {
    if (this.state.brand === true) {
      return (
        <View style={styles.BrandConatiner}>
          <View style={styles.searchCatgeory}>
            <Image source={IMG_CONST.SEARCH} style={styles.searchImage} />
            <TextInput
              style={styles.TextInputStyle}
              placeholder="Search for a Brand(s)"
              underlineColorAndroid="transparent"
              value={this.state.brandsText}
              onChangeText={(value) => this.handleInputChangeBrands(value)}
            />
          </View>
          <View style={styles.starightLine} />
          <FlatList
            data={this.state.searchedBrandsFilterList}
            extraData={this.state}
            renderItem={this.renderListItem}
          />
        </View>
      );
    }
  }
  renderTags() {
    if (this.state.tags === true) {
      return (
        <View style={styles.BrandConatiner}>
          <View style={styles.searchCatgeory}>
            <Image source={IMG_CONST.SEARCH} style={styles.searchImage} />
            <TextInput
              style={styles.TextInputStyle}
              placeholder="Search for a Tag(s)"
              underlineColorAndroid="transparent"
              value={this.state.tagsText}
              onChangeText={(value) => this.handleInputChangeTags(value)}
            />
          </View>
          <View style={styles.starightLine} />
          <FlatList
            data={this.state.searchedTagsFilterList}
            extraData={this.state}
            renderItem={this.renderTagsListItem}
          />
        </View>
      );
    }
  }

  render() {
    return (
      //Merge Engine DefaultContainer
      <SafeAreaView style={styles.container}>
        <TopHeader
          headerTitle={"Filter"}
          onPressLeft={() => this.props.navigation.goBack()}
          headerLeftIconName={IMG_CONST.BACK_ICON}
          headerRight={
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => this.clearFilterData()}
            >
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          }
          navigation={this.props.navigation}
          headerTitleStyle={{ marginLeft: scale(100) }}
          headerTitleViewStyle={{ width: scale(150) }}
        />
        <View style={styles.containerFilter}>
          <ApplicationLoader isFetching={this.state.isFetching} />
          <CustomErrorModal
            showModal={this.state.customErrorModal}
            message={this.state.customErrorMessage}
            hideErrorModal={() => this.setState({ customErrorModal: false })}
          />
          <View style={styles.LeftContainerFilter}>
            <TouchableOpacity
              testID={"buttonPriceRange"}
              style={[
                styles.leftContainerButton,
                {
                  backgroundColor: this.changeColor("price"),
                },
              ]}
              onPress={() => this._onPressChange("price")}
            >
              <Text style={styles.priceRangeTitle}>Price Range</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID={"buttonBrand"}
              style={[
                styles.leftContainerButton,
                { backgroundColor: this.changeColor("brand") },
              ]}
              onPress={() => this._onPressChange("brand")}
            >
              <Text style={styles.priceRangeTitle}>Brand</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID={"buttonTags"}
              style={[
                styles.leftContainerButton,
                { backgroundColor: this.changeColor("tags") },
              ]}
              onPress={() => this._onPressChange("tags")}
            >
              <Text style={styles.priceRangeTitle}>Tags</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID={"buttonCategory"}
              style={[
                styles.leftContainerButton,
                { backgroundColor: this.changeColor("category") },
              ]}
              onPress={() => this._onPressChange("category")}
            >
              <Text style={styles.priceRangeTitle}>Category</Text>
            </TouchableOpacity>
          </View>
          <View>
            {this.renderPrice()}
            {this.renderBrand()}
            {this.renderTags()}
            {this.renderCategory()}
          </View>
        </View>
        <View style={styles.ButtonConatiner}>
          <View style={styles.InnerConatiner}>
            <TouchableOpacity
              testID={"buttonCancel"}
              style={styles.buttonCustom}
              onPress={() => this.props.navigation.goBack()}
            >
              <Text style={styles.customTxtStyle}>CANCEL</Text>
            </TouchableOpacity>
            <GreenButton
              testID={"buttonApplyFilter"}
              title="APPLY FILTER"
              customStyle={styles.buttonCustom}
              customTxtStyle={styles.customTxtStyle}
              onPress={() => this.onPressApplyFilter()}
            />
          </View>
        </View>
      </SafeAreaView>
      //Merge Engine End DefaultContainer
    );
  }
  // Customizable Area Start
  // Customizable Area End
}
