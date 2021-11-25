Object.defineProperty(exports, "__esModule", {
  value: true,
});

// Customizable Area Start
exports.validationApiContentType = "application/json";
exports.ApiContentType = "application/json";
exports.validationApiMethodType = "GET";
exports.exampleAPiMethod = "POST";
exports.putAPiMethod = "PUT";
exports.delAPiMethod = "DELETE";
exports.ApiMethodPostType = "POST";
exports.apiMethodTypePost = "POST";
exports.apiMethodTypeGet = "GET"
exports.apiMethodTypePut = "PUT";
exports.apiMethodTypeDel = "DELETE"

exports.exampleApiContentType = "application/json";
exports.textInputPlaceHolder = "Enter Text";
exports.labelTitleText = "shoppingcart";
exports.labelBodyText = "shoppingcart Body";
exports.btnExampleTitle = "CLICK ME";
// Customizable Area End

exports.ApplyCouponApiEndPoint = "order_management/orders/";
exports.cartListAPiEndPoint = "cart/carts"
exports.updateQtyEndPoint = "cart/carts/"
exports.emptyCartEndPoint = "cart/carts/"
exports.removeCouponEndPoint = "order_management/orders/"
exports.cartHasProductAPIEndPoint = "cart/user/carts/has_product"
exports.addToWishlistApiEndPoint = "wishlist/wishlists";
exports.addressApiEndPoint = "order_management/addresses"

exports.endPointApiGetIsCartCreated = "cart/carts";
exports.endPointApiPutUpdateCartQuantity = "cart/carts/";

exports.createNewAddressAPIEndPoint = "order_management/addresses";
exports.endPointApiPostWishlist = "wishlist/wishlists";
exports.endPointApiPostApplyCoupon = "order_management/orders/";

//exports.getUserDeliveryAddressAPIEndPoint = "order_management/addresses";
//exports.createOrderAPIEndPoint = "order_management/orders";
//exports.addAddressToOrder = "order_management/orders";
//exports.updateAddressOnIdAPIEndPoint = "order_management/addresses";
//exports.addressApiEndPoint = "order_management/addresses";
exports.placeOrderAPIEndPoint = "order_management/order_transactions";


exports.checkZipCodeApiEndPoint =
  "order_management/addresses/check_zipcode_available?zipcode=";

exports.createRazorpayApiEndPoint = "payment_razorpay/razorpays";
exports.verifyRazorpayApiEndPoint =
  "/payment_razorpay/razorpays/verify_signature";
exports.calculateShippingAddressChargeAPIEndPoint =
  "shipping_charge/shipping_charge/calculate_shipping_charge";

exports.releaseShippingAddressChargeAPIEndPoint =
  "shipping_charge/shipping_charge/release_shipping_charge";
exports.endPointApipostBuyNow = "cart/carts/buy_now";
