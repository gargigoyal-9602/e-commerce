import React, { useMemo, useState } from 'react';
// @ts-ignore
import Cards from 'react-credit-cards';
import axios from "axios";

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js';
import { Row, Col } from 'reactstrap';
import "./css/stripe-payment.css";

const useOptions = () => {
  // @ts-ignore
  const options = useMemo(() => ({
    style: {
      base: {
        fontSize: 16,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  }));

  return options;
};

const StripPayment = (props: any) => {
  const {
    handleSubmit
  } = props;

  const [expiry, setExpiry] = useState("11/22");
  const [cvc, setCvc] = useState("123");
  const [number, setName] = useState("1234123412341234");
  const [focus, setFocus] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  
  // @ts-ignore
  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <>
      <Row>
        <Col xl="4" lg="4" md="12" sm="12" xs="12">
          <div className="card-details">
            <Cards
              cvc={cvc}
              expiry={expiry}
              focused={focus}
              name={userData?.name ? userData.name : "User Name"}
              number={number}
            />
          </div>
        </Col>
        <Col xl="8" lg="8" md="12" sm="12" xs="12">
          <div className="stripe-form">
            <form onSubmit={(event) => handleSubmit(event, stripe, elements)}>
              <Row className="mb-3">
                <Col>
                  <div className="card-details">
                    Card Details
                </div>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={3}>
                  <label className="stripe-label">Card number</label>
                </Col>
                <Col md={9}>
                  <CardNumberElement
                    // @ts-ignore
                    options={options}
                    onReady={() => {
                      console.log('CardNumberElement [ready]');
                    }}
                    onChange={(event:any) => {
                      console.log('CardNumberElement [change]', event,
                      //@ts-ignore
                      window.notify([{type:'danger',message:event?.error?.message}]),);
                    }}
                    onBlur={() => {
                      console.log('CardNumberElement [blur]');
                    }}
                    onFocus={() => {
                      console.log('CardNumberElement [focus]');
                    }}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={3}>
                  <label className="stripe-label">Expiration date</label>
                </Col>
                <Col md={9}>
                  <CardExpiryElement
                    // @ts-ignore
                    options={options}
                    onReady={() => {
                      console.log('CardNumberElement [ready]');
                    }}
                    onChange={(event:any) => {
                      console.log('CardNumberElement [change]', event,
                      //@ts-ignore
                      window.notify([{type:'danger',message:event?.error?.message}]),
                      );
                    }}
                    onBlur={() => {
                      console.log('CardNumberElement [blur]');
                    }}
                    onFocus={() => {
                      console.log('CardNumberElement [focus]');
                    }}
                    className="card-expiration"
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={3}>
                  <label className="stripe-label">CVC</label>
                </Col>
                <Col md={9}>
                  <CardCvcElement
                    // @ts-ignore
                    options={options}
                    onReady={() => {
                      console.log('CardNumberElement [ready]');
                    }}
                    onChange={(event:any) => {
                      console.log('CardNumberElement [change]', event,
                      //@ts-ignore
                      window.notify([{type:'danger',message:event?.error?.message}]),
                      );
                    }}
                    onBlur={() => {
                      console.log('CardNumberElement [blur]');
                    }}
                    onFocus={() => {
                      console.log('CardNumberElement [focus]');
                    }}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <div className=" stripe-btn text-right pr-5">
                    <button className="btn btn-primary btn-lg mt-5" type="submit" disabled={!stripe}>
                      Proceed to Pay
            </button>
                  </div>
                </Col>
              </Row>
            </form>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default StripPayment;
