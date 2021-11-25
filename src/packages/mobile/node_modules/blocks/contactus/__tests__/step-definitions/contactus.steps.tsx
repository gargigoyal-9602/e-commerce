import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
export const configJSON = require("../../config.json");
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Contactus from "../../src/Contactus";

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "Contactus"
};

const feature = loadFeature("./__tests__/features/contactus-scenario.feature");

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to contactus", ({ given, when, then }) => {
    let ContactUsWrapper: ShallowWrapper;
    let instance: Contactus;

    given("I am a User loading contactus", () => {
      ContactUsWrapper = shallow(<Contactus {...screenProps} />);
      expect(ContactUsWrapper).toBeTruthy();
    });

    when("I navigate to the contactus", () => {
      instance = ContactUsWrapper.instance() as Contactus;
    });

    then("contactus will load with out errors", () => {
      expect(ContactUsWrapper).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(ContactUsWrapper).toBeTruthy();
    });
  });

  test("Empty fields", ({ given, when, then }) => {
    let ContactUsWrapper: ShallowWrapper;
    let instance: Contactus;

    given("I am a user attempting to add a contact", () => {
      ContactUsWrapper = shallow(<Contactus {...screenProps} />);
      instance = ContactUsWrapper.instance() as Contactus;
      expect(ContactUsWrapper).toBeTruthy();
    });

    when("I am adding a contact with empty fields", () => {
      instance = ContactUsWrapper.instance() as Contactus;
      instance.setState({
        textInputData: {
          name: "",
          email: "",
          phoneNo: "",
        },
        descriptionText: ""
      });
    });

    then("add contact should fail", () => {
      expect(instance.validateInput()).toBe(false);
      instance.clearInputErrors();
    });
  });

  test("Wrong email", ({ given, when, then }) => {
    let ContactUsWrapper: ShallowWrapper;
    let instance: Contactus;

    given("I am a user attempting to add a contact", () => {
      ContactUsWrapper = shallow(<Contactus {...screenProps} />);
      instance = ContactUsWrapper.instance() as Contactus;
      expect(ContactUsWrapper).toBeTruthy();
    });

    when("I am adding a contact with wrong email", () => {
      instance = ContactUsWrapper.instance() as Contactus;
      instance.setState({
        textInputData: {
          name: "Abhinav",
          email: "Abhinav",
          phoneNo: "+911221133322",
        },
        descriptionText: "Test"
      });
    });

    then("add contact should fail", () => {
      expect(instance.validateInput()).toBe(false);
    });
  });

  test("Wrong phone number", ({ given, when, then }) => {
    let ContactUsWrapper: ShallowWrapper;
    let instance: Contactus;

    given("I am a user attempting to add a contact", () => {
      ContactUsWrapper = shallow(<Contactus {...screenProps} />);
      instance = ContactUsWrapper.instance() as Contactus;
      expect(ContactUsWrapper).toBeTruthy();
    });

    when("I am adding a contact with wrong phone number", () => {
      instance = ContactUsWrapper.instance() as Contactus;
      instance.setState({
        textInputData: {
          name: "Abhinav",
          email: "Abhi@gmail.com",
          phoneNo: "123212"
        },
        descriptionText: "Test"
      });
    });

    then("add contact should fail", () => {
      const addContactSucessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      addContactSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        addContactSucessRestAPI.messageId
      );
      addContactSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [
            {
              contact: ["Phone number is not valid"]
            }
          ]
        }
      );

      runEngine.sendMessage("Unit Test", addContactSucessRestAPI);
    });
  });

  test("Add contact with correct data", ({ given, when, then }) => {
    let ContactUsWrapper: ShallowWrapper;
    let instance: Contactus;

    given("I am a user attempting to add a contact", () => {
      ContactUsWrapper = shallow(<Contactus {...screenProps} />);
      instance = ContactUsWrapper.instance() as Contactus;
      expect(ContactUsWrapper).toBeTruthy();
    });

    when("I am adding a contact with correct data", () => {
      instance = ContactUsWrapper.instance() as Contactus;
      instance.setState({
        textInputData: {
          name: "Abhinav",
          email: "Abhi@gmail.com",
          phoneNo: "+911234321232",
        },
        descriptionText: "Test"
      });
    });

    then("add contact should succeed", () => {
      expect(instance.validateInput()).toBe(true);
    });
    then("Rest Api will return success response", () => {
      const addContactSucessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      addContactSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        addContactSucessRestAPI.messageId
      );
      addContactSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            id: "40",
            type: "contact",
            attributes: {
              name: "Demo User",
              email: "demo.user@gmail.com",
              phone_number: "+919987654322",
              description: "Test",
              created_at: "2020-10-20T10:24:14.911Z",
              user: " "
            }
          }
        }
      );

      runEngine.sendMessage("Unit Test", addContactSucessRestAPI);
    });
  });
});
