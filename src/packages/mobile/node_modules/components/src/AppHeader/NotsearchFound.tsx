import React, { Component } from 'react';

import './css/index.scoped.css';
type MyProps = {
  isMobile: boolean,
  hideSearch: () => void
}

export class NotsearchFound extends Component<MyProps > {
  render() {
    return (
      <div className="yt-recent-search-wrap my-2">
        {this.props.isMobile && this.props.children}
        <div
          className="d-flex align-items-center justify-content-end"
          onClick={() => this.props.hideSearch()}
        >
          <img alt="#img" src={require('./images/close-icn.png')} />
        </div>
        <div className="text-center mb-2">
          <img alt="#img" src={require('./images/no-search-found-icn.png')} />
          <h2 className="search-no-ttl">
            No Results Found 
          </h2>
          <h4 className="search-no-sub-ttl my-0">
              Try modifying your search to get relevant results.
          </h4>
        </div>
      </div>
    );
  }
}

export default NotsearchFound;
