import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    showKeyBoard: boolean;
    token: string;
    searchData: string;
    categoryList: any;
    searchList: any;
    recentList: any;
    productSearchList: any;
    categorySearchList: any;
    subCategorySearchList: any;
    searchComplete: boolean;
    resultsCount: number;
    showAlertModal: boolean;
    isShowError: boolean;
    message: any;
    recentSubCategoryList: any;
    recentCategoryList: any;
}
interface SS {
    id: any;
}
export default class SearchController extends BlockComponent<Props, S, SS> {
    searchProductId: any;
    recentSearchApiId: any;
    _unsubscribe: any;
    getCategoryListId: any;
    saveSearchId: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    handleBackButtonClick: () => boolean;
    componentWillUnmount(): Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    apiCall: (data: any) => Promise<string>;
    onSearchProduct: () => Promise<void>;
    getSearchData: () => Promise<void>;
    saveSearch: (url: string) => Promise<void>;
    getRecentSearchListSuccessCallBack: (res: any) => void;
    getRecentSearchListFailureCallBack: (error: any) => void;
    getCategoryListSuccessCallBack: (res: any) => void;
    getCategoryListFailureCallBack: (error: any) => void;
    onPressSearchData: (item: any) => void;
    onPressRecentSeacrhData: (item: any) => void;
    onPressCategory: (item: any) => void;
}
export {};
