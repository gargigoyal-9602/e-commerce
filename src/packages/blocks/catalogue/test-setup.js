// test-setup.js
import { configure } from "enzyme";
import * as ReactNative from "react-native";
import Adapter from "enzyme-adapter-react-16";
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

jest.mock("../../framework/src/StorageProvider", () => {
  return {
    get: jest.fn(),
    remove: jest.fn(),
  };
});

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "macos",
  select: () => null,
}));

jest.mock("@react-native-community/google-signin", () => {});

jest.mock("@react-native-firebase/messaging", () => {});

jest.mock("@react-native-community/async-storage", () => mockAsyncStorage);

jest.doMock("@react-native-community/push-notification-ios", () => ({
  addEventListener: jest.fn(),
  requestPermissions: jest.fn(),
}));
jest.mock("react-native-device-info", () => {
  return {
    getVersion: () => 4,
  };
});

jest.doMock("react-native-razorpay", () => {
  return {
    addEventListener: jest.fn(),
    requestPermissions: jest.fn(),
  };
});

ReactNative.NativeModules.RNCAsyncStorage = mockAsyncStorage;

configure({ adapter: new Adapter() });
