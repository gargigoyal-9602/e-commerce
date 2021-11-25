import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import '../assets/styles/index.scoped.css';
// @ts-ignore
import content from "../../../components/src/content";
import Loader from "../../../components/src/Loader.web"
import { boolean } from 'yup';
import { emptyOrdersAndWishlistImg } from './assets';
// @ts-ignore
// import Image from "./images/user.png";

// Customizable Area End

interface Props {
  loading: boolean;
}

class NoOrderFound extends Component<Props> {

  // Customizable Area Start
  // Customizable Area End

  contentSidebarTitle(activeTab: any) {
    const tabName = activeTab.tabnmae;
    if (tabName !== undefined) {
      switch (tabName) {
        case '1':
          return "Profile";
        case '2':
          return 'Wishlist';
        case '3':
          return 'My Orders';
        case '4':
          return 'Saved Addresses';
        case '5':
          return 'Connected Accounts';
        default:
          return 'Profile';
      }
    }
    return <></>;
  }

  render() {
    return (
      <div className="profile-pg-inner-wrap profile-pg-inner-no-order p-3 bg-white radius-10 mb-4">
        <div className="profile-pg-inner-wrapper">
          <div className="profile-pg-order-main-wrap text-center ">
            <Loader loading={this.props.loading} />
            <img
              src={emptyOrdersAndWishlistImg}
              // src={require('./images/no-order-icn.png')}
              className="img-fluid  mb-5"
            />
            <div className="pp-sa-order-wrap mb-5 mt-2">
              <h2 className="pp-od-no-ttl mt-0 mb-3">
                {content.noAnyOrder}
              </h2>
              <p className="pp-od-no-text mb-0">
                {content.browseItemNOrderIt}
              </p>
            </div>
            <Button
              color="pp-no-order-btn  no-order-btn py-3 px-3"
              //   onClick={routeToshop}
              onClick={() => {
                //@ts-ignore
                // this.props?.history?.push('/Filteroptions')
                this.props?.history?.push(`./Filteroptions?&page=${1}&per_page=${15}&sort[order_by]=created_at&sort[direction]=desc&[newArrivals]=true`)
              }
              }
            >
              {content.browseProducts}
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
// @ts-ignore
export default withRouter(NoOrderFound)
// Customizable Area Start

// Customizable Area End