import BaseMessgaeBroker from './base';
import config from '../config';

export default class MessageBroker extends BaseMessgaeBroker {
    queueName = config.get('queues:linkedin-profiles:name');
}