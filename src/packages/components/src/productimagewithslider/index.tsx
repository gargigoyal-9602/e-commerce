import React, { useRef, useState, useEffect } from "react";
import "./css/index.scoped.css";
import { Container, Row, Col } from "reactstrap";
import Carousel from "react-elastic-carousel";
import {
  FaChevronUp,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

function ProductverticalSlider(props: any) {
  const initialwindowSize = window.innerWidth > 1279;
  const [windowSize, setwindowSize] = useState(NaN);
  const [mobileOrTablet, setmobileOrTablet] = useState(initialwindowSize);

  let carousel = React.createRef();
  useEffect(() => {
    //console.log("hello");
    window.addEventListener("resize", resizeWindow);
    //setTimeout(() => { alert(‘hello’); }, 2000);
  });

  const resizeWindow = () => {
    setwindowSize(window.innerWidth)
    if (window.innerWidth > 1279) {
      setmobileOrTablet(true)

    } else {
      setmobileOrTablet(false)

    }
  }



  return (
    <>
      {props?.images.length > 3 && (
        <div className="sp-inner-content-wrap sp-image-vert-slider vertical-slider">
          {props?.images?.length > 3 && (
            <>
              <FaChevronUp
                className="yt-slider-up img-fluid"
                //@ts-ignore
                onClick={() => carousel.current.slidePrev()}
              />
              <FaChevronDown
                className="yt-slider-down img-fluid"
                width="20"
                height="20"
                //@ts-ignore
                onClick={() => carousel.current.slideNext()}
              />
            </>
          )}
          <Carousel
            isRTL={false}
            itemsToShow={3}
            itemsToScroll={1}
            verticalMode={mobileOrTablet}
            pagination={false}
            showArrows={false}
            //@ts-ignore
            ref={carousel}
            className="py-4"
          >
            {props.images.map((item: any, idx: any) => {
              return <div
                key={idx}
                className="vert-slider-item my-1 d-flex align-items-center justify-content-center"
                onClick={() => props.imageSlider(item.attributes.url)}
              >
                <img
                  src={item.attributes.url || null || "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"}
                  alt={"img " + idx}
                  className="img-fluid"
                />
              </div>
            }
            )}
          </Carousel>
        </div>
      )}
    </>
  );
}



function ProductImageWithSlider(props: any) {
  return (
    <div className="sp-inner-wrap p-4 bg-white radius-10">
      <Row className="yt-product-img-inner-row">
        <Col xs={12} sm={8} lg={8} className="yt-inner-col">
          <div className="sp-inner-content-wrap sp-spp-inner-image-wrap">
            <img
              src={
                props.currentImage || "null" || "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
              }
              alt="Try Refresh"
              className="img-fluid sp-spimg-item"
            />
          </div>
        </Col>
        <Col xs={12} sm={4} lg={4} className="yt-inner-col">
          <ProductverticalSlider images={props?.images} imageSlider={props?.imageSlider} />
        </Col>
      </Row>
    </div>
  );
}


export default ProductImageWithSlider;
