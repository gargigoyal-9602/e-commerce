//@ts-nocheck;
import React, { Fragment,useState } from 'react';
import Ripple from "react-ripples";
import { emptyCheck, checkCheck, closeImg, addressImage } from './assetsWeb';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CheckoutController, { Props, configJSON } from './CheckoutController.web';
//@ts-ignore
import isEmpty from "lodash/isEmpty";
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { 
  Container, 
  Form, 
  FormGroup, 
  FormText, 
  Label, 
  Input, 
  Col, 
  Row, 
  Modal, 
  ModalBody, 
  ModalHeader,
  Button, 
  Alert,
  Table
} from 'reactstrap';
import { Link, withRouter } from "react-router-dom";

import "../assets/css/index.scoped.css";
import "../assets/css/modalAddressField.css";
import "../assets/css/index.css";
import Loader from "../../../components/src/Loader.web";

const addNewAddressSchema = Yup.object({
  isShippingAddressSame: Yup.boolean(),
  address: Yup.object().when('isShippingAddressSame', {
    is: false,
    then: Yup.object({
     name: Yup.string().min(2, 'Name is Too Short').required('Name is Required'),
     flat_no: Yup.string().required('Flat/House/Apartment No. is Required'),
     address: Yup.string().matches(/^[A-Za-z0-9 ]+$/, "Special characters are not allow in Address Line 1").min(3, 'Address Line 1 is Too Short').required('Address Line 1 is Required'),
     address_line_2: Yup.string().matches(/^[A-Za-z0-9 ]+$/, "Special characters are not allow in Address Line 2"),
     city: Yup.string().min(3, 'City is Too Short').required('City is Required'),
     state: Yup.string().required('State is Required'),
     country: Yup.string().min(2, 'Country is Too Short').required('Country is Required'),
     zip_code: Yup.string()
     .matches(/^[A-Za-z0-9 ]+$/, "Special characters are not allow")
     .min(6, 'Pin Code is Minimum 6 digits')
     .max(6, 'Pin Code is Maximum 6 digits')
     .required('Pin Code is Required'),
     phone_number: Yup.number().min(1000000000, 'Phone Number Minimum 10 digits').max(9999999999, 'Phone Number Maximum 10 digits').required('Phone Number is Required')
      }),
  }),
  billing_address:Yup.object().shape({
    name: Yup.string().min(2, 'Name is Too Short').required('Name is Required'),
    flat_no: Yup.string().required('Flat/House/Apartment No. is Required'),
    address: Yup.string().matches(/^[A-Za-z0-9 ]+$/, "Special characters are not allow in Address Line 1").min(3, 'Address Line 1 is Too Short').required('Address Line 1 is Required'),
    address_line_2: Yup.string().matches(/^[A-Za-z0-9 ]+$/, "Special characters are not allow in Address Line 2"),
    city: Yup.string().min(3, 'City is Too Short').required('City is Required'),
    state: Yup.string().required('State is Required'),
    country: Yup.string().min(2, 'Country is Too Short').required('Country is Required'),
    zip_code: Yup.string()
    .matches(/^[A-Za-z0-9 ]+$/, "Special characters are not allow")
    .min(6, 'Pin Code is Minimum 6 digits')
    .max(6, 'Pin Code is Maximum 6 digits')
    .required('Pin Code is Required'),
    phone_number: Yup.number().min(1000000000, 'Phone Number Minimum 10 digits').max(9999999999, 'Phone Number Maximum 10 digits').required('Phone Number is Required')
  })
})


// links to navigate hompage //
function CartBreadCrumbs(props: any) {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <div className="pageroute cart-pg-breadcrumbs my-3">
            <Link to="/home-page">
              <span
                className="cart-pg-home w3-hover-opacity"
                style={{ cursor: "default" }}
              >
                Home
              </span>
            </Link>
            <img src={require('../assets/images/back-arrow.svg')} width='8' height='8' className="mx-2" />
            <span className="cart-pg-current">Checkout</span>
          </div>
        </Col>
      </Row>
      <Row>
      <Col md={12}>
        <h1 className="cart-page-main-title mt-0">
        <FaLongArrowAltLeft className="hcp-back-arrow mr-3" onClick={props.onHandleBack} />
         Secure Checkout
        </h1>
      </Col>
    </Row>
    </Container>
  );
}

