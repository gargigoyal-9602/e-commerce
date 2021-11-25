//@ts-nocheck;
import React, { Fragment } from 'react';
import ConnnectedAccountsController, { Props, configJSON } from './ConnectedAccountsController.web';
import { closeIcon, fbIcon, GoogleIcon, closeImg } from './assets';
import { Row, Col, Button, Modal, ModalFooter, ModalBody, Form, FormGroup, Alert, ModalHeader } from 'reactstrap';
import '../assets/styles/styles.css';
import '../assets/styles/single-order.scoped.css';
import '../assets/styles/connectedAccounts.css';
import firebase from 'firebase';
import Loader from "../../../components/src/Loader.web";

// @ts-ignore
import content from "../../../components/src/content";


export default class ConnectedAccounts extends ConnnectedAccountsController {
  constructor(props: Props) {
    super(props);
  };
  async componentDidMount() {
    const localData = await localStorage.getItem('user');
    const tpoken = await localStorage.getItem('token');
    if (localData && tpoken) {
      this.setState({
        ...this.state,
        userToken: tpoken,
        userData: JSON.parse(localData)
      });
      await this.getAllSocialAccountsList();
    }
    if (!firebase.apps.length) {
      // firebase.initializeApp(config);
      firebase.initializeApp({
        apiKey: 'AIzaSyCp4CXWD1k7C83aDqbBjqupWcgXib1xTuo',
        authDomain: 'studio-store-eb05b.firebaseapp.com',
      });
    }
    // firebase.initializeApp({
    //   apiKey: 'AIzaSyCp4CXWD1k7C83aDqbBjqupWcgXib1xTuo',
    //   authDomain: 'studio-store-eb05b.firebaseapp.com',
    // });
    firebase.auth().onAuthStateChanged(result => {
      this.setState({
        ...this.state,
        socialAccountResult: result
      })
    });
  };
  closeModal = () => {
    this.setState({
      ...this.state,
      isModalOpen: false,
      modalTitle: '',
      modalContent: '',
    })
  };
  public shouldComponentUpdate(a: any, b: any) {
    if (b.showAlert) {
      //console.log("HI ");
      setTimeout(() => {
        this.setState({
          showAlert: false,
        })
      }, 3000);
      return true
    } else {
      return true
    }
  };

