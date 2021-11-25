import React from 'react';
import { Container, Button } from 'reactstrap';

import '../assets/css/orderplace.css';

function OrderPlaced(props:any) {
  return (
    <>
      <section>
        <Container>
          <div className="orderplc-pg-inner-wrap p-4 cm-bg-green radius-10 orderplc-pg-mb-80 mt-5">
            <div className="orderplc-pg-success-main-wrap text-center py-5">
              <img
                src={require('../assets/order-placed-icn.png')}
                className="img-fluid yt-order-placed-icn"
                width="170"
                height="212"
              />
              <div className="orderplc-wrap my-5">
                <h2 className="orderplc-ttl my-3">
                  Order Placed Successfully!
                </h2>
                <p className="orderplc-text mb-0">
                    Thank you so much for your order.
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  color="secondary orderplc-btn py-3 px-2 mt-2 mx-3"
                  onClick={() =>
                    {
                      console.log("order");
                      //@ts-ignore
                      props?.history?.push({
                        pathname: '/profilebio',
                        state: { activeTab: 'myorder' }
                      });
                    }
                  }
                >
                  Track Order
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
export default OrderPlaced;
