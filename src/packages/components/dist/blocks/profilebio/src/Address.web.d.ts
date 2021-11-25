import '../assets/styles/styles.css';
import '../assets/styles/address.css';
import AddressController, { Props } from './AddressController.web';
import '../assets/styles/deleteAddressModal.css';
import '../assets/styles/defaultAddressModal.css';
/** validations end */
export default class Address extends AddressController {
    constructor(props: Props);
    openingNewAddressHandler: () => void;
    newAddressModalClose: () => void;
    deleteAddressModalClose: () => void;
    componentDidMount(): Promise<void>;
    changeDefaultAddressHandler: (data: any) => void;
    closeDefaultAddressModal: () => void;
    render(): JSX.Element;
}
