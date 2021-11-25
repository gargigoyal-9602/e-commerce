import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Notifications from "../../src/Notifications";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    addListener: jest.fn(),
  },
  id: "Notifications",
};

const feature = loadFeature(
  "./__tests__/features/notifications-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to notifications", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Notifications;

    given("I am a User loading notifications", () => {
      exampleBlockA = shallow(<Notifications {...screenProps} />);
    });

    when("I navigate to the notifications", () => {
      instance = exampleBlockA.instance() as Notifications;
      instance.componentDidMount();
      instance.getNotificationList();
    });

    then("notifications will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
      expect(exampleBlockA).toMatchSnapshot();
    });

    then("notifications will load notification list without errors", () => {
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
      instance.getNotificationListApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("notifications will read notification without errors", () => {
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
      instance.readNotificationApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("notifications will delete notification without errors", () => {
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
      instance.deleteNotificationApiCallId = msgLoadDataAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLoadDataAPI);
    });

    then("Set different states to render different views", () => {
      instance = exampleBlockA.instance() as Notifications;
      instance.setState({ noProductFound: true });
      expect(exampleBlockA).toBeTruthy();
      expect(exampleBlockA).toMatchSnapshot();
    });

    then("I can select the button with with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "buttonContinueShopping"
      );
      buttonComponent.simulate("press");
      expect(exampleBlockA).toMatchSnapshot();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
      expect(exampleBlockA).toMatchSnapshot();
    });
  });
});
