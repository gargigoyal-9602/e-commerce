import React, { useState, Component } from 'react';
import { ModalBody, TabContent, TabPane, Modal, ModalHeader } from 'reactstrap';
import classnames from 'classnames';

import EmailAccountLoginBlock from '../../../../blocks/email-account-login/src/EmailAccountLogin.web';
import EmailAccountRegistrationController from '../../../../blocks/email-account-registration/src/EmailRegistartion.web';
import content from '../../../../components/src/content';

import './css/index.css';

class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: '1',
      isOpenPopUp: false
    };
  }
  async componentDidMount() {
    if (this.props?.location?.state?.activeTab) {
      this.setState({
        activeTab: this.props?.location?.state?.activeTab,
        isOpenPopUp: true
      });
      this.toggle(this.props?.location?.state?.activeTab);
    }
    const tokenn = localStorage.getItem('token');
    if (tokenn) {
      this.setState({
        isOpenPopUp: false
      });
    } else {
      this.setState({
        isOpenPopUp: true
      });
    }
  }
  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };
  render() {
    console.log(
      this.props,
      'props',
      this.state,
      'thisLoginProps',
      this.state.isOpenPopUp
    );
    return (
      <>
        <div style={{ marginTop: 15 }}>
          {this.state.isOpenPopUp ? (
            <Modal isOpen={this.state.isOpenPopUp}>
              <ModalBody>
                <div className="yt-login-wrap yt-lp-mb-5 yt-lp-mt-4">
                  <div className="d-flex flex-wrap yt-login-row">
                    <div className="yt-login-inner-content yt-login-col yt-login-form-wrapper">
                      <ul className="p-0 m-0 yt-login-list-style-none lp-tabs-name d-flex">
                        <li
                          className={classnames({
                            active: this.state.activeTab === '1'
                          })}
                          onClick={() => {
                            this.toggle('1');
                          }}
                        >
                          {content.signup}
                        </li>
                        <li
                          className={classnames({
                            active: this.state.activeTab === '2'
                          })}
                          onClick={() => {
                            this.toggle('2');
                          }}
                        >
                          {content.login}
                        </li>
                      </ul>
                      <div className="yt-lptab-content">
                        <TabContent activeTab={this.state.activeTab}>
                          <TabPane tabId="1">
                            <EmailAccountRegistrationController
                              isOpenPopUp={this.state.isOpenPopUp}
                            />
                          </TabPane>
                        </TabContent>
                        <TabContent activeTab={this.state.activeTab}>
                          <TabPane tabId="2">
                            <EmailAccountLoginBlock />
                          </TabPane>
                        </TabContent>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
            </Modal>
          ) : (
            <div className="yt-login-wrap yt-lp-mb-5 yt-lp-mt-4">
              <div className="d-flex flex-wrap yt-login-row">
                <div className="yt-login-inner-content yt-login-col yt-login-form-wrapper">
                  <ul className="p-0 m-0 yt-login-list-style-none lp-tabs-name d-flex">
                    <li
                      className={classnames({
                        active: this.state.activeTab === '1'
                      })}
                      onClick={() => {
                        this.toggle('1');
                      }}
                    >
                      {content.signup}
                    </li>
                    <li
                      className={classnames({
                        active: this.state.activeTab === '2'
                      })}
                      onClick={() => {
                        this.toggle('2');
                      }}
                    >
                      {content.login}
                    </li>
                  </ul>
                  <div className="yt-lptab-content">
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <EmailAccountRegistrationController />
                      </TabPane>
                    </TabContent>
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="2">
                        <EmailAccountLoginBlock />
                      </TabPane>
                    </TabContent>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

// const LoginScreen = () => {
//   const [activeTab, setActiveTab] = useState('1');
//   const toggle = tab => {
//     if (activeTab !== tab) setActiveTab(tab);
//   };

//   return (
//     <>
//       <Header />
//       <div>
//         <div className="yt-login-wrap yt-lp-mb-5 yt-lp-mt-4">
//           <div className="d-flex flex-wrap yt-login-row">
//             <div className="yt-login-inner-content yt-login-col yt-login-form-wrapper">
//               <ul className="p-0 m-0 yt-login-list-style-none lp-tabs-name d-flex">
//                 <li
//                   className={classnames({ active: activeTab === '1' })}
//                   onClick={() => {
//                     toggle('1');
//                   }}
//                 >
//                   Log In
//                 </li>
//                 <li
//                   className={classnames({ active: activeTab === '2' })}
//                   onClick={() => {
//                     toggle('2');
//                   }}
//                 >
//                   Sign Up
//                 </li>
//               </ul>
//               <div className="yt-lptab-content">
//                 <TabContent activeTab={activeTab}>
//                   <TabPane tabId="1">
//                     <EmailAccountLoginBlock />
//                   </TabPane>
//                 </TabContent>
//                 <TabContent activeTab={activeTab}>
//                   <TabPane tabId="2">
//                     <EmailAccountRegistrationController />
//                   </TabPane>
//                 </TabContent>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

export default LoginScreen;

// import React, { useState } from "react";
// import { TabContent, TabPane } from 'reactstrap';
// import classnames from "classnames";

// import Header  from "../../../../components/src/AppHeader/index";
// import Footer from "../../../../components/src/AppFooter/index";

// import Login from "./Login";
// import Signup from "./SignUp";
// import "./css/index.css";

// const LoginScreen = () => {
//   const [activeTab, setActiveTab] = useState('1');
//   const toggle = (tab) => {
//     if (activeTab !== tab) setActiveTab(tab);
//   };

//   return (
//     <>
//       <Header />
//       <div>
//         <div className="yt-login-wrap yt-lp-mb-5 yt-lp-mt-4">
//           <div className="d-flex flex-wrap yt-login-row">
//             <div className="yt-login-inner-content yt-login-col yt-login-form-wrapper">
//               <ul className="p-0 m-0 yt-login-list-style-none lp-tabs-name d-flex">
//                 <li
//                   className={classnames({ active: activeTab === '1' })}
//                   onClick={() => {
//                     toggle('1');
//                   }}
//                 >
//                   Log In
//               </li>
//                 <li
//                   className={classnames({ active: activeTab === '2' })}
//                   onClick={() => {
//                     toggle('2');
//                   }}
//                 >
//                   Sign Up
//               </li>
//               </ul>
//               <div className="yt-lptab-content">
//                 <TabContent activeTab={activeTab}>
//                   <TabPane tabId="1">
//                     <Login />
//                   </TabPane>
//                 </TabContent>
//                 <TabContent activeTab={activeTab}>
//                   <TabPane tabId="2">
//                     <Signup />
//                   </TabPane>
//                 </TabContent>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   )
// }

// export default LoginScreen;
