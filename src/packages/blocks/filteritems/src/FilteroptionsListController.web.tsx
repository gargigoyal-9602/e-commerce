// @ts-nocheck
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { CategoryList } from "../../theme/src/constants";

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
  token: string;
  data: any;
  arrayHolder: any;
  brandList: any;
  brandSearch: string;
  tagsList: any;
  categoryList: any;
  colorList: any;
  colorSearch: any;
  priceList: any;
  filterObj: any;
  subCategorySearch: any;
  prevSubCategorySearch: any

  sizesList: any;
  value: any;
  isDiscountChecked?: boolean;
  isExcludeChecked?: boolean;
  maxPrice?: number;
  minPrice?: number;
  givenMaxValue?: number;
  givenMinValue?: number;
  isGivenRangeSlected?: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class FilterOptionListController extends BlockComponent<
  Props,
  S,
  SS
> {
  getProductApiCallId: any;
  getBrandProductApiCallId: any;
  getTagProductApiCallId: any;
  getProductCategoryApiCallId: any;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.removeFilter),
    ];
    this.state = {
      token: "",
      data: "",
      subCategorySearch: JSON.parse(localStorage.getItem("subCategory")),
      prevSubCategorySearch: "",
      arrayHolder: [],
      brandList: [],
      brandSearch: "",
      tagsList: [],
      categoryList: [],
      colorList: [],
      colorSearch: "",
      priceList: [],
      filterObj: { brand: [], color: [], tag: [], category: [], sub_category: [], size: [], price: { min: 0, max: 20 }, includeDiscount: false, includeOutOfStock: false },
      sizesList: [],
      value: { min: 0, max: 0 },
      minPrice: 0
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  async componentDidMount() {
    window.scrollTo(0, 0);
    super.componentDidMount();
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
    this.getCategoryList(localStorage.getItem("token"));
    setTimeout(() => {
      !localStorage.getItem("searchQuery") && !localStorage.getItem("category") && this.forBannertoggleCheckBox()
    }, 3000)
    let urlSearch = new URLSearchParams(window.location.search);
  }

  /////// recieve props ////////
  componentWillReceiveProps(prevState: any) {
    //console.log(prevState, "nextprops")
    this.setState({
      subCategorySearch: JSON.parse(localStorage.getItem("subCategory")),
      prevSubCategorySearch: this.state.subCategorySearch
    })

    let urlSearch = new URLSearchParams(window.location.search);
    (urlSearch.get("[sub_category]") == 'true' || urlSearch.get("[newArrivals]") == 'true') && this.subCategoryChecked()
  }



  forBannertoggleCheckBox = (id: any, type: any) => {
    //console.log("forBannertoggleCheckBox")
    let urlSearch = new URLSearchParams(window.location.search);
    const cat_id = urlSearch.get("q[category_id][]");
    const sub_cat_id = urlSearch.get("q[sub_category_id][]");
    const brand_id = urlSearch.get("q[brand_id][]");
    const tag_id = urlSearch.get("q[tag_id][]");
    const color_id = urlSearch.get("q[color][]");
    const size_id = urlSearch.get("q[size][]");
    const min_price = urlSearch.get("q[price][from]");
    const max_price = urlSearch.get("q[price][to]");
    const discount = urlSearch.get("discounted_items");
    const order_by = urlSearch.get("sort[order_by]");
    const sort_by = urlSearch.get("sort[direction]");
    const search = urlSearch.get("q[name]");

    urlSearch.delete("[sub_category]");
    if (urlSearch.get("[newArrivals]")) {

      urlSearch.delete("[newArrivals]");
      this.props.history.push(`/Filteroptions?${decodeURIComponent(urlSearch.toString())}`);

    }


    if (cat_id != null) {
      const newcat_id = cat_id.split(',')
      newcat_id.map(id => {
        this.toggleCheckBox(id, "category")

      })
    }
    if (sub_cat_id != null) {
      const newsub_cat_id = sub_cat_id.split(',')
      newsub_cat_id.map(id => {
        this.toggleCheckBox(id, "sub_category")

      })
    }
    if (brand_id != null) {
      const newbrand_id = brand_id.split(',')
      newbrand_id.map(id => {
        this.toggleCheckBox(id, "brand")

      })
    }
    if (tag_id != null) {
      const newtag_id = tag_id.split(',')
      newtag_id.map(id => {
        this.toggleCheckBox(id, "tag")

      })
    }
    if (color_id != null) {
      const newcolor_id = color_id.split(',')
      newcolor_id.map(id => {
        this.toggleCheckBox(id, "color")

      })
    }
    if (size_id != null) {
      const newsize_id = size_id.split(',')
      newsize_id.map(id => {
        this.toggleCheckBox(id, "size")

      })
    }
    if (min_price != null || max_price != null) {
      const dat = {
        min: min_price,
        max: max_price
      }
      this.setState({
        value: dat
      });
      setTimeout(() => {
        this.toggleCheckBox(dat, "price")
      }, 300);
    }
    if (discount != null) {
      this.setState({
        isDiscountChecked: discount
      })
      setTimeout(() => {
        this.toggleCheckBox(discount, "discount")
      }, 300);
    }
  }

  toggleCheckBox = (id: any, type: any) => {
    const requestCheckMessage = new Message(
      getName(MessageEnum.FilterCheckedMessage)
    );
    var urlSearch = new URLSearchParams(window.location.search);
    let shop = urlSearch.get("[sub_category]")
    let newArrivals = urlSearch.get("[newArrivals]")

    if (type == "brand") {
      let oldbrands = [...this.state.brandList];


      if (shop != null || newArrivals != null) {
        oldbrands && oldbrands?.forEach((item, idx) => {
          if (item.checked == true) {
            item.checked = !item.checked;
          }
        })
      }


      oldbrands.forEach((item, idx) => {
        if (id == item.id) {
          item.checked = !item.checked;
        }
      });
      const selectedBrands = oldbrands.filter((brand) => {
        return brand.checked
      })

      const filderBrandId = selectedBrands?.map((cat) => cat.attributes.id);
      urlSearch.delete("q[brand_id][]");
      //console.log(filderBrandId, "filderBrandIdfilderBrandId")
      filderBrandId.length > 0 && urlSearch.append("q[brand_id][]", filderBrandId.join(","));

      this.setState({ brandList: oldbrands, filterObj: { ...this.state.filterObj, brand: selectedBrands } }, () => {
        requestCheckMessage.addData(
          getName(MessageEnum.FilterCheckedMessageData),
          this.state.filterObj
        );

        runEngine.sendMessage(requestCheckMessage.id, requestCheckMessage);
      }
      );
    }
    if (type == "tag") {
      let oldtags = [...this.state.tagsList];
      if (shop != null || newArrivals != null) {
        oldtags && oldtags?.forEach((item, idx) => {
          if (item.checked == true) {
            item.checked = !item.checked;
          }
        })
      }

      oldtags.forEach((item, idx) => {
        if (id === item.id) {
          item.checked = !item.checked;
        }
      });
      const selectedtag = oldtags.filter((tag) => {
        return tag.checked
      })

      console.log(selectedtag, "selectedtag")
      const filderTagId = selectedtag?.map((cat) => cat.attributes.id);
      urlSearch.delete("q[tag_id][]");
      filderTagId.length > 0 && urlSearch.append("q[tag_id][]", filderTagId.join(","));

      this.setState(
        {
          tagsList: oldtags,
          filterObj: { ...this.state.filterObj, tag: selectedtag }
        }, () => {
          requestCheckMessage.addData(
            getName(MessageEnum.FilterCheckedMessageData),
            this.state.filterObj
          );

          runEngine.sendMessage(requestCheckMessage.id, requestCheckMessage);
        }
      );
    }
    if (type == "category") {
      var oldcategory = this.state.categoryList && [...this.state.categoryList];
      let sub_cat = ""

      //for shop 
      if (shop != null || newArrivals != null) {
        oldcategory && oldcategory?.forEach((item, idx) => {
          if (item.checked == true) {
            item.checked = !item.checked;
          }
          item?.attributes.sub_categories?.forEach((sub, idx) => {
            if (Object.keys(JSON.parse(localStorage.getItem("subCategory") || '{}')).length != 0 && JSON.parse(localStorage.getItem("subCategory")).sub_id == sub.id) {
              sub.checked = !sub.checked
            } else {
              sub.checked = false
            }

          })
        })
      }



      oldcategory && oldcategory?.forEach((item, idx) => {
        if (id == item.id) {
          if (item.checked == true) {
            Object.keys(JSON.parse(localStorage.getItem("subCategory") || '{}')).length != 0 && (
              JSON.parse(localStorage.getItem("subCategory")).cat_id == id ?
                localStorage.removeItem("subCategory")

                : ""

            )
          }

          //Object.keys(JSON.parse(localStorage.getItem("subCategory") || '{}')).length == 0 &&
          (shop == null) && item?.attributes.sub_categories?.forEach((sub, idx) => {

            if (sub.checked == true) {

              sub.checked = !sub.checked;
            }

          });
          sub_cat = item?.attributes?.sub_categories.length > 0 && item?.attributes?.sub_categories[0].id
          item.checked = !item.checked;
        }
      });


      const selectedCategory = oldcategory && oldcategory.filter((category) => {
        return category.checked
      })
      const selectedSubCategory = oldcategory && oldcategory.map((category) => {
        return (
          category.attributes.sub_categories.filter((subcat) => {
            return subcat.checked
          })
        )
      });

      //to remove search category from url
      if (urlSearch.get("q[sub_category_id][]") != null) {
        const sub_cate = urlSearch.get("q[sub_category_id][]").split(',')
        const filderSubCategoryIdArray = []
        const filderSubCategoryId = selectedSubCategory?.filter((cat) => cat.length > 0).map(item => {
          item[0].id
          item.forEach(subcat => filderSubCategoryIdArray.push(subcat.id))

        });
        // if (shop==null) {
        urlSearch.delete("q[sub_category_id][]");
        // }


        filderSubCategoryIdArray?.length > 0 && urlSearch.append("q[sub_category_id][]", filderSubCategoryIdArray.join(","));

      }

      const filderCategoryId = selectedCategory?.map((cat) => cat.attributes.id);
      urlSearch.delete("q[category_id][]");
      filderCategoryId?.length > 0 && urlSearch.append("q[category_id][]", filderCategoryId.join(","));
      // console.log(filderCategoryId, "filderCategoryIdfilderCategoryId")


      this.setState({ categoryList: oldcategory, filterObj: { ...this.state.filterObj, category: selectedCategory, sub_category: selectedSubCategory } }, () => {
        requestCheckMessage.addData(
          getName(MessageEnum.FilterCheckedMessageData),
          this.state.filterObj
        );

        runEngine.sendMessage(requestCheckMessage.id, requestCheckMessage);
      });
    }
    if (type == "sub_category") {
      let oldcategory = this.state.categoryList && [...this.state.categoryList];
      oldcategory && oldcategory?.forEach((item, idx) => {
        item?.attributes.sub_categories?.forEach((sub, idx) => {
          if (sub.id == id) {
            sub.checked = !sub.checked;
          }
        });

      });
      const selectedSubCategory = oldcategory && oldcategory.map((category) => {
        return (
          category.attributes.sub_categories.filter((subcat) => {
            return subcat.checked
          })

        )
      });


      const filderSubCategoryIdArray = []
      const filderSubCategoryId = selectedSubCategory?.filter((cat) => cat.length > 0).map(item => {
        item[0].id
        item.forEach(subcat => filderSubCategoryIdArray.push(subcat.id))

      });

      urlSearch.delete("q[sub_category_id][]");
      filderSubCategoryIdArray?.length > 0 && urlSearch.append("q[sub_category_id][]", filderSubCategoryIdArray.join(","));
      this.setState({ categoryList: oldcategory, filterObj: { ...this.state.filterObj, sub_category: selectedSubCategory } }, () => {
        requestCheckMessage.addData(
          getName(MessageEnum.FilterCheckedMessageData),
          this.state.filterObj
        );

        runEngine.sendMessage(requestCheckMessage.id, requestCheckMessage);
      });
    }
    if (type == "color") {
      let oldColor = [...this.state.colorList];

      if (shop != null || newArrivals != null) {
        oldColor && oldColor?.forEach((item, idx) => {
          if (item.checked == true) {
            item.checked = !item.checked;
          }
        })
      }
      oldColor.forEach((item, idx) => {
        if (id === item.id) {
          item.checked = !item.checked;
        }
      })

      const selectedColor = oldColor.filter((color) => {
        return color.checked;
      });

      const filterColorId = selectedColor?.map((cat) => cat.attributes.id);
      urlSearch.delete("q[color][]");
      filterColorId.length > 0 && urlSearch.append("q[color][]", filterColorId.join(","));

      this.setState(
        {
          colorList: oldColor,
          filterObj: { ...this.state.filterObj, color: selectedColor }
        }, () => {
          requestCheckMessage.addData(
            getName(MessageEnum.FilterCheckedMessageData),
            this.state.filterObj
          );

          runEngine.sendMessage(requestCheckMessage.id, requestCheckMessage);
        }
      );


    }
    if (type == 'size') {
      let oldSizes = [...this.state.sizesList];
      if (shop != null || newArrivals != null) {
        oldSizes && oldSizes?.forEach((item, idx) => {
          if (item.checked == true) {
            item.checked = !item.checked;
          }
        })
        if (shop != null || newArrivals != null) {
          urlSearch.delete("[sub_category]");
          urlSearch.delete("[newArrivals]");

        }
      }
      oldSizes.forEach((item, idx) => {
        if (id === item.id) {
          item.checked = !item.checked;
        }
      });
      const selectedSize = oldSizes.filter((tag) => {
        return tag.checked;
      });

      const filterSizeId = selectedSize?.map((cat) => cat.attributes.id);
      urlSearch.delete("q[size][]");
      filterSizeId.length > 0 && urlSearch.append("q[size][]", filterSizeId.join(","));

      this.setState(
        {
          sizesList: oldSizes,
          filterObj: { ...this.state.filterObj, size: selectedSize }
        }, () => {
          requestCheckMessage.addData(
            getName(MessageEnum.FilterCheckedMessageData),
            this.state.filterObj
          );

          runEngine.sendMessage(requestCheckMessage.id, requestCheckMessage);
        }
      );
    }
    if (type == 'price') {


      let priceRang = this.state.value;

      const minPrice = priceRang?.min;
      const maxPrice = priceRang?.max;
      urlSearch.delete("q[price][from]");
      urlSearch.delete("q[price][to]");


      urlSearch.append("q[price][from]", minPrice);
      maxPrice && urlSearch.append("q[price][to]", maxPrice);



      this.setState({
        value: priceRang,
        filterObj: { ...this.state.filterObj, price: priceRang }
      }, () => {
        requestCheckMessage.addData(
          getName(MessageEnum.FilterCheckedMessageData),
          this.state.filterObj
        );
        runEngine.sendMessage(requestCheckMessage.id, requestCheckMessage);

      });
    }
    if (type == 'discount') {
      const oldDiscount = this.state.isDiscountChecked;
      const includeDiscount = id
      urlSearch.delete("discounted_items");

      includeDiscount && urlSearch.append("discounted_items", includeDiscount);


      this.setState({
        filterObj: { ...this.state.filterObj, includeDiscount: includeDiscount }
      }, () => {
        requestCheckMessage.addData(
          getName(MessageEnum.FilterCheckedMessageData),
          this.state.filterObj
        );
        runEngine.sendMessage(requestCheckMessage.id, requestCheckMessage);
      })
    }
    if (type == 'outOfStock') {
      const oldSTock = this.state.isExcludeChecked;
      this.setState({
        filterObj: { ...this.state.filterObj, includeOutOfStock: true }
      }, () => {
        requestCheckMessage.addData(
          getName(MessageEnum.FilterCheckedMessageData),
          this.state.filterObj
        );
        runEngine.sendMessage(requestCheckMessage.id, requestCheckMessage);
      })
    }

    this.props.history.push(`/Filteroptions?${decodeURIComponent(urlSearch.toString())}`);
  };

  // choosing category from home page
  categoryChecked = () => {
    setTimeout(() => {

      localStorage.getItem("category") && this.state.categoryChecked != "" && this.toggleCheckBox(localStorage.getItem("category"), "category")
    }, 2500)
  }

  // choosing subcategory from home page
  subCategoryChecked = () => {
    let urlSearch = new URLSearchParams(window.location.search);
    const subCategoryObject = JSON.parse(localStorage.getItem("subCategory"));
    this.toggleCheckBox(urlSearch.get("q[category_id][]"), "category")
    this.toggleCheckBox("", "brand")
    this.toggleCheckBox("", "tag")
    this.toggleCheckBox("", "color")
    this.toggleCheckBox("", "size")

  }


  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  unCheckCheckBox = (type, id) => {
    if (type == "category") {
      let oldcategory = this.state.categoryList;
      let sub_cat = ""
      //console.log(oldcategory,"oldcategory");
      //console.log(this.state.filterObj.sub_category,"subcategory")

      oldcategory.forEach((item, idx) => {
        if (id == item.id) {
          sub_cat = item?.attributes.sub_categories[0].id
          item.checked = !item.checked;
        }
      });
      const selectedCategory = oldcategory.filter((category) => {
        return category.checked
      })

      this.toggleCheckBox(sub_cat, "sub_category")

      this.setState({ categoryList: oldcategory, filterObj: { ...this.state.filterObj, category: selectedCategory } })
    }
    if (type == "sub_category") {
      let oldcategory = [...this.state.categoryList];


      oldcategory && oldcategory?.forEach((item, idx) => {
        item?.attributes.sub_categories?.forEach((sub, idx) => {
          if (sub.id == id) {
            sub.checked = !sub.checked;
          }
        });

      });

      const selectedSubCategory = oldcategory && oldcategory.map((category) => {
        return (
          category.attributes.sub_categories.filter((subcat) => {
            // console.log(subcat,"subcaaat")
            return subcat.checked
          })

        )
      });

      this.setState({ categoryList: oldcategory, filterObj: { ...this.state.filterObj, category: selectedSubCategory } })
    }

    else if (type == "brand") {
      let oldbrands = [...this.state.brandList];
      oldbrands.forEach((item, idx) => {
        if (id == item.id) {
          item.checked = !item.checked;
        }
      });
      const selectedBrands = oldbrands.filter((brand) => {
        return brand.checked
      })
      this.setState({ brandList: oldbrands, filterObj: { ...this.state.filterObj, brand: selectedBrands } })
    }

    else if (type == "tag") {
      let oldtags = [...this.state.tagsList];
      oldtags.forEach((item, idx) => {
        if (id == item.id) {
          item.checked = !item.checked;
        }
      });
      const selectedtag = oldtags.filter((tag) => {
        return tag.checked
      })
      this.setState({ tagsList: oldtags, filterObj: { ...this.state.filterObj, tag: selectedtag } })
    }
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // localStorage.getItem("subCategory") && this.subCategoryChecked()

    this.setState({
      subCategorySearch: JSON.parse(localStorage.getItem("subCategory"))
    })
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token });
      this.getBrandList(token);
      this.getTagList(token);
      this.getCategoryList(token);
      this.getColorList(token);
      this.getPriceList(token);
      this.getSizeList(token);
      this.getPriceRangeList(token);
    }

    if (getName(MessageEnum.removeFilter) === message.id) {
      var responseJson = message.getData(
        getName(MessageEnum.removeFilterData)
      );
      this.toggleCheckBox(responseJson.id, responseJson.type);
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getProductApiCallId != null &&
      this.getProductApiCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getBrandProductApiCallId != null &&
      this.getBrandProductApiCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let brands = responseJson?.data?.brand.data;
      // setMaxProductValue(res.data.data?.max_product_value || 100000);
      if (Array.isArray(brands) && brands.length > 0) {
        this.setState({ brandList: brands });
      }
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getTagProductApiCallId != null &&
      this.getTagProductApiCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let tags = responseJson?.data;
      if (Array.isArray(tags) && tags.length > 0) {
        this.setState({ tagsList: tags });
      }
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getProductCategoryApiCallId != null &&
      this.getProductCategoryApiCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let category = responseJson?.data;
      if (Array.isArray(category) && category.length > 0) {
        this.setState({ categoryList: category });
        this.categoryChecked()
        //localStorage.getItem("subCategory") && this.subCategoryChecked()
        // this.forBannertoggleCheckBox()
      }
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getProductColorApiCallId != null &&
      this.getProductColorApiCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let color = responseJson?.data;
      if (Array.isArray(color) && color.length > 0) {
        this.setState({ colorList: color });
      }
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getProductPriceApiCallId != null &&
      this.getProductPriceApiCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let price = responseJson?.data;
      if (Array.isArray(price) && price.length > 0) {
        this.setState({ priceList: price });
      }
    }
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getProductSizeApiCallId != null &&
      this.getProductSizeApiCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let sizes = responseJson?.data;
      if (Array.isArray(sizes) && sizes.length > 0) {
        this.setState({ sizesList: sizes });
      }
    }
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getPiceListAPICallId != null &&
      this.getPiceListAPICallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      if (responseJson && responseJson.data) {
        let maxRangeValue = responseJson.data?.maximum_price;
        let minRangeValue = responseJson.data?.minimum_price;
        let finalRangeValues = {
          // min: minRangeValue,
          min: 0,
          max: maxRangeValue
        }
        this.setState({
          value: finalRangeValues,
          maxPrice: responseJson.data?.maximum_price,
          // minPrice : responseJson.data?.min_product_value
          // priceList: finalRangeValues
        });
        // console.log(finalRangeValues, "Price Range is Calling ", this.state.priceList);
      }
    }
  }

  getBrandList = (token: any) => {
    const header = {
      "Content-Type": configJSON.productApiContentType,
      token: localStorage.getItem("token")
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getBrandProductApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.brandAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  getTagList = (token: any) => {
    const header = {
      "Content-Type": configJSON.productApiContentType,
      token: localStorage.getItem("token")
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getTagProductApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.tagsAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  getCategoryList = (token: any) => {
    const header = {
      "Content-Type": configJSON.productApiContentType,
      token: localStorage.getItem("token")
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getProductCategoryApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.categoryAPIEndPointWeb
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  getColorList = (token: any) => {
    const header = {
      "Content-Type": configJSON.productApiContentType,
      token: localStorage.getItem("token")
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getProductColorApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.colorAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  getPriceList = (token: any) => {
    const header = {
      "Content-Type": configJSON.productApiContentType,
      token: localStorage.getItem("token")
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getProductPriceApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.priceAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  getListRequest = (token: any) => {

    const header = {
      "Content-Type": configJSON.productApiContentType,
      token: localStorage.getItem("token")
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getProductApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.productAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  //GET Size's List API
  getSizeList = () => {
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getProductSizeApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.sizeAPIEndPoint
    );

    const header = {
      "Content-Type": configJSON.productApiContentType,
      token: localStorage.getItem("token")
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  //GET Price Range List API
  getPriceRangeList = () => {
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getPiceListAPICallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.brandAPiEndPoint);

    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: localStorage.getItem('token')
    };
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(headers));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypeGet);

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }
  // Customizable Area Start
  // Customizable Area End
}