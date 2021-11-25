import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Ordersummary from "../../src/Ordersummary";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    addListener: jest.fn(),
    replace: jest.fn(),
  },
  id: "Ordersummary",
};

const feature = loadFeature(
  "./__tests__/features/ordersummary-scenario.feature"
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
    applied_discount: 1,
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

  test("User navigates to ordersummary", ({ given, when, then }) => {
    let ordersummaryBlock: ShallowWrapper;
    let instance: Ordersummary;

    given("I am a User loading ordersummary", () => {
      ordersummaryBlock = shallow(<Ordersummary {...screenProps} />);
    });

    when("I navigate to the ordersummary", () => {
      instance = ordersummaryBlock.instance() as Ordersummary;
    });

    then("ordersummary will load with out errors", () => {
      expect(ordersummaryBlock).toBeTruthy();
      expect(ordersummaryBlock).toMatchSnapshot();
    });

    then("ordersummary init values without errors", () => {
      instance = ordersummaryBlock.instance() as Ordersummary;
      instance.componentDidMount();
      instance.getToken();
      expect(ordersummaryBlock).toBeTruthy();
      expect(ordersummaryBlock).toMatchSnapshot();
    });

    then("ordersummary will load cart list without errors", () => {
      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [mockOrderItem],
        }
      );
      instance.getCartListApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("ordersummary failed to load cart list", () => {
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
      instance.getCartListApiCallId = msgLoadDataErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataErrorRestAPI);
    });

    then("ordersummary will load user profile without errors", () => {
      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}],
        }
      );
      instance.getUserProfileApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("ordersummary failed to load user profile", () => {
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
      instance.getUserProfileApiCallId = msgLoadDataErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataErrorRestAPI);
    });

    then("ordersummary will load cart product id without errors", () => {
      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}],
        }
      );
      instance.getCartProductId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("ordersummary failed to load cart product id", () => {
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
      instance.getCartProductId = msgLoadDataErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataErrorRestAPI);
    });

    then("ordersummary will load place order without errors", () => {
      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}],
        }
      );
      instance.placeOrderId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("ordersummary failed to place order", () => {
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
      instance.placeOrderId = msgLoadDataErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataErrorRestAPI);
    });

    then("ordersummary will create stripe payment id without errors", () => {
      const msgLoadDataAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLoadDataAPI.messageId
      );
      msgLoadDataAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [{}],
        }
      );
      instance.createStripePaymentId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("ordersummary failed to create stripe payment id", () => {
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
      instance.createStripePaymentId = msgLoadDataErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataErrorRestAPI);
    });

    then("ordersummary will load with mocked data", () => {
      instance = ordersummaryBlock.instance() as Ordersummary;
      instance.setState({
        cartList: mockOrderItem.attributes.order_items,
        cartData: mockOrderItem,
        isFetching: false,
        emptyCart: false,
      });
      expect(ordersummaryBlock).toBeTruthy();
      expect(ordersummaryBlock).toMatchSnapshot();
    });

    then("I can enter text with out errors", () => {
      // let textInputComponent = ordersummaryBlock.findWhere((node) => node.prop('testID') === 'txtInput');
      // textInputComponent.simulate('changeText', 'hello@aol.com');
      // expect(ordersummaryBlock).toMatchSnapshot();
    });

    then("I can select the button with with out errors", () => {
      let buttonComponent = ordersummaryBlock.findWhere(
        (node) => node.prop("testID") === "buttonPaymentCOD"
      );
      buttonComponent.simulate("press");

      // INR Paymenst only need to simuilate theme block.
      
      // buttonComponent = ordersummaryBlock.findWhere(
      //   (node) => node.prop("testID") === "buttonPaymentRazor"
      // );
      // buttonComponent.simulate("press");

      expect(ordersummaryBlock).toMatchSnapshot();
    });

    then("Show guest modal without errors", () => {
      instance.setState({
        showGuestModal: true,
      });
      expect(ordersummaryBlock).toMatchSnapshot();

      let buttonComponent = ordersummaryBlock.findWhere(
        (node) => node.prop("testID") === "buttonGuestStart"
      );
      buttonComponent.simulate("press");

      expect(ordersummaryBlock).toMatchSnapshot();

      buttonComponent = ordersummaryBlock.findWhere(
        (node) => node.prop("testID") === "buttonGuestCancel"
      );
      buttonComponent.simulate("press");

      expect(ordersummaryBlock).toMatchSnapshot();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(ordersummaryBlock).toBeTruthy();
      expect(ordersummaryBlock).toMatchSnapshot();
    });
  });
});
