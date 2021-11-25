// @ts-nocheck
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import isEmpty from "lodash/isEmpty";
import { runEngine } from "../../../framework/src/RunEngine";
import StorageProvider from '../../../framework/src/StorageProvider';

export const configJSON = require("./config");
//@ts-ignore
import content from "../../../components/src/content.js"


export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  token: string;
  data: any;
  productList: any,
  isSortByEnabled: boolean,
  showSortByModal: boolean,
  filterSelection: any,
  filterQueryParams: string,
  lastFilterQuery: string,
  noProductFound: boolean,
  customErrorModal: boolean,
  customErrorMessage: any,
  isFetching: boolean,
  screenName: string;
  cartProduct: any;
  cartLength: number;
  isShowError: boolean;
  filterData: any;
  filterProducList: any;
  sortMenu: Array<any>;
  dropdownOpen: boolean,
  sort_by: string,
  order_by: string,
  value: string,
  order_field: string,
  page: any,
  per_page: any,
  cartId: any,
  productToBeAdded: any,
  searchQuery: any,
  newest: any
  loading: boolean,
  loadMoreShow: any,
  prevUrl: string
  Url: string
  qParams: string,
  loading: boolean
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class FilteritemsController extends BlockComponent<
  Props,
  S,
  SS
> {

  getProductApiCallId: any;
  applyFilterApiCallId: any;
  addToWishlistApiCallId: any;
  removeFromWishlistApiCallId: any;
  getCartProductId: any;
  addToCartApiCallId: any;
  GetIsCartCreatedApiCallId: string = "";
  postCreateCartApiCallId: string = ""

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.FilterCheckedMessage),
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      token: "",
      data: "",
      productList: [],
      showSortByModal: false,
      isShowError: false,
      isSortByEnabled: false,
      filterSelection:
        [
          {
            isSelected: false,
          },
          {
            isSelected: false,
          },
          {
            isSelected: false,
          },
          {
            isSelected: false,
          }
        ],
      filterQueryParams: "",
      lastFilterQuery: "",
      noProductFound: false,
      customErrorModal: false,
      customErrorMessage: "",
      isFetching: false,
      screenName: "",
      cartProduct: null,
      cartLength: 0,
      filterData: { brand: [], color: [], tag: [], category: [], price: [] },
      filterProducList: [],
      sort_by: "",
      order_by: "",
      order_field: "",
      sortMenu: [
        { label: content.AllProduct, order_by: "", direction: "" },
        { label: content.LowtoHigh, order_by: "price", direction: "asc" },
        { label: content.HightoLow, order_by: "price", direction: "desc" },
        { label: content.ByPopularity, order_by: "sold", direction: 'desc' },
        { label: content.ByNewest, order_by: "created_at", direction: 'desc' },
        { label: content.Recommended, order_by: "recommended", direction: "desc" },
      ],
      dropdownOpen: false,
      value: "All Product",
      page: 1,
      per_page: 15,
      cartId: "",
      productToBeAdded: "",
      newest: localStorage.getItem("newest"),
      searchQuery: localStorage.getItem("searchQuery"),
      loading: false,
      loadMoreShow: '',
      prevUrl: "",
      Url: "",
      qParams: new URLSearchParams(window.location.search),
      loading: false
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }



  removeFilter = (data, type, itemId) => {
    if (type == "category") {

      Object.keys(JSON.parse(localStorage.getItem("subCategory") || '{}')).length != 0 && (
        JSON.parse(localStorage.getItem("subCategory")).cat_id == itemId ?
          localStorage.removeItem("subCategory") : ""

      )
      let oldcategory = this.state.filterData.category


      const removeFav = this.state.filterData.category.filter((item) => {
        return item.attributes.name !== data.name
      });
      this.setState({
        filterData: { ...this.state.filterData, category: removeFav }
      }, this.getProductList())
      localStorage.removeItem("category")
      const requestCheckMessage = new Message(
        getName(MessageEnum.removeFilter)
      );
      requestCheckMessage.addData(
        getName(MessageEnum.removeFilterData),
        { type: "category", id: itemId }
      );


      runEngine.sendMessage(requestCheckMessage.id, requestCheckMessage);
    }

    if (type == "brand") {
      const removeFav = this.state.filterData.brand.filter((item) => {
        return item.attributes.name !== data.name
      });
      this.setState({
        filterData: { ...this.state.filterData, brand: removeFav }
      }, this.getProductList())

      const requestCheckMessage = new Message(
        getName(MessageEnum.removeFilter)
      );
      requestCheckMessage.addData(
        getName(MessageEnum.removeFilterData),
        { type: "brand", id: itemId }
      );
      runEngine.sendMessage(requestCheckMessage.id, requestCheckMessage);
    }

    if (type == "tag") {
      const removeFav = this.state.filterData.tag.filter((item) => {
        return item.attributes.name !== data.name
      });
      this.setState({
        filterData: { ...this.state.filterData, tag: removeFav }
      }, this.getProductList())

      const requestCheckMessage = new Message(
        getName(MessageEnum.removeFilter)
      );
      requestCheckMessage.addData(
        getName(MessageEnum.removeFilterData),
        { type: "tag", id: itemId }
      );
      runEngine.sendMessage(requestCheckMessage.id, requestCheckMessage);
    }
  }

  async componentDidMount() {
    Object.keys(JSON.parse(localStorage.getItem("subCategory") || '{}')).length == 0 &&
      this.getProductList()
  }

  componentWillReceiveProps(nextProps: any) {
    this.setState({
      searchQuery: localStorage.getItem("searchQuery"),
      newest: localStorage.getItem("newest"),
      filterProducList: []
    })
    if (!isEmpty(localStorage.getItem("searchQuery")) || !isEmpty(localStorage.getItem("newest"))) {
      setTimeout(() => {
        this.getProductList();
      }, 300)
    }
    //let urlSearch = new URLSearchParams(window.location.search);

    // if (urlSearch.get("[newArrivals]") == "true") {
    //   this.setState({
    //     filterProducList: []
    //   })
    //   urlSearch.delete("[newArrivals]")
    //   this.props.history.push(`/Filteroptions?${decodeURIComponent(urlSearch.toString())}`);
    //   console.log("product will recieve working")
    // }

  }


  async receive(from: string, message: Message) {

    this.setState({
      searchQuery: localStorage.getItem("searchQuery"),
      newest: localStorage.getItem("newest"),
    })
    // Customizable Area Start
    if (getName(MessageEnum.FilterCheckedMessage) === message.id) {
      const FilterData = message.getData(
        getName(MessageEnum.FilterCheckedMessageData)
      );
      this.setState({ filterData: FilterData, page: 1, filterProducList: [] }, () => this.getProductList());


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
      if (responseJson) {
        if (apiRequestCallId === this.getProductApiCallId) {
          let array = responseJson.data;
          this.setState({ productList: responseJson.data.catalogue.data, noProductFound: false, isFetching: false });
          // this.setState({productList:array})
        }

        if (apiRequestCallId === this.getProductCategoryApiCallId) {
          let productData = responseJson.data;
          (productData && productData.length == 15) ? this.setState({ loadMoreShow: true }) : this.setState({ loadMoreShow: false })

          //this.state.Url && this.props.history.push(`/FilterOptions?${this.state.Url}`);


          // this.setState({
          //   loading :false
          // })

          if (responseJson) {
            this.setState({ loading: false });

          } else {
            this.setState({ loading: true });
          }

          productData && this.setState({ filterProducList: [...this.state?.filterProducList, ...productData] });


        }

        // if (apiRequestCallId === this.putItemToCartApiCallId) {
        //     window.notify([{ message: 'Item added in cart successfully' , type: "success" }]);
        //     window.location.pathname ==="/home-page" ?  "": this.state.catalogue_id && this.getProductList()   
        // }

        //create wishlist 
        if (apiRequestCallId === this.postWishlistApiCallId) {
          this.setState({ filterProducList: [] });
          window.notify([{ message: responseJson.message, type: "success" }]);
          // @ts-ignore
          const wishlist_length = parseInt(localStorage.getItem("wishlist_len"))
          // @ts-ignore
          localStorage.setItem("wishlist_len", wishlist_length + 1)
          this.getProductList();
          window.location.pathname === "/Filteroptions" ? "" : this.state.catalogue_id && this.getProductList()

        }

        //delete wishlist 
        if (apiRequestCallId === this.delWishlistApiCallId) {
          this.setState({ filterProducList: [] });
          window.notify([{ message: responseJson.message, type: "success" }]);
          this.getProductList();
          // @ts-ignore
          const wishlist_length = parseInt(localStorage.getItem("wishlist_len"))
          // @ts-ignore
          localStorage.setItem("wishlist_len", wishlist_length - 1)
          window.location.pathname === "/Filteroptions" ? "" : this.state.catalogue_id && this.getProductList()
        }

        //product details
        if (apiRequestCallId === this.getProductDetailsApiCallId) {
          //console.log(responseJson.data, "product details")
          this.setState({
            productDetails: responseJson.data,
            itemQuantity: 1
          })
          this.toSetDefaultVariant();
        }

        // add items to the cart
        if (apiRequestCallId === this.putItemToCartApiCallId) {
          if (!responseJson.errors) {
            // console.log(responseJson, "add items to the cart");
            window.notify([{ message: "Item added in cart successfully", type: "success" }]);
            this.setState({ filterProducList: [] });
            // @ts-ignore

            const cart_length = parseInt(localStorage.getItem("cart_length"))

            // @ts-ignore
            this.getProductList()
            localStorage.setItem("cart_length", cart_length + 1)
            window.location.pathname === "/Filteroptions" ? "" : this.state.catalogue_id && this.getProductList()
          }
          if (responseJson?.errors) {
            window.notify([{ message: responseJson.errors[0].order, type: "error" }]);

          }
        }

        // add to cart 
        //is cart created || checking
        if (apiRequestCallId === this.GetIsCartCreatedApiCallId) {
          //console.log(responseJson, "is cart created")
          responseJson?.data && responseJson?.data?.length > 0 &&
            this.setState({
              cartId: responseJson?.data[0]?.id
            })



        }

        /// creating cart
        if (apiRequestCallId === this.postCreateCartApiCallId) {
          //console.log(responseJson, " cart created")
          if (responseJson?.data) {
            //@ts-ignore
            window.notify([{ message: "Item added in cart successfully", type: "success" }]);
            this.setState({ filterProducList: [] });
            // @ts-ignore

            const cart_length = parseInt(localStorage.getItem("cart_length"))

            // @ts-ignore
            this.getProductList()
            localStorage.setItem("cart_length", 1)
            //this.getIsCartCreated();
            // this.getProductDetails();
          }
          if (responseJson?.errors) {
            window.notify([{ message: responseJson.errors[0].order, type: "error" }]);

          }

        }

      } if (responseJson?.errors) {
        var errorReponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );

        const errors = responseJson?.errors;
        this.parseApiCatchErrorResponse(errorReponse);
        (errors)
      }
    }
  }

  // add to wishlist 
  postWishlist = (catalogue_id: any): boolean => {
    //console.log(catalogue_id, "catalogue_id")
    const header = {
      "Content-Type": configJSON.productApiContentType,
      token: localStorage.getItem("token"),
    };

    const httpBody = {
      "catalogue_id": catalogue_id,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postWishlistApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiPostWishlist
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypePost
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  //remove wishlist 
  delWishlist = (catalogue_id: any): boolean => {
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: localStorage.getItem("token"),

    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.delWishlistApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiDelWishlist + `${catalogue_id}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.DeleteMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };


  // add items into the cart
  putItemToCart = (cartId: any): boolean => {
    const product = this.state.productToBeAdded
    const header = {
      "Content-Type": configJSON.productApiContentType,
      token: localStorage.getItem("token"),

    };

    const httpBody = {
      "catalogue_id": product.catalogue_id,
      "catalogue_variant_id": product.id,
      "quantity": 1
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.putItemToCartApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.addToCartApiEndPoint + `${cartId}/add_item`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.putAPiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };


  // add to cart 
  //is cart created || checking
  getIsCartCreated = (): boolean => {
    const headers = {
      "Content-Type": configJSON.productApiContentType,
      token: localStorage.getItem("token"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.GetIsCartCreatedApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getCartApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  //post create cart

  postCreateCart = (product: any): boolean => {
    // const product = this.state.productToBeAdded

    const header = {
      "Content-Type": configJSON.productApiContentType,
      token: localStorage.getItem("token"),
    };

    const httpBody = {
      "catalogue_id": product.catalogue_id,
      "catalogue_variant_id": product.id,
      "quantity": 1

    };



    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postCreateCartApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getCartApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypePost
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };



  //  cart function 
  addToCart = (product: any) => {
    this.state.cartId == "" && this.getIsCartCreated();
    this.setState({
      productToBeAdded: product
    })
    setTimeout(() => {
      this.setState({
        productToBeAdded: product
      })

      this.state.cartId != "" ? this.putItemToCart(this.state.cartId) : this.postCreateCart(product)

    }, 900);


  }

  // get Product Details
  getProductDetails = (): boolean => {


    this.setState({
      catalogue_id: window.location.pathname.slice(6)
    })
    setTimeout(() => {
      const headers = {
        "Content-Type": configJSON.productApiContentType,
        token: localStorage.getItem("token"),
      };

      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.getProductDetailsApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.endPointApiGetProductDetails + `${this.state.catalogue_id}`
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(headers)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.apiMethodTypeGet
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
    }, 500)
    return true;
  };

  //toSetDefaultVariant
  toSetDefaultVariant = () => {

    const product = this.state.productDetails && this.state.productDetails

    let catalogue_variant_in_stock =
      product.attributes.stock_qty > 0
        ? product.attributes.default_variant.stock_qty > 0
          ? product.attributes.catalogue_variants.filter(
            (variant: any, index: any) => {
              return (
                variant.id ==
                parseInt(product.attributes.default_variant.id)
              );
            }
          )[0]
          : product.attributes.catalogue_variants.filter(
            (variant: any, index: any) => {
              return variant.attributes.stock_qty > 0;
            }
          )[0]
        : product.attributes.catalogue_variants[0];

    const productAvailable = this.state.productDetails && this.state.productDetails.attributes.catalogue_variants.filter(
      (item: any) => {
        return item.id == catalogue_variant_in_stock.id
      }
    )[0]

    this.setState({
      default_variant: this.state.productDetails.attributes.stock_qty > 0 ?
        productAvailable : this.state.productDetails,
      //    currentImage : this.state.productDetails.attributes.stock_qty >0 ?  productAvailable.attributes.images.data[0].url: this.state.productDetails.attributes.images.data[0].url,

    })

    this.state.productDetails.attributes.stock_qty > 0 ? this.setState({
      default_variant: productAvailable,
      currentImage: this.state.default_variant && this.state.default_variant.attributes.images.data[0].attributes.url,
      active_color: this.state.default_variant && this.state.default_variant.attributes.product_variant_properties[1].property_name,
      active_size: this.state.default_variant && this.state.default_variant.attributes.product_variant_properties[0].property_name
    }) : this.setState({
      default_variant: this.state.productDetails,
      currentImage: this.state.productDetails.attributes.images.data[0].url,
      catalogue_variant_id: this.state.productDetails.attributes.id

    })
    const pushed_sizes: any = []
    const colorFilter = this.state.productDetails.attributes.catalogue_variants.filter((item_available: any) => {
      return item_available.attributes.product_variant_properties[1].property_name == this.state.active_color
    })
    colorFilter.forEach((item: any) => {
      return pushed_sizes.push(item.attributes.product_variant_properties[0].property_name)
    })
    this.setState({
      available_sizes: pushed_sizes
    })
  }


  getProductList = (token: any) => {

    this.setState({
      loading: true
    })
    setTimeout(() => {

      const header = {
        "Content-Type": configJSON.productApiContentType,
        token: localStorage.getItem("token")
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      let urlSearch = new URLSearchParams(window.location.search);
      let url = configJSON.sortingFilteringAPiEndPoint;

      const newest = this.state.newest && this.state.newest;


      url += `?&page=${this.state.page}&per_page=${this.state.per_page}`;

      if (!localStorage.getItem("searchQuery") && urlSearch.get("q[name]") != null) {
        urlSearch.delete("q[name]")
        this.props.history.push(`/Filteroptions?${decodeURIComponent(urlSearch.toString())}`);
      }




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


      if (search != null) {
        url += "&q[name]=" + search
      }
      if (localStorage.getItem("newest")) {
        urlSearch.delete("[newArrivals]");
        localStorage.getItem("newest") == "By Newest" ? (
          this.setState({
            value: localStorage.getItem("newest"),
            order_by: "created_at",
            sort_by: "desc",
          })
        ) : this.setState({
          value: localStorage.getItem("newest"),
          order_by: "recommended",
          sort_by: "desc",
        })

      }
      //console.log("function working")
      if (cat_id != null) {

        url += url.indexOf("?") > -1 ? "&q[category_id][]=" + cat_id : "?q[category_id][]=" + cat_id
      }
      if (sub_cat_id != null) {
        url += url.indexOf("?") > -1 ? "&q[sub_category_id][]=" + sub_cat_id : "?q[sub_category_id][]=" + sub_cat_id
      }
      if (brand_id != null) {
        url += url.indexOf("?") > -1 ? "&q[brand_id][]=" + brand_id : "?q[brand_id][]=" + brand_id
      }
      if (tag_id != null) {
        url += url.indexOf("?") > -1 ? "&q[tag_id][]=" + tag_id : "?q[tag_id][]=" + tag_id
      }

      if (color_id != null) {
        url += url.indexOf("?") > -1 ? "&q[color][]=" + color_id : "?q[color][]=" + color_id
      }
      if (size_id != null) {
        url += url.indexOf("?") > -1 ? "&q[size]=" + size_id : "?q[size]=" + size_id
      }

      if (min_price != null || max_price != null) {
        console.log("price working++++++++++++++++++++++")
        url += url.indexOf("?") > -1 ? "&q[price][from]=" + min_price + "&" + "q[price][to]=" + max_price : ''
      }
      if (discount != null) {
        url += url.indexOf("?") > -1 ? "&discounted_items=" + discount
          : ''
      }

      if (order_by != null || sort_by != null) {
        const neworderby = this.state.sortMenu.filter((e, index) => {
          return e.order_by == order_by
        })[0].label
        //console.log(neworderby, "neworderbyneworderby")
        this.setState({
          order_by: order_by,
          sort_by: sort_by,
          value: neworderby

        })

      }




      //if (this.state.order_by || this.state.sort_by) {
      //this.props.history.push(`/Filteroptions?${decodeURIComponent(urlSearch.toString())}`);
      //}


      //setTimeout(() => {

      if (sort_by != null && order_by != null) {
        url += url.indexOf("?") > -1 ? "&sort[order_by]=" + order_by + "&sort[direction]=" + sort_by
          : "?sort[order_by]=" + order_by + "&sort[direction]=" + sort_by
      }



      this.getProductCategoryApiCallId = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        url
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
      //}, 1000)
    }, 1000)

  }


  // remove search
  removeSearchQuery = () => {
    localStorage.removeItem("searchQuery")
    this.setState({
      searchQuery: "",
      filterProducList: []
    })
    setTimeout(() => {

      this.getProductList()

    }, 300)

  }



  // Customizable Area Start
  // Customizable Area End
}