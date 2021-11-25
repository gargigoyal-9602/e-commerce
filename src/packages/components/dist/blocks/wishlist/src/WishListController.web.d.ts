import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
    history: any;
    productList: any;
    getWishList: any;
}
interface S {
    showModal: boolean;
    removeProduct: any;
    loading?: boolean;
    cartId: any;
    productToBeAdded: any;
    isItemAddedToCart?: boolean;
    getAddedProductID?: any;
}
interface SS {
    id: any;
}
export default class WishListController extends BlockComponent<Props, S, SS> {
    deleteItemAPICallId: string;
    addToWishListAPICallId: string;
    apiEmailLoginCallId: string;
    validationApiCallId: string;
    GetIsCartCreatedApiCallId: string;
    postCreateCartApiCallId: string;
    emailReg: RegExp;
    labelTitle: string;
    putItemToCartApiCallId: string;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    addToWishlist(product: any): void;
    removeFromWishlist(product: any): void;
    removeProductFromWishList(): void;
    addToCart: (product: any) => void;
    toggleModal(): void;
    onHandleConfirm(): void;
    getIsCartCreated: () => boolean;
    postCreateCart: (product: any) => boolean;
    putItemToCart: (cartId: any) => boolean;
}
export {};