// cart Amount //
function CartAmount(props:any) {
  //const variant = props.product?.attributes?.catalogue_variant.attributes;
  const wholeCart =props.wholeCart
  const [couponCode,setCouponCode]=useState("")

  function getProducts() {
    var items:any = [];
    wholeCart && wholeCart.order_items.forEach((item:any,index:any)=>{
      items.push(
         <tr key={index}>
            <td>
              <span className="cart-product-amount-ttl">
               {item.attributes.catalogue.attributes.name}
              </span>
            </td>
            <td>
              <span className="cart-product-amount-qty">
                 x {item.attributes.quantity}
              </span>
            </td>
            <td>
              <span className="cart-product-amount-price">
                {/* @ts-ignore  */}
              {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {parseFloat(item.attributes.total_price).toFixed(2)}
                {/* ???INR {item.attributes.total_price} */}
              </span>
            </td>
        </tr>
      )
    })
          
    return items;
  }


  return (
    wholeCart && ( <div className="radius-10 bg-white yt-cart-price-lister">
      <Table className="mb-0 cart-prodict-amount " borderless>
        <thead>
          <tr>
            <th>Your Cart</th>
            <th>Qty</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>{getProducts()}</tbody>
      </Table>
      <Table className="yt-sub-ttl-tbl-wrap">
        <tbody>
          <tr>
            <td style={{ paddingLeft: 0 }}>
              <span className="cart-product-amount-ttl">
                Sub Total
              </span>
            </td>
            <td style={{ paddingRight: 0 }}>
              <span className="cart-product-amount-price cart-sub-total">
                {/* @ts-ignore  */}
                {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {parseFloat(wholeCart.sub_total).toFixed(2)}
                {/* ???INR {wholeCart.sub_total} */}
              </span>
            </td>
          </tr>
        </tbody>
      </Table>
      <span className="cart-divider" />
      <Table className="mb-0 cart-prodict-total-amount " borderless>
        <tbody>
          <tr>
            <td>
              <span className="cart-product-amount-ttl">
                Taxes
              </span>
            </td>
            <td>
              <span className="cart-product-amount-price">
                {/* @ts-ignore  */}
                + {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {parseFloat(wholeCart.total_tax).toFixed(2)}
                {/* + ???INR {wholeCart.total_tax} */}
              </span>
            </td>
          </tr>
           <tr>
            <td>
              <span className="cart-product-amount-ttl">
               Delivery Charges
                
              </span>
            </td>
            <td>
              <span className="cart-product-amount-price">
                {/* @ts-ignore  */}
                + {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {wholeCart.shipping_total!= null? wholeCart.shipping_total: 0.00}
             {/* + ???INR {wholeCart.shipping_total!= null? wholeCart.shipping_total: 0} */}
              </span>
            </td>
          </tr>
          
        </tbody>
      </Table>
      <span className="cart-divider" />
      
      {/* coupon */}
      {Object.keys(JSON.parse(localStorage.getItem("buyNow")|| '{}')).length ==0 && <div className="cart-coupon mt-3">
        <Form className="yt-cart-disct-wrap pb-4">
          <FormGroup
            className={
              "m-0 " + "success"
              //(codeError || codeEmptyError ? "yt-form-cpn-err error" : "") +
              //(cart.coupon && !codeError && !codeEmptyError ? "success" : "")
            }
          >
            <input
              type="text"
              className="form-control"
              id="cart-total-products-amount"
              placeholder=
                "Apply Coupon"
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value)
              }}
              disabled={wholeCart.coupon_code_id!= null}
             
            />
           <div className="pb-3 d-flex align-items-center cart-coupon-bottom-wrapper justify-content-between">
              {wholeCart.coupon_code_id!= null&& (
                <span
                  className="cart-coupon-code-message success-message"
                  style={{ color: "#43b7a7", display: "block" }}
                >
                  Great ! Coupon Code Applied
                  
                </span>
               )}
              <span className="cart-coupon-code-message error-message">
                Coupon code can't be empty
              </span>
              {wholeCart.coupon_code_id!= null && (
                <Button
                  color="link cart-coupon-change-btn p-0"
                  onClick={() => {
                   props.deleteCoupon()
                  }}
                >
                  Remove Coupon
                </Button>
             )} 
            </div>
            <Button
              color="secondary cart-coupon-btn"
              onClick={()=> {
                props.toApplyCoupon(couponCode,wholeCart.sub_total)
               
              }}
            //  disabled={couponCode == "" || wholeCart.coupon_code_id!= null}
            >
             Apply
            </Button>
          </FormGroup>
        </Form>
        {wholeCart.coupon_code_id!= null && (
          <div>
            <Table className="mt-2 mb-0 cart-prodict-total-amount " borderless>
              <tbody>
                <tr>
                  <td>
                    <span className="cart-product-amount-ttl">
                      Discount
                    </span>
                  </td>
                  <td>
                    <span className="cart-product-amount-price">
                      {/* @ts-ignore  */}
                      - {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {parseFloat(wholeCart.applied_discount).toFixed(2)}
                      {/* - ???INR {wholeCart.applied_discount} */}
                    </span>
                  </td>
                </tr>
              </tbody>
            </Table>
            <span className="cart-divider" />
          </div>
        )}
      </div>
}
      <Table className="mb-0 cart-prodict-sub-total-amount " borderless>
        <tbody>
          <tr>
            <td>
              <span className="cart-product-amount-ttl" style={{ color: "black" }}>
               Total Amount
              </span>
            </td>
            <td>
              <span className="cart-product-amount-price cart-sub-total">
                {/* @ts-ignore  */}
                {JSON.parse(localStorage.getItem('countryCode'))?.countryCode} {parseFloat(wholeCart.total).toFixed(2)}
               {/* ???INR {parseInt(wholeCart.total).toFixed(2)} */}
              </span>
            </td>
          </tr>
        </tbody>
      </Table>
     
    </div>
   )
  );
}

const CartProductListData:any=withRouter((props: any)=> {
  function getProducts() {
    var products: any = [];
    products = props.cart.map((item: any, idx: any) => {
    });
  }

  return (
    <CartAmount
      wholeCart={props.wholeCart}
      toApplyCoupon={props.toApplyCoupon} 
      couponSuccess={props.couponSuccess}
      deleteCoupon={props.deleteCoupon}
    />
  );
})

class Checkout extends CheckoutController {
    constructor(props: Props) {
        super(props);
    };

   selectAddressHandler = () => {
      this.setState({
          ...this.state,
          selectAddressCheck: true
      });
  };
  selectAddressModalClose = () => {
      this.setState({
          ...this.state,
          selectAddressCheck: true
      });
  };

    openingNewAddressHandler = () => {
        this.setState({
            ...this.state,
            addingNewAddressCheck: true
        });
    };
    newAddressModalClose = () => {
        this.setState({
            ...this.state,
            addingNewAddressCheck: !this.state.addingNewAddressCheck
        });
    };

  async componentDidMount() {
    super.componentDidMount();
    const localData = await localStorage.getItem('user');
    const tpoken = await localStorage.getItem('token');
    if (localData && tpoken) {
      const userDetails = JSON.parse(localData);
      if (userDetails?.data) {
        this.setState({
            ...this.state,
            userAddress: userDetails && userDetails.data,
            userToken: tpoken
        });
      }
        await this.getDeliveryAddressList();
    }
    {Object.keys(JSON.parse(localStorage.getItem("buyNow")|| '{}')).length ==0 ? this.getCart():
  this.postBuyNow(JSON.parse(localStorage.getItem("buyNow")|| '{}').cat_id,JSON.parse(localStorage.getItem("buyNow")|| '{}').sub_id)}; 
  this.setState({
    //@ts-ignore
    countryName : JSON.parse(localStorage.getItem('countryCode'))?.countryName, 
  })
};

  changeDefaultAddressHandler = (data: any) => {
    this.setState({
        ...this.state,
        // defaultAddressCheck: !this.state.defaultAddressCheck,
        defaultAddressCheck: true,
        deliveryAddressID: data,
        deliveryId: data.id
    })
  };

  updateAddress = (selectedAddress:any) => {
    //@ts-nocheck;
    this.setState({ selectedAddress: this.state.deliveryAddressID, selectAddressCheck: false });
    this.calculateShippingAddressCharge();
  }

  handleCheckBoxChange = () => {
    this.setState({
      isShippingAddressSame : !this.state.isShippingAddressSame
    });
  }

  onHandleBack = () => {
    console.log(this.props)
    this.props.history.goBack();
  }

render() {
  //@ts-nocheck;
  console.log(this.state?.countryName,"this.state.deliveryId ========", this.state.deliveryId);
  console.log("this.state.defaultAddressCheck ======", this.state.defaultAddressCheck);
return (
 
    <div className="checkout-form-wrap">
       <CartBreadCrumbs onHandleBack={this.onHandleBack} />
    <Row>
    <Col md={7}>
    <Formik
    initialValues={{
      address: {
        name: '',
        flat_no: '',
        address: '',
        address_line_2: '',
        city: '',
        state: '',
        country: '',
        zip_code: '',
        phone_number: '',
      }, 
      isShippingAddressSame: true,
      billing_address: this.state.selectedAddress
    }}
    enableReinitialize

    // validationSchema={addNewAddressSchema}
    validationSchema = {() => {
      const nameCountry = this.state?.countryName;
      // console.log("conyru",nameCountry);
      //@ts-ignore
      switch(nameCountry?.toLowerCase()){
        case 'india' : 
        return Yup.object({
          isShippingAddressSame: Yup.boolean(),
          address: Yup.object().when('isShippingAddressSame', {
            is: false,
            then: Yup.object({
             name: Yup.string().min(2, 'Name is Too Short').required('Name is Required'),
             flat_no: Yup.string().required('Flat/House/Apartment No. is Required'),
             address: Yup.string().matches(/^[A-Za-z0-9 ]+$/, "Special characters are not allow in Address Line 1").min(3, 'Address Line 1 is Too Short').required('Address Line 1 is Required'),
             address_line_2: Yup.string().matches(/^[A-Za-z0-9 ]+$/, "Special characters are not allow in Address Line 2"),
             city: Yup.string().min(3, 'City is Too Short').required('City is Required'),
             state: Yup.string().required('State is Required'),
             country: Yup.string().min(2, 'Country is Too Short').required('Country is Required'),
             zip_code: Yup.number().min(100000, 'Pin Code is Minimum 6 digits').max(999999, 'Pin Code is Maximum 6 digits').required('Pin Code is Required'),
             phone_number: Yup.number().min(1000000000, 'Phone Number Minimum 10 digits').max(9999999999, 'Phone Number Maximum 10 digits').required('Phone Number is Required')
              }),
          }),
          billing_address:Yup.object().shape({
            name: Yup.string().min(2, 'Name is Too Short').required('Name is Required'),
            flat_no: Yup.string().required('Flat/House/Apartment No. is Required'),
            address: Yup.string().matches(/^[A-Za-z0-9 ]+$/, "Special characters are not allow in Address Line 1").min(3, 'Address Line 1 is Too Short').required('Address Line 1 is Required'),
            address_line_2: Yup.string().matches(/^[A-Za-z0-9 ]+$/, "Special characters are not allow in Address Line 2"),
            city: Yup.string().min(3, 'City is Too Short').required('City is Required'),
            state: Yup.string().required('State is Required'),
            country: Yup.string().min(2, 'Country is Too Short').required('Country is Required'),
            zip_code: Yup.number().min(100000, 'Pin Code is Minimum 6 digits').max(999999, 'Pin Code is Maximum 6 digits').required('Pin Code is Required'),
            phone_number: Yup.number().min(1000000000, 'Phone Number Minimum 10 digits').max(9999999999, 'Phone Number Maximum 10 digits').required('Phone Number is Required')
          })
        });
        default : 
        return Yup.object({
          isShippingAddressSame: Yup.boolean(),
          address: Yup.object().when('isShippingAddressSame', {
            is: false,
            then: Yup.object({
             name: Yup.string().min(2, 'Name is Too Short').required('Name is Required'),
             flat_no: Yup.string().required('Flat/House/Apartment No. is Required'),
             address: Yup.string().matches(/^[A-Za-z0-9 ]+$/, "Special characters are not allow in Address Line 1").min(3, 'Address Line 1 is Too Short').required('Address Line 1 is Required'),
             address_line_2: Yup.string().matches(/^[A-Za-z0-9 ]+$/, "Special characters are not allow in Address Line 2"),
             city: Yup.string().min(3, 'City is Too Short').required('City is Required'),
             state: Yup.string().required('State is Required'),
             country: Yup.string().min(2, 'Country is Too Short').required('Country is Required'),
             zip_code: Yup.string().min(3, 'Pin Code is Minimum 3 characters').required('Pin Code is Required'),
             //zip_code: Yup.number().min(100000, 'Pin Code is Minimum 6 digits').max(999999, 'Pin Code is Maximum 6 digits').required('Pin Code is Required'),
             phone_number: Yup.number().min(1000000000, 'Phone Number Minimum 10 digits').max(9999999999, 'Phone Number Maximum 10 digits').required('Phone Number is Required')
              }),
          }),
          billing_address:Yup.object().shape({
            name: Yup.string().min(2, 'Name is Too Short').required('Name is Required'),
            flat_no: Yup.string().required('Flat/House/Apartment No. is Required'),
            address: Yup.string().matches(/^[A-Za-z0-9 ]+$/, "Special characters are not allow in Address Line 1").min(3, 'Address Line 1 is Too Short').required('Address Line 1 is Required'),
            address_line_2: Yup.string().matches(/^[A-Za-z0-9 ]+$/, "Special characters are not allow in Address Line 2"),
            city: Yup.string().min(3, 'City is Too Short').required('City is Required'),
            state: Yup.string().required('State is Required'),
            country: Yup.string().min(2, 'Country is Too Short').required('Country is Required'),
            zip_code: Yup.string().min(3, 'Pin Code is Minimum 3 characters').required('Pin Code is Required'),
            // zip_code: Yup.number().min(100000, 'Pin Code is Minimum 6 digits').max(999999, 'Pin Code is Maximum 6 digits').required('Pin Code is Required'),
            phone_number: Yup.number().min(1000000000, 'Phone Number Minimum 10 digits').max(9999999999, 'Phone Number Maximum 10 digits').required('Phone Number is Required')
          })
        }); 
      }
    }}
    onSubmit={(values) => {
      this.addNewAddressHandler(values);
      console.log(values.isShippingAddressSame,"values.isShippingAddressSame")
      if(values.isShippingAddressSame == true) {
        //  @ts-ignore
        this.props.history.push({
          pathname: '/order-summary',
          state: { addressData: values.billing_address, billing_address_Data: values.billing_address, cardtData: this.state.wholeCart, cart: this.state.cart , couponData: this.state.couponSuccess}
        })
      } else {
        //  @ts-ignore
        this.props.history.push({
          pathname: '/order-summary',
          state: { addressData: values.address, billing_address_Data: values.billing_address, cardtData: this.state.wholeCart, cart: this.state.cart , couponData: this.state.couponSuccess}
        })
      }
    }} >
    {(props) => {
      const { handleBlur, handleChange, handleSubmit, touched, errors, values, setFieldValue } = props;
      return (
        <form onSubmit={handleSubmit}>
        
        <div className="cart-pg-inner-wrap bg-white radius-10 cart-pg-mb-30">
        <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="cart-checkout-tile mt-0">Billing Address</h2>
        <Button
         color="link cart-select-aar-btn"
          onClick={() => {
            this.selectAddressHandler()
            this.setZipCode("");
          }}
        >
        Select Address
        </Button>
        </div>
        <Row form>
        <Col md={6}>
        <FormGroup>
        <span className="checkout-form-label">Name</span>
        <Input type='text' className="py-2 border-0 pl-0" name='billing_address.id' id='id' onChange={handleChange} onBlur={handleBlur} value={values?.billing_address?.id} style={{display:"none"}}></Input>
        <Input type='text' className="py-2 border-0 pl-0" name='billing_address.name' id='name' onChange={handleChange} onBlur={handleBlur} value={values?.billing_address?.name}></Input>
        <FormText color='danger'>{errors?.billing_address?.name && touched?.billing_address?.name ? errors?.billing_address?.name : ''}</FormText>
        </FormGroup>
        </Col>

        <Col md={6}>
        <FormGroup>
        <span className="checkout-form-label">Flat / House / Apartment No.</span>
        <Input type='text' className="py-2 border-0 pl-0" name='billing_address.flat_no' id='flat_no' onChange={handleChange} onBlur={handleBlur} value={values?.billing_address?.flat_no}></Input>
        <FormText color='danger'>{errors?.billing_address?.flat_no && touched?.billing_address?.flat_no ? errors?.billing_address?.flat_no : ''}</FormText>
        </FormGroup>
        </Col>

        <Col md={6}>
        <FormGroup>
        <span className="checkout-form-label">Address Line 1</span>
        <Input type='text' className="py-2 border-0 pl-0" name='billing_address.address' id='address' onChange={handleChange} onBlur={handleBlur} value={values?.billing_address?.address}></Input>
            <FormText color='danger'>{errors?.billing_address?.address && touched?.billing_address?.address ? errors?.billing_address?.address : ''}</FormText>
        </FormGroup>
        </Col>

        <Col md={6}>
        <FormGroup>
          <span className="checkout-form-label">Address Line 2</span>
          <Input
            type='text'
            className="py-2 border-0 pl-0"
            name='billing_address.address_line_2'
            id='address_line_2'
            onChange={handleChange}
            onBlur={handleBlur}
            value={isEmpty(values?.billing_address?.address_line_2) ? "": values?.billing_address?.address_line_2}
          ></Input>
          <FormText color='danger'>{errors?.billing_address?.address_line_2 && touched?.billing_address?.address_line_2 ? errors?.billing_address?.address_line_2 : ''}</FormText>
        </FormGroup>
        </Col>

        <Col md={6}>
        <FormGroup>
        <span className="checkout-form-label">City</span>
        <Input type='text' className="py-2 border-0 pl-0" name='billing_address.city' id='city' onChange={handleChange} onBlur={handleBlur} value={values?.billing_address?.city}></Input>
        <FormText color='danger'>{errors?.billing_address?.city && touched?.billing_address?.city ? errors?.billing_address?.city : ''}</FormText>
        </FormGroup>
        </Col>

        <Col md={6}>
        <FormGroup>
        <span className="checkout-form-label">State</span>
        <Input type='text' className="py-2 border-0 pl-0" name='billing_address.state' id='state' onChange={handleChange} onBlur={handleBlur} value={values?.billing_address?.state}></Input>
        <FormText color='danger'>{errors?.billing_address?.state && touched?.billing_address?.state ? errors?.billing_address.state : ''}</FormText>
        </FormGroup>
        </Col>

        <Col md={6}>
        <FormGroup>
        <span className="checkout-form-label">Country</span>
        <Input type='text' className="py-2 border-0 pl-0"  name='billing_address.country' id='country' onChange={handleChange} onBlur={handleBlur} value={values?.billing_address?.country}></Input>
        <FormText color='danger'>{errors?.billing_address?.country && touched?.billing_address?.country ? errors?.billing_address?.country : ''}</FormText>
        </FormGroup>
        </Col>

        <Col md={6}>
        <FormGroup>
        <span className="checkout-form-label">Pin Code </span>
          <Input
          // @ts-ignore
            type={(this.state?.countryName)?.toLowerCase() == 'india' ?'number' :'text'}
            className="py-2 border-0 pl-0"
            name='billing_address.zip_code'
            id='zip_code'
            onChange={(event) => {
              this.setZipCode(event.target.value);
              handleChange(event);
            }}
            onBlur={(event) => {
              this.checkShippingAggressCharge();
              handleBlur(event)
            }}
            value={values?.billing_address?.zip_code}
          ></Input>
        <FormText color='danger'>{errors?.billing_address?.zip_code && touched?.billing_address?.zip_code ? errors?.billing_address?.zip_code : ''}</FormText>
        </FormGroup>
        </Col>

        <Col md={6}>
        <FormGroup>
        <span className="checkout-form-label">Phone Number</span>
        <Input type='number' className="py-2 border-0 pl-0" name='billing_address.phone_number' id='phone_number' onChange={handleChange} onBlur={handleBlur} value={values?.billing_address?.phone_number}></Input>
            <FormText color='danger'>{errors?.billing_address?.phone_number && touched?.billing_address?.phone_number ? errors?.billing_address?.phone_number : ''}</FormText>
        </FormGroup>
        </Col>

        <Col md={12}>
        <div className="checkout-checkbox d-flex flex-wrap my-3">
        <FormGroup className="mr-5">
            <span className="yt-checkout-chekbox-label">
            My billing and shipping address are the same
            </span>
            <Input
            type="checkbox"
            id="checkout-billing-addr"
            name="isShippingAddressSame"
            checked={values.isShippingAddressSame}
            onChange={handleChange}
            />
            <Label className="yt-checkout-form-chk-box" check />
        </FormGroup>
        </div>
        </Col>
        </Row>
        { !values.isShippingAddressSame &&
        <Fragment>
        <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="cart-checkout-tile mt-0">shipping Address</h2>
        </div>
        <Row form>
        <Col md={6}>
        <FormGroup>
        <span className="checkout-form-label">Name</span>
        <Input type='text' className="py-2 border-0 pl-0" name='address.name' id='name' onChange={handleChange} onBlur={handleBlur} value={values?.address?.name}></Input>
        <FormText color='danger'>{errors?.address?.name && touched?.address?.name ? errors?.address?.name : ''}</FormText>
        </FormGroup>
        </Col>

        <Col md={6}>
        <FormGroup>
        <span className="checkout-form-label">Flat / House / Apartment No.</span>
        <Input type='text' className="py-2 border-0 pl-0" name='address.flat_no' id='flat_no' onChange={handleChange} onBlur={handleBlur} value={values?.address?.flat_no}></Input>
        <FormText color='danger'>{errors?.address?.flat_no && touched?.address?.flat_no ? errors?.address?.flat_no : ''}</FormText>
        </FormGroup>
        </Col>

        <Col md={6}>
        <FormGroup>
        <span className="checkout-form-label">Address Line 1</span>
        <Input type='text' className="py-2 border-0 pl-0" name='address.address' id='address' onChange={handleChange} onBlur={handleBlur} value={values?.address?.address}></Input>
            <FormText color='danger'>{errors?.address?.address && touched?.address?.address ? errors?.address?.address : ''}</FormText>
        </FormGroup>
        </Col>

        <Col md={6}>
        <FormGroup>
        <span className="checkout-form-label">Address Line 2 </span>
          <Input
            type='text'
            className="py-2 border-0 pl-0"
            name='address.address_line_2'
            id='address_line_2'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values?.address?.address_line_2}
          ></Input>
          <FormText color='danger'>{errors?.address?.address_line_2 && touched?.address?.address_line_2 ? errors?.address?.address_line_2 : ''}</FormText>
        </FormGroup>
        </Col>

        <Col md={6}>
        <FormGroup>
        <span className="checkout-form-label">City</span>
        <Input type='text' className="py-2 border-0 pl-0" name='address.city' id='city' onChange={handleChange} onBlur={handleBlur} value={values?.address?.city}></Input>
        <FormText color='danger'>{errors?.address?.city && touched?.address?.city ? errors?.address?.city : ''}</FormText>
        </FormGroup>
        </Col>

        <Col md={6}>
        <FormGroup>
        <span className="checkout-form-label">State</span>
        <Input type='text' className="py-2 border-0 pl-0" name='address.state' id='state' onChange={handleChange} onBlur={handleBlur} value={values?.address?.state}></Input>
        <FormText color='danger'>{errors?.address?.state && touched?.address?.state ? errors?.address?.state : ''}</FormText>
        </FormGroup>
        </Col>

        <Col md={6}>
        <FormGroup>
        <span className="checkout-form-label">Country</span>
        <Input type='text' className="py-2 border-0 pl-0"  name='address.country' id='country' onChange={handleChange} onBlur={handleBlur} value={values?.address?.country}></Input>
        <FormText color='danger'>{errors?.address?.country && touched?.address?.country ? errors?.address?.country : ''}</FormText>
        </FormGroup>
        </Col>

        <Col md={6}>
        <FormGroup>
        <span className="checkout-form-label">Pin Code </span>
        <Input type='text' className="py-2 border-0 pl-0" name='address.zip_code' id='zip_code' onChange={handleChange} onBlur={handleBlur} value={values?.address?.zip_code}></Input>
        <FormText color='danger'>{errors?.address?.zip_code && touched?.address?.zip_code ? errors?.address?.zip_code : ''}</FormText>
        </FormGroup>
        </Col>

        <Col md={6}>
        <FormGroup>
        <span className="checkout-form-label">Phone Number</span>
        <Input type='number' className="py-2 border-0 pl-0" name='address.phone_number' id='phone_number' onChange={handleChange} onBlur={handleBlur} value={values?.address?.phone_number}></Input>
            <FormText color='danger'>{errors?.address?.phone_number && touched?.address?.phone_number ? errors?.address?.phone_number : ''}</FormText>
        </FormGroup>
        </Col>
        </Row>
        </Fragment>
      }
    </div>
  <div className="text-right">
  {/* <Ripple>
      <Button
        className='btn btn-primary cart-proceed-to-checkput py-3 px-5 mr-3'
        onClick={this.onHandleBack}
      >
        Back
      </Button>
    </Ripple> */}
    <Ripple>
      <Button
        type='submit'
        className='btn btn-secondary cart-proceed-to-checkput py-3 px-5'
        disabled={!this.state?.isCheckedShippingCharge ? true : false}
      >
          Proceed To Pay
      </Button>
    </Ripple>
  </div>
    </form>
      )
    }}
  </Formik>
  </Col>
    <Col md={5}>
    <CartProductListData
      cart={this.state.cart}
      wholeCart={this.state.wholeCart}
      toApplyCoupon={this.toApplyCoupon}
      couponSuccess={this.state.couponSuccess}
      deleteCoupon={this.deleteCoupon}
    />
    </Col>
  </Row>

     <Modal className="cm-small-modal-6" isOpen={this.state && this.state.selectAddressCheck} toggle={() => this.selectAddressModalClose()}>
        <ModalHeader className='select-addr-title-bar p-4' close={<img src={closeImg} alt='' onClick={() => this.selectAddressModalClose()} />}>
          <span>Select Address</span>
        </ModalHeader>
        <ModalBody className="p-3 yt-cm-sadd-body">
        <div className="select-addr-body-wrap">
        <div className="profile-pg-inner-wrapper">
          <div className="profile-pg-sa-address-main-wrap">
            <ul className="pp-sa-list-none p-0 m-0 pp-sa-all-addres-list" style={{ listStyle: 'none' }}>
            {this.state.userAddress && this.state.userAddress.length > 0 ? (
              this.state.userAddress.map((ele, index) => (
              <li
                key={index}
                className={this.state.deliveryId == ele.attributes.id ? "active" : '' }
                onClick={() => this.changeDefaultAddressHandler(ele.attributes)}
              >
                <div className='profile-pg-inner-wrap p-4 bg-white radius-10'>
                  <Row className="yt-cm-sadd-row">
                  <Col md={2} className="yt-cm-sadd-col">
                    <div className="pp-sa-img-wrap">
                      <img src={require('../assets/images/address-icn.png')} width='65' height='65' />
                      </div>
                    </Col>
                    <Col md={10} className="yt-cm-sadd-col">
                      <div className="pp-sa-info-wrap">
                      <div className="d-flex align-items-center justify-content-between mb-3 yt-sadd-ttl-chek-img">
                        <h2 className='pp-sa-type  my-0'>
                          {ele.attributes.name}
                        </h2>
                      <div className="pp-sa-action-wrap d-flex align-items-end justify-content-end" style={{'right':"10px"}} >
                        <div className="pp-sa-delet text-right pl-3">
                        {this.state.deliveryId && this.state.defaultAddressCheck ?
                                  <img
                                    src={this.state.deliveryId == ele.attributes.id ? checkCheck : emptyCheck}
                                    alt='' className='img-fluid d-block ml-auto mb-2'
                                    // onClick={() => this.changeDefaultAddressHandler(ele.attributes)}
                                    width='20'
                                    height='20'
                                  />
                          :
                                  <img 
                                    src={ele.attributes.is_default ? checkCheck : emptyCheck}
                                    alt=''
                                    className='img-fluid d-block ml-auto mb-2'
                                    // onClick={() => this.changeDefaultAddressHandler(ele.attributes)}
                                    width='20'
                                    height='20'
                                  />
                        }
                        </div>
                        </div>
                        </div>
                        <p className='pp-sa-address mb-0'>{ele.attributes.flat_no}{' '}{ele.attributes.address}{' '}{ele.attributes.city},{ele.attributes.state},{ele.attributes.country}{' '}{ele.attributes.pinCode}</p>
                      </div>
                      </Col>
                  </Row>
                </div>
              </li>
              )) 
            ) :
            <div className="w3-panel w3-text-gray w3-large">
            No existing address is available right now.
            </div>
            }
          </ul>
          </div>
          </div> 
          <div className="d-flex">
          <Button
            onClick={() => this.openingNewAddressHandler()}
            color="btn btn-secondary select-addr-modal-btn py-3 mr-2 select-add-bg-blue btn-block"
          >
            Add New Address
          </Button>
          <Button
            color="btn btn-secondary select-addr-modal-btn py-3 mt-0 select-add-bg-black btn-block"
            onClick={() => {this.updateAddress(this.state.deliveryAddressID)}}
          >
            Continue
          </Button>
        </div>
        </div>
        </ModalBody>
    </Modal>

     {/* Modal for Add New Address start */}
     <Modal className="cm-small-modal-6" isOpen={this.state && this.state.addingNewAddressCheck} toggle={() => this.newAddressModalClose()}>
          <ModalHeader className='add-addr-title-bar p-4 menu-text ' close={<img src={closeImg} alt='' onClick={() => this.newAddressModalClose()} />}>
           Add New Address
          </ModalHeader>
          <ModalBody>
            <Formik
            initialValues={{
              address: {
                name: '',
                flat_no: '',
                address: '',
                address_line_2: '',
                city: '',
                state: '',
                country: '',
                zip_code: '',
                phone_number: '',
              }, 
              isShippingAddressSame: true,
              billing_address: this.state.selectedAddress
            }}
            enableReinitialize
              // validationSchema={addNewAddressSchema}
              validationSchema={()=>{
                const nameCountry = this.state?.countryName;
      console.log("conyru",nameCountry);
      //@ts-ignore
      switch(nameCountry?.toLowerCase()){
        case 'india' : 
        return Yup.object({
          isShippingAddressSame: Yup.boolean(),
          address: Yup.object().when('isShippingAddressSame', {
            is: false,
            then: Yup.object({
             name: Yup.string().min(2, 'Name is Too Short').required('Name is Required'),
             flat_no: Yup.string().required('Flat/House/Apartment No. is Required'),
             address: Yup.string().matches(/^[A-Za-z0-9 ]+$/, "Special characters are not allow in Address Line 1").min(3, 'Address Line 1 is Too Short').required('Address Line 1 is Required'),
             address_line_2: Yup.string().matches(/^[A-Za-z0-9 ]+$/, "Special characters are not allow in Address Line 2"),
             city: Yup.string().min(3, 'City is Too Short').required('City is Required'),
             state: Yup.string().required('State is Required'),
             country: Yup.string().min(2, 'Country is Too Short').required('Country is Required'),
             zip_code: Yup.number().min(100000, 'Pin Code is Minimum 6 digits').max(999999, 'Pin Code is Maximum 6 digits').required('Pin Code is Required'),
             phone_number: Yup.number().min(1000000000, 'Phone Number Minimum 10 digits').max(9999999999, 'Phone Number Maximum 10 digits').required('Phone Number is Required')
              }),
          }),
          billing_address:Yup.object().shape({
            name: Yup.string().min(2, 'Name is Too Short').required('Name is Required'),
            flat_no: Yup.string().required('Flat/House/Apartment No. is Required'),
            address: Yup.string().matches(/^[A-Za-z0-9 ]+$/, "Special characters are not allow in Address Line 1").min(3, 'Address Line 1 is Too Short').required('Address Line 1 is Required'),
            address_line_2: Yup.string().matches(/^[A-Za-z0-9 ]+$/, "Special characters are not allow in Address Line 2"),
            city: Yup.string().min(3, 'City is Too Short').required('City is Required'),
            state: Yup.string().required('State is Required'),
            country: Yup.string().min(2, 'Country is Too Short').required('Country is Required'),
            zip_code: Yup.number().min(100000, 'Pin Code is Minimum 6 digits').max(999999, 'Pin Code is Maximum 6 digits').required('Pin Code is Required'),
            phone_number: Yup.number().min(1000000000, 'Phone Number Minimum 10 digits').max(9999999999, 'Phone Number Maximum 10 digits').required('Phone Number is Required')
          })
        });
        default : 
        return Yup.object({
          isShippingAddressSame: Yup.boolean(),
          address: Yup.object().when('isShippingAddressSame', {
            is: false,
            then: Yup.object({
             name: Yup.string().min(2, 'Name is Too Short').required('Name is Required'),
             flat_no: Yup.string().required('Flat/House/Apartment No. is Required'),
             address: Yup.string().matches(/^[A-Za-z0-9 ]+$/, "Special characters are not allow in Address Line 1").min(3, 'Address Line 1 is Too Short').required('Address Line 1 is Required'),
             address_line_2: Yup.string().matches(/^[A-Za-z0-9 ]+$/, "Special characters are not allow in Address Line 2"),
             city: Yup.string().min(3, 'City is Too Short').required('City is Required'),
             state: Yup.string().required('State is Required'),
             country: Yup.string().min(2, 'Country is Too Short').required('Country is Required'),
             zip_code: Yup.string().min(3, 'Pin Code is Minimum 3 characters').required('Pin Code is Required'),
             //zip_code: Yup.number().min(100000, 'Pin Code is Minimum 6 digits').max(999999, 'Pin Code is Maximum 6 digits').required('Pin Code is Required'),
             phone_number: Yup.number().min(1000000000, 'Phone Number Minimum 10 digits').max(9999999999, 'Phone Number Maximum 10 digits').required('Phone Number is Required')
              }),
          }),
          billing_address:Yup.object().shape({
            name: Yup.string().min(2, 'Name is Too Short').required('Name is Required'),
            flat_no: Yup.string().required('Flat/House/Apartment No. is Required'),
            address: Yup.string().matches(/^[A-Za-z0-9 ]+$/, "Special characters are not allow in Address Line 1").min(3, 'Address Line 1 is Too Short').required('Address Line 1 is Required'),
            address_line_2: Yup.string().matches(/^[A-Za-z0-9 ]+$/, "Special characters are not allow in Address Line 2"),
            city: Yup.string().min(3, 'City is Too Short').required('City is Required'),
            state: Yup.string().required('State is Required'),
            country: Yup.string().min(2, 'Country is Too Short').required('Country is Required'),
            zip_code: Yup.string().min(3, 'Pin Code is Minimum 3 characters').required('Pin Code is Required'),
            // zip_code: Yup.number().min(100000, 'Pin Code is Minimum 6 digits').max(999999, 'Pin Code is Maximum 6 digits').required('Pin Code is Required'),
            phone_number: Yup.number().min(1000000000, 'Phone Number Minimum 10 digits').max(9999999999, 'Phone Number Maximum 10 digits').required('Phone Number is Required')
          })
        }); 
      }
              }}
              onSubmit={(values) => {
                console.log(values.isShippingAddressSame, "values.isShippingAddressSame2222")

                this.addNewAddressHandler(values);
              }} >
              {(props) => {
                const { handleBlur, handleChange, handleSubmit, touched, errors, values } = props;
                return (
                  <form onSubmit={handleSubmit} noValidate style={{ padding: 10 }}>
                    <FormGroup row>
                      <Label htmlFor='name' className='modalTitleInputLable'>Name</Label>
                      <Input type='text' name='billing_address.name' id='name' onChange={handleChange} onBlur={handleBlur} value={values?.billing_address?.name}></Input>
                      <FormText color='danger'>{errors?.billing_address?.name && touched?.billing_address?.name ? errors?.billing_address?.name : ''}</FormText>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor='flat_no' className='modalTitleInputLable'>Flat / House / Apartment No.</Label>
                      <Input type='text' name='billing_address.flat_no' id='flat_no' onChange={handleChange} onBlur={handleBlur} value={values?.billing_address?.flat_no}></Input>
                      <FormText color='danger'>{errors?.billing_address?.flat_no && touched?.billing_address?.flat_no ? errors?.billing_address?.flat_no : ''}</FormText>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor='address' className='modalTitleInputLable'>Address Line 1</Label>
                      <Input type='text' name='billing_address.address' id='address' onChange={handleChange} onBlur={handleBlur} value={values?.billing_address?.address}></Input>
                      <FormText color='danger'>{errors?.billing_address?.address && touched?.billing_address?.address ? errors?.billing_address?.address : ''}</FormText>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor='address_line_2' className='modalTitleInputLable'>Address Line 2</Label>
                      <Input
                        type='text'
                        name='billing_address.address_line_2'
                        id='address_line_2'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.billing_address?.address_line_2}
                      ></Input>
                      <FormText color='danger'>{errors?.billing_address?.address_line_2 && touched?.billing_address?.address_line_2 ? errors?.billing_address?.address_line_2 : ''}</FormText>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor='city' className='modalTitleInputLable'>City</Label>
                      <Input type='text' name='billing_address.city' id='city' onChange={handleChange} onBlur={handleBlur} value={values?.billing_address?.city}></Input>
                      <FormText color='danger'>{errors?.billing_address?.city && touched?.billing_address?.city ? errors?.billing_address?.city : ''}</FormText>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor='state' className='modalTitleInputLable'>State</Label>
                      <Input type='text' name='billing_address.state' id='state' onChange={handleChange} onBlur={handleBlur} value={values?.billing_address?.state}></Input>
                      <FormText color='danger'>{errors?.billing_address?.state && touched?.billing_address?.state ? errors?.billing_address?.state : ''}</FormText>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor='country' className='modalTitleInputLable'>Country</Label>
                      <Input type='text' name='billing_address.country' id='country' onChange={handleChange} onBlur={handleBlur} value={values?.billing_address?.country}></Input>
                      <FormText color='danger'>{errors?.billing_address?.country && touched?.billing_address?.country ? errors?.billing_address?.country : ''}</FormText>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor='zip_code' className='modalTitleInputLable'>Pin Code</Label>
                      {/* @ts-ignore */}
                      <Input type={(this.state?.countryName)?.toLowerCase() == 'india' ?'number' :'text'} name='billing_address.zip_code' id='zip_code' onChange={handleChange} onBlur={handleBlur} value={values?.billing_address?.zip_code}></Input>
                      <FormText color='danger'>{errors?.billing_address?.zip_code && touched?.billing_address?.zip_code ? errors?.billing_address?.zip_code : ''}</FormText>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor='phone_number' className='modalTitleInputLable'>Phone Number</Label>
                      <Input type='number' name='billing_address.phone_number' id='phphone_numberone' onChange={handleChange} onBlur={handleBlur} value={values?.billing_address?.phone_number}></Input>
                      <FormText color='danger'>{errors?.billing_address?.phone_number && touched?.billing_address?.phone_number ? errors?.billing_address?.phone_number : ''}</FormText>
                    </FormGroup>
                    <FormGroup>
                      <Button type='submit' className='saveProfileBtn' style={{ width: '100%' }}>
                        Save Address
                      </Button>
                    </FormGroup>
                  </form>
                )
              }}
            </Formik>
          </ModalBody>
        </Modal>
        {/* Modal fro Add New Address End */}
    </div>
    )
  }
}
// @ts-ignore
export default withRouter(Checkout);