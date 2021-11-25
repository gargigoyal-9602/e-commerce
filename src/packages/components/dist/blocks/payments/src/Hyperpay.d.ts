import HyperpayController, { Props } from "./HyperpayController";
export default class Hyperpay extends HyperpayController {
    constructor(props: Props);
    _updateMasterState: (attrName: string, value: string) => void;
    render(): JSX.Element;
}
