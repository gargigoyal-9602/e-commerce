import React, { Fragment } from "react";
// Customizable Area Start
import './css/index.css';
import { Formik, Form, Field } from 'formik';
import { Button, FormGroup } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';
import { FaFacebookF, FaRegEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';
import firebase from 'firebase';
import * as Yup from "yup";
import axios from "axios";
// @ts-ignore
import content from "../../../../components/src/content.js"
//@ts-ignore
import map from "lodash/map"
// Customizable Area End

import EmailAccountLoginController, {
  Props
} from "./EmailAccountLoginController.web";
import Loader from "../../../../components/src/Loader.web";



const SigninSchema = Yup.object().shape({
  userEmail: Yup.string()
    .email('Please enter a valid email address.')
    .required('Email is required.'),
  password: Yup
    .string()
    .min(8, 'Minimum Password length is 8.')
    .max(16, 'Maximum Password length is 16')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain atleast a capital letter, a lowercase letter, a number and a special character.'
    )
    .required('Password is required.')
});

class EmailAccountLoginBlock extends EmailAccountLoginController {

  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  signinUser = async (values: any) => {
    this.setShowSpinner(true);
    let data;
    //@ts-ignore
    const guestuserID = localStorage.getItem('guestUUID');
    if (guestuserID) {
      data = {
        email_or_mobile: values.userEmail,
        password: values.password,
        uuid: guestuserID
      }
    }
    else {
      data = {
        email_or_mobile: values.userEmail,
        password: values.password
      }
    }
    return this.handleSubmitLogin(data);
  };

  //connect to google account
  connectGoogle = () => {
    const googleResult = new firebase.auth.GoogleAuthProvider();
    googleResult.addScope('profile');
    googleResult.addScope('email');
    firebase.auth().signInWithPopup(googleResult)
      .then(result => {
        console.log(result, "google result");
        if (result.credential && result.user && result.additionalUserInfo) {
          this.setState({
            ...this.state,
            socialMediaResult: result
          });
          this.verifyEmailBeforeRegistartion(result, 'google');
        }
      }).catch(err => {
        console.log("Googleerrr", err);
        // @ts-ignore
        window.notify([{ message: 'Error Occured While connceting to Google' || "Something went wrong!!!", type: "danger" }]);
      });
  };
  //connect to facebook account
  connectFacebook = () => {
    const facebookResult = new firebase.auth.FacebookAuthProvider();
    facebookResult.addScope('email');
    // facebookResult.setCustomParameters({
    //   'display': 'popup'
    // })
    firebase.auth().signInWithPopup(facebookResult).then(result => {
      console.log(result, "facebook result");
      if (result.credential && result.user && result.additionalUserInfo) {
        this.setState({
          ...this.state,
          socialMediaResult: result
        });
        this.verifyEmailBeforeRegistartion(result, 'facebook');
      }
    }).catch(err => {
      console.log("fbErr", err);
      // @ts-ignore
      window.notify([{ message: err?.message || 'Error Occured While connceting to Facebook', type: "danger" }]);
    })
  };

