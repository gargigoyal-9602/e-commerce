import HelpCenterDataController, { Props } from "./HelpCenterDataController";
export default class HelpCenterData extends HelpCenterDataController {
    constructor(props: Props);
    renderQuestionView: () => JSX.Element;
    renderCommanData: () => JSX.Element;
    render(): JSX.Element;
}
