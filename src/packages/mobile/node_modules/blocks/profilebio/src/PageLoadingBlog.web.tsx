import React from "react";
import { withRouter } from "react-router-dom";
import { Container } from "reactstrap";
import '../assets/styles/page-loader.scoped.css';
// @ts-ignore
import content from "../../../components/src/content";

// Customizable Area End
interface Props {
  title: string
}

interface S { }
interface SS { }

class PageLoadingBlog extends React.Component<Props, S, SS> {
  render() {
    return (
      <section>
        <Container>
          <div className="trans-fl-pg-inner-wrap p-4 bg-white radius-10 trans-fl-pg-mb-80 mt-5">
            <div className="cart-pg-empty-main-wrap text-center py-5">
              <img
                src={require("./images/animated_spinner.webp")}
                className="img-fluid yt-transaction-cl-icn"
                width="170"
                height="212"
              />
              <div className="trans-fl-wrap ">
                <h2 className="trans-fl-ttl my-3" style={{ color: "#43b7a7" }}>
                  {this.props.title ? this.props.title : content.errorOccured}
                </h2>
              </div>
            </div>
          </div>
        </Container>
      </section>
    )
  }
}

// @ts-ignore
export default withRouter(PageLoadingBlog)

// Customizable Area Start

// Customizable Area End