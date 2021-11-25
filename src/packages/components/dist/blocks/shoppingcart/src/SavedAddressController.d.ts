import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
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
}
interface SS {
    id: any;
}
export default class SavedAddressController extends BlockComponent<Props, S, SS> {
    getAddressListApiCallId: any;
    _unsubscribe: any;
    defaultAddressApiCallId: any;
    deleteAddressApiCallId: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    handleBackButtonClick: () => boolean;
    componentWillUnmount(): Promise<void>;
    getToken: () => Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    getListRequest: (token: any) => void;
    updateAddressData: (item: any, is_default: boolean) => void;
    setDefaultAddress: (id: number) => boolean;
    deleteAddress: (id: number) => boolean;
    onPressProduct: (address: any) => void;
}
export {};
