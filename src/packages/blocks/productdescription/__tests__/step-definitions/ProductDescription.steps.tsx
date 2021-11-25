import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import ProductDescription from "../../src/ProductDescription"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "ProductDescription"
  }

const feature = loadFeature('./__tests__/features/ProductDescription-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to ProductDescription', ({ given, when, then }) => {
        let productDescriptionWrapper:ShallowWrapper;
        let instance:ProductDescription; 

        given('I am a User loading ProductDescription', () => {
            productDescriptionWrapper = shallow(<ProductDescription {...screenProps}/>)
        });

        when('I navigate to the ProductDescription', () => {
             instance = productDescriptionWrapper.instance() as ProductDescription
        });

        then('ProductDescription will load with out errors', () => {
            expect(productDescriptionWrapper).toBeTruthy()
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(productDescriptionWrapper).toBeTruthy()
        });
    });


});
