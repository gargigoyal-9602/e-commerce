import PropTypes from "prop-types";
import { BlockComponent } from "../../framework/src/BlockComponent";
interface Props {
    onPress: any;
    content: string;
}
interface S {
}
interface SS {
}
export default class CustomTextItem extends BlockComponent<Props, S, SS> {
    static propTypes: {
        content: PropTypes.Validator<string>;
    };
    render(): JSX.Element;
}
export {};
