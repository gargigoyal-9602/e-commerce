//@ts-nocheck
import React from "react";
import { Container, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import SuccessBlockController, { Props } from "./SuccessBlockController.web";
import "../../assets/css/success-block.scoped.css";

class ContactusSuccess extends SuccessBlockController {
  render() {
    return (
      <section>
        <Container>
          <div className="orderplc-pg-inner-wrap p-4 bg-white radius-10 orderplc-pg-mb-80 mt-5 conatct">
            <div className="orderplc-pg-success-main-wrap text-center py-5 ">
              <img
                src={require('../../assets/images/CheckMark.png')}
                className="img-fluid yt-order-placed-icn"
                width="170"
                height="212"
              />
              <div className="orderplc-wrap my-5 head">
                <h2 className="orderplc-ttll my-3 ">{this.props.title}</h2>
                <p className="orderplc-text1 mb-0">{this.props.message}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  color="secondary orderplc-btn py-3 px-2 mt-2 mx-3"
                  onClick={() => this.props?.history?.push('/filterOptions')}
                >
                  Go To Shop
                </Button>
                <Button
                  color="secondary orderplc-btn py-3 px-2 mt-2 mx-3"
                  onClick={() => {
                    this.props?.history?.push('/home-page')
                  }}
                >
                  Go To Home
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    )
  }
};

export default withRouter(ContactusSuccess);