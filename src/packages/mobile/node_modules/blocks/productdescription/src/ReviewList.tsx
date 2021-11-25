/****************************
REVIEW LIST SCREEN
*****************************/
import React from "react";
// Customizable Area Start
import { Image, SafeAreaView, Text, TouchableOpacity, View, FlatList } from "react-native";
import TopHeader from "../../../components/src/TopHeader";
import FocusAwareStatusBar from '../../../components/src/FocusAwareStatusBar';
import styles from './ReviewListStyle';
import R from "../../../components/src/R";
import Scale, { verticalScale } from "../../../framework/src/utils/Scale";
import COLOR_CONST, { FONTS } from '../../studio-store-ecommerce-theme/src/AppFonts';
import { BACK_ICON, SELECTED_STAR, UNSELECTED_STAR } from '../../studio-store-ecommerce-theme/src/AppAssets/appassets';

import ApplicationLoader from "../../../components/src/AppLoader/AppLoader";
import CustomErrorModal from "../../../components/src/CustomErrorModal/CustomErrorModal";

// Customizable Area End
import ReviewListController, {
  Props
} from "./ReviewListController";



export default class ReviewList extends ReviewListController {
  constructor(props: Props) {
    super(props);
  }

  renderReviewCell = (item: any, index: any) => {
    return (
      <View style={styles.reviewCell}>
        <View style={styles.nameRow}>
          <Text style={styles.reviewName}>{item.user_name}</Text>
          <Text style={styles.dateText}>{item.review_date}</Text>
        </View>
        <View style={styles.starListContainer}>
          {this.state.ratingList.map((starItem: any, index: any) => {
            return (
                <TouchableOpacity>
                    <Image source={index < item.rating ? SELECTED_STAR : UNSELECTED_STAR} style={styles.listStar} />
                </TouchableOpacity>
            )
          })}
        </View>
        <Text style={styles.reviewText}>{item.comment}</Text>
        <View style={styles.listHorizontalLine} />
      </View>
    )
  }

  renderReviewList = () => {
    return (
      <View style={styles.reviewListContainer}>
        <FlatList 
          data={this.state.reviewList}
          extraData={this.state}
          renderItem={({ item, index }: any) => this.renderReviewCell(item.attributes, index)}
        />
      </View>
    )
  }

  render() {

    return (
      <SafeAreaView style={styles.container}>
        <TopHeader
          headerTitle={"Product Rating"}
          onPressLeft={() => this.handleBackButtonClick()}
          headerLeftIconName={BACK_ICON}
          headerLeftIconStyle={{ resizeMode: "contain", width: Scale(12), height: verticalScale(20) }}
          navigation={this.props.navigation}
          headerTitleViewStyle={{ paddingLeft: "4%" }}
          headerTitleStyle={{}}
          headerStyle={{}}
        />
        <FocusAwareStatusBar barStyle="dark-content" backgroundColor={COLOR_CONST.white} isFocused={true} />
          {this.renderReviewList()}
        <ApplicationLoader isFetching={this.state.isFetching} />
        <CustomErrorModal showModal={this.state.showAlertModal} message={this.state.message}
          isShowError={this.state.isShowError} hideErrorModal={() => this.setState({ showAlertModal: false })} />
      </SafeAreaView>
    );
  }
}
