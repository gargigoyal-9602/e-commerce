import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import WishList from "../../src/WishList"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "Wishlist"
  }

const feature = loadFeature('./__tests__/features/Wishlist-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Wishlist', ({ given, when, then }) => {
        let wishlistWrapper:ShallowWrapper;
        let instance:WishList; 

        given('I am a User loading Wishlist', () => {
            wishlistWrapper = shallow(<WishList {...screenProps}/>)
        });

        when('I navigate to the Wishlist', () => {
             instance = wishlistWrapper.instance() as WishList
             instance.setState({ token: "" });
             instance.getListRequest();
             instance.getCartHasProduct();
             instance.getCartList();
             instance.onHeartPress(0);
             instance.addToCart(0);

             const msgErrorMessageRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
             msgErrorMessageRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
             {
                 "errors": [
                     {
                         "Error": "Error"
                     }
                 ]
             });
             runEngine.sendMessage("Unit Test", msgErrorMessageRestAPI);

             const msgSuccessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
             msgSuccessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
             {
                 "data": {
                    "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAsInR5cGUiOiJTbXNBY2NvdW50IiwiZXhwIjoxNTc2Njk1ODk4fQ.kB2_Z10LNwDmbo6B39esgM0vG9qTAG4U9uLxPBYrCX5PCro0LxQHI9acwVDnfDPsqpWYvQmoejC2EO8MFoEz7Q"
                }
             });
             
             runEngine.sendMessage("Unit Test", msgSuccessRestAPI);

             const msgErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
             msgErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceErrorMessage), 
             {
                "errors": [
                    {
                        "Error": "Error"
                    }
                ]
            });
             runEngine.sendMessage("Unit Test", msgErrorRestAPI);

        });

        then('Wishlist will load with out errors', () => {
            expect(wishlistWrapper).toBeTruthy()
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(wishlistWrapper).toBeTruthy()
        });
    });


});
