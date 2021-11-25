import { Message } from '../Message';
export default class EntityPostedMessage extends Message {
    static id: string;
    entityId: string;
    constructor(entityId: string);
}
