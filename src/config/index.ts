import dotenv from 'dotenv';

import {IConfig} from './config.interface';

dotenv.config();

const config: IConfig = {
 NODE_ENV: process.env.NODE_ENV || 'development',
 PORT: +(process.env.PORT || 3000),
 HOST: process.env.HOST || 'localhost',
};

export {config};
