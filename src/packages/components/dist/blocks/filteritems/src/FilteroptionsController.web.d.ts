import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    enableField: boolean;
    outOfStock: boolean;
    pricerange: boolean;
    brand: boolean;
    category: boolean;
    tag: boolean;
    checkedStock: boolean;
    checkedDiscounted: boolean;
    checkedBrand: any;
    rangeLow: any;
    rangeHigh: any;
    rangeMin: any;
    rangeMax: any;
    value: any;
    token: string;
    data: any;
    checkedCategory: boolean;
    checkedTag: boolean;
    brandsFilterList: any;
    BrandList: any;
    selectedItems: any;
    selectedCategory: any;
    scrollEnabled: boolean;
    priceMin: any;
    priceMax: any;
    price: any;
    searchedCategoryFilterList: any;
    categoryFilterList: any;
    searchText: string;
    catHolder: any;
    customErrorModal: boolean;
    customErrorMessage: String;
    isFetching: boolean;
    subCategory: boolean;
    tags: boolean;
    tagsList: any;
    filterBrand: Array<any>;
    YtMbFilter?: boolean;
}
interface SS {
    id: any;
}
export default class FilteroptionsController extends BlockComponent<Props, S, SS> {
    _rangeSlider: any;
    getCategoryApiCallId: any;
    getBrandApiCallId: any;
    applyAllApiCallId: any;
    getTagsApiCallId: any;
    _unsubscribe: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    componentWillUnmount(): Promise<void>;
    resizeWindow: () => void;
    handleBackButtonClick: () => boolean;
    getToken: () => Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    ytmbFilter: () => void;
}
export {};
