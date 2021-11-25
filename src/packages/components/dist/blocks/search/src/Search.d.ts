import SearchController, { Props } from "./SearchController";
export default class Search extends SearchController {
    constructor(props: Props);
    renderEmptyDataView: () => JSX.Element;
    renderSearchBar: () => JSX.Element;
    renderListItem: (item: any) => JSX.Element | undefined;
    renderRecentListItem: (item: any) => JSX.Element;
    renderRecentSearch: () => JSX.Element;
    renderSearchData: () => JSX.Element;
    renderListItemCat: (item: any) => JSX.Element;
    renderCategory: () => JSX.Element;
    render(): JSX.Element;
}
