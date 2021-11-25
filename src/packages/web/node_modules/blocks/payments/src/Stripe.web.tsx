import React from "react";
import { withRouter } from "react-router-dom";
import StripePayment from "../../../components/src/StripePayment"

export const configJSON = require("./config");
import StripeWebController from './StripeWebController';
import Loader from "../../../components/src/Loader.web";

class StripePayments extends StripeWebController {
  render() {
    return (
      <>
        <StripePayment
          handleSubmit={this.handleSubmit}
          {...this.props}
        />
        <Loader loading={this.state.loading}/>
      </>
    )
  }
}

// @ts-ignore
export default withRouter(StripePayments);