import PropTypes from "prop-types";
import { Component } from "react";
declare type MyProps = {
    testID: string;
    isChecked: boolean;
    onChangeValue?: (value: boolean) => void;
};
declare type MyState = {
    isChecked: boolean;
    onChangeValue?: (value: boolean) => void;
};
export default class CustomCheckBox extends Component<MyProps, MyState> {
    static propTypes: {
        testID: PropTypes.Requireable<string>;
        isChecked: PropTypes.Validator<boolean>;
        onChangeValue: PropTypes.Validator<(...args: any[]) => any>;
    };
    constructor(props: any);
    render(): JSX.Element;
    componentWillReceiveProps(nextProps: any): void;
    handleValueChange(value: boolean): void;
}
export {};
