//@ts-nocheck
import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'reactstrap';
import { Formik } from 'formik';
import * as yup from "yup";
import SuccessBlock from './SuccessBlock.web';
import { CgSpinner } from 'react-icons/cg';
import ContactusController from "./ContactusController.web";
import Header from "../../../../components/src/AppHeader/";
import Footer from "../../../../components/src/AppFooter";
import Loader from "../../../../components/src/Loader.web";
import "./css/styles.css";


const ContactusSchema = yup.object().shape({
  name: yup.string().min(3, 'Minimum 3 characters are required').max(20, 'Maximum 20 characters are allowed.')
    .matches(/^[a-zA-Z ]+$/, 'Only letters are allowed.').required('Name is required.'),
  email: yup.string().email('Please enter a valid email address.').required('Email is required.'),
  phone: yup.number().transform((value) => (isNaN(value) ? undefined : value))
    .typeError('Only numbers are allowed.').positive('Negative numbers are not allowed.')
    .integer("Phone can't contain a decimal.").min(1000000000, 'Minimum 10 digits are required.')
    .max(9999999999, 'Maximum 10 digits are allowed.').required('Phone is required.'),
  title: yup.string().required('Purpose is required.'),
  message: yup.string().typeError('Message is required.').required('Message is required.'),
});

// @ts-ignore
function FieldError({ error, touched }) {
  return error && touched ? (
    <div style={{ color: '#e65e52' }}>{error}</div>
  ) : null;
};

class Contactus extends ContactusController {
  async componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({
      userDetails: JSON.parse(localStorage.getItem('user'))
    })
    // const token = await localStorage.getItem('token');
    // if (!token) {
    //   //@ts-ignore
    //   window.notify([{ type: "info", message: "Please Login to Submit the Contact Form !" }]);
    //   setTimeout(
    //     () => this.props?.history?.push('/'),
    //     1500
    //   );
    // }
  }
  render() {
    console.log(this.state?.userDetails?.attributes?.full_name, "sdhgfjgdkjgbfdgbfd", this.state.userDetails)
    return (
      <>
        {this.state.loading && <Loader loading={this.state.loading} />}
        {
          !this.state.messageSent &&
          <section className="contactform yt-main-contact-us-pg">
            <Container>
              <div className="yt-cm-mobile-bread">
                <div className="pageroute profile-pg-breadcrumbs">
                  <span className="profile-pg-home"
                    onClick={() => {
                      this.props?.history?.push('/home-page')
                    }}
                  >Home {'>'}</span>{' '}
                  <span className="">Contact Us</span>
                </div>
              </div>
              <div className="yt-main-wrapper2">
                <div className="title">Contact us</div>
                <Formik
                  initialValues={{
                    name: this.state?.userDetails?.attributes?.full_name || '',
                    email: this.state?.userDetails?.attributes?.email || '',
                    phone: this.state?.userDetails?.attributes?.full_phone_number || '',
                    title: '',
                    message: ''
                  }}
                  onSubmit={(values, { resetForm }) => {
                    this.submitContactusForm(values);
                    resetForm({ values: '' });
                    //@ts-ignore
                    window.scrollTo(0, 0)
                  }}
                  validationSchema={ContactusSchema}
                >
                  {({
                    values,
                    handleChange,
                    errors,
                    setFieldTouched,
                    touched,
                    handleSubmit,
                  }) => {
                    return (
                      <Fragment>
                        <Form onSubmit={handleSubmit}>
                          <div className="form group contact-border">
                            <Row>
                              <Col xs={12} md={6}>
                                <div className="group">
                                  <input
                                    type="text"
                                    required
                                    name={'name'}
                                    onChange={handleChange}
                                    onBlur={() => setFieldTouched('name')}
                                    value={values.name}
                                  />
                                  <span className="highlight" />
                                  <span className="bar" />
                                  <label>Name</label>
                                  <FieldError
                                    error={errors.name}
                                    touched={touched.name}
                                  />
                                </div>
                              </Col>
                              <Col xs={12} md={6}>
                                <div className="group">
                                  <input
                                    type="text"
                                    required
                                    name={'email'}
                                    onChange={handleChange}
                                    onBlur={() => setFieldTouched('email')}
                                    value={values.email}
                                  />
                                  <span className="highlight" />
                                  <span className="bar" />
                                  <label>Email</label>
                                  <FieldError
                                    error={errors.email}
                                    touched={touched.email}
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={12} md={6}>
                                <div className="group">
                                  <input
                                    type="number"
                                    required
                                    name={'phone'}
                                    onChange={handleChange}
                                    onBlur={() => setFieldTouched('phone')}
                                    value={values.phone}
                                  />
                                  <span className="highlight" />
                                  <span className="bar" />
                                  <label>
                                    Phone Number
                                  </label>
                                  <FieldError
                                    error={errors.phone}
                                    touched={touched.phone}
                                  />
                                </div>
                              </Col>
                              <Col xs={12} md={6}>
                                <div className="group">
                                  <input
                                    type="text"
                                    required
                                    name={'title'}
                                    onChange={handleChange}
                                    onBlur={() => setFieldTouched('title')}
                                    value={values.title}
                                  />
                                  <span className="highlight" />
                                  <span className="bar" />
                                  <label>
                                    Purpose of Contact
                                  </label>
                                  <FieldError
                                    error={errors.title}
                                    touched={touched.title}
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <textarea
                                placeholder='Write your message here...'
                                name={'message'}
                                onChange={handleChange}
                                onBlur={() => setFieldTouched('message')}
                                value={values.message}
                              />
                              <div style={{ padding: '0px 20px' }}>
                                <FieldError
                                  error={errors.message}
                                  touched={touched.message}
                                />
                              </div>
                            </Row>
                            {!this.state.sending ? (
                              <Button
                                color="secondary yt-contact-send-btn"
                                type="submit"
                                disabled={localStorage.getItem('token') == null ? true : false}
                              >
                                Send
                              </Button>
                            ) : (
                              <div
                                className="yt-contact-send-btn"
                                style={{ backgroundColor: 'transparent' }}
                              >
                                <CgSpinner
                                  style={{ color: 'black', fontSize: 32 }}
                                  className="w3-spin"
                                />
                              </div>
                            )}
                          </div>
                        </Form>
                      </Fragment>
                    );
                  }}
                </Formik>
              </div>
            </Container>
          </section>
        }
        {
          this.state.messageSent && (
            <SuccessBlock title='Message Sent Successfully' message='We will connect with you soon regarding your query.' />
          )
        }
      </>
    )
  }
}

export default withRouter(Contactus);