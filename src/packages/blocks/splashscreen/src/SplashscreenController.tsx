import { IBlock } from "../../../framework/src/IBlock";
import { BlockComponent } from "../../../framework/src/BlockComponent";
// import MessageEnum, {
//   getName
// } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import StorageProvider from "../../../framework/src/StorageProvider";

// Customizable Area Start
// Customizable Area End

export let appObj: any = {};

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  isDeepLinkUtilised: boolean;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class SplashscreenController extends BlockComponent<
  Props,
  S,
  SS
> {
  timeoutHandle: any;
  // Customizable Area Start
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    appObj = this;
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      // Customizable Area Start
      // Customizable Area End
    ];
    this.state = {
      isDeepLinkUtilised: false
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    const value = await StorageProvider.get("Userdata");
    const isGuestUser = await StorageProvider.get("GUEST_USER");
    this.timeoutHandle = setTimeout(() => {
      if (value && !isGuestUser) {
        this.props.navigation.replace("MainNavigator");
      } else {
        this.props.navigation.replace("AuthNavigator");
      }
    }, 1000);
  }

  async componentWillUnmount() {
    super.componentWillUnmount();
    clearTimeout(this.timeoutHandle);
    // Customizable Area Start
    // Customizable Area End
  }
}
