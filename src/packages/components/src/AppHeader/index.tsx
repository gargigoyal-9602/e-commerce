import React, { useEffect, useState, Fragment, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button
} from 'reactstrap';
import { FaChevronRight, FaChevronDown, FaRegHeart } from 'react-icons/fa';
import { AiFillCaretRight } from 'react-icons/ai';
import { RiHeadphoneLine } from 'react-icons/ri';
import { withRouter } from "react-router-dom";
//@ts-ignore
import classnames from 'classnames';
//@ts-ignore
import SearchData from './SearchData';
import HeaderController, {
  Props,
} from "./HeaderController.Web";
import './css/index.scoped.css';
// @ts-ignore
import content from "../content";
// import { _ } from '../../../framework/src/IBlock';

//@ts-ignore
import isEmpty from 'lodash/isEmpty';


const MobileSideNav: any = withRouter((props: any) => {
  const isOpen = props.isOpen;
  const toggle = props.toggle;
  const setShowLogout = props.setShowLogout;
  const [showShopMenu, setShowShopMenu] = useState(false);
  const currentPageActive = props.currentPageActive;
  const category = props.category;



  const routeToAll = (value: any) => {
    if (value !== undefined) {
      let path = '/' + value;
      props.history.push(path);
    } else {
      let path = '/';
      props.history.push(path);
    }
  };

  const isLoggedIn = props.isLoggedIn;

  return (
    <div
      className={isOpen ? 'yt-only-mobile-vw tr' : 'yt-only-mobile-vw '}
      style={{ cursor: 'default' }}
    >
      <div className="yt-mobile-side-nav-wrap">
        <div className="yt-mobile-side-inner-content">
          <div className="yt-inner-cnt-logo">
            <div className="logobox-mb">
              <img
                src={(props.themData && props.themData.commonLogoSrc) ? props.themData.commonLogoSrc : require('./images/Logo@3x.png')}
                className="logoimage"
                alt="studio"
                onClick={() => {
                  props?.history?.push('/home-page')
                  toggle()
                }}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>
          <div className="yt-inner-cnt">
            {!isLoggedIn ? (
              <div
                className="yt-mb-user-profile d-flex"
                onClick={() => {
                  props?.history?.push('/login');
                  toggle();
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className="yt-mb-nav-login-btn">
                  {content.loginNSignup}
                </div>
              </div>
            ) : (
              <div
                className="yt-mb-user-profile d-flex"
                onClick={() => {
                  // history.push('/profile');
                  toggle();
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className="yt-header-user-img" />
                <div className="yt-head-user-det" onClick={() => { props?.history?.push({ pathname: '/profilebio', state: { activeTab: 'profile' } }), toggle }}>
                  <div className="yt-head-name">
                    {/* @ts-ignore */}
                    {JSON.parse(localStorage.getItem('userData')).name}
                  </div>
                  <div className="yt-head-email">
                    {/* @ts-ignore */}
                    {JSON.parse(localStorage.getItem('userData')).email}
                  </div>
                </div>
              </div>
            )}
            <div className="yt-mb-innet-search">
              <div className="yt-mb-side-srch header-search-field-wrap">
                {/* search code */}

              </div>
            </div>

          </div>
          <div className="yt-mobile-nav-content">
            <Navbar color="light" light expand="md">
              <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: currentPageActive === 'home',
                      })}
                      onClick={() => {
                        // routeToAll("/home-page");
                        //@ts-ignore 
                        if (localStorage.getItem('token')) {
                          props?.history?.push('/home-page')
                          toggle();
                        }
                        else {
                          //@ts-ignore 
                          window.notify([{ type: 'danger', message: 'Please Login' }]);
                          toggle();
                        }
                      }}
                    >
                      {content.home}
                    </NavLink>
                  </NavItem>
                  {/* <NavItem>
                    <NavLink
                      className={classnames({
                        active: currentPageActive === 'shop',
                      })}
                      onClick={() => {
                        routeToAll('shop?page=1&per_page=15');
                        // window.location.assign("/shop?page=1&per_page=15");
                      }}
                    >
                      {content.market}
                    </NavLink>
                  </NavItem> */}
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: currentPageActive == 'aboutus',
                      })}
                      onClick={() => {
                        //@ts-ignore 
                        if (localStorage.getItem('token')) {
                          toggle()

                          //@ts-ignore
                          localStorage.setItem("newest", "By Newest")
                          const route = "../"
                          //@ts-ignore
                          props.history.location.pathname.split("/").join(",").length < 1
                            ?
                            props.history.push(`./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=created_at&sort[direction]=desc&[newArrivals]=true`)
                            :
                            props.history.push(`./${route.repeat(props.history.location.pathname.split("/").join(",").length - 1)}Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=created_at&sort[direction]=desc&[newArrivals]=true`)
                        } else {
                          //@ts-ignore 
                          window.notify([{ type: 'danger', message: 'Please Login' }]);
                        }

                      }}
                    >
                      {content.newArrivals}
                    </NavLink>
                  </NavItem>

                  <Dropdown
                    isOpen={showShopMenu}
                    toggle={() => {
                      //@ts-ignore 
                      if (localStorage.getItem('token')) {
                        setShowShopMenu(!showShopMenu)
                      } else {
                        //@ts-ignore 
                        window.notify([{ type: 'danger', message: 'Please Login' }]);
                      }
                    }}
                    nav
                    inNavbar
                    className="cm-drop-down-wrap"
                  >
                    <DropdownToggle nav>
                      {content.shop}
                      {showShopMenu ?
                        <FaChevronRight className="head-dropdown-arrow-icn" />
                        :
                        <FaChevronDown className="head-dropdown-arrow-icn" />
                      }
                    </DropdownToggle>
                    <DropdownMenu right className="cm-big-drop-menu">
                      <Row>
                        {props.collectionCategory && props.collectionCategory.length > 0 && (
                          props.collectionCategory.map((x: any) => {
                            return (
                              <Col key={x.id} md={6} lg={3}>
                                <div className="cm-big-menu-inner">
                                  <div className="cm-big-menu-head w3-hover-opacity">
                                    <DropdownItem>{x.attributes.name}</DropdownItem>
                                    <DropdownItem divider />
                                  </div>
                                  {x.attributes.sub_categories.length > 0 ? (
                                    x.attributes.sub_categories.map((sub: any) => {
                                      return (
                                        <div key={sub.id} className={"w3-hover-opacity"}>
                                          <DropdownItem
                                            onClick={() => {
                                              toggle()
                                              const route = "../"

                                              // localStorage.setItem("searchQuery", `&q[name]=${sub.name}&q[sub_category_id]=${sub.id}`)
                                              localStorage.setItem("subCategory", JSON.stringify({ cat_id: x.attributes.id, sub_id: sub.id }))
                                              //@ts-ignore
                                              props.history.location.pathname.split("/").join(",").length < 1 ?
                                                props.history.push(`./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=&sort[direction]=&q[category_id][]=${x.attributes.id}&q[sub_category_id][]=${sub.id}&[sub_category]=true`) :
                                                props.history.push(`./${route.repeat(props.history.location.pathname.split("/").join(",").length - 1)}Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=&sort[direction]=&q[category_id][]=${x.attributes.id}&q[sub_category_id][]=${sub.id}&[sub_category]=true`)
                                            }
                                            }
                                          >
                                            {sub.name}
                                          </DropdownItem>
                                        </div>
                                      );
                                    })
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </Col>
                            );
                          })
                        )}
                      </Row>
                    </DropdownMenu>
                  </Dropdown>

                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: currentPageActive == 'aboutus',
                      })}
                      onClick={() => {
                        props?.history?.push('/aboutus')
                        // routeToAll('aboutus');
                        toggle()
                      }}
                    >
                      {content.aboutUs}
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: currentPageActive === 'contactus',
                      })}
                      onClick={() => {
                        // routeToAll('contact-us');
                        //@ts-ignore 
                        if (localStorage.getItem('token')) {
                          props?.history?.push('/contact-us')
                          toggle();
                        }
                        else {
                          //@ts-ignore 
                          window.notify([{ type: 'danger', message: 'Please Login' }]);
                          toggle();
                        }

                      }}
                    >
                      {content.contactUs}
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
          {isLoggedIn ? (
            <div
              className="yt-mobile-nav-content"
              style={{ cursor: 'default' }}
            >
              <Navbar color="light" light expand="md">
                <Collapse isOpen={isOpen} navbar>
                  <Nav className="mr-auto" navbar>
                    <NavItem>
                      <NavLink
                        onClick={() => {
                          props?.history?.push({
                            pathname: '/profilebio',

                            state: { activeTab: 'wishlist' }
                          });
                          toggle();
                        }}
                      >
                        {content.wishlist}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        onClick={() => {
                          props?.history?.push({
                            pathname: '/profilebio',

                            state: { activeTab: 'myorder' }
                          });
                          toggle();
                        }}
                      >
                        {content.myOrders}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        onClick={() => {
                          props?.history?.push({
                            pathname: '/profilebio',

                            state: { activeTab: 'saveaddresses' }
                          });
                          toggle();
                        }}
                      >
                        {content.savedAddresses}
                      </NavLink>
                    </NavItem>
                    {/* <NavItem>
                      <NavLink
                        onClick={() => {
                          props?.history?.push({
                            pathname: '/profilebio',

                            state: { activeTab: 'connectaccount' }
                          });
                          toggle();
                        }}
                      >
                        {content.connectedAccounts}
                      </NavLink>
                    </NavItem> */}
                    <NavItem>
                      <NavLink
                        onClick={() => {
                          props?.history?.push({
                            pathname: '/profilebio',

                            state: { activeTab: 'helpCenter' }
                          });
                          toggle();
                        }}
                      >
                        {content.helpCenters}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        onClick={() => {
                          props?.history?.push({
                            pathname: '/profilebio',

                            state: { activeTab: 'notifications' }
                          });
                          toggle();
                        }}
                      >
                        {content.notification}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        onClick={() => {
                          props?.history?.push({
                            pathname: '/profilebio',

                            state: { activeTab: 'logout' }
                          });
                          toggle();
                        }}
                      >
                        {content.logout}
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          ) : (
            <div
              className="yt-mobile-nav-content"
              style={{ cursor: 'default' }}
            >
              <Navbar color="light" light expand="md">
                <Collapse isOpen={isOpen} navbar>
                  <Nav className="mr-auto" navbar>
                    <NavItem>
                      <NavLink
                        onClick={() => {
                          // history.push('/help-center');
                          toggle();
                        }}
                      >
                        {content.helpCenters}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        onClick={() => {
                          // history.push('/faq');
                          toggle();
                        }}
                      >
                        {content.faqs}
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          )}
        </div>
        <div className={'h-100'} onClick={toggle} />
      </div>
    </div>
  );
})