  render() {
    return (
      <>
        {this.state.loading && <Loader loading={this.state.loading} />}
        <div className="yt-login-inner-wrap">
          <h2 className="yt-login-tag-line">
            {content.getStarted}
          </h2>
          <div className="yt-login-form mb-4">
            <Formik
              initialValues={{ userEmail: '', password: '' }}
              onSubmit={this.signinUser}
              validationSchema={SigninSchema}
            >
              {({ errors, touched, setValues, values }) => {
                // const cacheState = useSelector((state) => state.cache);

                if (
                  (errors.password && touched.password) ||
                  (errors.userEmail && touched.userEmail)
                ) {
                  // setLoginError('');
                }
                // useEffect(() => {
                //   setValues(values);
                // }, []);
                return (
                  <Form translate="yes">
                    <FormGroup
                      // className={errors.userEmail && touched.userEmail && 'yt-form-err'}
                      className={'yt-form-err'}
                    >
                      <img
                        alt="Email Icon"
                        src={require('./images/emal-icn.png')}
                        className={
                          errors.userEmail && touched.userEmail
                            ? ' yt-login-icn'
                            : 'yt-login-icn'
                        }
                      />
                      <Field
                        name="userEmail"
                        type="text"
                        placeholder='Email'
                        className={
                          'form-control' +
                          (errors.userEmail && touched.userEmail
                            ? ' is-invalid'
                            : '')
                        }
                      />
                      <span
                        id="yt-signup-email-error"
                        className="yt-login-message-show"
                      />
                      {touched.userEmail && errors.userEmail && (
                        <span
                          className="invalid-feedback"
                          style={{ position: 'absolute' }}
                        >
                          {errors.userEmail}
                        </span>
                      )}
                    </FormGroup>

                    <FormGroup
                      translate="yes"
                      className='mt-3 '
                    // className={ 'mt-3 ' + errors.password && touched.password && 'yt-form-err'}
                    >
                      <img
                        alt="Password Icon"
                        src={require('./images/key-icn.png')}
                        className={
                          (errors.password && touched.password) ||
                            this.state.loginError.length > 0
                            ? ' yt-login-icn2'
                            : 'yt-login-icn'
                        }
                      />
                      <Field
                        name="password"
                        type={this.state.showPass ? 'text' : 'password'}
                        id="password"
                        placeholder='Password'
                        className={
                          'form-control' +
                          (errors.password && touched.password
                            ? ' is-invalid invalid'
                            : '')
                        }
                      />
                      {touched.password && errors.password ? (
                        this.state.showPass ? (
                          <FaEyeSlash
                            onClick={this.showPassword}
                            className={
                              this.state.loginError.length > 0
                                ? 'yt-login-pass-vie-icn2'
                                : 'yt-login-pass-vie-icn'
                            }
                            style={{ marginRight: 20 }}
                          />
                        ) : (
                          <FaEye
                            onClick={this.showPassword}
                            className={
                              this.state.loginError.length > 0
                                ? 'yt-login-pass-vie-icn2'
                                : 'yt-login-pass-vie-icn'
                            }
                            style={{ marginRight: 20 }}
                          />
                        )
                      ) : this.state.showPass ? (
                        <FaEyeSlash
                          onClick={this.showPassword}
                          className={
                            this.state.loginError.length > 0
                              ? 'yt-login-pass-vie-icn2'
                              : 'yt-login-pass-vie-icn'
                          }
                        />
                      ) : (
                        <FaEye
                          onClick={this.showPassword}
                          className={
                            this.state.loginError.length > 0
                              ? 'yt-login-pass-vie-icn2'
                              : 'yt-login-pass-vie-icn'
                          }
                        />
                      )}
                      {touched.password && errors.password && (
                        <span
                          className="invalid-feedback"
                          style={{ position: 'absolute' }}
                        >
                          {errors.password}
                        </span>
                      )}
                      {this.state.loginError.length > 0 ? (
                        <span
                          className="err_invalid mt-2"
                          style={{ position: 'absolute' }}
                        >
                          {this.state.loginError}
                        </span>
                      ) : (
                        <></>
                      )}
                    </FormGroup>
                    <Fragment>
                      {this.state.showSpinner ? (
                        <CgSpinner
                          style={{
                            color: 'black',
                            fontSize: 32,
                            width: '100%',
                            margin: 10,
                          }}
                          className="w3-spin"
                        />
                      ) : (
                        <Button
                          className="sign-in"
                          type="submit"
                          color="secondary yt-login-btn w3-ripple mt-5"
                          block
                        >
                          {content.signIn}
                        </Button>
                      )}
                    </Fragment>
                  </Form>
                );
              }}
            </Formik>
          </div>
          <div className="yt-login-bottom-info text-center mt-4">
            <Button
              color="link yt-login-forget-pass"
              onClick={() => {
                this.routeToAll('forgotpassword');
              }}
            >
              {content.forgotPassword}
            </Button>
            <a href="/forgotpassword" className="yt-login-forget-pass" />
            <p className="yt-login-via-tag mb-4">
              {content.continueVia}
            </p>
            <div className="d-flex align-items-center justify-content-center">
              <Button
                onClick={() => this.connectFacebook()}
                // onClick={this.logInWithFaceBook}
                color="secondary d-flex  align-items-center mr-3 yt-login-via-fb"
              >
                <FaFacebookF className="mr-2" />{' '}
                {content.facebook}
              </Button>
              <Button
                // onClick={this.logInWithGoogle}
                onClick={() => this.connectGoogle()}
                color="secondary d-flex align-items-center yt-login-via-email"
              >
                <FaRegEnvelope className="mr-2" />{' '}
                {content.google}
              </Button>
            </div>
          </div>
          <div className="lp-bottom-links">
            <div className="mt-4">
              <p className="yt-login-aggre-tag mb-3 text-center">
                {content.bySigningIn}
              </p>
              <div className="d-flex yt-login-term-privacy-link justify-content-center">
                <Link to="/help-center/Terms and Conditions">
                  {content.termNcondition}
                </Link>
                <span className="mx-2">&</span>
                <Link to="/help-center/Privacy Policy">
                  {content.privacyPolicy}
                </Link>
              </div>
            </div>
            {/* {this.props.isPopup && ( */}
            {true && (
              <div className="mt-4 mt-4 text-center yt-skip-wrap">
                <span
                  style={{ cursor: 'pointer' }}
                  className="yt-login-skip-btn"
                  onClick={() => this.guestLogin()}
                >
                  {content.skipAsGuest}
                </span>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}
// @ts-ignore
export default withRouter(EmailAccountLoginBlock)
// Customizable Area Start

// Customizable Area End