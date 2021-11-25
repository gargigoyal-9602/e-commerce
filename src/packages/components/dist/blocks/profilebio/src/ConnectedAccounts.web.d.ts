import ConnnectedAccountsController, { Props } from './ConnectedAccountsController.web';
import '../assets/styles/styles.css';
import '../assets/styles/single-order.scoped.css';
import '../assets/styles/connectedAccounts.css';
export default class ConnectedAccounts extends ConnnectedAccountsController {
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    closeModal: () => void;
    shouldComponentUpdate(a: any, b: any): boolean;
    render(): JSX.Element;
}
