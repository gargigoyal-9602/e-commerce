import SavedAddressController, { Props } from "./SavedAddressController";
export default class SavedAddress extends SavedAddressController {
    constructor(props: Props);
    renderEmptyAddressView: () => JSX.Element;
    renderAddressCell: (item: any, index: number) => JSX.Element;
    renderAddressList: () => JSX.Element;
    renderDeleteModal: () => JSX.Element;
    renderUpdateAddressModal: () => JSX.Element;
    render(): JSX.Element;
}
