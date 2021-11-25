import React from "react";
// Customizable Area Start
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  FlatList,
  SafeAreaView
} from "react-native";
// Customizable Area End
import styles from './SearchStyle';
import COLOR_CONST, { FONTS } from '../../studio-store-ecommerce-theme/src/AppFonts';
import { SEARCH_NO_RESULTS } from '../../studio-store-ecommerce-theme/src/AppAssets/appassets';
import scale, { verticalScale } from '../../../framework/src/utils/Scale';
import CustomErrorModal from "../../../components/src/CustomErrorModal/CustomErrorModal";
import SearchController, {
  Props
} from "./SearchController";
import FocusAwareStatusBar from '../../../components/src/FocusAwareStatusBar';  

export default class Search extends SearchController {
  constructor(props: Props) {
    super(props);
  }

  renderEmptyDataView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Image source={SEARCH_NO_RESULTS} style={styles.noResultImage} />
        <Text style={styles.noResultText}>No Results Found !</Text>
        <Text style={styles.tryText}>Try modifying your search to get relevant results.</Text>
      </View>
    )
  }

  renderSearchBar = () => {
    return (
      <View style={styles.SearchBarContainer}>
        <TextInput
          style={styles.TextStyles}
          autoFocus={this.state.showKeyBoard}
          value={this.state.searchData}
          onChangeText={(value) => this.setState({ searchData: value }, () => this.onSearchProduct())}
          placeholder="Search here.."
          underlineColorAndroid="transparent"
          placeholderTextColor={COLOR_CONST.charcoalGrey}
        />
      </View>
    )
  }
  renderListItem = (item: any) => {
    if (item.attributes.name !== '') {
      return (
        <TouchableOpacity key={item.id} onPress={() => this.onPressSearchData(item)}>
          <Text style={styles.itemStyle}>{item.attributes.name}</Text>
          <View style={styles.ViewStrightLine} />
        </TouchableOpacity>
      )
    }
  }

  renderRecentListItem = (item: any) => {
    return (
      <>
        {item.name && <TouchableOpacity onPress={() => this.onPressRecentSeacrhData(item)}>
          <Text style={styles.itemStyle}>{item.name}</Text>
          <View style={styles.ViewStrightLine} />
        </TouchableOpacity>}
      </>
    )
  }
  renderRecentSearch = () => {
    return (
      <View>
        {this.state.recentList && <View>
          <Text style={styles.recentText}>Recent Searches</Text>
          <View style={styles.recentContainer}>
            <FlatList
              extraData={this.state}
              data={this.state.recentList}
              renderItem={({ item, index }) => this.renderRecentListItem(item)}
            />
          </View>
        </View>}
      </View>
    )
  }

  renderSearchData = () => {
    return (
      <View style={this.state.searchList.length > 0 ? null : {}}>
        {this.state.productSearchList.length > 0 && <Text style={styles.recentText}>Products</Text>}
        <View style={styles.recentContainer}>
          <FlatList
            extraData={this.state}
            data={this.state.productSearchList}
            //@ts-ignore
            renderItem={({ item }) => this.renderListItem(item)}
          />
        </View>
        {this.state.categorySearchList?.length > 0 && <Text style={styles.recentText}>Categories</Text>}
        <View style={styles.recentContainer}>
          <FlatList
            extraData={this.state}
            data={this.state.categorySearchList}
            //@ts-ignore
            renderItem={({ item }) => this.renderListItem(item)}
          />
        </View>
        {this.state.subCategorySearchList?.length > 0 && <Text style={styles.recentText}>SubCategories</Text>}
        <View style={styles.recentContainer}>
          <FlatList
            extraData={this.state}
            data={this.state.subCategorySearchList}
            //@ts-ignore
            renderItem={({ item }) => this.renderListItem(item)}
          />
        </View>

      </View>
    )
  }

  renderListItemCat = (item: any) => {
    return (
      <TouchableOpacity onPress={() => this.onPressCategory(item)} style={[styles.categoryContainer]}>
        <View style={styles.categoryView}>
          <Image source={{ uri: item?.product_image.url }} style={styles.categoryImage} />
        </View>
        <Text style={styles.categoryText}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  renderCategory = () => {
    return (
      <View style={styles.listContainer}>
        {this.state.categoryList.length > 0 && <Text style={styles.recentText}>Categories</Text>}
        <View style={styles.listContainer}>
          <FlatList
            data={this.state.categoryList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }: any) => this.renderListItemCat(item.attributes)}
          />
        </View>

      </View>
    )
  }

  render() {
    return (
      //Merge Engine DefaultContainer
      <SafeAreaView style={styles.container}>
        <FocusAwareStatusBar barStyle="dark-content" backgroundColor={COLOR_CONST.white} isFocused={true} />
        <View style={{ height: verticalScale(50), backgroundColor: COLOR_CONST.white }}></View>
        {this.renderSearchBar()}
        {this.state.searchComplete && this.state.productSearchList.length === 0 && this.state.categorySearchList.length === 0 && this.state.subCategorySearchList.length === 0 ? this.renderEmptyDataView() :
          <ScrollView>
            {this.state.recentList?.length > 0 && this.state.searchData === '' && this.renderRecentSearch()}
            {this.state.searchData !== '' && this.renderSearchData()}
            {this.state.searchData === '' && this.renderCategory()}
          </ScrollView>}
        <CustomErrorModal showModal={this.state.showAlertModal} message={this.state.message}
          isShowError={this.state.isShowError} hideErrorModal={() => this.setState({ showAlertModal: false })} />
      </SafeAreaView>
      //Merge Engine End DefaultContainer
    );
  }
}

// Customizable Area Start
// Customizable Area End
