import ProductDescriptionController, { Props } from "./ProductDescriptionController";
export declare const configJSON: any;
export default class ProductDescription extends ProductDescriptionController {
    constructor(props: Props);
    renderToolItem: (item: any, attribute: any, isFromColor: boolean) => JSX.Element;
    renderToolListSelector: (attributeData: any, attribute: any, isFromColor: boolean) => JSX.Element;
    renderSelectorTools: () => JSX.Element;
    renderVarientImageItems: (item: any, index: number) => JSX.Element;
    renderReviewCell: (item: any, index: number) => JSX.Element;
    renderReviewList: () => JSX.Element | undefined;
    renderProductReviewView: () => JSX.Element | undefined;
    renderViewAll: () => JSX.Element;
    renderGuestModal: () => JSX.Element;
    renderNotification: () => JSX.Element;
    renderButton: () => JSX.Element;
    renderTruncatedFooter: (handlePress: any) => JSX.Element;
    renderRevealedFooter: (handlePress: any) => JSX.Element;
    renderNotifiyModal: () => JSX.Element;
    render(): JSX.Element;
}
