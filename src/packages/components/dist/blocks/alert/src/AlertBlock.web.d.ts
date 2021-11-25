import { BlockComponent } from "../../../framework/src/BlockComponent";
import { Message } from "../../../framework/src/Message";
interface Props {
    navigation: any;
}
interface S {
    title: string;
    body: string;
    btnPositiveText: string;
    btnNegativeText: string;
    btnNeutralText: string;
}
interface SS {
}
export default class AlertBlock extends BlockComponent<Props, S, SS> {
    messagePositiveButton: any;
    messageNegativeButton: any;
    messageNeutralButton: any;
    constructor(props: Props);
    render(): JSX.Element | null;
    onNegativeButtonPress(): void;
    onPositiveButtonPress(): void;
    onNeutralButtonPress(): void;
    GetTitleView(): JSX.Element | null;
    GetMainView(): JSX.Element;
    receive(from: string, message: Message): Promise<void>;
    navigateToAlertPage(message: Message): void;
}
export {};
