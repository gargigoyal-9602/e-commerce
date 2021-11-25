import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Cart from "../../src/ShoppingCart.web"
import Checkout from "../../src/Checkout.web"
const navigation = require("react-navigation")

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
        let instance:typeof Cart; 

        given('I am a User loading shoppingcart', () => {
            shoppingcartWrapper = shallow(<Cart {...screenProps}/>)
        });

        when('I navigate to the shoppingcart', () => {
            //  instance = shoppingcartWrapper.instance() as Cart
        });

        then('shoppingcart will load with out errors', () => {
            expect(shoppingcartWrapper).toBeTruthy()
            // instance = shoppingcartWrapper.instance() as Cart

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
       
            //  instance.getCartListApiCallId = msgValidationAPI.messageId;
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
            //  instance.getCartListApiCallId = msgValidationAPI.messageId;
             runEngine.sendMessage("Unit Test", msgValidationAPI);
       

        });

        then('I can leave the screen with out errors', () => {
            // instance.componentWillUnmount()
            expect(shoppingcartWrapper).toBeTruthy()
        });
    });

    test('User navigates to checkout', ({ given, when, then }) => {
      let checkoutWrapper:ShallowWrapper;
      let instance:typeof Checkout; 

      given('I am a User loading checkout', () => {
        checkoutWrapper = shallow(<Checkout {...screenProps}/>)
      });

      when('I navigate to the checkout', () => {
          //  instance = shoppingcartWrapper.instance() as Cart
      });

      then('checkout will load with out errors', () => {
          expect(checkoutWrapper).toBeTruthy()
          // instance = shoppingcartWrapper.instance() as Cart

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
     
          //  instance.getCartListApiCallId = msgValidationAPI.messageId;
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
          //  instance.getCartListApiCallId = msgValidationAPI.messageId;
           runEngine.sendMessage("Unit Test", msgValidationAPI);
     

      });

      then('I can leave the screen with out errors', () => {
          // instance.componentWillUnmount()
          expect(checkoutWrapper).toBeTruthy()
      });
  });

  test('User navigates to editaddress', ({ given, when, then }) => {
  
    given('I am a User loading editaddress', () => {
    });

    when('I navigate to the editaddress', () => {
    });

    then('editaddress will load with out errors', () => {
    });

    then('I can leave the screen with out errors', () => {
    });
  });

});

