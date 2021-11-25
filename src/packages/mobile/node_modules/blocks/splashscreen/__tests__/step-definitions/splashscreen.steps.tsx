import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Splashscreen from "../../src/Splashscreen"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "Splashscreen"
  }

const feature = loadFeature('./__tests__/features/splashscreen-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to splashscreen', ({ given, when, then }) => {
        let splashScreen:ShallowWrapper;
        let instance:Splashscreen; 

        given('I am a User loading splashscreen', () => {
            splashScreen = shallow(<Splashscreen {...screenProps}/>)
        });

        when('I navigate to the splashscreen', () => {
             instance = splashScreen.instance() as Splashscreen
        });

        then('splashscreen will load with out errors', () => {
            expect(splashScreen).toBeTruthy()
            expect(splashScreen).toMatchSnapshot()
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(splashScreen).toBeTruthy()
            expect(splashScreen).toMatchSnapshot()
        });
    });


});
