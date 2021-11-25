import React from 'react';
import { Button, FormGroup } from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import * as Yup from "yup";
import { CgSpinner } from 'react-icons/cg';
import { withRouter } from 'react-router-dom';

// Customizable Area Start
// Customizable Area End

import NewPasswordController, {
  Props
} from "./NewPasswordController";
// @ts-ignore
import content from "../../../../components/src/content";

import './css/index.scoped.css';

const Schema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Too Short")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Password must contain atleast a capital letter, a lowercase letter, a number and a special character').required('Password is Required')
    .required("Required"),
  confirmpassword: Yup.string()
    .when("password", {
      is: val => (val && val.length > 0),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        'Passwords must match'
      )
    })
    .required("Required")
})

class NewPassword extends NewPasswordController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    return (
      <div className="yt-fp-form">
        {this.state.message != '' ? <span className="pass_success">{this.state.message}</span> : <></>}
        <Formik
          initialValues={{ password: '', confirmpassword: '' }}
          onSubmit={this.setNewPass}
          validationSchema={Schema}
        >
          {({ errors, touched }) => {
            if (
              (touched.password && errors.password) ||
              (touched.confirmpassword && errors.confirmpassword)
            ) {
              // setInvalidPass('');

            }

            return (
              <Form
                translate="yes"
                className={
                  'yt-new-pass-form-wrap ' +
                  (touched.password && errors.password ? 'yt-form-wrap-err' : '')
                }
              >
                <FormGroup
                  className={
                    'mb-0 ' +
                    (touched.password && errors.password ? 'yt-form-err' : '')
                  }
                >
                  <img
                    alt="Password Icon"
                    src={require('./images/key-icn.png')}
                    className={'yt-fp-icn'}
                  />
                  <Field
                    name="password"
                    type={this.state.showPass ? 'text' : 'password'}
                    id="password"
                    placeholder='New Password'
                    className={
                      'form-control' +
                      (errors.password && touched.password
                        ? ' is-invalid invalid-input'
                        : '')
                    }
                  />
                  {touched.password && errors.password ? (
                    this.state.showPass ? (
                      <FaEyeSlash
                        onClick={this.showPassword}
                        className={'yt-forgot-pass-vie-icn'}
                        style={{ marginRight: 20 }}
                      />
                    ) : (
                      <FaEye
                        onClick={this.showPassword}
                        className={'yt-forgot-pass-vie-icn'}
                        style={{ marginRight: 20 }}
                      />
                    )
                  ) : this.state.showPass ? (
                    <FaEyeSlash
                      onClick={this.showPassword}
                      className={'yt-forgot-pass-vie-icn'}
                    />
                  ) : (
                    <FaEye
                      onClick={this.showPassword}
                      className={'yt-forgot-pass-vie-icn'}
                    />
                  )}
                  {touched.password && errors.password && (
                    <span
                      className="invalid-feedback d-block yt-invalid-minimum-pass"
                      style={{ position: 'absolute' }}
                    >
                      {errors.password}
                    </span>
                  )}
                </FormGroup>

                <FormGroup
                  className={
                    'mb-0 ' +
                    (touched.confirmpassword && errors.confirmpassword
                      ? 'yt-form-confirm-err'
                      : '')
                  }
                  style={{ marginTop: '0px' }}
                >
                  <img
                    alt="Password Icon"
                    src={require('./images/key-icn.png')}
                    className={'yt-fp-icn'}
                  />
                  <Field
                    name="confirmpassword"
                    type={this.state.showConfirmPass ? 'text' : 'password'}
                    id="password"
                    placeholder='Confirm Password'
                    className={
                      'form-control' +
                      (errors.confirmpassword && touched.confirmpassword
                        ? ' is-invalid invalid-input'
                        : '')
                    }
                  />
                  {touched.confirmpassword && errors.confirmpassword ? (
                    this.state.showConfirmPass ? (
                      <FaEyeSlash
                        onClick={this.showConfirmPassword}
                        className={'yt-forgot-pass-vie-icn'}
                        style={{ marginRight: 20 }}
                      />
                    ) : (
                      <FaEye
                        onClick={this.showConfirmPassword}
                        className={'yt-forgot-pass-vie-icn'}
                        style={{ marginRight: 20 }}
                      />
                    )
                  ) : this.state.showConfirmPass ? (
                    <FaEyeSlash
                      onClick={this.showConfirmPassword}
                      className={'yt-forgot-pass-vie-icn'}
                    />
                  ) : (
                    <FaEye
                      onClick={this.showConfirmPassword}
                      className={'yt-forgot-pass-vie-icn'}
                    />
                  )}
                  {touched.confirmpassword && errors.confirmpassword && (
                    <span
                      className="invalid-feedback d-block yt-confirm-pass-error"
                      style={{ position: 'absolute' }}

                    >
                      {errors.confirmpassword}
                    </span>
                  )}
                  {this.state.invalidPass ? (
                    <span
                      className="invalid yt-invalid-pass-error mt-10"
                      style={{ position: 'absolute' }}
                    >
                      {this.state.invalidPass}
                    </span>
                  ) : (
                    <></>
                  )}
                </FormGroup>
                <span className="yt-etpass-msg mt-10">
                  {content.passwordSuggestionMsg}
                </span>
                {this.state.showSpinner ? (
                  <CgSpinner
                    style={{
                      color: 'black',
                      fontSize: 32,
                      width: '100%',
                      margin: 10,
                      marginTop: '30px',
                    }}
                    className="w3-spin"
                  />
                ) : (
                  <Button
                    type="submit"
                    className="smt-btn"
                    color="secondary yt-login-btn yt-fp-btn"
                    block
                    style={{ marginTop: '30px' }}
                  >
                    {content.updatePassword}
                  </Button>
                )}
              </Form>
            );
          }}
        </Formik>
      </div>
    )
  }
}
// @ts-ignore
export default withRouter(NewPassword);
// Customizable Area Start

// Customizable Area End
