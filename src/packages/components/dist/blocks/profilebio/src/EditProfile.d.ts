import EditProfileController, { Props } from "./EditProfileController";
export default class EditProfile extends EditProfileController {
    constructor(props: Props);
    renderCameraButton: () => JSX.Element;
    renderImagePickerModal: () => JSX.Element;
    render(): JSX.Element;
}
