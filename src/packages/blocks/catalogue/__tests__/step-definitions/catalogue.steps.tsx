import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Catalogue from "../../src/Catalogue";
// const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
  },
  id: "Catalogue",
};

const feature = loadFeature("./__tests__/features/catalogue-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    // jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Catalogue", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Catalogue;

    given("I am a User loading Catalogue", () => {
      exampleBlockA = shallow(<Catalogue {...screenProps} />);
    });

    when("I navigate to the Catalogue", () => {
      instance = exampleBlockA.instance() as Catalogue;
    });

    then("Catalogue will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("Catalogue will pre-load data without errors", async () => {
      instance = exampleBlockA.instance() as Catalogue;
      instance.componentDidMount();
      instance.getToken();
      expect(exampleBlockA).toBeTruthy();
    });

    then("Catalogue load products data without errors", () => {
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
      instance.getProductApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Catalogue load recommended data without errors", () => {
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
      instance.getRecommendedApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Catalogue load categories data without errors", () => {
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
      instance.getCategoriesApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Catalogue load cart product data without errors", () => {
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

    then("Catalogue load cart list data without errors", () => {
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
      instance.getCartListId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Catalogue add to wishlist without errors", () => {
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
      instance.addToWishlistApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Catalogue remove from wishlist without errors", () => {
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
      instance.removeFromWishlistApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Catalogue add to cart without errors", () => {
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
      instance.addToCartApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Catalogue send device token without errors", () => {
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
      instance.sendDeviceTokenApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Catalogue notification without errors", () => {
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
      instance.notificationMessageId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Catalogue button actions without errors", () => {
      const buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "btn-top-home"
      );
      buttonComponent.simulate("press");
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
