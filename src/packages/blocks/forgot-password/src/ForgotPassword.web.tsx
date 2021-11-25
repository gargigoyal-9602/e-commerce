import React, { Fragment } from 'react';
import { Button, Form, FormGroup, Input, Container } from 'reactstrap';
import { CgSpinner } from 'react-icons/cg';
import { RiArrowLeftSLine } from 'react-icons/ri';
import { Link, withRouter } from 'react-router-dom';
// @ts-ignore
import content from '../../../components/src/content.js';
// import content from "../../theme/src/content";
import ForgotPasswordController, { Props } from "./ForgotPasswordController.web";
import '../assets/styles/index.scoped.css';
import NewPassword from "./NewPassword.web";
import Loader from '../../../components/src/Loader.web';
// import Loader from "../../theme/src/Loader.web";
import { emailIcon, pwdIcon, phoneIcon } from './assets';

class ForgotPasswordOTP extends ForgotPasswordController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    render() {

        return (
            <>
                {this.state.loading && <Loader loading={this.state.loading} />}
                <Container>
                    <div className="yt-forgot-pw-wrap yt-fpp-mb-5 yt-fpp-mt-5">
                        <div className="d-flex flex-wrap yt-frgt-row">
                            <div className="yt-fp-inner-content yt-form-col">
                                <div className="yt-fp-wrap">
                                    {this.state.otpToken == '' ? (
                                        <Link to={{
                                            pathname: "/", state: { "calledFrom": "cart", "redirect": "wishlist" }
                                        }}
                                            className="d-flex align-items-end" >
                                            <RiArrowLeftSLine className="mr-2 yt-fp-back-icn" />
                                            <h3 className="yt-fp-top-back-tag-name">
                                                {this.state.emailError == 'success' ? content.otpVerification : content.forgotPassword}
                                            </h3>
                                        </Link>
                                    ) : (
                                        <div className="d-flex">
                                            <h3 className="yt-fp-top-back-tag-name">
                                                {content.createNewPassword}
                                            </h3>
                                        </div>
                                    )}

                                    <h2 className="yt-fp-tag-line">
                                        {content.getStarted}
                                    </h2>
                                    <h2 className="yt-fp-tag-line-2">
                                        {this.state.otpToken == '' ? (
                                            <span>
                                                {this.state.emailError == 'success'
                                                    ? content.otpHasBeenSent
                                                    :
                                                    content.forgotPasswordContentText
                                                }
                                            </span>
                                        ) : (
                                            ''
                                        )}
                                    </h2>
                                    <div className="yt-fp-form">
                                        {this.state.otpToken == '' ? (
                                            <Form onSubmit={this.SendOtpBtn}>
                                                <FormGroup
                                                    className={
                                                        'mb-1 ' +
                                                        (this.state.emailError == 'empty' ||
                                                            this.state.emailError == 'wrong' ||
                                                            this.state.notRegister != ''
                                                            ? 'yt-form-err'
                                                            : '')
                                                    }
                                                >
                                                    <img
                                                        alt="Email Icon"
                                                        src={emailIcon}
                                                        // src={require('./images/emal-icn.png')}
                                                        className={'yt-fp-icn'}
                                                    />
                                                    <Input
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        value={this.state.email}
                                                        ForgotPassFields
                                                        placeholder={'Email'}
                                                        onChange={this.handleEmail}
                                                        className={
                                                            this.state.emailError == '' || this.state.emailError == 'success'
                                                                ? 'normal-input'
                                                                : 'invalid-input'
                                                        }
                                                        invalid={!(this.state.emailError == '' || this.state.emailError == 'success')}
                                                        disabled={this.state.emailError == 'success'}
                                                    />
                                                    <span id="yt-fp-email-error" className="yt-fp-up-message-show" />
                                                    {this.state.emailError == 'empty' ? (
                                                        <span
                                                            className="invalid yt-form-err"
                                                            style={{ position: 'absolute' }}
                                                        >
                                                            {content.invalidEmail}
                                                        </span>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    {this.state.emailError == 'wrong' ? (
                                                        <span
                                                            className="invalid yt-form-err"
                                                            style={{ position: 'absolute' }}
                                                        >
                                                            {content.emailMustBeValid}
                                                        </span>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    {this.state.notRegister ? (
                                                        <span
                                                            className="invalid yt-form-err"
                                                            style={{ position: 'absolute' }}
                                                        >
                                                            {this.state.notRegister}
                                                        </span>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </FormGroup>

                                                {this.state.emailError == 'success' ? (
                                                    <FormGroup
                                                        className={
                                                            'mt-1 ' +
                                                            (this.state.otpError == 'empty' ||
                                                                this.state.otpError == 'invalid' ||
                                                                this.state.otpError == 'invalidResponse'
                                                                ? 'yt-form-err'
                                                                : '')
                                                        }
                                                    >
                                                        <div>
                                                            <img
                                                                alt="Password Icon"
                                                                src={pwdIcon}
                                                                // src={require('./images/key-icn.png')}
                                                                className={'yt-fp-icn'}
                                                            />
                                                            <Input
                                                                type="text"
                                                                name="otp"
                                                                id="otp"
                                                                value={this.state.otp}
                                                                placeholder="OTP"
                                                                onChange={this.handleOTP}
                                                            />
                                                            {/*<FaEye
                                className={
                                  otpError != "" ? "yt-pas-eye-icn2" : "yt-pas-eye-icn"
                                }
                              />*/}
                                                        </div>
                                                        {this.state.otpError == 'empty' ? (
                                                            <span
                                                                className="invalid yt-form-err"
                                                                style={{ position: 'absolute' }}
                                                            >
                                                                {content.pleaseEnterOTP}
                                                            </span>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {this.state.otpError == 'invalid' ? (
                                                            <span
                                                                className="invalid yt-form-err"
                                                                style={{ position: 'absolute' }}
                                                            >
                                                                {content.pleaseEnter5DigitOTP}
                                                            </span>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {this.state.otpError == 'invalidResponse' ? (
                                                            <span
                                                                className="invalid yt-form-err"
                                                                style={{ position: 'absolute' }}
                                                            >
                                                                {content.invalidOTP}
                                                            </span>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </FormGroup>
                                                ) : (
                                                    <></>
                                                )}
                                                <div className="mt-4 pt-1 yt-otp-sd-wrap">
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
                                                        <Button type="submit" color="yt-fp-btn mt-1 send-otp-btn" className="smt-btn" block>
                                                            {this.state.emailError === 'success'
                                                                ? 'Verify OTP'
                                                                : 'Send OTP'
                                                            }
                                                        </Button>
                                                    )}
                                                </div>
                                            </Form>
                                        ) : (
                                            <NewPassword
                                            // token={this.state.otpToken}
                                            // onChangeSuccess={this.props.onChangeSuccess}
                                            />
                                        )}
                                    </div>
                                    <Fragment>
                                        {this.state.emailError != 'success' ? (
                                            <div className="yt-forpass-bottom-info text-center">
                                                <span
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => {
                                                        // CacheState.set({ continueAsGuest: true });
                                                        // history.push('/');
                                                        this.guestUserHandler();
                                                        console.log("YOUUU clicked");
                                                    }}
                                                    className="yt-fp-skip-btn"
                                                >
                                                    {content.skipAsGuest}
                                                </span>
                                            </div>
                                        ) : (
                                            <Fragment>
                                                {this.state.otpToken == '' && (
                                                    <div className="yt-forpass-bottom-info text-center">
                                                        <div>
                                                            {this.state.timer > 0 ? (
                                                                <div className="otp-timer">00:{this.state.timer}</div>
                                                            ) : (
                                                                <Button
                                                                    color="link yt-resent-otp-btn"
                                                                    onClick={this.emailConfirm}
                                                                >
                                                                    {content.resendOTP}
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </Fragment>
                                        )}
                                    </Fragment>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </>
        );
    }
}

// @ts-ignore
export default withRouter(ForgotPasswordOTP);
// Customizable Area Start

// Customizable Area End
