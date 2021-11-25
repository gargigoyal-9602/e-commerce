// @ts-nocheck
import React, { Fragment } from "react";
// Customizable Area Start
import {
  Row,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Button, Spinner
} from 'reactstrap';
// import ReactPaginate from "react-paginate";
import { BsFilterLeft, BsFunnel, BsFillGrid3X3GapFill } from 'react-icons/bs';
import { BiSort } from 'react-icons/bi';
import { IoIosStar } from 'react-icons/io';
import { RiCloseLine } from 'react-icons/ri';
import { withRouter } from "react-router-dom";

//@ts-ignore
import content from "../../../components/src/content.js"
import Loader from "../../../components/src/Loader.web";
// Customizable Area End
import FilterProductController, { Props } from "./FilterProductController.web";
export const configJSON = require("./config");
import ProductListCard from "../../../components/src/productcard/productListCard";
import PageLoadingBlock from "./noProductFound.web"
import '../assets/css/index.scoped.css';


class FilterProduct extends FilterProductController {
  constructor(props: Props) {
    super(props);
  }

  toggle = (event) => {
    localStorage.removeItem("newest")
    this.setState({
      //filterProducList:[],
      dropdownOpen: !this.state.dropdownOpen,
      value: event.currentTarget.textContent ? event.currentTarget.textContent : this.state.value
    });
  }



  loadMore = () => {
    this.setState((prev) => {
      return { page: prev.page + 1, per_page: this.state.per_page };
    }, () => this.getProductList());
  }


  addSortBy = (order) => {
    let urlSearch = new URLSearchParams(window.location.search);
    urlSearch.delete("sort[order_by]");
    urlSearch.delete("sort[direction]");
    localStorage.removeItem("newest")
    if (order == '0') {
      this.setState({ order_by: "", sort_by: "", filterProducList: [] })
    } if (order == '1') {
      //low to high
      this.setState({ order_by: "price", sort_by: "asc", filterProducList: [] })
    } if (order == '2') {
      //high to low
      this.setState({ order_by: "price", sort_by: "desc", filterProducList: [] })
    } if (order == '3') {
      this.setState({ order_by: "sold", sort_by: "desc", filterProducList: [] })
    } if (order == '4') {
      this.setState({ order_by: "created_at", sort_by: "desc", filterProducList: [] })
    } if (order == '5') {
      this.setState({ order_by: "recommended", sort_by: "desc", filterProducList: [] })
    }

    setTimeout(() => {
      urlSearch.append("sort[order_by]", this.state.order_by);
      urlSearch.append("sort[direction]", this.state.sort_by);
      this.props.history.push(`/Filteroptions?${decodeURIComponent(urlSearch.toString())}`);

      this.getProductList()
    }, 300)

  }

