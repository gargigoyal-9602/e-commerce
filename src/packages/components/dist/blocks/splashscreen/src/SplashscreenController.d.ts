import { BlockComponent } from "../../../framework/src/BlockComponent";
export declare let appObj: any;
export interface Props {
    navigation: any;
    id: string;
}
interface S {
    isDeepLinkUtilised: boolean;
}
interface SS {
    id: any;
}
export default class SplashscreenController extends BlockComponent<Props, S, SS> {
    timeoutHandle: any;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    componentWillUnmount(): Promise<void>;
}
export {};
