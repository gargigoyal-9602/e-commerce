import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Payments from "../../src/Payments";
import Hyperpay from "../../src/Hyperpay";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "Payments",
};
const hyperpayScreenProps = {
  navigation: navigation,
  id: "Hyperpay",
};

const feature = loadFeature("./__tests__/features/payments-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });
  test("User navigates to Hyperpay", ({ given, when, then }) => {
    let hyperpayTrackingDetails: ShallowWrapper;
    let hyperpayInst: Hyperpay;
    given("I am a User loading Hyperpay", () => {
      hyperpayTrackingDetails = shallow(<Hyperpay {...hyperpayScreenProps} />);
    });

    when("I navigate to the Hyperpay", () => {
      hyperpayInst = hyperpayTrackingDetails.instance() as Hyperpay;
    });
    then("Hyperpay will load with out errors", () => {
      expect(hyperpayTrackingDetails).toBeTruthy();
    });
    then("I can enter text with out errors", () => {
      let textInputComponent = hyperpayTrackingDetails.findWhere(
        (node) => node.prop("testID") === "textinputCVV"
      );
      textInputComponent.simulate("changeText", "textinputCVV");

      textInputComponent = hyperpayTrackingDetails.findWhere(
        (node) => node.prop("testID") === "textinputCardHolderName"
      );
      textInputComponent.simulate("changeText", "textinputCardHolderName");
      textInputComponent = hyperpayTrackingDetails.findWhere(
        (node) => node.prop("testID") === "textinputExpiry"
      );
      textInputComponent.simulate("changeText", "textinputExpiry");
      textInputComponent = hyperpayTrackingDetails.findWhere(
        (node) => node.prop("testID") === "textinputCardNumber"
      );
      textInputComponent.simulate("changeText", "textinputCardNumber");
    });
    then("I can select the submit button with with out errors", () => {
      let btnProceed = hyperpayTrackingDetails.findWhere(
        (node) => node.prop("testID") === "btnProceed"
      );
      btnProceed.simulate("press", "btnProceed");
      hyperpayInst.getCheckoutId("");
    });
    then("I can leave the screen with out errors", () => {
      hyperpayInst.componentWillUnmount();
      expect(hyperpayTrackingDetails).toBeTruthy();
    });
  });
  test("User navigates to payments", ({ given, when, then }) => {
    let PayementWrapper: ShallowWrapper;
    let instance: Payments;

    given("I am a User loading payments", () => {
      PayementWrapper = shallow(<Payments {...screenProps} />);
      expect(PayementWrapper).toBeTruthy();
      instance = PayementWrapper.instance() as Payments;

      const getOrdersAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getOrdersAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getOrdersAPI.messageId
      );
      getOrdersAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: [
          {
            id: "34",
            type: "order",
            attributes: {
              id: 34,
              order_number: "OD00000034",
              amount: null,
              account_id: 3,
              coupon_code_id: 1,
              delivery_address_id: null,
              sub_total: "19.99",
              total: "82.59",
              order_items: [
                {
                  id: "33",
                  type: "order_item",
                  attributes: {
                    id: 33,
                    order_id: 34,
                    quantity: 1,
                    unit_price: "19.99",
                    total_price: "19.99",
                    old_unit_price: null,
                    status: "in_cart",
                    catalogue_id: 24,
                    catalogue_variant_id: 24,
                  },
                },
              ],
            },
          },
        ],
      });
      instance.getOrdersAPICallId = getOrdersAPI.messageId;
      runEngine.sendMessage("Unit Test", getOrdersAPI);
    });

    when("I navigate to the payments", () => {
      instance = PayementWrapper.instance() as Payments;
    });

    then("payments will load with out errors", () => {
      expect(PayementWrapper).toBeTruthy();
    });

    then("I can enter text with out errors", () => {
      let textInputName = PayementWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputName"
      );
      textInputName.simulate("changeText", "Test");
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(PayementWrapper).toBeTruthy();
    });
  });

  test("User trying to make payment", ({ given, when, then }) => {
    let PayementWrapper: ShallowWrapper;
    let instance: Payments;

    given("I am a User loading payments", () => {
      PayementWrapper = shallow(<Payments {...screenProps} />);
    });

    when("I click on pay with razor pay", () => {
      instance = PayementWrapper.instance() as Payments;
      let btnRazorPay = PayementWrapper.findWhere(
        (node) => node.prop("testID") === "RazorPay"
      );
      btnRazorPay.simulate("press");
      instance.setState({ razorPayModal: true, name: "Test", Order_Id: "1" });
    });

    then("Payment should success", () => {
      expect(instance.checkout()).toBe(true);
      expect(instance.savePurchase("test", "test", "tets")).toBe(true);
      expect(PayementWrapper).toBeTruthy();
    });
  });
});
