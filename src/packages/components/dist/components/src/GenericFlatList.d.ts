import { Component } from "react";
interface Props {
    data: any;
    keyExtractor: any;
    render: any;
    itemSeparatorComponent: any;
    listHeaderComponent: any;
    stickyHeaderIndices: any;
}
interface S {
    data: any;
    keyExtractor: any;
    render: any;
    itemSeparatorComponent: any;
    listHeaderComponent: any;
    stickyHeaderIndices: any;
}
export default class GenericFlatList extends Component<Props, S> {
    constructor(props: Props);
    render(): JSX.Element;
}
export {};
