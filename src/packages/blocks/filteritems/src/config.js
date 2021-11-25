Object.defineProperty(exports, "__esModule", {
  value: true,
});

// Customizable Area Start
exports.productApiContentType = "application/json";
exports.apiMethodTypeGet = "GET";
exports.apiMethodTypePost = "POST";
exports.DeleteMethodType = "DELETE";
//exports.exampleAPiMethod = "POST";
exports.putAPiMethod = "PUT";
exports.productAPiEndPoint = "catalogue/catalogues";
exports.brandAPiEndPoint = "catalogue/brands";
exports.tagsAPiEndPoint = "catalogue/tags";
exports.filterbrandAPiEndPoint = "filter_items/filtering?q[brand_id]=";
exports.singleCategoryAPiEndPoint = "filter_items/filtering?q[category_id]=";
exports.cataloguesAPiEndPoint = "filter_items/filtering?";
exports.addToWishlistApiEndPoint = "wishlist/wishlists";
exports.categoryAPIEndPoint = "categories/categories/";
exports.categoryAPIEndPointWeb = "categories/categories";
exports.sortingFilteringAPiEndPoint = "filter_items/filtering";
// exports.sortingFilteringAPiEndPoint = "sorting/sorting";
exports.colorAPiEndPoint = "catalogue/catalogues_variants_colors";
exports.priceAPiEndPoint = "filter_items/filtering?";
exports.sortProductAPiEndPoint = "sorting/sorting";
exports.sizeAPIEndPoint = "catalogue/catalogues_variants_sizes";
exports.priceRangeAPIEndPoint = "catalogue/catalogues/price_value";

exports.getCartApiEndPoint = "cart/carts";
exports.addToCartApiEndPoint = "cart/carts/";
//exports.updateQtyEndPoint = "cart/carts/";
exports.cartHasProductAPIEndPoint = "cart/user/carts/has_product";

// cart feature
//exports.endPointApiPutItemsToCart = "cart/carts/";
exports.SuccessfullyItemAdded = "Added To Cart";
exports.endPointApiIsItemInCart =
  "cart/user/carts/has_product?catalogue_variant_id=";
exports.endPointApiPostWishlist = "wishlist/wishlists";
exports.endPointApiDelWishlist = "wishlist/wishlists/remove_catalogue/";
exports.endPointApiGetIsCartCreated = "cart/carts";

exports.NoProductFound = "No Products found";
exports.NoProductFoundTitle =
  "Try searching with a different terms or browse other categories.";
exports.buttonTitle = "BROWSE PRODUCTS";
exports.btnExampleTitle = "CLICK ME";
exports.currency = "₹";
// Customizable Area End
