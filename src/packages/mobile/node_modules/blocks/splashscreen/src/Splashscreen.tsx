import React from "react";

import {
  Image,
  View
  // Customizable Area Start
  // Customizable Area End
} from "react-native";

import { splashImage } from "../../studio-store-ecommerce-theme/src/AppAssets/appassets";
import SplashscreenController, { Props } from "./SplashscreenController";
import FocusAwareStatusBar from "../../../components/src/FocusAwareStatusBar";
import styles from "./SplashScreenStyle";

export default class Splashscreen extends SplashscreenController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  render() {
    return (
      // Customizable Area Start
      <View style={styles.container}>
        <FocusAwareStatusBar hidden={true} />
        <Image
          source={splashImage}
          style={styles.appLogo}
          resizeMode="stretch"
        />
      </View>
      // Customizable Area End
    );
  }
}
