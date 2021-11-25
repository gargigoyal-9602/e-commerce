import "../assets/styles/product-rating.scoped.css";
import ProductRatingController, { Props } from "./ProductRatingController.web";
declare class ProductRating extends ProductRatingController {
    constructor(props: Props);
    render(): JSX.Element;
}
export default ProductRating;
