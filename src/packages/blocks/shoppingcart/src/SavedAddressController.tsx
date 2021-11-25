import { BackHandler } from 'react-native';
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// Customizable Area End
import StorageProvider from '../../../framework/src/StorageProvider';

export const configJSON = require("./config");

export interface Props {
    navigation: any;
    id: string;
    // Customizable Area Start
    // Customizable Area End
}

interface S {
    // Customizable Area Start
    showCouponCodeModal: boolean;
    showGuestModal: boolean;
    textInputFocusData: any;
    textInputData: any;
    textInputErrorData: any;
    shippingtextInputData: any;
    shippingtextInputFocusData: any;
    shippingtextInputErrorData: any;
    showDeleteModal: boolean;
    showUpdateAddressModal: boolean;
    token: any;
    addressList: any;
    isShowError: boolean;
    showAlertModal: boolean;
    message: any;
    isFetching: boolean;
    selectedAddressData: any;

    // Customizable Area End
}

interface SS {
    id: any;
}

export default class SavedAddressController extends BlockComponent<
    Props,
    S,
    SS
    > {
    getAddressListApiCallId: any;
    _unsubscribe: any;
    defaultAddressApiCallId: any;
    deleteAddressApiCallId: any;
    constructor(props: Props) {
        super(props);
        this.receive = this.receive.bind(this);

        // Customizable Area Start
        this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];

        this.state = {
            showCouponCodeModal: false,
            showGuestModal: false,
            token: "",
            addressList: [],
            isShowError: false,
            isFetching: false,
            message: null,
            showAlertModal: false,
            selectedAddressData: null,
            textInputData: {
                name: '',
                flat_no: '',
                address: '',
                zip_code: '',
                phone_number: '',
                city: '',
                state: '',
                country: '',
                is_default: false
            },
            textInputFocusData: {
                nameFocus: false,
                flatNoFocus: false,
                addressLine1Focus: false,
                addressLine2Focus: false,
                pinCodeFocus: false,
                phoneNoFocus: false,
                cityFocus: false,
                stateFocus: false,
                countryFocus: false,
            },
            textInputErrorData: {
                nameError: false,
                flatNoError: false,
                addressLine1Error: false,
                addressLine2Error: false,
                pinCodeError: false,
                phoneNoError: false,
                cityError: false,
                stateError: false,
                countryError: false,
            },
            shippingtextInputData: {
                name: '',
                flatNo: '',
                addressLine1: '',
                addressLine2: '',
                pinCode: '',
                phoneNo: '',
                city: '',
                state: '',
                country: '',
            },
            shippingtextInputFocusData: {
                nameFocus: false,
                flatNoFocus: false,
                addressLine1Focus: false,
                addressLine2Focus: false,
                pinCodeFocus: false,
                phoneNoFocus: false,
                cityFocus: false,
                stateFocus: false,
                countryFocus: false,
            },
            shippingtextInputErrorData: {
                nameError: false,
                flatNoError: false,
                addressLine1Error: false,
                addressLine2Error: false,
                pinCodeError: false,
                phoneNoError: false,
                cityError: false,
                stateError: false,
                countryError: false,
            },
            showDeleteModal: false,
            showUpdateAddressModal: false,

        };
        // Customizable Area End
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    }

    async componentDidMount() {
        super.componentDidMount();
        this._unsubscribe = this.props.navigation.addListener('willFocus', () => {
            this.getToken();
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        });
    }
    
      handleBackButtonClick = () => {
        this.props.navigation.goBack();
        return true;
      }
    
      async componentWillUnmount() {
        this._unsubscribe.remove();
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
      }

    getToken = async () => {
        const token = await StorageProvider.get('Userdata');
        this.setState({ token: token })
        this.getListRequest(token);
    };

    async receive(from: string, message: Message) {
        const apiRequestCallId = message.getData(
            getName(MessageEnum.RestAPIResponceDataMessage)
        );

        var responseJson = message.getData(
            getName(MessageEnum.RestAPIResponceSuccessMessage)
        );

        var errorReponse = message.getData(
            getName(MessageEnum.RestAPIResponceErrorMessage)
        );


        if (apiRequestCallId === this.deleteAddressApiCallId) {
            this.setState({ showDeleteModal: false }, () => {
                this.getListRequest(this.state.token)
            });
        }

        if (responseJson && responseJson.data) {
            if (apiRequestCallId === this.getAddressListApiCallId) {
                let array = responseJson.data;
                this.setState({ addressList: array, isFetching: false, });
            } else if (apiRequestCallId === this.defaultAddressApiCallId) {
                this.setState({ showUpdateAddressModal: false }, () => {
                    this.getListRequest(this.state.token)
                });
            }
        }
        else if (responseJson && responseJson.errors) {
            this.setState({
                isFetching: false,
            })
        }
        else if (errorReponse) {

        }
        // Customizable Area End
    }

    // Customizable Area Start
    getListRequest = (token: any) => {
        this.setState({ isFetching: true })
        const header = {
            "Content-Type": configJSON.ApiContentType,
            token: token
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getAddressListApiCallId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.createNewAddressAPIEndPoint
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            configJSON.apiMethodTypeGet
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
    }

    updateAddressData = (item: any, is_default: boolean) => {
        this.setState({
            textInputData: {
                name: item.name,
                flat_no: item.flat_no,
                address: item.address,
                zip_code: item.zip_code,
                phone_number: item.phone_number,
                city: item.city,
                state: item.state,
                country: item.country,
                is_default: true
            },
            isFetching: true
        }, () => { this.setDefaultAddress(item.id) })

    }

    setDefaultAddress = (id: number) => {

        const header = {
            "Content-Type": configJSON.ApiContentType,
            token: this.state.token
        };
        const httpBody = {
            address: this.state.textInputData
        }
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.defaultAddressApiCallId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.createNewAddressAPIEndPoint + "/" + id
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestBodyMessage),
            JSON.stringify(httpBody)
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            configJSON.apiMethodTypePut
        );

        runEngine.sendMessage(requestMessage.id, requestMessage);

        return true;
    }

    deleteAddress = (id: number) => {
        this.setState({ isFetching: true })
        const header = {
            "Content-Type": configJSON.ApiContentType,
            token: this.state.token
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.deleteAddressApiCallId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.createNewAddressAPIEndPoint + "/" + id
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            configJSON.apiMethodTypeDel
        );

        runEngine.sendMessage(requestMessage.id, requestMessage);

        return true;
    }

    onPressProduct = (address: any) => {
        if(this.props.navigation.state.params && this.props.navigation.state.params.isFromCheckout) {
            this.props.navigation.state.params?.onSetAddress(address)
            this.props.navigation.goBack();
        }
    }
}
