import ProfilebioController, { Props } from './ProfilebioController.web';
import '../assets/styles/styles.css';
import '../assets/styles/addressStyles.css';
import '../assets/styles/profile.css';
import '../assets/styles/index.scoped.css';
/*** validation end */
export default class Profilebio extends ProfilebioController {
    constructor(props: Props);
    uploadImage: () => void;
    profileImageHandler: (e?: any) => void;
    imgBase64: (file: any, cb: any) => void;
    handleProfileEdit: () => void;
    modalClose: () => void;
    handleChangePassword: () => void;
    chnagePwdModalClose: () => void;
    successPasswordModalClose: () => void;
    addNewProfile: (e: any) => void;
    logoutModalClose: () => void;
    componentDidMount(): Promise<void>;
    shouldComponentUpdate(a: any, b: any): boolean;
    showPasswordHandler: (e: any) => void;
    showCurrentPasswordHandler: (e: any) => void;
    showConfirmPasswordHandler: (e: any) => void;
    render(): JSX.Element;
}
