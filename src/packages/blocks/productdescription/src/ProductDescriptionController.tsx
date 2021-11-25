import { Share, BackHandler, AppState } from "react-native";

import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import StorageProvider from '../../../framework/src/StorageProvider';
import * as IMG_CONST from '../../studio-store-ecommerce-theme/src/ImageConstants';

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
  arrayHolder: any;
  token: string;
  productData: any;
  selectedProduct: any;
  currentSelection: any;
  selectedImage: any;
  similarProducts: any;
  showNotifiyModal: boolean;
  showNotifyButton: boolean;
  catalogue_variant_id: string;
  catalogue_id: string;
  quantity: any;
  productQuantity: any;
  cart_id: string;
  isShowError: boolean;
  showAlertModal: boolean;
  message: any;
  isFetching: boolean;
  selectedAttributes: any;
  cartProduct: any;
  availableAttributes: any;
  customErrorModal: boolean;
  ratingList: any;
  isGuestUser: boolean;
  updateCart: boolean;
  isProductAvailable: boolean;
  showGuestModal: boolean;
  appState: any;
  // Customizable Area End
}

interface SS {
  id: any;
}
export default class ProductDescriptionController extends BlockComponent<Props, S, SS> {
  getProductDescriptionApiCallId: any;
  getBuyProductApiCallId: any;
  getNotifyProductApiCallId: any;
  updateQtyApiCallId: any;
  addToCartApiCallId: any;
  addToWishlistApiCallId: any;
  removeFromWishlistApiCallId: any;
  getCartProductId: any;
  getCartProductDescriptionId: any;
  _unsubscribe: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage)
    ];
    this.state = {
      arrayHolder: [],
      token: "",
      productData: null,
      selectedProduct: null,
      currentSelection: null,
      selectedImage: "",
      similarProducts: null,
      showNotifiyModal: false,
      showNotifyButton: true,
      catalogue_id: '',
      catalogue_variant_id: '',
      quantity: 1,
      productQuantity: 1,
      cart_id: '',
      isShowError: false,
      isFetching: false,
      message: null,
      showAlertModal: false,
      selectedAttributes: {},
      cartProduct: null,
      availableAttributes: null,
      customErrorModal: false,
      ratingList: [1, 1, 1, 1, 1],
      isGuestUser: false,
      updateCart: false,
      isProductAvailable: true,
      showGuestModal: false,
      appState: AppState.currentState,
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    let arr = this.props.navigation.getParam("productData")
    const isGuestUser = await StorageProvider.get('GUEST_USER');
    this.setState({ isGuestUser: isGuestUser || false });
    this._unsubscribe = this.props.navigation.addListener('willFocus', () => {
      this.setState({ selectedAttributes: {} }, () => {
        this.getToken();
      });
    });
    this.getToken();
    AppState.addEventListener('change', this._handleAppStateChange);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  _handleAppStateChange = (nextAppState: any) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.getToken();
    }
    this.setState({ appState: nextAppState });
  }

  handleBackButtonClick = () => {
    if (this.props.navigation.state.params && this.props.navigation.state.params.isFromDeepLink) {
      this.props.navigation.replace('MainNavigator');
      return true;
    } else {
      this.props.navigation.goBack();
      return true;
    }
  }

  async componentWillUnmount() {
    this._unsubscribe.remove();
    runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  setDefaultVarient = () => {
    const { attributes } = this.state.productData;
    const { catalogue_variants } = attributes;
    if (catalogue_variants.length > 0) {
      catalogue_variants.map((varient: any) => {
        if (varient.id == this.state.catalogue_variant_id) {
          const { images } = varient.attributes;
          let isVarientImage = images.data.length > 0;
          let selectedAttributes = {};
          varient.attributes.product_variant_properties.map((property: any) => {
            let data = {
              ...property,
              id: property.variant_property_id,
              name: property.property_name
            }
            selectedAttributes = {
              ...selectedAttributes,
              [property.variant_name]: data,
            };
          });
          this.setState(
            {
              selectedAttributes: selectedAttributes,
              selectedImage: isVarientImage
                ? images.data[0].attributes.url
                : attributes.images.data[0].attributes.url,
              selectedProduct: varient,
            },
            () => {
              this.setAvailbleAttributesForSelected();
            },
          );
        }
      });
    }
  };


  getToken = async () => {
    const token = await StorageProvider.get('Userdata');
    this.setState({ token: token })
    this.getProductDescriptionRequest(token);
    this.getCartHasProduct();
  };

  async receive(from: string, message: Message) {
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

      if (responseJson && responseJson?.data) {
        if (apiRequestCallId === this.getProductDescriptionApiCallId) {
          let catalogueVariantId = '';
          if (responseJson?.data.attributes.catalogue_variants.length > 0) {
            let count = 0;
            responseJson?.data.attributes.catalogue_variants.map((varient: any) => {
              if (varient.attributes.stock_qty > 0 && count === 0) {
                catalogueVariantId = varient.id
                count = count + 1;
              }
            });
          }
          let array1 = responseJson?.data.attributes?.product_attributes;
          const selectedProduct = responseJson?.data.attributes.catalogue_variants.find((cat: any) => cat.id == this.props.navigation.state.params?.catalogue_variant_id);
          this.setState({
            isFetching: false,
            productData: responseJson?.data,
            selectedProduct: selectedProduct || null,
            availableAttributes: array1,
            catalogue_id: responseJson?.data.id,
            showNotifyButton: responseJson?.data.attributes.product_notified,
            catalogue_variant_id: catalogueVariantId,
            isProductAvailable: true,
          }, () => { this.setDefaultVarient() });

        } else if (apiRequestCallId === this.getCartProductDescriptionId) {
          let catalogueVariantId = '';
          if (responseJson?.data.attributes.catalogue_variants.length > 0) {
            let count = 0;
            responseJson?.data.attributes.catalogue_variants.map((varient: any) => {
              if (varient.attributes.stock_qty > 0 && count === 0) {
                catalogueVariantId = varient.id
                count = count + 1;
              }
            });
          }
          const selectedProduct = responseJson?.data.attributes.catalogue_variants.find((cat: any) => cat.id == this.props.navigation.state.params?.catalogue_variant_id || responseJson.data.attributes.variants_in_cart[0]);
          this.setState({
            isFetching: false,
            productData: responseJson?.data,
            selectedProduct: selectedProduct,
            quantity: selectedProduct.attributes.cart_quantity ? selectedProduct.attributes.cart_quantity : 1,
            updateCart: responseJson?.data.attributes.variants_in_cart.includes(this.state.selectedProduct.attributes.id) ? true : false,
            availableAttributes: responseJson?.data.attributes?.product_attributes,
            showNotifyButton: responseJson?.data.attributes.product_notified,
            catalogue_variant_id: this.props.navigation.state.params?.catalogue_variant_id || catalogueVariantId,
            isProductAvailable: true,
          }, () => { this.setDefaultVarient() })
        } else if (apiRequestCallId === this.getBuyProductApiCallId) {
          this.setState({
            isFetching: false,
          }, () => setTimeout(() => {
            this.props.navigation.push("Checkout", { isFromBuyNow: true, buyNowCartID: responseJson.data.id });
          }, 0))

        } else if (apiRequestCallId === this.getNotifyProductApiCallId) {
          this.setState({ showNotifiyModal: true, showNotifyButton: false, selectedAttributes: {} }, () => {
            this.getToken();
          })
        } else if (apiRequestCallId === this.addToWishlistApiCallId) {
          this.setState({ isFetching: false, isShowError: false, customErrorModal: true, message: "Product added to wishlist." });
          this.getProductDescriptionRequest(this.state.token);
        } else if (apiRequestCallId === this.removeFromWishlistApiCallId) {
          this.setState({ isFetching: false, isShowError: true, customErrorModal: true, message: "Product removed from wishlist." });
          this.getProductDescriptionRequest(this.state.token);
        } else if (apiRequestCallId === this.getCartProductId) {
          if (responseJson?.data.order_id) {
            this.getCartProduct(responseJson?.data.order_id);
            this.setState({ cartProduct: responseJson?.data, cart_id: responseJson?.data.order_id })
          }
          this.setState({ isFetching: false, cartProduct: responseJson?.data })
        } else if (apiRequestCallId === this.addToCartApiCallId) {
          this.setState({ isFetching: false, isShowError: false, showAlertModal: true, message: "Product added to cart successfully." }, () => {
            this.getToken();
          });
        } else if (apiRequestCallId === this.updateQtyApiCallId) {
          this.setState({ isFetching: false, isShowError: false, showAlertModal: true, message: "Update product quantity successfully." }, () => {
            this.getToken();
          });
        }

      }
      if (responseJson && responseJson.errors) {
        if (apiRequestCallId === this.addToCartApiCallId) {
          this.setState({
            isFetching: false,
            isShowError: true,
            showAlertModal: true,
            customErrorModal: true,
            message: this.parseApiErrorResponse(responseJson)
          });
        } else if (apiRequestCallId === this.getCartProductDescriptionId) {
          this.setState({
            isShowError: true,
            showAlertModal: true,
            isFetching: false,
            message: this.parseApiErrorResponse(responseJson)
          });
        } else if (apiRequestCallId === this.getBuyProductApiCallId) {
          this.setState({
            isShowError: true,
            showAlertModal: true,
            isFetching: false,
            message: this.parseApiErrorResponse(responseJson)
          });

        } else if (apiRequestCallId === this.getNotifyProductApiCallId) {
          this.setState({
            isShowError: true,
            showAlertModal: true,
            isFetching: false,
            message: responseJson.errors
          });
        } else if (apiRequestCallId === this.addToWishlistApiCallId) {
          this.setState({
            isShowError: true,
            showAlertModal: true,
            isFetching: false,
            message: responseJson.errors
          });
        } else if (apiRequestCallId === this.removeFromWishlistApiCallId) {
          this.setState({
            isShowError: true,
            showAlertModal: true,
            isFetching: false,
            message: responseJson.errors
          });
        } else if (apiRequestCallId === this.getCartProductId) {
          this.setState({ cartProduct: null });
        } else if (apiRequestCallId === this.updateQtyApiCallId) {
          this.setState({
            isShowError: true,
            showAlertModal: true,
            isFetching: false,
            message: this.parseApiErrorResponse(responseJson)
          });
        }
      }
      if (responseJson?.message) {
        if (apiRequestCallId === this.addToCartApiCallId) {
          this.setState({
            isFetching: false,
            isShowError: false,
            showAlertModal: true,
            customErrorModal: true,
            message: responseJson?.message
          });
        } else if (apiRequestCallId === this.getCartProductDescriptionId) {

        } else if (apiRequestCallId === this.getNotifyProductApiCallId) {
          this.setState({
            isShowError: true,
            showAlertModal: true,
            isFetching: false,
            message: responseJson?.message
          });
        } else if (apiRequestCallId === this.addToWishlistApiCallId) {
          this.setState({
            isShowError: false,
            showAlertModal: true,
            isFetching: false,
            message: responseJson?.message
          });
        } else if (apiRequestCallId === this.removeFromWishlistApiCallId) {
          this.setState({
            isShowError: true,
            showAlertModal: true,
            isFetching: false,
            message: responseJson?.message
          });
        } else if (apiRequestCallId === this.getCartProductId) {
          this.setState({ cartProduct: null });
        } else if (apiRequestCallId === this.addToCartApiCallId) {
          this.setState({
            isShowError: false,
            showAlertModal: true,
            isFetching: false,
            message: responseJson?.message
          });
        } else if (apiRequestCallId === this.updateQtyApiCallId) {
          this.setState({
            isShowError: false,
            showAlertModal: true,
            isFetching: false,
            message: responseJson?.message
          });
        }
      }
      if (errorReponse) {
        if (apiRequestCallId === this.addToCartApiCallId) {
          this.setState({
            isFetching: false,
            isShowError: true,
            showAlertModal: true,
            message: errorReponse
          });
        } else if (apiRequestCallId === this.getCartProductDescriptionId) {
          this.setState({
            isFetching: false,
            isShowError: true,
            showAlertModal: true,
            message: errorReponse
          });
        } else if (apiRequestCallId === this.getNotifyProductApiCallId) {
          this.setState({
            isFetching: false,
            isShowError: true,
            showAlertModal: true,
            message: errorReponse
          });
        } else if (apiRequestCallId === this.addToWishlistApiCallId) {
          this.setState({
            isFetching: false,
            isShowError: true,
            showAlertModal: true,
            message: errorReponse
          });
        } else if (apiRequestCallId === this.removeFromWishlistApiCallId) {
          this.setState({
            isFetching: false,
            isShowError: true,
            showAlertModal: true,
            message: errorReponse
          });
        } else if (apiRequestCallId === this.getCartProductId) {
          this.setState({
            isFetching: false,
            isShowError: true,
            showAlertModal: true,
            message: errorReponse,
            cartProduct: null,
          });
        } else if (apiRequestCallId === this.addToCartApiCallId) {
          this.setState({
            isFetching: false,
            isShowError: true,
            showAlertModal: true,
            message: errorReponse
          });
        }
      }
    }
    // Customizable Area End
  }
  getProductDescriptionRequest = async (token: any) => {
    let arr = this.props.navigation.getParam("productData")
    if (this.props.navigation.state.params.isFromSP) arr.id = arr.product.id;
    this.getProductDescriptionApiCallId = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: configJSON.productDescriptionAPiEndPoint + '/' + arr.id
    });
  };

  onPressTool = (item: any, attribute: any) => {
    this.setState({
      selectedAttributes: {
        ...this.state.selectedAttributes,
        [attribute]: item,
      },
      currentSelection: attribute,
    },
      () => {
        this.setSelectedProduct();
      });
  }

  onPressBuyNow = async () => {
    if (this.state.isGuestUser) {
      this.setState({ showGuestModal: true });
      return;
    }
    if (this.state.catalogue_variant_id) {
      const httpBody = {
        catalogue_id: this.state.catalogue_id,
        catalogue_variant_id: this.state.catalogue_variant_id,
        quantity: this.state.quantity
      };
      this.setState({ isFetching: true });
      this.getBuyProductApiCallId = await this.apiCall({
        contentType: configJSON.productApiContentType, method: configJSON.apiMethodTypePost, endPoint: configJSON.buyNowAPiEndPoint, body: httpBody
      });
    } else {
      this.setState({ showAlertModal: true, isShowError: true, message: "Please select a variant" })
    }
  }

  notifyProduct = async () => {
    let catalogueVariantId = this.state.catalogue_variant_id;
    if (catalogueVariantId === '') {
      catalogueVariantId = this.state.productData.attributes.catalogue_variants[0].id
    }
    this.getNotifyProductApiCallId = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.apiMethodTypePost,
      endPoint: configJSON.productNotifyAPiEndPoint + catalogueVariantId + "/notify_product",
    });
  }

  updateQty = async () => {
    const httpBody = {
      quantity: this.state.quantity,
      product_id: Number(this.state.catalogue_id),
      product_variant_id: this.state.catalogue_variant_id
    }

    this.updateQtyApiCallId = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.apiMethodTypePut,
      endPoint: configJSON.updateQtyEndPoint + this.state.cart_id + "/update_item_quantity",
      body: httpBody
    });

  }
  viewAll() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationRaiseMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  similarProducts = (item: any) => {
    this.props.navigation.push('ProductDescription', { productData: item, isFromSP: false })
  }

  onUpdateCartValue = (value: boolean) => {
    if (value) {
      var qty = Number(this.state.quantity) + 1
      this.setState({
        quantity: String(qty)
      })
    } else {
      var qty = this.state.quantity == "1" ? 1 : Number(this.state.quantity) - 1
      this.setState({
        quantity: String(qty)
      })
    }
  }

  apiCall = async (data: any) => {
    const { contentType, method, endPoint, body } = data;
    const token = (await StorageProvider.get('Userdata')) || "";
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

  addToCart = async () => {
    const { productData, selectedProduct, quantity } = this.state;
    const isUpdate = (selectedProduct?.attributes?.cart_quantity !== quantity) && selectedProduct?.attributes?.cart_quantity > 0;
    const isInCart = (selectedProduct?.attributes?.cart_quantity > 0);
    if (isInCart && !isUpdate) {
      this.props.navigation.navigate("Shoppingcart");
      return;
    }
    if (this.state.catalogue_variant_id) {
      const httpBody = {
        catalogue_id: this.state.catalogue_id,
        catalogue_variant_id: this.state.catalogue_variant_id,
        quantity: this.state.quantity
      };
      this.setState({ isFetching: true });
      if (this.state.cartProduct?.has_cart_product && this.state.cartProduct.order_id !== null) {
        if (this.state.updateCart) {
          this.updateQty();
        } else {
          this.addToCartApiCallId = await this.apiCall({
            contentType: configJSON.productApiContentType,
            method: configJSON.apiMethodTypePut,
            endPoint: configJSON.addToCartApiEndPoint + this.state.cartProduct.order_id + '/add_item',
            body: httpBody
          });
        }
      } else {
        this.addToCartApiCallId = await this.apiCall({
          contentType: configJSON.productApiContentType,
          method: configJSON.apiMethodTypePost,
          endPoint: configJSON.addToCartApiEndPoint,
          body: httpBody
        })
      }
    } else {
      this.setState({ showAlertModal: true, isShowError: true, message: "Please select a variant" })
    }
  }

  addToWishlist = async (id: any) => {
    this.setState({ isFetching: true })

    const httpBody = {
      catalogue_id: id
    };
    this.addToWishlistApiCallId = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.apiMethodTypePost,
      endPoint:
        configJSON.addToWishlistApiEndPoint,
      body: httpBody
    });
  };

  removeFromWishlist = async (id: any) => {
    this.setState({ isFetching: true })
    this.removeFromWishlistApiCallId = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.DeleteMethodType,
      endPoint:
        configJSON.addToWishlistApiEndPoint + "/remove_catalogue/" + id
    });
  }

  onHeartPress = (item: any, pageName: string) => {
    if (pageName === "description") {
      item.attributes?.wishlisted ? this.removeFromWishlist(item.id) : this.addToWishlist(item.id)
    } else {
      item.attributes?.wishlisted ? this.removeFromWishlist(item.id) : this.addToWishlist(item.id)
    }
  };

  getCartHasProduct = async () => {
    this.setState({ isFetching: true });
    this.getCartProductId = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: configJSON.cartHasProductAPIEndPoint
    })
  }

  getCartProduct = async (cart_id: any) => {
    let arr = this.props.navigation.getParam("productData")
    this.setState({ isFetching: true });
    this.getCartProductDescriptionId = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.apiMethodTypeGet,
      endPoint: `${configJSON.cartQuantity}${arr.id}?cart_id=${cart_id}`
    })
  }

  getStarImage = (index: number, ratingValue: any) => {
    if (index < ratingValue) {
      let diffValue = ratingValue - index;
      if (diffValue < 1) {
        if (diffValue < 0.5) {
          return IMG_CONST.LOWER_SELECTED_STAR;
        } else if (diffValue === 0.5) {
          return IMG_CONST.HALF_SELECTED_STAR;
        } else {
          return IMG_CONST.UPPER_SELECTED_STAR;
        }
      }
      return IMG_CONST.SELECTED_STAR;
    } else {
      return IMG_CONST.UNSELECTED_STAR;
    }
  }

  onShare = async () => {
    try {
      const result = await Share.share({
        message: this.state.productData.attributes?.deep_link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  setAvailbleAttributesForSelected = () => {
    const { productData, selectedAttributes, currentSelection } = this.state;
    const { availabity, catalogue_variants, product_attributes, variants_in_cart } = productData.attributes;
    let availableAttributes: any = {};
    if (catalogue_variants) {
      catalogue_variants.map((item: any, index: number) => {
        const { product_variant_properties } = item.attributes;
        let attributeFound = false;
        let selectedVarientPropertyIds = [];
        let varientPropertyIds: any = [];
        product_variant_properties.map((variantProperty: any) => {
          varientPropertyIds.push(variantProperty.variant_property_id);
        })

        for (const attribute in selectedAttributes) {
          selectedVarientPropertyIds.push(selectedAttributes[attribute].id);
        }

        attributeFound = selectedVarientPropertyIds.every(val => varientPropertyIds.includes(val));

        if (attributeFound) {
          product_variant_properties.map((variantProperty: any) => {
            let varientPropertyArray = availableAttributes[variantProperty.variant_name] ?
              availableAttributes[variantProperty.variant_name] : [];
            varientPropertyArray.findIndex((item: any) => item.variant_property_id === variantProperty.variant_property_id) === -1 &&
              varientPropertyArray.push({
                name: variantProperty.property_name,
                variant_property_id: variantProperty.variant_property_id,
                product_variant_id: variantProperty.product_variant_id
              })
            availableAttributes = {
              ...availableAttributes,
              [variantProperty.variant_name]: varientPropertyArray
            }
          });
        }
      });
      this.setState({
        updateCart: variants_in_cart.includes(this.state.selectedProduct.attributes.id) ? true : false,
      })
    }
  };
  checkSelectedInAvailable = () => {
    const { selectedAttributes, availableAttributes } = this.state;
    let selectedVarientPropertyIds = [];
    let availablePropertIds: any = [];
    for (const attribute in selectedAttributes) {
      selectedVarientPropertyIds.push(selectedAttributes[attribute].variant_property_id);
    }

    return true;
  }

  setSelectedProduct = () => {
    const { productData, selectedAttributes } = this.state;
    const { catalogue_variants } = productData.attributes;
    let isSelectedFound = false;
    catalogue_variants.map((item: any, index: number) => {
      let varientPropertyIds: any = [];
      let selectedVarientPropertyIds: any = [];
      const { product_variant_properties } = item.attributes;
      product_variant_properties.map((variantProperty: any) => {
        selectedAttributes[variantProperty.variant_name] && selectedVarientPropertyIds.push(selectedAttributes[variantProperty.variant_name].id);
        if (selectedAttributes[variantProperty.variant_name] && (selectedAttributes[variantProperty.variant_name].id === variantProperty.variant_property_id))
          varientPropertyIds.push(variantProperty.variant_property_id);
        else
          varientPropertyIds.push(0);
      });
      if (isSelectedFound) {
        return;
      }

      if (varientPropertyIds.length === selectedVarientPropertyIds.length) {
        if (JSON.stringify(selectedVarientPropertyIds) === JSON.stringify(varientPropertyIds)) {
          isSelectedFound = true;
          this.setState({
            selectedProduct: item,
            selectedImage: item.attributes.images.data?.length > 0 ?
              item.attributes.images.data[0].attributes.url
              : "",
            productQuantity: this.state.quantity > 1 ? this.state.quantity : 1,
            catalogue_variant_id: item.id,
            showAlertModal: false,
            isProductAvailable: true,
          }, () => {
            this.setAvailbleAttributesForSelected();
            this.setState({ quantity: this.state.selectedProduct.attributes.cart_quantity ? this.state.selectedProduct.attributes.cart_quantity : 1 });
          });
        } else {
          this.setState({
            isShowError: true,
            showAlertModal: true,
            isProductAvailable: false,
            selectedImage: null,
            selectedProduct: null,
            message: "Selected combination does not exist"
          })
        }
      } else {
        this.setState({ selectedProduct: undefined })
      }
    });
  };
}
