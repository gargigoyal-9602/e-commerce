import React, { useRef, useState, useEffect, Fragment } from "react";
import { Container, Button, NavItem } from "reactstrap";
import { useMediaQuery } from 'react-responsive';
import Carousel from "react-elastic-carousel";
import { withRouter, Link } from "react-router-dom";
// import HeartImage from './images/heart-icon.svg';
//import {LikeImage} from './images/like.png';
import {
  IoIosArrowDropleft,
  IoIosArrowDropright,
  IoIosStar,
} from "react-icons/io";
export const configJSON = require("./config.js");
import "./css/index.scoped.css";
//@ts-ignore
import content from "../content"
let list: any = [];

function TitleBar(props: any) {
  let viewAllShop = window.location.pathname.split('/')
  if (props.name != undefined) {
    return (
      <div className="yt-produstslider-info d-flex justify-content-between align-items-center">
        <h2 className="yt-comonent-top-title my-0">{props.name}</h2>
        {list.length > 4 && props.onViewMore && (
          <div className="yt-comonent-link">
            <Button
              color="link yt-component-more px-0"
              onClick={props.onViewMore}
            >

              {window.location.pathname != `/${viewAllShop[1]}/${viewAllShop[2]}` && content.productCard.viewAll}

            </Button>
          </div>
        )}
      </div>
    );
  } else {
    return <></>;
  }
}

