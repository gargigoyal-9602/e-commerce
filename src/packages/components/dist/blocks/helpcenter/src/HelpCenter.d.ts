import HelpCenterController, { Props } from "./HelpCenterController";
export default class HelpCenter extends HelpCenterController {
    constructor(props: Props);
    renderListItem: (item: any, index: number) => JSX.Element;
    renderItemSeparator: () => JSX.Element;
    render(): JSX.Element;
}
