Object.defineProperty(exports, "__esModule", {
  value: true,
});

// Customizable Area Start
exports.textInputPlaceHolder = "Enter Text";
exports.labelTitleText = "profilebio";
exports.labelBodyText = "profilebio Body";
exports.btnExampleTitle = "CLICK ME";
// Customizable Area End

exports.validationApiContentType = "application/json";
exports.validationApiMethodType = "GET";
exports.exampleAPiEndPoint = "EXAMPLE_URL";
exports.exampleAPiMethod = "POST";
exports.exampleApiContentType = "application/json";
exports.NoProductFound = "No Products found";
exports.NoProductFoundTitle =
  "Try searching with a different terms or browse other categories.";
exports.buttonTitle = "BROWSE PRODUCTS";

exports.ApiContentType = "application/json";
exports.EditApiContentType = "multipart/form-data";

/*** Methods List */
exports.apiPostMethod = "POST";
exports.apiPutMethod = "PUT";
exports.apiGetMethod = "GET";
exports.apiDeleteMethod = "DELETE";
exports.GetMethodType = "GET";
exports.PostMethodType = "POST";
exports.PutMethodType = "PUT";
exports.DeleteMethodType = "DELETE";
exports.apiMethodTypePut = "PUT";

/*** API's for User Profile */
exports.updateProfileAPIEndPoint = "profile/profile";
exports.updateProfilePasswordAPIEndPoint = "profile/password";
exports.getProfileDetails = "profile/profile";

/** API for Update User Address */
exports.createNewAddressAPIEndPoint = "order_management/addresses";
exports.getUserDeliveryAddressAPIEndPoint = "order_management/addresses";
exports.deleteUserDeliveryAddressByIdAPIEndPoint = "order_management/addresses";
exports.editUserDeliveryAddressByIdAPIEndPoint = "order_management/addresses";
exports.changeDefaultAddressByIDAPIEndpoint = "order_management/addresses";

exports.changePasswordApiEndPoint = "profile/password";
exports.userProfileApiEndPoint = "profile/profile";

/** API for Connected Accounts */
exports.getAllSocialAccountsApiEndPoint = "social_media_account/social_auths";
exports.postActivateSocialAccountsAPIEndPoint =
  "social_media_account/social_auths/connect";
exports.deleteActivateSocialAccountAPiEndPoint =
  "social_media_account/social_auths";
// exports.socialAccountLoginAPiEndPoint = 'bx_block_social_media_account/social_auths/soical_login';

// wishlist api's
exports.getWishListAPIEndPoint = "wishlist/wishlists";
exports.deleteItemAPiEndPoint = "wishlist/wishlists/remove_catalogue";
exports.addToWishListAPIEndPoint = "wishlist/wishlists";

/** API's for Help Centers */
exports.getHelpCenterAPIEndPoint = "help_center/help_centers";
exports.getFAQAPIEndPoint = "interactive_faqs/interactive_faqs";

/*** API's for My Orders */
exports.writeReview = "catalogue/reviews";
exports.getOrders = "order_management/orders";
exports.trackingOrderDetailsAPIEndPoint = "cart/carts/track";
exports.getOrdersAPIEndPoint = "order_management/orders";

exports.dashboardGetUrl = "/bx_block_dashboard/dashboard";
exports.dashboarContentType = "application/json";
exports.dashboarApiMethodType = "GET";
exports.dashboardHost = "<calculated when request is sent>";
exports.dashboarUserAgent = "PostmanRuntime/7.26.5";
exports.dashboarAccept = "*/*";
exports.dashboarAcceptEncoding = "gzip, deflate, br";
exports.dashboarConnection = "keep-alive";
exports.dashboartoken = "";
exports.exampleAPiEndPoint = "EXAMPLE_URL";
exports.exampleAPiMethod = "POST";
exports.putAPiMethod = "PUT";
exports.delAPiMethod = "DELETE";
exports.endPointApiGetNewCollection = "bx_block_catalogue/catalogues";
exports.endPointApiGetCategoryList =
  "bx_block_categories_sub_categories/categories";
exports.endPointApiGetFeaturedProduct =
  "bx_block_catalogue/catalogues?recommended=true";

exports.cartHasProductEndPoint = "cart/user/carts/has_product";
exports.endPointApiGetIsCartCreated = "cart/carts";
exports.endPointApiGetProductDetails = "/bx_block_catalogue/catalogues/";
exports.endPointApiPostCreateCart = "cart/carts";
exports.endPointApiPutItemsToCart = "cart/carts";
exports.SuccessfullyItemAdded = "Added To Cart";
exports.endPointApiIsItemInCart =
  "bx_block_cart/user/carts/has_product?catalogue_variant_id=";
exports.endPointApiPostWishlist = "bx_block_wishlist/wishlists";
exports.endPointApiDelWishlist =
  "bx_block_wishlist/wishlists/remove_catalogue/";
exports.endPointApiPutUpdateCartQuantity = "bx_block_cart/carts/";
exports.endPointApiPostReview = "bx_block_catalogue/reviews";
exports.endPointApiGetProductReview =
  "bx_block_catalogue/reviews/product_reviews?id=";
exports.endPointApiUpdateProductReview = "bx_block_catalogue/reviews/";
exports.endPointApiGetUser = "bx_block_banner/banners/web_banners_list";
exports.endPointApiPostNotifyMe = "bx_block_catalogue/catalogues_variants/";
// End


// Notification's API
exports.getAllNotificationsAPIEndPoint = "notification/notifications";
exports.readAllNotificationsAPIEndPoint =
  "notification/notifications/read_notification";
exports.deleteAllNotificationsAPIEndPoint =
  "notifications/notifications/destroy_all";
exports.readOneNotificationOnIdAPIEndPoint =
  "notifications/notifications/read_notification";
exports.deleteOneNotificationOnIdAPIEndPoint = "notifications/notifications";

// Customizable Area End
