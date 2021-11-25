import { Component } from "react";
interface S {
    isFieldActive: boolean;
}
export declare class FloatingTitleTextInputField extends Component<S> {
    static defaultProps: {
        keyboardType: string;
        titleActiveSize: number;
        titleInActiveSize: number;
        titleActiveColor: string;
        titleInactiveColor: string;
        otherTextInputAttributes: {};
        textInputStyles: {};
    };
    position: any;
    constructor(props: any);
    _handleFocus: () => void;
    _handleBlur: () => void;
    _onChangeText: (updatedValue: any) => void;
    _returnAnimatedTitleStyles: (attrName: any) => {
        top: any;
        fontSize: any;
        color: string;
    };
    setPlaceHolderMove: () => number;
    render(): JSX.Element;
}
export {};
