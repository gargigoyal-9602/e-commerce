import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import HelpCenterBlock from "../../src/HelpCenterBlock.web"

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
    id: "HelpCenter"
  }

const feature = loadFeature('./__tests__/features/HelpCenter-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to HelpCenter', ({ given, when, then }) => {
        let helpCenter:ShallowWrapper;
        // let instance:HelpCenter; 

        given('I am a User loading HelpCenter', () => {
            helpCenter = shallow(<HelpCenterBlock {...screenProps}/>)
        });

        when('I navigate to the HelpCenter', () => {
            //  instance = helpCenter.instance() as HelpCenter
        });

        then('HelpCenter will load with out errors', () => {
            expect(helpCenter).toBeTruthy()
        });

        then('I can leave the screen with out errors', () => {
            // instance.componentWillUnmount()
            expect(helpCenter).toBeTruthy()
        });
    });

    test('User navigates to HelpCenterData', ({ given, when, then }) => {
        // let helpCenterData:ShallowWrapper;
        // let instance:HelpCenterData; 

        given('I am a User loading HelpCenterData', () => {
            // helpCenterData = shallow(<HelpCenterData {...screenProps}/>)
        });

        when('I navigate to the HelpCenterData', () => {
            //  instance = helpCenterData.instance() as HelpCenterData
        });

        then('HelpCenterData will load with out errors', () => {
            // expect(helpCenterData).toBeTruthy()
        });

        then('I can leave the screen with out errors', () => {
            // instance.componentWillUnmount()
            // expect(helpCenterData).toBeTruthy()
        });
    });


});
