import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import * as helpers from "../../../../framework/src/Helpers";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import Ordermanagement from "../../src/Ordermanagement";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    addListener: jest.fn(),
  },
  id: "Ordermanagement",
};

jest.useFakeTimers();

const feature = loadFeature(
  "./__tests__/features/ordermanagement-scenario.feature"
);

const mockOrderItem = {
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
          product_images: [
            {
              url: "",
            },
          ],
        },
      },
    ],
  },
};

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to ordermanagement", ({ given, when, then }) => {
    let OrderWrapper: ShallowWrapper;
    let instance: Ordermanagement;

    given("I am a User loading ordermanagement", () => {
      OrderWrapper = shallow(<Ordermanagement {...screenProps} />);
      expect(OrderWrapper).toBeTruthy();
      expect(OrderWrapper).toMatchSnapshot();
    });

    when("I navigate to the ordermanagement", () => {
      instance = OrderWrapper.instance() as Ordermanagement;
    });

    then("ordermangement will mount and preload data", () => {
      instance = OrderWrapper.instance() as Ordermanagement;
      instance.componentDidMount();
      instance.getMyOrderListData();
    });

    then("ordermangement will load order list without errors", () => {
      const getOrdersAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getOrdersAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getOrdersAPI.messageId
      );
      getOrdersAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: {
          order: {
            data: [mockOrderItem],
          },
        },
      });
      instance.getMyOrdersListAPICallID = getOrdersAPI.messageId;
      runEngine.sendMessage("Unit Test", getOrdersAPI);
    });

    then("ordermanagement will load with out errors", () => {
      expect(OrderWrapper).toBeTruthy();
      expect(OrderWrapper).toMatchSnapshot();
    });

    then("ordermangement failed to load order list", () => {
      const msgLoadDataErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataErrorRestAPI
      );
      msgLoadDataErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [{}],
        }
      );

      msgLoadDataErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataErrorRestAPI.messageId
      );
      instance.getMyOrdersListAPICallID = msgLoadDataErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataErrorRestAPI);
    });

    then("ordermanagement will render empty address view", () => {
      instance = OrderWrapper.instance() as Ordermanagement;
      instance.setState({ noProductFound: true });
      expect(OrderWrapper).toBeTruthy();
      expect(OrderWrapper).toMatchSnapshot();
    });

    then("ordermanagement will render order cell", () => {
      instance = OrderWrapper.instance() as Ordermanagement;
      expect(OrderWrapper).toBeTruthy();
      expect(OrderWrapper).toMatchSnapshot();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(OrderWrapper).toBeTruthy();
      expect(OrderWrapper).toMatchSnapshot();
    });
  });

  test("User cancel an order", ({ given, when, then }) => {
    let OrderWrapper: ShallowWrapper;
    let instance: Ordermanagement;

    given("I am a User attempting to cancel an order", () => {
      OrderWrapper = shallow(<Ordermanagement {...screenProps} />);
      expect(OrderWrapper).toBeTruthy();
      expect(OrderWrapper).toMatchSnapshot();
    });
    when("I click on cancel order", () => {
      instance = OrderWrapper.instance() as Ordermanagement;
      instance.setState({
        // activeOrderId: 1,
        // activeItemId: 1,
        showCancelOrderModal: true,
        // isCancelVisible: !instance.state.isCancelVisible
      });
      expect(OrderWrapper).toBeTruthy();
      expect(OrderWrapper).toMatchSnapshot();
    });
    then("I click on yes", () => {
      instance = OrderWrapper.instance() as Ordermanagement;
      let btnCancelOrder = OrderWrapper.findWhere(
        (node) => node.prop("testID") === "btnCancelOrder"
      );
      btnCancelOrder.simulate("press");
      // expect(instance.cancelOrderDataRequest()).toBe(true);
      expect(OrderWrapper).toBeTruthy();
      expect(OrderWrapper).toMatchSnapshot();
    });
    then("Rest Api will return success response", () => {
      const cancelOrderSucessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      cancelOrderSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        cancelOrderSucessRestAPI.messageId
      );
      cancelOrderSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message: "Order cancelled successfully",
        }
      );
      instance.cancelOrderAPICallID = cancelOrderSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", cancelOrderSucessRestAPI);
    });
    then("ordermangement failed to cancel order", () => {
      const msgCancelOrderErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgCancelOrderErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgCancelOrderErrorRestAPI
      );
      msgCancelOrderErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [{}],
        }
      );

      msgCancelOrderErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgCancelOrderErrorRestAPI.messageId
      );
      instance.cancelOrderAPICallID = msgCancelOrderErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgCancelOrderErrorRestAPI);
    });
  });

  test("User submit order review", ({ given, when, then }) => {
    let OrderWrapper: ShallowWrapper;
    let instance: Ordermanagement;

    given("I am a User attempting to submit order review", () => {
      OrderWrapper = shallow(<Ordermanagement {...screenProps} />);
      expect(OrderWrapper).toBeTruthy();
      expect(OrderWrapper).toMatchSnapshot();
    });

    when("Show submit review modal", () => {
      instance = OrderWrapper.instance() as Ordermanagement;
      instance.setState({
        showSubmitReviewModal: true,
      });
      expect(OrderWrapper).toBeTruthy();
      expect(OrderWrapper).toMatchSnapshot();
    });

    then("Change rating input value", () => {
      let ratingInput = OrderWrapper.findWhere(
        (node) => node.prop("testID") === "ratingInput"
      );
      ratingInput.simulate("valueChange", "test rate");
      expect(OrderWrapper).toMatchSnapshot();
    });

    then("I click on submit review", () => {
      instance = OrderWrapper.instance() as Ordermanagement;
      let btnSubmitReview = OrderWrapper.findWhere(
        (node) => node.prop("testID") === "buttonSubmitReview"
      );
      btnSubmitReview.simulate("press");
      expect(OrderWrapper).toMatchSnapshot();
    });

    then("I click on cancel review", () => {
      instance = OrderWrapper.instance() as Ordermanagement;
      let btnSubmitReview = OrderWrapper.findWhere(
        (node) => node.prop("testID") === "buttonCancelReview"
      );
      btnSubmitReview.simulate("press");
      expect(OrderWrapper).toMatchSnapshot();
    });

    then("Rest Api will return success response", () => {
      const submitReviewSucessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      submitReviewSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        submitReviewSucessRestAPI.messageId
      );
      submitReviewSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}],
        }
      );
      instance.submitOrderReviewAPICallID = submitReviewSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", submitReviewSucessRestAPI);
    });

    then("ordermangement failed to submit order review", () => {
      const msgCancelOrderErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgCancelOrderErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgCancelOrderErrorRestAPI
      );
      msgCancelOrderErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [{}],
        }
      );

      msgCancelOrderErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgCancelOrderErrorRestAPI.messageId
      );
      instance.submitOrderReviewAPICallID =
        msgCancelOrderErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgCancelOrderErrorRestAPI);
    });
  });
});