  render() {
    return (
      <div>
        {this.state.loading && <Loader loading={this.state.loading} />}
        <div className="filtertop">
          <Row>
            <Col>
              <div className="filter_abayas container">
                <div className="align-items-center d-flex">
                  <Col>
                    <div className="abayas yt-shop-category-name">
                      {content.products}
                    </div>
                  </Col>
                  <div className="recommended">
                    <Col>
                      <div className="align-item-center responsive-css d-flex">
                        <div className="yt-sp-mb-filter-wrapper align-self-center">
                          <div
                            className="d-flex align-items-center"
                            onClick={this.props?.openFilter}
                          >
                            <div className="yt-sp-recmnd-icn">
                              <BsFunnel />
                            </div>
                            <div className="yt-recmnd-mb-txt">
                              {content.filter}
                            </div>
                          </div>
                        </div>
                        <div className="all-prod-sort-tag-name">
                          {content.sort}:
                        </div>
                        <div className="recomdrop yt-recommend-inner">
                          <Dropdown
                            isOpen={this.state.dropdownOpen}
                            toggle={this.toggle}
                            size="sm"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded={this.state.dropdownOpen}
                          >
                            <DropdownToggle
                              caret
                              className="yt-product-page-recommend-btn"
                              style={{ display: 'flex' }}
                            >
                              {/* 
                              <div className="yt-recmnd-mb-txt">
                                    Sort
                              </div>*/}
                              <div className="yt-sp-mb-recomment-wrap">
                                <div className="d-flex align-items-center">
                                  <div className="yt-sp-recmnd-icn">
                                    <BsFilterLeft />
                                    {/* <BiSort /> */}
                                  </div>
                                  <div className="yt-recmnd-mb-txt">
                                    {content.responsiveSort}
                                  </div>
                                </div>
                              </div>
                              <span className='selected-sort-name'>{this.state.value}</span>
                            </DropdownToggle>
                            <DropdownMenu className="yt-recommend-wrapper">
                              {this.state.sortMenu.map((e, index) => {
                                return <DropdownItem key={index} className={(this.state.order_by + this.state.sort_by) == (e.order_by + e.direction) ? "current-active-filter active" : null} key={e.label} onClick={() => { this.addSortBy(index) }}>{e.label}</DropdownItem>
                              })}
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </div>
                    </Col>
                  </div>
                </div>
              </div>

              <div className="selectedprops yt-selected-filter-wrap">
                <Row>
                  <Col md={9}>
                    <div className="yt-filter-selected d-flex align-items-center flex-wrap">
                      {this.state.searchQuery && this.state.searchQuery != "" &&
                        <span className="yt-flt-tag">
                          {this.state.searchQuery.split("=").join(',').split('&')[1].split(',')[1]}
                          <RiCloseLine
                            className="yt-close-icn"
                            onClick={() => this.removeSearchQuery()}
                          />
                        </span>}
                      {this.state.filterData.category?.map(
                        (data, index) =>
                          data.checked && (
                            <span className="yt-flt-tag" key={index}>
                              {data.attributes.name}
                              <RiCloseLine
                                className="yt-close-icn"
                                onClick={() => {
                                  localStorage.removeItem("subCategory")
                                  this.removeFilter(data.attributes, "category", data.attributes.id)
                                }}
                              />
                            </span>
                          )
                      )}

                      {this.state.filterData.brand?.map(
                        (data) =>
                          data.checked && (
                            <span className="yt-flt-tag" key={index}>
                              {data.attributes.name}
                              <RiCloseLine
                                className="yt-close-icn"
                                onClick={() =>
                                  this.removeFilter(data.attributes, "brand", data.attributes.id)
                                }
                              />
                            </span>
                          )
                      )}

                      {/* {this.state.filterData.tag?.map(
                        (data) =>
                          data.checked && (
                            <span className="yt-flt-tag">
                              {data.attributes.name}
                              <RiCloseLine
                                className="yt-close-icn"
                                onClick={() =>
                                  this.removeFilter(data.attributes, "tag", data.attributes.id)
                                }
                              />
                            </span>
                          )
                      )} */}
                      {(this.state.filterData.category?.filter((i) => i.checked).length >
                        0 || this.state.filterData.brand?.filter((i) => i.checked).length > 0)
                        //||
                        //this.state.filterData.tag?.filter((i) => i.checked).length > 0) 
                        && (
                          <span
                            className="yt-clear-all"
                            onClick={() => {
                              (window.location =
                                '/Filteroptions')
                              localStorage.removeItem("searchQuery")
                              localStorage.removeItem("category")
                              localStorage.removeItem("subCategory")
                              this.setState({
                                searchQuery: "",
                                filterProducList: []
                              })
                              //this.getProductList()
                            }}
                            style={{ cursor: 'default' }}
                          >
                            {content.clearAll}
                          </span>
                        )}
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        {this.state.filterProducList.length != 0 ? <ProductListCard
          collection={this.state.filterProducList}
          addToCart={this.addToCart}
          createWishlist={this.postWishlist}
          deleteWishlist={this.delWishlist}
          toSetDefaultVariant={this.toSetDefaultVariant}
          loading={this.state.loading}
        /> : (!this.state.loading && <PageLoadingBlock />)}

        <div className="loadMoreBtn">
          <div outline='true' className="yt-load-more" type="button" onClick={this.loadMore} >
            {this.state.loadMoreShow && this.state.filterProducList.length != 0 && content.loadMore}

          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(FilterProduct);