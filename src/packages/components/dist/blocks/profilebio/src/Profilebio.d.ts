import ProfilebioController, { Props } from "./ProfilebioController";
export default class Profilebio extends ProfilebioController {
    constructor(props: Props);
    renderHeaderView: () => JSX.Element;
    renderListItems: () => JSX.Element;
    renderListBottomView: () => JSX.Element;
    renderImagePickerModal: () => JSX.Element;
    renderGuestModal: () => JSX.Element;
    renderLogoutModal: () => JSX.Element;
    render(): JSX.Element;
}
