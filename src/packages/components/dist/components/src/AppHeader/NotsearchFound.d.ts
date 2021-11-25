import { Component } from 'react';
import './css/index.scoped.css';
declare type MyProps = {
    isMobile: boolean;
    hideSearch: () => void;
};
export declare class NotsearchFound extends Component<MyProps> {
    render(): JSX.Element;
}
export default NotsearchFound;
