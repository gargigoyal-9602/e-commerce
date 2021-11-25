import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    txtInputValue: string;
    txtSavedValue: string;
    enableField: boolean;
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
    filterData: any;
    filterProducList: any;
    sortMenu: Array<any>;
    dropdownOpen: boolean;
    sort_by: string;
    order_by: string;
    value: string;
    order_field: string;
    page: any;
    per_page: any;
    cartId: any;
    productToBeAdded: any;
    searchQuery: any;
    newest: any;
    loading: boolean;
    loadMoreShow: any;
    prevUrl: string;
    Url: string;
    qParams: string;
    loading: boolean;
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
    GetIsCartCreatedApiCallId: string;
    postCreateCartApiCallId: string;
    constructor(props: Props);
    removeFilter: (data: any, type: any, itemId: any) => void;
    componentDidMount(): Promise<void>;
    componentWillReceiveProps(nextProps: any): void;
    receive(from: string, message: Message): Promise<void>;
    postWishlist: (catalogue_id: any) => boolean;
    delWishlist: (catalogue_id: any) => boolean;
    putItemToCart: (cartId: any) => boolean;
    getIsCartCreated: () => boolean;
    postCreateCart: (product: any) => boolean;
    addToCart: (product: any) => void;
    getProductDetails: () => boolean;
    toSetDefaultVariant: () => void;
    getProductList: (token: any) => void;
    removeSearchQuery: () => void;
}
export {};
