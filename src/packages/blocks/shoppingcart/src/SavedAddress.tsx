import React from "react";

import {
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";
import GreenButton from "../../../components/src/GreenButton";
import TopHeader from "../../../components/src/TopHeader";
import { BACK_ICON, TICK_ADDRESS, BLANK_ADDRESS, EMPTY_BUILDING, LOCATION_PIN } from '../../studio-store-ecommerce-theme/src/AppAssets/appassets';
import SavedAddressController, { Props } from "./SavedAddressController";
import styles from "./SavedAddressStyle";
import ApplicationLoader from "../../../components/src/AppLoader/AppLoader";
import CustomErrorModal from "../../../components/src/CustomErrorModal/CustomErrorModal";
const staticString = require('./../../studio-store-ecommerce-translations/en.json')

// Customizable Area Start
// Customizable Area End

export default class SavedAddress extends SavedAddressController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderEmptyAddressView = () => {
    return (
      <View style={styles.emptyView}>
        <View>
          <Image source={EMPTY_BUILDING} style={styles.emptyBuilding} />
          <Text style={styles.noAddressSaved}>{staticString.emptyAddress}</Text>
          <Text style={styles.noAddressDetail}>
            {staticString.emptyAddressSubText}
          </Text>
        </View>
        <GreenButton
          title="ADD AN ADDRESS"
          customStyle={styles.loginButton}
          customTxtStyle={styles.loginText}
          onPress={() =>
            this.props.navigation.navigate("EditAddress", {
              isFromEdit: false,
              isFirst: true
            })
          }
        />
      </View>
    );
  };

  renderAddressCell = (item: any, index: number) => {
    return (
      <View key={index} style={styles.cellContainer}>
        <TouchableOpacity
          style={styles.upperContainer}
          onPress={() => this.onPressProduct(item)}
        >
          <View style={styles.locationPin}>
            <Image source={LOCATION_PIN} style={styles.locationIcon} />
          </View>
          <View>
            <Text style={styles.addressName}>{item.attributes.name}</Text>
            <Text style={styles.addressText}>
              {item.attributes.flat_no} {item.attributes.address},
              {item.attributes.city} {item.attributes.zip_code}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <View style={styles.bottomView}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("EditAddress", {
                isFromEdit: true,
                addressData: item.attributes
              })
            }
          >
            <Text style={styles.edit}>Edit</Text>
          </TouchableOpacity>
          <View style={styles.verticalLine} />
          <TouchableOpacity
            onPress={() =>
              this.setState({
                selectedAddressData: item,
                showDeleteModal: true
              })
            }
          >
            <Text style={styles.delete}>Delete</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() =>
            this.setState({
              selectedAddressData: item,
              showUpdateAddressModal: true
            })
          }
          style={styles.tickStatus}
        >
          <Image
            source={
              !item.attributes.is_default
                ? BLANK_ADDRESS
                : TICK_ADDRESS
            }
            style={styles.tickAddress}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderAddressList = () => {
    return (
      <View style={styles.listContainer}>
        <FlatList
          data={this.state.addressList}
          extraData={this.state}
          renderItem={({ item, index }) => this.renderAddressCell(item, index)}
          ListFooterComponent={() => {
            return (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("EditAddress", {
                    isFromEdit: false
                  })
                }
              >
                <Text style={styles.addNewAddress}>Add New Address</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  };
  renderDeleteModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showDeleteModal}
        onRequestClose={() => {
          this.setState({ showDeleteModal: false });
        }}
      >
        <TouchableOpacity activeOpacity={1} style={styles.modalContainer}>
          <View style={styles.popup}>
            <Text style={styles.deleteAddress}>Delete Address</Text>
            <Text style={styles.areYouSure}>
              Are you sure you want to delete the address ?
            </Text>
            <View style={styles.bottomPopupView}>
              <TouchableOpacity
                onPress={() => this.setState({ showDeleteModal: false })}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <View style={styles.verticalLine} />
              <TouchableOpacity
                onPress={() =>
                  this.setState({ showDeleteModal: false }, () =>
                    this.deleteAddress(this.state.selectedAddressData.id)
                  )
                }
              >
                <Text style={styles.yesDelete}>Yes, Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  renderUpdateAddressModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showUpdateAddressModal}
        onRequestClose={() => {
          this.setState({ showUpdateAddressModal: false });
        }}
      >
        <TouchableOpacity activeOpacity={1} style={styles.modalContainer}>
          <View style={styles.popup}>
            <Text style={styles.deleteAddress}>Default Address</Text>
            <Text style={styles.areYouSure}>
              Are you sure you want to change your default address ?
            </Text>
            <Text style={styles.newDefaultAddress}>New Default Address</Text>
            {this.state.selectedAddressData != null && (
              <Text style={styles.defaultAddress}>
                {this.state.selectedAddressData.attributes.flat_no}{" "}
                {this.state.selectedAddressData.attributes.address},
                {this.state.selectedAddressData.attributes.city}{" "}
                {this.state.selectedAddressData.attributes.zip_code}
              </Text>
            )}
            <View style={styles.bottomPopupView1}>
              <TouchableOpacity
                onPress={() => this.setState({ showUpdateAddressModal: false })}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <View style={styles.verticalLine} />
              <TouchableOpacity
                onPress={() =>
                  this.updateAddressData(
                    this.state.selectedAddressData.attributes,
                    true
                  )
                }
              >
                <Text style={styles.yesDelete}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <SafeAreaView style={styles.container}>
        <TopHeader
          headerTitle={"Saved Addresses"}
          onPressLeft={() => this.props.navigation.goBack()}
          headerLeftIconName={BACK_ICON}
          navigation={this.props.navigation}
          headerTitleStyle={{}}
          headerStyle={{}}
        />
        <View style={styles.innerContainer}>
          {!this.state.isFetching && (
            <>
              {this.state.addressList.length === 0 &&
                this.renderEmptyAddressView()}
              {this.state.addressList.length !== 0 && this.renderAddressList()}
            </>
          )}
          {false && (
            <GreenButton
              title="CONTINUE"
              customStyle={styles.loginButton}
              customTxtStyle={styles.loginText}
            />
          )}
        </View>
        {this.renderDeleteModal()}
        {this.renderUpdateAddressModal()}

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