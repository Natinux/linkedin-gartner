import config from '../config';

export const connectToDatabase = db => {
    if(!db) throw new Error('you must pass your db instance');

    return new Promise((resolve, reject) => {

        db.connection.on('error', () => {
            reject(`unable to connect to database: ${config.get('db:url')}`);
        });

        db.connection.once('open', () => resolve(db.connection));

        db.connect(config.get('db:url'), {
            server: {
                socketOptions: { keepAlive: 1 },
                reconnectTries: 10
            },
            promiseLibrary: global.Promise
        });

    });
};