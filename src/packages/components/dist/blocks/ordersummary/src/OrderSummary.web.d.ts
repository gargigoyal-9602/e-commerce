import '../assets/css/order-summary.css';
import '../assets/css/index.scoped.css';
import OrderSummaryWebController, { Props } from './OrderSummaryController.web';
export default class OrderSummary extends OrderSummaryWebController {
    constructor(props: Props);
    render(): JSX.Element;
}
