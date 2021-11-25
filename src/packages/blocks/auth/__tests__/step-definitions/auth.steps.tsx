import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Auth from "../../src/Auth"

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
    id: "Auth"
  }

const feature = loadFeature('./__tests__/features/auth-scenario.feature');

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Auth', ({ given, when, then }) => {
        let authBlockWrapper:ShallowWrapper;
        let instance:Auth; 

        given('I am a User loading Auth', () => {
            authBlockWrapper = shallow(<Auth {...screenProps}/>)
        });

        when('I navigate to the Auth', () => {
             instance = authBlockWrapper.instance() as Auth
             instance.setState({fromCart: false})
        });

        then('Auth will load with out errors', () => {
            instance.receive("UNIT_TEST", new Message("TEST_MESSAGE"));
            expect(authBlockWrapper).toBeTruthy()
        });

        then('I can toggle between login and signup', () => {
            instance.stateChange(0);
            expect(authBlockWrapper).toBeTruthy()
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(authBlockWrapper).toBeTruthy()
        });
    });

    test('User navigates to Auth from cart', ({ given, when, then }) => {
        let authBlockWrapper:ShallowWrapper;
        let instance:Auth; 

        given('I am a User loading Auth', () => {
            authBlockWrapper = shallow(<Auth {...screenProps}/>)
        });

        when('I navigate to the Auth', () => {
             instance = authBlockWrapper.instance() as Auth
             instance.setState({fromCart: true})
        });

        then('Auth will load with out errors', () => {
            expect(authBlockWrapper).toBeTruthy()
        });

        then('I can toggle between login and signup', () => {
            instance.stateChange(1);
            expect(authBlockWrapper).toBeTruthy()
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(authBlockWrapper).toBeTruthy()
        });
    });

    test('User navigates to Auth and press backbutton', ({ given, when, then }) => {
        let authBlockWrapper:ShallowWrapper;
        let instance:Auth; 

        given('I am a User loading Auth', () => {
            authBlockWrapper = shallow(<Auth {...screenProps}/>)
        });

        when('I navigate to the Auth and press backbutton', () => {
             instance = authBlockWrapper.instance() as Auth
             instance.handleBackButtonClick();
        });

        then('The App will exit', () => {
            expect(authBlockWrapper).toBeTruthy()
        });

    });

});

