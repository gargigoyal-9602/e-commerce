import OrderdetailviewController, { Props } from "./OrderdetailviewController";
export default class Orderdetailview extends OrderdetailviewController {
    constructor(props: Props);
    renderMyOrderCell: () => JSX.Element;
    renderMyOrderDetailView: () => JSX.Element | undefined;
    renderOrderStatusView: () => JSX.Element | undefined;
    renderSubsctionOrdersView: () => JSX.Element;
    renderOrderShippingAddressView: () => JSX.Element | undefined;
    renderStatusItem: ({ item, index }: any) => JSX.Element;
    renderCompleteOrderStatusView: () => JSX.Element | undefined;
    renderCancelOrderModal: () => JSX.Element;
    renderSubmitReviewModal: () => JSX.Element;
    render(): JSX.Element;
}
