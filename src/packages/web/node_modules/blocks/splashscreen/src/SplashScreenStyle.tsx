import { StyleSheet, Platform } from "react-native";
import scale from "../../../framework/src/utils/Scale";

// Customizable Area Start
// Customizable Area End

export default StyleSheet.create({
  // Customizable Area Start
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffffff"
  },
  appLogo: {
    width: scale(440),
    height: scale(440)
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    padding: 10,
    borderWidth: Platform.OS === "web" ? 0 : 1
  },
  bgMobileInput: {
    flex: 1
  },
  showHide: {
    alignSelf: "center"
  },
  imgShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {}
  // Customizable Area End
});
