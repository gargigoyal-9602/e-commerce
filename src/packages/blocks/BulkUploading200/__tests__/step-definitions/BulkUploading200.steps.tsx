import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import BulkUploading200 from "../../src/BulkUploading200"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "BulkUploading200"
  }

const feature = loadFeature('./__tests__/features/BulkUploading200-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to BulkUploading200', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:BulkUploading200; 

        given('I am a User loading BulkUploading200', () => {
            exampleBlockA = shallow(<BulkUploading200 {...screenProps}/>)
        });

        when('I navigate to the BulkUploading200', () => {
             instance = exampleBlockA.instance() as BulkUploading200
        });

        then('BulkUploading200 will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy()
            expect(exampleBlockA).toMatchSnapshot()
        });

        then('I can enter text with out errors', () => {
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInput');
            textInputComponent.simulate('changeText', 'hello@aol.com');
            expect(exampleBlockA).toMatchSnapshot();
        });

        then('I can select the button with with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnExample');
            buttonComponent.simulate('press')
            expect(exampleBlockA).toMatchSnapshot();
            expect(instance.state.txtSavedValue).toEqual("hello@aol.com")
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy()
            expect(exampleBlockA).toMatchSnapshot()
        });
    });


});
