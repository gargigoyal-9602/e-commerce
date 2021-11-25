//@ts-nocheck;
import React, { Fragment } from 'react';
import { Button, FormGroup, Alert } from 'reactstrap';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Link, withRouter } from 'react-router-dom';
import { FaFacebookF, FaRegEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';
import EmailAccountRegistrationController from "./EmailAccountRegistrationController.web";
import firebase from 'firebase';
// @ts-ignore
import content from "../../../../components/src/content";
import './css/index.css';

import Loader from "../../../../components/src/Loader.web";


// Validations start
const signUpValidation = Yup.object().shape({
  FullName: Yup.string().min(3, 'Name is Too Short').required('Name is Required'),
  Email: Yup.string().email().required('Email is Required'),
  password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Password must contain atleast a capital letter, a lowercase letter, a number and a special character').required('Password is Required'),
  fullPhoneNumber: Yup.string().matches(/^\d+$/, "Only Numbers allow").required("Phone Number is required")
});
//Validations End

class EmailAccountLoginBlock extends EmailAccountRegistrationController {
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
        window.notify([{ message: err?.message || 'Error Occured While connceting to Google', type: "danger" }]);
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

  async componentDidMount() {
    if (!firebase.apps.length) {
      // firebase.initializeApp(config);
      firebase.initializeApp({
        apiKey: 'AIzaSyCp4CXWD1k7C83aDqbBjqupWcgXib1xTuo',
        authDomain: 'studio-store-eb05b.firebaseapp.com',
      });
    }
    firebase.auth().onAuthStateChanged(result => {
      this.setState({
        ...this.state,
        // socialAccountResult: result
      })
    });
  };
  public shouldComponentUpdate(a: any, b: any) {
    if (b.showAlert) {
      //console.log("HI ");
      setTimeout(() => {
        this.setState({
          showAlert: false,
          message: '',
          messageType: ''
        })
      }, 2000);
      return true
    } else {
      return true
    }
  }

  render() {
    console.log("thisRegistartion,", this.props);
    return (
      <>
        {this.state.loading && <Loader loading={this.state.loading} />}
        <div className="yt-signup-wrap">
          <h2 className="yt-signup-tag-line">
            {content.getStarted}
          </h2>
          {/* @ts-ignore */}
          <div className="yt-signup-form mb-4">
            <Formik
              initialValues={{ FullName: '', Email: '', password: '', fullPhoneNumber: "" }}
              onSubmit={this.signupUser}
              // onSubmit={(values) => {
              //   this.registartionEmail(values);
              // }}
              validationSchema={signUpValidation}
            >
              {({ errors, touched, setValues, values, handleSubmit }) => {
                // const cacheState = useSelector((state) => state.cache);
                // useEffect(() => {
                //   setValues(values);
                // }, [cacheState?.language]);

                return (
                  <Form translate="yes">
                    <FormGroup
                    // className={errors.FullName && touched.FullName && 'yt-form-err'}
                    >
                      <img
                        alt="User Profile Image"
                        src={require('./images/userprofile-icn.png')}
                        className={
                          errors.FullName && touched.FullName
                            ? ' yt-login-icn2'
                            : 'yt-login-icn'
                        }
                      />
                      <Field
                        name="FullName"
                        type="text"
                        id="FullName"
                        placeholder='Full Name'
                        className={
                          'form-control' +
                          (errors.FullName && touched.FullName
                            ? ' is-invalid invalid'
                            : '')
                        }
                      />
                      <span
                        id="yt-signup-name-error"
                        className="yt-sign-up-message-show"
                      />
                      {touched.FullName && errors.FullName && (
                        <span
                          className="invalid-feedback"
                          style={{ position: 'absolute' }}
                        >
                          {errors.FullName}
                        </span>
                      )}
                    </FormGroup>
                    <FormGroup
                    // className={errors.Email && touched.Email && 'yt-form-err'}
                    >
                      <img
                        alt="Email Icon"
                        src={require('./images/emal-icn.png')}
                        className={
                          errors.Email && touched.Email
                            ? ' yt-login-icn2'
                            : 'yt-login-icn'
                        }
                      />
                      <Field
                        name="Email"
                        type="text"
                        placeholder='Email'
                        className={
                          'form-control' +
                          (errors.Email && touched.Email
                            ? ' is-invalid invalid'
                            : '')
                        }
                      />

                      {touched.Email && errors.Email &&
                        (
                          <span
                            className="invalid-feedback"
                            style={{ position: 'absolute' }}
                          >
                            {errors.Email}
                          </span>
                        )
                      }
                    </FormGroup>
                    <FormGroup
                    // className={errors.Email && touched.Email && 'yt-form-err'}
                    >
                      <img
                        alt="Phone Icon"
                        src={require('./images/number-icn-min.png')}
                        className={
                          errors.Email && touched.Email
                            ? ' yt-login-icn2'
                            : 'yt-login-icn'
                        }
                      />
                      <Field
                        name="fullPhoneNumber"
                        type="text"
                        placeholder='Phone Number'
                        className={
                          'form-control' +
                          (errors.fullPhoneNumber && touched.fullPhoneNumber
                            ? ' is-invalid invalid'
                            : '')
                        }
                      />

                      {touched.fullPhoneNumber && errors.fullPhoneNumber &&
                        (
                          <span
                            className="invalid-feedback"
                            style={{ position: 'absolute' }}
                          >
                            {errors.fullPhoneNumber}
                          </span>
                        )
                      }
                    </FormGroup>

                    <FormGroup
                      // className={'mb-4 ' + errors.password &&touched.password &&'yt-form-err'}
                      className='mb-4'
                    >
                      <img
                        alt="Password Icon"
                        //@ts-ignore
                        id={this.props?.isOpenPopUp ? 'passwordkey' : ''}
                        src={require('./images/key-icn.png')}
                        className={errors.password && touched.password
                          ? 'yt-login-icn2'
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
                          (errors.password && touched.password ? ' is-invalid' : '')
                        }
                      />
                      <br />
                      {touched.password && errors.password ? (
                        this.state.showPass ? (
                          <FaEyeSlash
                            onClick={this.showPassword}
                            className="yt-login-pass-vie-icn"
                            //@ts-ignore
                            id={this.props?.isOpenPopUp ? 'eyeicon' : ''}
                            style={{ marginRight: 20 }}
                          />
                        ) : (
                          <FaEye
                            onClick={this.showPassword}
                            className="yt-login-pass-vie-icn"
                            //@ts-ignore
                            id={this.props?.isOpenPopUp ? 'eyeicon' : ''}
                            style={{ marginRight: 20 }}
                          />
                        )
                      ) : this.state.showPass ? (
                        <FaEyeSlash
                          onClick={this.showPassword}
                          className="yt-login-pass-vie-icn"
                          //@ts-ignore
                          id={this.props?.isOpenPopUp ? 'eyeicon' : ''}
                        />
                      ) : (
                        <FaEye
                          onClick={this.showPassword}
                          className="yt-login-pass-vie-icn"
                          //@ts-ignore
                          id={this.props?.isOpenPopUp ? 'eyeicon' : ''}
                        />
                      )
                      }
                      <span
                        className="yt-signup-pass-info pb-1"
                        //@ts-ignore
                        style={this.props?.isOpenPopUp ?
                          {
                            opacity: touched.password && errors.password ? 0 : 1,
                            display: 'block'
                          } :

                          {
                            opacity: touched.password && errors.password ? 0 : 1,
                          }
                        }
                      >
                        {content.passwordSuggestionMsg}
                      </span>
                      {touched.password && errors.password && (
                        <span
                          className="invalid-feedback pb-1"
                          style={{ position: 'absolute' }}
                        >
                          {errors.password}
                        </span>
                      )}
                    </FormGroup>
                    {this.state.emailErr.length > 0 ? (
                      <span className="err_invalid">
                        {this.state.emailErr}
                        <br />
                      </span>
                    ) : (
                      <></>
                    )}

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
                          type="submit"
                          className="signup-btn"
                          color="secondary yt-signup-btn mt-5"
                          block
                          class="w3-ripple"
                        >
                          {content.signup}
                        </Button>
                      )}
                    </Fragment>
                  </Form>
                );
              }}
            </Formik>
          </div>
          <div className="yt-signup-bottom-info text-center">
            {/* {this.props.isPopup && ( */}
            {true && (
              <div className="my-4text-center">
                <span
                  style={{ cursor: 'pointer' }}
                  className="w3-ripple yt-signup-skip-btn"
                  onClick={() => this.guestRegister()}
                >
                  {content.skipAsGuest}
                </span>
              </div>
            )}
            <p className="yt-signup-via-tag">
              {content.signupVia}
            </p>
            <div className="d-flex align-items-center justify-content-center">
              <Button
                // onClick={this.signUPnWithFacebook}
                onClick={() => this.connectFacebook()}
                color="secondary d-flex align-items-center mr-3 yt-signup-via-fb"
              >
                <FaFacebookF className="mr-2" />{' '}
                {content.facebook}
              </Button>
              <Button
                // onClick={this.signUPnWithGoogle}
                onClick={() => this.connectGoogle()}
                color="secondary d-flex align-items-center yt-signup-via-email"
              >
                <FaRegEnvelope className="mr-2" />{' '}
                {content.google}
              </Button>
            </div>
          </div>
          <div className="lp-bottom-links">
            <p className="yt-signup-aggre-tag mb-3 text-center">
              {content.bySigningIn}
            </p>
            <div className="d-flex yt-signup-term-privacy-link justify-content-center">
              <Link to="/help-center/Terms and Conditions">
                {content.termNcondition}
              </Link>
              <span className="mx-2">&</span>
              <Link to="/help-center/Privacy Policy">
                {content.privacyPolicy}
              </Link>
            </div>
          </div>


          {/* showing alert's */}
          {this.state.showAlert ? (
            <>
              <Alert color={this.state.messageType ? this.state.messageType : ''}>
                {this.state.message && this.state.message}
              </Alert>
            </>
          ) : ''}

        </div>
      </>
    );
  }
}

// @ts-ignore
export default withRouter(EmailAccountLoginBlock);