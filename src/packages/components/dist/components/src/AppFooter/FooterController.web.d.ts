import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
export interface Props {
}
export interface S {
    theamData: any;
    usefulLinks: any;
    isBrandSettingsLoaded?: boolean;
    isShowFB?: boolean;
    isShowGoogle?: boolean;
    isShowInsta?: boolean;
    isShowYouTube?: boolean;
    isShowTwitter?: boolean;
    FaqData: any;
    helpCenterData: any;
}
export interface SS {
    id: any;
}
export default class FooterController extends BlockComponent<Props, S, SS> {
    helpCenterallId: string;
    barndAPiCallId: string;
    FAQAPICallId: string;
    constructor(props: Props);
    receive(from: string, message: Message): Promise<void>;
    componentDidMount(): Promise<void>;
    getHelpceterData(): void;
    handleBrandSettings: () => void;
    getMyThemes: (themeAttributes: any) => any;
    getFAQsData: () => void;
}
