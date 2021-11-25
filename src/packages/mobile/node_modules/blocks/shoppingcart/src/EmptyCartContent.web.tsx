import React from "react";
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
import { useHistory, useParams, Link } from "react-router-dom";
import Ripple from "react-ripples";
import {withRouter} from "react-router-dom"
import { emptyCart } from "./assets";
//@ts-ignore
import content from "../../../components/src/content.js"

  const EmptyCartContent:any=withRouter((props: any)=> {
  return (
    <>
      <section>
        <Container>
          {localStorage.removeItem("coupon")}
          
          <Row>
            <Col md={12}>
              <h1 className="cart-page-main-title mt-0 empty-main-ttl">Cart</h1>
            </Col>
          </Row>
          <div className="yt-empty-cart-wrap cart-pg-inner-wrap p-4 bg-white radius-10 cart-pg-mb-30 mt-5">
            <div className="cart-pg-empty-main-wrap text-center py-5">
              <img
                src={emptyCart}
                className="img-fluid"
                width="170"
                height="212"
              />
              <div className="cartno-wrap">
                <h2 className="empty-cartn-ttl mt-0">{content.cartEmpty}</h2>
                <p className="empty-cart-text mb-0">
                  {content.cartEmptyDescription}
                </p>
              </div>
              {/* <Ripple> */}
                <Button
                  className="primary-btn"
                   onClick={()=>{
                     //@ts-ignore
                     props.history.push("./Filteroptions")
                   }}
                
                >
                  {content.browseProducts}
                </Button>
              {/* </Ripple> */}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
})
 export default EmptyCartContent
