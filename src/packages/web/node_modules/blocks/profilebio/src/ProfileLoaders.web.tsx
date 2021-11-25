//@ts-ignore
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Button } from 'reactstrap';
//@ts-ignore
import content from '../../../components/src/content';
import '../assets/styles/page-loader.scoped.css';

interface Props {
    title: string;
    content: string;
    buttonText: string;
    onButtonPress: any;
};

interface S { };
interface SS { };

class ProfileLoader extends React.Component<Props, S, SS>{
    constructor(props: Props) {
        super(props);
    }
    render() {
        console.log("is loader coming");
        return (
            <>
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
                                        {this.props?.title ? this.props?.title : content.errorOccured}
                                    </h2>
                                    <p className="trans-fl-text mb-0">
                                        {this.props?.content ? this.props?.content : 'Something Went Wrong!!'}
                                    </p>
                                </div>
                                {this.props?.onButtonPress && (
                                    <Button
                                        color="secondary trans-fl-btn py-3 px-5 mt-3"
                                        onClick={this.props?.onButtonPress}
                                    >
                                        {this.props?.buttonText ? this.props?.buttonText : 'Go to Home'}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Container>
                </section>
            </>
        )
    }
};

//@ts-ignore
export default withRouter(ProfileLoader);