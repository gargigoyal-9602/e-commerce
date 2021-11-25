import FilteritemsController, { Props } from "./FilteritemsController";
export declare const configJSON: any;
export default class Filteritems extends FilteritemsController {
    constructor(props: Props);
    renderEmptyDataView: () => JSX.Element;
    renderSortByModal: () => JSX.Element;
    renderListItem: (item: any) => JSX.Element;
    render(): JSX.Element;
}
