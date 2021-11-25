// @ts-nocheck
import React, { createRef } from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import { Link } from "react-router-dom";
import ProductsFilterBar from "../../../components/src/productsfilterbar/index.js";
import Header from "../../../components/src/AppHeader/index";
import Footer from "../../../components/src/AppFooter/index";
import FilteroptionsList from "../src/FilteroptionsList.web";
import FilterProduct from "../src/FilterProduct.web";
//@ts-ignore
import content from "../../../components/src/content.js"

import "../assets/css/index.scoped.css";
import "../assets/css/pagination.css";

import FilteroptionsController, {
  Props
  //configJSON
} from "./FilteroptionsController.web";

export default class Filteroptions extends FilteroptionsController {
  // myRef: React.RefObject<any>;
  constructor(props: Props) {
    super(props);
    // this.myRef = React.createRef<any>();
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  showResponsiveFilter = () => {
    console.log("YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYyy")
  }
  // Customizable Area End

  // async componentDidMount() {
  //   // document.addEventListener('mousedown', this.ytmbFilterClose, false);
  // };

  render() {
    return (
      <div>
        <Container>
          <div className="pageroute">
            <Link to="/home-page">
              <span
                className="cart-pg-home w3-hover-opacity"
                style={{ cursor: 'default' }}
              >
                {content.home}
              </span>
            </Link>
            {' > '}
            <span className="currpage">{content.shop}</span>
          </div>
          {
            this.state.screebSize > 786 && this.state.screebSize < 1280 ? (
              <div className="filterpage1">
                <Row className="yt-cm-row">
                  <Col xs={12} sm={12} lg={12} className={this.state.YtMbFilter ? 'ytMbfilteropen' : 'yt-cm-lt-col '}>
                    <FilteroptionsList mbOpenState={this.state.YtMbFilter} cancel={this.ytmbFilter} />
                    <div
                      className="w3-overlay w3-show"
                      style={{ zIndex: -1, backgroundColor: 'transparent' }}
                      onClick={() => this.ytmbFilter()}
                    />
                  </Col>
                  <Col xs={12} lg={12} className="1yt-cm-rt-col">
                    <div className="d-flex flex-column justify-content-between h-100">
                      <div id="SingelnewProducts" >
                        <FilterProduct openFilter={this.ytmbFilter} />
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            ) : (
              <div className="filterpage1">
                <Row className="yt-cm-row">
                  <Col xs={12} sm={12} lg={3} className={this.state.YtMbFilter ? 'ytMbfilteropen' : 'yt-cm-lt-col '}>
                    <FilteroptionsList mbOpenState={this.state.YtMbFilter} cancel={this.ytmbFilter} />
                    <div
                      className="w3-overlay w3-show"
                      style={{ zIndex: -1, backgroundColor: 'transparent' }}
                      onClick={() => this.ytmbFilter()}
                    />
                  </Col>
                  <Col xs={12} lg={9} className="1yt-cm-rt-col">
                    <div className="d-flex flex-column justify-content-between h-100">
                      <div id="SingelnewProducts">
                        <FilterProduct openFilter={this.ytmbFilter} />
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            )
          }
        </Container>
      </div>
    );
  }
}
