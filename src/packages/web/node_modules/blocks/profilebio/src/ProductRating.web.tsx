import React, { Fragment } from "react";
import * as yup from "yup";
import { useMediaQuery } from 'react-responsive'
// @ts-ignore
import ReactStars from "react-rating-stars-component";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import "../assets/styles/product-rating.scoped.css";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { Formik } from 'formik';
// Customizable Area End

import ProductRatingController, {
  Props
} from "./ProductRatingController.web";

// @ts-ignore
import content from "../../../components/src/content";

const ProductSchema =  yup.object().shape({
  rating: yup
  .number()
  .required("Rating is required.")      ,
  comment: yup
  .string()
  .typeError("Comment is required."),
});
class ProductRating extends ProductRatingController {

  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    const {
      reviewData: { orderId, orderItemId, reviewId, reviewText, reviewRating },
      toggle,
      isOpen,
      onSuccess
    } = this.props;

    // const isTabletOrMobile = useMediaQuery({
    //   query: '(max-width: 767.88px)'
    // });
    var StarColor = '#D4C96D';
    // if (isTabletOrMobile) {
    //   StarColor = '#3BC490';
    // }
    const canReview = true;

    const secondExample = {
      size: 40,
      count: 5,
      color: "#DBDBDB",
      activeColor: StarColor,
      value: reviewRating || 5,
      a11y: true,
      isHalf: false,
      emptyIcon: <BsStarFill className="m-1" />,
      halfIcon: <BsStarHalf className="m-1" />,
      filledIcon: <BsStarFill className="m-1" />,
      onChange: this.setRating,
    };

    return (
      <div>
        <Formik
          initialValues={{ rating: reviewRating || 5, comment: reviewText || "" }}
          onSubmit={this.onSubmit}
          validationSchema={ProductSchema}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit, setFieldValue }) => (
            <Fragment>
              <Modal isOpen={isOpen} toggle={toggle} className={`cm-small-modal-4`} centered={true}>
                <ModalHeader toggle={toggle} className="pr-title-bar border-0">
                  <span>{content.rateNReview}</span>
                </ModalHeader>
                {canReview ?
                  <ModalBody className="cm-modal-body">
                    <h3 className="pr-body-title">{content.rateOurProduct}</h3>
                    <ReactStars
                      {...secondExample}
                      classNames="yt-rating-wrapper"
                      onChange={(val: any) => setFieldValue("rating", val)}
                    />
                    <Form>
                      <FormGroup>
                        <Input
                          type="hidden"
                          name="ProductStar"
                          id="ProductStar"
                          value={this.state.rating}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Input
                          type="textarea"
                          name="product-review-description"
                          id="product-review-description"
                          placeholder="Write detailed review for us .."
                          className="p-3"
                          value={values.comment}
                          onChange={(e) => setFieldValue("comment", e.target.value)}
                        />
                        {(errors.comment && touched.comment) &&
                          <div style={{ color: "#e65e52" }}>
                            {errors.comment}
                          </div>
                        }
                      </FormGroup>
                    </Form>
                  </ModalBody>
                  :
                  <ModalBody className="cm-modal-body">
                    <h3 className="pr-body-title">{content.youCannotReview}</h3>
                  </ModalBody>
                }
                <ModalFooter className="pr-bottom-bar p-0">
                  {canReview ?
                    <Button
                      color="secondary pr-rate-submit-btn bg-white py-3"
                      // @ts-ignore
                      onClick={handleSubmit}
                      block
                    >
                      {content.submit}
                    </Button>
                    :
                    <Button
                      color="secondary pr-rate-submit-btn bg-white py-3"
                      onClick={toggle}
                      block
                    >
                      {content.ok}
                    </Button>
                  }
                </ModalFooter>
              </Modal>
            </Fragment>
          )}
        </Formik>
      </div>
    );
  }
}
// @ts-ignore
export default ProductRating;
// Customizable Area Start

// Customizable Area End