import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// @ts-ignore
import capitalize from "lodash/capitalize";
// @ts-ignore
import isEmpty from "lodash/isEmpty";
// @ts-ignore
import content from "../../../components/src/content";
import '../assets/styles/single-order.scoped.css';
import SingleOrdersController, { Props } from "./SingleOrdersController.web";
import CancelModal from "../../profilebio/src/Modal.web";
import ProductReviewModal from "./ProductRating.web";
// Customizable Area End


class SingleOrders extends SingleOrdersController {
    constructor(props: Props) {
        super(props);
    }

    render() {
        if (isEmpty(this.props.order)) return null;
        return (
            <>
                {/* @ts-ignore */}
                <ProductReviewModal
                    reviewData={{}}
                    isOpen={this.state.ShowPRModal}
                    toggle={() => this.openProductRatingModal()}
                    onSuccess={this.writeReview}
                />
                <div className="profile-pg-inner-wrap bg-white radius-10 mb-4 yt-my-order-wrap yt-cc-ord">
                    <div className="profile-pg-inner-wrapper">
                        {this.state.ShowCOModal && (
                            // @ts-ignore
                            // <CancelModal confirm={this.confirmCancelOrder}
                            //   toggle={this.toggleCancelModal}
                            //   headerMessage="Cancel Order"
                            //   bodyMessage="Are you sure you want to cancel order ?"
                            // />

                            <Modal
                                modalClassName="popopop"
                                className="cm-small-modal-4"
                                isOpen={this.state.ShowCOModal}
                                toggle={() => this.toggleCancelModal()}
                                centered={true}
                            >
                                <ModalHeader
                                    toggle={() => this.toggleCancelModal()}
                                    className="log-out-title-bar  border-0"
                                >
                                    <span>{content.cancelOrder}</span>
                                </ModalHeader>
                                <ModalBody className="yt-log-body-wrap">
                                    <div className='text-center log-out-body-text'>
                                        {content.areYouSureCancelOrder}
                                    </div>
                                </ModalBody>
                                <ModalFooter className="log-out-bottom-bar p-1 d-flex justify-content-between">
                                    <Button color="secondary pp-log-out-btn-modal p-3 pp-log-out-btn-light-grey"
                                        onClick={() => this.toggleCancelModal()}>{content.cancel}</Button>
                                    <span className="yt-form-spacer" />
                                    <Button color="secondary pp-log-out-btn-modal p-3 pp-log-out-btn-dark-grey"
                                        onClick={this.confirmCancelOrder}>{content.yesConfirm}</Button>
                                </ModalFooter>
                            </Modal>
                        )}
                        {/* {this.state.ShowCOModal ? <AllModal modalName="CancelOrder" order={currentOrder} getOrders={props.getOrders} /> : ""} */}
                        {/* <AllModal modalName="Productrate" reviewData={reviewData} isOpen={ShowPRModal} toggle={() => pRsettt(!ShowPRModal)} onSuccess={() => { history.replace("/profile/myorder"); props.getOrders(); }} /> */}
                        <div className="d-flex flex-wrap align-items-center justify-content-between yt-my-order-tdet-wrap">
                            <div className="d-flex align-items-center flex-wrap profile-mo-dt-wrap">
                                <div className="order-number-wrap">
                                    <span className="order-tag">
                                        {content.orderNumber} : </span>
                                    <span className="order-tag-val">{this.props.order.attributes.order_number}</span>
                                </div>
                                <div className="order-bdr-between" />
                                <div className="order-date-wrap">
                                    <span className="order-tag">{content.orderedOn} :</span>
                                    <span className="order-tag-val">{this.props.order.attributes.order_date}</span>
                                </div>
                            </div>
                        </div>
                        {
                            this.props.order.attributes.order_items.map((item: any, index: any) => {
                                const orderDataLength = this.props.order?.attributes?.order_items.length;
                                console.log(orderDataLength, "============ this.props.order.attributes.is_review_present ============", item)
                                return (
                                    <Fragment key={index}>
                                        <div key={index} className={(index >= 1) ? "py-3 d-flex align-items-center yt-order-wrapper-box w3-ripple  yt-border-order" : "py-3 d-flex align-items-center yt-order-wrapper-box "} >
                                            <div className="order-review text-right">
                                                {/*order.is_review_present && typeof order.reviews === "object" ?
                <Button
                  color="link order-write-review"
                  onClick={openProductRatingModal}
                  className="d-none"
                >
                  Edit Review
                </Button>
                :
                <Button
                  color="link order-write-review"
                  onClick={openProductRatingModal}
                >
                  Write a Review
                </Button>
                */}

                                                {/* {!this.props.order.attributes.is_review_present && ["delivered", "returned"].includes(this.props.order.attributes?.status?.toLowerCase()) &&
                        <Button
                          color="link order-write-review"
                          onClick={() => this.setProductAndOpenPM(item)}
                        >
                          Write a Review
                        </Button>
                      } */}
                                            </div>
                                            <div
                                                className="od-product-img p-1 w3-ripple"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => this.routeToOrderDetails(this.props.order.attributes, item)}
                                            >

                                                {console.log(`item-${index}`, item.product_variant)}
                                                <img
                                                    src={item.attributes && item.attributes.catalogue_variant &&
                                                        item.attributes.catalogue_variant.attributes
                                                        && item.attributes.catalogue_variant.attributes.images
                                                        && item.attributes.catalogue_variant.attributes.images.data && item.attributes.catalogue_variant.attributes.images.data.length > 0 ? item.attributes.catalogue_variant.attributes.images.data[0].attributes.url : item.product_image}
                                                    className="img-fluid"
                                                />
                                            </div>

                                            <div className="d-flex align-items-center">
                                                <div className="order-product-info">
                                                    <h2
                                                        className="pp-order-product-ttl mt-0 w3-ripple"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => this.routeToOrderDetails(this.props.order.attributes, item)}
                                                    >
                                                        {item.attributes.product_name}
                                                    </h2>
                                                    <div className="order-prodict-type-container">
                                                        {item.attributes?.catalogue_variant?.attributes?.product_variant_properties ? <Table className="mb-0 order-prodict-type d-block" borderless>
                                                            <thead>
                                                                <tr>
                                                                    {item.attributes?.catalogue_variant?.attributes?.product_variant_properties.map((value: any, index: number) => (<th key={index}>{value.variant_name?.toUpperCase()}</th>))}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    {item.attributes?.catalogue_variant?.attributes?.product_variant_properties.map((value: any, index: number) => (<td key={index}>{value.property_name}</td>))}
                                                                </tr>
                                                            </tbody>
                                                        </Table> : <div></div>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="order-product-quanity text-center text-sm-right">
                                                <ul className="p-0 order-ul-list-none m-0 yt-qt-prc d-flex flex-wrap">
                                                    <li className="op-order-quantity mb-3">
                                                        {content.quantity}:
                                                        <span className="ord-product-quantity">{item?.attributes?.quantity}</span>
                                                    </li>
                                                    <li className="op-order-product-price align-self-end">
                                                        <span className="order-product-price">
                                                            {/* @ts-ignore  */}
                                                            {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {parseFloat(item?.attributes?.unit_price || 0).toFixed(2)}
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        {/* {orderDataLength - 1 == index ? */}
                                        <div className="text-right">
                                            <span style={{ color: "var(--color-green)", fontSize: "28px", verticalAlign: "middle" }}>&#8226;</span> {capitalize(item?.attributes?.status)}
                                        </div>
                                        {/* : ''} */}
                                        {orderDataLength - 1 == index ? <div className='op-order-product-total-price align-self-end'>
                                            <span className="order-product-total-price">
                                                {content.TotalAmount} : {' '}
                                                {/* @ts-ignore */}
                                                {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {parseFloat(this.props?.order?.attributes?.total).toFixed(2)}
                                            </span>
                                        </div> : ''}
                                        <div className="w3-border my-3"></div>
                                        {orderDataLength - 1 == index ?
                                            (
                                                !item.attributes.is_review_present && ["delivered", "returned"].includes(this.props.order.attributes?.status?.toLowerCase()) ? (
                                                    <div className="d-flex justify-content-between">
                                                        <Button
                                                            color="link order-write-review"
                                                            onClick={() => this.setProductAndOpenPM(item)}
                                                        >
                                                            {content.writeAReview}
                                                        </Button>
                                                        {console.log(this.props.order.attributes.statusn, "this.props.order.attributes.status")}
                                                        {
                                                            this.props.order.attributes.status != "cancelled" && <Button
                                                                color="link od-cancel-btn"
                                                                onClick={["placed", "confirmed"].includes(this.props.order.attributes.status.toLowerCase()) ? () => this.openCancelOrderModal(this.props.order.attributes, item) : undefined}
                                                                style={["placed", "confirmed"].includes(this.props.order.attributes.status.toLowerCase()) ? {} : { textDecoration: "none", cursor: "default" }}
                                                            >
                                                                {["placed", "confirmed"].includes(this.props.order.attributes.status.toLowerCase()) ?
                                                                    <span style={{ color: "#e65e52" }}>
                                                                        {content.cancelOrder}
                                                                    </span>
                                                                    : ''
                                                                    //capitalize(this.props.order.attributes.status)
                                                                }
                                                            </Button>
                                                        }</div>
                                                ) : (
                                                    <>
                                                        {this.props.order.attributes.status != "cancelled" && (orderDataLength - 1 == index ? <div className="text-right">
                                                            <Button
                                                                color="link od-cancel-btn"
                                                                onClick={["placed", "confirmed"].includes(this.props.order.attributes.status.toLowerCase()) ? () => this.openCancelOrderModal(this.props.order.attributes, item) : undefined}
                                                                style={["placed", "confirmed"].includes(this.props.order.attributes.status.toLowerCase()) ? {} : { textDecoration: "none", cursor: "default" }}
                                                            >
                                                                {["placed", "confirmed"].includes(this.props.order.attributes.status.toLowerCase()) ?
                                                                    <span style={{ color: "#e65e52" }}>
                                                                        {content.cancelOrder}
                                                                    </span>
                                                                    : ''
                                                                    // capitalize(this.props.order.attributes.status)
                                                                }
                                                            </Button>
                                                        </div> : '')}
                                                    </>
                                                )
                                            ) : ''}
                                    </Fragment>
                                )
                            })}
                    </div>
                    {/* {orderlang.get("writeAReview", "Write a Review")} */}
                </div >
            </>
        )
    }
}
// @ts-ignore
export default withRouter(SingleOrders)
// Customizable Area Start

// Customizable Area End