import React from "react";
// Customizable Area Start
import { SafeAreaView, FlatList, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Animatable from 'react-native-animatable';
// Customizable Area End
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import FocusAwareStatusBar from '../../../components/src/FocusAwareStatusBar';
import TopHeader from "../../../components/src/TopHeader";
import COLOR_CONST from '../../studio-store-ecommerce-theme/src/AppFonts';
import Scale, { verticalScale } from "../../../framework/src/utils/Scale";
import { CART_EMPTY_ICON, NOTIFICATIONS_ICON, COUPON_TICK, BACK_ICON } from '../../studio-store-ecommerce-theme/src/AppAssets/appassets';
import styles from './ShopingCartStyle';
import ShoppingcartController, { Props } from "./ShoppingcartController";
import ApplicationLoader from "../../../components/src/AppLoader/AppLoader";
import CustomErrorModal from "../../../components/src/CustomErrorModal/CustomErrorModal";
const themeJson = require('../../studio-store-ecommerce-theme/src/theme.json');

const staticString = require('./../../studio-store-ecommerce-translations/en.json')


export default class Shoppingcart extends ShoppingcartController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End
  renderEmptyDataView = () => {
    return (
      <View style={styles.emtpyAddressContainer}>
        <View style={styles.cartempty}>
          <Image
            source={CART_EMPTY_ICON}
            style={styles.emptyAddressIcon}
          />
          <Text style={styles.noAnyOrder}>{staticString.emptyCart}</Text>
          <Text style={styles.youhave}>{staticString.emptyCartSubText}</Text>
        </View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Catalogue")} >
          <LinearGradient colors={[themeJson.attributes.common_button_color, themeJson.attributes.common_button_color]}
            style={styles.loginButton}>
            <Text style={styles.loginText}>BROWSE PRODUCTS</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

  renderMyOrderCell = (item: any, index: number) => {
    let isProductVarient = item.attributes.catalogue_variant !== null;
    let productImage = '';
    if (isProductVarient) {
      item.attributes.catalogue_variant.attributes?.images.data.map((variant: any) => {
        if(variant.attributes.is_default){
          productImage = variant.attributes.url;
        } else {
          productImage = item.attributes.catalogue_variant.attributes?.images?.data[0]?.attributes?.url;
        }
      })
    }
    return (
      <View style={{}} key={item.id}>
        <TouchableOpacity
          onPress={() => this.onPressProduct(item)}
          style={styles.rowContainer}>
          <View style={styles.row}>
            <Image
              source={{ uri: productImage }}
              style={styles.productImage}
            />
            <View style={styles.middleInfo}>
              <Text style={styles.prodName}>{item.attributes.catalogue.attributes.name}</Text>
              {isProductVarient && (
                <View style={styles.changeRow}>
                  <Text style={styles.periodText}>
                    {this.getVarientString(
                      item.attributes.catalogue_variant.attributes.product_variant_properties,
                    )}
                  </Text>
                </View>
              )}
              <View style={styles.toolRow}>
                <Text style={styles.priceValue}>
                  {themeJson.attributes.currency_type}{' '} {item.attributes.unit_price}
                </Text>
                <View style={styles.tools}>
                  <TouchableOpacity
                    onPress={() => this.onUpdateCartValue(Number(item.attributes.quantity) - 1, item.attributes.catalogue_id,
                      item.attributes.catalogue_variant_id)}>
                    <Text style={styles.minus}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.count}>
                    {item.attributes.quantity}
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.onUpdateCartValue(Number(item.attributes.quantity) + 1, item.attributes.catalogue_id,
                      item.attributes.catalogue_variant_id)}>
                    <Text style={styles.plus}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={() => this.removeCartItem(item.attributes.catalogue_id, item.attributes.catalogue_variant_id)} style={styles.removeButton}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
            <View style={styles.vertical} />
            <TouchableOpacity onPress={() => this.addToWishlist(item.attributes.catalogue_id, item.attributes.catalogue_variant_id)} style={styles.removeButton}>
              <Text style={styles.moveWishlistText}>Move to Wishlist</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  renderMyOrderList = () => {
    return (
      <View style={styles.listContainer}>
        <FlatList
          data={this.state.cartList}
          extraData={this.state}
          renderItem={({ item, index }) => this.renderMyOrderCell(item, index)}
        />
      </View>
    );
  };
  renderBottomDetails = () => {
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
                <View style={styles.list} key={item.id}>
                  <Text style={styles.productName}>{item.attributes.catalogue.attributes.name}</Text>
                  <Text style={styles.price}>
                    {themeJson.attributes.currency_type}{' '}{item.attributes.total_price}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={styles.bottomDetails}>
            <View style={styles.tax}>
              <Text style={styles.productName}>Taxes</Text>
              <Text style={styles.price}>{themeJson.attributes.currency_type} {this.state.cartData.attributes.total_tax || 0.00}</Text>
            </View>
            <View style={styles.delivery}>
              <Text style={styles.productName}>Delivery Charges</Text>
              <Text style={styles.price}>
                {themeJson.attributes.currency_type}{' '}{this.state.cartData.attributes.shipping_total || 0.00}
              </Text>
            </View>
          </View>
          <View style={styles.bottomDetails}>
            {this.state.isValidCoupon && (
              <View style={styles.coupon}>
                <Text style={styles.couponText}>Coupon Applied</Text>
                <Text style={styles.couponPrice}>-{themeJson.attributes.currency_type} {this.state.cartData?.attributes?.applied_discount}</Text>
              </View>
            )}
            {this.state.isValidCoupon && (
              <Text style={styles.couponText}>{this.state.cartData?.attributes?.coupon?.attributes?.code}</Text>
            )}
            {!this.state.isCouponApplied && (
              <TouchableOpacity
                style={styles.applyCouponRow}
                onPress={() => this.setState({ showCouponCodeModal: true })}>
                <Text style={styles.applyCouponText}>{'Apply Coupon'}</Text>
                <Text style={styles.subText}>
                  Sub Total   {themeJson.attributes.currency_type} {this.state.cartData.attributes.sub_total}
                </Text>
              </TouchableOpacity>
            )}
            {this.state.isValidCoupon && (
              <TouchableOpacity
                onPress={() => this.setState({ showCouponCodeModal: true })}>
                <Text style={styles.changeCouponText}>Change Coupon</Text>
              </TouchableOpacity>
            )}
            {this.state.isValidCoupon && (
              <TouchableOpacity onPress={() => this.removeCoupon()}>
                <Text style={styles.changeCouponText}>Remove Coupon</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.bottomDetails}>
            <View style={styles.total}>
              <Text style={styles.couponText}>Total Amount</Text>
              <Text style={styles.couponPrice}>{themeJson.attributes.currency_type} {this.state.cartData.attributes.total}</Text>
            </View>
          </View>
        </View>
      );
    }
  };

  renderCouponCodeModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showCouponCodeModal}
        onRequestClose={() => {
          this.setState({ showCouponCodeModal: false, isCouponApplied: false, isValidCoupon: false });
        }}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'} contentContainerStyle={{ flex: 1 }}>
          <TouchableOpacity activeOpacity={1}
            onPress={() => {
              if(this.state.isCouponApplied && this.state.isValidCoupon) {
                this.setState({ showCouponCodeModal: false });
                return;
              }
              this.setState({ showCouponCodeModal: false, isCouponApplied: false, isValidCoupon: false })
            }
            } style={styles.modalContainer}>
            <TouchableOpacity activeOpacity={1} style={styles.popup}>
              <Text style={styles.enterCouponText}>Enter Coupon Code</Text>
              {this.state.isCouponApplied && this.state.isValidCoupon === false && (
                <Text style={styles.oopsText}>
                  {this.state.couponCodeErrorMsg}
                </Text>
              )}
              {this.state.isCouponApplied && this.state.isValidCoupon && (
                <Text style={styles.validText}>Great ! Coupon Code Applied</Text>
              )}
              <TextInput
                style={[styles.couponInput, {
                  marginTop: this.state.isCouponApplied && !this.state.isValidCoupon
                    ? verticalScale(16) : verticalScale(41)
                }]}
                placeholder="Enter your coupon code"
                autoCapitalize='characters'
                placeholderTextColor="#8b8f95"
                value={this.state.codeValue}
                {...this.codeTextInputProps}
              />
              {!this.state.isValidCoupon ? (
                <>
                  <TouchableOpacity onPress={() => {
                    this.applyCoupon()
                  }
                  } style={{ opacity: this.state.codeValue.trim() === '' ? 0.5 : 1 }}
                    disabled={this.state.codeValue.trim() === ''}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                      colors={[themeJson.attributes.common_button_color, themeJson.attributes.common_button_color,
                      themeJson.attributes.common_button_color]}
                      style={styles.continueShoppingButton}>
                      <Text style={styles.applyText}>{'APPLY COUPON'}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.setState({ showCouponCodeModal: false, isCouponApplied: false, isValidCoupon: false })}>
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                </>
              )
                :
                (
                  <TouchableOpacity
                    onPress={() => this.setState({ showCouponCodeModal: false })}>
                    <Animatable.Image
                      animation="bounceIn"
                      source={COUPON_TICK}
                      style={styles.couponTick}
                    />
                  </TouchableOpacity>

                )}
            </TouchableOpacity>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </Modal>
    );
  };

  renderGuestModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={this.state.showGuestModal}
        visible={this.state.showGuestModal}
        onRequestClose={() => {
          this.setState({ showGuestModal: false });
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => { }}
          style={styles.modalContainer1}>
          <View style={styles.popup1}>
            <Text style={styles.deleteAddress1}>
              Please Sign Up/Log In first
            </Text>
            <Text style={styles.areYouSure1}>
              You need an account to perform this action.
            </Text>
            <View style={styles.bottomPopupView1}>
              <TouchableOpacity
                style={{ flex: 1, alignItems: 'center' }}
                onPress={() => this.setState({ showGuestModal: false })}>
                <Text style={styles.cancelText1}>Cancel</Text>
              </TouchableOpacity>
              <View style={styles.verticalLine1} />
              <TouchableOpacity
                style={{ flex: 1, alignItems: 'center' }}
                onPress={() => {
                  this.handleGuest()
                }
                }>
                <Text style={styles.yesDelete1}>SIGN UP/LOG IN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };
  render() {
    return (
      //Merge Engine DefaultContainer
      <SafeAreaView style={styles.container}>
        <FocusAwareStatusBar barStyle="dark-content" backgroundColor={COLOR_CONST.white} isFocused={true} />
        <TopHeader
          headerTitle={"Cart"}
          onPressLeft={() => this.props.navigation.goBack()}
          headerLeftIconName={BACK_ICON}
          headerRightIcons={[
            {
              src: NOTIFICATIONS_ICON, onPress: () => { this.props.navigation.navigate("Notifications") },
              style: { marginLeft: Scale(40) }
            }
          ]}
          navigation={this.props.navigation}
          headerTitleStyle={{}}
          headerStyle={{}}
        />
        {!this.state.emptyCart ? (
          <>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              <ScrollView keyboardShouldPersistTaps={'always'}>
                {this.renderMyOrderList()}
                {this.renderBottomDetails()}
                {this.state.showCouponCodeModal && this.renderCouponCodeModal()}
              </ScrollView>
              <TouchableOpacity onPress={() => this.state.isGuestUser ?
                this.setState({ showGuestModal: true })
                :
                this.props.navigation.push("Checkout", { isFromCheckout: true, isFromBuyNow: false, buyNowCartID: null })}
              >
                <LinearGradient colors={[themeJson.attributes.common_button_color, themeJson.attributes.common_button_color]}
                  style={styles.loginButton}>
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
        <CustomErrorModal showModal={this.state.showAlertModal} message={this.state.message}
          isShowError={this.state.isShowError} hideErrorModal={() => this.setState({ showAlertModal: false })} />
      </SafeAreaView>

      //Merge Engine End DefaultContainer
    );
  }
}

// Customizable Area Start

// Customizable Area End
