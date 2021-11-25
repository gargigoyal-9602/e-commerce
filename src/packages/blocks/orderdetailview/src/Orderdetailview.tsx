import React from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  FlatList,
  Modal,
  SafeAreaView,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";

import OrderdetailviewController, { Props } from "./OrderdetailviewController";
import styles from "./OrderdetailiviewStyle";
import TopHeader from "../../../components/src/TopHeader";
import {
  TICK_ICON,
  DOT_ICON,
  DELIVERED,
  BACK_ICON,
  CART_BLACK_ICON,
} from "../../studio-store-ecommerce-theme/src/AppAssets/appassets";

import ApplicationLoader from "../../../components/src/AppLoader/AppLoader";
import CustomErrorModal from "../../../components/src/CustomErrorModal/CustomErrorModal";
import FocusAwareStatusBar from "../../../components/src/FocusAwareStatusBar";
import { capitalize } from "../../../framework/src/utils/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import scale from "../../../framework/src/utils/Scale";
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";

// Customizable Area Start
// Customizable Area End

const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");

export default class Orderdetailview extends OrderdetailviewController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  renderMyOrderCell = () => {
    const productDetails = this.state.productDetails;
    const orderDetails = this.state.orderDetails;
    const trackingDetails = this.state.trackingDetails;
    const { subscriptionOrders }: any = this.state;
    const orderData = this.props.navigation.state.params.orderData;
    const mainOrderData = this.props.navigation.state.params.mainOrderData
      .attributes;
    let isProductVarient = false;
    if (orderDetails.catalogue_variant) {
      isProductVarient = true;
    }

    let product_varient_images = orderDetails?.catalogue_variant;
    let productImage = "";

    if (
      product_varient_images?.attributes?.images?.data?.length > 0
    ) {
      productImage =
        orderDetails.catalogue_variant.attributes.images.data[0].attributes.url;
      orderDetails.catalogue_variant.attributes.images.data.map(
        (variant: any) => {
          if (variant.attributes.is_default) {
            productImage = variant.attributes.url;
          }
        }
      );
    } else {
      productImage = productDetails?.images.data[0].attributes.url;
    }

