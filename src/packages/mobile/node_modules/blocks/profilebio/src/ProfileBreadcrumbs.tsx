//@ts-nocheck;
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/index.scoped.css';
// @ts-ignore
import content from "../../../components/src/content";

function ProfileBreadcrumbs(props: any) {
  const urlMatch = props?.onProfile?.onProps?.match?.params?.slug;
  let MactchBread = '';
  if (urlMatch == undefined) {
    switch (props.activeIndex) {
      case "1":
        MactchBread = '';
        break;
      case "2":
        MactchBread = 'Wishlist';
        break;
      case "3":
        MactchBread = 'My Orders';
        break;
      case "4":
        MactchBread = 'Saved Addresses';
        break;
      case "5":
        MactchBread = 'Connected Accounts';
        break;
      case "6":
        MactchBread = 'Help Center';
        break;
      case "7":
        MactchBread = 'Notification';
        break;
      default:
        MactchBread = '';
    }
    return (
      <div className="pageroute profile-pg-breadcrumbs mt-4 yt-mb-80">
        <Link to="/home-page" style={{ color: 'inherit' }}>
          <span
            className="profile-pg-home w3-hover-opacity w3-ripple"
            style={{ cursor: 'default' }}
          >
            {content.home}
          </span>
        </Link>
        {' > '}
        <Link to="/profilebio" onClick={props.intialBread} style={{ color: 'inherit' }}>
          <span
            className={props.activeIndex == '1' ? "currpage profile-pg-current" : "profile-pg-home w3-hover-opacity w3-ripple"}
            // "profile-pg-home w3-hover-opacity w3-ripple"
            style={{ cursor: 'default' }}
          >
            {content.profile}
          </span>
        </Link>
        { props.activeIndex == '1' ? '' : ' > '}
        <span className="currpage profile-pg-current"> {MactchBread}</span>
      </div >
    );
  } else {
    return (
      <div className="pageroute profile-pg-breadcrumbs mt-4 yt-mb-80">
        <Link to="/home-page" style={{ color: 'inherit' }}>
          <span
            className="profile-pg-home w3-hover-opacity w3-ripple"
            style={{ cursor: 'default' }}
          >
            {content.home}
          </span>
        </Link>
        {' > '}
        <span className="currpage profile-pg-current">{content.profile}</span>
      </div>
    );
  }
}

export default ProfileBreadcrumbs;
