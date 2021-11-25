import ForgotPasswordController, { Props } from "./ForgotPasswordController";
export default class ForgotPassword extends ForgotPasswordController {
    constructor(props: Props);
    renderTopHeader: () => JSX.Element;
    renderForgotHeader: () => JSX.Element;
    renderCounter(): JSX.Element;
    render(): JSX.Element;
}
