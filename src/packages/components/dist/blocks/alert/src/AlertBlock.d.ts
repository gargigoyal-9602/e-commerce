import { Message } from "../../../framework/src/Message";
import { Block } from "../../../framework/src/Block";
export default class AlertBlock extends Block {
    constructor();
    receive(from: string, message: Message): Promise<void>;
    showAlert(alertTitle: string, alertMsg: string, btnPositiveText: string, btnNegativeText: string, btnNeutralText: string, btnPositiveMessage: Message, btnNegativeMessage: Message, btnNeutralMessage: Message): void;
}
