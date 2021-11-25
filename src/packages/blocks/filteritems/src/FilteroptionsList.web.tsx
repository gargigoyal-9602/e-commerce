// @ts-nocheck
import React, { Fragment } from "react";
import {
  Row,
  Col,
  TabPane,
  NavItem,
  NavLink,
  TabContent,
  Button,
  Nav,
} from 'reactstrap';
import { AiOutlineSearch } from "react-icons/ai";
import { FaCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from 'react-icons/io';
import map from "lodash/map";
import InputRange from "react-input-range";
import '../assets/css/filteroption.css';
import '../assets/css/inputrange.css';
import { BsArrowReturnRight } from "react-icons/bs";
import FilteroptionsListController, {
  Props,
  configJSON
} from "./FilteroptionsListController.web";
import classnames from 'classnames';
//@ts-ignore
import capitalize from "lodash/capitalize";
// @ts-ignore
import content from "../../../components/src/content";
import MobileFilter from "../../../components/src/MobileFilter/MobileFilter";
import classNames from "classnames";
import { withRouter } from "react-router-dom";

class Filteroptions extends FilteroptionsListController {
  // myRef: React.RefObject<any>;
  constructor(props: Props) {
    super(props);
    this.state = {
      activeTab: "1",
      mobileOrTablet: false,
    };
    // this.myRef = React.createRef<any>();
    // this.handleFilterClickOutSide = this.handleFilterClickOutSide.bind(this);
  }

  onchange = (e) => {
    this.setState({ colorSearch: e.target.value.replace(/(^|\s)\S/g, l => l.toUpperCase()) });
  };

  toggle = (tab: any) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
    this.setState({ windowSize: window.innerWidth });
    window.addEventListener("resize", this.resizeWindow);
    // document.addEventListener('mousedown', this.handleFilterClickOutSide);
  }

  resizeWindow = () => {
    this.setState({ windowSize: window.innerWidth });
    if (window.innerWidth > 1280) {
      // this.props.cancel();
      this.setState({ mobileOrTablet: false });
    } else {
      this.setState({ mobileOrTablet: true });
    }
  }
  toggleDiscounted = (e: any) => {
    e.preventDefault();
    this.setState({
      isDiscountChecked: e.target.checked
    });
    this.toggleCheckBox(e.target.checked, 'discount');

  };
  toggleOutofstock = (e: any) => {
    e.preventDefault();
    console.log("DIscount Items Checked", e.target.checked);
    if (e.target.checked) {
      this.setState({
        isExcludeChecked: e.target.checked
      });
    }
    this.toggleCheckBox(e.target.checked, 'outOfStock');
  }

  render() {
    const tabsName = [
      { name: content.category, index: "1" },
      { name: content.brands, index: "2" },
      { name: content.color, index: "3" },
      { name: content.size, index: "4" },
      { name: content.tag, index: "5" },
      { name: content.price, index: "6" },
    ]
    let urlSearch = new URLSearchParams(window.location.search);

    // console.log(this.props, "windowsize");
    return (
      <div className="yt-product-filter-wrap1"
      // onMouseLeave={this.props?.closeFilter}
      // ref={this.myRef}
      >
        {this.state.mobileOrTablet && this.state.windowSize < 768 ? (
          this.props.mbOpenState &&
          <div className="mobile-filter">
            <Row>
              <Col xs="2" sm="2" md="2">
                <Nav tabs vertical className="mobile-nav">
                  {
                    map(tabsName, tab => (
                      <NavItem>
                        <NavLink
                          className={classnames("text-muted", { active: this.state.activeTab === tab.index })}
                          onClick={() => this.toggle(tab.index)}
                        >
                          <h4 className="bb-mbtab-filter-ttl">{tab.name}</h4>
                        </NavLink>
                      </NavItem>
                    ))
                  }
                </Nav>
              </Col>
              <Col xs="10" sm="10" md="10" style={{ padding: '13px 50px', left: 30 }}>
                <div className="yt-tab-filte-content-mb">
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <ul className="p-0 m-0 yt-ul-list-none">
                        {this.state.categoryList?.map((cat, index) => (
                          <Fragment>
                            <li
                              key={index}
                              className="pb-4 d-flex align-items-center"
                            >
                              <div className="yt-filter-checkbox-wrap mr-3">
                                <input
                                  type="checkbox"
                                  onChange={() => {
                                    this.toggleCheckBox(cat.id, "category")
                                    // runFilter();
                                  }}
                                  checked={cat.checked}
                                />
                                <label className="yt-filter-label" htmlFor={cat.name} />
                              </div>
                              <div className="yt-cat-name" style={cat.checked ? { color: "black" } : {}}>
                                {cat.attributes.name} {cat.checked}
                                {/* {cat.quantity ? " (" + cat.quantity + ")" : ""} */}
                              </div>

                            </li>
                            {cat.checked && cat?.sub_categories?.map((subcat, index) => (
                              <li
                                key={index}
                                className="pb-4 d-flex align-items-center"
                              >
                                <div className="yt-filter-checkbox-wrap mr-3">
                                  <input
                                    type="checkbox"
                                    onChange={(e) => {
                                      this.toggleCheckBox(cat.id, "category");
                                      this.toggleCheckBox(String(subcat.id), "sub_category")
                                    }}
                                    name={subcat.name + index}
                                    checked={subcat.checked}
                                  />
                                  <label className="yt-filter-label" htmlFor={subcat.name + index} />
                                </div>
                                <div className="yt-cat-name">
                                  <BsArrowReturnRight />
                                  {subcat.name} {subcat.checked}
                                  {/* {cat.quantity ? " (" + cat.quantity + ")" : ""} */}
                                </div>
                              </li>
                            ))}
                          </Fragment>
                        ))}
                      </ul>
                    </TabPane>
                    <TabPane tabId="2">
                      <ul className="p-0 m-0 yt-ul-list-none">
                        {this.state.brandList?.map((cat, index) => (
                          <li
                            key={index}
                            className="pb-4 d-flex align-items-center"
                          >
                            <div className="yt-filter-checkbox-wrap mr-3">
                              <input
                                type="checkbox"
                                onChange={() => this.toggleCheckBox(cat.id, "brand")}
                                checked={cat.checked}
                              />
                              <label className="yt-filter-label" htmlFor={cat.attributes.name} />
                            </div>
                            <div className="yt-cat-name">
                              {cat.attributes.name}
                              {/* {cat.quantity ? " (" + cat.quantity + ")" : ""} */}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </TabPane>
                    {/* Colors */}
                    <TabPane tabId="3">
                      {this.state.colorList?.length > 0 && (
                        <Fragment>
                          <div className={classnames("p-4", { "yt-filter-inner-wrap": this.state.windowSize > 768 })}>
                            <div className="yt-filter-search-wrap pb-2 mb-3">
                              <AiOutlineSearch className="yt-search-icn" />
                              <input
                                type="text"
                                placeholder="Search Color"
                                className="yt-color-search-bar d-block py-3"
                                value={this.state.colorSearch}
                                onChange={this.onchange}
                              />
                            </div>
                            <ul className="p-0 m-0 yt-ul-list-none">
                              {this.state.colorList.map((color, index) => (this.state.colorSearch === "" ? true : (color.attributes.name.search(this.state.colorSearch) > -1)) && (
                                <li
                                  key={index}
                                  className={classnames(`pb-4 d-flex align-items-center`, { 'justify-content-between': this.state.windowSize > 768 })}
                                // className="pb-4 d-flex align-items-center justify-content-between"
                                >
                                  <span>
                                    <div className={"pr-2 d-flex align-items-center"}>
                                      <FaCircle color={typeof color.attributes.name === "string" ? color.attributes.name.split(" ").join("") : color.attributes.name} style={color.attributes.name.toLowerCase() === "white" ? { borderWidth: "1px", borderColor: "silver", borderStyle: "solid", borderRadius: "50%" } : {}} />
                                      <span className="ml-3 ">{color.attributes.name}</span>
                                    </div>
                                  </span>
                                  <div className={classNames("yt-filter-checkbox-wrap", { "ml-3": this.state.windowSize < 768 })}>
                                    <input
                                      name={color.attributes.name + index}
                                      type="checkbox"
                                      onChange={() => this.toggleCheckBox(color.id, "color")}
                                      checked={color.checked}

                                    />
                                    <label className="yt-filter-label" htmlFor={color.attributes.name + index} />
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <span className="yt-filter-divider" />
                        </Fragment>
                      )}
                    </TabPane>
                    {/* Sizes */}
                    <TabPane tabId="4">
                      {this.state.sizesList?.length > 0 && (
                        <Fragment>
                          <div className={classnames("p-4", { "yt-filter-inner-wrap": this.state.windowSize > 768 })}>
                            <ul className="p-0 m-0 yt-ul-list-none">
                              {this.state.sizesList?.map((cat, index) => (
                                <li
                                  key={index}
                                  className="pb-4 d-flex align-items-center justify-content-between"
                                >
                                  <div className="yt-cat-name">
                                    {cat.attributes.name}
                                  </div>
                                  <div className="yt-filter-checkbox-wrap">
                                    <input
                                      type="checkbox"
                                      onChange={() => this.toggleCheckBox(cat.id, "size")}
                                      checked={cat.checked}
                                    />
                                    <label className="yt-filter-label" htmlFor={cat.attributes.name} />
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <span className="yt-filter-divider" />
                        </Fragment>
                      )}
                    </TabPane>
                    {/* Tags */}
                    <TabPane tabId="5">
                      {this.state.tagsList?.length > 0 && (
                        <Fragment>
                          <div className={classnames("p-4", { "yt-filter-inner-wrap": this.state.windowSize > 768 })}>
                            <ul className="p-0 m-0 yt-ul-list-none">
                              {this.state.tagsList?.map((cat, index) => (
                                <li
                                  key={index}
                                  className="pb-4 d-flex align-items-center justify-content-between"
                                >
                                  <div className="yt-cat-name">
                                    {cat.attributes.name}
                                  </div>
                                  <div className="yt-filter-checkbox-wrap">
                                    <input
                                      type="checkbox"
                                      onChange={() => this.toggleCheckBox(cat.id, "tag")}
                                      checked={cat.checked}
                                    />
                                    <label className="yt-filter-label" htmlFor={cat.attributes.name} />
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <span className="yt-filter-divider" />
                        </Fragment>
                      )}
                    </TabPane>
                    {/* Price Range */}
                    <TabPane tabId="6">
                      <Row>
                        <Col md={4} lg={12}>
                          <div className="yt-filter-inner-wrap p-4 yt-price-filter-wrap" style={{ maxWidth: '80%' }}>
                            <div className="d-flex align-items-center justify-content-between mb-2">
                              <span className="yt-min-price">
                                {/* @ts-ignore */}
                                <IoIosArrowRoundDown /> {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {this.state?.value?.min}
                                {/* {configJSON.currency} 0 */}
                              </span>
                              <span className="yt-max-price">
                                {/* @ts-ignore */}
                                <IoIosArrowRoundUp /> {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {this.state?.value?.max}
                                {/* {configJSON.currency} 10000 */}
                              </span>
                            </div>
                            <InputRange
                              maxValue={this.state?.maxPrice}
                              minValue={this.state?.minPrice}
                              // minValue={0}
                              step={20}
                              value={this.state.value}
                              onChange={(value) => this.setState({ value: value })}
                              onChangeComplete={(value) => this.toggleCheckBox(value, "price")}
                            />
                            <div style={{ display: 'grid', marginLeft: '2%' }}>
                              <input type='number' placeholder='Minimum' value={this.state?.givenMinValue}
                                title={'Enter Minimum Value'}
                                style={{ marginBottom: '10px', marginTop: '15px', width: '70%' }}
                                onChange={(e) => {
                                  console.log("User Given Min Value", e.target.value);
                                  if (e.target.value > 0) {
                                    this.setState({
                                      givenMinValue: e.target.value,
                                      isGivenRangeSlected: true
                                    });
                                  }
                                }}
                              />
                              <input type='number' placeholder='Maximum' value={this.state?.givenMaxValue}
                                title={'Enter Maximum Value'}
                                style={{ marginBottom: '10px', marginTop: '10px', width: '70%' }}
                                onChange={(e) => {
                                  console.log('User Given Max Value', e.target.value);
                                  if (e.target.value > 0 && e.target.value !== this.state.givenMinValue) {
                                    this.setState({
                                      givenMaxValue: e.target.value,
                                      isGivenRangeSlected: true
                                    });
                                  }
                                  if (e.target.value == this.state.givenMinValue) {
                                    //@ts-ignore
                                    window.notify([{ type: 'error', message: 'Minimum and Maximum should not be same!' }])
                                  }
                                }} />
                              <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <Button disabled={!this.state?.isGivenRangeSlected ? true : false}
                                  title={"Apply"} color='link'
                                  style={{ background: 'none', border: 'none', color: 'black' }}
                                  onClick={() => {
                                    const dat = {
                                      min: this.state?.givenMinValue && this.state?.givenMinValue,
                                      max: this.state?.givenMaxValue && this.state?.givenMaxValue > 0 ? this.state?.givenMaxValue : this.state.maxPrice
                                    };
                                    this.setState({
                                      value: dat
                                    });
                                    setTimeout(() => {
                                      this.toggleCheckBox(dat, "price")
                                    }, 300);
                                  }}> <FaCheckCircle /> </Button>
                                <Button style={{ background: 'none', border: 'none', color: 'black' }} title={"Clear"}
                                  color='link' onClick={() => {
                                    const dat = {
                                      min: 0,
                                      max: this.state?.maxPrice
                                    }
                                    this.setState({
                                      givenMaxValue: '',
                                      givenMinValue: '',
                                      value: dat
                                    });
                                    // setTimeout(() => {
                                    //   this.toggleCheckBox(dat, "price")
                                    // }, 1000);

                                  }}> <FaTimesCircle /> </Button>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col md={8} lg={12} className="">
                          <div
                            // className="yt-filter-inner-wrap p-4 yt-discount-wrapper"
                            className={classnames("p-4 yt-discount-wrapper", { "yt-filter-inner-wrap": this.state.windowSize > 768 })}
                          >
                            <ul className="p-0 mb-0 mt-4 yt-ul-list-none">
                              <li
                                className="pb-4 d-flex align-items-center justify-content-between"
                              >
                                <div className="yt-size-name yt-color-black">Discounted Items</div>
                                <div className="yt-filter-checkbox-wrap">
                                  <input
                                    name="discheck"
                                    type="checkbox"
                                    onChange={(e) => {
                                      this.toggleDiscounted(e);
                                    }}
                                    checked={this.state?.isDiscountChecked}
                                  />
                                  <label className="yt-filter-label" htmlFor={"discheck"} />
                                </div>
                              </li>
                              {/* <li
                                className="pb-4 d-flex align-items-center justify-content-between"
                              >
                                <div className="yt-size-name yt-color-black">Exclude OutofStock</div>
                                <div className="yt-filter-checkbox-wrap">
                                  <input
                                    name="discheck"
                                    type="checkbox"
                                    onChange={(e) => {
                                      this.toggleOutofstock(e);
                                    }}
                                    checked={this.state?.isExcludeChecked}
                                  />
                                  <label className="yt-filter-label" htmlFor={"discheck"} />
                                </div>
                              </li> */}
                            </ul>
                          </div>
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </div>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col md={12}>
                <div class="d-flex yt-mb-filter-apply mt-5" data-v-fb08616c="">
                  <button type="button" className="btn btn-secondary yt-filte-btn-mb yt-filter-cancel" style={{ marginRight: 5 }} onClick={this.props.cancel}>Cancel</button>
                  <button type="button" onClick={this.props.cancel} className="btn btn-secondary yt-filte-btn-mb yt-filter-apply">Apply</button>
                </div>
              </Col>
            </Row>
          </div>
        )
          :
          ((this.state.windowSize >= 1280 || this.props.mbOpenState) &&
            <Fragment>
              <h2 className="yt-filter-title mt-0 mb-3">Filter</h2>
              <div className='filter-close' onClick={this.props?.cancel}>
                <img src={require('../assets/images/close-icn.png')} alt='' />
              </div>
              <div className="yt-main-filter-box bg-white radius-10">
                {/* {urlSearch.get("[newArrivals]") && (
                  urlSearch.delete("[newArrivals]"),
                  this.props.history.push(`/Filteroptions?${decodeURIComponent(urlSearch.toString())}`)
                )} */}
                {this.state.categoryList?.length > 0 &&
                  <Fragment>
                    <div className="yt-filter-inner-wrap p-4">
                      <h4 className="yt-box-title mt-0">{content.category}</h4>

                      <ul className="p-0 m-0 yt-ul-list-none">
                        {this.state.categoryList?.map((cat, index) => (
                          <Fragment key={index}>
                            <li
                              key={index}
                              className={classNames("pb-4 d-flex align-items-center", { "justify-content-between": this.state.windowSize >= 1280 })}
                            >
                              <div className={classNames("yt-cat-name", { "mr-3": this.state.windowSize < 1280 })} style={cat.checked ? { color: "black" } : {}}>
                                {cat.attributes.name} {cat.checked}
                                {/* {cat.quantity ? " (" + cat.quantity + ")" : ""} */}

                              </div>
                              <div className="yt-filter-checkbox-wrap">
                                <input
                                  type="checkbox"
                                  onChange={() => {
                                    this.toggleCheckBox(cat.id, "category")
                                    // runFilter();
                                  }}
                                  checked={cat.checked}
                                />
                                <label className="yt-filter-label" htmlFor={cat.name} />
                              </div>
                            </li>
                            {cat.checked && cat?.attributes.sub_categories?.map((subcat, index) => (
                              <li
                                key={index}
                                // className="pb-4 d-flex align-items-center justify-content-between"
                                className={classNames("pb-4 d-flex align-items-center", { "justify-content-between": this.state.windowSize >= 1280 })}
                              >
                                <div className={classNames("yt-cat-name", { "mr-3": this.state.windowSize < 1280 })}>
                                  <BsArrowReturnRight />
                                  {subcat.name} {subcat.checked}

                                  {/* {cat.quantity ? " (" + cat.quantity + ")" : ""} */}
                                </div>
                                <div className="yt-filter-checkbox-wrap">
                                  <input
                                    type="checkbox"

                                    onChange={(e) => {
                                      this.toggleCheckBox(String(subcat.id), "sub_category")
                                    }}
                                    name={subcat.name + index}
                                    checked={subcat.checked}
                                  //checked={qparams.getAll("sub_category_id[]")?.includes(String(subcat.id))}
                                  />
                                  <label className="yt-filter-label" htmlFor={subcat.name + index} />
                                </div>
                              </li>
                            ))}
                          </Fragment>
                        ))}
                      </ul>

                    </div>
                    <span className="yt-filter-divider" />
                  </Fragment>}

                {this.state.brandList?.length > 0 && (
                  <Fragment>
                    <div className="yt-filter-inner-wrap p-4">
                      <h4 className="yt-box-title mt-0">{content.brand}</h4>
                      <ul className="p-0 m-0 yt-ul-list-none">
                        {this.state.brandList?.map((cat, index) => (
                          <li
                            key={index}
                            // className="pb-4 d-flex align-items-center justify-content-between"
                            className={classNames("pb-4 d-flex align-items-center", { "justify-content-between": this.state.windowSize >= 1280 })}
                          >
                            <div className={classNames("yt-cat-name", { "mr-3": this.state.windowSize < 1280 })}>
                              {cat.attributes.name}
                              {/* {cat.quantity ? " (" + cat.quantity + ")" : ""} */}
                            </div>
                            <div className="yt-filter-checkbox-wrap">
                              <input
                                type="checkbox"
                                onChange={() => this.toggleCheckBox(cat.id, "brand")}
                                checked={cat.checked}
                              />
                              <label className="yt-filter-label" htmlFor={cat.attributes.name} />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <span className="yt-filter-divider" />
                  </Fragment>
                )}

                {this.state.colorList?.length > 0 && (
                  <Fragment>
                    <div className="yt-filter-inner-wrap p-4">
                      <h4 className="yt-box-title mt-0">{content.color}</h4>
                      <div className="yt-filter-search-wrap pb-2 mb-3">
                        <AiOutlineSearch className="yt-search-icn" />
                        <input
                          type="text"
                          placeholder="Search Color"
                          className="yt-color-search-bar d-block py-3"
                          value={this.state.colorSearch}
                          onChange={this.onchange}
                        />
                      </div>
                      <ul className="p-0 m-0 yt-ul-list-none">
                        {this.state.colorList.map((color, index) => (this.state.colorSearch === "" ? true : (color.attributes.name.search(this.state.colorSearch) > -1)) && (
                          <li
                            key={index}
                            // className="pb-4 d-flex align-items-center justify-content-between"
                            className={classNames("pb-4 d-flex align-items-center", { "justify-content-between": this.state.windowSize >= 1280 })}
                          >
                            <span>
                              <div className={classNames("pr-2 d-flex align-items-center", { "mr-3": this.state.windowSize < 1280 })}>
                                <FaCircle color={typeof color.attributes.name === "string" ? color.attributes.name.split(" ").join("") : color.attributes.name} style={color.attributes.name.toLowerCase() === "white" ? { borderWidth: "1px", borderColor: "silver", borderStyle: "solid", borderRadius: "50%" } : {}} />
                                <span className="ml-3">{color.attributes.name}</span>
                              </div>
                            </span>
                            <div className="yt-filter-checkbox-wrap">
                              <input
                                name={color.attributes.name + index}
                                type="checkbox"
                                onChange={() =>
                                  this.toggleCheckBox(color.id, "color")
                                }
                                checked={color.checked}
                              />
                              <label className="yt-filter-label" htmlFor={color.attributes.name + index} />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <span className="yt-filter-divider" />
                  </Fragment>
                )}

                {this.state.sizesList?.length > 0 && (
                  <Fragment>
                    <div className="yt-filter-inner-wrap p-4">
                      <h4 className="yt-box-title mt-0">{content.size}</h4>
                      <ul className="p-0 m-0 yt-ul-list-none">
                        {this.state.sizesList?.map((cat, index) => (
                          <li
                            key={index}
                            // className="pb-4 d-flex align-items-center justify-content-between"
                            className={classNames("pb-4 d-flex align-items-center", { "justify-content-between": this.state.windowSize >= 1280 })}
                          >
                            <div className={classNames("yt-cat-name", { "mr-3": this.state.windowSize < 1280 })}>
                              {cat.attributes.name}
                            </div>
                            <div className="yt-filter-checkbox-wrap">
                              <input
                                type="checkbox"
                                onChange={() => this.toggleCheckBox(cat.id, "size")}
                                checked={cat.checked}
                              />
                              <label className="yt-filter-label" htmlFor={cat.attributes.name} />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <span className="yt-filter-divider" />
                  </Fragment>
                )}

                {this.state.tagsList?.length > 0 && (
                  <Fragment>
                    <div className="yt-filter-inner-wrap p-4">
                      <h4 className="yt-box-title mt-0">{content.tag}</h4>
                      <ul className="p-0 m-0 yt-ul-list-none">
                        {this.state.tagsList?.map((cat, index) => (
                          <li
                            key={index}
                            // className="pb-4 d-flex align-items-center justify-content-between"
                            className={classNames("pb-4 d-flex align-items-center", { "justify-content-between": this.state.windowSize >= 1280 })}
                          >
                            <div className={classNames("yt-cat-name", { "mr-3": this.state.windowSize < 1280 })}>
                              {cat.attributes.name}
                            </div>
                            <div className="yt-filter-checkbox-wrap">
                              <input
                                type="checkbox"
                                onChange={() => this.toggleCheckBox(cat.id, "tag")}
                                checked={cat.checked}
                              />
                              <label className="yt-filter-label" htmlFor={cat.attributes.name} />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <span className="yt-filter-divider" />
                  </Fragment>
                )}
                <Row>
                  <Col md={4} lg={12}>
                    <div className="yt-filter-inner-wrap p-4 yt-price-filter-wrap">
                      <h4 className="yt-box-title mt-0">{content.price}</h4>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className="yt-min-price">
                          {/* @ts-ignore */}
                          <IoIosArrowRoundDown /> {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {this.state?.value?.min}
                          {/* {configJSON.currency} 0 */}
                        </span>
                        <span className="yt-max-price">
                          {/* @ts-ignore */}
                          <IoIosArrowRoundUp /> {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {this.state?.value?.max}
                          {/* {configJSON.currency} 10000 */}
                        </span>
                      </div>
                      <InputRange
                        maxValue={this.state?.maxPrice}
                        minValue={this.state?.minPrice}
                        // minValue={0}
                        step={20}
                        value={this.state.value}
                        onChange={(value) => {
                          // debugger
                          this.setState({ value: value });
                          // console.log(this.state?.value)
                        }}
                        onChangeComplete={(value) => this.toggleCheckBox(value, "price")}
                      />
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <input type='number' placeholder='Minimum' value={this.state?.givenMinValue}
                          title={'Enter Minimum Value'}
                          style={{ marginBottom: '10px', marginTop: '10px', width: '35%' }}
                          onChange={(e) => {
                            console.log("User Given Min Value", e.target.value);
                            if (e.target.value > 0) {
                              this.setState({
                                givenMinValue: e.target.value,
                                isGivenRangeSlected: true
                              });
                            }
                          }}
                        />
                        <input type='number' placeholder='Maximum' value={this.state?.givenMaxValue}
                          title={'Enter Maximum Value'}
                          style={{ marginBottom: '10px', marginTop: '10px', marginLeft: '1.6%', width: '35%' }}
                          onChange={(e) => {
                            console.log('User Given Max Value', e.target.value);
                            if (e.target.value > 0 && e.target.value !== this.state.givenMinValue) {
                              this.setState({
                                givenMaxValue: e.target.value,
                                isGivenRangeSlected: true
                              });
                            }
                            if (e.target.value == this.state.givenMinValue) {
                              //@ts-ignore
                              window.notify([{ type: 'error', message: 'Minimum and Maximum should not be same!' }])
                            }
                          }} />
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <Button disabled={!this.state?.isGivenRangeSlected ? true : false}
                            title={"Apply"} color='link'
                            style={{ background: 'none', border: 'none', color: 'black' }}
                            onClick={() => {
                              const dat = {
                                min: this.state?.givenMinValue && this.state?.givenMinValue,
                                max: this.state?.givenMaxValue && this.state?.givenMaxValue > 0 ? this.state?.givenMaxValue : this.state.maxPrice
                              };
                              this.setState({
                                value: dat
                              });
                              setTimeout(() => {
                                this.toggleCheckBox(dat, "price")
                              }, 300);
                            }}> <FaCheckCircle /> </Button>
                          <Button style={{ background: 'none', border: 'none', color: 'black' }} title={"Clear"}
                            color='link' onClick={() => {
                              const dat = {
                                min: 0,
                                max: this.state?.maxPrice
                              }
                              this.setState({
                                givenMaxValue: '',
                                givenMinValue: '',
                                value: dat
                              });
                              setTimeout(() => {
                                this.toggleCheckBox(dat, "price")
                              }, 300);
                            }}> <FaTimesCircle /> </Button>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={8} lg={12} className="">
                    <div className="yt-filter-inner-wrap p-4 yt-discount-wrapper">
                      <ul className="p-0 mb-0 mt-4 yt-ul-list-none">
                        <li
                          // className="pb-4 d-flex align-items-center justify-content-between"
                          className={classNames("pb-4 d-flex align-items-center", { "justify-content-between": this.state.windowSize > 1280 })}
                        >
                          <div className={classNames("yt-size-name yt-color-black", { "mr-3": this.state.windowSize < 1280 })}>Discounted Items</div>
                          <div className="yt-filter-checkbox-wrap">
                            <input
                              name="discheck"
                              type="checkbox"
                              onChange={(e) => {
                                this.toggleDiscounted(e);
                              }}
                              checked={this.state?.isDiscountChecked}
                            />
                            <label className="yt-filter-label" htmlFor={"discheck"} />
                          </div>
                        </li>
                        {/* <li
                          // className="pb-4 d-flex align-items-center justify-content-between"
                          className={classNames("pb-4 d-flex align-items-center", { "justify-content-between": this.state.windowSize > 1280 })}
                        >
                          <div className={classNames("yt-size-name yt-color-black", { "mr-3": this.state.windowSize < 1280 })}>Exclude OutofStock</div>
                          <div className="yt-filter-checkbox-wrap">
                            <input
                              name="discheck"
                              type="checkbox"
                              onChange={(e) => {
                                this.toggleOutofstock(e);
                              }}
                              checked={this.state?.isExcludeChecked}
                            />
                            <label className="yt-filter-label" htmlFor={"discheck"} />
                          </div>
                        </li> */}
                      </ul>
                    </div>
                  </Col>
                </Row>

              </div>
            </Fragment>
          )
        }
      </div >
    );
  }
}

export default withRouter(Filteroptions);