import "../assets/css/index.scoped.css";
import "../assets/css/pagination.css";
import FilteroptionsController, { Props } from "./FilteroptionsController.web";
export default class Filteroptions extends FilteroptionsController {
    constructor(props: Props);
    showResponsiveFilter: () => void;
    render(): JSX.Element;
}
