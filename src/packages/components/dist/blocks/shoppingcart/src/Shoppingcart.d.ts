import ShoppingcartController, { Props } from "./ShoppingcartController";
export default class Shoppingcart extends ShoppingcartController {
    constructor(props: Props);
    renderEmptyDataView: () => JSX.Element;
    renderMyOrderCell: (item: any, index: number) => JSX.Element;
    renderMyOrderList: () => JSX.Element;
    renderBottomDetails: () => JSX.Element | undefined;
    renderCouponCodeModal: () => JSX.Element;
    renderGuestModal: () => JSX.Element;
    render(): JSX.Element;
}
