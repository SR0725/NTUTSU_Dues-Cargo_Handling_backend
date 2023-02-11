import { MongoClient } from 'mongodb';
import config from '@/utils/config';

const { mongodbURL } = config;

export const client = new MongoClient(mongodbURL);
client.connect();
