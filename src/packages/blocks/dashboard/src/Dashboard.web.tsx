import React from "react";
// Customizable Area End
import DashboardController, { Props } from "./DashboardController.web";
import Header from "../../../components/src/AppHeader/index";
import Footer from "../../../components/src/AppFooter/index";
import ProductCard from "../../../components/src/productcard/index";
//@ts-ignore
import content from "../../../components/src/content.js"
import {
  IoIosArrowDropleft,
  IoIosArrowDropright,
  IoIosStar,
} from "react-icons/io";
import Carousel from "react-elastic-carousel";

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import { withRouter } from "react-router-dom";
import "pure-react-carousel/dist/react-carousel.es.css";
import {
  Serviceicon1,
  Serviceicon2,
  Serviceicon3,
  CardImage1,
  CardImage2,
  CardImage3,
  OfferCardImage1,
  OfferCardImage2,
  OfferCardImage3,
  Serviceicon4,
  pinkLady,
  luxuryProduct,
  potraitHand,
} from "./assets";
import "../assets/css/index.css";
import Loader from "../../../components/src/Loader.web";


class HomeDashboard extends DashboardController {
  constructor(props: Props) {
    super(props);
  }

  render() {

    let carousel = React.createRef();
    let Breakpoints = [
      { width: 200, itemsToShow: 1, itemsToScroll: 1 },
      { width: 320, itemsToShow: 2, itemsToScroll: 1 },
      { width: 500, itemsToShow: 3, itemsToScroll: 1 },
      { width: 769, itemsToShow: 5, itemsToScroll: 2 },
      { width: 1000, itemsToShow: 6, itemsToScroll: 2 },
      { width: 1300, itemsToShow: 7, itemsToScroll: 3 },
    ];

    const banner_one = this.state.banners.length > 1 && this.state.banners[0].attributes.images.data[0].attributes.url

    return (
      <>
        {this.state.dashboardLoader && <Loader loading={this.state.dashboardLoader} />}
        <section className="dashboard-carousel-section">
          {localStorage.removeItem("newest")}
          {this.state.banners.length > 0 && this.state.banners[0].attributes.images != null && (

            <Carousel
              isRTL={false}
              itemsToShow={1}
              itemsToScroll={1}
              pagination={this.state.banners[0].attributes.images.data.length > 1 ? true : false}
              showArrows={false}
              enableAutoPlay={true}
              autoPlaySpeed={5000}
            >
              {this.state.banners.length > 0 && this.state.banners[0].attributes.images.data.map((banner: any, index: number) => {


                return <div
                  key={index}
                  onClick={() => {
                    //@ts-ignore
                    window.location.replace(banner.attributes.url_link)

                  }}
                  className="w-100"
                // className="bg-banner"
                // style={{
                //   backgroundImage:
                //     `url(${banner.attributes.url})`
                // }}

                >

                  <img src={banner.attributes.url} className="bg-banner"></img>
                  <div className="main-container">

                    <div className="banner-text">

                      {/* <h1 className="banner-title">50% Off</h1>
              <p className="banner-sub-title">On every women clothes and all</p> */}
                      {/* <button className="primary-btn">Shop Now</button> */}
                    </div>
                  </div>
                </div>
              })}
            </Carousel>
          )}
          <section className="content-part">
            <div className="main-container">
              <div className="service-steps">
                <div className="step">
                  <img src={Serviceicon1} className="banner-image" />
                  <div>
                    <p>
                      <strong>{content.homeFreeDeliveryStrip.FreeDelivery}</strong>
                    </p>
                    <p>{content.homeFreeDeliveryStrip.FreeDeliveryDescription}</p>
                  </div>
                </div>
                <div className="step">
                  <img src={Serviceicon2} className="banner-image" />
                  <div>
                    <p>
                      <strong>{content.homeFreeDeliveryStrip.SecurePayment}</strong>
                    </p>
                    <p>{content.homeFreeDeliveryStrip.SecurePaymentDescription}</p>
                  </div>
                </div>
                <div className="step">
                  <img src={Serviceicon3} className="banner-image" />
                  <div>
                    <p>
                      <strong>{content.homeFreeDeliveryStrip.return}</strong>
                    </p>
                    <p>{content.homeFreeDeliveryStrip.returnDescription}</p>
                  </div>
                </div>
                <div className="step border-0">
                  <img src={Serviceicon4} className="banner-image" />
                  <div>
                    <p>
                      <strong>{content.homeFreeDeliveryStrip.support}</strong>
                    </p>
                    <p>{content.homeFreeDeliveryStrip.supportDescrip}</p>
                  </div>
                </div>
              </div>

              <section className="collections">
                <h2>{content.HomeCollection}</h2>
                <div className="carousal">
                  <button
                    style={{
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      color: "#324688",
                    }}
                    className="carousel__back-button"
                  >
                    <IoIosArrowDropleft
                      className="slider-left img-fluid"
                      /*@ts-ignore */
                      onClick={() => carousel.current.slidePrev()}
                    />
                  </button>
                  <button
                    style={{
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      color: "#324688",
                    }}
                    className="carousel__next-button"
                  >

                    <IoIosArrowDropright
                      className="slider-right img-fluid"
                      /* @ts-ignore */
                      onClick={() => carousel.current.slideNext()}
                    />
                  </button>

                  <Carousel
                    isRTL={false}
                    // itemsToShow={5}
                    // itemsToScroll={3}
                    pagination={false}
                    showArrows={false}
                    //ref={(ref: any) => (carousel = ref)}
                    //@ts-ignore
                    ref={carousel}
                    breakPoints={Breakpoints}
                  >
                    {this.state.collectionCategory &&
                      this.state.collectionCategory.map(
                        (category: any, index: any) => {
                          return (
                            <div key={index}>
                              <img
                                className="card-img-top"
                                src={category.attributes.product_image.url}
                                alt="Card image cap"
                                style={{ borderRadius: "50%" }}
                                onClick={() => {
                                  localStorage.setItem("category", category.id);
                                  //@ts-ignore
                                  this.props.history.push(`./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=&sort[direction]=&q[category_id][]=${category.id}`);
                                }}
                              />
                              <div className="card-body">
                                <p className="card-text">
                                  {category.attributes.name}
                                </p>
                              </div>
                            </div>
                          );
                        }
                      )}
                  </Carousel>
                </div>
              </section>

              <section className="new-collection">
                <div className="box-carousal">
                  {this.state.newCollection && (
                    <ProductCard
                      collection={this.state.newCollection}
                      name="New Collection"
                      onViewMore={() => {
                        localStorage.setItem("newest", "By Newest")
                        //@ts-ignore
                        this.props.history.push(`./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=created_at&sort[direction]=desc`);

                      }}
                      addToCart={this.addToCart}
                      createWishlist={this.postWishlist}
                      deleteWishlist={this.delWishlist}
                      toSetDefaultVariant={this.toSetDefaultVariant}
                    />
                  )}
                </div>
              </section>
            </div>
            <div className="container-flex">
              {this.state.banners.length > 1 && this.state.banners[1].attributes.images != null && (
                <div className="offer-banner-wrap">
                  <div className="offer-banner">
                    <div className="banner-text">
                      <div className="add-text add1">
                        {/* <h1 className="banner-title font-40 dark-text">
                      <span className="blue-text">SAVE 5%</span> on every order!
                    </h1>
                    <p className="banner-sub-title font-26">Luxury Product</p>
                    <span className="line" /> */}
                        {/* <button className="primary-btn">Shop Now</button> */}
                      </div>
                      <img
                        src={
                          this.state.banners[1].attributes.images.data[0]
                            .attributes.url
                        }
                        alt="Card image cap"
                        onClick={() => {
                          //@ts-ignore
                          window.location.replace(this.state.banners[1].attributes.images.data[0].attributes.url_link)

                        }}
                      />
                    </div>
                    {this.state.banners[1].attributes.images.data.length > 1 && <div className="banner-text">
                      <div className="add-text add2">
                        {/* <h1 className="banner-title font-60 white-text">
                      Welcome, to the world of modest wear
                    </h1>
                    <p className="banner-sub-title font-22 white-text mt-3">
                      Check top products
                    </p>
                    <span className="line" /> */}
                        {/* <button className="primary-btn">Shop Now</button> */}
                      </div>
                      <img
                        src={
                          this.state.banners[1].attributes.images.data[1]
                            .attributes.url
                        }
                        alt="Card image cap"
                        onClick={() => {
                          //@ts-ignore
                          window.location.replace(this.state.banners[1].attributes.images.data[1].attributes.url_link)

                        }}
                      />
                    </div>
                    }
                  </div>
                  <div className="full-size offer-banner">
                    {this.state.banners[1].attributes.images.data.length > 2 && <div className="banner-text">
                      <div className="add-text add3">
                        {/* <p className="banner-sub-title font-26 white-text pb-0">
                      Fashion and Trend come togather
                    </p>
                    <h1 className="banner-title font-79 white-text mb-5">
                      Upto 30% off
                    </h1>
                    <span className="line" /> */}
                        {/* <button className="primary-btn">Shop Now</button> */}
                      </div>
                      <img
                        src={
                          this.state.banners[1].attributes.images.data[2]
                            .attributes.url
                        }
                        alt="Card image cap"
                        onClick={() => {
                          //@ts-ignore
                          window.location.replace(this.state.banners[1].attributes.images.data[2].attributes.url_link)

                        }}
                      />
                    </div>

                    } </div>
                </div>
              )}
            </div>
            <section className="three-boxes">
              {this.state.banners.length > 2 && this.state.banners[2].attributes.images != null && (
                <div className="main-container">
                  <div className="shop-card-wrap">
                    <div className="shop-card" onClick={() => {
                      //@ts-ignore                       
                      window.location.replace(this.state.banners[2].attributes.images.data[0].attributes.url_link)

                    }}>
                      <img
                        src={
                          this.state.banners[2].attributes.images.data[0]
                            .attributes.url
                        }
                        alt=""

                      />
                      <div className="card-text">
                        {/* <p>Product Name</p> */}
                        {/* <button className="primary-btn">Shop Now</button> */}
                      </div>
                    </div>
                    {this.state.banners[2].attributes.images.data.length > 1 && <div className="shop-card middle-card" onClick={() => {
                      //@ts-ignore
                      window.location.replace(this.state.banners[2].attributes.images.data[1].attributes.url_link)

                    }}>
                      <img
                        src={
                          this.state.banners[2].attributes.images.data[1]
                            .attributes.url
                        }
                        alt=""

                      />
                      <div className="card-text">
                        {/* <p>Product Name</p> */}
                        {/* <button className="primary-btn">Shop Now</button> */}
                      </div>
                    </div>}
                    {this.state.banners[2].attributes.images.data.length > 2 && <div className="shop-card" onClick={() => {
                      //@ts-ignore
                      window.location.replace(this.state.banners[2].attributes.images.data[2].attributes.url_link)

                    }}>
                      <img
                        src={
                          this.state.banners[2].attributes.images.data[2]
                            .attributes.url
                        }
                        alt=""

                      />
                      <div className="card-text">
                        {/* <p>Product Name</p> */}
                        {/* <button className="primary-btn">Shop Now</button> */}
                      </div>

                    </div>}
                  </div>
                </div>
              )}
            </section>
            <section className="new-collection">
              <div className="main-container">
                <div className="box-carousal">
                  {this.state.featuredProduct && (
                    <ProductCard
                      collection={this.state.featuredProduct}
                      name="Recommended Products"
                      onViewMore={() => {
                        localStorage.setItem("newest", "Recommended")
                        //@ts-ignore
                        this.props.history.push(`./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=recommended&sort[direction]=desc`);

                      }}
                      addToCart={this.addToCart}
                      createWishlist={this.postWishlist}
                      deleteWishlist={this.delWishlist}
                      toSetDefaultVariant={this.toSetDefaultVariant}
                    />
                  )}
                </div>
              </div>
            </section>
            <div className="container-flex">
              {this.state.banners.length > 3 && (
                <div className="offer-banner-wrap2">
                  {this.state.banners.length > 3 && this.state.banners[3].attributes.images != null && <div className="offer-banner">
                    <div className="banner-text">
                      <div className="add-text pos1">
                        {/* <h1 className="banner-title font-40 white-text">
                      <span className="d-block">Hurry Up!</span>
                      <br />
                      Daily Deal Of The Day
                    </h1>
                    <p className="banner-sub-title font-22 white-text mt-3 mb-2">
                      Low prices on 1000+ products every day
                    </p> */}
                        {/* <button className="primary-btn">Shop Now</button> */}
                      </div>
                      <img
                        src={
                          this.state.banners[3].attributes.images.data[0]
                            .attributes.url
                        }
                        alt="Card image cap"
                        onClick={() => {
                          //@ts-ignore
                          window.location.replace(this.state.banners[3].attributes.images.data[0].attributes.url_link)

                        }}
                      />
                    </div>
                    {this.state?.banners[3].attributes.images?.data.length > 1 && <div className="banner-text">
                      <div className="add-text pos2">
                        {/* <p className="banner-sub-title font-40 dark-text mb-2 pb-0">
                      Happy Times!
                    </p>
                    <h1 className="banner-title font-60 dark-text mb-4">
                      Flat 30% Off
                    </h1> */}
                        {/* <button className="primary-btn">Shop Now</button> */}
                      </div>
                      <img
                        src={
                          this.state?.banners[3].attributes.images?.data[1]
                            .attributes.url
                        }
                        alt="Card image cap"
                        onClick={() => {
                          //@ts-ignore
                          window.location.replace(this.state.banners[3].attributes.images.data[1].attributes.url_link)

                        }}
                      />
                    </div>
                    }
                  </div>
                  }
                  <div className="full-size-banner offer-banner">
                    {this.state.banners.length > 4 && this.state.banners[4].attributes.images != null && <div className="banner-text">
                      <div className="add-text pos3">
                        {/* <h1 className="banner-title font-180 white-text">
                      50% Off
                    </h1>
                    <p className="banner-sub-title font-22 white-text">
                      On every women clothes and all
                    </p> */}
                        {/* <button className="primary-btn">Shop Now</button> */}
                      </div>
                      <img
                        src={
                          this.state.banners[4].attributes.images.data[0]
                            .attributes.url
                        }
                        alt="Card image cap"
                        onClick={() => {
                          //@ts-ignore
                          window.location.replace(this.state.banners[4].attributes.images.data[0].attributes.url_link)

                        }}
                      />
                    </div>}
                  </div>
                </div>
              )}
            </div>
          </section>
        </section>
      </>
    );
  }
}
//@ts-ignore
export default withRouter(HomeDashboard);
