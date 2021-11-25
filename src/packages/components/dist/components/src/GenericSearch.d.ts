import { Component } from "react";
interface Props {
    containerStyle: any;
    placeholder: any;
    lightTheme: boolean;
    round: boolean;
    showLoading: boolean;
    onChangeText: any;
    autoCorrect: any;
    autoFocus: any;
    value: any;
}
interface S {
    containerStyle: any;
    placeholder: any;
    lightTheme: boolean;
    round: boolean;
    showLoading: boolean;
    onChangeText: any;
    autoCorrect: any;
    autoFocus: any;
    value: any;
}
export default class GenericSearch extends Component<Props, S> {
    constructor(props: Props);
    render(): JSX.Element;
}
export {};
