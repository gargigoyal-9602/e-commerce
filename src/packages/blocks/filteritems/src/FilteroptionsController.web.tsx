// @ts-nocheck
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import StorageProvider from '../../../framework/src/StorageProvider';

import { BackHandler } from "react-native";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;

  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  enableField: boolean;
  outOfStock: boolean;
  pricerange: boolean;
  brand: boolean;
  category: boolean;
  tag: boolean;
  checkedStock: boolean;
  checkedDiscounted: boolean;
  checkedBrand: any;
  rangeLow: any;
  rangeHigh: any;
  rangeMin: any;
  rangeMax: any;
  value: any;
  token: string;
  data: any;
  checkedCategory: boolean;
  checkedTag: boolean;
  brandsFilterList: any;
  BrandList: any;
  selectedItems: any;
  selectedCategory: any;
  scrollEnabled: boolean;
  priceMin: any;
  priceMax: any;
  price: any;
  searchedCategoryFilterList: any;
  categoryFilterList: any;
  searchText: string,
  catHolder: any,
  customErrorModal: boolean,
  customErrorMessage: String,
  isFetching: boolean,
  subCategory: boolean
  tags: boolean;
  tagsList: any;
  filterBrand: Array<any>;
  YtMbFilter?: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class FilteroptionsController extends BlockComponent<
  Props,
  S,
  SS
> {
  _rangeSlider: any;
  getCategoryApiCallId: any;
  getBrandApiCallId: any;
  applyAllApiCallId: any;
  getTagsApiCallId: any;

  _unsubscribe: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage)
    ];

    this.state = {
      enableField: false,
      outOfStock: false,
      pricerange: true,
      brand: false,
      category: false,
      tag: false,
      checkedStock: false,
      checkedDiscounted: false,
      rangeLow: 0,
      rangeHigh: 2000,
      rangeMin: 0,
      rangeMax: 2000,
      value: 10,
      token: "",
      data: [],
      checkedBrand: null,
      checkedCategory: false,
      checkedTag: false,
      brandsFilterList: [],
      BrandList: [],
      selectedItems: [],
      selectedCategory: [],
      scrollEnabled: false,
      priceMin: 0,
      priceMax: 0,
      price: [],
      searchedCategoryFilterList: [],
      categoryFilterList: [],
      searchText: "",
      catHolder: [],
      customErrorModal: false,
      customErrorMessage: "",
      isFetching: false,
      subCategory: false,
      tags: false,
      tagsList: null,
      filterBrand: [],
      YtMbFilter: false,
      screenSize: ""
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    window.addEventListener("resize", this.resizeWindow);
  }
  async componentWillUnmount() {
    window.removeEventListener("resize", this.resizeWindow, false);
  }
  resizeWindow = () => {
    this.setState({ screebSize: window.innerWidth });
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  };

  getToken = async () => {
    const token = await StorageProvider.get("Userdata");
    const { params } = this.props.navigation.state;
    this.setState({ token: token });
    let filterData = params ? params.filterData : [];
    // const { filterBrands, filterTags, filterCategories, filterSubCategories, lastCategoryValue, filterDiscountedItems, filterLowRange, filterHighRange } = filterData;
    if (filterData.length === 0) {
      //*> When Filter Data is empty
      if (params && params.isFromExplore) {
        if (params && params.isFromSubcategory) {
          this.getBrandList(token);
          this.setState({
            searchedCategoryFilterList:
              params.categoryData.attributes.sub_categories,
            categoryFilterList: params.categoryData.attributes.sub_categories,
            subCategory: true
          });
        } else {
          this.getListRequest(token);
          this.getBrandList(token);
          this.getTagsList(token);
        }

      } else {
        this.getListRequest(token);
        this.getBrandList(token);
        this.getTagsList(token);
        // this.setState({rangeLow:params.MinPrice,rangeHigh:params.MaxPrice})
      }
    } else {
      const {
        filterBrands,
        filterTags,
        filterCategories,
        filterSubCategories,
        lastCategoryValue,
        filterDiscountedItems,
        filterLowRange,
        filterHighRange,
        filterMax,
        filterMin
      } = filterData;
      this.setState({ rangeLow: filterLowRange, rangeHigh: filterHighRange });
      // this._rangeSlider.setLowValue(filterLowRange);
      // this._rangeSlider.setHighValue(filterHighRange);
      if (
        this.props.navigation.state.params &&
        this.props.navigation.state.params.isFromExplore
      ) {
        // if(filterSubCategories.length === 0 || lastCategoryValue !==  this.props.navigation.state.params.categoryID)
        // this.getSubCategoryList();
        if (params && params.isFromSubcategory) {
          this.setState({
            //*> When Filter Data is not empty
            categoryFilterList: filterSubCategories,
            brandsFilterList: filterBrands,
            searchedCategoryFilterList: filterSubCategories,
            rangeLow: filterLowRange,
            rangeHigh: filterHighRange,
            rangeMax: filterMax,
            rangeMin: filterMin,
            subCategory: true
          });
        } else {
          this.setState({
            //*> When Filter Data is not empty
            categoryFilterList: filterSubCategories,
            brandsFilterList: filterBrands,
            searchedCategoryFilterList: filterSubCategories,
            rangeLow: filterLowRange,
            rangeHigh: filterHighRange,
            rangeMax: filterMax,
            rangeMin: filterMin,
            subCategory: false
          });
        }
      } else {
        this.setState({
          //*> When Filter Data is not empty
          categoryFilterList: filterCategories,
          brandsFilterList: filterBrands,
          searchedCategoryFilterList: filterCategories,
          rangeLow: filterLowRange,
          rangeHigh: filterHighRange,
          rangeMax: filterMax,
          rangeMin: filterMin
        });
      }
    }
  };

  async receive(from: string, message: Message) {
    // Customizable Area Start

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
      if (responseJson && responseJson.data) {
        if (apiRequestCallId === this.getTagsApiCallId) {
          // alert(JSON.stringify(responseJson.data.faqs))
          runEngine.debugLog("api response--------getTagsApiCallId", responseJson.data);
          // let array = responseJson.data;
          this.setState({
            tagsList: responseJson.data,
            isFetching: false
            // tags: true
          });
          // this.setState({productList:array})
        }
      }
      if (responseJson?.error) {
        this.setState({ isFetching: false });
      }
      if (errorReponse) {
        this.setState({ isFetching: false });
        this.parseApiCatchErrorResponse(errorReponse);
      }
    }
    // Customizable Area End
  }

  ytmbFilter = () => {
    console.log("You Filter")
    this.setState({
      YtMbFilter: !this.state.YtMbFilter
    })
  };
  // ytmbFilterClose = () => {
  //   console.log("You close Filter");
  //   this.setState({
  //     YtMbFilter: false
  //   })
  // }
}