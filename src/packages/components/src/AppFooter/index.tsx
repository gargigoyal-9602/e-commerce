import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
// @ts-ignore
import BackgroundHead from "./images/playstorebg.png"
//@ts-ignore
import googleplay from "./images/googleplay.svg";
//@ts-ignore
import appstore from "./images/appstore.svg";
//@ts-ignore
import promotion from "./images/promotion.png"
import { withRouter } from "react-router-dom";
// @ts-ignore
import isEmpty from "lodash/isEmpty";
// @ts-ignore
import includes from "lodash/includes";
import './css/index.scoped.css';
//@ts-ignore
import content from "../content";
import PageLoadingBlog from "../../../blocks/profilebio/src/PageLoadingBlog.web";
import FooterController, { Props } from './FooterController.web';


class Footer extends FooterController {
    constructor(props: Props) {
        super(props);
    };
    async componentDidMount() {
        super.componentDidMount();
        //@ts-ignore
        const themData = JSON.parse(localStorage.getItem("appThemData"));
        if (themData) {
            this.setState({ theamData: themData });
        }
        window.scroll(0, 0);
    }
    routeToAll(route: string) {
        //@ts-ignore
        this.props?.history?.push(route);
    };
    routeHelpCenter = (value: any) => {
        if (value !== undefined && includes(value.toLowerCase(), "about")) {
            //@ts-ignore
            this.props.history.push("/aboutus");
        } else if (value !== undefined) {
            let path = '/help-center/' + value;
            //@ts-ignore
            this.props.history.push(path);
        } else {
            let path = '/help-center';
            //@ts-ignore
            this.props.history.push(path);
        }
    };
    render() {
        // @ts-ignore
        const appThemData = JSON.parse(localStorage.getItem("appThemData"));
        if (this.state.isBrandSettingsLoaded) {
            // @ts-ignore
            return <PageLoadingBlog title="Loading ..." />
        }
        //console.log("============== This state ===============>>>>>>>", this.state);
        return (
            <footer>
                <div className="footercontainer yt-main-footer">
                    <Container fluid>
                        <Row className="store-banner">
                            <Col xs={12} sm={12} lg={12} className="yt-col yt-first-col">
                                <div className="play-store-banner bg-img">
                                    <div className="text-center dwn-app">{content.downloadApp}</div>
                                    <div className="app-banner text-center">
                                        <a href='https://play.google.com/store/apps' target="_blank">
                                            <img src={googleplay} className="mr-1" />
                                        </a>
                                        <a href='https://www.apple.com/in/app-store/' target="_blank">
                                            <img src={appstore} />
                                        </a>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="justify-content-between yt-main-footer-row">
                            <Col xs={12} sm={7} lg={5} className="yt-col yt-first-col">
                                <div className="d-flex">
                                    {/* <div
                               className="logobox w3-ripple"
                               onClick={() => history.push('/')}
                             >
                               <img
                                 src={require('./images/Logo@3x.png')}
                                 className="logoimage"
                                 alt="man and machine"
                               />
                             </div> */}
                                    {/* <div className="logo">
                                      {content.studioStore}
                                    </div> */}
                                    <div className="logo">
                                        <img src={appThemData?.commonLogoSrc} alt="" />
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className=" yt-text-about">
                                        {content.dummyText}
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="social_all">
                                        {
                                            this.state.isShowFB && (
                                                <>
                                                    {/* @ts-ignore */}
                                                    <a href={this.state.theamData && this.state.theamData.footerContent?.facebookSrc ? this.state.theamData.footerContent?.facebookSrc : "https:www.facebook.com/"} target="_blank">
                                                        <img
                                                            src={require('./images/facebook.png')}
                                                            className="social_logos w3-ripple"
                                                            alt="social"
                                                        />
                                                    </a>{' '}
                                                    |
                                                </>
                                            )
                                        }
                                        {this.state.isShowInsta && (
                                            <>
                                                {/* @ts-ignore */}
                                                <a href={this.state.theamData && this.state.theamData.footerContent?.instagramSrc ? this.state.theamData.footerContent.instagramSrc : "https:www.instagram.com/"} target="_blank">
                                                    <img
                                                        src={require('./images/instagram.png')}
                                                        className="social_logos w3-ripple"
                                                        alt="social"
                                                    />
                                                </a>{' '}
                                                |
                                            </>
                                        )}
                                        {this.state.isShowGoogle && (
                                            <>
                                                <a href="https:www.google.com/" target="_blank">
                                                    <img
                                                        src={require('./images/search.png')}
                                                        className="social_logos w3-ripple"
                                                        alt="social"
                                                    />
                                                </a>{' '}
                                                |
                                            </>
                                        )}
                                        {this.state.isShowTwitter && (
                                            <>
                                                {/* @ts-ignore */}
                                                <a href={this.state.theamData && this.state.theamData.footerContent?.twitterSrc ? this.state.theamData.footerContent?.twitterSrc : "https:twitter.com/"} target="_blank">
                                                    <img
                                                        src={require('./images/twitter.png')}
                                                        className="social_logos w3-ripple"
                                                        alt="social"
                                                    />
                                                </a>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </Col>
                            {
                                !isEmpty(this.state.usefulLinks) && !isEmpty(this.state.usefulLinks[0]) && (
                                    <Col xs={12} sm={5} lg={2} className="yt-foote-link-col yt-col">
                                        <div className="yt-footer-widget-title text-nowrap">
                                            {content.usefulLinks}
                                        </div>
                                        <div className="yt-footler-menu-links" style={{ marginTop: '-10%' }}>

                                            {
                                                !isEmpty(this.state.usefulLinks) && this.state.usefulLinks[0].map((link: any, index: number) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="yt-ftr-link w3-ripple text-nowrap"
                                                            onClick={() => {
                                                                this.routeHelpCenter(link?.attributes?.help_center_type)
                                                            }}
                                                        >
                                                            {/* {content.deliveryNReturn} */}
                                                            {link?.attributes?.help_center_type}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </Col>
                                )}


                            {
                                !isEmpty(this.state.usefulLinks) && !isEmpty(this.state.usefulLinks[1]) && (
                                    <Col xs={12} sm={5} lg={2} className="yt-foote-link-col yt-col">
                                        <div className="yt-footer-widget-title">
                                            {/* {content.quickLinks} */}
                                        </div>
                                        <div className="yt-footler-menu-links">

                                            {/* <div
                                          className="yt-ftr-link w3-ripple text-nowrap"
                                          onClick={() => {
                                              this.routeHelpCenter("");
                                          }}
                                      >
                                          {content.helpCenters}
                                      </div> */}

                                            {
                                                !isEmpty(this.state.usefulLinks) && this.state.usefulLinks[1].map((link: any, index: number) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="yt-ftr-link w3-ripple text-nowrap"
                                                            onClick={() => {
                                                                this.routeHelpCenter(link?.attributes?.help_center_type)
                                                            }}
                                                        >
                                                            {/* {content.deliveryNReturn} */}
                                                            {link?.attributes?.help_center_type}
                                                        </div>
                                                    )
                                                })
                                            }
                                            {
                                                !isEmpty(this.state.usefulLinks) && this.state.usefulLinks[2] &&
                                                // ((link: any) => {
                                                //return (
                                                <div
                                                    className="yt-ftr-link w3-ripple text-nowrap"
                                                    onClick={() => {
                                                        this.routeHelpCenter(this.state.usefulLinks[2][0]?.attributes?.help_center_type)
                                                    }}
                                                >
                                                    {/* {content.deliveryNReturn} */}
                                                    {this.state.usefulLinks[2][0]?.attributes?.help_center_type}
                                                </div>
                                                // )
                                                //</Col> })
                                            }
                                            <div
                                                className="yt-ftr-link avitem w3-ripple text-nowrap"
                                                onClick={() => {
                                                    //@ts-ignore
                                                    this.props?.history?.push('/contact-us');
                                                }}
                                            >
                                                {content.contactUs}
                                            </div>


                                        </div>
                                    </Col>
                                )}

                            <Col xs={12} sm={5} lg={3} className="yt-col yt-last-col">
                                <div className="yt-footer-widget-title">
                                    {content.promotions}
                                </div>
                                <div onClick={() => {
                                    localStorage.setItem("newest", "By Newest")
                                    //@ts-ignore

                                    const route = "../"

                                    //@ts-ignore                       
                                    this.props.history.location.pathname.split("/").join(",").length < 1 ?
                                        //@ts-ignore                 
                                        this.props.history.push(`./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=created_at&sort[direction]=desc`) :
                                        //@ts-ignore                 
                                        this.props.history.push(`./${route.repeat(this.props.history.location.pathname.split("/").join(",").length - 1)}Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=created_at&sort[direction]=desc`)
                                }}>
                                    {/* @ts-ignore */}
                                    <img className="p-image" src={this.state.theamData && this.state.theamData.footerContent?.promotionBannerSrc ? this.state.theamData.footerContent.promotionBannerSrc : promotion} />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="bottombar">
                    <Container>
                        <p className="m-0 yt-copyright-text">
                            {/* @ts-ignore */}
                            {this.state.theamData && this.state.theamData.footerContent?.copyright ? this.state.theamData.footerContent.copyright : content.copyrightText}
                        </p>
                    </Container>
                </div>
            </footer >
        )
    }
};

// @ts-ignore
export default withRouter(Footer);
