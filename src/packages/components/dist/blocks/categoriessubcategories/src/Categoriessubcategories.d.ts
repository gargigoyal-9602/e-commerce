import CategoriessubcategoriesController, { Props } from "./CategoriessubcategoriesController";
export default class Categoriessubcategories extends CategoriessubcategoriesController {
    constructor(props: Props);
    renderCategories: (mainItem: any) => JSX.Element;
    renderSubCategories: (subItem: any, subIndex: number, item: any) => JSX.Element;
    render(): JSX.Element;
}
