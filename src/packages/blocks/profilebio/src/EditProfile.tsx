import React from "react";
// Customizable Area Start
import { Image, Modal, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GreenButton from "../../../components/src/GreenButton";
import TopHeader from "../../../components/src/TopHeader";
import { backIcon, cameraIcon, cameraIcons, crossIcon, galleryIcon, whiteCameraIcon } from "../../studio-store-ecommerce-theme/src/AppAssets/appassets";
// Customizable Area End
import EditProfileController, { Props } from "./EditProfileController";
import styles from './EditProfileStyle';
import ApplicationLoader from "../../../components/src/AppLoader/AppLoader";
import CustomErrorModal from "../../../components/src/CustomErrorModal/CustomErrorModal";

export default class EditProfile extends EditProfileController {
    constructor(props: Props) {
        super(props);
    }

    renderCameraButton = () => {
        return (
            <TouchableOpacity onPress={() => this.onPressCameraUploadImage()} style={styles.cameraButton}>
                <Image
                    source={this.state.profileImage ? { uri: this.state.profileImage } : this.state.isFetching ? '' : cameraIcon}
                    style={this.state.profileImage ? styles.profileIcon : styles.cameraIcon}
                />
                {false && <View style={styles.whiteCameraContainer}>
                    <Image source={whiteCameraIcon} style={styles.whiteCamera} />
                </View>}
            </TouchableOpacity>
        )
    }
    renderImagePickerModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.showPickerModal}
                onRequestClose={() => {
                    this.setState({ showPickerModal: false })
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.transparentBg} />
                    <View style={styles.bottomView}>
                        <TouchableOpacity onPress={() => this.setState({ showPickerModal: false })}>
                            <Image
                                source={crossIcon}
                                style={styles.crossIcon}
                            />
                        </TouchableOpacity>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => this.onPressCamera()} style={styles.leftButton}>
                                <Image
                                    source={cameraIcons}
                                    style={styles.cameraIcon}
                                />
                                <Text style={styles.takePictureText}>{`TAKE PICTURE\nFROM CAMERA`}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.onPressPickImage()} style={styles.rightButton}>
                                <Image
                                    source={galleryIcon}
                                    style={styles.cameraIcon}
                                />
                                <Text style={styles.takePictureText}>{`ADD FROM\nGALLERY`}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
    render() {
        return (
            //Merge Engine DefaultContainer
            <SafeAreaView style={styles.innerContainer}>
                <TopHeader
                    headerTitle={"Edit Profile"}
                    onPressLeft={() => this.props.navigation.goBack()}
                    headerLeftIconName={backIcon}
                    navigation={this.props.navigation}
                    headerTitleStyle={{}}
                    headerStyle={{}}
                />
                <KeyboardAwareScrollView style={styles.container}>

                    <View style={styles.formContainer}>
                        {this.renderCameraButton()}
                        <Text style={styles.inputText}>Name</Text>
                        <TextInput style={styles.textInput}
                            value={this.state.name}
                            {...this.txtInputNameProps}
                        />
                        <Text style={styles.inputText}>Email</Text>
                        <TextInput style={styles.textInput}
                            value={this.state.email}
                            autoCompleteType="email"
                            keyboardType="email-address"
                            editable={false}
                            {...this.txtInputEmailProps}
                        />
                        <Text style={styles.inputText}>Phone No</Text>
                        <TextInput style={styles.textInput}
                            value={this.state.phone}
                            keyboardType={'number-pad'}
                            {...this.txtInputPhoneProps} />
                    </View>
                </KeyboardAwareScrollView>
                <GreenButton
                    title="SAVE PROFILE"
                    customStyle={[styles.loginButton, {
                        opacity: this.state.email.trim() === "" &&
                            this.state.name.trim() === "" && this.state.phone.trim() === "" ? 0.5 : 1
                    }]}
                    customTxtStyle={styles.loginText}
                    onPress={() => this.validateInput()}
                />
                {this.renderImagePickerModal()}
                <ApplicationLoader isFetching={this.state.isFetching} />
                <CustomErrorModal showModal={this.state.showAlertModal} message={this.state.message}
                    isShowError={this.state.isShowError} hideErrorModal={() => this.setState({ showAlertModal: false })} />
            </SafeAreaView>

            //Merge Engine End DefaultContainer
        );
    }
}

// Customizable Area Start

// Customizable Area End
