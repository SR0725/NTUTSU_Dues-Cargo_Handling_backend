import dotenv from 'dotenv';

type Env = 'local' | 'dev' | 'prod';

dotenv.config();

const config = {
	env: process.env.ENV as Env,
	port: process.env.PORT || 6001,
	mongodbURL: process.env.MONGODB_URL || 'mongodb://localhost:27017',
};

export default config;