  render() {
    return (
      <>
        {this.state.loading && <Loader loading={this.state.loading} />}
        <div className="profile-pg-inner-wrap bg-white radius-10 profile-pg-mb-30">
          <div className="profile-pg-inner-wrapper">
            <div className="pp-ca-main-wrap">
              <ul className="m-0 p-0 pp-ca-list-none pp-ca-listing" style={{ listStyle: 'none' }}>
                <li
                // className={classnames({ active: this.state.isFacebookConnceted === true })}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div
                      style={this.state.isFacebookConnceted ? {} : { cursor: 'pointer' }}
                      className={
                        'pp-ca-type d-flex align-items-center' +
                        (this.state.isFacebookConnceted ? '' : 'w3-ripple')
                      }
                      onClick={this.state.isFacebookConnceted ? undefined : this.connectFacebook}
                    >
                      <img
                        src={fbIcon}
                        width="35"
                        height="35"
                        className="img-fluid mr-3"
                      />
                      <div className="pp-ca-name d-flex align-items-center flex-wrap">
                        {this.state.isFacebookConnceted === true ? (
                          <Fragment>
                            <span className="pp-ca-tag-name  mb-2 socialAccountSubTitle">
                              {content.connectedAs}
                            </span>
                            <h2 className="pp-ca-user-name mt-0 mb-0 w-100 socialAccountTitle">
                              {this.state.fbId && this.state.facebookUserName ? this.state.facebookUserName : ''}
                            </h2>
                          </Fragment>
                        ) : (
                          <h2 className="pp-ca-user-name mt-0 mb-0 socialAccountTitle">
                            {content.connectfacebook}
                          </h2>
                        )}
                      </div>
                    </div>
                    <div className="pp-ca-remove">
                      {this.state.isFacebookConnceted === true ? (
                        <img
                          src={closeIcon}
                          width="20"
                          height="20"
                          className="img-fluid w3-ripple"
                          onClick={() => this.setState({
                            ...this.state,
                            isModalOpen: true,
                            modalTitle: 'Facebook',
                            modalContent: 'facebook',
                            modalId: this.state.fbId && this.state.fbId
                          })}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </li>
                <div style={{ border: 'solid 1px #e2e2e2', marginTop: 10, marginBottom: 10 }}></div>
                <li
                // className={classnames({ active: isGoogleConnected === true })}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div
                      style={this.state.isGoogleCoonected ? {} : { cursor: 'pointer' }}
                      className={
                        'pp-ca-type d-flex align-items-center' +
                        (this.state.isGoogleCoonected ? '' : 'w3-ripple')
                      }
                      onClick={this.state.isGoogleCoonected ? undefined : this.connectGoogle}
                    >
                      <img
                        src={GoogleIcon}
                        width="35"
                        height="35"
                        className="img-fluid mr-3"
                      />
                      <div className="pp-ca-name d-flex align-items-center flex-wrap">
                        {this.state.isGoogleCoonected === true ? (
                          <Fragment>
                            <span className="pp-ca-tag-name  mb-2 socialAccountSubTitle">
                              {content.connectedAs}
                            </span>
                            <h2 className="pp-ca-user-name mt-0 mb-0 w-100 socialAccountTitle">
                              {this.state.googleId && this.state.googleUserName ? this.state.googleUserName : ''}
                              {/* {this.state.googleSocialAccountResult && this.state.googleSocialAccountResult.user && this.state.googleSocialAccountResult.user.displayName} */}
                            </h2>
                          </Fragment>
                        ) : (
                          <h2 className="pp-ca-user-name mt-0 mb-0 socialAccountTitle ">
                            {content.connectGoogle}
                          </h2>
                        )}
                      </div>
                    </div>
                    <div className="pp-ca-remove">
                      {this.state.isGoogleCoonected === true ? (
                        <img
                          src={closeIcon}
                          width="20"
                          height="20"
                          className="img-fluid w3-ripple"
                          onClick={() => this.setState({
                            ...this.state,
                            isModalOpen: true,
                            modalTitle: 'Google',
                            modalContent: 'google',
                            modalId: this.state.googleId && this.state.googleId,
                          })}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </li>

                {/*
            <li className={classnames({ active: activeTab === "3" })}>
              <div class="d-flex justify-content-between align-items-center">
                <div class="pp-ca-type d-flex align-items-center">
                  <img
                    src={require("./images/ig-icn-pp.png")}
                    width="35"
                    height="35"
                    class="img-fluid mr-3"
                  />
                  <div class="pp-ca-name d-flex align-items-center">
                    {activeTab === "3" ? (
                      <span class="pp-ca-tag-name  mb-2">Connected as</span>
                    ) : (
                        ""
                      )}
                    <h2 class="pp-ca-user-name mt-0 mb-0">Connect Instagram Account</h2>
                  </div>
                </div>
                <div class="pp-ca-remove">
                  {activeTab === "3" ? (
                    <img
                      src={require("./images/remove-icn.png")}
                      width="20"
                      height="20"
                      class="img-fluid"
                      onClick={() => {
                        DissconnectAccount("1", "FB");
                      }}
                    />
                  ) : (
                      ""
                    )}
                </div>
              </div>
            </li>
          */}
              </ul>

            </div>
          </div>

          {/* Modal Open */}
          <Modal className="cm-small-modal-4" modalClassName="popopop" isOpen={this.state.isModalOpen} toggle={() => this.closeModal()} centered={true}>
            <ModalHeader className="dis-acc-title-bar  border-0" toggle={() => this.closeModal()}>
              <span>{content.disconnect}{' '}{this.state.modalTitle}</span>
            </ModalHeader>
            <ModalBody className="py-4">
              <div className="text-center dis-acc-body-text px-4 pt-4">
                Are you sure you want to disconnect your{' '}{this.state.modalContent}{' '}account from Studio Store?
            </div>
            </ModalBody>
            <ModalFooter className="dis-acc-bottom-bar p-1 border-1 d-flex justify-content-between">
              <Button color="secondary pp-dis-acc-btn-modal p-3 pp-dis-acc-btn-light-grey" onClick={() => this.closeModal()}>{content.cancel}</Button>
              <span className="yt-form-spacer" />
              <Button color="secondary pp-dis-acc-btn-modal p-3 pp-dis-acc-btn-dark-grey" onClick={() => this.deActivateSocialAccount()}>{content.disconnect}</Button>
            </ModalFooter>
          </Modal>
          {/* <Modal isOpen={this.state.isModalOpen} toggle={() => this.closeModal()} centered={true}>
          <ModalBody>
            <div>
              <img src={closeImg} alt='' onClick={() => this.closeModal()} style={{ position: 'relative', left: 210 }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className='modal-title'>{content.disconnect}{' '}{this.state.modalTitle}</span>
              <br />
              <span className='spanText'>
                Are you sure you want to disconnect your{' '}{this.state.modalContent}{' '}account from Studio Store?
                          </span>
              <br />
            </div>
            <div style={{ border: 'solid 1px #dbdbdb' }}></div>
            <div style={{ position: 'relative', top: 10 }}>
              <Form>
                <Row form>
                  <Col md={6} style={{ textAlign: 'center' }}>
                    <FormGroup>
                      <Button color="link" style={{ width: 'auto' }} className='modal-btnCancel' onClick={() => this.closeModal()}>Cancel</Button>
                    </FormGroup>
                  </Col>
                  <div style={{ border: 'solid 1px #dbdbdb' }}></div>
                  <Col md={3} style={{ textAlign: 'center' }}>
                    <FormGroup >
                      <Button color="link" className='modal-btnSubmit' style={{ width: '130%', position: 'relative', left: 30 }} onClick={() => this.deActivateSocialAccount()}>{content.disconnect}</Button>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </div>
          </ModalBody>
        </Modal> */}
          {/* Modal close */}


          {/* Alert Start */}
          {
            this.state.showAlert ?
              <Alert color={this.state.alertType && this.state.alertType} style={{ position: 'absolute', left: 400, top: 0 }}>
                {this.state.alertMessage && this.state.alertMessage}
              </Alert>
              :
              ''
          }
          {/* Alert End */}
        </div >
      </>
    )
  }
};