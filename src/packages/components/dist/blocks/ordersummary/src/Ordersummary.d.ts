import OrdersummaryController, { Props } from "./OrdersummaryController";
export default class Ordersummary extends OrdersummaryController {
    constructor(props: Props);
    renderEmptyDataView: () => JSX.Element;
    renderMyOrderCell: (item: any, _: number) => JSX.Element;
    renderMyOrderList: () => JSX.Element;
    renderBottomDetails: () => JSX.Element | undefined;
    renderShippingAddress: () => JSX.Element;
    renderBillingAddress: () => JSX.Element;
    renderPaymentOption: () => JSX.Element;
    renderGuestModal: () => JSX.Element;
    render(): JSX.Element;
}
