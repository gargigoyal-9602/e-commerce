import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import styles from './CategoryStyle';
import COLOR_CONST, { FONTS } from '../../../../blocks/studio-store-ecommerce-theme/src/AppFonts';
const themeJson = require('../../../../blocks/studio-store-ecommerce-theme/src/theme.json');

export const Category = (props: any) => {
  const renderListItem = (item: any, index: number) => {
    return (
      <TouchableOpacity onPress={() => props.onPressProductListing(item)} style={styles.categoryContainer}>
        <Image source={{ uri: item.attributes.product_image ? item.attributes.product_image.url : '' }} style={styles.categoryImage} />
        <Text style={styles.categoryText}>{item.attributes.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.listContainer}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}

          data={props.categoryList}
          renderItem={({ item, index }) => renderListItem(item, index)}
        />
        <TouchableOpacity onPress={() => { props.viewAll() }} style={[styles.categoryContainer]}>
          <View style={[styles.categoryView, { backgroundColor: themeJson.attributes.primary_color }]}>
            <Text style={[styles.categoryText, { color: COLOR_CONST.white }]}>View all</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
