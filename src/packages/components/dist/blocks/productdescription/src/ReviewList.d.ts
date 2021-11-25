import ReviewListController, { Props } from "./ReviewListController";
export default class ReviewList extends ReviewListController {
    constructor(props: Props);
    renderReviewCell: (item: any, index: any) => JSX.Element;
    renderReviewList: () => JSX.Element;
    render(): JSX.Element;
}
