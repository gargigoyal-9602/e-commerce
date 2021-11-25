import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import '../assets/css/transactionfailed.css';
//@ts-ignore
import { withRouter } from "react-router-dom";

class TransactionFailedComponent extends Component {
  render() {
    return (
      <>
        <section>
          <Container className='transaction-fail'>
            <div className="trans-fl-pg-inner-wrap p-4 radius-10 trans-fl-pg-mb-80 mt-5">
              <div className="cart-pg-empty-main-wrap text-center py-5">
                <img
                  src={require('../assets/transactionfailed-icn.png')}
                  className="img-fluid yt-transaction-cl-icn"
                  width="170"
                  height="212"
                />
                <div className="trans-fl-wrap trans-text-div">
                  <h2 className="trans-fl-ttl my-3">
                    Oh Noes!, Transaction Failed
                  </h2>
                  <p className="trans-fl-text mb-0">
                    Your order was declined!
                  </p>
                </div>
                <Button
                  color="trans-fl-btn py-3 px-5"
                  //@ts-ignore
                  onClick={() => this.props?.history?.push('/cart')}
                >
                  Change the Payment Method
                </Button>
                <div className="mt-2">
                  <Button
                    color="link trans-fl-cancel-btn"
                    //@ts-ignore
                    onClick={() => this.props?.history?.push('/home-page')}
                  >
                    Cancel transaction?
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </>
    );
  }
}

//@ts-ignore
export default withRouter(TransactionFailedComponent);
