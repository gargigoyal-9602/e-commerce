import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
}
interface S {
    activeTab?: any;
    addingNewAddressCheck?: boolean;
    isDeleteAddressCheck?: boolean;
    addressIndex?: number;
    editAddressChecked?: boolean;
    userAddedAddressDeatails?: any;
    userToken?: any;
    userAddress?: Array<any>;
    deliveryAddressID?: number;
    defaultAddressCheck?: boolean;
    deleteAddressId?: number;
    defaultAddressID?: number;
    isDefaultAddressChanged?: boolean;
    loading?: boolean;
    showSpinner?: boolean;
    countryName?: string;
}
interface SS {
    id: any;
}
export default class AddressController extends BlockComponent<Props, S, SS> {
    addNewAddressAPICallId: string;
    getUserDeliveryAddressAPICallId: string;
    updateDeliveryAddressByIdAPICallId: string;
    deleteDeliveryAddressByIdAPICallId: string;
    changeDefaultAddressAPICallId: string;
    constructor(props: Props);
    receive(from: string, message: Message): Promise<void>;
    addNewAddressHandler: (values: any) => void;
    updateAddressBasedonId: (values: any, id: any) => void;
    getDeliveryAddressList: () => void;
    deleteAddressBasedOnId: () => void;
    handleDefaultAddress: (id: any) => void;
}
export {};
