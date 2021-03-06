import React, { Fragment, useState } from "react";
import Header from "../../../components/src/AppHeader/index";
import Footer from "../../../components/src/AppFooter/index";
import EmptyCartContent from "./EmptyCartContent.web";
import Ripple from "react-ripples";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Form,
  Input,
  FormGroup,
  Label,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { useHistory, useParams, Link, withRouter } from "react-router-dom";
//@ts-ignore
import content from "../../../components/src/content.js"
import ShoppingCartController, {
  Props,
  configJSON,
} from "./ShoppingCartController.web";

import "../assets/css/index.css";
import Loader from "../../../components/src/Loader.web";


//// links to navigate hompage/////
function CartBreadCrumbs() {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <div className="pageroute cart-pg-breadcrumbs my-3">
            <Link to="/home-page">
              <span
                className="cart-pg-home w3-hover-opacity"
                style={{ cursor: "default" }}
              >
                {content.home}
              </span>
            </Link>
            <img src={require('../assets/images/back-arrow.svg')} width='8' height='8' className="mx-2" />
            <span className="cart-pg-current">{content.cart}</span>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

///////cart listing//////

function CartProduct(props: any) {
  const variant = props.product?.attributes?.catalogue_variant.attributes;
  const index = props.index;

  return (
    variant && (
      <>
        {/* {props.loader && <Loader loading={props.loader} />} */}
        <div className="cart-produt-list-wrap radius-10 bg-white cart-pg-mb-30">
          <div className="d-flex flex-wrap cart-pg-product-list-row justify-content-between">
            <div className="cart-pg-list-image">
              <div
                className="cart-product Productct-image w3-ripple"
                onClick={() => {

                  props.toSetdefaultVariant(index, variant.catalogue_id)
                }
                }
                style={{ cursor: "pointer" }}
              >

                <img
                  src={variant?.images.data[0].attributes.url}
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="cart-pg-list-prdt-info d-flex justify-content-between">
              <div className="cart-prodict-info" style={{ cursor: "default" }}>
                <h2
                  className="cart-product-title mb-0 w3-ripple"
                  style={{ cursor: "pointer" }}
                  onClick={() => {

                    props.toSetdefaultVariant(index, variant.catalogue_id)
                  }
                  }
                >
                  {props.product?.attributes?.catalogue.attributes.name}
                </h2>

                <div className="cart-prodict-type-container">
                  <Table className="cart-prodict-type w-auto" borderless>
                    <thead>
                      <tr>
                        {variant.product_variant_properties.map(
                          (item: any, idx: any) => (
                            <th key={idx}>{item.variant_name}</th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {variant.product_variant_properties.map(
                          (item: any, idx: any) => (
                            <th key={idx}>{item.property_name}</th>
                          )
                        )}
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <span className="cart-product-price">
                  {/* @ts-ignore  */}
                  {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {variant.on_sale ? variant.sale_price : variant.price}
                  {/* {content.inr} {variant.on_sale ? variant.sale_price : variant.price} */}
                </span>
              </div>
              {Object.keys(JSON.parse(localStorage.getItem("buyNow") || '{}')).length == 0 && <div className="cart-list-other-act">
                <div className="cart-action">
                  <span onClick={() => {
                    props.moveToWishlist(variant.catalogue_id, variant.id)
                  }}>

                    {content.MovetoWishlist}
                  </span>
                  <div
                    className="cart-product-delete"
                    onClick={() => {
                      props.deleteCartItem(variant.catalogue_id, variant.id)
                      // @ts-ignore
                      window.notify([{ message: "Item successfully deleted", type: "success" }]);
                    }
                    }
                  >

                    {content.remove}
                  </div>
                </div>
                <div className="cart-action-wrap text-right">
                  <div className="cart-quantity-box">
                    <div className="cart-quantity-field">
                      <Form>
                        <FormGroup className="m-0">
                          <span className="cart-quantity-icn quantity-icn-left d-flex align-items-center p-2">
                            <FaMinus
                              className="cart-quantity-minus"
                              onClick={() => {
                                if (props.product?.attributes.quantity - 1 < 1) {
                                  //@ts-ignore
                                  window.notify([
                                    {
                                      message: `You can not set less than 1 quantity`,
                                      type: "warning",
                                    },
                                  ]);
                                } else {
                                  props.updateitemQuantity(
                                    variant.catalogue_id,
                                    variant.id,
                                    props.product?.attributes.quantity - 1
                                  );
                                }
                              }}
                            />
                          </span>
                          <input
                            type="number"
                            className="form-control border-0"
                            id="cart-quantity-123"
                            value={props.product?.attributes.quantity}
                          />
                          <span className="cart-quantity-icn quantity-icn-right d-flex align-items-center p-2">
                            <FaPlus
                              className="cart-quantity-plus"
                              onClick={() => {
                                if (
                                  props.product?.attributes.quantity + 1 >
                                  variant.stock_qty
                                ) {
                                  //@ts-ignore
                                  window.notify([
                                    {
                                      message: `You can not add more than ${variant.stock_qty} quantity of this product`,
                                      type: "warning",
                                    },
                                  ]);
                                } else {

                                  props.updateitemQuantity(
                                    variant.catalogue_id,
                                    variant.id,
                                    props.product?.attributes.quantity + 1
                                  );
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
              } </div>
          </div>
        </div>
      </>
    )
  );
}

///// cart Amount//////
const CartAmount: any = withRouter((props: any) => {
  //const variant = props.product?.attributes?.catalogue_variant.attributes;
  const wholeCart = props.wholeCart

  const [couponCode, setCouponCode] = useState(wholeCart?.coupon?.attributes?.code)

  function getProducts() {
    var items: any = [];
    wholeCart && wholeCart.order_items.forEach((item: any, index: any) => {
      items.push(
        <tr key={index}>
          <td>
            <span className="cart-product-amount-ttl">
              {item.attributes.catalogue.attributes.name}
            </span>
          </td>
          <td>
            <span className="cart-product-amount-qty">
              x{item.attributes.quantity}

            </span>
          </td>
          <td>
            <span className="cart-product-amount-price">
              {/* @ts-ignore  */}
              {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {parseFloat(item.attributes.total_price).toFixed(2)}
              {/* {content.inr} {item.attributes.total_price} */}

            </span>
          </td>
        </tr>
      )
    })

    return items;
  }

  //cart Submition handling for Guest and Normal User
  const proceedToCheckoutForm = () => {
    const GuestUserUUId = localStorage.getItem('guestUUID');
    const GuestUserData = localStorage.getItem('guestUserData');
    const normalUserData = localStorage.getItem('userData');
    if (GuestUserData && GuestUserUUId && normalUserData == null) {
      // props.history.push('/')
      props.history.push({
        pathname: '/',
        state: { "calledFrom": "cart" }
      })
    }
    else {
      props?.history?.push("./checkout");
    }
  };



  return (
    wholeCart && (<div className="radius-10 bg-white yt-cart-price-lister">
      <Table className="mb-0 cart-prodict-amount " borderless>
        <thead>
          <tr>
            <th>{content.YourCart}</th>
            <th>{content.qty}</th>
            <th>{content.amount}</th>
          </tr>
        </thead>
        <tbody>{getProducts()}</tbody>
      </Table>
      <Table className="yt-sub-ttl-tbl-wrap">
        <tbody>
          <tr>
            <td style={{ paddingLeft: 0 }}>
              <span className="cart-product-amount-ttl">
                {content.SubTotal}
              </span>
            </td>
            <td style={{ paddingRight: 0 }}>
              <span className="cart-product-amount-price cart-sub-total">
                {/* @ts-ignore  */}
                {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {parseFloat(wholeCart.sub_total).toFixed(2)}
                {/* {content.inr} {wholeCart.sub_total} */}
              </span>
            </td>
          </tr>
        </tbody>
      </Table>
      <span className="cart-divider" />
      <Table className="mb-0 cart-prodict-total-amount " borderless>
        <tbody>
          <tr>
            <td>
              <span className="cart-product-amount-ttl">
                {content.taxes}
              </span>
            </td>
            <td>
              <span className="cart-product-amount-price">
                {/* @ts-ignore  */}
                + {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {parseFloat(wholeCart.total_tax).toFixed(2)}
                {/* + {content.inr} {wholeCart.total_tax} */}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <span className="cart-product-amount-ttl">
                {content.DeliveryCharges}

              </span>
            </td>
            <td>
              <span className="cart-product-amount-price">
                {/* @ts-ignore  */}
                + {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {wholeCart.shipping_total != null ? wholeCart.shipping_total : 0.00}
                {/* + {content.inr} {wholeCart.shipping_total!= null? wholeCart.shipping_total: 0} */}
              </span>
            </td>
          </tr>

        </tbody>
      </Table>
      <span className="cart-divider" />

      {/* coupon */}
      {Object.keys(JSON.parse(localStorage.getItem("buyNow") || '{}')).length == 0 &&
        <div className="cart-coupon mt-3">
          <Form className="yt-cart-disct-wrap pb-4">
            <FormGroup
              className={
                "m-0 " + "success"
                //(codeError || codeEmptyError ? "yt-form-cpn-err error" : "") +
                //(cart.coupon && !codeError && !codeEmptyError ? "success" : "")
              }
            >
              <input
                type="text"
                className="form-control"
                id="cart-total-products-amount"
                placeholder=
                "Apply Coupon"
                //@ts-ignore
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value)
                }}
                disabled={wholeCart.coupon_code_id != null}

              />
              <div className="pb-3 d-flex align-items-center cart-coupon-bottom-wrapper justify-content-between">
                {wholeCart.coupon_code_id != null && (
                  <span
                    className="cart-coupon-code-message success-message"
                    style={{ color: "#43b7a7", display: "block" }}
                  >
                    {content.couponApplied}

                  </span>
                )}
                <span className="cart-coupon-code-message error-message">
                  Coupon code can't be empty

                  {/* {codeError} */}
                </span>
                {/* {cart.coupon && !enableInput)&& (
                <Button
                  color="link cart-coupon-change-btn p-0"
                  
                >
                  Change Coupon
                </Button>
              )} */}
                {wholeCart.coupon_code_id != null && (
                  <Button
                    color="link cart-coupon-change-btn p-0"
                    onClick={() => {
                      props.deleteCoupon()
                    }}
                  >
                    {content.removeCoupon}
                  </Button>
                )}
              </div>


              <Button
                color="secondary cart-coupon-btn"
                onClick={() => {
                  props.toApplyCoupon(couponCode, wholeCart.sub_total)
                  //@ts-ignore

                }}
                disabled={couponCode == "" || wholeCart.coupon_code_id != null}
              >
                {content.apply}
              </Button>
            </FormGroup>
          </Form>
          {wholeCart.coupon_code_id != null && (
            <div>
              <Table className="mt-2 mb-0 cart-prodict-total-amount " borderless>
                <tbody>
                  <tr>
                    <td>
                      <span className="cart-product-amount-ttl">
                        Discount
                      </span>
                    </td>
                    <td>
                      <span className="cart-product-amount-price">
                        {/* @ts-ignore  */}
                        - {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {parseFloat(wholeCart.applied_discount).toFixed(2)}
                        {/* - {content.inr} {wholeCart.applied_discount} */}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <span className="cart-divider" />
            </div>
          )}
        </div>

      }
      <Table className="mb-0 cart-prodict-sub-total-amount " borderless>
        <tbody>
          <tr>
            <td>
              <span className="cart-product-amount-ttl" style={{ color: "black" }}>
                {content.TotalAmount}
              </span>
            </td>
            <td>
              <span className="cart-product-amount-price cart-sub-total">
                {/* @ts-ignore  */}
                {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {parseFloat(wholeCart.total).toFixed(2)}
                {/* {content.inr} {parseInt(wholeCart.total).toFixed(2)} */}

              </span>
            </td>
          </tr>
        </tbody>
      </Table>
      <div className="proceed-btn">
        <Ripple>
          <Button
            color="btn btn-secondary yt-login-btn btn-block"
            //  onClick={()=> props.history.push("./checkout")}
            onClick={() => {
              proceedToCheckoutForm()
            }}
          >
            {content.proceed}

          </Button>
        </Ripple>
      </div>
    </div>
    )
  );
})
const CartProductListData: any = withRouter((props: any) => {
  function getProducts() {
    var products: any = [];
    products = props.cart.map((item: any, idx: any) => {
      return (
        <CartProduct
          key={idx}
          index={idx}
          product={item}
          wholeCart={props.wholeCart}
          updateitemQuantity={props.updateitemQuantity}
          deleteCartItem={props.deleteCartItem}
          toSetdefaultVariant={props.toSetdefaultVariant}
          moveToWishlist={props.moveToWishlist}
          loader={props.loader}
          buyNowQuantity={props.buyNowQuantity}

        />
      );
    });
    return products;
  };


  return (
    <>
      <section className="cat-main-wrapper mb-4">
        <Container>
          <Row className="yt-cm-row">
            <Col lg={7} md={12}>
              <Fragment>
                <Fragment>{getProducts()}</Fragment>
              </Fragment>
            </Col>
            <Col lg={5} md={12}>
              <CartAmount
                wholeCart={props.wholeCart}
                toApplyCoupon={props.toApplyCoupon}
                couponSuccess={props.couponSuccess}
                deleteCoupon={props.deleteCoupon}
              />

            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
})




//// main class component
export class Cart extends ShoppingCartController {
  constructor(props: Props) {
    super(props);
  }
  render() {
    var ShowCart = false;

    return (

      <section>
        {localStorage.removeItem("newest")}
        {this.state.loading && <Loader loading={this.state.loading} />}
        <CartBreadCrumbs />
        {this.state.cart && this.state.cart.length > 0 ? (
          <CartProductListData
            cart={this.state.cart}
            wholeCart={this.state.wholeCart}
            updateitemQuantity={this.putUpdateCartQuantity}
            deleteCartItem={this.deleteCartItem}
            toSetdefaultVariant={this.toSetdefaultVariant}
            moveToWishlist={this.moveToWishlist}
            toApplyCoupon={this.toApplyCoupon}
            couponSuccess={this.state.couponSuccess}
            deleteCoupon={this.deleteCoupon}
            loader={this.state.loading}
            buyNowQuantity={this.state.buyNowQuantity}

          />
        ) : (
          <EmptyCartContent />
        )}
      </section>
    );
  }
}

// Customizable Area End
//@ts-ignore
export default withRouter(Cart)
