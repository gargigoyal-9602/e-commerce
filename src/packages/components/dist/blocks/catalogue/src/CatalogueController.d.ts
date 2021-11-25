import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    isShowError: boolean;
    arrayHolder: any;
    recommendedList: any;
    token: string;
    customErrorModal: boolean;
    customErrorMessage: any;
    isFetching: boolean;
    categoriesArray: any;
    cartProduct: any;
    cartLength: number;
    selectedCatalogues: any;
    focusStatus: string;
    isDeepLinkUtilised: boolean;
    bannerImages: any;
}
interface SS {
    id: any;
}
export default class CatalogueController extends BlockComponent<Props, S, SS> {
    _unsubscribe: any;
    getProductApiCallId: any;
    getRecommendedApiCallId: any;
    addToWishlistApiCallId: any;
    removeFromWishlistApiCallId: any;
    getCategoriesApiCallId: any;
    getCartProductId: any;
    addToCartApiCallId: any;
    sendDeviceTokenApiCallId: any;
    getCartListId: any;
    notificationMessageId: any;
    getBannerImagesAPICallId: any;
    appObj: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    setupNotification: () => void;
    onRegister: (token: any) => Promise<void>;
    onNotification: (notify: any) => void;
    onOpenNotification: (notify: any) => void;
    sendDeviceTokenSuccessCallBack: (res: any) => void;
    sendDeviceTokenFailureCallBack: (error: any) => void;
    handleBackButtonClick: () => boolean;
    componentWillUnmount(): Promise<void>;
    setDeepLink: () => void;
    handleOpenURL: (event: any) => void;
    deepLinkNavigate: (url: any) => Promise<void>;
    getToken: () => Promise<void>;
    apiCall: (data: any) => Promise<string>;
    receive(from: string, message: Message): Promise<void>;
    getBannerImages: () => Promise<void>;
    getBannerImagesSuccessCallBack: (res: any) => void;
    onPressBanner: (item: any) => void;
    viewAll(productType: string): void;
    onHeartPress: (item: any) => void;
    addToWishlist: (id: any) => Promise<void>;
    removeFromWishlist: (id: any) => Promise<void>;
    getListRequest: (token: any) => Promise<void>;
    getRecommendedListRequest: (token: any) => Promise<void>;
    getCategories: () => Promise<void>;
    getCartHasProduct: () => Promise<void>;
    getCartList: () => Promise<void>;
    unsubscribeMessages: () => void;
}
export {};
