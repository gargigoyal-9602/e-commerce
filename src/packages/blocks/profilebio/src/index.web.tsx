//@ts-nocheck;
import React from 'react';
import { withRouter } from 'react-router-dom';
// @ts-ignore
import classnames from 'classnames';
import { Container, Row, Col, TabContent, TabPane, Modal, ModalBody, Button, FormGroup, Form, ModalHeader, ModalFooter } from 'reactstrap';
//@ts-ignore;
import isEmpty from "lodash/isEmpty";
//@ts-ignore;
import map from 'lodash/map';
import '../assets/styles/index.scoped.css';
import '../assets/styles/logoutModal.css';
import '../assets/styles/addressStyles.css';
// @ts-ignore
import content from "../../../components/src/content";
import Loader from "../../../components/src/Loader.web";
import ProfileLoader from './ProfileLoaders.web';
import SavedAddress from './Address.web';
import Profilebio from './Profilebio.web';
import ConnectedAccounts from './ConnectedAccounts.web';
import ProfileBreadcrumbs from "./ProfileBreadcrumbs";
import NoOrder from "../../ordermanagement/src/NoOrder.web";
import SingleOrder from '../../ordermanagement/src/SingleOrders.web';
import NoWishList from "./NoWishlist.web";
import WishList from "./WishList.web";
// import NoWishList from '../../wishlist/src/NoWishList.web';
// import WishList from '../../wishlist/src/WishList.web';
import Notifications from '../../notifications/src/Notifications.web';
import ProfileWebController, { Props } from "./ProfileWebController.web";
import { emptyProfile, wishlistImg, addressImg, connectedImg, helpcenterImg, notificationImg, logoutImg, closeImg, orderImg } from './assets';

