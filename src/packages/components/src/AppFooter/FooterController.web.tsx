import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// @ts-ignore
import chunk from "lodash/chunk";

export interface Props {

};

export interface S {
  theamData: any;
  usefulLinks: any;
  isBrandSettingsLoaded?: boolean;
  isShowFB?: boolean;
  isShowGoogle?: boolean;
  isShowInsta?: boolean;
  isShowYouTube?: boolean;
  isShowTwitter?: boolean;
  FaqData: any;
  helpCenterData: any
};

export interface SS {
  id: any;
};

const configJSON = require("./config");

export default class FooterController extends BlockComponent<Props, S, SS>{
  helpCenterallId: string = "";
  barndAPiCallId: string;
  FAQAPICallId: string = ""
  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.CountryCodeMessage)
    ];
    this.receive = this.receive.bind(this);

    runEngine.attachBuildingBlock(this, this.subScribedMessages);
    this.state = {
      //@ts-ignore
      theamData: JSON.parse(localStorage.getItem("appThemData")),
      usefulLinks: [],
      FaqData: [],
      helpCenterData: [],
    }
  };


  //API Call Receive Function --> Response
  async receive(from: string, message: Message) {
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallID = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      const responseJSON = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      const errorMessage = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

      if (this.helpCenterallId === apiRequestCallID) {
        if (responseJSON && responseJSON?.data) {
          this.setState({ usefulLinks: chunk(responseJSON?.data, 4) });
        }
      }
      if (apiRequestCallID === this.barndAPiCallId) {
        if (responseJSON && responseJSON.brand_setting) {
          const { footerContent } = responseJSON.brand_setting;
          this.setState({
            isBrandSettingsLoaded: false,
            isShowFB: footerContent?.facebookSrc,
            isShowInsta: footerContent?.instagramSrc,
            isShowTwitter: footerContent?.twitterSrc,
            isShowYouTube: footerContent?.youtubeSrc,
            isShowGoogle: footerContent?.googleSrc
          });
          let dat = {
            countryName: responseJSON.brand_setting?.ExtraFields?.country,
            countryCode: responseJSON.brand_setting?.ExtraFields?.currency_type
          };
          localStorage.setItem('countryCode', JSON.stringify(dat));
          this.getMyThemes(responseJSON.brand_setting);
        }
      }

      if (this.FAQAPICallId === apiRequestCallID) {
        //console.log("nfbgmnbdfg", this.state.FaqData)
        if (responseJSON && responseJSON.data && responseJSON.data.faqs && responseJSON.data.faqs.length > 0) {
          this.setState({
            FaqData: responseJSON
          });
          const copyHelpcenter = [...this.state.usefulLinks];
          const smapleFqa = {
            id: "3", type: "help_center",
            attributes: {
              "help_center_type": "FAQs",
              "description": responseJSON.data.faqs
            }
          }
          copyHelpcenter.push([smapleFqa]);
          //console.log("fdghdfg", copyHelpcenter);
          console.log(copyHelpcenter, "=================+++++++++++++++++++++++++++++++++++++++++++")
          this.setState({
            usefulLinks: copyHelpcenter
          })
        }
      }
    }
  }

  async componentDidMount() {
    this.getHelpceterData();
    this.handleBrandSettings();
    this.getFAQsData();
  }


  getHelpceterData() {
    const token = localStorage.getItem("token");
    const headers = {
      token,
      "Content-Type": "application/json"
    }
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.helpCenterallId = requestMessage.messageId;

    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.getHelpCenterAPIEndPoint);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), headers);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiGetMethod);
    // Sending Request to call API.
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }
  //barndSettingAPIcall
  handleBrandSettings = () => {
    this.setState({
      isBrandSettingsLoaded: true
    });
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.barndAPiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.brandSettingAPIEndPoint);
    const headers = {
      'Content-Type': 'application/json',
    };
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(headers));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiGetMethod);

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  //@ts-ignore
  getMyThemes = (themeAttributes): any => {
    if (themeAttributes) {
      localStorage.setItem('appThemData', JSON.stringify(themeAttributes));
      // CacheState.set({ webThemes: themeAttributes });
      const root = document.documentElement;
      root.style.setProperty(
        '--color-ButtonBackRegular',
        themeAttributes?.buttonsColor?.regularButtonColor
      );
      root.style.setProperty(
        '--color-ButtonTextRegular',
        themeAttributes?.buttonsColor?.regularTextColor
      );
      root.style.setProperty(
        '--color-ButtonBackHover',
        themeAttributes?.buttonsColor?.hoverButtonColor
      );
      root.style.setProperty(
        '--color-ButtonTextHover',
        themeAttributes?.buttonsColor?.hoverTextColor
      );
      root.style.setProperty(
        '--color-RegularText',
        themeAttributes?.mainTextsColor?.regularColorCode
      );
      root.style.setProperty(
        '--color-RegularActiveText',
        themeAttributes?.mainTextsColor?.activeColorCode
      );
      root.style.setProperty(
        '--color-commonBorder',
        themeAttributes?.commonBordersColor
      );
      root.style.setProperty(
        '--color-filterBar',
        themeAttributes?.productFilterSliderColor
      );
      root.style.setProperty(
        '--color-wishlistIconColor',
        themeAttributes?.profile?.wishlistQtyIconColor
      );
      root.style.setProperty(
        '--color-wishlistIconText',
        themeAttributes?.profile?.wishlistQtyTextColor
      );
      root.style.setProperty(
        '--color-orderDetailsText',
        themeAttributes?.profile?.orderDetailColor
      );
    }
  };

  //get FAQ's
  getFAQsData = () => {
    const headers = {
      "Content-Type": "application/json"
    };
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.FAQAPICallId = requestMessage.messageId;

    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.getFAQAPIEndPoint);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), headers);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiGetMethod);

    // Sending Request to call API.
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }


};