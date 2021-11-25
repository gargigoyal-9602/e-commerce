import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Profilebio from "../../src/Profilebio"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "Profilebio"
  }

const feature = loadFeature('./__tests__/features/profilebio-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to profilebio', ({ given, when, then }) => {
        let profilebioWrapper:ShallowWrapper;
        let instance:Profilebio; 

        given('I am a User loading profilebio', () => {
            profilebioWrapper = shallow(<Profilebio {...screenProps}/>)
        });

        when('I navigate to the profilebio', () => {
             instance = profilebioWrapper.instance() as Profilebio
        });

        then('profilebio will load with out errors', () => {
            expect(profilebioWrapper).toBeTruthy()
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(profilebioWrapper).toBeTruthy()
        });
    });


});
