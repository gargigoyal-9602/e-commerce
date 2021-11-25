export declare const configJSON: any;
import CatalogueController, { Props } from "./CatalogueController";
export default class Catalogue extends CatalogueController {
    constructor(props: Props);
    headerTopView: () => JSX.Element;
    renderListItem: (item: any, type: string) => JSX.Element;
    renderHomeView: () => JSX.Element;
    renderSwiperView: (index: any) => JSX.Element;
    render(): JSX.Element;
}
