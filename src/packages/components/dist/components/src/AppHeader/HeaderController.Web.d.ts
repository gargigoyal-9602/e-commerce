import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
    history: any;
}
export interface S {
    user: any;
    isOpen: boolean;
    name: string;
    category: any;
    SearchDropDown: boolean;
    quickResults: any;
    recentSearches: any;
    searchQuery: string;
    refreshMenu: boolean;
    desktopToggle: boolean;
    showLogout: boolean;
    menuCategory: any;
    currentPageActive: string;
    isLoggedIn: boolean;
    userProfileImg?: any;
    themData: any;
    activeTab: any;
    currentPageArray?: string;
    currentpagestr?: string;
    cartLength: any;
    wishlistLength: any;
    collectionCategory: any;
}
export interface SS {
    id: any;
}
export default class EmailLoginRegistrationControllerWeb extends BlockComponent<Props, S, SS> {
    getLiveSearchApiCallId: string;
    getRecentSearchApiCallId: string;
    GetCategoryListApiCallId: string;
    GetCartApiCallId: string;
    getAllWishlistApiCallId: string;
    currentCountryCode: any;
    constructor(props: Props);
    receive(from: string, message: Message): Promise<void>;
    componentDidMount(): Promise<void>;
    componentWillReceiveProps(nextProps: any): void;
    search: () => void;
    routeToAll(route: string): void;
    toggle(): void;
    setSearchDropDown(value: any): void;
    setSearchQuery(value: string): void;
    setDesktopToggle(value: boolean): void;
    quickSearch(): void;
    setShowLogout(): void;
    showToggleMenu: () => void;
    getCart: () => boolean;
    getAllWishlist: () => boolean;
    getCategoryList: () => boolean;
    getLiveSearch: () => boolean;
    getRecentSearch: () => boolean;
    onRouteChange: () => void;
    activeTabToggle: (tab: any) => void;
    searchnull: () => void;
}
