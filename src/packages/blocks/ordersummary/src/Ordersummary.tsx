import React from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView
  // Customizable Area Start
  // Customizable Area End
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
import TopHeader from "../../../components/src/TopHeader";
import COLOR_CONST from "../../studio-store-ecommerce-theme/src/AppFonts";
import Scale from "../../../framework/src/utils/Scale";
import {
  RADIO_SELECTED,
  RADIO_UNSELECTED,
  BACK_ICON,
  NOTIFICATIONS_ICON
} from "../../studio-store-ecommerce-theme/src/AppAssets/appassets";

import styles from "./OrdersummaryStyles";
import OrdersummaryController, { Props } from "./OrdersummaryController";

const themeJson = require("../../studio-store-ecommerce-theme/src/theme.json");
import ApplicationLoader from "../../../components/src/AppLoader/AppLoader";
import CustomErrorModal from "../../../components/src/CustomErrorModal/CustomErrorModal";
import FocusAwareStatusBar from "../../../components/src/FocusAwareStatusBar";
// Customizable Area Start
// Customizable Area End

export default class Ordersummary extends OrdersummaryController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  renderEmptyDataView = () => {
    return (
      // Customizable Area Start
      <View style={styles.emtpyAddressContainer}>
        <View style={styles.cartempty}>
          <Text style={styles.noAnyOrder}>Your cart is empty !</Text>
          <Text style={styles.youhave}>
            You haven’t added any items in your cart yet !
          </Text>
        </View>
      </View>
      // Customizable Area End
    );
  };

  renderMyOrderCell = (item: any, _: number) => {
    let isProductVarient = item.attributes.catalogue_variant !== null;
    let productImage = "";
    if (
      isProductVarient &&
      item.attributes.catalogue_variant.attributes &&
      item.attributes.catalogue_variant.attributes.images &&
      item.attributes.catalogue_variant.attributes.images.data
    ) {
      item.attributes.catalogue_variant.attributes.images.data.map(
        (variant: any) => {
          if (variant.attributes.is_default) {
            productImage = variant.attributes.url;
          } else if (
            item.attributes.catalogue_variant.attributes.images.data.length >
              0 &&
            item.attributes.catalogue_variant.attributes.images.data[0]
              .attributes &&
            item.attributes.catalogue_variant.attributes.images.data[0]
              .attributes.url
          ) {
            productImage =
              item.attributes.catalogue_variant.attributes.images.data[0]
                .attributes.url;
          }
        }
      );
    }
    return (
      // Customizable Area Start
      <View style={{}}>
        <View style={styles.rowContainer}>
          <View style={styles.row}>
            <Image source={{ uri: productImage }} style={styles.productImage} />
            <View style={styles.middleInfo}>
              <Text style={styles.prodName}>
                {item.attributes.catalogue.attributes.name}
              </Text>
              {isProductVarient && (
                <View style={styles.changeRow}>
                  <Text style={styles.periodText}>
                    {this.getVarientString(
                      item.attributes.catalogue_variant.attributes
                        .product_variant_properties
                    )}
                  </Text>
                </View>
              )}
              <View style={styles.toolRow}>
                <Text style={styles.priceValue}>
                  {themeJson.attributes.currency_type}{" "}
                  {item.attributes.unit_price}
                </Text>
                <View style={styles.tools}>
                  <View>
                    <Text style={styles.minus}>Quantity: </Text>
                  </View>
                  <Text style={styles.count}>{item.attributes.quantity}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      // Customizable Area End
    );
  };

  renderMyOrderList = () => {
    // Customizable Area Start
    return (
      <View style={styles.listContainer}>
        <FlatList
          data={this.state.cartList}
          extraData={this.state}
          renderItem={({ item, index }) => this.renderMyOrderCell(item, index)}
        />
      </View>
    );
    // Customizable Area End
  };

  renderBottomDetails = () => {
    // Customizable Area Start
    if (this.state.cartList) {
      return (
        <View>
          <View style={styles.bottomDetails}>
            <View style={styles.headerCart}>
              <Text style={styles.yourCart}>Your Cart</Text>
              <Text style={styles.amountText}>Amount</Text>
            </View>
            {this.state.cartList.map((item: any) => {
              return (
                <View style={styles.list}>
                  <Text style={styles.productName}>
                    {item.attributes.catalogue.attributes.name}
                  </Text>
                  <Text style={styles.price}>
                    {themeJson.attributes.currency_type}{" "}
                    {item.attributes.total_price}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={styles.bottomDetails}>
            <View style={styles.tax}>
              <Text style={styles.productName}>Taxes</Text>
              <Text style={styles.price}>
                {themeJson.attributes.currency_type}{" "}
                {this.state.cartData.attributes.total_tax}
              </Text>
            </View>
            <View style={styles.delivery}>
              <Text style={styles.productName}>Delivery Charges</Text>
              <Text style={styles.price}>
                {themeJson.attributes.currency_type}{" "}
                {this.state.cartData.attributes.shipping_total}
              </Text>
            </View>
          </View>
          <View style={styles.bottomDetails}>
            {this.state.isValidCoupon && (
              <View style={styles.coupon}>
                <Text style={styles.couponText}>Coupon Applied</Text>
                <Text style={styles.couponPrice}>
                  -{themeJson.attributes.currency_type}{" "}
                  {this.state.cartData &&
                  this.state.cartData.attributes &&
                  this.state.cartData.attributes.applied_discount
                    ? this.state.cartData.attributes.applied_discount
                    : ""}
                </Text>
              </View>
            )}
            {this.state.isValidCoupon && (
              <Text style={styles.couponText}>{this.state.codeValue}</Text>
            )}
            {!this.state.isCouponApplied && (
              <TouchableOpacity style={styles.applyCouponRow}>
                <Text style={styles.couponText}>Sub Total</Text>
                <Text style={styles.subText}>
                  {themeJson.attributes.currency_type}{" "}
                  {this.state.cartData.attributes.sub_total}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.bottomDetails}>
            <View style={styles.total}>
              <Text style={styles.couponText}>Total Amount</Text>
              <Text style={styles.couponPrice}>
                {themeJson.attributes.currency_type}{" "}
                {this.state.cartData.attributes.total}
              </Text>
            </View>
          </View>
        </View>
      );
    }
    // Customizable Area End
  };

  renderShippingAddress = () => {
    // Customizable Area Start
    if (this.state.shippingAddressData) {
      const { address, flat_no, city, state } = this.state.shippingAddressData;
      return (
        <View style={styles.addressContainer}>
          <View style={styles.shippingContainer}>
            <Text style={styles.shippingAddress}>Shipping Address</Text>
          </View>
          {this.state.shippingAddressData ? (
            <View style={styles.shippingAddressContainer}>
              <Text style={styles.shippingAddressdata}>
                {flat_no} {address}, {city} ({state})
              </Text>
            </View>
          ) : (
            <View style={styles.emtpyShipping}>
              <Text style={styles.shippingAddressdata}>
                Please add your address
              </Text>
            </View>
          )}
        </View>
      );
    } else {
      return (
        <View style={styles.addressContainer}>
          <View style={styles.shippingContainer}>
            <Text style={styles.shippingAddress}>Shipping Address</Text>
          </View>
          <View style={styles.emtpyShipping}>
            <Text style={styles.shippingAddressdata}>
              Please add your address
            </Text>
          </View>
        </View>
      );
    }
    // Customizable Area End
  };

  renderBillingAddress = () => {
    // Customizable Area Start
    if (this.state.billingAddressData) {
      const { address, flat_no, city, state } = this.state.billingAddressData;
      return (
        <View style={styles.addressContainer}>
          <View style={styles.shippingContainer}>
            <Text style={styles.shippingAddress}>Billing Address</Text>
          </View>
          {this.state.billingAddressData ? (
            <View style={styles.shippingAddressContainer}>
              <Text style={styles.shippingAddressdata}>
                {flat_no} {address}, {city} ({state})
              </Text>
            </View>
          ) : (
            <View style={styles.emtpyShipping}>
              <Text style={styles.shippingAddressdata}>
                Please add your address
              </Text>
            </View>
          )}
        </View>
      );
    } else {
      return (
        <View style={styles.addressContainer}>
          <View style={styles.shippingContainer}>
            <Text style={styles.shippingAddress}>Billing Address</Text>
          </View>
          <View style={styles.emtpyShipping}>
            <Text style={styles.shippingAddressdata}>
              Please add your address
            </Text>
          </View>
        </View>
      );
    }
    // Customizable Area End
  };
  renderPaymentOption = () => {
    // Customizable Area Start
    const currencyType = themeJson.attributes.currency_type;
    return (
      <View style={styles.addressContainer}>
        <View style={styles.shippingContainer}>
          <Text style={styles.shippingAddress}>Payment Option</Text>
        </View>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            testID={'buttonPaymentCOD'}
            onPress={() =>
              this.setState({
                isPaymentOption1Selected: !this.state.isPaymentOption1Selected,
                isPaymentOption2Selected: false,
                isPaymentOption3Selected: false
              })
            }
            style={styles.innerRow}
          >
            <Image
              source={
                this.state.isPaymentOption1Selected
                  ? RADIO_SELECTED
                  : RADIO_UNSELECTED
              }
            />
            <Text style={styles.paymentOption}>COD</Text>
          </TouchableOpacity>
          {currencyType === "INR" && (
            <TouchableOpacity
              testID={'buttonPaymentRazor'}
              onPress={() =>
                this.setState({
                  isPaymentOption2Selected: !this.state
                    .isPaymentOption2Selected,
                  isPaymentOption1Selected: false,
                  isPaymentOption3Selected: false
                })
              }
              style={styles.middleRow}
            >
              <Image
                source={
                  this.state.isPaymentOption2Selected
                    ? RADIO_SELECTED
                    : RADIO_UNSELECTED
                }
              />
              <Text style={styles.paymentOption}>PAY WITH RAZORPAY</Text>
            </TouchableOpacity>
          )}
          {currencyType !== "INR" && (
            <TouchableOpacity
              testID={'buttonPaymentStripe'}
              onPress={() =>
                this.setState({
                  isPaymentOption2Selected: !this.state
                    .isPaymentOption2Selected,
                  isPaymentOption1Selected: false,
                  isPaymentOption3Selected: false
                })
              }
              style={styles.middleRow}
            >
              <Image
                source={
                  this.state.isPaymentOption2Selected
                    ? RADIO_SELECTED
                    : RADIO_UNSELECTED
                }
              />
              <Text style={styles.paymentOption}>PAY WITH STRIPE</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
    // Customizable Area End
  };

  renderGuestModal = () => {
    // Customizable Area Start
    return (
      <Modal
        animationType="slide"
        transparent={this.state.showGuestModal}
        visible={this.state.showGuestModal}
        onRequestClose={() => {
          this.setState({ showGuestModal: false });
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {}}
          style={styles.modalContainer1}
        >
          <View style={styles.popup1}>
            <Text style={styles.deleteAddress1}>
              Please Sign Up/Log In first
            </Text>
            <Text style={styles.areYouSure1}>
              You need an account to perform this action.
            </Text>
            <View style={styles.bottomPopupView1}>
              <TouchableOpacity
                testID={'buttonGuestCancel'}
                style={styles.btnBottomPopup}
                onPress={() => this.setState({ showGuestModal: false })}
              >
                <Text style={styles.cancelText1}>Cancel</Text>
              </TouchableOpacity>
              <View style={styles.verticalLine1} />
              <TouchableOpacity
                testID={'buttonGuestStart'}
                style={styles.btnBottomPopup}
                onPress={() =>
                  this.setState({ showGuestModal: false }, () =>
                    this.props.navigation.replace("Auth", { fromCart: true })
                  )
                }
              >
                <Text style={styles.yesDelete1}>SIGN UP/LOG IN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
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
          headerTitle={"Order Summary"}
          onPressLeft={() => this.releaseShippingChargeCalculation()}
          headerLeftIconName={BACK_ICON}
          headerRightIcons={[
            {
              src: NOTIFICATIONS_ICON,
              onPress: () => {
                this.props.navigation.navigate("Notifications");
              },
              style: { marginLeft: Scale(40) }
            }
          ]}
          navigation={this.props.navigation}
          headerTitleStyle={{}}
          headerStyle={{}}
        />
        {!this.state.emptyCart ? (
          <>
            <View style={styles.emptyCartContent}>
              <ScrollView keyboardShouldPersistTaps={"always"}>
                {this.renderMyOrderList()}
                {this.renderBottomDetails()}
                {this.renderShippingAddress()}
                {this.renderBillingAddress()}
                {this.renderPaymentOption()}
              </ScrollView>
              <TouchableOpacity
                disabled={
                  !this.state.isPaymentOption1Selected &&
                  !this.state.isPaymentOption2Selected
                }
                onPress={() =>
                  this.state.token === ""
                    ? this.setState({
                        showGuestModal: true
                      })
                    : this.saveAddress()
                }
              >
                <LinearGradient
                  colors={[
                    themeJson.attributes.common_button_color,
                    themeJson.attributes.common_button_color
                  ]}
                  style={[
                    styles.loginButton,
                    {
                      opacity:
                        this.state.isPaymentOption1Selected ||
                        this.state.isPaymentOption2Selected
                          ? 1
                          : 0.5
                    }
                  ]}
                >
                  <Text style={styles.loginText}>PROCEED</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          this.renderEmptyDataView()
        )}
        {this.renderGuestModal()}
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
