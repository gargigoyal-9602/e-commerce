import OrdermanagementController, { Props } from "./OrdermanagementController";
export default class Ordermanagement extends OrdermanagementController {
    constructor(props: Props);
    renderEmptyAddressView: () => JSX.Element;
    renderProductItemListCell: (item: any, index: any, orderItem: any) => JSX.Element | undefined;
    showBottomButton: (orderItem: any) => JSX.Element | null;
    renderMyOrderCell: (orderItem: any) => JSX.Element;
    renderMyOrderList: () => JSX.Element;
    renderCancelOrderModal: () => JSX.Element;
    renderSubmitReviewModal: () => JSX.Element;
    render(): JSX.Element;
}
