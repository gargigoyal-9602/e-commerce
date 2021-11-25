import { Message } from '../Message';
export default class EntityRetrievedMessage<Entity> extends Message {
    static id: string;
    entity: Entity;
    constructor(entity: Entity);
}
