import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare const configJSON: any;
export interface Props {
    navigation: any;
    id: string;
    history: any;
    reviewData: any;
    toggle: any;
    isOpen: boolean;
    onSuccess: any;
}
interface S {
    rating: number;
    comment: string;
}
interface SS {
    id: any;
}
export default class SingleOrdersController extends BlockComponent<Props, S, SS> {
    apiEmailLoginCallId: string;
    validationApiCallId: string;
    fetchTrackingDetailsCallId: string;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    receive(from: string, message: Message): Promise<void>;
    setRating(value: any): void;
    onSubmit(data: any): void;
}
export {};
