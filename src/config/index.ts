import dotenv from 'dotenv';

import {IConfig} from './config.interface';

dotenv.config();

const config: IConfig = {
 NODE_ENV: process.env.NODE_ENV || 'development',
 PORT: +(process.env.PORT || 3000),
 HOST: process.env.HOST || 'localhost',
 DATABASE_URL:
    process.env.DATABASE_URL ||
    `postgres://${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
};

export {config};
