//@ts-nocheck;
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';
import ProfilebioController, { Props, configJSON, getValidationsSchema } from './ProfilebioController.web';
import { cameraImg, profileCloseImg, closeImg, profileImg, imageLock, imgaeCamera, emptyProfile } from './assets';
import { Row, Col, Button, Modal, ModalBody, ModalHeader, FormGroup, Label, Input, FormText, Alert, ModalFooter } from 'reactstrap';
import '../assets/styles/styles.css';
import '../assets/styles/addressStyles.css';
import '../assets/styles/profile.css';
// @ts-ignore
import content from "../../../components/src/content";

import Loader from "../../../components/src/Loader.web";
import '../assets/styles/index.scoped.css';

/*** Vaildation start */
const editProfileSchem = Yup.object().shape({
    name: Yup.string().min(2, 'Name is Too Short').matches(/^[a-zA-Z ]+$/, 'Only letters are allowed.').required('Name is Required'),
    email: Yup.string().email().required('Email is Required'),
    phone: Yup.number().min(1000000000, 'Phone Number Minimum 10 digits').max(9999999999, 'Phone Number Maximum 10 digits').required('Phone Number is Required')
});
const changePasswordSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Current Password is Required'),
    newPassword: Yup.string().min(8, 'Minimum Password length is 8.').max(16, 'Maximum Password length is 16')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain atleast a capital letter, a lowercase letter, a number and a special character.').required('New Password is Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref("newPassword"), null], "Passwords are not matching").required('Confirm Password is Required'),
});
/*** validation end */



export default class Profilebio extends ProfilebioController {
    constructor(props: Props) {
        super(props)
    };
    uploadImage = () => {
        const uploadImageFun = document.getElementById('uploadImage');
        uploadImageFun?.click();
    };

    profileImageHandler = (e: any = []) => {
        const files = e?.target ? e?.target?.files : [];
        if (files.length > 0) {
            const file = files[0];
            console.log("fleImage", file);
            if (file.type == 'image/svg+xml') {
                this.setState({
                    ...this.state,
                    showAlertPassword: true,
                    message: '.svg file are not allowed',
                    messageType: 'warning'
                })
            } else {
                this.imgBase64(file, (result: any) => {
                    this.setState({
                        ...this.state,
                        // profileImgBase64: result,
                        isNewImageAdded: true,
                        newProfileImgBase64: result
                    });
                });
            }
        }
    };

