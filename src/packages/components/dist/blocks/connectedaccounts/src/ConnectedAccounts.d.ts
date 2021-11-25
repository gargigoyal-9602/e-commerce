import ConnectedAccountsController, { Props } from "./ConnectedAccountsController";
export default class ConnectedAccounts extends ConnectedAccountsController {
    constructor(props: Props);
    renderFacebookConnectedAccountView: (accountItem: any) => JSX.Element;
    renderGoogleConnectedAccountView: (accountItem: any) => JSX.Element;
    renderFacebookConnectAccountView: () => JSX.Element;
    renderGoogleConnectAccountView: () => JSX.Element;
    renderSocialViews: (accountItem: any) => JSX.Element | undefined;
    renderSocialConnectView: (itemCode: any) => JSX.Element | undefined;
    renderConnectedAccounts: () => JSX.Element;
    renderDisconnectModal: () => JSX.Element;
    render(): JSX.Element;
}