    return (
      // Customizable Area Start
      <View style={styles.rowContainer}>
        <View style={styles.row}>
          <Image source={{ uri: productImage }} style={styles.productImage} />
          <View style={styles.middleInfo}>
            <View style={styles.productRow}>
              <Text style={styles.productName}>
                {orderDetails.product_name}
              </Text>
              <Text style={styles.quantity}>
                Quantity :{" "}
                {orderDetails.subscription_package
                  ? orderDetails.subscription_quantity
                  : orderDetails.quantity}
              </Text>
            </View>
            {isProductVarient && (
              <View style={styles.changeRow}>
                <Text style={styles.periodText}>
                  {this.getVarientString(
                    orderDetails.catalogue_variant.attributes
                      .product_variant_properties
                  )}
                </Text>
              </View>
            )}
            <View style={styles.productRow}>
              <Text style={styles.orderText}>Ordered on: </Text>
              <Text style={styles.date}>
                {orderDetails?.order_date?.split(",")[1]}
              </Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceValue}>
                {themeJson.attributes.currency_type} {orderDetails.unit_price}
              </Text>
              {subscriptionOrders.length === 0 && (
                <View style={styles.placedRow}>
                  <View style={styles.greenDot} />
                  <Text style={styles.placedText}>
                    {trackingDetails && trackingDetails.length > 0 && trackingDetails[0]
                      ? trackingDetails[0].attributes.status === "new"
                        ? "confirmed"
                        : trackingDetails[0].attributes.status
                      : ""}
                  </Text>
                </View>
              )}
              {subscriptionOrders.length > 0 && (
                <View style={styles.placedRow}>
                  <Text style={styles.package}>
                    {orderData.preferred_delivery_slot
                      ? this.getSlotString(orderData.preferred_delivery_slot) +
                        ` ${orderData.preferred_delivery_slot} | `
                      : ""}
                  </Text>
                  <Text style={styles.period}>
                    {orderData.subscription_package.charAt(0).toUpperCase() +
                      orderData.subscription_package.slice(1)}{" "}
                    for {orderData.subscription_period} Month
                  </Text>
                </View>
              )}
            </View>
            <Text style={styles.subscriptionPriceValue}>
              Total Amount: {themeJson.attributes.currency_type}{" "}
              {mainOrderData?.total}
            </Text>
            {orderDetails.subscription_package && (
              <Text style={styles.subscriptionPriceValue}>
                Subscription Amount: {themeJson.attributes.currency_type}{" "}
                {orderDetails.total_price}
              </Text>
            )}
            <Text style={styles.trackingID}>
              Tracking ID:{" "}
              {trackingDetails && trackingDetails.length > 0 && trackingDetails[0].attributes
                ? trackingDetails[0].attributes.tracking_number
                : ""}{" "}
            </Text>
          </View>
        </View>
        <View style={styles.bottomPopupView} />
      </View>
      // Customizable Area End
    );
  };

  renderMyOrderDetailView = () => {
    const orderData = this.state.orderDetails;
    if (!orderData) {
      return;
    }

    return (
      // Customizable Area Start
      <View style={styles.myOrderDetailViewContainer}>
        <View style={styles.upperRow}>
          <View style={styles.leftItem}>
            <Text style={styles.orderNoText}>Order Number</Text>
            <Text style={styles.orderValue}>{orderData.order_number}</Text>
          </View>
          <View style={styles.rightItem}>
            <Text style={styles.orderNoText}>Order Date</Text>
            <Text style={styles.orderValue}>{orderData.order_date}</Text>
          </View>
        </View>
      </View>
      // Customizable Area End
    );
  };

  renderOrderStatusView = () => {
    const { subscriptionOrders } = this.state;
    const orderData = this.props.navigation.state.params.orderData;
    if (orderData.subscription_package) {
      if (subscriptionOrders.length > 0) {
        return this.renderSubsctionOrdersView();
      }
    } else {
      return this.renderCompleteOrderStatusView();
    }
  };

  renderSubsctionOrdersView = () => {
    const { subscriptionOrders, productDetails } = this.state;
    const orderData = this.props.navigation.state.params.orderData;

    let product_varient_images = orderData?.catalogue_variant;
    let productImage = "";

    if (product_varient_images?.images?.length > 0) {
      orderData.catalogue_variant.images.data.map((variant: any) => {
        if (variant.attributes.is_default) {
          productImage = variant.attributes.url;
        } else {
          productImage =
            orderData.catalogue_variant.images.data[0].attributes.urll;
        }
      });
    } else {
      productImage = productDetails?.images.data[0].attributes.url;
    }

    return (
      // Customizable Area Start
      <View style={styles.renderOrderStatusView}>
        <Text style={styles.orderStatus}>Order Status</Text>
        {subscriptionOrders.map((item: any) => (
          <View style={styles.statusView}>
            <View style={styles.OrderTickView}>
              <Image
                source={item.status === "delivered" ? TICK_ICON : DOT_ICON}
                style={styles.tickIcon}
              />
              <View style={styles.orderStatusVerticalLine} />
            </View>
            <View style={styles.orderRightInfo}>
              <View style={styles.rowContent}>
                <View style={styles.statusRow}>
                  <Text style={styles.statusHeading}>
                    {item.delivery_date.split(",")[1]}
                  </Text>
                  {item.status === "delivered" ? (
                    <Image source={DELIVERED} style={styles.deliveredIcon} />
                  ) : (
                    <Image source={DELIVERED} style={styles.pendingIcon} />
                  )}
                </View>
                <View style={styles.placedRow}>
                  <View style={styles.greenDot} />
                  <Text style={styles.statusText}>
                    {" "}
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Text>
                </View>
              </View>
              <View style={styles.orderProduct}>
                <Image
                  source={{ uri: productImage }}
                  style={styles.orderImage}
                />
                <View>
                  <Text style={styles.orderProductName}>
                    {orderData.product_name}
                  </Text>
                  <Text style={styles.package}>
                    {orderData.preferred_delivery_slot
                      ? this.getSlotString(orderData.preferred_delivery_slot) +
                        ` ${orderData.preferred_delivery_slot} | `
                      : ""}
                    <Text style={styles.period}>
                      {orderData.subscription_package.charAt(0).toUpperCase() +
                        orderData.subscription_package.slice(1)}{" "}
                      for {orderData.subscription_period} Month
                    </Text>
                  </Text>
                </View>
                <Text style={styles.orderQty}>
                  Quantity :{" "}
                  {orderData.subscription_package
                    ? orderData.subscription_quantity
                    : orderData.quantity}
                </Text>
              </View>
              <View style={styles.statusBottom}>
                <Text style={styles.orderQty}>Your order is {item.status}</Text>
                {item.status === "pending" && (
                  <TouchableOpacity
                    onPress={() => this.onPressCancelDelivery(item.id)}
                  >
                    <Text style={styles.orderCancel}>Cancel order</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        ))}
        {subscriptionOrders.length > 9 && (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("SubscriptionOrderList", {
                orderData: orderData,
              })
            }
          >
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        )}
      </View>
    );
    // Customizable Area End
  };

  renderOrderShippingAddressView = () => {
    if (!this.state.shippingAddressData) {
      return;
    }
    const {
      name,
      address,
      phone_number,
      flat_no,
      city,
      state,
    } = this.state.shippingAddressData;
    const isLogisiticEnabled = this.props.navigation.state.params.mainOrderData
      .attributes.logistics_ship_rocket_enabled;
    return (
      // Customizable Area Start
      <View style={styles.renderOrderStatusView}>
        <Text style={styles.orderStatus}>Shipping Address</Text>
        <View style={styles.addressView}>
          <Text style={styles.home}>{name}</Text>
          <>
            {isLogisiticEnabled ? (
              <Text style={styles.address}>{address}</Text>
            ) : (
              <Text style={styles.address}>
                {flat_no} {address}, {city} ({state})
              </Text>
            )}
          </>
          <Text style={styles.phoneNo}>Phone Number: {phone_number}</Text>
        </View>
      </View>
      // Customizable Area End
    );
  };
  renderStatusItem = ({ item, index }: any) => {
    const { status, order_date, order_datetime, message } = item.attributes;
    const trackingDetails = this.state.trackingDetails;
    let showBottomView = index != trackingDetails.length - 1;
    return (
      // Customizable Area Start
      <View style={styles.statusView}>
        <View style={styles.tickView}>
          {index == 0 ? (
            <Image source={TICK_ICON} style={styles.tickIcon} />
          ) : (
            <View style={[styles.tickIcon, styles.tickContent]}>
              <View style={styles.ticketArea} />
            </View>
          )}
          <View style={styles.ticketRightArea} />
        </View>

        <View style={styles.rightInfo}>
          <View style={styles.ticketRightContent}>
            <Text style={styles.placed}>
              {status === "new" ? "Confirmed" : capitalize(status.trim())}
            </Text>
            <Text style={styles.dateText}>{order_date}</Text>
          </View>
          <Text style={styles.orderPlaced}>{message}</Text>
          <Text style={styles.orderPlaced}>{order_datetime}</Text>
          {showBottomView ? <View style={{ height: scale(10) }} /> : null}
        </View>
      </View>
      // Customizable Area End
    );
  };

  renderCompleteOrderStatusView = () => {
    const trackingDetails = this.state.trackingDetails;
    if (!trackingDetails) {
      return;
    }
    return (
      // Customizable Area Start
      <View style={styles.renderOrderStatusView}>
        <Text style={styles.orderStatus}>Order Status</Text>
        <View style={styles.orderStatusContent}>
          {/**Order Info */}
          <FlatList
            data={trackingDetails}
            renderItem={this.renderStatusItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
      // Customizable Area End
    );
  };

  renderCancelOrderModal = () => {
    return (
      // Customizable Area Start
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showCancelOrderModal}
        onRequestClose={() => {
          this.setState({ showCancelOrderModal: false });
        }}
      >
        <TouchableOpacity
          testID={'buttonCancelOrderModalContent'}
          activeOpacity={1}
          onPress={() => {}}
          style={styles.modalContainer}
        >
          <View style={styles.popup}>
            <Text style={styles.deleteAddress}>Cancel Order</Text>
            <Text style={styles.areYouSure}>
              Are you sure you want to cancel order ?
            </Text>
            <View style={styles.bottomPopupView1}>
              <TouchableOpacity
                testID={'buttonCancelOrder'}
                style={styles.btnBottomPopup}
                onPress={() => this.setState({ showCancelOrderModal: false })}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <View style={styles.verticalLine} />
              <TouchableOpacity
              testID={'buttonConfirmOrder'}
                style={styles.btnBottomPopup}
                onPress={() =>
                  this.setState({ showCancelOrderModal: false }, () =>
                    this.cancelOrder()
                  )
                }
              >
                <Text style={styles.yesDelete}>Yes, Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      // Customizable Area End
    );
  };

  renderSubmitReviewModal = () => {
    return (
      // Customizable Area Start
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showSubmitReviewModal}
        onRequestClose={() => {
          this.setState({ showSubmitReviewModal: false });
        }}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={styles.modalContentContainer}
        >
          <TouchableOpacity
            testID={'buttonRatingContainer'}
            activeOpacity={1}
            onPress={() => {}}
            style={styles.modalContainer}
          >
            <View style={styles.reviewPopup}>
              <Text style={styles.deleteAddress}>Rate and Review</Text>
              <Text style={styles.areYouSure}>Rate our Product</Text>
              <View style={styles.starContainer}>
                {this.state.ratingList.map((item: any, index: number) => {
                  return (
                    <TouchableOpacity key={`rating-item-${index}`} onPress={() => this.onPressStar(item)}>
                      <Image
                        source={
                          item.isSelected
                            ? item.selectedStar
                            : item.unSelectedStar
                        }
                        style={styles.star}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
              <TextInput
                testID={'ratingInput'}
                style={styles.ratingInput}
                multiline={true}
                textAlignVertical={"top"}
                secureTextEntry={false}
                value={this.state.reviewText}
                placeholder="Write detailed review for product .."
                placeholderTextColor={COLOR_CONST.charcoalGrey}
                underlineColorAndroid="transparent"
                returnKeyType={"done"}
                onChangeText={(text) => this.setState({ reviewText: text })}
              />
              {this.state.isInvalidReview && (
                <Text style={styles.emptyText}>Review cannot be empty.</Text>
              )}
              <View style={styles.bottomPopupViewReview}>
                <TouchableOpacity
                  testID={'buttonRatingCancel'}
                  style={styles.btnBottomPopup}
                  onPress={() =>
                    this.setState({ showSubmitReviewModal: false })
                  }
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <View style={styles.verticalLine} />
                <TouchableOpacity
                  testID={'buttonRatingSubmit'}
                  style={styles.btnBottomPopup}
                  onPress={() => this.submitOrderReview()}
                >
                  <Text style={styles.yesDelete}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </Modal>
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
          headerTitle={"My Order"}
          onPressLeft={() => this.props.navigation.goBack()}
          headerLeftIconName={BACK_ICON}
          headerLeftIconStyle={styles.headerLeftIcon}
          headerRightIcons={[
            {
              src: CART_BLACK_ICON,
              onPress: () => {
                this.props.navigation.navigate("Shoppingcart");
              },
              cartHasProductFlag: this.state.cartHasProduct,
              style: { resizeMode: "contain", marginLeft: scale(35) },
            },
          ]}
          navigation={this.props.navigation}
          headerTitleViewStyle={styles.headerTitleView}
          headerTitleStyle={{}}
          headerStyle={{}}
        />
        <ScrollView>
          {!this.state.isFetching && (
            <>
              {this.renderMyOrderDetailView()}
              {this.renderMyOrderCell()}
              {this.renderOrderStatusView()}
              {this.renderOrderShippingAddressView()}
            </>
          )}
          {this.renderCancelOrderModal()}
          {this.renderSubmitReviewModal()}
        </ScrollView>
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
  // Customizable Area Start
  // Customizable Area End
}
