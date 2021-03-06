import React from "react"
import { AsyncStorage } from "react-native";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';
import shape from "@material-ui/core/styles/shape";
import Catalogue from "../../catalogue/src/Catalogue";
// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config.js")

export interface Props {
    navigation: any;
    id: string;
}
interface S {
    dashboardData: any;
    errorMsg: string;
    loading: boolean;
    auth: string | null | undefined;
    snackBar: {
        show: boolean,
        message?: string,
        type?: "success" | "info" | "warning" | "error" | undefined
    };
    showAlert: boolean,
    message?: string,
    type?: string,
    collectionCategory: any,
    newCollection: any,
    featuredProduct: any,
    isCartCreated: boolean,
    cartId: any
    catalogue_id: any,
    catalogue_variant_id: any,
    productDetails: any,
    productToBeAdded: any,
    productInCart: any,
    itemQuantity: any,
    currentImage: any
    default_variant: any,
    active_color: any,
    active_size: any,
    available_colors: any,
    available_sizes: any,
    product_rating: any,
    isReviewModalOpen: boolean,
    commentBox: any,
    reviews: any,
    reviewShown: any,
    reviewRatings: any,
    SingleProductReview: any,
    allSingleProductReview: any,
    banners: any
    notifyModelOpen: any
    productDescriptionLoader: boolean
    dashboardLoader: boolean,
    invalidTokenMessageRecieved: boolean

}
interface SS {
    id: any;
}

export default class DashboardController extends BlockComponent<Props, S, SS> {
    auth: string | null | undefined = window.localStorage.getItem("token");
    apiDashboardItemCallId: string = "";
    dashboardApiCallId: string = "";
    apiGetQueryStrinurl: string = "";
    GetAllNewCollectionApiCallId: string = "";
    GetCategoryListApiCallId: string = "";
    GetFeaturedProductApiCallId: string = "";
    GetIsCartCreatedApiCallId: string = "";
    getProductDetailsApiCallId: string = "";
    postCreateCartApiCallId: string = "";
    putItemToCartApiCallId: string = "";
    getAllWishlistApiCallId: string = "";
    postWishlistApiCallId: string = "";
    delWishlistApiCallId: string = "";
    putUpdateCartQuantityApiCallId: string = "";
    postReviewApiCallId: string = "";
    getProductReviewApiCallId: string = "";
    UpdateProductReviewApiCallId: string = "";
    GetBannersApiCallId: string = "";
    postNotifyMeApiCallId: string = "";


    constructor(props: Props) {
        super(props);
        this.receive = this.receive.bind(this);
        this.subScribedMessages = [
            getName(MessageEnum.CountryCodeMessage),
            getName(MessageEnum.RestAPIResponceMessage),
            getName(MessageEnum.ReciveUserCredentials)
        ];

        this.state = {
            dashboardData: [],
            errorMsg: "",
            loading: false,
            auth: "",
            snackBar: {
                show: false,
            },

            showAlert: false,

            collectionCategory: [],
            newCollection: [],
            featuredProduct: [],
            isCartCreated: false,
            cartId: "",
            catalogue_id: window.location.pathname.slice(6),
            catalogue_variant_id: "",
            productDetails: [],
            productToBeAdded: "",
            productInCart: "",
            itemQuantity: 1,
            currentImage: "",
            default_variant: "",
            active_color: "",
            active_size: "",
            available_colors: "",
            available_sizes: "",
            product_rating: 0,
            isReviewModalOpen: false,
            commentBox: "",
            reviews: "",
            reviewShown: 2,
            reviewRatings: [],
            SingleProductReview: "",
            allSingleProductReview: "",
            banners: "",
            notifyModelOpen: false,
            productDescriptionLoader: false,
            dashboardLoader: false,
            invalidTokenMessageRecieved: false

        };
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    }


    // Customizable Area Start

    async componentDidMount() {
        this.getBanners()
        this.getCategoryList();
        this.getNewCollection();
        this.getFeaturedProduct();
        this.getIsCartCreated();
        this.getAllWishlist()
        this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    }

