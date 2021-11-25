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
    brandsText: string;
    tagsText: string;
    catHolder: any;
    customErrorModal: boolean;
    customErrorMessage: String;
    isFetching: boolean;
    subCategory: boolean;
    tags: boolean;
    discount: boolean;
    tagsList: any;
    searchedTagsFilterList: any;
    searchedBrandsFilterList: any;
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
    handleBackButtonClick: () => boolean;
    componentWillUnmount(): Promise<void>;
    getToken: () => Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    apiCall: (data: any) => Promise<string>;
    onCheckPressBrand(data: any): void;
    onCheckPressTags(data: any): void;
    onCheckPressCategory(data: any): void;
    handleInputChange: (value: string) => void;
    searchFilterFunction: (text: string) => void;
    handleInputChangeTags: (value: string) => void;
    searchFilterFunctionTags: (text: string) => void;
    handleInputChangeBrands: (value: string) => void;
    searchFilterFunctionBrands: (text: string) => void;
    _onPressChange(value: string): void;
    onPressApplyFilter: () => void;
    changeColor: (item: string) => "#fff" | undefined;
    getListRequest: () => Promise<void>;
    getBrandList: () => Promise<void>;
    getTagsList: () => Promise<void>;
    clearFilterData: () => void;
    onCheckDiscoutTrue: () => void;
}
export {};
