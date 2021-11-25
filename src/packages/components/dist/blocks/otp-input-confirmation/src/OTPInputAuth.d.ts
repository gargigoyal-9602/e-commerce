import OTPInputAuthController from "./OTPInputAuthController";
export default class OTPInputAuth extends OTPInputAuthController {
    renderTopHeader: () => JSX.Element;
    renderForgotHeader: () => JSX.Element;
    renderCounter(): JSX.Element;
    render(): JSX.Element;
}