    async receive(from: string, message: Message) {

        // runEngine.debugLog("Message Recived", message);
        // || (responseJson.errors.length>0 &&responseJson.errors[0].order) ||responseJson.errors ;

        if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
            var responseJson = message.getData(
                getName(MessageEnum.RestAPIResponceSuccessMessage)
            );

            if (responseJson && !responseJson.errors && responseJson.data) {
                const apiRequestCallId = message.getData(
                    getName(MessageEnum.RestAPIResponceDataMessage)
                );
                if (apiRequestCallId != null) {


                    // get banners 

                    if (apiRequestCallId === this.GetBannersApiCallId) {
                        //console.log(responseJson?.data?.banners?.data, "banners")
                        this.setState({
                            banners: responseJson?.data?.banners?.data
                        })


                    }


                    // new collection
                    if (apiRequestCallId === this.GetAllNewCollectionApiCallId) {
                        //console.log(responseJson?.data?.catalogue?.data, "here is new collection")
                        this.setState({
                            newCollection: responseJson?.data?.catalogue?.data,
                        })


                    }

                    // category list
                    if (apiRequestCallId === this.GetCategoryListApiCallId) {
                        //console.log(responseJson, "here is category list")
                        this.setState({
                            collectionCategory: responseJson?.data,

                        })
                    }

                    // featured product list
                    if (apiRequestCallId === this.GetFeaturedProductApiCallId) {
                        console.log(responseJson, "response json")
                        //console.log(responseJson?.data?.recommended_products?.data, "here is featured product list")
                        this.setState({
                            featuredProduct: responseJson?.data?.recommended_products?.data,
                            dashboardLoader: false
                        })
                    }

                    // add to cart 
                    //is cart created || checking
                    if (apiRequestCallId === this.GetIsCartCreatedApiCallId) {
                        //console.log(responseJson, "is cart created")
                        {
                            responseJson?.data && responseJson?.data?.length > 0 && (
                                this.setState({
                                    cartId: responseJson?.data[0]?.id
                                }),
                                localStorage.setItem("cart_length", responseJson?.data[0]?.attributes?.order_items?.length)
                            )
                            //this.postCreateCart()
                        }

                    }

                    // if cart not created then creating cart

                    if (apiRequestCallId === this.postCreateCartApiCallId) {
                        //console.log(responseJson, " cart created")
                        if (responseJson?.data) {
                            //@ts-ignore
                            window.notify([{ message: "Item added in cart successfully", type: "success" }]);

                            this.getIsCartCreated();


                            this.getNewCollection();
                            this.getFeaturedProduct();
                            // @ts-ignore
                            const cart_length = parseInt(localStorage.getItem("cart_length"))
                            // @ts-ignore
                            localStorage.setItem("cart_length", cart_length + 1)

                        }


                    }

                    // add items to the cart
                    if (apiRequestCallId === this.putItemToCartApiCallId) {
                        // console.log(responseJson, "add items to the cart");
                        // @ts-ignore
                        window.notify([{ message: "Item added in cart successfully", type: "success" }]);
                        // @ts-ignore
                        const cart_length = parseInt(localStorage.getItem("cart_length"))
                        // @ts-ignore
                        localStorage.setItem("cart_length", cart_length + 1)

                        window.location.pathname === "/home-page" ? "" : this.state.catalogue_id && this.getProductDetails()
                        this.getNewCollection();
                        this.getFeaturedProduct();
                    }



                    //update cart quantity

                    if (apiRequestCallId === this.putUpdateCartQuantityApiCallId) {
                        //console.log(responseJson, "UpdateCartQuantity");
                        this.setState({
                            itemQuantity: responseJson.data.attributes.order_items[0].attributes.quantity
                        })
                        //@ts-ignore
                        window.notify([{ message: "Cart updated successfully ", type: "success" }])

                    }

                    //product details

                    if (apiRequestCallId === this.getProductDetailsApiCallId) {
                        //console.log(responseJson.data, "product details")
                        this.setState({
                            productDetails: responseJson?.data,
                            productDescriptionLoader: false
                            // itemQuantity: 1
                        })

                        this.toSetDefaultVariant();
                        if (responseJson?.data.id != this.state?.default_variant?.attributes?.catalogue_id) {
                            //console.log("to set variant called")
                        }
                    }

                    //all wishlist 
                    if (apiRequestCallId === this.getAllWishlistApiCallId) {
                        //console.log(responseJson?.data?.wishlist, "wishlist-length")
                        localStorage.setItem("wishlist_len", responseJson?.data?.wishlist?.data?.attributes?.wishlist_items?.length)

                    }

                    //create wishlist 
                    if (apiRequestCallId === this.postWishlistApiCallId) {
                        //console.log(responseJson, "wishlist created")
                        // @ts-ignore
                        window.notify([{ message: responseJson?.message, type: "success" }]);
                        // @ts-ignore
                        const wishlist_length = parseInt(localStorage.getItem("wishlist_len"))
                        // @ts-ignore
                        localStorage.setItem("wishlist_len", wishlist_length + 1)
                        this.getNewCollection();
                        this.getFeaturedProduct();
                        window.location.pathname === "/home-page" ? "" : this.state.catalogue_id && this.getProductDetails()

                    }

                    //delete wishlist 
                    if (apiRequestCallId === this.delWishlistApiCallId) {
                        //console.log(responseJson, "wishlist deleted")
                        // @ts-ignore
                        window.notify([{ message: responseJson?.message, type: "success" }]);
                        // @ts-ignore
                        const wishlist_length = parseInt(localStorage.getItem("wishlist_len"))
                        // @ts-ignore
                        localStorage.setItem("wishlist_len", wishlist_length - 1)
                        this.getNewCollection();
                        this.getFeaturedProduct();
                        window.location.pathname === "/home-page" ? "" : this.state.catalogue_id && this.getProductDetails()
                        // this.state.catalogue_id && this.getProductDetails();
                    }

                    // create review 
                    if (apiRequestCallId === this.postReviewApiCallId) {
                        //console.log(responseJson, "review created")
                        this.getAllProductReview();
                        this.getProductDetails();

                        // @ts-ignore
                        window.notify([{ message: "you've successfully reviewed the product", type: "success" }]);



                    }

                    // get all reviews that user 
                    if (apiRequestCallId === this.getProductReviewApiCallId) {
                        //console.log(responseJson, "get all reviews")
                        this.setState({
                            allSingleProductReview: responseJson?.data
                        })

                        this.productReviewDetails();



                    }

                    // update product review 
                    if (apiRequestCallId === this.UpdateProductReviewApiCallId) {
                        //console.log(responseJson, "updated reviews")

                    }

                    //notify me
                    if (apiRequestCallId === this.postNotifyMeApiCallId) {

                        this.handleNotifyProductOpen()
                        //this.getProductDetails();

                        //@ts-ignore
                        //window.notify([{ message: "You???ll now be notified once the product is back in stock.t", type: "success" }]);
                    }
                }


            }
            if (responseJson?.errors) {
                const errors = responseJson?.errors[0]?.order;
                if (this.state.invalidTokenMessageRecieved == false) {
                    if (responseJson?.errors[0]?.token) {
                        this.setState({
                            invalidTokenMessageRecieved: true
                        })
                        // @ts-ignore
                        window.notify([{ message: responseJson?.errors[0]?.token, type: "error" }]);

                    }
                }
                this.setState({
                    dashboardLoader: false,
                    productDescriptionLoader: false
                })
                // @ts-ignore
                window.notify([{ message: errors, type: "error" }]);

            }
        }
    }

    // get banners

    getBanners = (): boolean => {
        const headers = {
            "Content-Type": configJSON.dashboarContentType,
            token: localStorage.getItem("token"),
        };
        this.setState({
            dashboardLoader: true
        })

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.GetBannersApiCallId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.endPointApiGetUser
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

    // get new collection
    getNewCollection = (): boolean => {
        const headers = {
            "Content-Type": configJSON.dashboarContentType,
            token: localStorage.getItem("token"),
        };

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.GetAllNewCollectionApiCallId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.endPointApiGetNewCollection
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


    // get category list
    getFeaturedProduct = (): boolean => {
        const headers = {
            "Content-Type": configJSON.dashboarContentType,
            token: localStorage.getItem("token"),
        };


        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.GetFeaturedProductApiCallId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.endPointApiGetFeaturedProduct
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


    /// add to cart 
    //is cart created || checking
    getIsCartCreated = (): boolean => {
        const headers = {
            "Content-Type": configJSON.dashboarContentType,
            token: localStorage.getItem("token"),
        };

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.GetIsCartCreatedApiCallId = requestMessage.messageId;

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

    /// create cart 
    postCreateCart = (product: any): boolean => {
        // const product = this.state.productToBeAdded

        const header = {
            "Content-Type": configJSON.dashboarContentType,
            token: localStorage.getItem("token"),

        };

        const httpBody = {
            "catalogue_id": product.catalogue_id,
            "catalogue_variant_id": product.id,
            "quantity": this.state.itemQuantity

        };


        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.postCreateCartApiCallId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.endPointApiGetIsCartCreated
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
            configJSON.exampleAPiMethod
        );

        runEngine.sendMessage(requestMessage.id, requestMessage);

        return true;
    };

    /// add items into the cart
    putItemToCart = (cartId: any): boolean => {
        const product = this.state.productToBeAdded
        const header = {
            "Content-Type": configJSON.dashboarContentType,
            token: localStorage.getItem("token"),

        };

        const httpBody = {
            "catalogue_id": product.catalogue_id,
            "catalogue_variant_id": product.id,
            "quantity": this.state.itemQuantity
        };


        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.putItemToCartApiCallId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.endPointApiPutUpdateCartQuantity + `${cartId}/add_item`
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


    // get Product Details
    getProductDetails = (): boolean => {
        this.setState({
            catalogue_id: window.location.pathname.slice(6),
            productDescriptionLoader: true
        })
        setTimeout(() => {
            const headers = {
                "Content-Type": configJSON.dashboarContentType,
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
                configJSON.dashboarApiMethodType
            );

            runEngine.sendMessage(requestMessage.id, requestMessage);
        }, 500);



        return true;
    };

    /// add to wishlist 
    postWishlist = (catalogue_id: any): boolean => {


        const header = {
            "Content-Type": configJSON.dashboarContentType,
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
            configJSON.exampleAPiMethod
        );

        runEngine.sendMessage(requestMessage.id, requestMessage);

        return true;
    };

    //remove wishlist 

    delWishlist = (catalogue_id: any): boolean => {

        const headers = {
            "Content-Type": configJSON.dashboarContentType,
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
            configJSON.delAPiMethod
        );

        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
    };

    // update cart quantity 
    putUpdateCartQuantity = (product_id: any, product_variant: any): boolean => {

        const header = {
            "Content-Type": configJSON.dashboarContentType,
            token: localStorage.getItem("token"),

        };
        setTimeout(() => {

            const httpBody = {
                "quantity": this.state.itemQuantity,
                "product_id": product_id,
                "product_variant": product_variant
            };
            const requestMessage = new Message(
                getName(MessageEnum.RestAPIRequestMessage)
            );

            this.putUpdateCartQuantityApiCallId = requestMessage.messageId;

            requestMessage.addData(
                getName(MessageEnum.RestAPIResponceEndPointMessage),
                configJSON.endPointApiPutUpdateCartQuantity + `${this.state.cartId}/update_item_quantity`
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

        }, 500);




        return true;
    };

    // create review 

    postReview = (): boolean => {

        const header = {
            "Content-Type": configJSON.dashboarContentType,
            token: localStorage.getItem("token"),
        };
        const httpBody = {
            "comment": this.state.commentBox,
            "rating": this.state.product_rating,
            "catalogue_id": this.state.catalogue_id && this.state.catalogue_id
        };


        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.postReviewApiCallId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.endPointApiPostReview
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
            configJSON.exampleAPiMethod
        );

        runEngine.sendMessage(requestMessage.id, requestMessage);

        return true;
    };

    // get product review that user posted
    getAllProductReview = (): boolean => {


        const headers = {
            "Content-Type": configJSON.dashboarContentType,
            token: localStorage.getItem("token"),
        };

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.getProductReviewApiCallId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.endPointApiPostReview
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

    // update review 
    putUpdateReview = (): boolean => {

        const header = {
            "Content-Type": configJSON.dashboarContentType,
            token: localStorage.getItem("token"),

        };


        const httpBody = {
            "rating": 4,
            "comment": "updated review"
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.UpdateProductReviewApiCallId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.endPointApiUpdateProductReview + `${this.state.catalogue_id}`
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


    //  cart function 
    addToCart = (product: any) => {


        setTimeout(() => {
            this.setState({
                productToBeAdded: product
            })
            this.state.cartId != "" ? this.putItemToCart(this.state.cartId) : this.postCreateCart(product)

        }, 500);
    }


    /// post notify me 

    postNotifyMe = (variant_id: any): boolean => {


        const header = {
            "Content-Type": configJSON.dashboarContentType,
            token: localStorage.getItem("token"),
        };



        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.postNotifyMeApiCallId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.endPointApiPostNotifyMe + `${variant_id}/notify_product`
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );



        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            configJSON.exampleAPiMethod
        );

        runEngine.sendMessage(requestMessage.id, requestMessage);

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

        var review1: any = 0
        var review2: any = 0
        var review3: any = 0
        var review4: any = 0
        var review5: any = 0
        const productAvailable = this.state.productDetails && this.state.productDetails.attributes.catalogue_variants.filter(
            (item: any) => {
                return item.id == catalogue_variant_in_stock.id
            }
        )[0]

        this.setState({
            default_variant: this.state.productDetails.attributes.stock_qty > 0 ?
                productAvailable : this.state.productDetails.attributes.catalogue_variants[0],
            reviews: this.state.productDetails.attributes.reviews
        })


        this.setState({
            currentImage: this.state.default_variant && this.state.default_variant.attributes.images.data[0].attributes.url,
            active_color: this.state.default_variant && this.state.default_variant.attributes.product_variant_properties[1].property_name,
            active_size: this.state.default_variant && this.state.default_variant.attributes.product_variant_properties[0].property_name
        })


        /// to show updated cart quantity
        this.state.default_variant && this.state.default_variant.attributes.stock_qty >= 1 &&
            Object.keys(
                this.state.productDetails.attributes.cart_items
            ).length !== 0 &&
            Object.keys(
                this.state.productDetails.attributes.cart_items
            ).map((keyName: any, keyIndex: any) => {
                (parseInt(keyName) == this.state.default_variant.id) ? this.setState({ itemQuantity: this.state.productDetails.attributes.cart_items[keyName] }) : "";
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

        this.state.reviews.map((review: any, inx: any) => {

            if (review.attributes.rating == 1) {
                return review1 += 1
            }
            if (review.attributes.rating == 2) {
                return review2 += 1
            }
            if (review.attributes.rating == 3) {
                return review3 += 1
            }
            if (review.attributes.rating == 4) {
                return review4 += 1
            }
            if (review.attributes.rating == 5) {
                return review5 += 1
            }


        })
        this.setState({
            reviewRatings: [review1, review2, review3, review4, review5]
        })

    }

    /// selecting color
    selectingColor = (item: any) => {
        this.setState({
            active_color: item.name,
        })
        const pushed_sizes: any = []
        const colorFilter = this.state.productDetails.attributes.catalogue_variants.filter((item_available: any) => {
            return item_available.attributes.product_variant_properties[1].property_name == item.name
        })

        this.setState({
            default_variant: colorFilter[0],
        })
        colorFilter.forEach((item: any) => {
            return pushed_sizes.push(item.attributes.product_variant_properties[0].property_name)
        })
        setTimeout(() => {
            this.setState({
                currentImage: this.state.default_variant && this.state.default_variant.attributes.images.data[0].attributes.url,
                active_size: this.state.default_variant.attributes.product_variant_properties[0].property_name,
                available_sizes: pushed_sizes

            })

        }, 200)


    }


    /// selecting size
    settingSize = (item: any) => {
        //console.log(this.state.active_size, this.state.active_color)
        setTimeout(() => {
            this.setState({
                default_variant: this.state.productDetails.attributes.catalogue_variants.filter((x: any) => {
                    return x.attributes.product_variant_properties[0].property_name == this.state.active_size && x.attributes.product_variant_properties[1].property_name == this.state.active_color
                })[0],

            })

        }, 200)
        setTimeout(() => {
            this.setState({

                currentImage: this.state.default_variant && this.state.default_variant.attributes.images.data[0].attributes.url,

            })

        }, 300)

    }


    // imageSlider
    imageSlider = (imageUrl: any) => {
        //console.log(imageUrl)
        this.setState({
            currentImage: imageUrl
        })
        //console.log(this.state.currentImage, "current")
    }

    //REview 
    handleCloseReview = () => {
        this.setState({
            isReviewModalOpen: true
        })
    }

    //handle close notify product
    handleNotifyProductClose = () => {
        this.setState({
            notifyModelOpen: false,
        })
        setTimeout(() => {


            this.getProductDetails();
        }, 3000)

    }
    handleNotifyProductOpen = () => {
        this.setState({
            notifyModelOpen: true,
        })
        setTimeout(() => {


            this.getProductDetails();
        }, 3000)
    }

    // product review details

    productReviewDetails = () => {

        setTimeout(() => {
            // console.log(this.state.allSingleProductReview,"review")
            this.setState({
                SingleProductReview: this.state.allSingleProductReview.filter((product: any) => {
                    return product.attributes.catalogue_id == this.state.catalogue_id

                })[0]
            })
        }, 300)

    }

    //handle comment 
    handleComment = (e: any) => {
        this.setState({
            commentBox: e.target.value
        })

    }




}