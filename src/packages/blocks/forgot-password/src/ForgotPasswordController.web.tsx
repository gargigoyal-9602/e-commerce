import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
import { runEngine } from "../../../framework/src/RunEngine";
import { Message } from "../../../framework/src/Message";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import axios from "axios";
// @ts-ignore
import map from "lodash/map";

import { uuid } from 'uuidv4';
// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
    navigation: any;
    // Customizable Area Start
    // Customizable Area End
}

interface S {
    // Customizable Area Start
    email: string;
    emailError: string;
    notRegister: string;
    otp: string;
    otpError: string;
    passwordError: string;
    otpToken: any;
    showSpinner: boolean,
    timer: number
    seconds: any;

    loading?: boolean;
    // Customizable Area End
}

interface SS {
    // Customizable Area Start
    navigation: any;
    // Customizable Area End
}

// Customizable Area Start

// Customizable Area End

export default class ForgotPasswordController extends BlockComponent<
    Props,
    S,
    SS
> {
    // Customizable Area Start
    validationAPICallId: any = "";
    guestLoginApiCallId: string = "";
    resetOTPApiCallId: string = "";
    confirmEmailAPiCallID: string = "";
    // Customizable Area End

    constructor(props: Props) {
        super(props);
        this.subScribedMessages = [
            // Customizable Area Start
            getName(MessageEnum.RestAPIResponceMessage),
            getName(MessageEnum.NavigationPayLoadMessage),
            getName(MessageEnum.CountryCodeMessage),
            getName(MessageEnum.ReciveUserCredentials)
            // Customizable Area End
        ];
        // @ts-ignore
        this.timer = 0;
        this.receive = this.receive.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

        // Customizable Area Start

        this.state = {
            email: "",
            emailError: "",
            notRegister: "",
            otp: "",
            otpError: "",
            passwordError: "",
            otpToken: "",
            showSpinner: false,
            timer: 0,
            seconds: 5
        };
        // Customizable Area End
    }

    async componentDidMount() {
    }

    secondsToTime(secs: any) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            // "h": hours,
            // "m": minutes,
            "s": seconds
        };
        return obj;
    }

    startTimer() {
        // @ts-ignore
        if (this.timer == 0 && this.state.timer > 0) {
            // @ts-ignore
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // @ts-ignore
        let timer = this.state.timer - 1;
        this.setState({
            timer: timer,
        });

        // Check if we're at zero.
        if (timer == 0) {
            // @ts-ignore
            clearInterval(this.timer);
        }
    }

    async receive(from: string, message: Message) {
        runEngine.debugLog('Message Received', message);
        if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
            let apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
            var responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
            var errorResponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
            if (apiRequestCallId === this.guestLoginApiCallId) {
                if (responseJson && responseJson.data && responseJson.meta) {
                    this.setState({
                        // ...this.state,
                        loading: false
                    });
                    localStorage.setItem('guestUserData', JSON.stringify(responseJson.data));
                    localStorage.setItem('token', responseJson.meta.token);
                    //@ts-ignore
                    window.notify([{ type: 'success', message: 'Welcome to Our Store !' }])
                    //@ts-ignore
                    this.props?.history?.push('/home-page');
                }
            }
            if (apiRequestCallId === this.resetOTPApiCallId) {
                if (responseJson && responseJson.meta && responseJson.data) {
                    this.setState({ showSpinner: false });
                    const { meta, data } = responseJson;
                    localStorage.setItem("token", meta.token);
                    // @ts-ignore
                    this.timer = 0;
                    this.setState({ emailError: "success", notRegister: "", timer: 60, seconds: 60 }, this.startTimer)
                    // @ts-ignore
                    window.notify([{ message: "OTP has been sent to you", type: "success" }])
                }
                if (responseJson && responseJson.errors && responseJson.errors.length > 0) {
                    this.setState({ showSpinner: false });
                    //@ts-ignore
                    window.notify([{ type: 'danger', message: responseJson.errors[0]?.account || responseJson.errors[0]?.pin || responseJson.errors[0]?.phone_number || 'something went wrong!' }]);
                }
            }
            if (apiRequestCallId === this.confirmEmailAPiCallID) {
                if (responseJson && responseJson.data && responseJson.meta) {
                    this.setState({ showSpinner: false });
                    // @ts-ignore
                    window.notify([{ message: responseJson?.meta?.message, type: "success" }]);
                }
                if (responseJson && responseJson.errors && responseJson.errors.length > 0) {
                    this.setState({ showSpinner: false })
                    //@ts-ignore
                    window.notify([{ type: 'danger', message: responseJson.errors[0] || 'something went wrong!' }])
                }
            }
        }
        else {

        }
    }

    isValidEmail(email: string) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    isValidOTP(otp: any) {
        const re = /^\d{5}$/gm.test(otp);
        return re;
    }

    SendOtpBtn = (e: any) => {
        e.preventDefault();
        let res;
        const { emailError, otp, email, } = this.state;

        if (emailError === 'success') {
            if (otp == '') {
                // setOtpError('empty');
                this.setState({ otpError: "empty" })
            } else {
                let v = this.isValidOTP(otp);
                if (!v) {
                    // setOtpError('invalid');
                    this.setState({ otpError: "invalid" })
                } else {
                    // setOtpError('');
                    this.setState({ otpError: "" })
                    this.verifyOTP();
                }
            }
        } else {
            if (email == '') {
                this.setState({ emailError: "empty" })
                // setEmailError('empty');
                return;
            } else {
                let d = this.isValidEmail(email);
                if (!d) {
                    // setNotRegister('');
                    this.setState({ emailError: "wrong", notRegister: "" })
                    // setEmailError('wrong');
                } else {
                    if (emailError != 'success') {
                        this.emailConfirm();
                    }
                }
            }
        }
    };

    emailConfirm = () => {
        const { email } = this.state;
        // setShowSpinner(true);
        this.setState({ showSpinner: true })
        let data = {
            data: {
                type: "email_account",
                process: "reset_password",
                attributes: {
                    email
                }
            }
        }

        const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
        this.resetOTPApiCallId = requestMessage.messageId;
        requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.sendOTPAPIEndPoint);

        const headers = {
            'Content-Type': 'application/json'
        }

        requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(headers));
        requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.httpPostMethod);
        requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(data));

        return runEngine.sendMessage(requestMessage.id, requestMessage);
    };

    handleEmail = (e: any) => {
        // setEmail(e.target.value);
        this.setState({ email: e.target.value })
        if (e.target.value.length > 0) {
            // setOtp('');
            this.setState({ otp: "" })
        }
        if (this.state.emailError != '') {
            let check = this.isValidEmail(e.target.value);
            if (check) {
                // setEmailError('');
                this.setState({ emailError: "" });
            } else {
                this.setState({ emailError: "wrong" })
                // setEmailError('wrong');
            }
        }

    };

    handleOTP = (e: any) => {
        // setOtp(e.target.value);
        this.setState({ otp: e.target.value })
        if (this.state.otpError != '' || e.target.value.length > 5) {
            let check = this.isValidOTP(e.target.value);
            // console.log(check, "check");
            if (check) {
                // setOtpError('');
                this.setState({ otpError: "" })
            } else {
                // setOtpError('invalid');
                this.setState({ otpError: "invalid" })
            }
        }
    };

    verifyOTP = () => {
        const token = localStorage.getItem("token");
        // setShowSpinner(true);
        this.setState({ showSpinner: true });

        const data = {
            token,
            pin: this.state.otp
        }
        this.setState({ otpToken: token })
        const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
        this.confirmEmailAPiCallID = requestMessage.messageId;
        requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.verifyOTPAPIEndPoint);

        const headers = {
            'Content-Type': 'application/json'
        };

        requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(headers));
        requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.httpPostMethod);
        requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(data));

        return runEngine.sendMessage(requestMessage.id, requestMessage);
    };
    //Guest User
    guestUserHandler = () => {
        this.setState({
            loading: true
        })
        const guestUserId = localStorage.getItem('guestUUID');
        let generateID;
        if (guestUserId) {
            generateID = guestUserId;
        } else {
            generateID = uuid();
            localStorage.setItem('guestUUID', generateID);
        }

        const headers = {
            'Content-Type': 'application/json'
        };

        const requestBody = {
            "data": {
                "type": "guest_account",
                "attributes": {
                    "uuid": generateID
                }
            }
        };
        const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
        this.guestLoginApiCallId = requestMessage.messageId;
        requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.guestLoginAPIEndPoint);

        requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), headers);
        requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), JSON.stringify(requestBody));
        requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.httpPostMethod);

        runEngine.sendMessage(requestMessage.id, requestMessage);
    }

}
