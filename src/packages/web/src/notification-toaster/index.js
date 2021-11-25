import React, { Component } from 'react';
import { toast } from 'react-toastify';

export default class NotificationToaster extends Component {
  constructor() {
    super();
    this.state = {
      ready: false
    };
  }
  pushNotice = (notificationArray = []) => {
    notificationArray.length > 0 &&
      notificationArray?.forEach(item => {
        if (item.type == 'danger' || item.type === undefined) {
          toast.error(item.message);
        } else if (item.type == 'error' || item.type === undefined) {
          toast.error(item.message);
        } else if (item.type == 'warning' || item.type === undefined) {
          toast.warning(item.message);
        } else if (item.type == 'info' || item.type === undefined) {
          toast.info(item.message);
        } else {
          toast.success(item.message);
        }
      });
  };
  render() {
    if (!this.state.ready) {
      window.notify = this.pushNotice;
    }
    return null;
  }
}
