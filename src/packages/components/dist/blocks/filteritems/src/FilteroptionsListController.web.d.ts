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
    arrayHolder: any;
    brandList: any;
    brandSearch: string;
    tagsList: any;
    categoryList: any;
    colorList: any;
    colorSearch: any;
    priceList: any;
    filterObj: any;
    subCategorySearch: any;
    prevSubCategorySearch: any;
    sizesList: any;
    value: any;
    isDiscountChecked?: boolean;
    isExcludeChecked?: boolean;
    maxPrice?: number;
    minPrice?: number;
    givenMaxValue?: number;
    givenMinValue?: number;
    isGivenRangeSlected?: boolean;
}
interface SS {
    id: any;
}
export default class FilterOptionListController extends BlockComponent<Props, S, SS> {
    getProductApiCallId: any;
    getBrandProductApiCallId: any;
    getTagProductApiCallId: any;
    getProductCategoryApiCallId: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    componentWillReceiveProps(prevState: any): void;
    forBannertoggleCheckBox: (id: any, type: any) => void;
    toggleCheckBox: (id: any, type: any) => void;
    categoryChecked: () => void;
    subCategoryChecked: () => void;
    getToken: () => void;
    unCheckCheckBox: (type: any, id: any) => void;
    receive(from: string, message: Message): Promise<void>;
    getBrandList: (token: any) => void;
    getTagList: (token: any) => void;
    getCategoryList: (token: any) => void;
    getColorList: (token: any) => void;
    getPriceList: (token: any) => void;
    getListRequest: (token: any) => void;
    getSizeList: () => void;
    getPriceRangeList: () => void;
}
export {};
