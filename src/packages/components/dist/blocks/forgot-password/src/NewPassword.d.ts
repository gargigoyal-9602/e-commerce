import NewPasswordController, { Props } from "./NewPasswordController";
export default class NewPassword extends NewPasswordController {
    constructor(props: Props);
    renderTopHeader: () => JSX.Element;
    renderForgotHeader: () => JSX.Element;
    render(): JSX.Element;
}
