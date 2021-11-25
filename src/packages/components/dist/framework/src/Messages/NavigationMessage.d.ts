import { Message } from '../Message';
export default class NavigationMessage extends Message {
    static id: string;
    navigation: any;
    target: string;
    raise: any;
    constructor(navigation: any, target: string, raise?: any);
}
