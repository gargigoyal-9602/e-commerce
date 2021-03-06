//@ts-nocheck;
import React, { Fragment, useState } from 'react';
// Customizable Area Start
import {
  Container,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  Col,
  Row,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Alert,
  Table,
} from 'reactstrap';
import Ripple from 'react-ripples';
import '../assets/css/order-summary.css';
import '../assets/css/index.scoped.css';
// Customizable Area End
import { Link, withRouter } from 'react-router-dom';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import OrderSummaryWebController, { Props } from './OrderSummaryController.web';
import StripePayments from '../../payments/src/Stripe.web';
// @ts-ignore
import content from "../../../components/src/content.js";
//@ts-ignore
import lowerCase from 'lodash/lowerCase';



// links to navigate hompage //
function CartBreadCrumbs() {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <div className="pageroute cart-pg-breadcrumbs my-3">
            <Link to="/home-page">
              <span
                className="cart-pg-home w3-hover-opacity"
                style={{ cursor: 'default' }}
              >
                Home
              </span>
            </Link>
            <img
              src={require('../assets/back-arrow.svg')}
              width="8"
              height="8"
              className="mx-2"
            />
            <span className="cart-pg-current">Payment</span>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

// cart Amount //
function CartAmount(props: any) {
  //const variant = props.product?.attributes?.catalogue_variant.attributes;
  const wholeCart = props.wholeCart;
  const [couponCode, setCouponCode] = useState('');

  function getProducts() {
    var items: any = [];
    wholeCart &&
      wholeCart.order_items.forEach((item: any, index: any) => {
        items.push(
          <tr key={index}>
            <td>
              <span className="cart-product-amount-ttl">
                {item.attributes.catalogue.attributes.name}
              </span>
            </td>
            <td>
              <span className="cart-product-amount-qty">
                x {item.attributes.quantity}
              </span>
            </td>
            <td>
              <span className="cart-product-amount-price">
                {/* @ts-ignore  */}
                {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {parseFloat(item.attributes.total_price).toFixed(2)}
                {/* ???INR {item.attributes.total_price} */}
              </span>
            </td>
          </tr>
        );
      });

    return items;
  }

  return (
    wholeCart && (
      <div className="radius-10 bg-white yt-cart-price-lister">
        <Table className="mb-0 cart-prodict-amount " borderless>
          <thead>
            <tr>
              <th>Your Cart</th>
              <th>Qty</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>{getProducts()}</tbody>
        </Table>
        <Table className="yt-sub-ttl-tbl-wrap">
          <tbody>
            <tr>
              <td style={{ paddingLeft: 0 }}>
                <span className="cart-product-amount-ttl">Sub Total</span>
              </td>
              <td style={{ paddingRight: 0 }}>
                <span className="cart-product-amount-price cart-sub-total">
                  {/* @ts-ignore  */}
                  {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {parseFloat(wholeCart.sub_total).toFixed(2)}
                  {/* ???INR {wholeCart.sub_total} */}
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
                <span className="cart-product-amount-ttl">Taxes</span>
              </td>
              <td>
                <span className="cart-product-amount-price">
                  {/* @ts-ignore  */}
                  + {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {parseFloat(wholeCart.total_tax).toFixed(2)}
                  {/* + ???INR {wholeCart.total_tax} */}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="cart-product-amount-ttl">
                  Delivery Charges
                </span>
              </td>
              <td>
                <span className="cart-product-amount-price">
                  {/* + ???INR{' '} */}
                  {/* @ts-ignore  */}
                  + {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {' '}
                  {wholeCart.shipping_total != null
                    ? wholeCart.shipping_total
                    : 0.00}
                </span>
              </td>
            </tr>
          </tbody>
        </Table>
        <span className="cart-divider" />

        <Table className="mb-0 cart-prodict-sub-total-amount " borderless>
          <tbody>
            <tr>
              <td>
                <span
                  className="cart-product-amount-ttl"
                  style={{ color: 'black' }}
                >
                  Total Amount
                </span>
              </td>
              <td>
                <span className="cart-product-amount-price cart-sub-total">
                  {/* @ts-ignore  */}
                  {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {parseFloat(wholeCart.total).toFixed(2)}
                  {/* ???INR {parseInt(wholeCart.total).toFixed(2)} */}
                </span>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  );
}

const CartProductListData: any = withRouter((props: any) => {
  function getProducts() {
    var products: any = [];
    products = props.cart.map((item: any, idx: any) => { });
  }

  return <CartAmount wholeCart={props.wholeCart} />;
});

// @ts-ignore
const PaymentModal = ({ onHandleCancel, onHandleConfirm, isOpen }) => {
  return (
    <Modal
      modalClassName="popopop"
      className="cm-small-modal-4"
      isOpen={isOpen}
      toggle={onHandleCancel}
      centered={true}
    >
      {/* <ModalHeader toggle={() => this.deleteLogout()} className="log-out-title-bar  border-0">
      <span>{content.logout}</span>
    </ModalHeader> */}
      <ModalBody className="yt-log-body-wrap">
        <div className='text-center log-out-body-text'>
          {content.placeOrderConfirmation}
        </div>
      </ModalBody>
      <ModalFooter className="log-out-bottom-bar p-1 d-flex justify-content-between">
        <Button color="secondary pp-log-out-btn-modal p-3 pp-log-out-btn-light-grey"
          onClick={onHandleCancel}>{content.cancel}</Button>
        <span className="yt-form-spacer" />
        <Button color="secondary pp-log-out-btn-modal p-3 pp-log-out-btn-dark-grey"
          onClick={onHandleConfirm}>{content.ok}</Button>
      </ModalFooter>
    </Modal>
  )
}

export default class OrderSummary extends OrderSummaryWebController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    console.log("=================== wholeCartData =============>>>>", this.state.wholeCartData)
    return (
      <div className="checkout-form-wrap">
        <Container>
          <Row>
            <CartBreadCrumbs />
            <Col md={7}>
              <div className="cart-pg-inner-wrap bg-white radius-10 cart-pg-mb-30">
                <h2 className="cart-checkout-tile mt-0 mb-3">
                  <FaLongArrowAltLeft
                    className="hcp-back-arrow mr-3"
                    onClick={this.onHandleBack}
                  />
                  Payment Options
                </h2>
                {/* Payment Options Start */}
                <Row>
                  <Col md={12}>
                    <div className="yt-chekout-radio d-flex flex-wrap my-3 justify-content-between">
                      <div className="yt-cart-radio-slct-wrap d-flex flex-wrap align-items-center">
                        {/*********************************** Stripe ***********************************/}
                        {/* @ts-ignore */}
                        {_.lowerCase(JSON.parse(localStorage.getItem('countryCode')).countryName) == 'uk' ? (
                          <FormGroup className="mr-2">
                            <span className="checkout-form-label">Stripe</span>
                            <Input
                              type="radio"
                              name="stripe"
                              checked={this.state.paymentType === 'stripe'}
                              onChange={(event) =>
                                this.setState({ paymentType: event.target.name })
                              }
                            />
                            <Label className="yt-checkout-form-rado-box" check />
                          </FormGroup>)
                          : ""}
                        {/* <FormGroup className="mr-2">
                          <span className="checkout-form-label">Stripe</span>
                          <Input
                            type="radio"
                            name="stripe"
                            checked={this.state.paymentType === 'stripe'}
                            onChange={(event) =>
                              this.setState({ paymentType: event.target.name })
                            }
                          />
                          <Label className="yt-checkout-form-rado-box" check />
                        </FormGroup> */}

                        {/********************************** RazorPay *************************************/}
                        {/* @ts-ignore */}
                        {_.lowerCase(JSON.parse(localStorage.getItem('countryCode')).countryName) == 'india' ? (
                          <FormGroup className="mr-2">
                            <span className="checkout-form-label">RazorPay</span>
                            <Input
                              type="radio"
                              name="razorpay"
                              checked={this.state.paymentType === 'razorpay'}
                              onChange={(event) =>
                                this.setState({ paymentType: event.target.name })
                              }
                            />
                            <Label className="yt-checkout-form-rado-box" check />
                          </FormGroup>)
                          : ""}
                        {/* <FormGroup className="mr-2">
                          <span className="checkout-form-label">RazorPay</span>
                          <Input
                            type="radio"
                            name="razorpay"
                            checked={this.state.paymentType === 'razorpay'}
                            onChange={(event) =>
                              this.setState({ paymentType: event.target.name })
                            }
                          />
                          <Label className="yt-checkout-form-rado-box" check />
                        </FormGroup> */}
                        {/* Cash on delivery */}
                        <FormGroup>
                          <span className="checkout-form-label">Cash on delivery</span>
                          <Input
                            type="radio"
                            name="cod"
                            checked={this.state.paymentType === 'cod'}
                            onChange={(event) =>
                              this.setState({ paymentType: event.target.name })
                            }
                          />
                          <Label className="yt-checkout-form-rado-box" check />
                        </FormGroup>
                      </div>
                    </div>
                  </Col>
                </Row>
                {/* Payment Options End */}
                {this.state.paymentType === 'stripe' && (
                  <StripePayments
                    // @ts-ignore
                    cartDetails={this.state.wholeCartData}
                    addressData={this.state.addressData}
                  />
                )}
              </div>

              {this.state.paymentType === 'razorpay' && (
                <div className="text-right">
                  <Ripple>
                    <Button
                      className="btn btn-secondary cart-proceed-to-checkput py-3 px-5"
                      onClick={() => this.toggleIsOpen()}
                    >
                      Proceed to Pay
                    </Button>
                  </Ripple>
                </div>
              )}
              {this.state.paymentType === 'cod' && (
                <div className="text-right">
                  <Ripple>
                    <Button
                      className="btn btn-secondary cart-proceed-to-checkput py-3 px-5"
                      onClick={() => this.toggleIsOpen()}
                    >
                      Proceed to Pay
                    </Button>
                  </Ripple>
                </div>
              )}
            </Col>

            <Col md={5}>
              <CartProductListData
                cart={this.state.cardtData}
                wholeCart={this.state.wholeCartData}
              />
            </Col>
          </Row>
        </Container>
        {this.state.isOpen && (
          <PaymentModal
            onHandleCancel={this.releaseBlockQuantity}
            onHandleConfirm={this.checkZipcodeAvailability}
            isOpen={true}
          />
        )}
      </div>
    );
  }
}
