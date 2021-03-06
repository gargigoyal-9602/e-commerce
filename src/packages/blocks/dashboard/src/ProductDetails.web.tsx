import React, { Fragment } from "react";
// Customizable Area End
import DashboardController, { Props } from "./DashboardController.web";
import ProductCard from "../../../components/src/productcard/index";
import ProductImageWithSlider from "../../../components/src/productimagewithslider/index";
import { withRouter, Link } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
//@ts-ignore
import content from "../../../components/src/content.js"
import Loader from "../../../components/src/Loader.web";

import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
} from "reactstrap";
import { FaRegHeart } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa";
import { sold, available } from "./assets";
import { closebutton } from "./assets";


import "../assets/css/index.css";

class ProductDetails extends DashboardController {
  constructor(props: Props) {
    super(props);
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    this.state.catalogue_id && this.getProductDetails();
    this.getIsCartCreated();
    this.getAllProductReview();
  }

  render() {
    const product =
      this.state.default_variant && this.state.default_variant.attributes;
    const quantity: any = product &&
      Object.keys(this.state?.productDetails?.attributes.cart_items).length !== 0 && (
        Object.keys(this.state.productDetails.attributes.cart_items).map(
          (keyName: any, keyIndex: any) => {
            if (parseInt(keyName) == product.id) {

              return this.state.productDetails.attributes.cart_items[keyName]
            }
          }
        )
      )


    return (
      <section>
        {localStorage.removeItem("newest")}

        {window.location.pathname !== `/shop/${this.state.catalogue_id}` &&
          this.getProductDetails()}
        {window.location.pathname !== `/shop/${this.state.catalogue_id}` &&
          window.scrollTo(0, 0)}
        {this.state.productDescriptionLoader && <Loader loading={this.state.productDescriptionLoader} />}

        {this.state.productDetails.attributes && product ? (
          <div className="product-descrip">
            <div className="pageroute sp-breadcrumbs mt-3">
              <Link to="/home-page">
                <span
                  className="sp-mid w3-hover-opacity"
                  style={{ cursor: "default", color: "#007bff" }}
                >
                  {content.home}
                </span>
              </Link>
              {" > "}
              <Link to={`/Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=&sort[direction]=`}>
                <span
                  className="sp-mid w3-hover-opacity"
                  style={{ cursor: "default", color: "#007bff" }}
                >
                  {content.shop}

                </span>
              </Link>
              {" > "}
              <span className="currpage sp-current">
                {this.state.productDetails.attributes.name}
              </span>
            </div>

            <Row className="yt-cm-row">
              <Col xs={12} md={12} lg={6} className="yt-cm-lt-col product-col">
                <ProductImageWithSlider
                  images={product.images.data}
                  currentImage={this.state.currentImage}
                  imageSlider={this.imageSlider}
                />
                <div className="product-description yt-lt-inner-bottom-content mt-3">
                  <div className="sp-inner-content-wrap bg-white radius-10">
                    <div>
                      <h2 className="sp-description-title mt-0">{content.Description}</h2>
                      <p className="sp-description-text text-break img-w-100">
                        {this.state.productDetails.attributes?.description !==
                          ""
                          ? this.state.productDetails.attributes.description
                          : `${content.noDescription}`}
                      </p>
                      <Button color="link yt-read-more-des p-0 d-none">
                        Read More
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="right-inner-content-wrap for-mobile">
                  <div className="sp-inner-wrap bg-white radius-10">
                    <div className="d-flex align-items-center justify-content-between yt-sp-title-wrapper mb-4">
                      <h1 className="product-title m-0">
                        {this.state.productDetails.attributes?.name}
                      </h1>
                      <div
                        className={
                          this.state.productDetails.attributes?.wishlisted
                            ? "added sp-favorite-wrap d-flex align-items-center p-3"
                            : "sp-favorite-wrap d-flex align-items-center p-3"
                        }
                        onClick={() =>
                          this.state.productDetails.attributes?.wishlisted
                            ? this.delWishlist(this.state.catalogue_id)
                            : this.postWishlist(this.state.catalogue_id)
                        }
                      >
                        <FaRegHeart className="sp-fav-icn" />
                      </div>
                    </div>


                    <div className="sp-price-wrap d-flex flex-nowrap align-items-center justify-content-between">
                      <div className="sp-price-left-content">
                        <div className="price-quontity-sec mb-3">
                          <div className="left-price-sec">
                            <p className="m-0 sp-small-tag-name">PRICE</p>
                            <div className="d-flex">
                              {product?.on_sale ? (
                                <ul className="list-style-none p-0 my-2">
                                  <li className="d-inline-block">
                                    <p className="sp-price-tag-value m-0 pr-3 ">
                                      {/* @ts-ignore  */}
                                      {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {parseFloat(product?.sale_price).toFixed(2)}
                                      {/* {content.inr} {product?.sale_price} */}
                                    </p>
                                  </li>
                                  <li className="d-inline-block">
                                    <p
                                      className="sp-price-tag-value m-0 d-inline-block"
                                      style={{ color: "#8b8f95" }}
                                    >
                                      <del>
                                        {/* @ts-ignore  */}
                                        {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {parseFloat(product?.price).toFixed(2)}
                                        {/* {content.inr} {product?.price} */}
                                      </del>
                                    </p>
                                  </li>
                                </ul>
                              ) : (
                                <ul className="list-style-none p-0 my-2 d-flex align-items-center">
                                  <li>
                                    <p className="sp-price-tag-value m-0">
                                      {/* @ts-ignore  */}
                                      {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {parseFloat(product?.price).toFixed(2)}
                                      {/* {content.inr} {product?.price} */}
                                    </p>
                                  </li>
                                </ul>
                              )}

                              {product.stock_qty >= 1 ? (
                                <Fragment>
                                  <div className="d-flex align-items-center ml-3">
                                    <div className="sp-verify-icn-wrap">
                                      <img
                                        src={available}
                                        alt="verify"
                                        className="img-fluid"
                                        width="19"
                                        height="19"
                                      />
                                    </div>
                                    <p className="m-0 sp-quantity-tag-name">
                                      In stock online
                                    </p>
                                  </div>
                                </Fragment>
                              ) : (
                                <Fragment>
                                  <div className="d-flex align-items-center ml-3">
                                    <Fragment>
                                      <div className="d-flex align-items-center">
                                        <div className="sp-verify-icn-wrap">
                                          <img
                                            src={sold}
                                            alt="verify"
                                            className="img-fluid"
                                            width="19"
                                            height="19"
                                          />
                                        </div>
                                        <p className="m-0 sp-quantity-tag-name">
                                          {content.soldOut}
                                        </p>
                                      </div>
                                    </Fragment>
                                  </div>
                                </Fragment>
                              )}
                            </div>
                          </div>
                          <div className="right-price-sec">
                            {product.stock_qty >= 1 &&
                              // Object.keys(
                              //   this.state.productDetails.attributes.cart_items
                              // ).length !== 0 && 
                              // Object.keys(
                              //   this.state.productDetails.attributes.cart_items
                              // ).filter((keyName: any, keyIndex: any) => {
                              //   return parseInt(keyName) == product.id;
                              // })[0]
                              (
                                <div className="sp-price-right-content">
                                  <div className="d-flex align-items-center justify-content-end">
                                    <p className="m-0 sp-quantity-tag-name pr-2">
                                      {content.quantity}
                                    </p>
                                    <div className="sp-quantity-box">
                                      <div className="cart-quantity-field">
                                        <Form>
                                          <FormGroup className="m-0">
                                            <span className="cart-quantity-icn quantity-icn-left d-flex align-items-center p-2">
                                              <FaMinus
                                                className="cart-quantity-minus"
                                                onClick={() => {
                                                  if (
                                                    this.state.itemQuantity - 1 <
                                                    1
                                                  ) {

                                                    //@ts-ignore
                                                    window.notify([{ message: `You can not set less than 1 quantity`, type: "warning" }]);
                                                  } else {
                                                    this.setState({
                                                      itemQuantity:
                                                        this.state.itemQuantity -
                                                        1,
                                                    });
                                                    quantity && this.putUpdateCartQuantity(
                                                      this.state.catalogue_id,
                                                      product.id
                                                    );
                                                  }
                                                }}
                                              />
                                            </span>
                                            <input
                                              type="number"
                                              className="form-control border-0"
                                              id="cart-quantity-123"
                                              value={this.state.itemQuantity}
                                            />
                                            <span className="cart-quantity-icn quantity-icn-right d-flex align-items-center p-2">
                                              <FaPlus
                                                className="cart-quantity-plus"
                                                onClick={() => {
                                                  if (
                                                    this.state.itemQuantity + 1 >
                                                    product.stock_qty
                                                  ) {
                                                    //@ts-ignore
                                                    window.notify([{ message: `You can not add more than ${product.stock_qty} quantity of this product`, type: "warning" }]);


                                                  } else {
                                                    this.setState({
                                                      itemQuantity:
                                                        this.state.itemQuantity +
                                                        1,
                                                    });
                                                    console.log(this.state.itemQuantity, "this.state.itemQuantity")
                                                    this.state.cartId
                                                      && quantity && (
                                                        this.putUpdateCartQuantity(
                                                          this.state.catalogue_id,
                                                          product.id
                                                        )
                                                        // this.setState({
                                                        //   itemQuantity: quantity
                                                        // })

                                                      )
                                                  }
                                                }}
                                              />
                                            </span>
                                          </FormGroup>
                                        </Form>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>
                        {/* // color display */}

                        {this.state.productDetails.attributes
                          .product_attributes[0]?.color?.length > 0 && (
                            <div className="sp-size-wrap pb-0">
                              <p className="m-0 sp-small-tag-name">{content.color}</p>
                              <ul
                                className="mb-0 p-0 mt-2 list-style-none d-flex flex-wrap align-items-center justify-content-start"
                                id="sp-size-data"
                              >
                                {this.state.productDetails.attributes.product_attributes[0]?.color.map(
                                  (item: any, idx: any) => (
                                    <li
                                      key={idx}
                                      className={`${idx === 0 ? "ml-md-0" : ""
                                        } mx-2 my-2 sp-size-col`}
                                    >
                                      <button
                                        className={`${this.state.active_color == item.name
                                          ? "active"
                                          : ""
                                          } sp-size-details p-2 text-center`}
                                        data-item="XS"
                                        onClick={() => {
                                          this.selectingColor(item);
                                        }}
                                      >
                                        {item.name}
                                      </button>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}

                        {/* // size display */}
                        {this.state.productDetails.attributes
                          .product_attributes[0].size?.length > 0 && (
                            <div className="sp-size-wrap pb-0 sp-other-wrap">
                              <p className="m-0 sp-small-tag-name">{content.size}</p>
                              <ul
                                className="mb-0 p-0 mt-2 list-style-none d-flex flex-wrap align-items-center justify-content-start"
                                id="sp-size-data"
                              >
                                {this.state.productDetails.attributes.product_attributes[0].size.map(
                                  (item: any, idx: any) => (
                                    <li
                                      key={idx}
                                      className={`${idx === 0 ? "ml-md-0" : ""
                                        } mx-2 my-2 sp-size-col`}
                                    >
                                      <button
                                        className={`${this.state.available_sizes.includes(
                                          item.name
                                        )
                                          ? this.state.active_size == item.name
                                            ? "active"
                                            : ""
                                          : "out-stock"
                                          } sp-size-details p-2 text-center`}
                                        disabled={
                                          !this.state.available_sizes.includes(
                                            item.name
                                          )
                                        }
                                        onClick={() => {
                                          this.setState({
                                            active_size: item.name,
                                          });
                                          this.settingSize(item);
                                        }}
                                      >
                                        {item.name}
                                      </button>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}

                        {/* button diplay */}
                      </div>
                    </div>
                  </div>

                  {Object.keys(product).length !== 0 &&
                    product.stock_qty >= 1 ? (
                    <div className="d-flex align-items-center justify-content-center justify-content-md-end ">
                      <ul className="p-0  mb-0 list-style-none d-flex align-items-center sp-product-add-action-wrap">
                        {Object.keys(
                          this.state.productDetails.attributes.cart_items
                        ).length !== 0 ? (
                          Object.keys(
                            this.state.productDetails.attributes.cart_items
                          ).filter((keyName: any, keyIndex: any) => {
                            return parseInt(keyName) == product.id;
                          })[0] ? (
                            <Fragment>
                              <li className="mx-2">
                                <button
                                  type="button"
                                  className="primary-btn"

                                  onClick={() => {
                                    localStorage.removeItem("buyNow")
                                    //@ts-ignore
                                    this.props?.history.push("/cart")
                                  }}
                                >
                                  {content.goToCart}
                                </button>
                              </li>
                              <li className="mx-2">
                                <button
                                  type="button"
                                  className="primary-btn"

                                  onClick={() => {
                                    localStorage.setItem("buyNow", JSON.stringify({
                                      cat_id: this.state.productDetails.id, sub_id: product.id, quantity: this.state.itemQuantity
                                    }))
                                    //@ts-ignore
                                    this.props?.history.push("/cart")
                                  }}
                                >
                                  {content.buyNow}
                                </button>
                              </li>
                            </Fragment>
                          ) : (
                            <Fragment>
                              <li className="mx-2">
                                <button
                                  type="button"
                                  className="primary-btn"
                                  onClick={() => {
                                    this.addToCart(product);
                                  }}
                                >
                                  {content.addToCart}
                                </button>
                              </li>
                              <li className="mx-2">
                                <button
                                  type="button"
                                  className="primary-btn"

                                  onClick={() => {
                                    localStorage.setItem("buyNow", JSON.stringify({

                                      cat_id: this.state.productDetails.id, sub_id: product.id, quantity: this.state.itemQuantity
                                    })),
                                      //@ts-ignore
                                      this.props?.history.push("/cart")
                                  }}
                                >
                                  {content.buyNow}
                                </button>
                              </li>
                            </Fragment>
                          )
                        ) : (
                          <Fragment>
                            <li className="mx-2">
                              <button
                                type="button"
                                className="primary-btn"
                                onClick={() => {
                                  this.addToCart(product);
                                }}
                              >
                                {content.addToCart}
                              </button>
                            </li>
                            <li className="mx-2">
                              <button
                                type="button"
                                className="primary-btn"

                                onClick={() => {
                                  localStorage.setItem("buyNow", JSON.stringify({

                                    cat_id: this.state.productDetails.id, sub_id: product.id, quantity: this.state.itemQuantity
                                  })),
                                    ///@ts-ignore
                                    this.props?.history.push("/cart")
                                }}
                              >
                                {content.buyNow}
                              </button>
                            </li>
                          </Fragment>
                        )}
                      </ul>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center justify-content-md-end ">
                      <ul className="p-0 list-style-none d-flex align-items-center sp-product-add-action-wrap">

                        {
                          (this.state.productDetails.attributes.stock_qty > 0 ? product.is_notify_product : this.state.productDetails.attributes.catalogue_variants[0].attributes.is_notify_product) ? content.willNotify : (

                            <>
                              <li className="mx-2">
                                <p className="product-stock-message mb-0">
                                  {content.itemOutOfStock}
                                </p>
                              </li>
                              <li className="mx-2">
                                {/* {console.log(this.state.productDetails.attributes,"prodducr======")} */}
                                <button
                                  type="button"
                                  className={`${(this.state.productDetails.attributes.stock_qty > 0 ? product.is_notify_product : this.state.productDetails.attributes.catalogue_variants[0].attributes.is_notify_product) ? "notify-disabled primary-btn" : "primary-btn"} `}
                                  onClick={() => {
                                    this.postNotifyMe(this.state.productDetails.attributes.stock_qty > 0 ? product.id : this.state.productDetails.attributes.default_variant.id)

                                  }}
                                // disabled={
                                //   this.state.productDetails.attributes.stock_qty > 0 ? product.is_notify_product : this.state.productDetails.attributes.catalogue_variants[0].attributes.is_notify_product
                                // }
                                >
                                  {content.notifyMe}
                                </button>
                                <Dialog
                                  open={this.state.notifyModelOpen}
                                  onClose={this.handleNotifyProductClose}
                                  aria-labelledby="alert-dialog-title"
                                  aria-describedby="alert-dialog-description"
                                >
                                  <DialogTitle
                                    id="alert-dialog-title"
                                    className="rate-review"
                                  >
                                    <h2>
                                      {content.requestProcessed}
                                    </h2>
                                    <DialogActions className="close-btn">
                                      <img
                                        src={closebutton}
                                        onClick={() => {
                                          this.handleNotifyProductClose()
                                        }}
                                        alt="close"
                                      />
                                    </DialogActions>
                                  </DialogTitle>
                                  <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                      {content.willNotify}
                                    </DialogContentText>
                                  </DialogContent>
                                  <DialogActions>
                                    <button
                                      className="primary-btn border-btn"
                                      type="submit"
                                      onClick={() => {
                                        //this.postReview()
                                        this.handleNotifyProductClose()
                                        //this.handleNotifyProduct()

                                      }}
                                    >
                                      {content.okay}
                                    </button>
                                  </DialogActions>
                                </Dialog>
                              </li>
                            </>
                          )
                        }
                      </ul>
                    </div>
                  )}
                </div>

                {/* ///////// */}
                {this.state.reviews.length > 0 && <div className="product-rating">
                  <div className="sp-inner-content-wrap bg-white radius-10">
                    {this.state.reviews.length > 0 && <h2 className="sp-description-title mt-0">
                      {content.ProductRating}
                    </h2>}
                    <div className="d-flex align-item-center d-flex-wrap-mobile">
                      {this.state.reviews.length > 0 && <div className="rating-view mr-5">
                        <div className="rating-number">{this.state.productDetails.attributes.average_rating % 1 != 0 ? this.state.productDetails.attributes.average_rating.toFixed(1) : this.state.productDetails.attributes.average_rating}/5</div>
                        <div className="feedback-container">
                          <div className="feedback">
                            <div className="rating my-3">
                              <Box
                                component="fieldset"
                                borderColor="transparent"
                              >
                                <Rating name="simple-controlled1" value={this.state.productDetails.attributes.average_rating.toFixed(1)} precision={0.1} />
                              </Box>
                            </div>
                          </div>
                        </div>
                        <div className="rating-based">Based on {this.state.reviews.length} Ratings</div>
                      </div>

                      }
                      <div className="total-review">
                        <div className="total-data">
                          <span>5</span>
                          <span className="star-image" />
                          <div className="rating-range yellow-bg">
                            <span style={{ width: (this.state.reviewRatings[4] / this.state.reviews.length) * 100 + "%" }} />
                          </div>
                        </div>
                        <div className="total-data">
                          <span>4</span>
                          <span className="star-image" />
                          <div className="rating-range yellow-bg">
                            <span style={{ width: (this.state.reviewRatings[3] / this.state.reviews.length) * 100 + "%" }} />
                          </div>
                        </div>
                        <div className="total-data">
                          <span>3</span>
                          <span className="star-image" />
                          <div className="rating-range blue-bg">
                            <span style={{ width: (this.state.reviewRatings[2] / this.state.reviews.length) * 100 + "%" }} />
                          </div>
                        </div>
                        <div className="total-data">
                          <span>2</span>
                          <span className="star-image" />
                          <div className="rating-range blue-bg">
                            <span style={{ width: (this.state.reviewRatings[1] / this.state.reviews.length) * 100 + "%" }} />
                          </div>
                        </div>
                        <div className="total-data">
                          <span>1</span>
                          <span className="star-image" />
                          <div className="rating-range red-bg">
                            <span style={{ width: (this.state.reviewRatings[0] / this.state.reviews.length) * 100 + "%" }} />
                          </div>
                        </div>
                      </div>

                      {this.state.SingleProductReview &&
                        Object.keys(this.state.SingleProductReview).length !==
                        0 ? (
                        ""
                      ) : (
                        <div className="rate-product" style={{ borderLeft: `${this.state.reviews.length > 0 && "1px solid #ccc"}` }}>
                          <h2 className="sp-description-title mt-0 mb-0 Hi">
                            {content.RateProduct}
                          </h2>
                          <Box
                            component="fieldset"
                            my={3}
                            borderColor="transparent"
                          >
                            <Rating
                              name="simple-controlled2"
                              value={this.state.product_rating}
                              onChange={(event: any, newValue: any) => {
                                this.setState({
                                  product_rating: newValue,
                                });
                              }}
                            />
                          </Box>

                          <button
                            className="primary-btn"
                            onClick={() => {
                              this.setState({
                                isReviewModalOpen: true,
                              });
                            }}
                          >
                            {content.WriteReview}
                          </button>
                          <Dialog
                            open={this.state.isReviewModalOpen}
                            onClose={this.handleCloseReview}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle
                              id="alert-dialog-title"
                              className="rate-review"
                            >
                              Rate and Review
                              <DialogActions className="close-btn">
                                <img
                                  src={closebutton}
                                  onClick={() => {
                                    this.setState({
                                      isReviewModalOpen: false,
                                    });
                                  }}
                                  alt="close"
                                />
                              </DialogActions>
                            </DialogTitle>
                            <DialogContent>
                              <h3 className="sp-description-title mt-0 mb-0 small-heading">
                                Rate our Services
                              </h3>
                              <Box
                                component="fieldset"
                                borderColor="transparent"
                              >
                                <Rating
                                  name="simple-controlled2"
                                  value={this.state.product_rating}
                                  onChange={(event: any, newValue: any) => {
                                    this.setState({
                                      product_rating: newValue,
                                    });
                                    setTimeout(() => {
                                      console.log(this.state.product_rating);
                                    }, 200);
                                  }}
                                />
                              </Box>
                              <DialogContentText id="alert-dialog-description">
                                <textarea
                                  className="rating-textbox"
                                  placeholder="write detailed review for us..."
                                  value={this.state.commentBox}
                                  onChange={this.handleComment}
                                />
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <button
                                className="primary-btn border-btn"
                                type="submit"
                                onClick={() => {
                                  this.postReview()
                                  this.setState({
                                    isReviewModalOpen: false,
                                  });

                                }}
                              >
                                Submit
                              </button>
                            </DialogActions>
                          </Dialog>
                        </div>
                      )}
                    </div>
                    <div className={this.state.reviewShown > 2 ? "user-comments-yscroll" : "user-comments"}>


                      {this.state.reviews && this.state.reviews.map((user: any, index: any) => {

                        return index < this.state.reviewShown && <div className="d-flex justify-content-between flex-wrap" key={index}>

                          <div className="user-data">
                            <img
                              src={user?.attributes.account.image_url}
                              alt=""
                              className="user-img"
                            />
                            <div className="user-name">
                              {user?.attributes.account.full_name}
                              <span className="comment">
                                {user?.attributes.comment}
                              </span>
                            </div>
                          </div>
                          <div className="user-review">
                            <div className="feedback">
                              <Rating name={index} value={user.attributes.rating.toFixed(1)} precision={0.1} />

                            </div>
                            <div className="review-date">{user.attributes.review_date}</div>
                          </div>
                        </div>
                      })}





                    </div>

                    <div className="yt-comonent-link">
                      {this.state.reviews.length > 2 && (this.state.reviewShown == 2 ? <Button color="link yt-component-more px-0" onClick={() => {
                        this.setState({
                          reviewShown: this.state.reviews.length
                        })
                      }}>{content.ShowMore}</Button> :
                        <Button color="link yt-component-more px-0" onClick={() => {
                          this.setState({
                            reviewShown: 2
                          })
                        }}>{content.showLess}</Button>
                      )}
                    </div>
                  </div>

                </div>
                }
                {/* /////// */}

                {/* <Review/> */}
              </Col>
              <Col xs={12} md={12} lg={6} className="right-inner-content-wrap yt-cm-rt-col product-col">
                <div className="right-inner-content-wrap for-desktop">
                  <div className="sp-inner-wrap bg-white radius-10">
                    <div className="d-flex align-items-center justify-content-between yt-sp-title-wrapper mb-4">
                      <h1 className="product-title m-0">
                        {this.state.productDetails.attributes?.name}
                      </h1>
                      <div
                        className={
                          this.state.productDetails.attributes?.wishlisted
                            ? "added sp-favorite-wrap d-flex align-items-center p-3"
                            : "sp-favorite-wrap d-flex align-items-center p-3"
                        }
                        onClick={() =>
                          this.state.productDetails.attributes?.wishlisted
                            ? this.delWishlist(this.state.catalogue_id)
                            : this.postWishlist(this.state.catalogue_id)
                        }
                      >
                        <FaRegHeart className="sp-fav-icn" />
                      </div>
                    </div>


                    <div className="sp-price-wrap d-flex flex-nowrap align-items-center justify-content-between">
                      <div className="sp-price-left-content">
                        <div className="price-quontity-sec mb-3">
                          <div className="left-price-sec">
                            <p className="m-0 sp-small-tag-name">PRICE</p>
                            <div className="d-flex">
                              {product?.on_sale ? (
                                <ul className="list-style-none p-0 my-2">
                                  <li className="d-inline-block">
                                    <p className="sp-price-tag-value m-0 pr-3 ">
                                      {/* @ts-ignore  */}
                                      {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {parseFloat(product?.sale_price).toFixed(2)}
                                      {/* {content.inr} {product?.sale_price} */}
                                    </p>
                                  </li>
                                  <li className="d-inline-block">
                                    <p
                                      className="sp-price-tag-value m-0 d-inline-block"
                                      style={{ color: "#8b8f95" }}
                                    >
                                      <del>
                                        {/* @ts-ignore  */}
                                        {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {parseFloat(product?.price).toFixed(2)}
                                        {/* {content.inr} {product?.price} */}
                                      </del>
                                    </p>
                                  </li>
                                </ul>
                              ) : (
                                <ul className="list-style-none p-0 my-2 d-flex align-items-center">
                                  <li>
                                    <p className="sp-price-tag-value m-0">
                                      {/* @ts-ignore  */}
                                      {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {parseFloat(product?.price).toFixed(2)}
                                      {/* {content.inr} {product?.price} */}
                                    </p>
                                  </li>
                                </ul>
                              )}

                              {product.stock_qty >= 1 ? (
                                <Fragment>
                                  <div className="d-flex align-items-center ml-3">
                                    <div className="sp-verify-icn-wrap">
                                      <img
                                        src={available}
                                        alt="verify"
                                        className="img-fluid"
                                        width="19"
                                        height="19"
                                      />
                                    </div>
                                    <p className="m-0 sp-quantity-tag-name">
                                      In stock online
                                    </p>
                                  </div>
                                </Fragment>
                              ) : (
                                <Fragment>
                                  <div className="d-flex align-items-center ml-3">
                                    <Fragment>
                                      <div className="d-flex align-items-center">
                                        <div className="sp-verify-icn-wrap">
                                          <img
                                            src={sold}
                                            alt="verify"
                                            className="img-fluid"
                                            width="19"
                                            height="19"
                                          />
                                        </div>
                                        <p className="m-0 sp-quantity-tag-name">
                                          {content.soldOut}
                                        </p>
                                      </div>
                                    </Fragment>
                                  </div>
                                </Fragment>
                              )}
                            </div>
                          </div>
                          <div className="right-price-sec">
                            {product.stock_qty >= 1 &&
                              // Object.keys(
                              //   this.state.productDetails.attributes.cart_items
                              // ).length !== 0 && 
                              // Object.keys(
                              //   this.state.productDetails.attributes.cart_items
                              // ).filter((keyName: any, keyIndex: any) => {
                              //   return parseInt(keyName) == product.id;
                              // })[0]
                              (
                                <div className="sp-price-right-content">
                                  <div className="d-flex align-items-center justify-content-end">
                                    <p className="m-0 sp-quantity-tag-name pr-2">
                                      {content.quantity}
                                    </p>
                                    <div className="sp-quantity-box">
                                      <div className="cart-quantity-field">
                                        <Form>
                                          <FormGroup className="m-0">
                                            <span className="cart-quantity-icn quantity-icn-left d-flex align-items-center p-2">
                                              <FaMinus
                                                className="cart-quantity-minus"
                                                onClick={() => {
                                                  if (
                                                    this.state.itemQuantity - 1 <
                                                    1
                                                  ) {

                                                    //@ts-ignore
                                                    window.notify([{ message: `You can not set less than 1 quantity`, type: "warning" }]);
                                                  } else {
                                                    this.setState({
                                                      itemQuantity:
                                                        this.state.itemQuantity -
                                                        1,
                                                    });
                                                    quantity && this.putUpdateCartQuantity(
                                                      this.state.catalogue_id,
                                                      product.id
                                                    );
                                                  }
                                                }}
                                              />
                                            </span>
                                            <input
                                              type="number"
                                              className="form-control border-0"
                                              id="cart-quantity-123"
                                              value={this.state.itemQuantity}
                                            />
                                            <span className="cart-quantity-icn quantity-icn-right d-flex align-items-center p-2">
                                              <FaPlus
                                                className="cart-quantity-plus"
                                                onClick={() => {
                                                  if (
                                                    this.state.itemQuantity + 1 >
                                                    product.stock_qty
                                                  ) {
                                                    //@ts-ignore
                                                    window.notify([{ message: `You can not add more than ${product.stock_qty} quantity of this product`, type: "warning" }]);


                                                  } else {
                                                    this.setState({
                                                      itemQuantity:
                                                        this.state.itemQuantity +
                                                        1,
                                                    });
                                                    console.log(this.state.itemQuantity, "this.state.itemQuantity")
                                                    this.state.cartId
                                                      && quantity && (
                                                        this.putUpdateCartQuantity(
                                                          this.state.catalogue_id,
                                                          product.id
                                                        )
                                                        // this.setState({
                                                        //   itemQuantity: quantity
                                                        // })

                                                      )
                                                  }
                                                }}
                                              />
                                            </span>
                                          </FormGroup>
                                        </Form>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>
                        {/* // color display */}

                        {this.state.productDetails.attributes
                          .product_attributes[0]?.color?.length > 0 && (
                            <div className="sp-size-wrap pb-0">
                              <p className="m-0 sp-small-tag-name">{content.color}</p>
                              <ul
                                className="mb-0 p-0 mt-2 list-style-none d-flex flex-wrap align-items-center justify-content-start"
                                id="sp-size-data"
                              >
                                {this.state.productDetails.attributes.product_attributes[0]?.color.map(
                                  (item: any, idx: any) => (
                                    <li
                                      key={idx}
                                      className={`${idx === 0 ? "ml-md-0" : ""
                                        } mx-2 my-2 sp-size-col`}
                                    >
                                      <button
                                        className={`${this.state.active_color == item.name
                                          ? "active"
                                          : ""
                                          } sp-size-details p-2 text-center`}
                                        data-item="XS"
                                        onClick={() => {
                                          this.selectingColor(item);
                                        }}
                                      >
                                        {item.name}
                                      </button>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}

                        {/* // size display */}
                        {this.state.productDetails.attributes
                          .product_attributes[0].size?.length > 0 && (
                            <div className="sp-size-wrap pb-0 sp-other-wrap">
                              <p className="m-0 sp-small-tag-name">{content.size}</p>
                              <ul
                                className="mb-0 p-0 mt-2 list-style-none d-flex flex-wrap align-items-center justify-content-start"
                                id="sp-size-data"
                              >
                                {this.state.productDetails.attributes.product_attributes[0].size.map(
                                  (item: any, idx: any) => (
                                    <li
                                    key={idx}
                                      className={`${idx === 0 ? "ml-md-0" : ""
                                        } mx-2 my-2 sp-size-col`}
                                    >
                                      <button
                                        className={`${this.state.available_sizes.includes(
                                          item.name
                                        )
                                          ? this.state.active_size == item.name
                                            ? "active"
                                            : ""
                                          : "out-stock"
                                          } sp-size-details p-2 text-center`}
                                        disabled={
                                          !this.state.available_sizes.includes(
                                            item.name
                                          )
                                        }
                                        onClick={() => {
                                          this.setState({
                                            active_size: item.name,
                                          });
                                          this.settingSize(item);
                                        }}
                                      >
                                        {item.name}
                                      </button>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}

                        {/* button diplay */}
                      </div>
                    </div>
                  </div>

                  {Object.keys(product).length !== 0 &&
                    product.stock_qty >= 1 ? (
                    <div className="d-flex align-items-center justify-content-center justify-content-md-end ">
                      <ul className="p-0  mb-0 list-style-none d-flex align-items-center sp-product-add-action-wrap">
                        {Object.keys(
                          this.state.productDetails.attributes.cart_items
                        ).length !== 0 ? (
                          Object.keys(
                            this.state.productDetails.attributes.cart_items
                          ).filter((keyName: any, keyIndex: any) => {
                            return parseInt(keyName) == product.id;
                          })[0] ? (
                            <Fragment>
                              <li className="mx-2">
                                <button
                                  type="button"
                                  className="primary-btn"


                                  onClick={() => {
                                    localStorage.removeItem("buyNow")
                                    //@ts-ignore
                                    this.props?.history.push("/cart")
                                  }}
                                >
                                  {content.goToCart}
                                </button>
                              </li>
                              <li className="mx-2">
                                <button
                                  type="button"
                                  className="primary-btn"
                                  onClick={() => {

                                    localStorage.setItem("buyNow", JSON.stringify({

                                      cat_id: this.state.productDetails.id, sub_id: product.id, quantity: this.state.itemQuantity
                                    })),
                                      //@ts-ignore
                                      this.props?.history.push("/cart")
                                  }}
                                >
                                  {content.buyNow}
                                </button>
                              </li>
                            </Fragment>
                          ) : (
                            <Fragment>
                              <li className="mx-2">
                                <button
                                  type="button"
                                  className="primary-btn"
                                  onClick={() => {
                                    this.addToCart(product);
                                  }}
                                >
                                  {content.addToCart}
                                </button>
                              </li>
                              <li className="mx-2">
                                <button
                                  type="button"
                                  className="primary-btn"

                                  onClick={() => {
                                    localStorage.setItem("buyNow", JSON.stringify({

                                      cat_id: this.state.productDetails.id, sub_id: product.id, quantity: this.state.itemQuantity
                                    })),
                                      //@ts-ignore
                                      this.props?.history.push("/cart")
                                  }}

                                >
                                  {content.buyNow}
                                </button>
                              </li>
                            </Fragment>
                          )
                        ) : (
                          <Fragment>
                            <li className="mx-2">
                              <button
                                type="button"
                                className="primary-btn"
                                onClick={() => {
                                  this.addToCart(product);
                                }}
                              >
                                {content.addToCart}
                              </button>
                            </li>
                            <li className="mx-2">
                              <button
                                type="button"
                                className="primary-btn"

                                onClick={() => {
                                  localStorage.setItem("buyNow", JSON.stringify({

                                    cat_id: this.state.productDetails.id, sub_id: product.id, quantity: this.state.itemQuantity
                                  })),
                                    //@ts-ignore
                                    this.props?.history.push("/cart")
                                }}

                              >
                                {content.buyNow}
                              </button>
                            </li>
                          </Fragment>
                        )}
                      </ul>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center justify-content-md-end ">
                      <ul className="p-0 list-style-none d-flex align-items-center sp-product-add-action-wrap">

                        {
                          (this.state.productDetails.attributes.stock_qty > 0 ? product.is_notify_product : this.state.productDetails.attributes.catalogue_variants[0].attributes.is_notify_product) ? content.willNotify : (

                            <>
                              <li className="mx-2">
                                <p className="product-stock-message mb-0">
                                  {content.itemOutOfStock}
                                </p>
                              </li>
                              <li className="mx-2">
                                {/* {console.log(this.state.productDetails.attributes,"prodducr======")} */}
                                <button
                                  type="button"
                                  className={`${(this.state.productDetails.attributes.stock_qty > 0 ? product.is_notify_product : this.state.productDetails.attributes.catalogue_variants[0].attributes.is_notify_product) ? "notify-disabled primary-btn" : "primary-btn"} `}
                                  onClick={() => {
                                    this.postNotifyMe(this.state.productDetails.attributes.stock_qty > 0 ? product.id : this.state.productDetails.attributes.default_variant.id)
                                  }}
                                // disabled={
                                //   this.state.productDetails.attributes.stock_qty > 0 ? product.is_notify_product : this.state.productDetails.attributes.catalogue_variants[0].attributes.is_notify_product
                                // }
                                >
                                  {content.notifyMe}
                                </button>
                                <Dialog
                                  open={this.state.notifyModelOpen}
                                  onClose={this.handleNotifyProductClose}
                                  aria-labelledby="alert-dialog-title"
                                  aria-describedby="alert-dialog-description"
                                >
                                  <DialogTitle
                                    id="alert-dialog-title"
                                    className="rate-review"
                                  >
                                    <h2>
                                      {content.requestProcessed}
                                    </h2>
                                    <DialogActions className="close-btn">
                                      <img
                                        src={closebutton}
                                        onClick={() => {
                                          this.handleNotifyProductClose()

                                        }}
                                        alt="close"
                                      />
                                    </DialogActions>
                                  </DialogTitle>
                                  <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                      {content.willNotify}
                                    </DialogContentText>
                                  </DialogContent>
                                  <DialogActions>
                                    <button
                                      className="primary-btn border-btn"
                                      type="submit"
                                      onClick={() => {
                                        this.handleNotifyProductClose()
                                      }}
                                    >
                                      {content.okay}
                                    </button>
                                  </DialogActions>
                                </Dialog>
                              </li>
                            </>
                          )
                        }
                      </ul>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        ) : (
          content.NoProductFound
        )}

        {product && this.state.productDetails.attributes?.similar_products.data.length > 0 &&
          <section className="new-collection pb-5">

            <div className="main-container">
              <div className="box-carousal">
                {this.state.productDetails.attributes?.similar_products?.data && (
                  <ProductCard
                    collection={this.state.productDetails.attributes.similar_products.data}
                    name="Similar Product"
                    onViewMore={() =>
                      //@ts-ignore
                      this.props?.history.push("/Filteroptions")}
                    addToCart={this.addToCart}
                    createWishlist={this.postWishlist}
                    deleteWishlist={this.delWishlist}
                    toSetDefaultVariant={this.toSetDefaultVariant}

                  />
                )}
              </div>
            </div>
          </section>
        }
      </section>

    );
  }
}
//@ts-ignore
export default withRouter(ProductDetails)