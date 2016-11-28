import mongoose from 'mongoose';
import ProfileFetcherBroker from '../brokers/profileFetcher';
import profile from './profile';
import fetcher from './featcher';
import config from '../config';
import LogHelper from '../helpers/log';
import {connectToDatabase} from '../utils/db';
import ProfileAgent from '../agents/profile';
import ProfileHelper from '../helpers/profile';
import Skill from '../models/skill';

const queueName = config.get('queues:linkedin-profiles:name');
const profileFetcher = new ProfileFetcherBroker();

async function startListenToQueue(){
    try{
        LogHelper.info('Connecting to database');
        let db = await connectToDatabase(mongoose);

        LogHelper.info('Connecting to queue server');

        await profileFetcher.connect();
        let channel = profileFetcher.getChannel();
        LogHelper.info('Created new channel');

        channel.assertQueue(queueName, {durable: true});
        channel.prefetch(1); //This tells RabbitMQ not to give more than one message to a worker at a time

        LogHelper.info(`Waiting for messages in: ${queueName}`);
        channel.consume(queueName, data => doWork(channel, data, db), {noAck: false});
    }catch(err){
        // todo: improve reporting
        LogHelper.error(err);
        LogHelper.info('exiting 1 ...');
        process.exit(-2);
    }

}

async function doWork(channel, jobData, db){

    LogHelper.info('New linkedin profile asked to be parsed');
    let data = JSON.parse(jobData.content.toString());
    if(!data || !data.url) return channel.nack(jobData, false, false);


    try{
        let html = await fetcher(data.url);
        LogHelper.info('successfully parsed the profile page');
        let pData = await profile(data.url, html);
        pData.score = ProfileHelper.calculateScore(pData);

        LogHelper.info(`Saving linkedin profile to database [${pData.url}] scored at:${pData.score}`);

        let ok = await ProfileAgent.updateProfile(pData);
        if(!ok) return channel.nack(jobData, false, false);
        LogHelper.info('linkedin profile saved to database');

        LogHelper.info('update skills collection');
        let skillsProcessOk = await proccessSkills(pData.skills);
        if(!skillsProcessOk){
            LogHelper.info(`error occurred while processing skills of: ${pData.url}`);
        }

        channel.ack(jobData);
    }catch (e){
        LogHelper.info('Error: ' + e.message);
        channel.nack(jobData, false, false);
    }

    LogHelper.info('finish working on job');
}

async function proccessSkills(skills){
    let bulk = Skill.collection.initializeOrderedBulkOp();
    skills.map(skill => {
        bulk.find({name:skill}).upsert().updateOne({name:skill});
    });
    let results = await bulk.execute();
    return results.isOk();
}

// Start reading from stdin so we don't exit instantly.
process.stdin.resume();

function exitHandler(err) {

    let exitCode = 0;
    if (err) {
        // todo: improve reporting
        LogHelper.error(err);
        exitCode = -1;
    }

    LogHelper.info('exiting...');
    process.exit(exitCode);
}

//do something when app is closing
process.on('exit', exitHandler);

//catches ctrl+c event
process.on('SIGINT', exitHandler);

//catches uncaught exceptions
process.on('uncaughtException', (err) => exitHandler(err));

startListenToQueue();