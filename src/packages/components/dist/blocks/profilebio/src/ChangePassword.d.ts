import ChangePasswordController, { Props } from "./ChangePasswordController";
export default class ChangePassword extends ChangePasswordController {
    constructor(props: Props);
    renderPasswordForm: () => JSX.Element;
    renderPasswordSuccessfullyChangedView: () => JSX.Element;
    render(): JSX.Element;
}
