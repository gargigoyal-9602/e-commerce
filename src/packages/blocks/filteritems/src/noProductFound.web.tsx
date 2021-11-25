import React, { useState } from "react";

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
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import '../assets/css/noProductFound.css';

function PageLoadingBlock() {
//   const history = useHistory();
//   const routeToshop = () => {
//     let path = "/products";
//     history.push(path);
//   };
  return (
    <>
      <section className="w-100">
        <Container>
          <div className="trans-fl-pg-inner-wrap p-4 bg-white radius-10 trans-fl-pg-mb-80 mt-5">
            <div className="cart-pg-empty-main-wrap text-center py-5">
              <img
                //src={require("./images/disable_product_icon.png")}
                className="img-fluid yt-transaction-cl-icn"
                width="170"
                height="212"
              />
              <div className="trans-fl-wrap ">
                <h2 className="trans-fl-ttl my-3" style={{ color: "#43b7a7" }}>
                  Oh Noes!, No Products Found
                </h2>
                <p className="trans-fl-text mb-0">Try Releasing your filters.</p>
              </div>
              {/* <Button color="secondary trans-fl-btn py-3 px-5 mt-3" onClick={() => window.location.assign("/shop")}>
                Clear Filters
              </Button>
              <div className="mt-2" style={{ opacity: 0 }}>
                <Button color="link trans-fl-cancel-btn">
                  Cancel transaction?
                </Button>
              </div> */}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
export default PageLoadingBlock;
