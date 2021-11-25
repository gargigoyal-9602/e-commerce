//@ts-nocheck;
import * as yup from 'yup';

/** validations for EditProfileForm Start */
// export function EditProfile() {
//     const editFormValidations = validations();
//     return yup.object().shape({
//         name: editFormValidations.name.required('Name is Required'),
//         email: editFormValidations.email.required('Email is Required'),
//         phone: editFormValidations.phone.required('Phone Number is Required')
//     });
// };
/** validations for EditProfileForm End */

/**************************** Common Validations Start ***************************/
export default function validations() {
  return {
    email: yup
      .string()
      .email('Email Format is Incorrect')
      .required('Email is Required'),
    password: yup
      .string()
      .min(8, 'Minimum Password length is 8')
      .max(16, 'Maximum Password length is 16')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Password must contain atleast a Capital Letter, a Lowercase Letter, a Number and a Special Character'
      )
      .required('Password is Required'),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Password is Required'),
    currentpassword: yup.string().required('Password is Required'),
    mobile: yup
      .number()
      .typeError('Only numbers are allowed.')
      .positive('Negative numbers are not allowed')
      .integer("Number can't contain a decimal")
      .min(1000000000, 'Minimum 10 digits are Required')
      .max(9999999999, 'Maximum 10 digits are allowed.')
      .required('Mobile number is Required'),
    otp: yup
      .number()
      .typeError('Only numbers are allowed')
      .positive('Negative numbers are not allowed')
      .integer("Number can't contain a decimal")
      .min(100000, 'Minimum 6 digits are required')
      .max(999999, 'Maximum 6 digits are allowed')
      .required('OTP is Required'),
    accountNumber: yup
      .number()
      .typeError('Only numbers are allowed')
      .positive('Negative numbers are not allowed.')
      .integer("Account Number can't contain a decimal")
      .min(100000, 'Minimum 6 digits are required')
      .max(999999999999, 'Maximum 12 digits are allowed')
      .required('Account number is Required'),
    name: yup
      .string()
      .min(3, 'Minimum 3 characters are required')
      .max(20, 'Maximum 20 characters are allowed.')
      .matches(/^[a-zA-Z ]+$/, 'Only letters are allowed'),
    // .required('Name is Required'),
    houseNumber: yup.string(),
    address: yup
      .string()
      .matches(/^[A-Za-z0-9 ]+$/, 'Special characters are not allow'),
    city: yup.string(),
    state: yup.string(),
    country: yup.string(),
    pincode: yup
      .number()
      .typeError('Only numbers are allowed.')
      .positive('Negative numbers are not allowed.')
      .integer("Pincode can't contain a decimal")
      .min(100000, 'Minimum 6 digits are required')
      .max(999999, 'Maximum 6 digits are allowed'),
    phone: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .typeError('Only numbers are allowed')
      .positive('Negative numbers are not allowed.')
      .integer("Phone can't contain a decimal")
      .min(1000000000, 'Minimum 10 digits are required')
      .max(9999999999, 'Maximum 10 digits are allowed'),
    description: yup
      .string()
      .typeError('Message is required.')
      .test(
        'len',
        'Minimum 30 characters are required',
        (val) => val?.length > 29
      ),
    subject: yup.string(),
    comment: yup.string().typeError('Comment is Required.'),
    rating: yup.number().required('Rating is Required'),
  };
}
/** Common Validations End */
