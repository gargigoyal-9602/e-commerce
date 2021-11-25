import FilteroptionsController, { Props } from "./FilteroptionsController";
export default class Filteroptions extends FilteroptionsController {
    constructor(props: Props);
    renderPrice(): JSX.Element | undefined;
    renderListItemCategory: (item: any) => JSX.Element;
    renderCategory(): JSX.Element | undefined;
    renderListItem: (item: any) => JSX.Element;
    renderTagsListItem: (item: any) => JSX.Element;
    renderBrand(): JSX.Element | undefined;
    renderTags(): JSX.Element | undefined;
    render(): JSX.Element;
}
