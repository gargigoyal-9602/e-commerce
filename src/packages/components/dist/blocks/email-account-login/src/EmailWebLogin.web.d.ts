import EmailAccountLoginController from "./EmailLoginAccountController.web";
import '../assets/styles/emailLogin.css';
declare class LoginScreen extends EmailAccountLoginController {
    componentDidMount(): Promise<void>;
    toggle: (tab: any) => void;
    render(): JSX.Element;
}
export default LoginScreen;
