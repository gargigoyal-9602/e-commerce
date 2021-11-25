import InteractivefaqController, { Props } from "./InteractivefaqsController";
export default class Interactivefaq extends InteractivefaqController {
    constructor(props: Props);
    renderListItem: (item: any, index: any) => JSX.Element;
    render(): JSX.Element;
}
