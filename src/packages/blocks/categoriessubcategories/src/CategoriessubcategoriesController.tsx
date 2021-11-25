import { BackHandler } from "react-native";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import StorageProvider from "../../../framework/src/StorageProvider";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  token: string;
  categoriesArray: any;
  category: string;
  subCategory: string;
  isVisible: boolean;
  dropdownCategoryStatus: boolean;
  activeModalType: string;
  selectedCategoryID: any;
  customErrorModal: boolean;
  customErrorMessage: String;
  isFetching: boolean;
  cartHasProduct: boolean;
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class CategoriessubcategoriesController extends BlockComponent<
  Props,
  S,
  SS
> {
  getCategoriesApiCallId: any;
  deleteCategoriesApiCallId: any;
  deleteSubCategoriesApiCallId: any;
  addCategoryApiCallId: any;
  addSubCategoryApiCallId: any;
  cartHasProductAPICallID: any;
  _unsubscribe: any;
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage)
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      token: "",
      categoriesArray: [],
      category: "",
      subCategory: "",
      isVisible: false,
      dropdownCategoryStatus: false,
      activeModalType: "",
      selectedCategoryID: [],
      customErrorModal: false,
      customErrorMessage: "",
      isFetching: false,
      cartHasProduct: false
      // Customizable Area Start
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    this.props.navigation.addListener("willFocus", () => {
      this.getToken();
      this.getCartHasProduct();
    });
    this._unsubscribe = this.props.navigation.addListener("willFocus", () => {
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.handleBackButtonClick
      );
    });
    // Customizable Area Start
    // Customizable Area End
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  };

  async componentWillUnmount() {
    this._unsubscribe.remove();
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    // Customizable Area Start
    // Customizable Area End
  }

  getToken = async () => {
    const token = await StorageProvider.get("Userdata");
    this.setState({ token: token });
    this.getCategories(token);
    // Customizable Area Start
    // Customizable Area End
  };

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token });
      // Customizable Area Start
      // Customizable Area End
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (responseJson && responseJson.data) {
        if (apiRequestCallId === this.getCategoriesApiCallId) {
          this.setState({ isFetching: false });
          let array = responseJson.data;
          for (let i = 0; i < array.length; i++) {
            array[i].expand = false;
            array[i].Check = false;
          }
          this.setState({ categoriesArray: array });
        }
        if (apiRequestCallId === this.cartHasProductAPICallID) {
          this.setState({
            cartHasProduct: responseJson.data.has_cart_product,
            isFetching: false
          });
        }

        // Customizable Area Start
        // Customizable Area End
      } else if (responseJson.errors) {
        this.setState({ isFetching: false });
        this.parseApiErrorResponse(responseJson);
        this.parseApiCatchErrorResponse(errorReponse);
        // Customizable Area Start
        // Customizable Area End
      }
    }
    // Customizable Area Start
    // Customizable Area End
  }

  navigateToFilters = (
    data: any,
    subCategoryData: any,
    fromSubcategory: boolean
  ) => {
    this.props.navigation.navigate("Filteritems", {
      categoryData: data,
      subCategoryData: subCategoryData,
      isFromExplore: true,
      screenName:
        subCategoryData && subCategoryData.name
          ? subCategoryData.name || data.attributes.name
          : data.attributes.name,
      isFromCategory: true,
      isFromSubcategory: fromSubcategory
    });
  };

  setCategoryTxt = (text: string) => {
    this.setState({ category: text });
  };

  setSubCategoryTxt = (text: string) => {
    this.setState({ subCategory: text });
  };

  clickCategory = (item: any, Index: number) => {
    let array = this.state.categoriesArray;
    let idarray = this.state.selectedCategoryID;
    let index = idarray.indexOf(item.attributes.id);

    if (index > -1) {
      idarray.splice(index, 1);
      array[Index].Check = false;
      this.setState({ categoriesArray: array });
    } else {
      idarray.push(item.attributes.id);
      array[Index].Check = true;
      this.setState({ categoriesArray: array });
      this.setState({ selectedCategoryID: idarray });
    }
  };

  toggleModal = (type: string) => {
    this.setState({ activeModalType: type, isVisible: !this.state.isVisible });
  };

  expandCategoryView = () => {
    this.setState({
      dropdownCategoryStatus: !this.state.dropdownCategoryStatus
    });
  };

  expand = (id: string) => {
    let array = this.state.categoriesArray;
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        array[i].expand = !array[i].expand;
      }
    }
    this.setState({ categoriesArray: array });
  };

  isStringNullOrBlank(str: string) {
    return str === null || str.length === 0;
  }

  getCategories = (token: string) => {
    this.setState({ isFetching: true });
    const header = {
      "Content-Type": configJSON.categoryApiContentType,
      token: token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getCategoriesApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.categoryAPIEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  apiCall = async (data: any) => {
    const { contentType, method, endPoint, body } = data;
    const token = (await StorageProvider.get("Userdata")) || "";
    const header = {
      "Content-Type": contentType,
      token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );
    body &&
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
      );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  };

  getCartHasProduct = async () => {
    this.cartHasProductAPICallID = await this.apiCall({
      contentType: configJSON.categoryApiContentType,
      method: configJSON.httpGetType,
      endPoint: configJSON.cartHasProductEndPoint
    });
  };
  // Customizable Area Start
  // Customizable Area End
}
