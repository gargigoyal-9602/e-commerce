//@ts-nocheck
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Login from '../../blocks/email-account-login/src/EmailWebLogin.web';
//import Login from './screens/Login';
import ForgotPassword from '../../blocks/forgot-password/src/ForgotPassword.web';
import HelpCenterBlock from '../../blocks/helpcenter/src/HelpCenterBlock.web';
import AboutUs from '../../blocks/contactus/src/AboutUsBlock.web';
import Profilebio from '../../blocks/profilebio/src/index.web';
import OTPConfirm from '../../blocks/otp-input-confirmation/src/OTPConfirmation.web';
import Cart from '../../blocks/shoppingcart/src/ShoppingCart.web';
import ContactusScreen from '../../blocks/contactus/src/ContactUs.web';
import HomeDashboard from '../../blocks/dashboard/src/Dashboard.web';
import ProductDetails from '../../blocks/dashboard/src/ProductDetails.web';
import OrderDetailsBlog from '../../blocks/orderdetailview/src/OrderDetails.web';
import ProtectedRoute from './protectedRoute.web';
import Filteroptions from '../../blocks/filteritems/src/Filteroptions.web';
import Checkout from '../../blocks/shoppingcart/src/Checkout.web';
import Header from '../../components/src/AppHeader/';
import Footer from '../../components/src/AppFooter/';
import OrderSummary from '../../blocks/ordersummary/src/OrderSummary.web';
import OrderPlaced from '../../blocks/ordersummary/src/orderPlaced.web';
import transactionfailed from '../../blocks/ordersummary/src/transactionfailed.web';
import PrivateRoute from './privateRoute.web';
import ProtectRouting from './ProtectRouting.web';
//@ts-ignore
const themes = require('../../blocks/studio-store-ecommerce-theme/src/theme.json');
import './App.css';

class WebRoutes extends Component {
  render() {
    const { history } = this.props;
    const Appthem = JSON.parse(localStorage.getItem('appThemData'));
    const StripePubKey =
      Appthem?.PaymentKeys?.stripe?.stripe_pub_key != null
        ? themes?.attributes?.stripe?.stripe_pub_key
        : themes?.attributes?.stripe?.stripe_pub_key;
    const stripePromise = loadStripe(StripePubKey);
    return (
      <Elements stripe={stripePromise}>
        <Router history={history}>
          <div>
            <Header />
            <div>
              <Switch>
                <PrivateRoute path="/" exact component={Login} />
                <Route
                  path="/login"
                  exact
                  render={props => <Login {...props} />}
                />
                <Route
                  path="/forgotpassword"
                  exact
                  component={ForgotPassword}
                />
                {/* Protect Roues Start */}
                <ProtectedRoute
                  path="/home-page"
                  exact
                  component={HomeDashboard}
                />
                <ProtectRouting
                  path="/otpconfirm"
                  exact
                  component={OTPConfirm}
                />
                <Route path="/help-center" exact component={HelpCenterBlock} />
                <Route
                  path="/help-center/:slug"
                  exact
                  component={HelpCenterBlock}
                />
                <Route path="/aboutus" exact component={AboutUs} />
                <ProtectRouting
                  path="/contact-us"
                  exact
                  component={ContactusScreen}
                />
                <ProtectRouting
                  path="/filterOptions"
                  component={Filteroptions}
                />
                <ProtectRouting
                  path="/profile/myorder/:orderId/:itemId"
                  exact
                  component={OrderDetailsBlog}
                />
                <ProtectRouting path="/cart" exact component={Cart} />
                <ProtectRouting
                  path="/shop/:id"
                  exact
                  component={ProductDetails}
                />
                <ProtectRouting path="/checkout" exact component={Checkout} />
                <ProtectRouting
                  path="/order-summary"
                  exact
                  component={OrderSummary}
                />
                <ProtectRouting
                  path="/order-placed"
                  exact
                  component={OrderPlaced}
                />
                <ProtectRouting
                  path="/transactionfailed"
                  exact
                  component={transactionfailed}
                />
                {/* Protect Route End */}

                {/* Profile Protect Route start */}
                <ProtectedRoute path="/profilebio" component={Profilebio} />
                {/* Profile Protect Route End */}
              </Switch>
              <Footer history={history} />
            </div>
          </div>
        </Router>
      </Elements>
    );
  }
}

export default withRouter(WebRoutes);