const ProductCard: any = withRouter((props: any) => {
  let carousel = React.createRef();
  let Breakpoints = [
    { width: 300, itemsToShow: 1, itemsToScroll: 1 },
    { width: 500, itemsToShow: 2, itemsToScroll: 1 },
    { width: 750, itemsToShow: 3, itemsToScroll: 1 },
    { width: 1024, itemsToShow: 4, itemsToScroll: 3 },
    { width: 1300, itemsToShow: 5, itemsToScroll: 3 },

  ];

  /// to display products

  function getList() {
    let list: any = [];

    props.collection && props.collection.forEach((product: any, index: number) => {
      // console.log(props.collection, "props.collection")
      let catalogue_variant_in_stock =
        product.attributes.stock_qty > 0
          ? product.attributes.default_variant.stock_qty > 0
            ? product.attributes.catalogue_variants.filter(
              (variant: any, index: any) => {
                return (
                  variant.id ==
                  parseInt(product.attributes.default_variant.id)
                );
              }
            )[0]
            : product.attributes.catalogue_variants.filter(
              (variant: any, index: any) => {
                return variant.attributes.stock_qty > 0;
              }
            )[0]
          : product.attributes.catalogue_variants[0];

      // let catalogue_variant_in_stock =
      //   catalogue_variant_in_stock && product.attributes.stock_qty > 0
      //     ? catalogue_variant_in_stock
      //     : product;

      let percentageValue =
        ((parseInt(catalogue_variant_in_stock.attributes.price) -
          parseInt(catalogue_variant_in_stock.attributes.sale_price)) /
          parseInt(catalogue_variant_in_stock.attributes.price)) *
        100;

      list.push(
        <div className="slider-container" key={index}>
          <div className="item-slider">
            <div className="product product-slider-cpnt text-center">
              <div className="d-flex justify-content-between align-items-center">
                {catalogue_variant_in_stock.attributes.on_sale && (
                  <div className="yt-product-off text-center p-1">
                    {`${Math.floor(percentageValue)}${content.productCard.off}`}
                  </div>
                )}
                {!catalogue_variant_in_stock.attributes.on_sale && (
                  <div className="text-center p-1" />
                )}
                <div className="Like-btn mr-3">
                  {product.attributes.wishlisted ? (
                    <img
                      src={require("./images/like.png")}
                      alt="add to wishlist"
                      onClick={() => props.deleteWishlist(product.id)}
                    />
                  ) : (
                    <img
                      src={require("./images/heart-icon.svg")}
                      alt="add to wishlist"
                      onClick={() => props.createWishlist(product.id)}
                    />
                  )}
                </div>
              </div>
              <img
                src={
                  // catalogue_variant_in_stock.attributes.images
                  //   ? catalogue_variant_in_stock.attributes.images.data[0]
                  //     .attributes.url
                  //   : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"

                  product.attributes.images
                    ? product.attributes.images.data[0]
                      .attributes.url
                    : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"}
                className="pt-3 px-3 img-fluid yt-td-product-img prodimage w3-ripple ml-auto mr-auto"
                alt={catalogue_variant_in_stock.attributes.name}
                onClick={() => {
                  setTimeout(() => {
                    // localStorage.setItem(
                    //   "default_variant",
                    //   catalogue_variant_in_stock.id
                    // );

                    props.history.push(`/shop/${product.id}`);
                  }, 500);
                }}
              />
              {/* </Link> */}
              <div className="product-details">
                <div className="product-title" title={product.attributes.name}>
                  {product.attributes.name}
                </div>
                <div className="price-wrap">
                  {catalogue_variant_in_stock.attributes.on_sale && (
                    <>
                      <span className="price1 product-sale-price">
                        {/* {content.rupeeSymbol}{catalogue_variant_in_stock.attributes.sale_price} */}
                        {/* @ts-ignore  */}
                        {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {parseFloat(catalogue_variant_in_stock.attributes.sale_price).toFixed(2)}
                      </span>
                      <span className="price2 product-reg-price2">
                        {/* {content.rupeeSymbol}{catalogue_variant_in_stock.attributes.price} */}
                        {/* @ts-ignore  */}
                        {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {parseFloat(catalogue_variant_in_stock.attributes.price).toFixed(2)}
                      </span>
                    </>
                  )}
                  {!catalogue_variant_in_stock.attributes.on_sale && (
                    <span className="price1 product-sale-price">
                      {/* {content.rupeeSymbol}{catalogue_variant_in_stock.attributes.price}*/}
                      {/* @ts-ignore  */}
                      {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {parseFloat(catalogue_variant_in_stock.attributes.price).toFixed(2)}
                    </span>
                  )}
                </div>
                <div
                  className="ratings" // style={{ opacity: product.attributes.average_rating > 0 ? 1 : 0 }}
                >
                  <span>
                    {product.attributes.average_rating.toFixed(1)}
                    <IoIosStar className="rating-star-icon" />
                    <span className="product-rating ">
                      | {product.attributes.reviews.length}

                    </span>
                  </span>
                </div>

                {product.attributes.stock_qty > 0 &&
                  Object.keys(catalogue_variant_in_stock).length !== 0 &&
                  catalogue_variant_in_stock.attributes.stock_qty >= 1 ? (
                  <Fragment>
                    {Object.keys(product.attributes.cart_items).length !== 0 ? (
                      Object.keys(product.attributes.cart_items).filter(
                        (keyName: any, keyIndex: any) => {
                          return (
                            parseInt(keyName) == catalogue_variant_in_stock.id
                          );
                        }
                      )[0] ? (
                        <Button
                          color="secondary button-cart"
                          onClick={() => {
                            localStorage.removeItem("buyNow")
                            //@ts-ignore
                            props?.history.push("/cart")
                          }}
                        >
                          {content.goToCart}
                        </Button>
                      ) : (
                        <Button
                          color="secondary button-cart"
                          onClick={() => {
                            props.addToCart(
                              catalogue_variant_in_stock.attributes
                            );
                          }}
                        >
                          {content.addToCart}
                        </Button>
                      )
                    ) : (
                      <Button
                        color="secondary button-cart"
                        onClick={() => {
                          props.addToCart(
                            catalogue_variant_in_stock.attributes
                          );
                        }}
                      >
                        {content.addToCart}
                      </Button>
                    )}
                  </Fragment>
                ) : (
                  <Button disabled color="secondary button-cart">
                    {content.outOfStock}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      );

      list = [...list];
    });

    return list;
  }

  // let list: any = [];
  if (
    props.collection &&
    Array.isArray(props.collection) &&
    props.collection.length > 0
  ) {
    list = getList();
  }

  const showCard = list.length > 0;
  const isTabletMid = useMediaQuery({ query: '(max-width: 768px)' });
  return props.collection &&
    Array.isArray(props.collection) &&
    props.collection.length > 0 &&
    showCard ? (
    <section className="product-slider">
      <TitleBar name={props.name} onViewMore={props.onViewMore} />
      <div className="yt-component-wrapper yt-slider-component">
        {(list.length > 4 || isTabletMid) && (
          <div>
            <button
              className="carousel__back-button"
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                color: "#324688",
              }}
            >
              <IoIosArrowDropleft
                className="slider-left img-fluid"
                //@ts-ignore
                onClick={() => carousel.current.slidePrev()}
              />
            </button>
            <button
              className="carousel__next-button"
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                color: "#324688",
              }}
            >
              <IoIosArrowDropright
                className="slider-right img-fluid"
                width="20"
                height="20"
                //@ts-ignore
                onClick={() => carousel.current.slideNext()}
              />
            </button>
          </div>
        )}

        {list.length > 4 || isTabletMid ? (
          <Carousel

            isRTL={false}
            itemsToShow={5}
            itemsToScroll={3}
            pagination={false}
            showArrows={false}
            //ref={(ref: any) => (carousel = ref)}
            //@ts-ignore
            ref={carousel}
            breakPoints={Breakpoints}
            
          >
            {list}
          </Carousel>
        ) : (
          list
        )}
      </div>
    </section>
  ) : (
    <section className="hp-product-slider">
      <TitleBar name={props.name} />
      <div className="yt-component-wrapper yt-slider-component mt-4">
        No Products Found.
      </div>
    </section>
  );
});

export default ProductCard;
