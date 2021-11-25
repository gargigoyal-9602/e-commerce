import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Signup from "../../src/Signup"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "Signup",
    fromCart: false
  }

const feature = loadFeature('./__tests__/features/Signup-scenario.feature');

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Signup', ({ given, when, then }) => {
        let signupBlockWrapper:ShallowWrapper;
        let instance:Signup; 

        given('I am a User loading Signup', () => {
            signupBlockWrapper = shallow(<Signup {...screenProps}/>)
        });

        when('I navigate to the Signup', () => {
             instance = signupBlockWrapper.instance() as Signup
             expect(signupBlockWrapper).toMatchSnapshot()
        });

        then('Signup will load with out errors', () => {
            expect(signupBlockWrapper).toBeTruthy()
            expect(signupBlockWrapper).toMatchSnapshot()
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(signupBlockWrapper).toBeTruthy()
            expect(signupBlockWrapper).toMatchSnapshot()
        });
    });


});