class ProfileBlock extends ProfileWebController {

  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  contentSidebarTitle(activeTab: any) {
    const tabName = activeTab.tabnmae;
    // if (tabName !== undefined) {
    //   switch (activeTab) {
    //     case "1":
    //       return "Profile";
    //     case "2":
    //       return 'Wishlist';
    //     case "3":
    //       return 'My Orders';
    //     case "4":
    //       return 'Saved Addresses';
    //     case "5":
    //       return 'Connected Accounts';
    //     case "6":
    //       return 'Help Center';
    //     default:
    //       return 'Profile';
    //   }
    // }
    if (activeTab) {
      switch (activeTab) {
        case "1":
          return "Profile";
        case "2":
          return 'Wishlist';
        case "3":
          return 'My Orders';
        case "4":
          return 'Saved Addresses';
        case "5":
          return 'Connected Accounts';
        case "6":
          return 'Help Center';
        case "7":
          return 'Notification';
        default:
          return 'Profile';
      }
    }
    return <></>;
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    let tokenn = await localStorage.getItem('token');
    const guestUUID = localStorage.getItem('guestUUID');
    const userImg = localStorage.getItem('profileImage');
    if (tokenn && guestUUID && !userImg) {
      this.props.history?.push('/login');
    }

    if (this.props?.location?.state?.activeTab) {
      if (this.props?.location?.state?.activeTab === 'logout') {
        this.openLogoutModal();
      }
      else {
        this.routeToProfile(this.props?.location?.state?.activeTab)
      }
    }
    this.updatingProfileData();
  };

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    window.scrollTo(0, 0);
    console.log(nextProps, "nextProps");
    if (nextProps?.location?.state?.activeTab) {
      if (nextProps?.location?.state?.activeTab !== this.state.activeTab) {
        if (nextProps?.location?.state?.activeTab === 'logout') {
          this.openLogoutModal()
        }
        else {
          this.routeToProfile(nextProps?.location?.state?.activeTab)
        }
      }

    }
  }

  intialBread = () => {
    this.setState({
      activeTab: '1'
    })
  };

  updatingProfileData = async () => {
    const ne = localStorage.getItem('userData');
    const imgP = await localStorage.getItem('profileImage');
    if (ne) {
      const userDetails = JSON.parse(ne);
      this.setState({
        ...this.state,
        //@ts-ignore
        data: JSON.parse(localStorage.getItem('userData')),
        profileImage: localStorage.getItem('profileImage')
      })
    }
    this.getOrders();
    this.getWishList();
  };

  public shouldComponentUpdate(a: any, b: any) {
    if (b.activeTab || this.props?.location?.state?.activeTab) {
      return true
    } else {
      return true
    }
  };

  render() {
    const { loadingOrder, loadingWishlist, totalNotifications } = this.state;
    return (
      <>
        <Container>
          <Loader loading={loadingOrder || loadingWishlist} />
          <Row>
            <Col md={12}>
              <ProfileBreadcrumbs intialBread={this.intialBread} onProfile={this.props} activeIndex={this.state.activeTab} />
            </Col>
          </Row>
          <section className="mb-4 d-block profile-pg-mb-30">
            <Row className="yt-cm-row flex-wrap">
              <Col md={3} lg={4} className="bb-cm-lt-col">
                <h2 className="yt-profile-mb-ttl profile-pg-title mb-4 mt-0">
                  {this.contentSidebarTitle(this.state.activeTab)}
                </h2>
                <div className="profile-pg-inner-wrap profile-inner-tab-wrap p-40 bg-white radius-10 profile-pg-mb-10">
                  <div className="profile-pg-inner-contnet">
                    <ul className="p-0 m-0 list-style-none profile-pg-tabs-name pg-profile-box">
                      <li
                        className={classnames({
                          'pt-0 active': this.state.activeTab === '1',
                          'pt-0': this.state.activeTab !== '1',
                        })}
                        onClick={() => {
                          this.routeToProfile("needtocheck");
                        }}
                      >
                        {this.state.data && Object.keys(this.state.data).length == 0 ? <>

                        </> :
                          <div className="d-flex align-items-center">
                            <div className="img-upload d-flex align-items-center justify-content-center">
                              <img
                                alt="Profile Pics"
                                src={this.state.profileImage && this.state.profileImage && this.state.profileImage !== 'null' ? this.state.profileImage : emptyProfile}
                                className="img-fluid"
                              />
                            </div>

                            <div className="user-profileinfo ml-3">
                              <h3 className="profile-name mt-0">{this.state.data && this.state.data.name ? this.state.data.name : this.state.userName}</h3>
                              <h5 className="profile-email mb-0">{this.state.data && this.state.data.email ? this.state.data.email : this.state.email}</h5>
                            </div>
                          </div>}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="profile-pg-inner-wrap profile-inner-tab-content p-40 bg-white radius-10 profile-pg-mb-30">
                  <div className="profile-pg-inner-contnet">
                    <ul className="p-0 m-0 list-style-none profile-pg-tabs-name">
                      <li
                        className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => {
                          this.routeToProfile('wishlist');
                        }}
                      >
                        <div className="profile-item-wrap d-flex align-items-center">
                          <img
                            alt="Whish List"
                            src={wishlistImg}
                            // src={require('./images/whish-list-icn.png')}
                            width="65"
                            height="65"
                            className="profile-item-icn img-fluid mr-4"
                          />
                          <span className="profile-item-name">
                            {content.wishlist}
                          </span>
                          {this.state.wishlist?.length > 0 && (
                            <span className="profile-notiy">
                              {this.state.wishlist.length}
                            </span>
                          )}
                        </div>
                      </li>
                      <li
                        className={classnames({ active: this.state.activeTab === '3' })}
                        onClick={() => {
                          this.routeToProfile('myorder');
                        }}
                      >
                        <div className="profile-item-wrap d-flex align-items-center">
                          <img
                            alt="My Order"
                            src={orderImg}
                            // src={require('./images/my-order-icn.png')}
                            width="65"
                            height="65"
                            className="profile-item-icn img-fluid mr-4"
                          />
                          <span className="profile-item-name">
                            {content.myOrders}
                          </span>
                        </div>
                      </li>
                      <li
                        className={classnames({ active: this.state.activeTab === '4' })}
                        onClick={() => {
                          this.routeToProfile('saveaddresses');
                        }}
                      >
                        <div className="profile-item-wrap d-flex align-items-center">
                          <img
                            alt="Address"
                            src={addressImg}
                            // src={require('./images/address-icn.png')}
                            width="65"
                            height="65"
                            className="profile-item-icn img-fluid mr-4"
                          />
                          <span className="profile-item-name">
                            {content.savedAddresses}
                          </span>
                        </div>
                      </li>
                      {/* <li
                        className={classnames({ active: this.state.activeTab === '5' })}
                        onClick={() => {
                          this.routeToProfile('connectaccount');
                        }}
                      >
                        <div className="profile-item-wrap d-flex align-items-center">
                          <img
                            alt="Connect"
                            src={connectedImg}
                            // src={require('./images/connected-icn.png')}
                            width="65"
                            height="65"
                            className="profile-item-icn img-fluid mr-4"
                          />
                          <span className="profile-item-name">
                            {content.connectedAccounts}
                          </span>
                        </div>
                      </li> */}
                      <li
                        className={classnames({ active: this.state.activeTab === '6' })}
                        onClick={() => {
                          // this.routeToHelpCenter();
                          this.routeToProfile('helpCenter');
                        }}
                      >
                        <div className="profile-item-wrap d-flex align-items-center">
                          <img
                            alt="Help Center"
                            src={helpcenterImg}
                            // src={require('./images/help-icn.png')}
                            width="65"
                            height="65"
                            className="profile-item-icn img-fluid mr-4"
                          />

                          <span className="profile-item-name">
                            {content.helpCenter}
                          </span>
                        </div>
                      </li>
                      <li className={classnames({ active: this.state.activeTab === '7' })}
                        onClick={() => {
                          this.routeToProfile('notifications');
                        }}
                      >
                        <div className="profile-item-wrap d-flex align-items-center">
                          <img
                            alt="Notifications"
                            src={notificationImg}
                            // src={require('./images/notify-icn.png')}
                            width="65"
                            height="65"
                            className="profile-item-icn img-fluid mr-4"
                          />

                          <span className="profile-item-name">
                            {content.notification}
                          </span>
                          {/* @ts-ignore */}
                          {localStorage.getItem('notifctaion_len') != 0 && (
                            <span className="notifications-notiy">
                              {localStorage.getItem('notifctaion_len')}
                            </span>
                          )}
                        </div>

                      </li>
                      <li
                        className={classnames({ active: this.state.activeTab === '8' })}
                        onClick={() => this.openLogoutModal()}
                      // onClick={() => {
                      //   this.routeToProfile('logout');
                      // }}
                      >
                        <div className="profile-item-wrap d-flex align-items-center">
                          <img
                            alt="Logout"
                            src={logoutImg}
                            // src={require('./images/logout-icn.png')}
                            width="65"
                            height="65"
                            className="profile-item-icn img-fluid mr-4"
                          />
                          <span className="profile-item-name" onClick={() => {
                            localStorage.removeItem("cart_length")
                            localStorage.removeItem("wishlist_len")

                          }}>
                            {content.logout}
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col md={9} lg={8} className="bb-cm-rt-col">
                <h2 className="profile-pg-title mb-4 mt-0">
                  {this.contentSidebarTitle(this.state.activeTab)}
                </h2>

                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    {/* @ts-ignore */}
                    <Profilebio updateProfile={this.updatingProfileData} />
                    {/* Tab 1 */}
                  </TabPane>
                </TabContent>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="2">
                    {/* @ts-ignore */}
                    {isEmpty(this.state.wishlist) && <NoWishList />}
                    {/* @ts-ignore */}
                    {!isEmpty(this.state.wishlist) && <WishList productList={this.state.wishlist} getWishList={this.getWishList} />}
                  </TabPane>
                </TabContent>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="3">
                    {/* @ts-ignore */}
                    {isEmpty(this.state.orders) && <NoOrder />}
                    {
                      !isEmpty(this.state.orders) && (
                        <>
                          <div className='order-data-scroll'>
                            {
                              map(this.state.orders, (ordr: any, index: number) => {
                                return (
                                  <SingleOrder
                                    // @ts-ignore
                                    order={ordr}
                                    key={index}
                                    cancelOrder={this.cancelOrder}
                                    getOrders={this.getOrders}
                                  />
                                )
                              })
                            }
                          </div>
                          {this.state.isLoadMoreOrders && (
                            // load more button content come here
                            <div className='loadMoreBtn'>
                              {/* @ts-ignore */}
                              <div outline className="yt-load-more" type="button"
                                onClick={() => {
                                  this.getOrders();
                                  //@ts-ignore
                                  window.scrollTo(0, 0)
                                }}>
                                {this.state?.isLoadMoreOrders && content.loadMore}
                              </div>
                            </div>
                          )}

                        </>
                      )
                    }
                  </TabPane>
                </TabContent>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="4">
                    <SavedAddress />
                  </TabPane>
                </TabContent>
                {/* <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="5">
                    <ConnectedAccounts />
                  </TabPane>
                </TabContent> */}
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="6">
                    helpCenter
                  </TabPane>
                </TabContent>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="7">
                    {/* @ts-ignore */}
                    <Notifications total={this.state?.totalNotifications} />
                  </TabPane>
                </TabContent>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="8">
                    <Modal modalClassName="popopop" className="cm-small-modal-4" isOpen={this.state.openLogoutModal} toggle={() => this.deleteLogout()} centered={true}>
                      <ModalHeader toggle={() => this.deleteLogout()} className="log-out-title-bar  border-0">
                        <span>{content.logout}</span>
                      </ModalHeader>
                      <ModalBody className="yt-log-body-wrap">
                        <div className='text-center log-out-body-text'>
                          {content.logoutMessage}
                        </div>
                      </ModalBody>
                      <ModalFooter className="log-out-bottom-bar p-1 d-flex justify-content-between">
                        <Button color="secondary pp-log-out-btn-modal p-3 pp-log-out-btn-light-grey"
                          onClick={() => this.deleteLogout()}>{content.cancel}</Button>
                        <span className="yt-form-spacer" />
                        <Button color="secondary pp-log-out-btn-modal p-3 pp-log-out-btn-dark-grey"
                          onClick={this.onHandleLogout}>{content.logout}</Button>
                      </ModalFooter>
                    </Modal>
                  </TabPane>
                </TabContent>
              </Col>
            </Row>
          </section>
        </Container>
      </>
    )
  }
}
// @ts-ignore
export default withRouter(ProfileBlock);