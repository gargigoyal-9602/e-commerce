import React from "react";
import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ActivityIndicator,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Swipeout from "react-native-swipeout";
import TopHeader from "../../../components/src/TopHeader";
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";
import * as STR_CONST from "../../studio-store-ecommerce-theme/src/StringConstants";
import scale from "../../../framework/src/utils/Scale";
import moment from "moment";
import {
  deleteIcon,
  emptyNotificationImage,
  notificationBell,
  BACK_ICON,
} from "../../studio-store-ecommerce-theme/src/AppAssets/appassets";
import NotificationsController, { Props } from "./NotificationsController";
import styles from "./NotificationStyles";
const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");
// Customizable Area Start
// Customizable Area End

export default class Notifications extends NotificationsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Footer loader for Pagination
  _renderSearchResultsFooter = () => {
    // Customizable Area Start
    return this.state.pageLoader ? (
      <View>
        <ActivityIndicator size="large" color={"#000000"} />
      </View>
    ) : null;
    // Customizable Area End
  };

  renderNoNotificationsView = () => {
    // Customizable Area Start
    return (
      <View style={styles.noNotificationsContainer}>
        <View style={styles.emptyBoxContainer}>
          <Image
            source={emptyNotificationImage}
            style={styles.emptyNotifBox}
            resizeMode="cover"
          />
          <Text style={styles.noNotificationsText}>
            {STR_CONST.NO_NOTIFICATIONS_YET}
          </Text>
          <Text style={styles.browseText}>{STR_CONST.BROWSE_FOR_PRODUCTS}</Text>
        </View>
        <TouchableOpacity
          testID={"buttonContinueShopping"}
          onPress={() => this.props.navigation.navigate("Catalogue")}
        >
          <LinearGradient
            colors={[
              themeJson.attributes.common_button_color,
              themeJson.attributes.common_button_color,
              themeJson.attributes.common_button_color,
            ]}
            style={styles.continueShoppingButton}
          >
            <Text style={styles.continueText}>
              {STR_CONST.CONTINUE_SHOPPING}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
    // Customizable Area End
  };

  onPressDeleteItem = () => {
    // Customizable Area Start
    // Customizable Area End
  };

  getSwipeControl = (item: any) => {
    // Customizable Area Start
    return (
      <View style={styles.rightSwipeContainer}>
        <TouchableOpacity
          testID={"buttonNotificationDelete"}
          onPress={() => this.deleteNotification(item)}
          style={[styles.rightSwipeContainer]}
        >
          <Image style={styles.deleteIcon} source={deleteIcon} />
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
    // Customizable Area End
  };

  renderNotificationCell = (item: any, index: any) => {
    // Customizable Area Start
    const swipeoutBtns = [
      {
        component: this.getSwipeControl(item),
      },
    ];
    const created_at = moment(item.created_at).format("lll");
    return (
      <Swipeout
        close={!(this.state.index === index)}
        style={styles.cellSwiperView}
        autoClose
        right={swipeoutBtns}
        onOpen={() => {
          this.setState({
            index,
          });
        }}
        buttonWidth={scale(188)}
        onClose={() => {}}
      >
        <TouchableOpacity onLongPress={() => this.readNotification(item)}>
          <LinearGradient
            colors={
              !item.is_read
                ? [
                    COLOR_CONST.lightNotificationColor,
                    COLOR_CONST.newNotificationColor,
                  ]
                : [COLOR_CONST.white, COLOR_CONST.white]
            }
            style={[styles.cellContainer]}
          >
            <View style={styles.bellContainer}>
              <Image
                source={notificationBell}
                style={styles.notifIcon}
                resizeMode="cover"
              />
            </View>
            <View style={styles.dataContainer}>
              <View style={styles.row}>
                <Text style={styles.notificationHeader}>{item.title}</Text>
                <Text style={styles.days}>{created_at}</Text>
              </View>
              <Text style={styles.notificationDetail}>{item.message}</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Swipeout>
    );
    // Customizable Area End
  };

  renderNotificationListView = () => {
    // Customizable Area Start
    return (
      <View style={styles.listContainer}>
        <FlatList
          data={this.state.notificationList}
          extraData={this.state}
          renderItem={({ item, index }: any) =>
            this.renderNotificationCell(item.attributes, index)
          }
          onEndReachedThreshold={0.01}
          onEndReached={() => this.onEndReached()}
          ListFooterComponent={() => this._renderSearchResultsFooter()}
          onMomentumScrollBegin={() => this._onMomentumScrollBegin()}
        />
      </View>
    );
    // Customizable Area End
  };

  render() {
    return (
      //Merge Engine DefaultContainer
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
        <TopHeader
          headerTitle={"Notifications"}
          onPressLeft={() => this.props.navigation.goBack()}
          headerLeftIconName={BACK_ICON}
          navigation={this.props.navigation}
          headerTitleStyle={styles.topHeaderTitleStyle}
          headerTitleViewStyle={styles.topHeaderTitleViewStyle}
          headerRight={
            <TouchableOpacity
              style={styles.btnReadAll}
              onPress={() => this.readAllNotification()}
            >
              {this.state.showReadAll && (
                <Text style={styles.clearText}>Read all</Text>
              )}
            </TouchableOpacity>
          }
          headerStyle={{}}
        />
        {!this.state.noProductFound &&
          !this.state.isFetchingData &&
          this.renderNotificationListView()}
        {this.state.noProductFound && this.renderNoNotificationsView()}
      </SafeAreaView>
      //Merge Engine End DefaultContainer
    );
  }
  // Customizable Area Start
  // Customizable Area End
}

// Customizable Area Start
// Customizable Area End
