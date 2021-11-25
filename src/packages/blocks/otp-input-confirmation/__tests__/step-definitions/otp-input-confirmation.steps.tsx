import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import OTPInputAuth from "../../src/OTPInputAuth"

const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "OTPInputAuth"
  }

const feature = loadFeature('./__tests__/features/otp-input-confirmation-scenario.feature');

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to OTPInputAuth', ({ given, when, then }) => {
        let otpInputAuth:ShallowWrapper;
        let instance:OTPInputAuth; 

        given('I am a User loading OTPInputAuth', () => {
            otpInputAuth = shallow(<OTPInputAuth {...screenProps}/>)
        });

        when('I navigate to the OTPInputAuth', () => {
             instance = otpInputAuth.instance() as OTPInputAuth
        });

        then('OTPInputAuth will load with out errors', () => {
            expect(otpInputAuth).toBeTruthy()
            expect(otpInputAuth).toMatchSnapshot()
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(otpInputAuth).toBeTruthy()
            expect(otpInputAuth).toMatchSnapshot()
        });
    });

});
