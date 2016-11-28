import amqp from 'amqplib';
import retry from 'retry';
import config from '../config';
import LogHelper from '../helpers/log';

const operation = retry.operation({
    retries: 5,
    factor: 1.598,
    minTimeout: 1 * 1000,
    maxTimeout: 2 * 1000
});

export default class BaseMessageBroker{

    queueName;

    /**
     * Broker channel instance
     * @type {null}
     */
    channel = null;

    /**
     * Broker connection instance
     * @type {null}
     */
    connection = null;

    /**
     * Connect to broker server
     * @returns {Promise}
     */
    async connect(url){
        let connection = await this.connectToRabbit(url || config.get("queue-server:url"));
        let channel = await connection.createChannel();

        channel.assertQueue(this.queueName);
        this.channel = channel;
        this.connection = connection;
        LogHelper.info(`Message Broker client connected`);
    }

    connectToRabbit(url){

        return new Promise((resolve, reject) => {
            operation.attempt(currentAttempt => {
                amqp.connect(url).then(conn => {
                    LogHelper.info(`connection to rabbit succeed !`);
                    resolve(conn);
                }).catch(err => {
                    LogHelper.info(`cannot connect to rabbit. attempt ${currentAttempt}`);
                    if(operation.retry(err)){
                        return;
                    }
                    reject(err ? operation.mainError() : null);
                });
            });
        });
    }

    /**
     * Get Channel
     * @returns Channel instance
     */
    getChannel(){
        if(!this.channel) throw new Error('Message server channel not ready yet');
        return this.channel;
    }
}





