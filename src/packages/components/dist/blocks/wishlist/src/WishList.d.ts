import WishListController, { Props } from "./WishListController";
export declare const configJSON: any;
export default class WishList extends WishListController {
    constructor(props: Props);
    renderEmptyDataView: () => JSX.Element;
    renderListItem: (item: any) => JSX.Element | undefined;
    render(): JSX.Element;
}
