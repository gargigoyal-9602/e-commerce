import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { isEmpty } from "../../../framework/src/Utilities";

// Customizable Area Start

// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  history: any;
}

export interface S {

  user: any;
  isOpen: boolean;
  name: string;
  category: any;
  SearchDropDown: boolean;
  quickResults: any;
  recentSearches: any;
  searchQuery: string;
  refreshMenu: boolean;
  desktopToggle: boolean;
  showLogout: boolean;
  menuCategory: any;
  currentPageActive: string;
  isLoggedIn: boolean;

  userProfileImg?: any;
  themData: any;
  activeTab: any;

  currentPageArray?: string;
  currentpagestr?: string;
  cartLength: any;
  wishlistLength: any,
  collectionCategory: any
  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class EmailLoginRegistrationControllerWeb extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getLiveSearchApiCallId: string = "";
  getRecentSearchApiCallId: string = ""
  GetCategoryListApiCallId: string = ""
  GetCartApiCallId: string = ""
  getAllWishlistApiCallId: string = ""


  currentCountryCode: any;
  // Customizable Area End

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
      // Customizable Area Start
      user: {},
      isOpen: false,
      name: "",
      category: [],
      SearchDropDown: false,
      quickResults: [],
      recentSearches: [],
      searchQuery: "",
      refreshMenu: true,
      desktopToggle: false,
      showLogout: false,
      menuCategory: undefined,
      currentPageActive: "",
      isLoggedIn: false,
      // themData: {},
      //@ts-ignore
      themData: JSON.parse(localStorage.getItem("appThemData")),
      cartLength: "",
      wishlistLength: "",
      collectionCategory: "",
      activeTab: '0'
      // Customizable Area End
    };
    // Customizable Area Start

    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    this.onRouteChange();
    this.setState({
      cartLength: localStorage.getItem("cart_length"),
      wishlistLength: localStorage.getItem("wishlist_len")
    })


    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (responseJson && !responseJson.errors) {
        const apiRequestCallId = message.getData(
          getName(MessageEnum.RestAPIResponceDataMessage)
        );

        if (apiRequestCallId != null) {
          /// search live
          if (apiRequestCallId && responseJson) {

            // category list
            if (apiRequestCallId === this.GetCategoryListApiCallId) {
              console.log(responseJson.data, "shop category list")
              this.setState({
                collectionCategory: responseJson.data,

              })
            }


            //search live
            if (apiRequestCallId === this.getLiveSearchApiCallId) {
              // console.log(responseJson, "live search");
              this.setState({
                quickResults: responseJson.products.data,
              });
            }

            //recent search
            if (apiRequestCallId === this.getRecentSearchApiCallId) {
              //console.log(responseJson, "recent search");
              this.setState({
                recentSearches: responseJson.search,
              });

            }

            //all wishlist 
            if (apiRequestCallId === this.getAllWishlistApiCallId) {
              // console.log(responseJson.data.wishlist.data.attributes.wishlist_items.length, "wishlist-length")
              localStorage.setItem("wishlist_len", responseJson?.data?.wishlist?.data?.attributes?.wishlist_items?.length)
              this.setState({
                wishlistLength: responseJson?.data?.wishlist?.data?.attributes?.wishlist_items?.length
              })


            }

            //get cart 

            if (apiRequestCallId === this.GetCartApiCallId) {
              if (responseJson && responseJson.data) {
                console.log(responseJson.data[0].attributes.order_items, "here iscart")
                this.setState({
                  cartLength: responseJson.data[0].attributes.order_items.length
                  // loading: false
                })
                localStorage.setItem("cart_length", responseJson.data[0].attributes.order_items.length)


              }
            }
          }
        }
      }
    }


    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const otpAuthTkn = message.getData(
        getName(MessageEnum.AuthTokenDataMessage)
      );
      if (otpAuthTkn && otpAuthTkn.length > 0) {
        // this.setState({ otpAuthToken: otpAuthTkn });
        // runEngine.debugLog("otpAuthTkn", this.state.otpAuthToken);
        runEngine.unSubscribeFromMessages(this as IBlock, [message.id]);
      }
    }

    if (getName(MessageEnum.CountryCodeMessage) === message.id) {
      var selectedCode = message.getData(
        getName(MessageEnum.CountyCodeDataMessage)
      );
    }



    // Customizable Area End
  }

  // Customizable Area Start

  async componentDidMount() {

    //this.getCart()


  }

  componentWillReceiveProps(nextProps: any) {
    // @ts-ignore
    // const user = JSON.parse(localStorage.getItem("user"))

    this.setState({
      cartLength: localStorage.getItem("cart_length"),
      wishlistLength: localStorage.getItem("wishlist_len")
    })

    const users = localStorage.getItem('userData');
    const profileimage = localStorage.getItem('profileImage');
    if (!isEmpty(users)) {
      this.setState({ isLoggedIn: true, user: localStorage.getItem('userData'), userProfileImg: localStorage.getItem('profileImage') })
    } else {
      this.setState({ isLoggedIn: false, user: {} })
    }
  }


  search = () => {


    const route = "../"
    //@ts-ignore                       
    this.props.history.location.pathname.split("/").join(",").length < 1 ?
      this.props.history.push(`./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=&sort[direction]=&q[name]=${this.state.searchQuery}`) :
      this.props.history.push(`./${route.repeat(this.props.history.location.pathname.split("/").join(",").length - 1)}Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=&sort[direction]=&q[name]=${this.state.searchQuery}`)
    localStorage.setItem("searchQuery", `&q[name]=${this.state.searchQuery}`)
  }



  routeToAll(route: string) {
    if (route !== undefined) {
      let path = '/' + route;
      this.props.history.push(path);
    } else {
      let path = '/';
      this.props.history.push(path);
    }
  }

  toggle() {
    console.log("This you clicked me !!")
    // this.setState({
    //   isOpen: !this.state.isOpen
    // })
  }

  setSearchDropDown(value: any) {
    this.setState({ SearchDropDown: value })
  }

  setSearchQuery(value: string) {

  }

  setDesktopToggle(value: boolean) {
    this.setState({ desktopToggle: value });
  }

  quickSearch() {

  }

  setShowLogout() {

  }


  showToggleMenu = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  // get cart items
  getCart = (): boolean => {
    this.setState({
      ...this.state,
      // loading: true,
    })
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      token: localStorage.getItem("token"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.GetCartApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiGetIsCartCreated
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboarApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  ///get all wishlist
  getAllWishlist = (): boolean => {
    const headers = {
      "Content-Type": configJSON.dashboarContentType,
      token: localStorage.getItem("token"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getAllWishlistApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiPostWishlist
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboarApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };


  // get category list
  getCategoryList = (): boolean => {
    const headers = {
      "Content-Type": configJSON.dashboarContentType,
      token: localStorage.getItem("token"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.GetCategoryListApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiGetCategoryList
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboarApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };


  /// get search live
  getLiveSearch = (): boolean => {
    const headers = {
      "Content-Type": configJSON.dashboarContentType,
      token: localStorage.getItem("token"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getLiveSearchApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiGetLiveSearch + `${this.state.searchQuery}&uuid=2b385abaca68d58b`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboarApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };


  /// get search live
  getRecentSearch = (): boolean => {
    const headers = {
      "Content-Type": configJSON.dashboarContentType,
      token: localStorage.getItem("token"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getRecentSearchApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiGetRecentSearch
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboarApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  onRouteChange = () => {
    this.props.history.listen((location: any, action: any) => {
      window.scrollTo(0, 0)
      //console.log(location,"location")
      location.pathname != "/Filteroptions" && (
        localStorage.removeItem("category"),
        localStorage.removeItem("subCategory"),
        localStorage.removeItem("searchQuery"),
        this.searchnull()
      );
      setTimeout(() => {

        if (this.state.activeTab === '1') {
          (localStorage.getItem('newest') == "By Newest" &&
            location.pathname == "/Filteroptions") ? this.activeTabToggle('1') : this.activeTabToggle('0')


        }
        if (this.state.activeTab === '3') {
          location.pathname == "/aboutus" ? this.activeTabToggle('3') : this.activeTabToggle('0')
        }
        if (this.state.activeTab === '4') {
          location.pathname == "/contact-us" ? this.activeTabToggle('4') : this.activeTabToggle('0')
        }



      }, 300)


      //this.getCart()
      //this.getAllWishlist()
    });
  }
  activeTabToggle = (tab: any) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  searchnull = () => {
    //console.log("console working")
    this.setState({
      searchQuery: "",
    })
  }
  // Customizable Area End
}
