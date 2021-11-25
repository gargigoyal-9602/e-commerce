import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Shoppingcart from "../../src/Shoppingcart"
import Checkout from "../../src/Checkout"
import EditAddress from "../../src/EditAddress"

const navigation = {
  state: { params: {} },
  dispatch: jest.fn(),
  goBack: jest.fn(),
  dismiss: jest.fn(),
  navigate: jest.fn(),
  openDrawer: jest.fn(),
  closeDrawer: jest.fn(),
  toggleDrawer: jest.fn(),
  getParam: jest.fn(),
  setParams: jest.fn(),
  addListener: jest.fn(),
  push: jest.fn(),
  replace: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
  isFocused: jest.fn()
}

const screenProps = {
    navigation: navigation,
    id: "Shoppingcart"
  }

const feature = loadFeature('./__tests__/features/shoppingcart-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to shoppingcart', ({ given, when, then }) => {
        let shoppingcartWrapper:ShallowWrapper;
        let instance:Shoppingcart; 

        given('I am a User loading shoppingcart', () => {
            shoppingcartWrapper = shallow(<Shoppingcart {...screenProps}/>)
        });

        when('I navigate to the shoppingcart', () => {
             instance = shoppingcartWrapper.instance() as Shoppingcart
        });

        then('shoppingcart will load with out errors', () => {
            expect(shoppingcartWrapper).toBeTruthy()
            instance = shoppingcartWrapper.instance() as Shoppingcart

            const msgToken = new Message(
               getName(MessageEnum.SessionResponseMessage)
             );
             msgToken.addData(
               getName(MessageEnum.SessionResponseToken),
               "TOKEN"
             );
             runEngine.sendMessage("Unit Test", msgToken);
       
             const msgValidationAPI = new Message(
               getName(MessageEnum.RestAPIResponceMessage)
             );
             msgValidationAPI.addData(
               getName(MessageEnum.RestAPIResponceDataMessage),
               msgValidationAPI.messageId
             );
           
             msgValidationAPI.addData(
               getName(MessageEnum.RestAPIResponceSuccessMessage),
               {
                 data: {}
               }
             );
       
             instance.getCartListApiCallId = msgValidationAPI.messageId;
             runEngine.sendMessage("Unit Test", msgValidationAPI);
       
             
             const msgError = new Message(
               getName(MessageEnum.RestAPIResponceErrorMessage)
             );
             msgError.addData(
               getName(MessageEnum.RestAPIResponceDataMessage),
               msgValidationAPI.messageId
             );
             msgError.addData(getName(MessageEnum.RestAPIResponceErrorMessage), {
               data: []
             });
             instance.getCartListApiCallId = msgValidationAPI.messageId;
             runEngine.sendMessage("Unit Test", msgValidationAPI);
       

        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(shoppingcartWrapper).toBeTruthy()
        });
    });

    test('User navigates to checkout', ({ given, when, then }) => {
        let checkouttWrapper:ShallowWrapper;
        let instance:Checkout; 

        given('I am a User loading checkout', () => {
            checkouttWrapper = shallow(<Checkout {...screenProps}/>)
        });

        when('I navigate to the checkout', () => {
             instance = checkouttWrapper.instance() as Checkout
        });

        then('checkout will load with out errors', () => {
            expect(checkouttWrapper).toBeTruthy()
            instance = checkouttWrapper.instance() as Checkout;
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(checkouttWrapper).toBeTruthy()
        });
    });

    test('User navigates to editaddress', ({ given, when, then }) => {
        let editAddressWrapper:ShallowWrapper;
        let instance:EditAddress; 

        given('I am a User loading editaddress', () => {
            editAddressWrapper = shallow(<EditAddress {...screenProps}/>)
        });

        when('I navigate to the editaddress', () => {
             instance = editAddressWrapper.instance() as EditAddress
        });

        then('editaddress will load with out errors', () => {
            expect(editAddressWrapper).toBeTruthy()
            instance = editAddressWrapper.instance() as EditAddress;
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(editAddressWrapper).toBeTruthy()
        });
    });

});