    imgBase64 = (file: any, cb: any) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            cb(reader.result);
        };
    };

    handleProfileEdit = () => {
        this.setState({
            ...this.state,
            editProfile: true
        });
    };

    modalClose = () => {
        this.setState({
            ...this.state,
            editProfile: !this.state.editProfile
        });
    };

    handleChangePassword = () => {
        this.setState({
            ...this.state,
            isChangePassword: true
        });
    };

    chnagePwdModalClose = () => {
        this.setState({
            ...this.state,
            isChangePassword: !this.state.isChangePassword
        });
    };

    successPasswordModalClose = () => {
        this.setState({
            ...this.state,
            isPasswordUpdated: !this.state.isPasswordUpdated
        });
    };

    addNewProfile = (e: any) => {
        const uploadNewImage = document.getElementById('addImage');
        uploadNewImage?.click();
    };

    logoutModalClose = () => {
        this.setState({
            ...this.state,
            disableLogout: false
        })
    }

    async componentDidMount() {
        const localData = await localStorage.getItem('user');
        const tpoken = await localStorage.getItem('token');
        if (localData && tpoken) {
            const userDetails = JSON.parse(localData);
            this.setState({
                ...this.state,
                getUserDeatils: userDetails,
            });
            await this.getUserProfileHandler();
        }
    }

    public shouldComponentUpdate(a: any, b: any) {
        if (b.showAlertPassword) {
            //console.log("HI ");
            setTimeout(() => {
                this.setState({
                    showAlertPassword: false
                })
            }, 2000);
            return true
        } else {
            return true
        }
    };

    showPasswordHandler = (e: any) => {
        e.preventDefault();
        this.setState(prevState => ({
            showPassword: !prevState.showPassword
        }));
    };

    showCurrentPasswordHandler = (e: any) => {
        e.preventDefault();
        this.setState(prevState => ({
            showCurrentPassword: !prevState.showCurrentPassword
        }));
    }

    showConfirmPasswordHandler = (e: any) => {
        e.preventDefault();
        this.setState(prevState => ({
            showConfirmPassword: !prevState.showConfirmPassword
        }));
    }

    render() {
        return (
            <>
                {this.state.loading && <Loader loading={this.state.loading} />}
                {/* <div className='profile-pg-inner-wrap p-4 bg-white radius-10 profile-pg-mb-30 mb-4 yt-my-order-wrap yt-cc-ord'> */}
                <div className='profile-pg-inner-wrap p-4 bg-white radius-10 profile-pg-mb-30'>
                    <div className="profile-pg-inner-wrapper">
                        <div className='profile-tab-content'>
                            <Row className='yt-cm-ptc-row'>
                                <Col md={12} className='yt-cm-ptc-col'>
                                    <div className="d-flex align-items-center mb-5 yt-profile-img-nm-wrap">
                                        <div className="img-upload d-flex align-items-center justify-content-center">
                                            <img src={this.state.getUserDeatils && this.state.getUserDeatils.attributes && this.state.getUserDeatils.attributes.image_url ? this.state.getUserDeatils.attributes.image_url : emptyProfile} alt="" className="img-fluid" />
                                        </div>
                                    </div>
                                </Col>
                                <Col md={6} className="yt-cm-ptc-col">
                                    <div className="profile-data-wrap">
                                        <span className="profile-data-tag">
                                            {content.name}
                                        </span>
                                        <p className="profile-user-name py-2">{this.state.getUserDeatils && this.state.getUserDeatils.attributes.full_name}</p>
                                    </div>
                                </Col>
                                <Col md={6} className="yt-cm-ptc-col">
                                    <div className="profile-data-wrap">
                                        <span className="profile-data-tag">
                                            {content.email}
                                        </span>
                                        <p className="profile-user-name py-2" style={{ overflow: 'auto' }}>{this.state.getUserDeatils && this.state.getUserDeatils.attributes.email}</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="yt-cm-ptc-row yt-btm-inf">
                                <Col md={6} className="yt-cm-ptc-col">
                                    <div className="profile-data-wrap">
                                        <span className="profile-data-tag">
                                            {content.phoneNo}
                                        </span>
                                        <p className="profile-user-name py-2">{this.state.getUserDeatils && this.state.getUserDeatils.attributes.full_phone_number}</p>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className={
                                        'd-flex align-items-center justify-content-end' /*"justify-content-xl-between"*/
                                    }>
                                        {this.state.getUserDeatils && this.state.getUserDeatils && (this.state.getUserDeatils.attributes && this.state.getUserDeatils.attributes.is_social_login || this.state.getUserDeatils.type == "social_account") ?
                                            ''
                                            : <Button color="link profile-edit-pass mr-2 p-xl-0" onClick={() => this.handleChangePassword()}>
                                                {content.changePassword}
                                            </Button>
                                        }
                                        {" "}
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <Button
                                            color="secondary profile-edit-btn"
                                            onClick={() => this.handleProfileEdit()}
                                        >
                                            {content.editProfile}
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        {/* <h1>Profile</h1> */}
                    </div>

                    {/* Modal Edit profile start */}
                    <Modal
                        isOpen={this.state.editProfile}
                        toggle={() => this.modalClose()}
                        centered={true}
                        className='cm-small-modal-6'
                    // backdrop="static"
                    >
                        <ModalHeader
                            className='edit-profile-title-bar p-4'
                            close={<img src={closeImg}
                                alt=''
                                onClick={() => {
                                    // this.getUserProfileHandler();
                                    this.modalClose()
                                }} />}
                        >
                            {content.editProfile}
                        </ModalHeader>
                        <ModalBody className='yt-edit-prfl-body'>
                            <input type='file' accept='.jpeg .jpg, .png' style={{ visibility: 'hidden' }} id={'addImage'} onChange={(e) => this.profileImageHandler(e)} />
                            <div className='edit-profile-body-wrap' style={{ display: 'flex', flexDirection: 'row' }}>
                                <div className='d-flex align-items-end mb-4 yt-edit-profl-img-wrap' style={{ position: 'relative', top: 0, left: 0 }}>
                                    {this.state.newProfileImgBase64 ?
                                        (
                                            <>
                                                <div className="img-upload d-flex align-items-center justify-content-center">
                                                    <img src={this.state.newProfileImgBase64} alt='profile pic in edit' className="img-fluid w3-" />
                                                    <div className="image-overlay" style={{ cursor: 'pointer' }}>
                                                        <img src={imgaeCamera} alt='' onClick={(e) => this.addNewProfile(e)} style={{ position: 'absolute', top: 0, right: 0, left: '100%' }} />
                                                    </div>
                                                </div>
                                                {!this.state.removeClicked ? (
                                                    <div className="yt-remove-pic-wrap ml-4" onClick={() =>
                                                        this.setState({
                                                            ...this.state,
                                                            removeClicked: true,
                                                            newProfileImgBase64: ''
                                                        })}>
                                                        <img src={profileCloseImg} alt='' />
                                                        <span className='btn btn-light removeBtn'>{content.removePicture}</span>
                                                    </div>
                                                ) :
                                                    (
                                                        <div className="yt-remove-pic-wrap ml-4" onClick={() =>
                                                            this.setState({
                                                                ...this.state,
                                                                removeClicked: true,
                                                                newProfileImgBase64: ''
                                                            })}>
                                                            <img src={profileCloseImg} alt='' />
                                                            <span className='btn btn-light removeBtn'>{content.removePicture}</span>
                                                        </div>
                                                    )
                                                }
                                            </>
                                        ) :
                                        (
                                            <>
                                                <div className="img-upload d-flex align-items-center justify-content-center">
                                                    <img src={imgaeCamera} alt='' onClick={(e) => this.addNewProfile(e)} />
                                                </div>

                                            </>
                                        )}
                                </div>
                            </div>
                            <Formik
                                initialValues={{
                                    name: this.state.getUserDeatils && this.state.getUserDeatils.attributes.full_name || '',
                                    email: this.state.getUserDeatils && this.state.getUserDeatils.attributes.email || '',
                                    phone: this.state.getUserDeatils && this.state.getUserDeatils.attributes.full_phone_number || ''
                                }}
                                validationSchema={editProfileSchem}
                                onSubmit={(values) => {
                                    this.updateProfileHandler(values);
                                }}
                            >
                                {(props) => {
                                    const { handleBlur, handleChange, values, errors, touched, handleSubmit } = props;
                                    return (
                                        <form style={{ textAlign: 'left' }} onSubmit={handleSubmit} noValidate>
                                            <FormGroup>
                                                <Label htmlFor='userName' className='modalTitleInputLable'>{content.name}</Label>
                                                <Input type='text' value={values.name} onChange={handleChange} onBlur={handleBlur} name='name' id='userName' />
                                                <FormText color='danger'>{errors.name && touched.name ? errors.name : ''}</FormText>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label htmlFor='userEmail' className='modalTitleInputLable'>{content.email}</Label>
                                                <Input type='email' value={values.email} name='email' id='userEmail' onBlur={handleBlur} onChange={handleChange} disabled />
                                                <FormText color='danger'>{errors.email && touched.email ? errors.email : ''}</FormText>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label htmlFor='userPhone' className='modalTitleInputLable'>{content.phoneNo}</Label>
                                                <Input type='number' value={values.phone} name='phone' id='userPhone' onBlur={handleBlur} onChange={handleChange} />
                                                <FormText color='danger'>{errors.phone && touched.phone ? errors.phone : ''}</FormText>
                                            </FormGroup>
                                            <FormGroup>
                                                <div className="mt-4 pt-1 yt-otp-sd-wrap">
                                                    {this.state.showSpinner ? (
                                                        <CgSpinner
                                                            style={{
                                                                color: 'black',
                                                                fontSize: 32,
                                                                width: '100%',
                                                                margin: 10,
                                                            }}
                                                            className="w3-spin"
                                                        />
                                                    ) : (
                                                        <Button type='submit' className='saveProfileBtn' style={{ width: '100%' }}>
                                                            {content.saveProfile}
                                                        </Button>
                                                    )}
                                                </div>
                                            </FormGroup>
                                        </form>
                                    )
                                }}
                            </Formik>
                            {this.state.showAlertPassword
                                ?
                                <Alert color={this.state.messageType && this.state.messageType} style={{ position: 'absolute', left: 200, top: 0 }}>
                                    {this.state.message && this.state.message}
                                </Alert>
                                :
                                ''}
                        </ModalBody>
                    </Modal>
                    {/* Modal for Edit Profile end */}


                    {/* Modal for ChnagePassword start */}
                    <Modal isOpen={this.state.isChangePassword} toggle={() => this.chnagePwdModalClose()} centered={true} className='cm-small-modal-6'>
                        <ModalHeader className='edit-profile-title-bar p-4' close={<img src={closeImg} alt='' onClick={() => this.chnagePwdModalClose()} />}>
                            {content.changePassword}
                        </ModalHeader>

                        <ModalBody style={{ textAlign: 'left' }}>
                            <span className='content-updatePwd' style={{ textAlign: 'center' }}>{content.enterPasswordWithAlpha}</span>
                            <Formik
                                initialValues={{
                                    currentPassword: '',
                                    newPassword: '',
                                    confirmPassword: ''
                                }}
                                onSubmit={(values) => {
                                    this.updatePasswordHandler(values);
                                }}
                                validationSchema={changePasswordSchema}>
                                {(props) => {
                                    const { handleBlur, handleSubmit, touched, errors, values, handleChange } = props;
                                    return (
                                        <form onSubmit={handleSubmit} noValidate>
                                            <FormGroup>
                                                <Label htmlFor='currentPassword' className='modalTitleInputLable'>{content.enterCurrentPassword}</Label>
                                                <Input type={this.state.showCurrentPassword ? 'text' : 'password'} onChange={handleChange} onBlur={handleBlur} value={values.currentPassword} name='currentPassword' id='currentPassword' />
                                                {touched.currentPassword && errors.currentPassword
                                                    ?
                                                    (
                                                        this.state.showCurrentPassword
                                                            ?
                                                            (
                                                                <FaEyeSlash onClick={(e) => this.showCurrentPasswordHandler(e)}
                                                                    className={errors.currentPassword.length > 0
                                                                        ? 'yt-current-pass-vie-icn2' : 'yt-current-pass-vie-icn '}
                                                                >
                                                                </FaEyeSlash>
                                                            )
                                                            : (
                                                                <FaEye
                                                                    onClick={(e) => this.showCurrentPasswordHandler(e)}
                                                                    className={
                                                                        errors.currentPassword.length > 0
                                                                            ? 'yt-current-pass-vie-icn2'
                                                                            : 'yt-current-pass-vie-icn'
                                                                    }
                                                                />
                                                            )
                                                    )
                                                    :
                                                    this.state.showCurrentPassword ?
                                                        (
                                                            <>
                                                                {/* {console.log(this.state.currentPasswordErr, "%%%%%%%%%%%%%%", this.state.showCurrentPassword)} */}
                                                                <FaEyeSlash
                                                                    onClick={(e) => this.showCurrentPasswordHandler(e)}
                                                                    className={
                                                                        this.state.currentPasswordErr.length > 0
                                                                            ? 'yt-current-pass-vie-icn2'
                                                                            : 'yt-current-pass-vie-icn '
                                                                    }
                                                                />
                                                            </>
                                                        ) :
                                                        (
                                                            <FaEye
                                                                onClick={(e) => this.showCurrentPasswordHandler(e)}
                                                                className={
                                                                    this.state.currentPasswordErr.length > 0
                                                                        ? 'yt-current-pass-vie-icn2'
                                                                        : 'yt-current-pass-vie-icn '
                                                                }
                                                            />
                                                        )
                                                }
                                                <FormText color='danger'>{errors.currentPassword && touched.currentPassword ? errors.currentPassword : ''}</FormText>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label htmlFor='newPassword' className='modalTitleInputLable'>Enter new password</Label>
                                                <Input type={this.state.showPassword ? 'text' : 'password'} onChange={handleChange} onBlur={handleBlur} value={values.newPassword} name='newPassword' id='newPassword' />
                                                {touched.newPassword && errors.newPassword
                                                    ?
                                                    (
                                                        this.state.showPassword
                                                            ?
                                                            (
                                                                <FaEyeSlash onClick={(e) => this.showPasswordHandler(e)}
                                                                    className={errors.newPassword.length > 0
                                                                        ? 'yt-change-pass-vie-icn2' : 'yt-change-pass-vie-icn '}
                                                                >
                                                                </FaEyeSlash>
                                                            )
                                                            : (
                                                                <FaEye
                                                                    onClick={(e) => this.showPasswordHandler(e)}
                                                                    className={
                                                                        errors.newPassword.length > 0
                                                                            ? 'yt-change-pass-vie-icn2'
                                                                            : 'yt-change-pass-vie-icn'
                                                                    }
                                                                />
                                                            )
                                                    )
                                                    :
                                                    this.state.showPassword ?
                                                        (
                                                            <>
                                                                {/* {console.log(this.state.passwordError, "%%%%%%%%%%%%%%", this.state.showPassword)} */}
                                                                <FaEyeSlash
                                                                    onClick={(e) => this.showPasswordHandler(e)}
                                                                    className={
                                                                        this.state.passwordError.length > 0
                                                                            ? 'yt-change-pass-vie-icn2'
                                                                            : 'yt-change-pass-vie-icn '
                                                                    }
                                                                />
                                                            </>
                                                        ) :
                                                        (
                                                            <FaEye
                                                                onClick={(e) => this.showPasswordHandler(e)}
                                                                className={
                                                                    this.state.passwordError.length > 0
                                                                        ? 'yt-change-pass-vie-icn2'
                                                                        : 'yt-change-pass-vie-icn '
                                                                }
                                                            />
                                                        )
                                                }
                                                <FormText color='danger'>{errors.newPassword && touched.newPassword ? errors.newPassword : ''}</FormText>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label htmlFor='confirmPassword' className='modalTitleInputLable'>{content.reEnterNewPassword}</Label>
                                                <Input type={this.state.showConfirmPassword ? 'text' : 'password'} onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword} name='confirmPassword' id='confirmPassword' />
                                                {touched.confirmPassword && errors.confirmPassword
                                                    ?
                                                    (
                                                        this.state.showConfirmPassword
                                                            ?
                                                            (
                                                                <FaEyeSlash onClick={(e) => this.showConfirmPasswordHandler(e)}
                                                                    className={errors.confirmPassword.length > 0
                                                                        ? 'yt-confirm-pass-vie-icn2' : 'yt-confirm-pass-vie-icn '}
                                                                >
                                                                </FaEyeSlash>
                                                            )
                                                            : (
                                                                <FaEye
                                                                    onClick={(e) => this.showConfirmPasswordHandler(e)}
                                                                    className={
                                                                        errors.confirmPassword.length > 0
                                                                            ? 'yt-confirm-pass-vie-icn2'
                                                                            : 'yt-confirm-pass-vie-icn'
                                                                    }
                                                                />
                                                            )
                                                    )
                                                    :
                                                    this.state.showConfirmPassword ?
                                                        (
                                                            <>
                                                                {/* {console.log(this.state.confirmPasswordError, "%%%%%%%%%%%%%%", this.state.showConfirmPassword)} */}
                                                                <FaEyeSlash
                                                                    onClick={(e) => this.showConfirmPasswordHandler(e)}
                                                                    className={
                                                                        this.state.confirmPasswordError.length > 0
                                                                            ? 'yt-confirm-pass-vie-icn2'
                                                                            : 'yt-confirm-pass-vie-icn '
                                                                    }
                                                                />
                                                            </>
                                                        ) :
                                                        (
                                                            <FaEye
                                                                onClick={(e) => this.showConfirmPasswordHandler(e)}
                                                                className={
                                                                    this.state.confirmPasswordError.length > 0
                                                                        ? 'yt-confirm-pass-vie-icn2'
                                                                        : 'yt-confirm-pass-vie-icn '
                                                                }
                                                            />
                                                        )
                                                }
                                                <FormText color='danger'>{errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : ''}</FormText>
                                            </FormGroup>
                                            <FormGroup>
                                                <div className="mt-4 pt-1 yt-otp-sd-wrap">
                                                    {this.state.showSpinner ? (
                                                        <CgSpinner
                                                            style={{
                                                                color: 'black',
                                                                fontSize: 32,
                                                                width: '100%',
                                                                margin: 10,
                                                            }}
                                                            className="w3-spin"
                                                        />
                                                    ) : (
                                                        <Button type='submit' className='saveProfileBtn' style={{ width: '100%' }}>
                                                            {content.changePassword}
                                                        </Button>
                                                    )}
                                                </div>
                                            </FormGroup>
                                        </form>
                                    )
                                }}
                            </Formik>
                            {/* {this.state.showAlertPassword
                            ?
                            <Alert color={this.state.messageType && this.state.messageType} style={{ position: 'absolute', left: 200, top: 0 }}>
                                {this.state.message && this.state.message}
                            </Alert>
                            :
                            ''} */}
                        </ModalBody>
                    </Modal>
                    {/* Modal for ChnagePassword end */}


                    {/* Modal for UpdatePassword start */}
                    <Modal isOpen={this.state.isPasswordUpdated} toggle={() => this.successPasswordModalClose()} centered={true} className='cm-small-modal-6'>
                        <ModalBody style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src={imageLock} alt='' style={{ width: '100%', height: '30vh', objectFit: 'contain' }} />
                            <br />
                            <span className='sidemenu-text'>
                                {content.passwordChangedSuccessfully}
                            </span>
                            <br />
                            <span className='content-updatePwd'>
                                {content.goBackNBrowse}
                            </span>
                            <br />
                            <br />
                            <Button style={{ width: '50%' }} className='saveProfileBtn' onClick={() => this.setState({ ...this.state, isPasswordUpdated: false })}>
                                {content.goToProfile}
                            </Button>
                        </ModalBody>
                    </Modal>
                    {/* Modal for UpdatePassword end */}

                </div>
            </>
        )
    }
};
