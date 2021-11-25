import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Container, Row, Col, Button, Table } from "reactstrap";
import { FaLongArrowAltLeft } from "react-icons/fa";
// @ts-ignore
import capitalize from "lodash/capitalize";
import '../assets/styles/order-details.scoped.css';
// @ts-ignore
import content from "../../../components/src/content";

// Customizable Area End

import OrderDetailsController, {
  Props
} from "./OrderDetailsController.web";
import PageLoadingBlog from "../../profilebio/src/PageLoadingBlog.web";
import { orderStatucheck } from './assets';


class OrderDetails extends OrderDetailsController {

  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    const { orderItem, order } = this.props.location.state;
    console.log(this.props.location.state, 'this.props.location.state............SUUUCESSODERE______');
    if (this.state.loader) {
      // @ts-ignore
      return <PageLoadingBlog title="Loading ..." />
    }

    return (
      <Container>
        <Row>
          <Col md={12}>
            <div className="pageroute hc-breadcrumbs my-3">
              <Link to="/" className="hc-home order-page-prevpage">{content.home} {">"}</Link>
              <Link to="/profilebio" className="hc-mid order-page-prevpage"> {content.profile} {">"}</Link>{" "}
              <Link to={{
                pathname: '/profilebio',
                state: { activeTab: 'myorder' }
              }} className="hc-mid order-page-prevpage"> {content.myOrders} {">"}</Link>{" "}
              <span className="currpage hc-current">{content.orderDetails}</span>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={12} lg={12} className="px-3 col-xxl-9">
            <div className="od-cm-col-pad">
              <div className="hc-beckfrom-ct-page hc-mb-30 w3-ripple" onClick={() => {
                this.routeToProfile();
              }}>
                <FaLongArrowAltLeft
                  className="hcp-back-arrow"

                />{" "}
                <span className="pl-2 hc-back-tag">
                  {content.orderDetails}
                </span>
              </div>
              <div className="order-details-main-wrapper bg-white radius-10 mt-3 hc-mb-80">
                <div className="d-flex flex-wrap justify-content-between yt-sp-my-order-tdet-wrap">
                  <div className="d-flex align-items-center flex-wrap sinlge-mo-dt-wrap ">
                    <div className="order-number-wrap">
                      <span className="order-tag">
                        {content.orderNumber}: </span>
                      <span className="order-tag-val">{order?.order_number}</span>
                    </div>
                    <div className="order-bdr-between" />
                    <div className="order-date-wrap">
                      <span className="order-tag">
                        {content.orderedOn}: </span>
                      <span className="order-tag-val">{order?.order_date}</span>
                    </div>
                  </div>
                  {/* <div className="order-review text-right">
                    {!this.state.trackingDetails?.order_item_detail?.is_review_present && ["delivered", "returned"].includes(this.state.trackingDetails?.tracking_detail.data[0]?.attributes.status?.toLowerCase()) && <Button
                      color="link order-write-review px-0"
                    // onClick={() => this.pRsettt(true)}
                    >
                      {content.writeAReview}
                    </Button>}
                  </div> */}
                </div>
                <div className="py-3 d-flex align-items-center mb-3 od-single-prd-details-wrap">
                  <span className="d-flex" >
                    <div
                      className="od-product-img p-1 d-flex align-items-center justify-content-center w3-ripple"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setTimeout(() => {
                          // localStorage.setItem(
                          //   "default_variant",
                          //   this.state.trackingDetails?.order_item_detail?.data?.attributes?.catalogue_variant?.id
                          // );
                          this.props.history.push("/shop/" + this.state.trackingDetails?.order_item_detail?.data?.attributes?.catalogue?.id);
                          // props.history.push(`/shop/${product.id}`);
                        }, 500);
                        // this.props.history.push("/shop/" + this.state.trackingDetails?.order_item_detail?.data?.attributes?.catalogue?.id)}
                      }}
                    >
                      <img
                        src={this.getImageUrl()}
                        className="img-fluid"
                      />
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="order-product-info ">
                        <h2 className="pp-order-product-ttl mt-0 w3-ripple" style={{ cursor: "pointer" }} onClick={() => this.props.history.push("/shop/" + this.state.trackingDetails?.order_item_detail?.product.id)}>
                          {orderItem.attributes.product_name}
                        </h2>
                        <div className="order-prodict-type-container">
                          {orderItem.attributes?.catalogue_variant?.attributes?.product_variant_properties ? <Table className="mb-0 order-prodict-type d-block" borderless>
                            <thead>
                              <tr>
                                {orderItem.attributes?.catalogue_variant?.attributes?.product_variant_properties.map((value: any, index: number) => (<th key={index}>{value.variant_name}</th>))}
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                {orderItem.attributes?.catalogue_variant?.attributes?.product_variant_properties.map((value: any, index: number) => (<td key={index}>{value.property_name}</td>))}
                              </tr>
                            </tbody>
                          </Table> : <div></div>}
                        </div>
                        <ul className="p-0 order-ul-list-none mb-0 mt-2 d-flex flex-wrap align-items-center">
                          <li className="op-order-product-price1 pr-4">
                            {/* need to check data */}
                            <span className="order-product-price">
                              {/* @ts-ignore */}
                              {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {parseFloat(this.state.trackingDetails?.order_item_detail?.data?.attributes?.unit_price || 0).toFixed(2)}
                              {/* {data.currency} {parseFloat(data?.totalAmount || 0).toFixed(2)} */}
                            </span>
                          </li>
                          <li>
                            {/* <span className="order-tracing-details">
                              {content.trackingID}:
                              <span className="order-track-id">{this.state.trackingDetails?.tracking_detail.data[0].attributes.tracking_number}</span>{" "}
                            </span> */}
                            <span className='order-total-price'>
                              {content.TotalAmount} : {' '}
                              {/* @ts-ignore */}
                              {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {parseFloat(order?.total || 0).toFixed(2)}
                            </span>
                          </li>
                        </ul>
                        {/* <span>
                          {content.TotalAmount} : */}
                        {/* @ts-ignore */}
                        {/* {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {this.state.trackingDetails?.order_item_detail?.data?.attributes?.total_price}
                        </span> */}
                      </div>

                    </div>
                  </span>
                  <div>
                    <div className="order-product-quanity text-center text-sm-right">
                      <ul className="p-0 order-ul-list-none m-0 ">
                        <li className="op-order-quantity mb-3">
                          {content.quantity}: <span className="ord-product-quantity">{orderItem.attributes?.quantity}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="order-details-status on-the-way">

                      {capitalize(this.state.trackingDetails?.tracking_detail.data[0].attributes.status)}
                    </div>
                  </div>
                </div>
                <Row>
                  <Col md={12}>
                    <div className="order-details-status-bar py-3 my-3">
                      <h2 className="order-details-sub-title">
                        {content.orderStatus}
                      </h2>
                      <ul className="pl-2 order-ul-list-none mb-0 ml-3 order-details-status-wrap">

                        {this.state.trackingDetails?.tracking_detail?.data.map((item: any, index: number) => (
                          <div key={index}>
                            <li>
                              <img
                                alt="status check"
                                src={orderStatucheck}
                                // src={require("./images/statuss-check.png")}
                                className="order-details-status-icn" />
                              <div className="order-step-1 order-st-otw">
                                <h4 className="d-flex align-items-center">
                                  {capitalize(item?.attributes?.status) + " "}
                                  <span className="order-status-date">
                                    {item?.attributes?.order_date}
                                  </span>
                                </h4>
                                <p className="order-details-message">
                                  {/* {this.getLocalDate({ date: item.order_datetime, toFormat: "ddd, Do MMMM YYYY - hh:mm A" })} */}
                                  {item?.attributes?.message}, {item?.attributes?.order_datetime}
                                </p>
                              </div>
                            </li>
                          </div>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <div className="order-details-shipping-barmy-3">
                      <h2 className="order-details-sub-title">
                        {content.shippingAddress}
                      </h2>
                      <div className="order-shipping-address-wrap">
                        <h2 className="order-details-address-type">{capitalize(this.state.shippingAddress?.name)}</h2>
                        <p className="order-details-address-details">
                          {this.getAddressString()}
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="order-details-contact">
                        {content.phoneNumber}:
                        <span className="order-details-phone">{this.state.shippingAddress?.phone_number}</span>
                      </div>
                      <div className="order-cancel-wrap text-right">
                        {/* <Button
                        color="link order-cancel-btn px-0"
                        onClick={openCancelOrderModal}
                      >
                        Cancel this Order Item
                     </Button>*/}
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Container >
    );
  }
}
// @ts-ignore
export default withRouter(OrderDetails)
// Customizable Area Start

// Customizable Area End