/// screen 
class AppHeaderScreen extends HeaderController {
  myRef: React.RefObject<any>;
  constructor(props: Props) {
    super(props);

    this.myRef = React.createRef<any>();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.setSearchDropDown = this.setSearchDropDown.bind(this);
    this.activeTabToggle = this.activeTabToggle.bind(this);

  }

  async componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside, false);
    this.getAllWishlist()
    // @ts-ignore
    const themData = JSON.parse(localStorage.getItem("appThemData"));
    this.setState({ themData });
    // @ts-ignore
    const users = await JSON.parse(localStorage.getItem('userData'));
    const profileimage = await localStorage.getItem('profileImage');
    if (!isEmpty(users)) {
      this.setState({
        isLoggedIn: true,
        // user: user?.attributes,
        user: localStorage.getItem('userData'),
        userProfileImg: localStorage.getItem('profileImage'),
      });
    } else {
      this.setState({ isLoggedIn: false, user: {} })
    }

    this.getRecentSearch();
    this.getCategoryList();
  }

  async componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  handleClickOutside(event: any) {

    if (this.myRef && !this.myRef.current.contains(event.target)) {

      this.setSearchDropDown(false)
      this.setState({
        searchQuery: ""
      })

    }
  }
  setSearchDropDown(value: any) {
    this.setState({ SearchDropDown: value })
  }

  activeTabToggle = (tab: any) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }
  // const node = this.myRef.current
  render() {

    return (


      <header className="yt-main-header" >
        <div className="topbar d-none" >
          <Container>
            <span className="yt-header-top-message">{content.welcomeToStore}</span>
          </Container>
        </div>
        <div className="logocontainer" >
          <Container>
            <Row className="align-items-center">
              <Col xs={3} className="yt-head-col">
                <div className="d-flex align-items-center"  >
                  <img
                    src={require('./images/menuicon.png')}
                    alt="search"
                    className="menuicon d-md-none w3-ripple"
                    onClick={() => this.showToggleMenu()}
                  />
                  <Link to={localStorage.getItem('token') ? '/home-page' : '/'}>
                    <div className="logobox">
                      <img
                        src={this.state.themData?.commonLogoSrc ? this.state.themData?.commonLogoSrc : require('./images/logo.svg')}
                        className="logoimage"
                        alt="studio store"
                      />
                    </div>
                  </Link>
                  <div className="supportbox">
                    <div className="support">
                      <RiHeadphoneLine className="supportimage" color="#324688" />
                      <div className="supportnumber">
                        <span className="title"> {content.callUs} </span>
                        <span className="number">{this.state.themData?.commonTextsContent?.callUs ? this.state.themData.commonTextsContent.callUs : content.mobileNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <div className="col-6 yt-head-hide-srch-col"  >


                <div className="searchcontainer py-2 header-search-field-wrap" ref={this.myRef}>
                  <input
                    type="text"
                    placeholder={
                      'Search Products..'
                    }
                    className="searchinput"
                    onClick={() => this.setSearchDropDown(true)}
                    value={this.state.searchQuery}
                    onChange={(e) => {
                      this.setState({
                        searchQuery: e.target.value
                      })
                      setTimeout(() => {
                        this.state.searchQuery != "" && this.getLiveSearch()
                      }, 300)

                    }}
                    onKeyUp={(e) => {
                      if (e.key === 'Enter' && this.state.searchQuery != "") {
                        this.search();
                        this.setSearchDropDown(false);
                      } else {
                        this.quickSearch();
                      }
                    }}
                    onFocus={() => {
                      this.setSearchDropDown(true);
                      this.getRecentSearch();
                    }}


                  />

                  <img
                    src={require('./images/magnifying-glass@3x.png')}
                    alt="search"
                    className="searchicon w3-ripple w3-hover-opacity"
                    onClick={() => {
                      this.state.searchQuery != '' && (this.search(),
                        this.setSearchDropDown(false))
                    }}
                  />
                  {this.state.SearchDropDown && this.state.searchQuery != '' && (
                    <SearchData
                      hideSearch={() => {
                        this.setState({
                          searchQuery: ""
                        })
                        this.setSearchDropDown(false)
                      }}
                      results={this.state.quickResults}
                      isQuickResults={true}

                    />
                  )}
                  {this.state.SearchDropDown &&
                    this.state.searchQuery == '' &&
                    Array.isArray(this.state.recentSearches) &&
                    this.state.recentSearches.length > 0 && (
                      <SearchData
                        hideSearch={() => {
                          this.setState({
                            searchQuery: ""
                          })
                          this.setSearchDropDown(false)
                        }}
                        results={this.state.recentSearches}
                      />
                    )}
                </div>
              </div>
              <Col xs={3} className="yt-head-col">
                <div className="cartcontainer py-2" style={{
                  flexWrap: localStorage.getItem("userData") ? 'unset' : 'wrap'
                }}>
                  <div className="d-flex">
                    <span className="d-inline-block yt-cart-icn-mainwp">
                      <img
                        src={require('./images/shopping-cart@3x.png')}
                        alt="cart"
                        className="carticon w3-ripple"

                        onClick={() => {
                          localStorage.removeItem("buyNow")
                          //@ts-ignore
                          if (localStorage.getItem("token")) {
                            this.routeToAll('cart');
                          }
                          else {
                            //@ts-ignore 
                            window.notify([{ type: 'danger', message: 'Please Login' }]);
                          }
                        }}
                      />
                      {parseInt(this.state.cartLength) > 0 && <span className={"w3-green cart-notify"}>
                        {/* @ts-ignore */}
                        {parseInt(this.state.cartLength) > 9 ? "9+" : this.state.cartLength}
                      </span>}


                    </span>
                    <span className="d-inline-block yt-cart-icn-mainwp">
                      <FaRegHeart
                        className="favoriteicon w3-ripple"
                        onClick={() => {
                          if (!isEmpty(localStorage.getItem("token")) && !isEmpty(localStorage.getItem("guestUUID")) && isEmpty(localStorage.getItem("userData"))) {
                            // this.props.history.push("/")
                            this.props.history.push({ pathname: "/", state: { "calledFrom": "cart", "redirect": "wishlist" } });
                          } else {
                            this.props.history.push({
                              pathname: "/profilebio",
                              state: { activeTab: "wishlist" }
                            })
                          }
                        }}
                      />
                      {parseInt(this.state.wishlistLength) > 0 && <span className={"w3-green cart-notify"}>
                        {/* @ts-ignore */}

                        {parseInt(this.state.wishlistLength) > 9 ? "9+" : this.state.wishlistLength}
                      </span>}
                    </span>
                  </div>
                  {/* @ts-ignore */}
                  {!this.state.isLoggedIn && isEmpty(JSON.parse(localStorage.getItem('userData'))) ? (
                    <Button
                      className="loginbutton header-log-btn w3-ripple ml-2"
                      onClick={() => {
                        // this.routeToAll('login');
                        if (!isEmpty(localStorage.getItem("token")) && !isEmpty(localStorage.getItem("guestUUID")) && isEmpty(localStorage.getItem("userData"))) {
                          // this.props.history.push("/")
                          this.props.history.push({ pathname: "/", state: { "calledFrom": "cart", "redirect": "wishlist" } });
                        }
                        else {
                          //@ts-ignore
                          this.props?.history?.push({ pathname: localStorage.getItem('token') ? '/home-page' : '/' });
                        }
                      }}
                    >

                      <span className='desktopContent'>{content.loginNSignup}</span>
                      <span className='mobileContent'>{content.login}</span>
                    </Button>
                  ) : (
                    <div
                      className="userbox w3-ripple d-flex align-items-center"
                      onClick={() => this.props.history.push({ pathname: '/profilebio', state: { activeTab: 'profile' } })}
                    >
                      <span>
                        <img
                          src={this.state.userProfileImg && this.state.userProfileImg && this.state.userProfileImg !== 'null' ? this.state.userProfileImg : require('./images/user.png')}
                          alt="user"
                          className="usericon"
                        />
                      </span>
                      {/* <span className="uname">{name.split(' ')[0]}</span> */}
                      {/* <span className="uname">{this.state?.user?.name?.split(' ')[0]}</span> */}
                      {/* @ts-ignore */}
                      <span className="uname">{JSON.parse(localStorage.getItem('userData'))?.name?.split(' ')[0]}</span>
                      {/* <span className="uname">Shubham</span> */}

                      <AiFillCaretRight
                        style={{ marginLeft: '10px', color: '#8b8f95' }}
                      />
                    </div>
                  )}
                </div>
              </Col>
            </Row>
            <div className=" yt-head-mb-search-panel" >
              {this.state.SearchDropDown && this.state.searchQuery != '' && (
                <SearchData
                  hideSearch={() => {
                    this.setState({
                      searchQuery: ""
                    })
                    this.setSearchDropDown(false)
                  }}
                  results={this.state.quickResults}
                  isQuickResults={true}
                  isMobile={true}
                >
                  <div className="yt-mb-header-search-bar-wrap">
                    <input
                      type="text"
                      placeholder='Search ...'
                      className=""
                      onClick={() => this.setSearchDropDown(true)}
                      value={this.state.searchQuery}
                      onChange={(e) => {
                        this.setState({
                          searchQuery: e.target.value
                        })
                        setTimeout(() => {
                          this.state.searchQuery != "" && this.getLiveSearch()
                        }, 300)
                      }}
                      onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                          this.search();
                          this.setSearchDropDown(false);
                        } else {
                          this.quickSearch();
                        }
                      }}
                      onFocus={() => {
                        console.log("onfocus")
                        this.setSearchDropDown(true);
                        this.getRecentSearch();
                      }}
                    //autoFocus={true}
                    />
                  </div>
                </SearchData>
              )}
              {this.state.SearchDropDown && this.state.searchQuery == '' && (
                <SearchData
                  hideSearch={() => {
                    this.setState({
                      searchQuery: ""
                    })
                    this.setSearchDropDown(false)
                  }}
                  results={this.state.recentSearches}
                  isMobile={true}
                >
                  <div className="yt-mb-header-search-bar-wrap">
                    <input
                      type="text"
                      placeholder="Search ..."
                      className=""
                      onClick={() => this.setSearchDropDown(true)}
                      value={this.state.searchQuery}
                      onChange={(e) => {
                        this.setState({
                          searchQuery: e.target.value
                        })
                        setTimeout(() => {
                          this.state.searchQuery != "" && this.getLiveSearch()
                        }, 300)
                      }}
                      onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                          this.search();
                          this.setSearchDropDown(false);
                        } else {
                          this.quickSearch();
                        }
                      }}
                      onFocus={() => {
                        this.setSearchDropDown(true);
                        this.getRecentSearch();
                      }}
                      autoFocus={true}
                    />
                  </div>
                </SearchData>
              )}
            </div>
          </Container>
        </div>
        <div className="menucontainer yt-main-menu" >
          <Container>
            <Navbar color="light" light expand="md">
              <Collapse navbar>
                <Nav className="mr-auto" navbar>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === '1',
                      })}
                      onClick={() => {
                        //@ts-ignore 
                        this.activeTabToggle('1');
                        if (localStorage.getItem('token')) {
                          localStorage.setItem("newest", "By Newest")

                          const route = "../"
                          //@ts-ignore                       
                          this.props.history.location.pathname.split("/").join(",").length < 1 ?
                            this.props.history.push(`./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=created_at&sort[direction]=desc&[newArrivals]=true`) :
                            this.props.history.push(`./${route.repeat(this.props.history.location.pathname.split("/").join(",").length - 1)}Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=created_at&sort[direction]=desc&[newArrivals]=true`)
                        } else {
                          //@ts-ignore 
                          window.notify([{ type: 'danger', message: 'Please Login' }]);
                        }

                      }}
                    >
                      {content.newArrivals}
                    </NavLink>
                  </NavItem>
                  <Dropdown
                    isOpen={this.state.desktopToggle}
                    toggle={() => {
                      //@ts-ignore 
                      if (localStorage.getItem('token')) {
                        this.setDesktopToggle(!this.state.desktopToggle)
                      } else {
                        //@ts-ignore 
                        window.notify([{ type: 'danger', message: 'Please Login' }]);
                      }
                    }}
                    nav
                    inNavbar
                    className="cm-drop-down-wrap"
                  >
                    <DropdownToggle nav>
                      {content.shop}
                      {this.state.desktopToggle ?
                        <FaChevronRight className="head-dropdown-arrow-icn" />
                        :
                        <FaChevronDown className="head-dropdown-arrow-icn" />
                      }
                    </DropdownToggle>
                    <DropdownMenu right className="cm-big-drop-menu">
                      <Row>
                        {this.state.collectionCategory && this.state.collectionCategory.length > 0 && (
                          this.state.collectionCategory.map((x: any) => {
                            return (
                              <Col key={x.id} md={6} lg={3}>
                                <div className="cm-big-menu-inner">
                                  <div className="cm-big-menu-head w3-hover-opacity">
                                    <DropdownItem>{x.attributes.name}</DropdownItem>
                                    <DropdownItem divider />
                                  </div>
                                  {x.attributes.sub_categories.length > 0 ? (
                                    x.attributes.sub_categories.map((sub: any) => {
                                      return (
                                        <div key={sub.id} className={"w3-hover-opacity"}>
                                          <DropdownItem
                                            onClick={() => {
                                              const route = "../"

                                              localStorage.setItem("subCategory", JSON.stringify({ cat_id: x.attributes.id, sub_id: sub.id }))
                                              //@ts-ignore

                                              this.props.history.location.pathname.split("/").join(",").length < 1 ?
                                                this.props.history.push(`./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=&sort[direction]=&q[category_id][]=${x.attributes.id}&q[sub_category_id][]=${sub.id}&[sub_category]=true`) :
                                                this.props.history.push(`./${route.repeat(this.props.history.location.pathname.split("/").join(",").length - 1)}Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=&sort[direction]=&q[category_id][]=${x.attributes.id}&q[sub_category_id][]=${sub.id}&[sub_category]=true`)
                                            }}
                                          >
                                            {sub.name}
                                          </DropdownItem>
                                        </div>
                                      );
                                    })
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </Col>
                            );
                          })
                        )}
                      </Row>
                    </DropdownMenu>
                  </Dropdown>

                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === '3',
                      })}
                      onClick={() => {
                        this.activeTabToggle('3');

                        //@ts-ignore
                        this.routeToAll("aboutus");
                      }}
                    >
                      {content.aboutUs}
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === '4',
                      })}
                      onClick={() => {
                        this.activeTabToggle('4');

                        //@ts-ignore 
                        if (localStorage.getItem('token')) {
                          this.routeToAll('contact-us');
                        } else {
                          //@ts-ignore 
                          window.notify([{ type: 'danger', message: 'Please Login' }]);
                        }
                      }}
                    >
                      {content.contactUs}
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </Container>
        </div>
        { this.state.collectionCategory && <MobileSideNav
          themData={this.state.themData}
          isOpen={this.state.isOpen}
          toggle={() => this.showToggleMenu()}
          setShowLogout={this.setShowLogout}
          currentPageActive={this.state.currentPageActive}
          category={this.state.category}
          history={this.props.history}
          isLoggedIn={this.state.isLoggedIn}
          searchQuery={this.state.searchQuery}
          SearchDropDown={this.state.SearchDropDown}
          quickResults={this.state.quickResults}
          setSearchDropDown={this.setSearchDropDown}
          search={this.search}
          quickSearch={this.quickSearch}
          getRecentSearch={this.getRecentSearch}
          collectionCategory={this.state.collectionCategory && this.state.collectionCategory}


        />}

      </header>
    );
  }
}
// @ts-ignore
export default withRouter(AppHeaderScreen);
// export default  withRouter(App)