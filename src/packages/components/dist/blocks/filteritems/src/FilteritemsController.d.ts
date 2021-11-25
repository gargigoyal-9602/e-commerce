import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    token: string;
    data: any;
    productList: any;
    isSortByEnabled: boolean;
    showSortByModal: boolean;
    filterSelection: any;
    filterQueryParams: string;
    lastFilterQuery: string;
    noProductFound: boolean;
    customErrorModal: boolean;
    customErrorMessage: any;
    isFetching: boolean;
    screenName: string;
    cartProduct: any;
    cartLength: number;
    isShowError: boolean;
}
interface SS {
    id: any;
}
export default class FilteritemsController extends BlockComponent<Props, S, SS> {
    getProductApiCallId: any;
    applyFilterApiCallId: any;
    addToWishlistApiCallId: any;
    removeFromWishlistApiCallId: any;
    getCartProductId: any;
    addToCartApiCallId: any;
    getCartListId: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    componentWillUnmount(): Promise<void>;
    handleBackButtonClick: () => boolean;
    apiCall: (data: any) => Promise<string>;
    receive(from: string, message: Message): Promise<void>;
    getProductList: () => Promise<void>;
    getFilterDataList: () => void;
    onPressFilter: (filterQueryParams: any) => void;
    clearSortBy: () => void;
    navigateToFilter: () => void;
    onSelectFilter: (itemIndex: number) => void;
    removedRedundantSortFilterParams: () => string;
    onApplySortByFilter: () => void;
    getSoryByFilterParams: (itemIndex: number) => string;
    addToWishlist: (id: any) => Promise<void>;
    removeFromWishlist: (id: any) => Promise<void>;
    onHeartPress: (item: any) => void;
    getListRequest: () => Promise<void>;
    applyFilters: (url: string) => Promise<void>;
    addToCart: (item: any) => Promise<void>;
    getCartHasProduct: () => Promise<void>;
    getCartList: () => Promise<void>;
}
export {};
